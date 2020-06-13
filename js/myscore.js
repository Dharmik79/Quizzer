var loader=document.getElementById('loader');


window.addEventListener('load',(event)=>{
   firebase.auth().onAuthStateChanged(function(user) {
      
  if (user) {
      
        
    window.current=user.email;
      //loader.style.display="none";
         var nu=window.current.indexOf("@");
       var users1=window.current.slice(0,nu);
       
      var quiz=document.getElementById('row');
var starCountRef = firebase.database().ref('Scores/'+users1+'/');
      
starCountRef.on('value', function(snapshot) {
snapshot.forEach(function(childSnapshot){
   var nameofquiz=childSnapshot.val().nameofquiz;
    var score=childSnapshot.val().score;
    console.log(nameofquiz);
    
    
    var el=document.createElement("div");
            el.className="column w3-animate-top";
    var el1=document.createElement("div");
            el1.className="card ";
    nameofquiz=nameofquiz.toUpperCase();
    var el2=document.createTextNode(nameofquiz);
    el4=document.createElement("div");
    el4.className="center";
    var el3=document.createTextNode("Score :"+score);
    
    el1.append(el2);
    el4.append(el3);
    el1.append(el4);
    
    
         
        
            el.append(el1);
            quiz.append(el);
 
    
    
});
    
    });
      loader.style.display="none";
   
  } else {
    window.location.assign('\login.html');
  }
   });
    
});

