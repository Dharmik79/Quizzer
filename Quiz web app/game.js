 var questions =[
 ];


const question=document.getElementById('question');
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText=document.getElementById('questionCounter');
const prev=document.getElementById('prev');
const next=document.getElementById('next');
const fin=document.getElementById('fin');
const choice1=document.getElementById('choice1');
const choice2=document.getElementById('choice2');
const choice3=document.getElementById('choice3');
const choice4=document.getElementById('choice4');
let acceptingAnswers = false;
let currentQuestion={};
 var query=window.location.search;
   var qu=query.indexOf("=");
      query=query.substr(qu+1,);
    query=decodeURI(query);
    var u=query.indexOf('/');
    var usern=query.substring(0,u);
    var name=query.substring(u+1,);
   var starCountRef1 = firebase.database().ref('Quizz/'+usern+'/'+name+'/');
var MAX_QUESTIONS;
 starCountRef1.on('value', function(snapshot){
   MAX_QUESTIONS=snapshot.val().total_questions; 
  
    });
let score=0;
let questionCounter=0;

const CORRECT_BONUS=10;


let selectedoptions=[];
let answers=[];


getNewQuestion=()=>{
MAX_QUESTIONS=q;
  questionCounterText.innerText = `${questionCounter+1}/${MAX_QUESTIONS}`;
const questionIndex =questionCounter;
    
    
   if(questionCounter==0)
      {
           prev.style.display='none';
      }
    else{
         prev.style.display='block';
    }
     console.log("Question Counter get New Question "+ questionCounter);
    
    
  currentQuestion = questions[questionIndex];
  question.innerText = currentQuestion.question;
    if (questionCounter!=MAX_QUESTIONS-1)
        {
            fin.style.display='none';
             next.style.display='block';
            
        }
    else{
        fin.style.display='block';
       next.style.display='none';
    }
    
   choices.forEach(choice =>{
       const number=choice.dataset['number'];
       choice.innerText=currentQuestion['choice'+number];
       
       if(number == currentQuestion.userAnswer)
           {
               choice.style.background="green";
           }
       else{
           choice.style.background="white";
       }
       
    });
    
};
choices.forEach(choice=>{
   choice.addEventListener('click',e=>{
    if (!currentQuestion['as']) return;

    currentQuestion['as'] = false;
       const selectedChoice=e.target;
       const selectedAnswer=selectedChoice.dataset['number'];
       currentQuestion.userAnswer=selectedAnswer;
      
       if(selectedAnswer==currentQuestion['answer'])
      {
          score+=CORRECT_BONUS;
      }
    const number=choice.dataset['number'];
       
       
       if(number == currentQuestion.userAnswer)
           {
               choice.style.background="green";
           }
       else{
           choice.style.background="white";
       }
    
       console.log(selectedoptions +" "+answers);
      
   });
    
});
prev.addEventListener('click',()=>{
    
    questionCounter-=1;
    console.log(questionCounter);
    getNewQuestion();
  
});
next.addEventListener('click',()=>{
   questionCounter++;
    getNewQuestion();
});

fin.addEventListener('click',e=>{
    if(questionCounter==MAX_QUESTIONS-1)
        {
            console.log(score);
            
           if(confirm("Are you sure to end the quiz? ")){
          window.location
               .assign('end.html?'+score);
           }
    
        }
    
});


window.addEventListener('load',() =>{
    
    firebase.auth().onAuthStateChanged(function(user) {
       
  if (user) {
    window.current=user.email;
     
     
  } else {
    window.location.assign('\login.html');
  }
});
});
startGame=()=>{
     document.getElementById("loader").style.display = "none";
  var hidi=document.getElementById('container');
    hidi.style.display="block";
    
    questionCounter=0;
    score=0;
   
    getNewQuestion();
};
   var starCountRef = firebase.database().ref('Quizz/'+usern+'/'+name+'/questions/');
let q=0;
starCountRef.on('value', function(snapshot) {
    
snapshot.forEach(function(childSnapshot){
    console.log(childSnapshot.val())
   var quest=childSnapshot.val().question;
    var ans=childSnapshot.val().answer;
    var choice1=childSnapshot.val().choice1;
    var choice2=childSnapshot.val().choice2;
    var choice3=childSnapshot.val().choice3;
    var choice4=childSnapshot.val().choice4;
    q++;
  questions.push({
      "question":quest,
      "answer":ans,
      "choice1":choice1,
      "choice2":choice2,
      "choice3":choice3,
      "choice4":choice4,
      as:"false",
    again:"false"
      
  });

    
    
    
});
    
if(questions.length==q)
    {
        startGame();
    }
    
    });




