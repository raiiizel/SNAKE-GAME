const gameboard = document.querySelector("#gameboard");
const context = gameboard.getContext("2d");
const scoretext = document.querySelector("#scoretext");
const resetbtn = document.querySelector("#resetbtn");
const gamewidth = gameboard.width;
const gameheight = gameboard.height;
const boardbackground = "white";
const snakecolor = "lightgreen";
const snakeborder = "black";
const foodcolor = "red";
const unitsize = 25;
let running = false;
let xvelocity = unitsize;
let yvelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x:unitsize*4, y:0},
    {x:unitsize*3, y:0}, 
    {x:unitsize*2, y:0},
    {x:unitsize, y:0},
    {x:0, y:0}
];
window.addEventListener("keydown", changedirection);
resetbtn.addEventListener("click",resetgame);

gamestart();

function gamestart(){
    running= true;
    scoretext.textContent = score;
    createfood();
    drawfood();
    nexttick();

}
function nexttick(){
    if(running){
        setTimeout(()=>{
            clearboard();
            drawfood();
            movesnake();
            drawsnake();
            checkgameover();
            nexttick();
        },75);
    }
    else{
        displaygameover();
    }
}
function clearboard(){
    context.fillStyle=boardbackground;
    context.fillRect(0,0,gamewidth,gameheight);
    if(score>=5){
        context.fillStyle="lightblue";
    context.fillRect(0,0,gamewidth,gameheight);
    }
}
function createfood(){
    function randomfood(min, max){
        const randnum = Math.round((Math.random() * (max - min) + min) / unitsize) * unitsize;
        return randnum;
    }
    foodX = randomfood(0, gamewidth - unitsize);
    foodY = randomfood(0, gamewidth - unitsize);
    for(let i =0;i< snake.length ;i++){
        if(snake[i].x == foodX && snake[i].y == foodY){
            createfood();
        }
    }
}
function drawfood(){
    context.fillStyle = foodcolor;
    context.fillRect(foodX, foodY, unitsize, unitsize);
}
function movesnake(){
    const head = {x: snake[0].x + xvelocity,
                  y: snake[0].y + yvelocity};
    snake.unshift(head);
    if(snake[0].x == foodX &&snake[1].y == foodY){
         score +=1;
         scoretext.textContent = score;
         createfood();
    }
    else{
        snake.pop();
    }
}
function drawsnake(){
    context.fillStyle=snakecolor;
    context.strokeStyle= snakeborder;
    snake.forEach(snakepart =>{
        context.fillRect(snakepart.x,snakepart.y,unitsize,unitsize);
        context.strokeRect(snakepart.x,snakepart.y,unitsize,unitsize);
    })
}
function changedirection(event){
    const keypressed = event.keyCode;
    const LEFT =37;
    const UP = 38;
    const RIGHT =39;
    const DOWN = 40;
    const goingUP =(yvelocity== -unitsize);
    const goingDOWN =(yvelocity== unitsize);
    const goingRIGHT =(xvelocity== unitsize);
    const goingLEFT =(xvelocity== -unitsize);
    
    switch(true){
        case(keypressed == LEFT && !goingRIGHT):
            xvelocity = -unitsize;
            yvelocity = 0;
            break;
        case(keypressed == RIGHT && !goingLEFT):
            xvelocity = unitsize;
            yvelocity = 0;
            break;
        case(keypressed == UP && !goingDOWN):
        xvelocity = 0;
        yvelocity = -unitsize;
        break;
        case(keypressed == DOWN && !goingUP):
        xvelocity = 0;
        yvelocity = unitsize;
        break;
    }

}
function checkgameover(){
    
    switch(true){
        case(snake[0].x < 0 ):
            snake[0].x = gamewidth;
            break
        case(snake[0].x >= gamewidth ):
            snake[0].x = 0;
            break;
        case(snake[0].y < 0 ):
            snake[0].y = gamewidth;
            break;
        case(snake[0].y >= gamewidth ):
            snake[0].y = 0;
            break;
        }

    for(let i =1;i< snake.length ;i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running=false;
        }
    }
}
function displaygameover(){
    context.font ="50px MV Boli";
    context.fillStyle="black";
    context.textAlign="center";
    context.fillText("GAME OVER!", gamewidth/2,gameheight/2);
    running=false;
}
function resetgame(){
    xvelocity = unitsize;
    yvelocity=0;
    score = 0;
    snake = [
        {x:unitsize*4, y:0},
        {x:unitsize*3, y:0}, 
        {x:unitsize*2, y:0},
        {x:unitsize, y:0},
        {x:0, y:0}
    ];
    gamestart();
}