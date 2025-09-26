
console.log('index.js running')
const songs_container = document.querySelector('.songs-grid')
let array_of_tracks = []
async function fetchTracks() {
  try {
    const response = await fetch('https://love-lyrics-backend.vercel.app/api/v1/tracks/getAllTrack', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    })
    let track = await response.json()
    array_of_tracks = track.tracks
    console.log(track.tracks)
  } catch (error) {
    console.log(error)
  }
}
async function renderSongs() {
  await fetchTracks()
  songs_container.innerHTML = ''
  console.log('=>', array_of_tracks)
  array_of_tracks.forEach(element => {
    let div = document.createElement('div')
    div.setAttribute('class', 'song-card')
    div.innerHTML = `<div class="song-image">
                        <img src="${element.Image}" alt="" width="100%" height="100%">
                      </div>
                      <div class="song-info">
                        <h4>${element.Name}</h4>
                        <span>${element.Artists[0]}</span>
                      </div>`
    songs_container.appendChild(div)
  });
}
renderSongs()