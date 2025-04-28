# Music Album Management

This project is a web application for managing music albums. It allows users to add, update, delete, and view albums, each containing details such as the band name, album title, and additional information.

## Project Structure

```
music-album-management
├── public
│   ├── index.html       # HTML structure for the web page
│   ├── style.css        # CSS styles for the web page
│   └── script.js        # JavaScript code for handling user interactions
├── util
│   └── database.js      # Database management functions
├── data
│   └── database.sqlite   # SQLite database file for storing album data
├── app.js               # Main entry point of the application
├── package.json         # npm configuration file
└── README.md            # Project documentation
```

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd music-album-management
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Initialize the database**:
   Ensure that the database is set up by running the application, which will create the necessary tables.

4. **Start the server**:
   ```
   node app.js
   ```
   The server will run on `http://localhost:3000`.

## Usage

- Open your web browser and navigate to `http://localhost:3000`.
- You can add new albums using the form provided.
- The list of albums will be displayed on the page.
- Click on an album to view its details, and use the buttons to update or delete it.

## API Endpoints

- `GET /albums`: Retrieve a list of all albums.
- `POST /albums`: Add a new album.
- `GET /albums/:id`: Retrieve a single album by ID.
- `PUT /albums/:id`: Update an existing album by ID.
- `DELETE /albums/:id`: Delete an album by ID.

## License

This project is licensed under the MIT License.