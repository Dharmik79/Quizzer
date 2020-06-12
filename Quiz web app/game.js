window.addEventListener('load',(event)=>{
    
    var query=window.location.search;
   var qu=query.indexOf("=");
      query=query.substr(qu+1,);
    query=decodeURI(query);
    var u=query.indexOf('/');
    var username=query.substring(0,u);
    var name=query.substring(u+1,);
 
    firebase.auth().onAuthStateChanged(function(user) {
       
  if (user) {
    window.current=user.email;
     
  } else {
    window.location.assign('\login.html');
  }
});
});
 var starCountRef = firebase.database().ref('Quizz/'+username+'/'+name);
starCountRef.on('value', function(snapshot) {
snapshot.forEach(function(childSnapshot){
  
    
    childSnapshot.forEach(function(quizsnapshot){
      var childData1=quizsnapshot.val().nameofquiz;  
    var childData=quizsnapshot.val().perfect;
    console.log("total questions"+childData);
       
   
        
        
    });
    
});
    
    });

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

let score=0;
let questionCounter=0;
let availableQuestions=[];


let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1,
    as:"false",
    again:"false"
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3,
    as:"false",
    again:"false"
  },
  {
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4,
    as:"false",
    again:"false"
  }
];


const CORRECT_BONUS=10;
const MAX_QUESTIONS=3;
let selectedoptions=[];
let answers=[];
startGame=()=>{
    questionCounter=0;
    score=0;
    availableQuestions=[...questions];
    
    getNewQuestion();
};


getNewQuestion=()=>{
   
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
    
    
  currentQuestion = availableQuestions[questionIndex];
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
            localStorage.setItem('mostRecentScore',score);
           if(confirm("Are you sure to end the quiz? ")){
            return window.location
               .assign('end.html');
           }
           
        }
    
});

startGame();