const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

const box=20;
const rows=20;
const cols=20;

let snake;
let food;
let direction;
let score;
let game;

function randomFood(){

    while(true){

        let x=Math.floor(Math.random()*cols);
        let y=Math.floor(Math.random()*rows);

        let collide=snake.some(part=>part.x===x&&part.y===y);

        if(!collide){
            return {x,y};
        }

    }

}

function startGame(){

    snake=[
        {x:10,y:10},
        {x:9,y:10},
        {x:8,y:10}
    ];

    direction="RIGHT";
    score=0;
    food=randomFood();

    document.getElementById("score").textContent=score;

    clearInterval(game);
    game=setInterval(draw,100);

}

document.addEventListener("keydown",changeDirection);

function changeDirection(e){

    let key=e.key.toLowerCase();

    if((key==="arrowup"||key==="w")&&direction!=="DOWN")
        direction="UP";

    if((key==="arrowdown"||key==="s")&&direction!=="UP")
        direction="DOWN";

    if((key==="arrowleft"||key==="a")&&direction!=="RIGHT")
        direction="LEFT";

    if((key==="arrowright"||key==="d")&&direction!=="LEFT")
        direction="RIGHT";

}

function draw(){

    ctx.fillStyle="#222";
    ctx.fillRect(0,0,400,400);

    //Food
    ctx.fillStyle="red";
    ctx.fillRect(food.x*box,food.y*box,box,box);

    //Snake
    snake.forEach((part,index)=>{

        ctx.fillStyle=index===0?"lime":"green";
        ctx.fillRect(part.x*box,part.y*box,box,box);

    });

    let headX=snake[0].x;
    let headY=snake[0].y;

    if(direction==="UP") headY--;
    if(direction==="DOWN") headY++;
    if(direction==="LEFT") headX--;
    if(direction==="RIGHT") headX++;

    //Wall collision
    if(
        headX<0||
        headX>=cols||
        headY<0||
        headY>=rows
    ){
        gameOver();
        return;
    }

    //Self collision
    for(let part of snake){

        if(part.x===headX&&part.y===headY){
            gameOver();
            return;
        }

    }

    let head={x:headX,y:headY};

    snake.unshift(head);

    //Food
    if(headX===food.x&&headY===food.y){

        score++;
        document.getElementById("score").textContent=score;
        food=randomFood();

    }else{

        snake.pop();

    }

}

function gameOver(){

    clearInterval(game);

    setTimeout(()=>{

        alert("Game Over!\nScore: "+score);

    },100);

}

document.getElementById("restart").onclick=startGame;

startGame();
