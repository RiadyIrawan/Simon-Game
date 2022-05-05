

let buttonColours=["red", "blue", "green", "yellow"];
let gamePattern=[];
let userClickedPattern=[];
let level=0;
let started= false;



$(".btn").on("click",function(event){
    let userChosenColour=  $(this).attr("id");

    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

$(document).on("keypress",function(){
    if(!started){
        $("#level-title").text("level "+level);
        nextSequence();
        started=true;
    }
});

function nextSequence(){
  let randomNumber = Math.floor(Math.random()*4);
  let randomChosenColour= buttonColours[randomNumber];
  userClickedPattern=[];
  level++;
  $("#level-title").text("level "+level);
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  
  let audio= new Audio ("sound/"+randomChosenColour+".mp3");
  audio.play();
     
 }

function playSound(name){
    let audio= new Audio ("sound/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100)
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    
    else{
        
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key To Restart");

        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}