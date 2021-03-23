var token1;
var token2;
var selectedDrop;
// modal function
$(".modal .contents .startBtn").on("click", ()=>{
  
  $(".modal").css("display","none");

  //select tokens
  selectedDrop = $('#myselect').find(":selected").text();
  if(selectedDrop=="Heart/Flower"){
    var heart = document.createElement("img");
    heart.src = "./images/heart.png";
    heart.setAttribute('height', '145px');
    heart.setAttribute('width', '145px');
    heart.setAttribute('name', 'heart')

    var flower= document.createElement("img");
    flower.src="./images/flower1.png";
    flower.setAttribute('height', '145px');
    flower.setAttribute('width', '145px');
    flower.setAttribute('name', 'flower');

    token1=heart;
    token2=flower;

  } else if (selectedDrop=="X/O"){
    var X = document.createElement("img");
    X.src="./images/X.png";
    X.setAttribute('height', '110px');
    X.setAttribute('width', '110px');
    X.style.paddingTop="20px";
    X.setAttribute('name', 'X')
    
    var O= document.createElement("img");
    O.src="./images/O.png";
    O.setAttribute('height', '150px');
    O.setAttribute('width', '150px');
    O.setAttribute('name', 'O')
    token1=X;
    token2=O;
  }
  
//Declaration
var currentPlayer = token1;
var currentPlayerTest="X";
const box = document.querySelectorAll(".box");
let playerOneScore=0;
let playerTwoScore=0;
//let round=0;
var countOne=1;
var countTwo=1;
//var countRound=1;

// Game start
for (let j = 0; j < box.length; j++) {
  box[j].addEventListener("click", function fn(event) {
    event.preventDefault();
    box[j].innerText=currentPlayerTest;
    event.target.prepend(currentPlayer.cloneNode(true));
   
    switchPlayer();

    if(gameIsTie())
     {
    playAgain ();
    $(".won").text("Its a TIE!!");
    }

    checkWinner();
    event.target.style.pointerEvents = "none";
  });
}

// Restart function
$(".tab.tab2").on("click", ()=>{
  $(".turn").text(currentPlayer.getAttribute('name')+" turns!");
  for(var i=0;i<box.length;i++)
  {box[i].innerText="";
  
  $(".won").text("");
  box[i].style.pointerEvents ="auto";
  playerOneScore=0;
  playerTwoScore=0;
  countOne=1;
  countTwo=1;
  $(".player.playerOneScore").children("span").text("");
  $(".player.playerTwoScore").children("span").text("");
}
});

// Sound function
$('.tab.tab3').click(function () {
  var sound = $("#sound");
  sound.each(function() {
  var sound = this;
  if (sound.paused) {
    sound.play();
    //$(".tab.tab3").css("text-decoration","none")
    $(".tab.tab3").text("Stop Sound")
  } else {
    sound.pause();
    //$(".tab.tab3").css("text-decoration","line-through")
    $(".tab.tab3").text("Play Sound")
     }
  });  
});


//Switch player function 
function switchPlayer(){
  if(currentPlayer === token1 && currentPlayerTest==="X") {currentPlayer = token2; currentPlayerTest="O"; $(".turn").text(currentPlayer.getAttribute('name') +" turns!");}
  else if(currentPlayer === token2 && currentPlayerTest==="O") {currentPlayer = token1;currentPlayerTest="X"; $(".turn").text(currentPlayer.getAttribute('name') +" turns!");}
}

//Check winner function
function checkWinner(){
  const row1 = box[0].innerText +  box[1].innerText + box[2].innerText;
  
  const row2 = box[3].innerText +  box[4].innerText + box[5].innerText;
  const row3 = box[6].innerText +  box[7].innerText + box[8].innerText;

  const column1 = box[0].innerText +  box[3].innerText + box[6].innerText;
  const column2 = box[1].innerText +  box[4].innerText + box[7].innerText;
  const column3 = box[2].innerText +  box[5].innerText + box[8].innerText;

  const cross1 = box[0].innerText +  box[4].innerText + box[8].innerText;
  const cross2 = box[2].innerText +  box[4].innerText + box[6].innerText;
 
 if (row1 ==="XXX"){playerOneWons()} else if(row1 ==="OOO"){playerTwoWons()}
 if (row2 ==="XXX"){playerOneWons()} else if(row2 ==="OOO"){playerTwoWons()}
 if (row3 ==="XXX"){playerOneWons()} else if(row3 ==="OOO"){playerTwoWons()}

 if (column1 ==="XXX"){playerOneWons()} else if(column1 ==="OOO"){playerTwoWons()}
 if (column2 ==="XXX"){playerOneWons()} else if(column2 ==="OOO"){playerTwoWons()}
 if (column3 ==="XXX"){playerOneWons()} else if(column3 ==="OOO"){playerTwoWons()}

 if (cross1 ==="XXX"){playerOneWons()} else if(cross1 ==="OOO"){playerTwoWons()}
 if (cross2 ==="XXX"){playerOneWons()} else if(cross2 ==="OOO"){playerTwoWons()}

  
}

//Players won output function
function playerOneWons(){
  switchPlayer();
  $(".won").text(currentPlayer.getAttribute('name')+" won!");
  disable();
 
  playerOneScore=+countOne;
  var counterOneString= playerOneScore.toString();
  $(".player.playerOneScore").children("span").text(counterOneString);
  countOne++;
  playAgain ();
}

function playerTwoWons(){
  switchPlayer();
  $(".won").text(currentPlayer.getAttribute('name')+" won!");
  disable();
 
  playerTwoScore=+countTwo;
  var counterTwoString= playerTwoScore.toString();
  $(".player.playerTwoScore").children("span").text(counterTwoString);
  countTwo++;
  playAgain ();
}

//Play again function
function playAgain (){
   var turn=$(".turn").css("cursor","pointer").text("Play Again?");
    turn.on("click", ()=>{
    $(".turn").text(currentPlayer.getAttribute('name')+" turns!");
    for(var i=0;i<box.length;i++)
    {box[i].innerText="";
    $(".won").text("");
    box[i].style.pointerEvents ="auto";
  }
  }
  );
  
  // round=+countRound;
  // var counterRoundString= round.toString();
  // $(".player.round").children("span").text(counterRoundString);
  // countRound++;
}

//Tie function
function gameIsTie(){
  for(var i=0;i<box.length;i++)
  {
  if(box[i].innerText==="")
    return false;}
    return true;
}

//Disable function
function disable(){
  for(var i=0;i<box.length;i++)
  {
  box[i].style.pointerEvents = "none";
  }
}

});