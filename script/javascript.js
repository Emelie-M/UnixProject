const songs = [
  { name: "Symbolism", artist: "Electro-Light", file: "../music/Electro-Light - Symbolism [NCS Release].mp3" },
  { name: "Song 2", artist: "Tame Impala", file: "music/song2.mp3" },
  { name: "Song 3", artist: "Tame Impala", file: "music/song3.mp3" }
];

let playlist = [];
let currentIndex = 0;

// Elements
const songList = document.getElementById("songList");
const playlistUI = document.getElementById("playlist");
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const playHero = document.getElementById("playHero");

const vinyl = document.getElementById("vinyl");
const artistEl = document.getElementById("artist");
const trackList = document.getElementById("trackList");

const title = document.getElementById("title");
const currentTitle = document.getElementById("currentTitle");

const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");


// LOAD SONGS
songs.forEach((song, i) => {
  const div = document.createElement("div");
  div.classList.add("card");

  div.innerHTML = `
    <p>${song.name}</p>
    <button onclick="addToPlaylist(${i})">Add</button>
  `;

  songList.appendChild(div);
});

function addToPlaylist(i) {
  playlist.push(songs[i]);
  renderPlaylist();
}

function removeFromPlaylist(i) {
  playlist.splice(i, 1);
  renderPlaylist();
}

function renderPlaylist() {
  playlistUI.innerHTML = "";

  playlist.forEach((song, i) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${song.name}
      <button onclick="playSong(${i})">▶</button>
      <button onclick="removeFromPlaylist(${i})">❌</button>
    `;

    playlistUI.appendChild(li);
  });
}


// TRACK LIST
function renderTracks() {
  trackList.innerHTML = "";

  songs.forEach((song, i) => {
    const div = document.createElement("div");
    div.classList.add("track");

    div.innerHTML = `
      <span>${song.name}</span>
      <span>▶</span>
    `;

    div.onclick = () => {
      addToPlaylist(i);
      playSong(playlist.length - 1);
    };

    trackList.appendChild(div);
  });
}
renderTracks();


// PLAY SONG
function playSong(i) {
  if (!playlist[i]) return;

  currentIndex = i;
  const song = playlist[i];

  audio.src = song.file;
  audio.play();

  title.textContent = song.name;
  currentTitle.textContent = song.name;
  artistEl.textContent = song.artist;

  playBtn.textContent = "⏸";
  vinyl.style.animationPlayState = "running";
}


// PLAY/PAUSE
function togglePlay() {
  if (!audio.src) return;

  if (audio.paused) {
    audio.play();
    vinyl.style.animationPlayState = "running";
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    vinyl.style.animationPlayState = "paused";
    playBtn.textContent = "▶️";
  }
}

playBtn.addEventListener("click", togglePlay);
playHero.addEventListener("click", togglePlay);


// NEXT / PREV
document.getElementById("next").onclick = () => {
  if (!playlist.length) return;
  currentIndex = (currentIndex + 1) % playlist.length;
  playSong(currentIndex);
};

document.getElementById("prev").onclick = () => {
  if (!playlist.length) return;
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  playSong(currentIndex);
};


// PROGRESS
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});


// END
audio.addEventListener("ended", () => {
  vinyl.style.animationPlayState = "paused";
  document.getElementById("next").click();
});