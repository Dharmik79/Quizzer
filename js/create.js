currentQuiz="";
window.addEventListener('load',(event)=>{
   firebase.auth().onAuthStateChanged(function(user) {
       
  if (user) {
    window.current=user.email;
      console.log(window.current);
      
  } else {
    window.location.assign('\login.html');
  }
});

});


function submit()
{
    
 var databaseRef = firebase.database().ref('Quizz/');
    
   var nameofquiz=document.getElementById('nameofquiz').value;
var totalquestions=document.getElementById('number_of_question').value;
    var integer = parseInt(totalquestions, 10);
    if(nameofquiz!="" && integer!=""){
    
       var user = firebase.auth().currentUser;
        
        if(user)
            {var data = {
    nameofquiz:nameofquiz,
    total_questions:totalquestions,
    perfect:"false"
   }
     var username=user.email;
    var userid=user.uid;
        
        var n=username.indexOf("@");
       var user1=username.slice(0,n);
       
             
   firebase.database().ref('/Quizz/' + user1+"/"+nameofquiz).set({
       nameofquiz:nameofquiz,
    total_questions:totalquestions,
       perfect:"false"
   }).then(function(){
       
       window.location.assign("\questions.html?"+nameofquiz+"/"+totalquestions);
   });
   

              
}
           
    
    }
    else{
        if(nameofquiz=="" && totalquestions=="")
            {
                alert("Enter The name of Quiz and total number of Questions");
            }
        else if(totalquestions=="" && nameofquiz!="")
            {
                alert("Enter The total number of questions in Integers");
            }
        else
            {
                alert("Enter The name of Quiz");
            }
        
    }
   }













