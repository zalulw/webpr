document.getElementById('user-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const usernamesInput = document.getElementById('usernames').value;
    const usernames = usernamesInput.split(',').map(username => username.trim());
    displayUsers(usernames);
});

async function getUserData(username) {
    const response = await fetch(`https://www.codewars.com/api/v1/users/${username}`, {
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

function createUserCard(user) {
    const card = document.createElement('div');
    card.className = 'user-card';
    
    card.innerHTML = `
        <h2>${user.username}</h2>
        <p><strong>Name:</strong> ${user.name || 'N/A'}</p>
        <p><strong>Clan:</strong> ${user.clan || 'N/A'}</p>
        <p><strong>Languages:</strong> ${user.languages ? user.languages.join(', ') : 'N/A'}</p>
        <p><strong>Rank:</strong> ${user.ranks.overall ? user.ranks.overall.name : 'N/A'} (${user.ranks.overall ? user.ranks.overall.score : 'N/A'})</p>
    `;
    
    return card;
}

async function displayUsers(usernames) {
    const container = document.getElementById('users-container');
    container.innerHTML = ''; // Clear previous content

    for (const username of usernames) {
        try {
            const user = await getUserData(username);
            const userCard = createUserCard(user);
            container.appendChild(userCard);
        } catch (error) {
            console.error('Error fetching user data:', error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = `Error fetching data for ${username}`;
            container.appendChild(errorMessage);
        }
    }
}