const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const result = document.querySelector("#result");
const endPoint = 8; //질문 갯수
const select = [0,0,0,0,0,0,0,0,0,0,0,0]; //사용자의 버튼 선택에 따른 내용이 담길 배열

//다시하기
function reBegin(){
    result.style.WebkitAnimation = "fadeOut 1s";
    result.style.animation = "fadeOut 1s";
    setTimeout(() => {
        main.style.WebkitAnimation = "fadeIn 1s";
        main.style.animation = "fadeIn 1s";
        setTimeout(() => {
            result.style.display = "none";
            main.style.display = "block";
        }, 450)
        let qID = 0;
        goNext(qID);
    }, 450);
}

//닮은 동물 보여주기
function callResult(){
    var result = select.indexOf(Math.max(...select)); //최댓값 인덱스 반환
    return result;
}

function setResult(){
    let point = callResult();
    const resultName = document.querySelector('.resultName');
    resultName.innerHTML = infoList[point].name;

    //이미지
    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'img/image-' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    //설명
    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}



//qna 페이지 닫고 result 페이지로 출력
function goResult(){
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        }, 450)
    }, 450);

    // console.log(select); //답변 들어온 것 확인
    setResult();
}

//답변을 버튼으로 출력
function addAnswer(answerText, qID, idx){
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
        }
        setTimeout(() => {
            var target = qnaList[qID].a[idx].type;
            for (let j = 0; j < target.length; j++){
                select[target[j]]++; //선택한 답변에 해당하는 동물 +1
            }
            for (let k = 0; k < children.length; k++){
                children[k].style.display = 'none'; //버튼 안보이기
            }
        goNext(++qID);
        }, 450)
    }, false);
}

//qna페이지에 질문, 답변 3개 출력
function goNext(qID){
    if (qID === endPoint) {
        goResult(); //마지막 문제에 도달하면 result 보여주기
        return;
    }
    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qID].q;

    for (let i in qnaList[qID].a){
        addAnswer(qnaList[qID].a[i].answer, qID, i);
    }

    //statusBar
    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qID+1) + '%';
}

//시작하기 버튼 눌렀을 때 main페이지 닫고 qna페이지 등장
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