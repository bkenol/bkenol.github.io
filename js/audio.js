document.addEventListener("DOMContentLoaded", function(event) {

var music = document.getElementById('music'); // id for audio element
var duration; // Duration of audio clip
var pButton = document.getElementById('pButton'); // play button
var rsButton = document.getElementById('rsButton'); //reset button
var playhead = document.getElementById('playhead'); // playhead
var timeline = document.getElementById('timeline'); // timeline
var timeDisplay = document.getElementById('timeDisplay'); // display time
var songDuration = document.getElementById('songDuration');

// timeline width adjusted for playhead
var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

// play button event listenter
pButton.addEventListener("click", play);
rsButton.addEventListener("click", reset);

// timeupdate event listener
music.addEventListener("timeupdate", timeUpdate, false);

timeDisplay.addEventListener("timeupdate", function(event){
    songDuration.innerHTML = music.duration;
    timeDisplay.innerHTML = music.currentTime;
    console.log(timeDisplay);
});

window.SetVolume = function(val)
{
    var loudness = document.getElementById('music');
    console.log('Before: ' + music.volume);
    music.volume = val / 100;
    console.log('After: ' + music.volume);
}

function getCurrentTime() {
    var time = document.getElementById('music').duration;
    document.getElementById('songDuration').innerHTML = time;
}

// makes timeline clickable
timeline.addEventListener("click", function(event) {
    moveplayhead(event);
    music.currentTime = duration * clickPercent(event);
}, false);

// returns click as decimal (.77) of the total timeline Width
function clickPercent(event) {
    return (event.clientX - getPosition(timeline)) / timelineWidth;

}

// makes playhead draggable
playhead.addEventListener('mousedown', mouseDown, false);
window.addEventListener('mouseup', mouseUp, false);

// Boolean value so that audio position is updated only when the playhead is released
var onplayhead = false;


// mouseDown EventListener
function mouseDown() {
    onplayhead = true;
    window.addEventListener('mousemove', moveplayhead, true);
    music.removeEventListener('timeupdate', timeUpdate, false);
}

// mouseUp EventListener
// getting input from all mouse clicks
function mouseUp(event) {
    if (onplayhead == true) {
        moveplayhead(event);
        window.removeEventListener('mousemove', moveplayhead, true);
        // change current time
        music.currentTime = duration * clickPercent(event);
        music.addEventListener('timeupdate', timeUpdate, false);
    }
    onplayhead = false;
}
// mousemove EventListener
// Moves playhead as user drags
function moveplayhead(event) {
    var newMargLeft = event.clientX - getPosition(timeline);

    if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
        playhead.style.marginLeft = newMargLeft + "px";
    }
    if (newMargLeft < 0) {
        playhead.style.marginLeft = "0px";
    }
    if (newMargLeft > timelineWidth) {
        playhead.style.marginLeft = timelineWidth + "px";
    }
}

// timeUpdate
// Synchronizes playhead position with current point in audio
function timeUpdate() {
    var playPercent = timelineWidth * (music.currentTime / duration);
    songDuration = music.duration;
    playhead.style.marginLeft = playPercent + "px";
    if (music.currentTime == duration) {
        pButton.className = "";
        pButton.className = "play";
    }
}

//Play and Pause
function play() {
    // start music
    if (music.paused) {
        music.play();
        // remove play, add pause
        pButton.className = "";
        pButton.className = "pause";
    } else { // pause music
        music.pause();
        // remove pause, add play
        pButton.className = "";
        pButton.className = "play";
    }
}

function reset(){
    music.currentTime = 0;
}

// Gets audio file duration
music.addEventListener("canplaythrough", function() {
    duration = music.duration;
}, false);

// getPosition
// Returns elements left position relative to top-left of viewport
function getPosition(el) {
    return el.getBoundingClientRect().left;
}

/* DOMContentLoaded*/
});
