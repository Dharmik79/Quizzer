var quest=document.getElementById('question_number');
var numb=document.getElementById('number');
var ans5=document.getElementById('ans_num1');

var ans6=document.getElementById('ans_num2');

var ans7=document.getElementById('ans_num3');

var ans8=document.getElementById('ans_num4');
var ans9=document.getElementById('ans');
var next=document.getElementById('next');

var fin=document.getElementById('fin');

let counter=0;
 var query=window.location.search;
   var qu=query.indexOf("?");
      query=query.substr(qu+1,);
    query=decodeURI(query);
    var u=query.indexOf('/');
    var usern=query.substring(0,u);
    var na=query.substring(u+1,);

const ttq=na; 
console.log(na);
console.log(usern);
    
window.addEventListener('load',(event)=>{
   firebase.auth().onAuthStateChanged(function(user) {
       
  if (user) {
    window.current=user.email;
      console.log(window.current);
      counter++;
       numb.innerText="Question "+counter+"/"+ttq;
      
  } else {
    window.location.assign('\login.html');
  }
});

});
function next1(){
    
    console.log(navigator.onLine);
    console.log(counter);
currentQuiz=usern;
    
    if(counter<=ttq)
        { 
    console.log(currentQuiz);
  var question=document.getElementById('question_number').value;

var ans1=document.getElementById('ans_num1').value;

var ans2=document.getElementById('ans_num2').value;

var ans3=document.getElementById('ans_num3').value;

var ans4=document.getElementById('ans_num4').value;
var ans=document.getElementById('ans').value;
    ans=ans.toUpperCase();
      if(question!="" && ans1!="" && ans2!="" && ans3!="" && ans4!="" && ans!="")
        {
          
    if(ans=="A" ||ans=="B" ||ans=="C" ||ans=="D" )
    {var answ;
        if(ans=='A')
            {
                answ=1;
            }
     if(ans=='B')
            {
                answ=2;
            }
     if(ans=='C')
            {
                answ=3;
            }
     if(ans=='D')
            {
                answ=4;
            }
        var data = {
    question:question,
    choice1:ans1,
        choice2:ans2,
            choice3:ans3,
            choice4:ans4,
            answer:answ
   }
        var z=counter;
       
      if(counter<ttq){ 
          quest.value="";
        ans5.value="";
        ans6.value="";
        ans7.value="";
        ans8.value="";
        ans9.value="";
        counter++;
         }
        
       
        
         numb.innerText="Question "+counter+"/"+ttq;
        var nu=window.current.indexOf("@");
       var users1=window.current.slice(0,nu);
            console.log(users1);
         
        var quizzes='Quizz/'+users1+'/'+currentQuiz+'/questions/'+z+'/';
        
        firebase.database().ref(quizzes).set({
            question:question,
    choice1:ans1,
    choice2:ans2,
    choice3:ans3,
    choice4:ans4,
    answer:answ
        });
        if(z==ttq)
            {
                hideing();
            }
       
    }
            else{
        alert("Input the answer of the question");
    }

            
        }
        else{
                alert("Input the required fields");
            }
    
        }
   
}
function hideing(){
    next.style.display="none";
        fin.style.display="block";
}
function fini()
{
    var qu=usern;
    var nu=window.current.indexOf("@");
       var users1=window.current.slice(0,nu);
    console.log(users1);
    console.log(qu);
    
    
    quizze='Quizz/'+users1+'/'+qu+'/'; 
 
    
    firebase.database().ref(quizze).update({ perfect: "true" });
    window.location.assign('\success.html');
   alert("your quiz "+qu+" is successfully saved");

  // 
}
