window.addEventListener('load',(event)=>{
    firebase.auth().onAuthStateChanged(function(user) {
       
  if (user) {
    window.current=user.email;
     
  } else {
    window.location.assign('\login.html');
  }
});
});

var query=window.location.search;

console.log(query);
var seturlofquiz=document.getElementById('seturlofquiz');

seturlofquiz.setAttribute("href","\game.html"+query);





