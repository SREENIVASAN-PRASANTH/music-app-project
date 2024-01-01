console.log("spaudios")

//Intialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById("masterSongName");

let songs = [
    {songName : "Anbenum Aayudhamdhane (Uyir Padhi Unake)", filePath : "songs/1.mp3", coverPath : "covers/1.jpg"},
    {songName : "Ordinary Person (My Life is in This Town)", filePath : "songs/2.mp3", coverPath : "covers/2.jpg"},
    {songName : "Bloody Sweet", filePath : "songs/3.mp3", coverPath : "covers/3.jpg"},
    {songName : "Badass (Singam Eranguna Kaatukke Virundhu)", filePath : "songs/4.mp3", coverPath : "covers/4.jpg"},
    {songName : "Naa Ready Thaan Varavaa", filePath : "songs/5.mp3", coverPath : "covers/5.jpg"},
    {songName : "Villadhi Villana (Orayiram Kadhaigal Sollume)", filePath : "songs/6.mp3", coverPath : "covers/3.jpg"},
    {songName : "Arabic Kuthu (Halamithi Habibo)", filePath : "songs/7.mp3", coverPath : "covers/7.jpg"},
    {songName : "Beast Mode (Thirai Thee Pidikkum)", filePath : "songs/8.mp3", coverPath : "covers/8.jpg"},
    {songName : "Jolly O Gymkhana (Rendula Onnu Paakalaam)", filePath : "songs/9.mp3", coverPath : "covers/9.jpg"}
]

songItems.forEach(function(element,i){
        
        element.getElementsByTagName("img")[0].src = songs[i].coverPath;
        element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


//audioElement.play();

//handle pause or play
masterPlay.addEventListener('click', function(){
    if( audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = 0;
        makeAllPlays();
    }
})

//Listen to events
 audioElement.addEventListener('timeupdate',function(){
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100)
    myProgressBar.value = progress;
 })

 myProgressBar.addEventListener('change',function(){
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
 })
 

 const makeAllPlays = function(){
    Array.from(document.getElementsByClassName('songItemPlay')).forEach(function(element){
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    })
    
 }

Array.from(document.getElementsByClassName('songItemPlay')).forEach(function(element){
    element.addEventListener('click',function(event){
        makeAllPlays();
        
        songIndex = parseInt(event.target.id);

        if( audioElement.paused || audioElement.currentTime <= 0){
            event.target.classList.remove("fa-play-circle");
            event.target.classList.add("fa-pause-circle");
            masterSongName.textContent = songs[songIndex].songName;

            audioElement.src = `songs/${songIndex + 1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
        }
        else{
            event.target.classList.remove("fa-pause-circle");
            event.target.classList.add("fa-play-circle");
            audioElement.pause();
            masterSongName.textContent = "";
            masterPlay.classList.remove("fa-pause-circle");
            masterPlay.classList.add("fa-play-circle");
            gif.style.opacity = 0;
        }
        
        
    })
})

document.getElementById("next").onclick = function(){
    if(songIndex >= 8){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.textContent = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
}

document.getElementById("previous").onclick = function(){
    if(songIndex <= 0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.textContent = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
}