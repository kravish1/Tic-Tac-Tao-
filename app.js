var Tic = (function(global,$){
  //Private Members
  let _instance;

  function buildGUI(){
    var board = $('.board');

    for(var i=0;i<3;i++){
      this.getBoard().push([]);
      var column = $("<div class='column'></div>");
      board.append(column);
      for(var j=0;j<3;j++){
        this.getBoard()[i][j] = '';
        column.append("<div class='square' data-row=" + i +" data-col=" + j +"></div>");
      }
    }
  }

  function addTurnText(player){
    $('.message').html("<h1>" + player +", it's your turn.</h1>");
  }

  function isValidMove(move){
    return (move.html() === '');
  }
  function updateMatrix(square){
    square.html("<h1>" + this.getCurrentPlayer() + "</h1>");
    this.getBoard()[square.data('row')][square.data('col')] = this.getCurrentPlayer();
  }

  function gameWin(symbol){
    for(var i=0;i<3;i++){
      if(
          (this.getBoard()[i][0] === symbol &&
           this.getBoard()[i][1] === symbol &&
           this.getBoard()[i][2] === symbol
          ) ||
          (this.getBoard()[0][i] === symbol &&
           this.getBoard()[1][i] === symbol &&
           this.getBoard()[2][i] === symbol
          )
      ){
          return true;
       }

      if(
           (this.getBoard()[0][0] === symbol &&
            this.getBoard()[1][1] === symbol &&
            this.getBoard()[2][2] === symbol
           )||
           (this.getBoard()[0][2] === symbol &&
            this.getBoard()[1][1] === symbol &&
            this.getBoard()[2][0] === symbol
           )
        ){
            return true;
          }
    }
    return false;
  }

  function gameTie(){
    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
          if(this.getBoard()[i][j] === '')
            return false;
        }
    }
    return true;
  }

  function handleClick(){
      var square = $('.square')
      that = this;
      square.click(function(){
        if(!that.getGameover() && isValidMove($(this))){
            updateMatrix.call(that,$(this));
            if(gameWin.call(that,that.getCurrentPlayer())){
                $('.message').html("<h1>" + that.getCurrentPlayer() +", You Won.</h1>");
            }
            else if(gameTie.call(that,that.getCurrentPlayer())){
                $('.message').html("<h1>Game Tied.</h1>");
            }
            else{
              (that.getCurrentPlayer() === 'X') ? that.setCurrentPlayer('O') : that.setCurrentPlayer('X');
              addTurnText(that.getCurrentPlayer());
            }
        }
      });

      $('#reset').on('click',function(){
        $('.board').empty();
        that.setBoard([]);
        that.setCurrentPlayer('X');
        that.init();
      });

  }
// Main Tic Tac Tao Class
  class Tic {
    constructor(){
      //Private Variables
      var _board = [];
      var _gameover = false;
      var _currentPlayer = 'X';

      // Getters and Setters for Private Variables
      this.getBoard = function(){
        return _board;
      };
      this.setBoard = function(val){
        _board = val;
      };
      this.getGameover = function(){
        return _gameover;
      };
      this.setGameover = function(val){
        _gameover = val;
      };
      this.getCurrentPlayer = function(){
        return _currentPlayer;
      };
      this.setCurrentPlayer = function(symbol){
        _currentPlayer = symbol;
      };
      //Single to return just one instance of the game
      if(!_instance)
        _instance = this;
        return _instance;
    }
    //Game Setup Method
    init(){
      $('.board').empty();
      buildGUI.call(this);
      addTurnText.call(this,this.getCurrentPlayer());
      handleClick.call(this);
    }


  }
  //Setting the instance to the global scope
  _instance = new Tic();

  if(!global.Tic)
    return global.Tic = _instance;

})(window,jQuery);

//Game Start Point
$(document).ready(() => {
  Tic.init();
});
