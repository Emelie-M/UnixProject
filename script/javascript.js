const songs = [
  { name: "Symbolism", artist: "Electro-Light", file: "../music/Electro-Light - Symbolism [NCS Release].mp3" },
  { name: "On & On (feat. Daniel Levi)", artist: "Cartoon, Daniel Levi, Jéja", file: "../music/Cartoon, Daniel Levi, Jéja - On & On (feat. Daniel Levi) [NCS Release].mp3" },
  { name: "Invincible", artist: "DEAF KEV", file: "../music/DEAF KEV - Invincible [NCS Release].mp3"},
  { name: "Sky High", artist: "Elektronomia", file: "../music/Elektronomia - Sky High [NCS Release].mp3" },
  { name: "Pill (feat. Emma Sameth)", artist: "Heuse, Zeus X Crona, Emma Sameth", file: "../music/Heuse, Zeus X Crona, Emma Sameth - Pill (feat. Emma Sameth) [NCS Release].mp3" },
  { name: "Heroes Tonight (feat. Johnning)", artist: "Janji, Johnning", file: "../music/Janji, Johnning - Heroes Tonight (feat. Johnning) [NCS Release].mp3" },
  { name: "No More Levitation", artist: "Rex Hooligan, Anna Simone", file: "../music/" },
  { name: "Shine", artist: "Spektrem", file: "../music/Spektrem - Shine [NCS Release].mp3" },
  { name: "Feel Good", artist: "Syn Cole", file: "../music/Syn Cole - Feel Good [NCS Release].mp3" }
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


function formatTime(time) {
  if (isNaN(time)) return "0:00";

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
}

audio.addEventListener("timeupdate", () => {
  // progress bar
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;

  // 👇 update time text
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

let visualProgress = 0;

function updateProgress() {
  if (audio.duration) {
    const target = (audio.currentTime / audio.duration) * 100;

    // 👇 smoothing (0.1 = slower, 0.2 = faster)
    visualProgress += (target - visualProgress) * 0.1;

    progress.value = visualProgress;
    progress.style.setProperty("--progress", visualProgress + "%");

    currentTimeEl.textContent = formatTime(audio.currentTime);
  }

  requestAnimationFrame(updateProgress);
}

updateProgress();

// start loop
updateProgress();

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

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
    playBtn.textContent = "▶";
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

