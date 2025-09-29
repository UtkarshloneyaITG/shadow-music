console.log("index.js running");
renderSongs();
const songs_container = document.querySelector(".songs-grid");
const albums_container = document.querySelector(".album-grid");
const music_bar = document.getElementById("music-timeline");
const audio_bar = document.getElementById("music-origial");
const countingTime = document.getElementById("counting-time");
const totalCountingTime = document.getElementById("total-counting-time");
const musicPlaying_card = document.getElementById("musicPlaying-card");
const on_off_indectar = document.querySelector('.on_off_indectar')
const volume_meter = document.getElementById('volume-meter')
let array_of_tracks = [];
let array_of_albums = [];
let autoNEXT = true;
let HistorySavedSong = localStorage.getItem('HSS')
let HSS = JSON.parse(HistorySavedSong)
async function fetchTracks() {
  try {
    const response = await fetch(
      "https://love-lyrics-backend.vercel.app/api/v1/tracks/getAllTrack",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      }
    );
    let track = await response.json();
    array_of_tracks = track.tracks;
    console.log(track.tracks);
    if (HSS) {
      music_bar_function(HSS.src, HSS.name, HSS.image, HSS.artist, HSS.no, 'local')
      audio_bar.pause();
    }
  } catch (error) {
    console.log(error);
  }
}
async function renderSongs() {
  await fetchTracks();
  songs_container.innerHTML = "";
  console.log("=>", array_of_tracks);
  array_of_tracks.forEach((element, index) => {
    console.log(index)
    let div = document.createElement("div");
    div.setAttribute("class", "song-card");
    div.setAttribute(
      "onclick",
      `music_bar_function('${element.Url}','${element.Name}','${element.Image}','${element.Artists[0]}','${index}')`
    );
    div.innerHTML = `<div class="song-image">
                        <img src="${element.Image}" alt="" width="100%" height="100%">
                      </div>
                      <div class="song-info">
                        <h4>${element.Name}</h4>
                        <span>${element.Artists[0]}</span>
                      </div>`;
    songs_container.appendChild(div);
  });
}
async function fetch_album() {
  try {
    const response = await fetch(
      "https://love-lyrics-backend.vercel.app/api/v1/Album/GetAllAlbum",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      }
    );
    let AlbumData = await response.json();
    array_of_albums = AlbumData.Data;
    console.log("albums =>", array_of_albums);
  } catch (error) {
    console.log(error);
  }
}
async function render_albums() {
  await fetch_album();
  albums_container.innerHTML = "";
  console.log(array_of_albums);
  array_of_albums.forEach((element) => {
    console.log("running");
    let div = document.createElement("div");
    div.setAttribute("class", "album-card");

    div.innerHTML = `
    <div class="album-image">
                          <img
                            src="${element.Image}"
                            alt="album-image-${element.Name}" width="100%" height="100%">
                             <div class="play-album">
                            <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"
                                fill="#0008" stroke='white' />
                            </svg>
                          </div>
                        </div>
                        <div class="album-title">
                          <h4>${element.Name}</h4>
                        </div>
    `;
    albums_container.appendChild(div);
  });
}
render_albums();
let index_of_songs = 0
let animetion = undefined;
function music_bar_function(src, name, image, artist, no, type) {
  index_of_songs = Number(no) +1
  console.log(no)
  renderMusicBarMusicBox(name, image, artist);
  audio_src.src = src;
  audio_bar.load();
  music_bar.value = 0;
  if (type == 'local') {
    audio_bar.addEventListener("canplaythrough", () => {
      totalCountingTime.innerHTML = Math.floor(audio_bar.duration);
      music_bar.max = audio_bar.duration;
    })
    return
  }
  console.log('asdfasdasfasfd hello')
  audio_bar.addEventListener("canplaythrough", () => {
    totalCountingTime.innerHTML = Math.floor(audio_bar.duration);
    music_bar.max = audio_bar.duration;
    audio_bar.play();
    music_playing = true;
    document.querySelector('.play-button').style.display = 'block'
    document.querySelector('.pause-button').style.display = 'none'
  });

  console.log(music_bar.max);

  progration_in_audio_bar();
  localStorage.setItem('HSS', JSON.stringify({
    name: name,
    no: no,
    image: image,
    artist: artist,
    src: src,
  }))
}
let music_playing = false;
let increaseTimeline = null;

let syncmusic_bar = () => {
  animetion = window.requestAnimationFrame(syncmusic_bar);
  music_bar.value = audio_bar.currentTime;
  if (Math.floor(music_bar.value) == Math.floor(audio_bar.duration)) {
    window.cancelAnimationFrame(animetion);
    music_bar.value = 0;
    music_playing = false;
    document.querySelector('.play-button').style.display = 'none'
    document.querySelector('.pause-button').style.display = 'block'
    if (autoNEXT) {
      songs_container.getElementsByClassName('song-card')[index_of_songs].click()
    }
  }
  countingTime.innerHTML = `${String(music_bar.value).padStart(2, 0)}`;
};
function progration_in_audio_bar() {
  cancelAnimationFrame(animetion);
  syncmusic_bar();
}
function Play_pause_music() {
  if (music_playing) {
    audio_bar.pause();
    music_playing = false;
    cancelAnimationFrame(animetion);
    document.querySelector('.play-button').style.display = 'none'
    document.querySelector('.pause-button').style.display = 'block'
  } else {
    audio_bar.play();
    progration_in_audio_bar();
    music_playing = true;
    document.querySelector('.play-button').style.display = 'block'
    document.querySelector('.pause-button').style.display = 'none'
  }
}
function plus_10_second(val, cond) {
  if (cond) {
    audio_bar.currentTime = Number(audio_bar.currentTime) - Number(val);
  }
  else if (audio_bar.currentTime + 10 > audio_bar.duration) {
    return
  } else {
    audio_bar.currentTime = Number(audio_bar.currentTime) + Number(val);
  }
  progration_in_audio_bar();
}
music_bar.addEventListener("input", () => {
  countingTime.innerHTM = music_bar.value;
  audio_bar.currentTime = music_bar.value;
  progration_in_audio_bar()
});

function renderMusicBarMusicBox(name, image, artist) {
  musicPlaying_card.classList.remove("placeholder-animetion");
  musicPlaying_card.innerHTML = `<div class="song-image">
                        <img src="${image}" alt="" width="100%" height="100%">
                      </div>
                      <div class="song-info">
                        <h4>${name}</h4>
                        <span>${artist}</span>
                      </div>`;
}
volume_meter.addEventListener('input', () => {
  audio_bar.volume = volume_meter.value
})