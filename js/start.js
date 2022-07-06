const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const endPoint = 12; //질문 갯수

//시작하기 버튼 눌렀을 때 main페이지 사라지고 qna페이지 등장
function begin(){
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(() => {
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 450)
        let qID = 0;
        goNext(qID);
    }, 450);
}

//qna페이지에 질문, 답변 3개 출력
function goNext(qID){
    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qID].q;

    for (let i in qnaList[qID].a){
        addAnswer(qnaList[qID].a[i].answer, qID);
    }

    //statusBar
    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qID+1) + '%';
}

//답변을 버튼으로 출력
function addAnswer(answerText, qID){
    var a = document.querySelector('.aBox');
    var answer = document.createElement('button');
    answer.classList.add('answerList'); //답변을 모두 통칭할 수 있도록 하기 위해 클래스 추가
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');
    a.appendChild(answer);
    answer.innerHTML = answerText;

    //답변 버튼 클릭시 다음으로 넘어가기 위해 다 없어지도록
    answer.addEventListener("click", () => {
        var children = document.querySelectorAll('.answerList'); //답변 버튼 다 담기
        for (let i = 0; i < children.length; i++){
            children[i].disabled = true; //버튼 비활성화
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
            children[i].style.display = 'none'; //버튼 안보이기

        }
        goNext(++qID);
    }, false);
}