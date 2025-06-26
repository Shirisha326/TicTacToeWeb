// select all elements with the class "box" (usually the game cell or box)
let boxes =document.querySelectorAll(".box");
// select the elements with the ID "reset-btn"(the button to reset the curent game)
let resetBtn =document.querySelector("#reset-button");
//select the  elements with the ID "new-btn" (the button to start a new game)
let newGamebtn=document.querySelector("#new-btn");
//select the  elements with the class "msg-container" (container that holds the message display area)
let msgContainer = document.querySelector(".msg-container");
//select the element with ID "msg"(the actural meg text element display to the area)
let msg = document.querySelector("#msg");


let turnO = true;//boolean to track whose it is: true means player O's turn,false means player X's turn
let count = 0;//counts the number of moves made in the game ;max is 9(since 3x3)

// All possible winning combination represeted by indics of the boxes array(0 to 8)
const winPattern = [
  [0, 1, 2], // top row
  [3, 4, 5], //middle row
  [6, 7, 8],//bottom row
  [0, 3, 6],//left column
  [1, 4, 7],//middle column
  [2, 5, 8],//right column
  [0, 4, 8],//Diagonal top-left to bottom -right
  [2, 4, 6],//Diagonal top-right to buttom-left
];
//these patterns covers all the ways a player can win the game by placing  three identical marks in roe,column,0r diagonal

//loop through each box element (the clickable cells on the board)
boxes.forEach((box) => {
  //add click event listener for each box
  box.addEventListener("click", () => {
     
    //checks whose turn it is and  place corresponding mark
    if(turnO){
      box.innerText = "O"; //player O places therie mark
      turnO = false;   //switch turn to player X
    }else {
      box.innerText = "X"; //player O places their mark
      turnO = true; // switch turn back to player O
    }

    box.disabled = true;//prevent further clicks on this  box(once marked)
    count++;//increment move count since a move is made

    let isWinner = checkWinner();//check if this move caused a win
    if (count === 9 && !isWinner){
      gameDraw();//handle the draw sitution
    }

  });
});


//check for the winner function
 const checkWinner = () => {
  //loop through all winning patterns one by one
  for (let pattern of winPattern){
    //get the text (mark) of each box in the curent pattern
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val= boxes[pattern[2]].innerText;

    //check if all three positions are filled and have the same mark(O or X)
    if(pos1Val !== "" && pos2Val !== "" && pos3Val !== ""){
      if(pos1Val === pos2Val && pos2Val === pos3Val){
        showWinner(pos1Val);// if yes,announce the winner
        return true; //return true to indicate game has been won
      }
    }
   
  } 
  return false;
  // if no winning pattern found, return false implicity
 };
 const showWinner = (winner) =>{
  //Display a congratulatory message with the winner is ${winner};
  msg.innerText = `Congratulations! Winner is ${winner}`;

  //make the message container visible (remove the "hide"  CSS class)
  msgContainer.classList.remove("hide");

  //disable all boxes so the game can't continue
  disableBoxes();
 }
 const gameDraw = () => {
  msg.innerText = "😐 It's a Draw!";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

 //function to disable all boxes after game ends
 const disableBoxes = () => {
  //loop through each box (each button on the grid)
  for (let box of boxes){
    //disable the button (player can't click it anymore)
    box.disabled = true;
  }
 };
 //function to enable boxes and reset their content(for new game)
  const enableBoxes = () => {
    //loop through each box on the board
    for (let box of boxes) {
      //enable the button again (player can now click it)
      box.disabled = false;

      //clear the text inside the box (remove x or o)
      box.innerText = "";
    }
  };

  const reset = () => {
    turnO = true;//set the starting player to o;
    count = 0;//reset move count to 0
    enableBoxes();//enable all boxex and clear the board
    msgContainer.classList.add("hide");//hide the winner /draw message
  };

  // when "new game" button is clicked ,run resetgame
  newGamebtn.addEventListener("click",reset);
  //when "Reset game" button is clicked,reun resetGame
  resetBtn.addEventListener("click",reset);