const tracks = [
  {
    title: "Зима",
    artist: "ooes",
    src: "assets/Ooes - Зима.mp3",
    cover: "https://i1.sndcdn.com/artworks-16e0JlT1xH2KIRFr-CafHmw-t500x500.jpg"
  },
  {
    title: "Судно",
    artist: "MOLCHAT DOMA",
    src: "assets/Молчат Дома - Судно (Борис Рыжий).mp3",
    cover: "https://images.genius.com/0f4fb52bc2b9184f6ea46a9ea6b3589b.1000x1000x1.png"
  },
  {
    title: "В тумане белом",
    artist: "УННВ",
    src: "assets/УННВ - В тумане белом.mp3",
    cover: "https://lastfm.freetls.fastly.net/i/u/ar0/b3f0b32c703ba3d8308e4edf1f22cdfc.jpg"
  },
  {
    title: "Фантом",
    artist: "RADIOTAPOK",
    src: "assets/Radio Tapok - Фантом.mp3",
    cover: "https://radiotapok.ru/templates/rt/img/covers2/t9.jpg"
  }
];

class Pleer {
  constructor(tracks, containerId) {
    this.tracks = tracks;
    this.currentTrack = 0;
    this.containerId = containerId;
    this.idPrefix = Math.random().toString(36).substring(2, 8);
  }

  init() {
    this.renderPlayer();
    this.renderTrackList();

    const audio = document.getElementById(`${this.idPrefix}-audio`);
    audio.addEventListener("ended", () => this.nextTrack());

    document.getElementById(`${this.idPrefix}-play-button`).onclick = () => this.playPause();
    document.getElementById(`${this.idPrefix}-prev-button`).onclick = () => this.prevTrack();
    document.getElementById(`${this.idPrefix}-next-button`).onclick = () => this.nextTrack();
    document.getElementById(`${this.idPrefix}-shuffle-button`).onclick = () => this.shuffleTracks();
    document.getElementById(`${this.idPrefix}-back-button`).onclick = () => this.goBack();
  }

  renderPlayer() {
    const container = document.getElementById(this.containerId);
    const block = document.createElement("div");
    block.className = "player-block";
    block.innerHTML = `
      <div id="${this.idPrefix}-track-list">
        <h2>Список треков</h2>
        <ul id="${this.idPrefix}-track-items"></ul>
      </div>

      <div id="${this.idPrefix}-player" class="hidden">
        <img id="${this.idPrefix}-cover" src="" alt="Обложка" />
        <h3 id="${this.idPrefix}-title">Название трека</h3>
        <p id="${this.idPrefix}-artist">Исполнитель</p>
        <audio id="${this.idPrefix}-audio" controls></audio>
        <div class="controls">
          <img src="assets/left.png" alt="Назад" id="${this.idPrefix}-back-button" />
          <img src="assets/rewind.png" alt="Предыдущий" id="${this.idPrefix}-prev-button" />
          <img src="assets/play.png" alt="Пауза/Воспроизведение" id="${this.idPrefix}-play-button" />
          <img src="assets/forward.png" alt="Следующий" id="${this.idPrefix}-next-button" />
          <img src="assets/refresh.png" alt="Перемешать" id="${this.idPrefix}-shuffle-button" />
        </div>
      </div>
    `;
    container.appendChild(block);
  }

  renderTrackList() {
    const list = document.getElementById(`${this.idPrefix}-track-items`);
    list.innerHTML = "";

    this.tracks.forEach((track, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="track-item">
          <img class="image" src="${track.cover}" alt="${track.title}" />
          <span>${track.title} — ${track.artist}</span>
        </div>
      `;
      li.onclick = () => this.selectTrack(index);
      list.appendChild(li);
    });
  }

  selectTrack(index) {
    this.currentTrack = index;
    const track = this.tracks[index];
    const audio = document.getElementById(`${this.idPrefix}-audio`);

    audio.src = track.src;
    audio.load();
    audio.play();

    document.getElementById(`${this.idPrefix}-cover`).src = track.cover;
    document.getElementById(`${this.idPrefix}-title`).textContent = track.title;
    document.getElementById(`${this.idPrefix}-artist`).textContent = track.artist;

    document.getElementById(`${this.idPrefix}-track-list`).classList.add("hidden");
    document.getElementById(`${this.idPrefix}-player`).classList.remove("hidden");

    document.getElementById(`${this.idPrefix}-play-button`).src = "assets/pause.png";
  }

  playPause() {
    const audio = document.getElementById(`${this.idPrefix}-audio`);
    const playButton = document.getElementById(`${this.idPrefix}-play-button`);

    if (audio.paused) {
      audio.play();
      playButton.src = "assets/pause.png";
    } else {
      audio.pause();
      playButton.src = "assets/play.png";
    }
  }

  nextTrack() {
    this.currentTrack = (this.currentTrack + 1) % this.tracks.length;
    this.selectTrack(this.currentTrack);
  }

  prevTrack() {
    this.currentTrack = (this.currentTrack - 1 + this.tracks.length) % this.tracks.length;
    this.selectTrack(this.currentTrack);
  }

  shuffleTracks() {
    for (let i = this.tracks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.tracks[i], this.tracks[j]] = [this.tracks[j], this.tracks[i]];
    }
    this.selectTrack(0);
  }

  goBack() {
    document.getElementById(`${this.idPrefix}-player`).classList.add("hidden");
    document.getElementById(`${this.idPrefix}-track-list`).classList.remove("hidden");
  }
}

const player1 = new Pleer(tracks, "player-container");
const player2 = new Pleer(tracks, "player-container");
player1.init();
player2.init();
