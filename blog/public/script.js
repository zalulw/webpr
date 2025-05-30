const API_URL = 'http://localhost:8080';

async function fetchPosts() {
    const response = await fetch(`${API_URL}/posts`);
    const posts = await response.json();
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = '';

    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.innerHTML = `
            <h3>${post.title} (by ${post.author})</h3>
            <p>${post.content}</p>
            <p><strong>Category:</strong> ${post.category}</p>
            <p><strong>Created At:</strong> ${post.created_at}</p>
            <p><strong>Updated At:</strong> ${post.updated_at}</p>
            <button onclick="editPost(${post.id})">Edit</button>
            <button onclick="deletePost(${post.id})">Delete</button>
        `;
        postsDiv.appendChild(postDiv);
    });
}

async function fetchUsers() {
    const response = await fetch(`${API_URL}/users`);
    const users = await response.json();
    const authorSelect = document.getElementById('author');
    authorSelect.innerHTML = '';

    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        authorSelect.appendChild(option);
    });
}

let editingPostId = null;

async function createOrUpdatePost(event) {
    event.preventDefault();
    const author_id = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const content = document.getElementById('content').value;

    if (editingPostId) {
        await fetch(`${API_URL}/posts/${editingPostId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, category, content })
        });
        editingPostId = null;
    } else {
        await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ author_id, title, category, content })
        });
    }

    document.getElementById('create-post-form').reset();
    fetchPosts();
}

async function editPost(id) {
    const response = await fetch(`${API_URL}/posts/${id}`);
    const post = await response.json();

    document.getElementById('author').value = post.author_id;
    document.getElementById('title').value = post.title;
    document.getElementById('category').value = post.category;
    document.getElementById('content').value = post.content;

    editingPostId = id;
}

async function deletePost(id) {
    await fetch(`${API_URL}/posts/${id}`, {
        method: 'DELETE'
    });

    fetchPosts();
}

document.getElementById('create-post-form').addEventListener('submit', createOrUpdatePost);

fetchUsers();
fetchPosts();