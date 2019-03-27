//snakes games
function init()
{
    
    canvas=document.getElementById('mycanvas');
    pen=canvas.getContext('2d');
    
    W=canvas.width;
    H=canvas.height;
    game_over=false;
    food=getRandomFood();
    score=5;
    snake={
        init_length:5,
        color:"red",
        cells:[],
        direction:"right",
        createSnake:function()
        {
          for(var i=this.init_length-1;i>=0;i--)
              {
              this.cells.push({x:i,y:0});
              }
        },
        //figure out yhe body of snake
        drawSnake:function()
    {
       for(var i=0;i<this.cells.length;i++)
           {
               //fill color in snake body
               pen.fillStyle=this.color;
               //outline the box boundary
               pen.strokeStyle="white";
           pen.lineWidth=5; pen.strokeRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
          pen.fillRect(this.cells[i].x*10,this.cells[i].y*10,10,10,10);
           }
    },
        //now updatingbthe speed of snake
        //pop first box(0,0) and push it to the last(5,0)
        //treated like reverse array
        updateSnake:function()
        {
          var headX=this.cells[0].x;
    var headY=this.cells[0].y;
    //assume snake is moving in forward direction
    //insertion at head
   // nextHeadX=headX+1;
   // this.cells.pop();
    //this.cells.unshift({x:nextHeadX,y:headY});
            if(headX==food.x&&headY==food.y)
                {
                    food=getRandomFood();
                    score++;
                }
            else{
                this.cells.pop();
            }
            if(this.direction=="right"){
                nextX=headX+1;
                nextY=headY;
            }
            else if(this.direction=="left")
                {
                    nextX=headX-1;
                    nextY=headY;
                }
            else if(this.direction=="down")
                {
                    nextX=headX;
                    nextY=headY+1;
                }
            else 
                {
                    nextX=headX;
                    nextY=headY-1;
                }
            //insert the new cell at head/front
            this.cells.unshift({x:nextX,y:nextY});
  //find out the last  coordinate where rhe snake is //found
            var last_x=Math.round(W/10);
            var last_y=Math.round(H/10);
            if(this.cells[0].y<0||this.cells[0].x<0||this.cells[0].x>last_x||this.cells[0].y>last_y)
                {
                    alert("GAME OVER");
                    game_over=true;
                }
        }
    
};
    snake.createSnake();
    //controlling snake movement using keyboard
    function KeyPressed(e){
        console.log(e);
        if(e.key=="ArrowRight")
            {
                snake.direction="right";
            }
        else if(e.key=="ArrowLeft")
            {
               snake.direction="left"; 
            }
        
        else if(e.key=="ArrowDown")
            {
               snake.direction="down"; 
            }
        else 
            {
               snake.direction="up"; 
            }
    }
    document.addEventListener('keydown',KeyPressed);
}
function draw()
{
   pen.clearRect(0,0,W,H);
    snake.drawSnake();
    pen.fillStyle=food.color;
    //draw the food
    
    
    pen.fillRect(food.x*10,food.y*10,10,10);
    pen.fillStyle="white";
    pen.font="14px Roboto";
    pen.fillText("Score :" +score,10,10); 
}
function update()
{
    snake.updateSnake();
}
//gameloop function are made to call draw and update //function repeatdly
function gameloop()
{
    draw();
    update();
    if(game_over==true)
        {
           clearInterval(f); 
        }
}
function getRandomFood()
{
  var foodX=Math.round(Math.random()*(W-10)/10);
   var foodY=Math.round(Math.random()*(H-10)/10);
    foodcolors=["red","green","aqya","coral","orchid"];
    var i=Math.round(Math.random()*foodcolors.length);
   
    var food={
        x:foodX,
        y:foodY,
        color:foodcolors[i],
    };
    return food;
}
init();

//call gameloop after t time repeatdly
//treat canvas lika a drawing board in making any game
var f=setInterval(gameloop,100);
