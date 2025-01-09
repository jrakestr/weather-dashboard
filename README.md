# Weather Dashboard

A modern weather dashboard application built with TypeScript, Express, and the OpenWeather API. Get current weather conditions and 5-day forecasts for any city worldwide.

## Features

* **Current Weather**: View current temperature, wind speed, humidity, and weather conditions
* **5-Day Forecast**: Get a detailed forecast for the next 5 days
* **Search History**: Keep track of your previously searched cities
* **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

### Frontend

* TypeScript
* Vite
* Modern CSS with JASS framework
* Fetch API for network requests

### Backend

* Node.js
* Express
* TypeScript
* OpenWeather API integration

## Prerequisites

* Node.js (v14 or higher)
* npm (v6 or higher)
* OpenWeather API key (get one at [OpenWeather](https://openweathermap.org/api))

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd weather-dashboard
```

1. Install dependencies for both client and server:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

1. Set up environment variables:

```bash
# In the server directory, create a .env file
cd ../server
echo "OPENWEATHER_API_KEY=your_api_key_here" > .env
```

## Running the Application

1. Start the server (from the server directory):

```bash
npm run dev
```

1. In a new terminal, start the client (from the client directory):

```bash
npm run dev
```

1. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Enter a city name in the search bar
2. Click the search button or press Enter
3. View the current weather and 5-day forecast
4. Previously searched cities appear in the history sidebar
5. Click on a city in the history to view its weather again
6. Use the delete button to remove cities from your history

## API Endpoints

* `POST /api/weather` - Get weather data for a city
* `GET /api/weather/history` - Get search history
* `DELETE /api/weather/history/:id` - Remove a city from search history

## Project Structure

```typescript
weather-dashboard/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── styles/        # CSS styles
│   │   └── main.ts        # Main application logic
│   ├── index.html
│   └── vite.config.ts
├── server/                 # Backend application
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── service/       # Business logic
│   │   └── server.ts      # Server configuration
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

* [OpenWeather API](https://openweathermap.org/api) for providing weather data
* [JASS CSS](https://github.com/necolas/normalize.css/) for the CSS framework
* Icons provided by OpenWeather
