song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftWrist=0;
scorerightWrist=0;

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoad);
    posenet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,600,500);
    fill("#A2341C");
    stroke("#1CA277");
    circle(rightWristX,rightWristY,20);

    if(scorerightWrist>0.2){
        if(rightWristY>0&&rightWristY<=100){
            document.getElementById("speed").innerHTML="velocidad=0.5X";
          song.rate(0.5);
        }
        else    if(rightWristY>100&&rightWristY<=200){
            document.getElementById("speed").innerHTML="velocidad=1X";
          song.rate(1); 
        }
        else    if(rightWristY>200&&rightWristY<=300){
            document.getElementById("speed").innerHTML="velocidad=1.5X";
          song.rate(1.5); 
        }
        else    if(rightWristY>300&&rightWristY<=400){
            document.getElementById("speed").innerHTML="velocidad=2X";
          song.rate(2); 
        }
        else    if(rightWristY>400&&rightWristY<=500){
            document.getElementById("speed").innerHTML="velocidad=2.5X";
          song.rate(2.5); 
        }
    }


    if(scoreleftWrist>0.2){
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY=Number(leftWristY);
    remove_decimals=floor(InNumberleftWristY);
    volume=remove_decimals/500;
 document.getElementById("volume").innerHTML="volumen= "+volume;
 song.setVolume(volume);
 }   
}
function preload(){
    song=loadSound("DD.mp3");
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoad(){
    console.log("POSENET A INICIALIZADO");
}
function gotPoses(results){
    if(results.lenght>0){
        console.log(results);
        scorerightWrist=results[0].pose.keypoints[10].score;
     scoreleftWrist=results[0].pose.keypoints[9].score;
     console.log(scoreleftWrist, scorerightWrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log(leftWristX,leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log(rightWristX,rightWristY);
    }
}
