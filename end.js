
const finalScore = document.getElementById("finalScore");

var query=window.location.search;
var qu=query.indexOf("?")
query=query.substring(qu+1,);
 query=decodeURI(query);
var na=query.indexOf("/");
var nameofquiz=query.substring(0,na);
var score=query.substring(na+1,);
finalScore.innerText=score;
console.log(score);
console.log(nameofquiz);

function sub(){
    firebase.auth().onAuthStateChanged(function(user) {
       var loader=document.getElementById('loader');
        var container=document.getElementById('container');
  if (user) {
            loader.style.display="block";
      container.style.display="none";

    window.current=user.email;
      var nnn=window.current.indexOf("@");
      window.current=window.current.substring(0,nnn);
      console.log(nameofquiz);
      
      var quizzes="Scores/"+window.current+"/"+nameofquiz+"/";

        firebase.database().ref(quizzes).set({
           score:score,
            nameofquiz:nameofquiz
        }).then(function(){
            
           window.location.assign('success.html'); 
        });
      
      
      
  } else {
    window.location.assign('\login.html');
  }
});
 
}



