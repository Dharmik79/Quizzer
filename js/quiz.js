window.addEventListener('load',(event)=>{
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
             
	var el=document.createElement("div");
            el.className="column";
    var el1=document.createElement("div");
            el1.className="card ";
            el1.setAttribute("id",childData1);
  var a = document.createElement('a'); 
            a.className="a";
            var link = document.createTextNode(childData1);
            a.appendChild(link);  
         a.href="https://www.geeksforgeeks.org";
            el1.appendChild(a);     
            el.append(el1);
            quiz.append(el);
 
        }
        
        
    });
    
});
    
    });

}); 
