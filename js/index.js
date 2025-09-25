
console.log('index.js running')
let array_of_tracks = []
async function fetchTracks() {
  try {
    const response = await fetch('https://love-lyrics-backend.vercel.app/api/v1/tracks/getAllTrack', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    })
    let track = await response.json()
    array_of_tracks = track
    console.log(track.tracks)
  } catch (error) {
    console.log(error)
  }
}
async function renderSongs() {
  
}
fetchTracks()