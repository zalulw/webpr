const API_URL = 'http://localhost:8080';

async function fetchPosts() {
    const response = await fetch(`${API_URL}/posts`);
    const posts = await resposne.json();
    const postsDiv  = document.getElementById('posts');
    postsDiv.innerHTML = '';

    posts.array.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.innerHTML = `
            <h3>${post.title} (by ${post.author})</h3>
            <p>${post.content}</p>
            <p><strong>Category:</strong> ${post.category}</p>
            <p><strong>Created At:</strong> ${post.created_at}</p>
            <p><strong>Updated At:</strong> ${post.updated_at}</p>
            <button onclick="deletePost(${post.id})">Delete</button>
        `;
        postsDiv.appendChild(postDiv);
    });
}

async function fetchUsers() {
    const response = await fetch(`${API_URL}/users`);
    const users = await response.json();
    const authorSelect = document.getElementById('author');
    usersDiv.innerHTML = '';

    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        authorSelect.appendChild(option);
    });
}

async function createPost(event) {
    event.preventDefault();
    const author_id = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const content = document.getElementById('content').value;

    await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ author_id, title, category, content })
    });

    fetchPosts();
}

async  function deletePost(id) {
    await fetch(`${API_URL}/posts/${id}`, {
        method: 'DELETE'
    });
    
    fetchPosts();
}

document.getElementById('create-post-form').addEventListener('submit', createPost);

fetchUsers();
fetchPosts();