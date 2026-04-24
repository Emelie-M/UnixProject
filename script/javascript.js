
document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.getElementById("addBtn");
    const container = document.getElementById("playCon");
  
    addBtn.addEventListener("click", () => {
      const playlistDiv = document.createElement("div");
      playlistDiv.classList.add("playlist");
  
      // Playlist name input
      const nameInput = document.createElement("input");
      nameInput.placeholder = "Enter playlist name";
  
      const nameTitle = document.createElement("h3");
      nameTitle.textContent = "New Playlist (click to open)";
      nameTitle.style.cursor = "pointer";
  
      const saveNameBtn = document.createElement("button");
      saveNameBtn.textContent = "Save Name";
  
      saveNameBtn.onclick = () => {
        if (nameInput.value.trim() !== "") {
          nameTitle.textContent = nameInput.value;
        }
      };
  
      // Song section (hidden by default)
      const songSection = document.createElement("div");
      songSection.style.display = "none";
  
      // Toggle show/hide when clicking title
      nameTitle.onclick = () => {
        songSection.style.display =
          songSection.style.display === "none" ? "block" : "none";
      };
  
      // Song input
      const songInput = document.createElement("input");
      songInput.placeholder = "Add a song";
  
      const addSongBtn = document.createElement("button");
      addSongBtn.textContent = "Add Song";
  
      const songList = document.createElement("div");
  
      addSongBtn.onclick = () => {
        if (songInput.value.trim() !== "") {
          const song = document.createElement("div");
          song.classList.add("song");
          song.textContent = "🎵 " + songInput.value;
  
          songList.appendChild(song);
          songInput.value = "";
        }
      };
  
      // Build song section
      songSection.appendChild(songInput);
      songSection.appendChild(addSongBtn);
      songSection.appendChild(songList);
  
      // Append everything
      playlistDiv.appendChild(nameInput);
      playlistDiv.appendChild(saveNameBtn);
      playlistDiv.appendChild(nameTitle);
      playlistDiv.appendChild(songSection);
  
      container.appendChild(playlistDiv);
    });
  });