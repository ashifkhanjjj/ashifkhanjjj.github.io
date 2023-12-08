const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let btn = document.querySelectorAll(".song #play_btn");
let song = document.querySelectorAll("#music");

/*popup music player part*/
let p_m_player = document.querySelector(".popup_music_player");
let down_player = document.querySelector("#down_player");
let current_track_name = document.querySelector("#current_track_name");
let current_singer_name = document.querySelector("#current_singer_name");
let current_album = document.querySelector("#current_album");
let song_img = document.querySelector(".song-thumb-wrapper");
const loopBtn = document.getElementById("loop_btn");
const randomBtn = document.getElementById("random_btn");
const cd = $(".song-thumb-wrapper");
const cdWidth = cd.offsetWidth;
const cdThumb = $(".song-thumb-wrapper");
const progress = $("#progress");
const cdThumbAnimation = cdThumb.animate([{ transform: "rotate(360deg)" }], {
  duration: 7000, // 10s
  iterations: Infinity,
});
/*controlls part*/
let play_pause_btn = document.querySelector("#play_pause_btn");
let slider = document.querySelector("#slider");
let forward_btn = document.querySelector("#forward_btn");
let backward_btn = document.querySelector("#backward_btn");
var audioPlayer = document.getElementById("audioPlayer");
var volumeSlider = document.querySelector("#volume-slider");
var volumeTrail = document.querySelector(".volume-trail");

/*songs duration*/
let current_duration = document.querySelector("#current_duration");
let total_duration = document.querySelector("#total_duration");

/*small music player part*/
let s_m_player = document.querySelector(".small_music_player");
let playing_img = document.querySelector(".playing_img");
let wave_animation = document.querySelector(".wave_animation");
let up_player = document.querySelector("#up_player");
let song_name = document.querySelector("#song_name");
let artist_name = document.querySelector("#artist_name");

/*default values*/
let is_song_played = false;
let song_status = false;
let index_no = 0;
song[index_no].volume = 0.5;

btn.forEach((btn, index) => {
  btn.addEventListener("click", function () {
    s_m_player.style.transform = "translateY(0px)";

    if (index != index_no) {
      song_status = false;
    }

    index_no = index;

    song[index].currentTime = 0;

    if (song_status == false) {
      play_song();
    } else {
      pause_song();
    }
  });
});

/*pause song*/
function pause_song() {
  song[index_no].pause();
  song_status = false;
  clearInterval(update_second);
  wave_animation.style.opacity = "0";
  play_pause_btn.innerHTML =
    '<i class="fa fa-pause-circle fa-beat" aria-hidden="true"></i>';
}

/*loop button*/
loopBtn.addEventListener("click", function () {
  loopBtn.classList.toggle("active");

  const currentAudio = song[index_no];
  currentAudio.loop = !currentAudio.loop;

  if (currentAudio.loop) {
    console.log("Song is looping");
  } else {
    console.log("Song loop turned off");
  }
});

/*ramdom button*/
function randomizeNextSong() {
  let randomIndex = Math.floor(Math.random() * All_song.length);
  while (randomIndex === index_no) {
    randomIndex = Math.floor(Math.random() * All_song.length);
  }
  index_no = randomIndex;
  play_song();
  cdThumbAnimation.cancel();
  cdThumbAnimation.play();
}

// Update the ended event listener to randomize the next song
song[index_no].addEventListener("ended", function () {
  randomizeNextSong();
});

// Event listener for the random button click
randomBtn.addEventListener("click", randomizeNextSong);

/*This function will update every 1s*/
function update_second() {
  let position = 0;

  // update slider position
  if (!isNaN(song[index_no].duration)) {
    position = song[index_no].currentTime * (100 / song[index_no].duration);
    slider.value = position;
  }

  let durationMinutes = Math.floor(song[index_no].duration / 60);
  let durationSeconds = Math.floor(
    song[index_no].duration - durationMinutes * 60
  );
  total_duration.textContent = durationMinutes + ":" + durationSeconds;

  // Calculate the time left and the total duration
  let curr_minutes = Math.floor(song[index_no].currentTime / 60);
  let curr_seconds = Math.floor(song[index_no].currentTime - curr_minutes * 60);

  // Add a zero to the single digit time values
  if (curr_seconds < 10) {
    curr_seconds = "0" + curr_seconds;
  }
  if (durationSeconds < 10) {
    durationSeconds = "0" + durationSeconds;
  }

  // Display the updated duration
  current_duration.textContent = curr_minutes + ":" + curr_seconds;

  // function will run when the song is over
  if (song[index_no].ended) {
    clearInterval(update_second);
    wave_animation.style.opacity = "0";
    play_pause_btn.innerHTML =
      '<i class="fa fa-pause-circle fa-beat" aria-hidden="true"></i>';
  }
}

/*show popup music player */
up_player.addEventListener("click", function () {
  p_m_player.style.transform = "translateY(0%)";
});

/* Hide popup music player */
down_player.addEventListener("click", function () {
  p_m_player.style.transform = "translateY(110%)";
});

/*play pause btn inside the popup Music player*/
play_pause_btn.addEventListener("click", function () {
  if (song_status == false) {
    song[index_no].play();
    song_status = true;
    wave_animation.style.opacity = "1";
    this.innerHTML =
      '<i class="fa fa-pause-circle fa-beat" aria-hidden="true"></i>';
    cdThumbAnimation.play();
  } else {
    song[index_no].pause();
    song_status = false;
    wave_animation.style.opacity = "0";
    this.innerHTML = '<i class="fa fa-circle-play" aria-hidden="true"></i>';
    cdThumbAnimation.pause();
  }
});

// change slider position
function change_duration() {
  slider_position = song[index_no].duration * (slider.value / 100);
  song[index_no].currentTime = slider_position;
}

function adjustVolume(currVol) {
  song[index_no].volume = currVol;
  console.log(currVol, currVol !== "0", currVol !== 0);
  if (currVol !== "0" && currVol !== 0)
    volumeTrail.style.width = `${currVol * 100 - 2}%`;
  else volumeTrail.style.width = "0%";
  volumeSlider.value = currVol;
}

/*forward btn (next)*/
forward_btn.addEventListener("click", function () {
  play_pause_btn.innerHTML =
    '<i class="fa fa-pause-circle fa-beat" aria-hidden="true"></i>';
  index_no = index_no + 1;
  if (index_no == All_song.length) {
    index_no = 0;
  }

  song[index_no].currentTime = 0;
  play_song();
  cdThumbAnimation.cancel();
  cdThumbAnimation.play();
});

/*backward btn (previous)*/
backward_btn.addEventListener("click", function () {
  play_pause_btn.innerHTML =
    '<i class="fa fa-pause-circle fa-beat" aria-hidden="true"></i>';
  if (index_no == 0) {
    index_no = All_song.length - 1;
  } else {
    index_no = index_no - 1;
  }

  song[index_no].currentTime = 0;

  play_song();
  cdThumbAnimation.cancel();
  cdThumbAnimation.play();
});

/*play function*/
function play_song() {
  song[index_no].play();

  if (is_song_played == true) {
    document.querySelector(".active_song").pause();
    document.querySelector(".active_song").classList.remove("active_song");
  } else {
    is_song_played = true;
  }

  song[index_no].classList.add("active_song");

  song_status = true;
  setInterval(update_second, 1000);
  wave_animation.style.opacity = "1";
  p_m_player.style.transform = "translateY(0%)";

  song_img.innerHTML = `
    <div style="position: relative; width: 200px; height: 200px;">
      <svg height="200" width="200" style="position: absolute; top: 0; left: 0;">
        <circle class="song-progress-meter" cx="100" cy="100" r="90" stroke="#4d3f61" stroke-width="10" fill="none" />
      </svg>
      <img src="${All_song[index_no].img}" style="width: 160px; height: 160px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border-radius: 50%; background-position: center center; background-size: cover; transition: all ease-in-out 0.5s;" class="cd-thumb" />
    </div>
  `;

  playing_img.innerHTML = `<img src="${All_song[index_no].img}" />`;

  song_name.innerHTML = All_song[index_no].name;
  artist_name.innerHTML = All_song[index_no].singer;

  current_track_name.innerHTML = All_song[index_no].name;
  current_singer_name.innerHTML = All_song[index_no].singer;
  current_album.innerHTML = All_song[index_no].album;
  play_pause_btn.innerHTML =
    '<i class="fa fa-circle-pause" aria-hidden="true"></i>';
}
