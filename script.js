const player= (name, mark) => {
   
    return {name, mark};
}

const game=(() => {
    
    const _player1= player("first", "X");
    const _player2= player("second", "O");

    let _currentPlayer={};

    //Toggling the turns between players
    const togglePlayer= (e) => {
        if(_currentPlayer==={}){
            _currentPlayer=Object.assign({}, _player1);
            console.log(_currentPlayer);
        }
        if(e.target.innerText===""){

            if(_currentPlayer.mark===_player1.mark){
                _currentPlayer=Object.assign({}, _player2);
            }
            else{
                _currentPlayer=Object.assign({}, _player1);
            }

        }
          
    };

    const getCurrentPlayer= () => {
        return _currentPlayer;
    };

    const _checkWinner= () => {
        //Checking horizontally
        for(let i=0; i<=6; i+=3){
            if(gameBoard.getBoard()[i]==="X" && gameBoard.getBoard()[i+1]==="X" && gameBoard.getBoard()[i+2]==="X"){
                console.log("x is winner");
            }
            else if(gameBoard.getBoard()[i]==="O" && gameBoard.getBoard()[i+1]==="O" && gameBoard.getBoard()[i+2]==="O"){
                console.log("O is winner");
            }
                  
        }

       //Checking vertically
       for(let i=0; i<3; ++i){
           if(gameBoard.getBoard()[i]==="X" && gameBoard.getBoard()[i+3]==="X" && gameBoard.getBoard()[i+6]==="X"){
               console.log("x is winner");
           }
           else if(gameBoard.getBoard()[i]==="O" && gameBoard.getBoard()[i+3]==="O" && gameBoard.getBoard()[i+6]==="O"){
               console.log("O is winner");
           }
       }

       //Checking diagonally
       for(let i=0; i<3; i+=2){
           if(i<2){
                if(gameBoard.getBoard()[i]==="X" && gameBoard.getBoard()[i+4]==="X" && gameBoard.getBoard()[i+8]==="X"){
                     console.log("x is winner");
                }
                else if(gameBoard.getBoard()[i]==="O" && gameBoard.getBoard()[i+4]==="O" && gameBoard.getBoard()[i+8]==="O"){
                     console.log("O is winner");
                }

            }
            else if(i===2){
                if(gameBoard.getBoard()[i]==="X" && gameBoard.getBoard()[i+2]==="X" && gameBoard.getBoard()[i+4]==="X"){
                    console.log("x is winner");
               }
               else if(gameBoard.getBoard()[i]==="O" && gameBoard.getBoard()[i+2]==="O" && gameBoard.getBoard()[i+4]==="O"){
                    console.log("O is winner");
               }

            }
       
    }

    };

    const getWinner= () => {
        _checkWinner();
    }
   
    return {
       togglePlayer,
       getCurrentPlayer,
       getWinner,
    };
})();


const gameBoard= (() => {
    let _board=["","","","","","","","",""];

    //Setting the value of _board array
    const _setMark= (e) => {
        console.log(e);
        _board[e.target.dataset.index]=game.getCurrentPlayer().mark;
        displayController.displaySign(e, e.target.dataset.index);
        console.log(_board);

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

    return {
        getBoard,
        getMark,
    };
})();


const displayController= (() => {
    const createBoard= () => {
        const gameBoard=document.querySelector(".gameboard");
        for(let i=0; i<9; ++i){
            const div=document.createElement("div");
            div.classList.value="tile";
            div.setAttribute("data-index", i);
            div.setAttribute("style", "height:170px; width:170px; border:1px solid black;");
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

    return {
        displaySign,
    };
    
})();







