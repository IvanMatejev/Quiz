// let questions=[{
//     text: 'What is a color of limon?',
//     a:'Blue',
//     b:'Yellow',
//     c:'Green',
//     correct:'Yellow'
// },
// {
//     text: 'What is a capitol of Serbia?',
//     a:'Belgrade',
//     b: 'Berlin',
//     c: 'Rome',
//     correct: 'Belgrade'
// },
// {
//     text: 'Who is the most boring person in the world?',
//     a: 'Pera',
//     b: 'Ivan',
//     c: 'Nevena',
//     correct: 'Nevena'
// },
// {
//     text: '2+2?',
//     a:'4',
//     b:'5',
//     c:'6',
//     correct:'4'
// },
// {
//     text: '3*3?',
//     a:'3',
//     b: '6',
//     c: '9',
//     correct: '9'
// },
// {
//     text: '25/5?',
//     a: '20',
//     b: '5',
//     c: '125',
//     correct: '5'
// },
// {
//     text: '3x=60?',
//     a:'x=20',
//     b:'x=180',
//     c:'x=57',
//     correct:'x=20'
// },
// {
//     text: '3+3/3?',
//     a:'27',
//     b: '2',
//     c: '4',
//     correct: '4'
// },
// {
//     text: '5%2?',
//     a: '0',
//     b: '1',
//     c: '2.5',
//     correct: '1'
// }];

let questions=showTableData();
let table=document.getElementById('store-list');

let confirmNewQuestion=document.querySelector('.btn-push-new');
let formPage=document.querySelector('.form-page');
let btnAddNewQuestion=document.querySelector('.go-to-questions');
let newTextInput=document.querySelector('#new-text');
let newOption1Input=document.querySelector('#new-option1');
let newOption2Input=document.querySelector('#new-option2');
let newOption3Input=document.querySelector('#new-option3');
let newCorrect=document.querySelector('#new-correct');
let btnBackForm=document.querySelector('.back-form');
let questionsForm=document.querySelector('.add-form');


let numberOfQuestions=document.querySelector('#number-of-questions').value;

let outputMinutes=document.querySelector('.min');
let outputSeconds=document.querySelector('.second');
let outputTen=document.querySelector('.ten');
let mins=00;
let secs=00;
let tens=00;
let interval;

let playerName = document.querySelector('#player-name');
let backHighscores=document.querySelector('.back-to-starter');
let highscores=document.querySelector('.highscores');
let btnHighscores=document.querySelector('.btn-highscores');
let endGame=document.querySelector('.end-game');
let playAgain=document.querySelector('.play-again');
let scoreMsg=document.querySelector('.score-msg');
let btnHelp=document.querySelector('.help');
let nextBtn=document.querySelector('.next');
const btnStart=document.querySelector('.start-quiz');
const startingInterface=document.querySelector('.starter');
const quiz=document.querySelector('.quiz-body');
let msg=document.querySelector('#msg');
let scoreOutput=document.querySelector('#result');

let questionText=document.querySelector('#title');
let optionA=document.querySelector('.a-text');
let optionB=document.querySelector('.b-text');
let optionC=document.querySelector('.c-text');

let currentQuestion=0;
let correctAnswers=0;

let playerHighscore=document.createElement('li');
let selectedRow=null;


// Functions

function showTableData() {
    let table=document.getElementById('store-list');
    let currArr=[];
    for (let i = 1; i < table.rows.length; i++) {
        let objCells = table.rows.item(i).cells;
        let obj={}
        for (let j = 0; j < objCells.length; j++) {
            if(j==0){
            obj.text=objCells.item(0).innerHTML;
            }
            if(j==1){
                obj.a=objCells.item(1).innerHTML;
            }
            if(j==2){
                obj.b=objCells.item(2).innerHTML;
            }
            if(j==3){
                obj.c=objCells.item(3).innerHTML;
            }
            if(j==4){
                obj.correct=objCells.item(4).innerHTML;
            }
        }
         currArr.push(obj);
    }
    return currArr;
}

function submit(){
   let formData=readData();
   if(selectedRow===null){
        insertData(formData);
   questions.push(formData);

   } else{
        updateData(formData);
   }
   clearForm();
}

function readData(){
    let formData={};
    formData['text']=newTextInput.value;
    formData['a']=document.querySelector('#new-option1').value;
    formData['b']=document.querySelector('#new-option2').value;
    formData['c']=document.querySelector('#new-option3').value;
    formData['correct']=document.querySelector('#new-correct').value;
    return formData;

}


function insertData(data){
    let table=document.getElementById('store-list').getElementsByTagName('tbody')[0];
    let newRow=table.insertRow(table.length);
    let cell1=newRow.insertCell(0);
        cell1.innerHTML=data.text;
    let cell2=newRow.insertCell(1);
        cell2.innerHTML=data.a;
    let cell3=newRow.insertCell(2);
        cell3.innerHTML=data.b;
    let cell4=newRow.insertCell(3);
        cell4.innerHTML=data.c;
        let cell5=newRow.insertCell(4);
        cell5.innerHTML=data.correct;
        let cell6=newRow.insertCell(5);
        cell6.innerHTML=`<button onClick='editData(this)'>edit</button> <button onClick='deleteData(this)'>delete</button>`;
       
}

function editData(td){
    selectedRow=td.parentElement.parentElement;
    document.getElementById('new-text').value=selectedRow.cells[0].innerHTML;
    document.getElementById('new-option1').value=selectedRow.cells[1].innerHTML;
    document.getElementById('new-option2').value=selectedRow.cells[2].innerHTML;
    document.getElementById('new-option3').value=selectedRow.cells[3].innerHTML;
    document.getElementById('new-correct').value=selectedRow.cells[4].innerHTML;
}

function updateData(formData){
    selectedRow.cells[0].innerHTML=formData.text;
    selectedRow.cells[1].innerHTML=formData.a;
    selectedRow.cells[2].innerHTML=formData.b;
    selectedRow.cells[3].innerHTML=formData.c;
    selectedRow.cells[4].innerHTML=formData.correct;
    selectedRow=null;
    questions=showTableData();
}

function deleteData(td){
    formData=readData();
    row=td.parentElement.parentElement;
    document.getElementById('store-list').deleteRow(row.rowIndex);
    clearForm();
    questions=showTableData();
}

function clearForm (){
    document.getElementById('new-text').value='';
    document.getElementById('new-option1').value='';
    document.getElementById('new-option2').value='';
    document.getElementById('new-option3').value='';
    document.getElementById('new-correct').value=''; 
}

function shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }


function backToStarter(){
    startingInterface.style.display='unset';
    highscores.style.display='none';
}

function viewHighscores(){
    startingInterface.style.display='none';
    highscores.style.display='unset';
}

function help(){
    let currentCorrect=questions[currentQuestion].correct;
    let currentOptionA=questions[currentQuestion].a;
    let currentOptionB=questions[currentQuestion].b;
    let currentOptionC=questions[currentQuestion].c;
    if(currentCorrect==currentOptionA){
        optionB.style.display='none';
    }
    if(currentCorrect==currentOptionB){
        optionC.style.display='none';
    }
    if(currentCorrect==currentOptionC){
        optionA.style.display='none';
    }
}   

function nextQuestion(){
    optionA.addEventListener('click', isMatchA);
    optionB.addEventListener('click', isMatchB);
    optionC.addEventListener('click', isMatchC);
    optionA.style.backgroundColor='#9dc3c2';
    optionB.style.backgroundColor='#9dc3c2';
    optionC.style.backgroundColor='#9dc3c2';
    optionB.style.display='block';
    optionA.style.display='block';
    optionC.style.display='block';
    let numberOfQuestions=document.querySelector('#number-of-questions').value;
    

    if(currentQuestion===numberOfQuestions-1){
        clearInterval(interval);
        quiz.style.display='none';
        endGame.style.display='unset';
        scoreMsg.innerHTML=`Your correct answers: ${correctAnswers}/${numberOfQuestions}.
        Your time is ${mins}:${secs}:${tens}.`;
        scoreForTime();
    }else{
        msg.innerHTML='';
        currentQuestion++;
        showQuestion();
    }
}

function startQuiz(){
    let numberOfQuestions=document.querySelector('#number-of-questions').value;
    
    if(numberOfQuestions<=0) return
    if(numberOfQuestions>questions.length) return
    if(playerName.value==='') return
    shuffleQuestions(questions);
    startingInterface.style.display='none';
    quiz.style.display='unset';
    showQuestion();
    interval=setInterval(startTime, 10);
}

function isMatchA(){

    let q=questions[currentQuestion];
    let currentOptionA=questions[currentQuestion].a;
    if(q.correct==currentOptionA){
        correctAnswers++;
        scoreOutput.textContent=correctAnswers;
        msg.textContent='correct';
        optionA.style.backgroundColor='green';
        optionA.removeEventListener('click', isMatchA);
    }else{
        optionA;
        msg.textContent='wrong';
        optionA.style.backgroundColor='red';
    }
    setTimeout(nextQuestion,1000);
    // nextQuestion();
}

function isMatchB(){
    let q=questions[currentQuestion];
    let currentOptionB=questions[currentQuestion].b;
    if(q.correct==currentOptionB){
        correctAnswers++;
        scoreOutput.textContent=correctAnswers;
        msg.textContent='correct';
        optionB.style.backgroundColor='green';
        optionB.removeEventListener('click', isMatchB);
    }else{
        msg.textContent='wrong';
        optionB.style.backgroundColor='red';
    }
    setTimeout(nextQuestion,1000);
    // nextQuestion();

}

function isMatchC(){
    let q=questions[currentQuestion];
    let currentOptionC=questions[currentQuestion].c;
    if(q.correct==currentOptionC){
        correctAnswers++;
        scoreOutput.textContent=correctAnswers;
        msg.textContent='correct';
        optionC.style.backgroundColor='green';
        optionC.removeEventListener('click', isMatchC);

    }else{
        msg.textContent='wrong';
        optionC.style.backgroundColor='red';
    }
    setTimeout(nextQuestion,1000);
    // nextQuestion();

}

function showQuestion(){
    let q=questions[currentQuestion];
    questionText.textContent=q.text;
    let currentOptionA=questions[currentQuestion].a;
    let currentOptionB=questions[currentQuestion].b;
    let currentOptionC=questions[currentQuestion].c;
    optionA.textContent=currentOptionA;
    optionB.textContent=currentOptionB;
    optionC.textContent=currentOptionC;
}


function startTime(){
    tens++;
    if(tens<=9){
        outputTen.innerHTML='0' + tens;
    }
    if(tens>9){
        outputTen.innerHTML= tens;
    }
    if(tens>99){
        secs++;
        outputSeconds.innerHTML='0' + secs;
        tens=0;
        outputTen.innerHTML='0' + 0;
    }
    if(secs<=9){
        outputSeconds.innerHTML='0' + secs;
    }
    if(secs>9){
        outputSeconds.innerHTML= secs;
    }
    if(secs>59){
        mins++;
        outputMinutes.innerHTML='0' + mins;
        secs=0;
        outputSeconds.innerHTML='0' + 0;
    }
    if(mins>9){
        outputMinutes.innerHTML=mins;
    }
}


function scoreForTime(){
    let playerScores=document.querySelector('.player-score');
    let playerName = document.querySelector('#player-name').value;
    let playerHighscore=document.createElement('li');
    playerHighscore.append(playerName);
    playerScores.appendChild(playerHighscore);
    
    if(mins<1&&secs<10&&correctAnswers>0){
       correctAnswers+=3;
    }
    if(mins<1&&secs>=10&&secs<20&&correctAnswers>0){
        correctAnswers+=2;

    }
    if(mins<1&&secs>=20&&correctAnswers>0){
        correctAnswers+=1; 
    }
    playerHighscore.textContent=`${playerName}/${correctAnswers}`;
    
}

function reloadQuiz(){
    startingInterface.style.display='unset';
    endGame.style.display='none';
    playerName.value='';
    currentQuestion=0;
    correctAnswers=0;
    scoreOutput.innerHTML=correctAnswers;
    mins=00;
    secs=00;
    tens=00;
    
}

function openForm(){
    startingInterface.style.display='none';
    formPage.style.display='unset';
}

function closeForm(){
    startingInterface.style.display='unset';
    formPage.style.display='none';
}

optionA.addEventListener('click', isMatchA);
optionB.addEventListener('click', isMatchB);
optionC.addEventListener('click', isMatchC);
btnStart.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
btnHelp.addEventListener('click', help);
playAgain.addEventListener('click', reloadQuiz);
btnHighscores.addEventListener('click', viewHighscores);
backHighscores.addEventListener('click', backToStarter);
btnAddNewQuestion.addEventListener('click', openForm);
btnBackForm.addEventListener('click', closeForm);
confirmNewQuestion.addEventListener('click', submit);


