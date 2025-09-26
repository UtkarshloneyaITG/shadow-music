
console.log('index.js running')
renderSongs()
const songs_container = document.querySelector('.songs-grid')
const albums_container = document.querySelector('.album-grid')
let array_of_tracks = []
let array_of_albums = []
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
async function fetch_album() {
  try {
    const response = await fetch('https://love-lyrics-backend.vercel.app/api/v1/Album/GetAllAlbum', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    })
    let AlbumData = await response.json()
    array_of_albums = AlbumData.Data
    console.log('albums =>', array_of_albums)
  } catch (error) {
    console.log(error)
  }
}
async function render_albums() {
  await fetch_album()
  albums_container.innerHTML = ''
  console.log(array_of_albums)
  array_of_albums.forEach(element => {
    console.log('running')
    let div = document.createElement('div')
    div.setAttribute('class', 'album-card')
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
    `
    albums_container.appendChild(div)
  })
}
render_albums()