var vid = document.getElementById('videoel');
var vid_width = vid.width;
var vid_height = vid.height;
var overlay = document.getElementById('overlay');
var overlayCC = overlay.getContext('2d');
var facePlace = "";
var model = "";

/*********** Setup of video/webcam and checking for webGL support *********/

// function enablestart() {
//     var startbutton = document.getElementById('startbutton');
//     startbutton.value = "start";
//     startbutton.disabled = null;
// }

var insertAltVideo = function(video) {
    // insert alternate video if getUserMedia not available
    if (supports_video()) {
        if (supports_webm_video()) {
            video.src = "./media/cap12_edit.webm";
        } else if (supports_h264_baseline_video()) {
            video.src = "./media/cap12_edit.mp4";
        } else {
            return false;
        }
        return true;
    } else return false;
};

function adjustVideoProportions() {
    // resize overlay and video if proportions of video are not 4:3
    // keep same height, just change width
    // var proportion = vid.videoWidth/vid.videoHeight;
    // vid_width = Math.round(vid_height * proportion);
    // vid.width = vid_width;
    // overlay.width = vid_width;
}

function gumSuccess( stream ) {
    // add camera stream if getUserMedia succeeded
    if ("srcObject" in vid) {
        vid.srcObject = stream;
    } else {
        vid.src = (window.URL && window.URL.createObjectURL(stream));
    }
    vid.onloadedmetadata = function() {
        adjustVideoProportions();
        vid.play();
    };
    vid.onresize = function() {
        adjustVideoProportions();
        if (trackingStarted) {
            ctrack.stop();
            ctrack.reset();
            ctrack.start(vid);
        }
    }
}

function gumFail() {
    // fall back to video if getUserMedia failed
    insertAltVideo(vid);
    document.getElementById('gum').className = "hide";
    document.getElementById('nogum').className = "nohide";
    alert("There was some problem trying to fetch video from your webcam, using a fallback video instead.");
}

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;

// set up video
if (navigator.mediaDevices) {
    navigator.mediaDevices.getUserMedia({video : true}).then(gumSuccess).catch(gumFail);
} else if (navigator.getUserMedia) {
    navigator.getUserMedia({video : true}, gumSuccess, gumFail);
} else {
    insertAltVideo(vid);
    document.getElementById('gum').className = "hide";
    document.getElementById('nogum').className = "nohide";
    alert("Your browser does not seem to support getUserMedia, using a fallback video instead.");
}

//vid.addEventListener('canplay', enablestart, false);

/*********** Code for face tracking *********/

var ctrack = new clm.tracker();
ctrack.init();
var trackingStarted = false;

function startTracking(mod, plc) {
    // start video
    vid.play();
    // start tracking
    ctrack.start(vid);
    trackingStarted = true;
    // start loop to draw face
    model = mod;
    facePlace = plc;
    drawLoop();
}

function drawLoop() {
    requestAnimFrame(drawLoop);
    overlayCC.clearRect(0, 0, vid_width, vid_height);
    //psrElement.innerHTML = "score :" + ctrack.getScore().toFixed(4);
    if (ctrack.getCurrentPosition()) {
        switch(facePlace){
            case 'lips' : drawLips(model); break;
            case 'eyebrows' : drawEyebrows(model); break;
            case 'eyes' : drawEyes(model); break;
        }
    }
}

function getEyesArray() {
    let a = ctrack.getCurrentPosition();
    let NeedArray = [];
    NeedArray.push(a[23], a[63], a[24], a[64],
        a[25], a[65], a[26], a[66],
        a[30], a[68], a[29], a[67],
        a[28], a[70], a[31], a[69])
    return(NeedArray)
}

function drawEyes (){
    let a = getEyesArray();
    overlayCC.beginPath();
    overlayCC.moveTo(a[0][0],   a[0][1]);
    overlayCC.lineTo(a[1][0],   a[1][1]);
    overlayCC.lineTo(a[2][0],   a[2][1]);
    overlayCC.lineTo(a[3][0],   a[3][1]);
    overlayCC.lineTo(a[4][0],   a[4][1]);
    overlayCC.lineTo(a[5][0],   a[5][1]);
    overlayCC.lineTo(a[6][0],   a[6][1]);
    overlayCC.lineTo(a[7][0],   a[7][1]);
    overlayCC.moveTo(a[9][0],   a[9][1]);
    overlayCC.lineTo(a[10][0], a[10][1]);
    overlayCC.lineTo(a[11][0], a[11][1]);
    overlayCC.lineTo(a[12][0], a[12][1]);
    overlayCC.lineTo(a[13][0], a[13][1]);
    overlayCC.lineTo(a[14][0], a[14][1]);
    overlayCC.lineTo(a[15][0], a[15][1]);
    overlayCC.lineTo(a[16][0], a[16][1]);
    overlayCC.strokeStyle = String(model);
    overlayCC.globalAlpha = 0.5;
    overlayCC.fill();
}


function getEyebrowsArray(){
    let a = ctrack.getCurrentPosition();
    let NeedArray = [];
    NeedArray.push(a[19], a[20], a[21], a[22],
        a[18], a[17], a[16], a[15]);
    return(NeedArray)
}

function drawEyebrows(model){
    let a = getEyebrowsArray();
    overlayCC.beginPath();
    overlayCC.lineWidth = 3;
    overlayCC.strokeStyle = model;
    overlayCC.moveTo(a[0][0],   a[0][1]);
    overlayCC.lineTo(a[1][0],   a[1][1]);
    overlayCC.lineTo(a[2][0],   a[2][1]);
    overlayCC.lineTo(a[3][0],   a[3][1]);
    overlayCC.moveTo(a[4][0],   a[4][1]);
    overlayCC.lineTo(a[5][0],   a[5][1]);
    overlayCC.lineTo(a[6][0],   a[6][1]);
    overlayCC.lineTo(a[7][0],   a[7][1]);
    overlayCC.globalAlpha = 0.5;
    overlayCC.stroke();
}


function getLipsArray(){
    let a = ctrack.getCurrentPosition();
    let NeedArray = [];
    NeedArray.push(a[44], a[45], a[46], a[47],
        a[48], a[49], a[50], a[59],
        a[60], a[61], a[44], a[56],
        a[57], a[58], a[50], a[51],
        a[52], a[53], a[54], a[55]);
    return(NeedArray)
}

function drawLips(model){
    let a = getLipsArray();
    overlayCC.beginPath();
    overlayCC.lineTo(a[0][0],   a[0][1]);
    overlayCC.lineTo(a[1][0],   a[1][1]);
    overlayCC.lineTo(a[2][0],   a[2][1]);
    overlayCC.lineTo(a[3][0],   a[3][1]);
    overlayCC.lineTo(a[4][0],   a[4][1]);
    overlayCC.lineTo(a[5][0],   a[5][1]);
    overlayCC.lineTo(a[6][0],   a[6][1]);
    overlayCC.lineTo(a[7][0],   a[7][1]);
    overlayCC.lineTo(a[9][0],   a[9][1]);
    overlayCC.lineTo(a[10][0], a[10][1]);
    overlayCC.lineTo(a[11][0], a[11][1]);
    overlayCC.lineTo(a[12][0], a[12][1]);
    overlayCC.lineTo(a[13][0], a[13][1]);
    overlayCC.lineTo(a[14][0], a[14][1]);
    overlayCC.lineTo(a[15][0], a[15][1]);
    overlayCC.lineTo(a[16][0], a[16][1]);
    overlayCC.lineTo(a[17][0], a[17][1]);
    overlayCC.lineTo(a[18][0], a[18][1]);
    overlayCC.lineTo(a[19][0], a[19][1]);
    overlayCC.fillStyle = String(model);
    overlayCC.globalAlpha = 0.5;
    overlayCC.fill();
}

function changeColor(newcolor) {
    model = newcolor;
}