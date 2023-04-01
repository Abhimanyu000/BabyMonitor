img="";
stat="";
object=[];
song="";

function preload(){
    song = loadSound("s.wav");
}

function setup(){
    canvas=createCanvas(380, 380);
    canvas.center();

    video=createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

    MoDeL=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Object detection has begun";
}

function modelLoaded(){
    stat="true";
    console.log("MODEL LOADED");
}

function gotresults(error, results){
    if (error){
        console.log("ERROR 404");
    }
    else{
        console.log(results);
        object=results;
    }
}

function draw(){
    image(video, 0, 0, 380, 380);

    if(stat!=""){
        MoDeL.detect(video, gotresults);

        green=random(255);
        red=random(255);
        blue=random(255);

        for(i=0; i<object.length; i++){
            document.getElementById("status").innerHTML="Object detected";

            fill(red, green, blue);
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%", object[i].x+10, object[i].y+10);
            noFill();
            stroke(red, green, blue);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);

            if(object[i].label=="person"){
                document.getElementById("NUMBERofOBJECTS").innerHTML="Baby detected";
                song.stop();
            }
            else{
                song.play();
                document.getElementById("NUMBERofOBJECTS").innerHTML="Baby lost";
            }
            
        }
        if(object.length==0){
            song.play();
            document.getElementById("NUMBERofOBJECTS").innerHTML="Baby lost";
        }
    }
}