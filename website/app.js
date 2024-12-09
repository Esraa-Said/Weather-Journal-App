// API Key
const apiKey = 'c9d7426c021b969af162d6e952e0fb32&units=imperial';

// Base URL for OpenWeatherMap API requests
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Add an event listener to the "generate" button
document.getElementById('generate').addEventListener('click', async () => {

    // Get user input: ZIP code and feelings
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    try {
        // Fetch weather data from OpenWeatherMap API using the ZIP code
        const weatherData = await fetch(`${baseURL}${zip}&appid=${apiKey}`).then((res) => res.json());
        // Send a POST request to the local server to save weather and user data
        await postData('http://localhost:3000/add', {
            temp: weatherData.main.temp,
            date: new Date().toLocaleDateString(),
            feel: feelings,
        });
        const projectData = await retrieveData('http://localhost:3000/all');
        updateUI(projectData);
    } catch (error) {
        console.error('Error:', error);
    }
});

const postData = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (error) {
        console.error('Error posting data:', error);
    }
};

const retrieveData = async (url) => {
    try {
        const request = await fetch(url);
        return await request.json();
    } catch (error) {
        console.error('Error retrieving data:', error);
    }
};

const updateUI = (data) => {
    try {
        // Update the UI elements with the fetched temperature
        document.getElementById('temp').innerHTML = `${Math.round(data.temp)}°F`;
        document.getElementById('date').innerHTML = data.date;
        document.getElementById('content').innerHTML = data.feel;
        console.log(data)
    } catch (error) {
        console.error('Error updating UI:', error);
    }
};
