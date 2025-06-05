# Invoice Manager App

## Overview
The Invoice Manager App is a web application designed to manage invoices efficiently. It allows users to create, retrieve, update, and delete invoices while storing all data in a SQLite database. The application features a user-friendly interface and a robust API for handling invoice-related operations.

## Features
- Manage issuer and recipient details
- Create and manage invoices with unique invoice numbers
- Track invoice dates, fulfillment dates, payment deadlines, total amounts, and VAT rates
- API endpoints for CRUD operations on invoices

## Project Structure
```
invoice-manager-app
├── public
│   ├── index.html        # Main HTML structure
│   ├── script.js         # JavaScript for user interactions
│   └── style.css         # CSS styles for the application
├── src
│   ├── api
│   │   └── invoices.js   # API endpoints for invoices
│   ├── controllers
│   │   └── invoiceController.js # Logic for processing invoice requests
│   ├── models
│   │   └── invoiceModel.js # Data structure and database interaction for invoices
│   └── app.js            # Main entry point of the server application
├── util
│   └── database.js       # Database connection and SQL query functions
├── data
│   └── database.sqlite    # SQLite database file
├── package.json          # npm configuration file
├── .gitignore            # Files and directories to ignore by Git
└── README.md             # Project documentation
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   cd invoice-manager-app
   ```

2. Install dependencies:
   ```
   npm install
   nodemon
   express
   cors
   slite3

3. Start the application:
   ```
   npm start
   npm run dev

4. Access the application in your web browser at `http://localhost:3000`.

## Usage
- Use the web interface to manage invoices.
- API endpoints can be accessed for programmatic interactions.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.