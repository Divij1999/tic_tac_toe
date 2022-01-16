const player= (name, mark) => {
   
    return {name, mark};
}

const game=(() => {

    const _player1= player("Player 1", "x");
        
    const _player2= player("Player 2", "o");

    const playerNames= (e, name, div) => {
        
        
            const one=document.querySelector(".one");
            const two=document.querySelector(".two");
          if(e.target.classList.value==="p1"){
            _player1.name=name;
            one.innerText=_player1.name;

          }
            
          else {
            _player2.name=name;
            two.innerText=_player2.name;

          }
          div.remove();
    };
    
   
    let _currentPlayer={};

    //Toggling the turns between players
    const togglePlayer= (e, reset=false) => {
        if(reset){
            _currentPlayer={};
        }
        if(_currentPlayer==={}){
            _currentPlayer=Object.assign({}, _player1);
            console.log(_currentPlayer);
        }
        if(e.target.innerText===""){

            if(_currentPlayer.mark===_player1.mark){
                _currentPlayer=Object.assign({},_player2);
            }
            else{
                _currentPlayer=Object.assign({},_player1);
            }

        }
          
    };

    const getCurrentPlayer= () => {
        return _currentPlayer;
    };

    const _checkWinner= () => {

        let winner="";
        //Checking horizontally
        for(let i=0; i<=6; i+=3){
            if(gameBoard.getBoard()[i]==="x" && gameBoard.getBoard()[i+1]==="x" && gameBoard.getBoard()[i+2]==="x"){
                
                winner=_player1.name;
            }
            else if(gameBoard.getBoard()[i]==="o" && gameBoard.getBoard()[i+1]==="o" && gameBoard.getBoard()[i+2]==="o"){
                
                winner=_player2.name;
            }
                  
        }

       //Checking vertically
       for(let i=0; i<3; ++i){
           if(gameBoard.getBoard()[i]==="x" && gameBoard.getBoard()[i+3]==="x" && gameBoard.getBoard()[i+6]==="x"){
               
               winner=_player1.name;
           }
           else if(gameBoard.getBoard()[i]==="o" && gameBoard.getBoard()[i+3]==="o" && gameBoard.getBoard()[i+6]==="o"){
               
               winner=_player2.name;
           }
       }

       //Checking diagonally
       for(let i=0; i<3; i+=2){
           if(i<2){
                if(gameBoard.getBoard()[i]==="x" && gameBoard.getBoard()[i+4]==="x" && gameBoard.getBoard()[i+8]==="x"){
                     
                     winner=_player1.name;
                }
                else if(gameBoard.getBoard()[i]==="o" && gameBoard.getBoard()[i+4]==="o" && gameBoard.getBoard()[i+8]==="o"){
                     
                     winner=_player2.name;
                }

            }
            else if(i===2){
                if(gameBoard.getBoard()[i]==="x" && gameBoard.getBoard()[i+2]==="x" && gameBoard.getBoard()[i+4]==="x"){
                    
                    winner=_player1.name;
               }
               else if(gameBoard.getBoard()[i]==="o" && gameBoard.getBoard()[i+2]==="o" && gameBoard.getBoard()[i+4]==="o"){
                    
                    winner=_player2.name;
               }

            }
       
        }

        if(!gameBoard.getBoard().includes("")){
            winner="Tie";
        }
        if(winner!=="")
          displayController.displayWinner(winner);
       

    };

    const getWinner= () => {
        _checkWinner();
    }
   
    return {
       togglePlayer,
       getCurrentPlayer,
       getWinner,
       playerNames,
    };
})();


const gameBoard= (() => {
    let _board=["","","","","","","","",""];

    //Setting the value of _board array
    const _setMark= (e) => {
        
        _board[e.target.dataset.index]=game.getCurrentPlayer().mark;
        displayController.displaySign(e, e.target.dataset.index);
        

        //Checking if there is a winner after every input
        game.getWinner();
    };

    const getMark= (e) => {
        if(e.target.innerText==="")
            _setMark(e);
    };

    const getBoard= () => {
        return _board;
    };

    const resetBoard=(e, divs, endScreen) => {
        for(let i=0; i<_board.length; ++i){
            _board[i]="";
        }
        divs.forEach(div => {div.innerText=_board[0]});
        game.togglePlayer(e, {});
        endScreen.remove();

    };

    return {
        getBoard,
        getMark,
        resetBoard,
    };
})();


const displayController= (() => {
   
    const createBoard= () => {
        const gameBoard=document.querySelector(".gameboard");
        for(let i=0; i<9; ++i){
            const div=document.createElement("div");
            div.classList.value="tile";
            div.setAttribute("data-index", i);
            div.setAttribute("style", "height:170px; width:170px; border:1px solid black; display:flex; justify-content:center; align-items:center; font-size:12em; font-family:monospace;");
            gameBoard.appendChild(div);
        }
    };
    //Creating the game board for the first time
    createBoard();

    const divs=document.querySelectorAll(".tile");
    divs.forEach(div => div.addEventListener("click", (e) => { game.togglePlayer(e); gameBoard.getMark(e);} ));
    
    //Displaying the content of array at a particualar index
    const displaySign= (e, index) => {
        e.target.innerText=gameBoard.getBoard()[index];
    };
    
    //Creating input and buttons for name change
    const changePlayerName= (e) => {
        const names=document.querySelector(".name");
       
        const playerName=document.createElement("input");
        playerName.classList.value="playerName";
        
        const submitBtn=document.createElement("button");
        submitBtn.classList.value="submit";
        submitBtn.innerText="Set";
       
        const div=document.createElement("div");
       
        div.appendChild(playerName);
        div.appendChild(submitBtn);
        names.appendChild(div);
        
        const event=e;
        submitBtn.addEventListener("click", (e) => {game.playerNames(event, playerName.value, div)});
       

    };

    const changeNameOne=document.querySelector(".p1");
    changeNameOne.addEventListener("click", changePlayerName);

    const changeNameTwo=document.querySelector(".p2");
    changeNameTwo.addEventListener("click", changePlayerName);

    const displayWinner= (winner) => {
        const endScreen=document.createElement("div");
        endScreen.setAttribute("style", "height:100vh; width:100vw; background-color:rgba(0, 0, 0, 0.6); position:fixed; display:flex; justify-content:center; align-items:center;");
        const endMenu=document.createElement("div");
        endMenu.setAttribute("style", "display:flex; height:10vh; width:15vw; flex-direction:column; justify-content:space-around; align-items:center;");
        const results=document.createElement("div");
        results.innerText=winner;
        results.setAttribute("style", "color:white; font-size:2em;");
       
        const restartBtn=document.createElement("button");
        restartBtn.classList.value="restart";
        restartBtn.innerText="Play Again";
        restartBtn.setAttribute("style", "width:100px; height:40px; ")
        restartBtn.addEventListener("click", (e) => {gameBoard.resetBoard(e, divs, endScreen)});

        endMenu.appendChild(results);
        endMenu.appendChild(restartBtn);
        endScreen.appendChild(endMenu);


        const body=document.querySelector("body");
        body.appendChild(endScreen);


    };


    return {
        displaySign,
        displayWinner,
    };
    
})();







