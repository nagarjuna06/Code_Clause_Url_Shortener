# URL Shortener

Live Link:[URL Shortener](https://u-shortener.onrender.com)

## Description

This is a URL shortener service that allows you to shorten long URLs and customize the shortened URLs with an alias. The shortened URLs have an expiration feature that automatically expires them if there are no requests for them within a 24-hour period.

## Features

- Shorten Long URLs: Convert long URLs into shorter, more manageable URLs.
- Customize Alias: Assign a custom alias to the shortened URL for easy identification and sharing.
- Expiration: Automatically expire shortened URLs if there are no requests for them within a 24-hour period.
- Analytics: Track and analyze the usage of shortened URLs, including the number of clicks and the referring websites.

## Installation

1. Clone the repository: `git clone https://github.com/your/repository.git`
2. Install the required dependencies: `npm install`
3. Set up the database: Create a database and configure the connection settings in `config/database.js`.
4. Start the server: `node server.js`

## Usage

1. Access the URL shortener service through the web interface or API endpoint.
2. To shorten a long URL, provide the URL in the appropriate field and submit it.
3. If you want to customize the shortened URL, specify an alias during the shortening process.
4. The service will generate a shortened URL based on the provided alias or generate a random one if no alias is specified.
5. Share the shortened URL with others.
6. The shortened URL will expire if there are no requests for it within a 24-hour period.
7. Track and analyze the usage of shortened URLs through the provided analytics feature.

## API Endpoints

### Shorten URL

- **Endpoint:** `/shorten`
- **Method:** POST
- **Request Body:**
  - `url` (required): The long URL to be shortened.
  - `alias` (optional): The desired alias for the shortened URL.
- **Response:**
  - `shortUrl`: The generated shortened URL.

### Redirect Shortened URL

- **Endpoint:** `/:alias`
- **Method:** GET
- **Response:**
  - Redirects to the original long URL associated with the provided alias.

## Configuration

- The expiration time for shortened URLs can be adjusted in `server.js`.
- Database connection settings can be configured in `server.js`.
- Additional customization options can be found in the respective configuration files.

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make the necessary changes and commit your code.
4. Submit a pull request describing your changes.
