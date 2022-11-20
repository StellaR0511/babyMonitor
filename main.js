video = "";
status = "";
object = [];
alarm = "";

function setup(){
canvas = createCanvas(380,380);
canvas.center();
video = createCapture(VIDEO);
video.hide();
video.size(380,380);
}

function preload(){
alarm = loadSound("alarm.mp3")
}

function start(){
    objectDetected = ml5.objectDetector("cocossd", modelLoaded);
document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object = results;
    }
}

function preload(){

video = loadImage("elephant.jpg");

}

function draw(){

image(video, 0,0,380,380);
if(status!=""){
    r = Math.floor(random(255));
  g = Math.floor(random(255));
  b = Math.floor(random(255));

    objectDetected.detect(video, gotResult);

    for(i=0;i<object.length;i++){
        //console.log(object);
        document.getElementById("status").innerHTML = "Status: Object Detected";
       
        fill(r,g,b);
        percent = floor(object[i].confidence*100);
        text(object[i].label+" "+percent+"%", object[i].x+5,object[i].y+20);
        noFill();
        stroke(r,g,b);
        rect(object[i].x,object[i].y, object[i].width, object[i].height);
        if(object[i].label=="person"){
            document.getElementById("numberofobjects").innerHTML = "Baby Found";
        }
        else if(object[i].label!="person"){
            document.getElementById("numberofobjects").innerHTML = "Baby Not Found!";
            alarm.play();
        }
    }
}

/*fill("red");
text("Dog",45,75);
stroke("red");
noFill();
rect(30,60,450,350);

fill("red");
text("Cat",320 ,70);
stroke("red");
noFill();
rect(300,50, 300,350);*/
}