
const finalScore = document.getElementById("finalScore");

var query=window.location.search;
var qu=query.indexOf("?")
query=query.substring(qu+1,);

finalScore.innerText=query;


function sub(){
    
 window.location.assign('../success.html');
}



