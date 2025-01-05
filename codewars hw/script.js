document.getElementById('userForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').nodeValue;
    if(username) {
        fetchUserData(username);
    }
});

async function fetchUserData(username) {
    try {
        const response = await fetch(`https://www.codewars.com/api/v1/users/${username}`);
        if (!response.ok) {
            throw new Error('User not found');
        }
        const data = await response.json();
        displayUserData(data);
    } catch(error) {
        alert(error.message);
    }
}

function displayUserData(user) {
    const userCards = document.getElementById('userCards');
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
    <h2>${user.username}</h2><p>Name: ${user.name || 'N/A'}</p>
    <p>Clan: ${user.clan || 'N/A'}</p>
    <p>Languages: ${user.languages.join(', ') || 'N/A'}</p>
    <p>JavaScript Rank: ${user.ranks.languages.javascript.name} (${user.ranks.languages.javascript.score})</p>
    `;
    userCards.appendChild(card);
}