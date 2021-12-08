song = "";

function preload()
{
    song = loadSound("music.mp3");
}

sRW = 0;
sLW = 0;

rWY = 0;
rWX = 0;

lWY = 0;
lWX = 0;

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet Loaded!");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        sRW = results[0].pose.keypoints[10].score;
        sLW = results[0].pose.keypoints[9].score;
        console.log("Right wrist score is " + sRW + ", and the left wrist score is" + sLW + ".");

        rWX = results[0].pose.rightWrist.x;
        rWY = results[0].pose.rightWrist.y;
        console.log("The right wrist x is " + rWX + ", and the right wrist y is " + rWY + ".");

        lWX = results[0].pose.leftWrist.x;
        lWY = results[0].pose.leftWrist.y;
        console.log("The left wrist x is " + lWX + ", and the left wrist y is " + lWY + ".");
    }
}

function draw()
{
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");

    if(sRW > 0.2)
    {
        circle(rWX, rWY, 20);

        if(rWY > 0 && rWY <= 100)
        {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if(rWY > 100 && rWY <= 200)
        {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        else if(rWY > 200 && rWY <= 300)
        {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        else if(rWY > 300 && rWY <= 400)
        {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        else if(rWY > 400)
        {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }
    if(sLW > 0.2)
    {
        circle(lWX, lWY, 20);
        iNLWY = Number(lWY);
        newlWY = floor(iNLWY * 2);
        lWYd1000 = newlWY / 1000;
        document.getElementById("volume").innerHTML = "Volume = " + lWYd1000;
        song.setVolume(lWYd1000);
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}