const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");

const playlistEl = document.getElementById("playlist");
const addBtn = document.getElementById("add");
const songInput = document.getElementById("songInput");

const title = document.getElementById("title");
const currentTitle = document.getElementById("currentTitle");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

let songs = [];
let currentIndex = -1;

/* FORMAT TIME */
function formatTime(time) {
  if (!time) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

/* LOAD SONG */
function loadSong(index) {
  if (index < 0 || index >= songs.length) return;

  currentIndex = index;
  audio.src = songs[index];
  audio.play();

  playBtn.textContent = "⏸";

  title.textContent = "Song " + (index + 1);
  currentTitle.textContent = "Song " + (index + 1);

  renderPlaylist();
}

/* PLAY / PAUSE */
playBtn.onclick = () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
};

/* NEXT / PREV */
nextBtn.onclick = () => loadSong(currentIndex + 1);
prevBtn.onclick = () => loadSong(currentIndex - 1);

/* ADD SONG */
addBtn.onclick = () => {
  const url = songInput.value.trim();
  if (!url) return;

  songs.push(url);
  songInput.value = "";
  renderPlaylist();
};

/* REMOVE SONG */
function removeSong(index) {
  songs.splice(index, 1);

  if (index === currentIndex) {
    audio.pause();
    currentIndex = -1;
    currentTitle.textContent = "No song";
  }

  renderPlaylist();
}

/* RENDER PLAYLIST */
function renderPlaylist() {
  playlistEl.innerHTML = "";

  songs.forEach((song, index) => {
    const li = document.createElement("li");

    if (index === currentIndex) li.classList.add("active");

    li.innerHTML = `
      <span onclick="loadSong(${index})">Song ${index + 1}</span>
      <button onclick="removeSong(${index})">✕</button>
    `;

    playlistEl.appendChild(li);
  });
}

/* UPDATE PROGRESS */
audio.addEventListener("timeupdate", () => {
  progress.max = audio.duration || 0;
  progress.value = audio.currentTime;

  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

/* SEEK */
progress.addEventListener("input", () => {
  audio.currentTime = progress.value;
});

/* AUTO NEXT */
audio.addEventListener("ended", () => {
  if (currentIndex < songs.length - 1) {
    loadSong(currentIndex + 1);
  }
});