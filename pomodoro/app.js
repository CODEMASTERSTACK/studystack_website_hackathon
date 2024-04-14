let listContainer = document.getElementById('list-container');
let head = document.querySelector('head');
let inputBox = document.getElementById('input-box');

function addTask() {
  if (inputBox.value == '') {
    alert('Please Enter the Text');
  } else {
    const task = document.createElement('li');
    task.textContent = inputBox.value;
    listContainer.appendChild(task);
    // inputBox.value = ''
    let span = document.createElement('span');
    span.textContent = '\u00d7';
    task.appendChild(span);
    span.style.right = '0px';
  }
  inputBox.value = '';
  saveData();
}

listContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');
    saveData();
  } else if (e.target.tagName === 'SPAN') {
    e.target.parentElement.remove();
    saveData();
  }
});

function saveData() {
  localStorage.setItem('data', listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem('data');
}

showTask();

// Spotify Js

function embedPlaylist() {
  var playlistUrl = document.getElementById('playlist-url').value;
  var playlistId = getPlaylistId(playlistUrl);

  if (playlistId) {
    var playlistContainer = document.getElementById('playlist-container');
    playlistContainer.innerHTML = `<iframe src="https://open.spotify.com/embed/playlist/${playlistId}" width="800" height="500" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
  } else {
    alert('Invalid Spotify Playlist URL. Please enter a valid URL.');
  }
}

function getPlaylistId(url) {
  // Regex pattern to extract the playlist ID from the URL
  var pattern = /playlist\/(\w+)/;
  var match = url.match(pattern);
  if (match && match.length > 1) {
    return match[1];
  } else {
    return null;
  }
}
