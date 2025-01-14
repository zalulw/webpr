const baseUrl = 'https://jsonplaceholder.typicode.com/todos';

// GET: Összes todo lekérése
fetch(baseUrl)
  .then(response => response.json())
  .then(data => console.log('GET all todos:', data))
  .catch(error => console.error('GET Error:', error));

// POST: Új todo létrehozása
fetch(baseUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'New Todo',
    completed: false,
    userId: 1
  })
})
  .then(response => response.json())
  .then(data => console.log('POST new todo:', data))
  .catch(error => console.error('POST Error:', error));

// PUT: Todo frissítése (teljes)
fetch(`${baseUrl}/1`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    id: 1,
    title: 'Updated Todo',
    completed: true,
    userId: 1
  })
})
  .then(response => {
    if (!response.ok) {
      throw new Error('PUT request failed');
    }
    return response.json();
  })
  .then(data => console.log('PUT update todo:', data))
  .catch(error => console.error('PUT Error:', error));

// PATCH: Todo részleges frissítése
fetch(`${baseUrl}/1`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Partially Updated Todo'
  })
})
  .then(response => {
    if (!response.ok) {
      throw new Error('PATCH request failed');
    }
    return response.json();
  })
  .then(data => console.log('PATCH update todo:', data))
  .catch(error => console.error('PATCH Error:', error));

// DELETE: Todo törlése
fetch(`${baseUrl}/1`, {
  method: 'DELETE'
})
  .then(response => {
    if (!response.ok) {
      throw new Error('DELETE request failed');
    }
    console.log('DELETE todo: Success');
  })
  .catch(error => console.error('DELETE Error:', error));