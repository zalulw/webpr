let albumListElement = document.getElementById("albumList");
let albumForm = document.getElementById("albumForm");
let albumIdInput = document.getElementById("albumIdInput");
let bandInput = document.getElementById("bandInput");
let titleInput = document.getElementById("titleInput");
let additionalField1Input = document.getElementById("additionalField1Input");
let additionalField2Input = document.getElementById("additionalField2Input");
let messageElement = document.getElementById("message");

window.onload = async () => {
    await fetchAlbums();
};

const fetchAlbums = async () => {
    try {
        const response = await fetch("http://localhost:3000/albums");
        const albums = await response.json();
        renderAlbumList(albums);
    } catch (error) {
        console.error("Error fetching albums:", error);
    }
};

const renderAlbumList = (albums) => {
    albumListElement.innerHTML = "";
    albums.forEach(album => {
        const albumItem = document.createElement("li");
        albumItem.textContent = `${album.band} - ${album.title}`;
        albumItem.onclick = () => displayAlbum(album);
        albumListElement.appendChild(albumItem);
    });
};

const displayAlbum = (album) => {
    albumIdInput.value = album.id;
    bandInput.value = album.band;
    titleInput.value = album.title;
    additionalField1Input.value = album.additionalField1;
    additionalField2Input.value = album.additionalField2;
};

const addAlbum = async (event) => {
    event.preventDefault();
    const newAlbum = {
        band: bandInput.value.trim(),
        title: titleInput.value.trim(),
        additionalField1: additionalField1Input.value.trim(),
        additionalField2: additionalField2Input.value.trim(),
    };
    await sendRequest("http://localhost:3000/albums", "POST", newAlbum);
    await fetchAlbums();
    albumForm.reset();
};

const updateAlbum = async (event) => {
    event.preventDefault();
    const updatedAlbum = {
        id: albumIdInput.value,
        band: bandInput.value.trim(),
        title: titleInput.value.trim(),
        additionalField1: additionalField1Input.value.trim(),
        additionalField2: additionalField2Input.value.trim(),
    };
    await sendRequest(`http://localhost:3000/albums/${updatedAlbum.id}`, "PUT", updatedAlbum);
    await fetchAlbums();
    albumForm.reset();
};

const deleteAlbum = async () => {
    const albumId = albumIdInput.value;
    await sendRequest(`http://localhost:3000/albums/${albumId}`, "DELETE");
    await fetchAlbums();
    albumForm.reset();
};

const sendRequest = async (url, method, body = null) => {
    try {
        const options = {
            method,
            headers: { "Content-Type": "application/json" },
            body: body ? JSON.stringify(body) : null,
        };
        const response = await fetch(url, options);
        if (!response.ok) throw new Error("Request failed");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
    }
};

albumForm.addEventListener("submit", addAlbum);
document.getElementById("updateButton").addEventListener("click", updateAlbum);
document.getElementById("deleteButton").addEventListener("click", deleteAlbum);