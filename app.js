const searchSongs = () => {
    const searchText = document.getElementById('search-field').value;
    // toggleSpinner(true);
    toggleSpinner();
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    // console.log(url)
    // load data 
    fetch(url)
        .then(response => response.json())
        .then(data => displaySongs(data.data))
        // .then(data => console.log(data.data))
        .catch(error => displayError('Something went wrong!! Please try again later'));
}
// async await method 
// const searchSongs = async () => {
//     const searchText = document.getElementById('search-field').value;
//     const url = `https://api.lyrics.ovh/suggest/${searchText}`
//     // load data 
//     const res = await fetch(url);
//         const data = await res.json();
//         displaySongs(data.data);
// }

// enter key search 
document.getElementById("search-field")
.addEventListener("keypress", function (event) {
    if (event.key == 'Enter') {
        document.getElementById("search-button").click();
    }
  });

const displaySongs = songs => {
    // console.log(songs)
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    songs.forEach(song => {
        // console.log(song)
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        songContainer.appendChild(songDiv);
        toggleSpinner(false);
        // toggleSpinner();
    })
}

const getLyric = (artist, title) => {
    // console.log(artist, title);
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    // console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => displayLyrics(data.lyrics))
    // .then(data => console.log(data.lyrics))
}

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}

const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}

const toggleSpinner = () => {
    const spinner = document.getElementById('loading-spinner');
    const songs = document.getElementById('song-container');
    spinner.classList.toggle('d-none');
    songs.classList.toggle('d-none');
    // if(show){
    //     spinner.classList.remove('d-none');
    // }
    // else{
    //     spinner.classList.add('d-none');
    // }
}
