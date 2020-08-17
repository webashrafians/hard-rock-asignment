const apiURL = 'https://api.lyrics.ovh';
document.getElementById('search-form').addEventListener('submit', start);

function start(e){
    const searchInput = document.getElementById("input-text").value;
    // console.log(searchInput);
    const inputURL = `https://api.lyrics.ovh/suggest/${searchInput}`;

    fetch(inputURL)
    .then(res => res.json())
    .then(data => displayData(data))
    .catch(err => console.log(err));
    e.preventDefault();
}

//data display function
function displayData(allData){
    let data = allData.data;
    let list = [];
    for (let i = 0; i < 10; i++){
        const item = {
            title: data[i].title,
            albumTitle: data[i].album.title,
            albumImage: data[i].album.cover_small,
            artistName: data[i].artist.name,
            artistImage: data[i].artist.picture_small
        }
        list.push(item);
    }

    //fancy album list
    let display = document.getElementById('result');
    for(let i = 0; i < list.length; i++){
        const {title, albumTitle, artistName} = list[i];
        display.innerHTML +=
        `<div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name"><span id="title">${title}</span></h3>
                <p class="author lead">Album by <span id="albumTitle">${albumTitle}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success" onclick="getLyrics(${title}, ${albumTitle})">Get Lyrics</button>
            </div>
        </div>`
    }

}
