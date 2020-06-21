window.addEventListener('load',(event)=>{
   firebase.auth().onAuthStateChanged(function(user) {
      
  if (user) {
      
        
    window.current=user.email;
      loader.style.display="none";
    
     
  } else {
    window.location.assign('\login.html');
  }
});
    
    }); 
    var quiz=document.getElementById('row');
   var starCountRef = firebase.database().ref('Quizz');
starCountRef.on('value', function(snapshot) {
snapshot.forEach(function(childSnapshot){
  
    
    childSnapshot.forEach(function(quizsnapshot){
      var childData1=quizsnapshot.val().nameofquiz;  
    var childData=quizsnapshot.val().perfect;
    console.log("total questions"+childData);
        var html="";
    if(childData=="true")
        {
             container.style.display="block";
	var el=document.createElement("div");
            el.className="column w3-animate-top";
    var el1=document.createElement("div");
            el1.className="card ";
            var nu=window.current.indexOf("@");
       var users1=window.current.slice(0,nu);
      
            el1.setAttribute("id",users1+"/"+childData1);
  var a = document.createElement('a'); 
            a.className="a";
            var link = document.createTextNode(childData1);
            a.appendChild(link);  
         a.href="index.html?id="+users1+"/"+childData1;
            el1.appendChild(a);     
            el.append(el1);
            quiz.append(el);
 
        }
        
        
    });
    
});
    
    });


