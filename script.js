function updateClock() {
    const clockElement = document.getElementById('time');
    const now = new Date();
    clockElement.textContent = now.toLocaleTimeString();
}

function getDate() {
    const options = { month: 'long', day: 'numeric' };
    const today = new Date().toLocaleDateString('en-US', options);
    const dayoptions = { weekday: 'long' };
    const day = new Date().toLocaleDateString('en-US', dayoptions);
    document.getElementById('date').textContent = day + ' // ' + today;
}

function getBatteryandNetworkStatus() {
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            const updateBattery = () => {
                document.getElementById('battery').textContent = Math.round(battery.level * 100) + '%';
            };
            updateBattery();
            battery.addEventListener('levelchange', updateBattery);
        });
    } else {
        document.getElementById('battery').textContent = 'Not supported';
    }

    const updateNetworkStatus = () => {
        const isOnline = navigator.onLine;
        const statusText = isOnline ? 'Online' : 'Offline';
        document.getElementById('network').textContent = statusText;
    };
    updateNetworkStatus();
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
}


function getTemperature() {
    const tempElement = document.getElementById('temperature');
    const conditionElement = document.getElementById('weather-condition');
    const highlowElement = document.getElementById('highlow');
    const windElement = document.getElementById('wind');

    if (!tempElement || !conditionElement || !highlowElement || !windElement) return;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code,wind_speed_10m`;

                try {
                    const response = await fetch(apiURL);
                    if (!response.ok) throw new Error();
                    const data = await response.json();

                    tempElement.innerHTML = `${Math.round((data.hourly.temperature_2m[0]) * (9 / 5) + 32)}&deg;F`;

                    const code = data.hourly.weather_code[0];
                    const weather =
                        code === 0 ? 'Clear' :
                            code === 1 ? 'Mainly Clear' :
                                code === 2 ? 'Partly Cloudy' :
                                    code === 3 ? 'Overcast' :
                                        code === 45 ? 'Fog' :
                                            code === 48 ? 'Depositing Rime Fog' :
                                                code === 51 ? 'Drizzle: Light' :
                                                    code === 53 ? 'Drizzle: Moderate' :
                                                        code === 55 ? 'Drizzle: Dense' :
                                                            code === 56 ? 'Freezing Drizzle: Light' :
                                                                code === 57 ? 'Freezing Drizzle: Dense' :
                                                                    code === 61 ? 'Rain: Slight' :
                                                                        code === 63 ? 'Rain: Moderate' :
                                                                            code === 65 ? 'Rain: Heavy' :
                                                                                code === 66 ? 'Freezing Rain: Light' :
                                                                                    code === 67 ? 'Freezing Rain: Heavy' :
                                                                                        code === 71 ? 'Snow Fall: Slight' :
                                                                                            code === 73 ? 'Snow Fall: Moderate' :
                                                                                                code === 75 ? 'Snow Fall: Heavy' :
                                                                                                    code === 77 ? 'Snow Grains' :
                                                                                                        code === 80 ? 'Rain Showers: Slight' :
                                                                                                            code === 81 ? 'Rain Showers: Moderate' :
                                                                                                                code === 82 ? 'Rain Showers: Violent' :
                                                                                                                    code === 85 ? 'Snow Showers: Slight' :
                                                                                                                        code === 86 ? 'Snow Showers: Heavy' :
                                                                                                                            code === 95 ? 'Thunderstorm: Slight or Moderate' :
                                                                                                                                code === 96 || code === 99 ? 'Thunderstorm with Hail' : 'Unknown';

                    conditionElement.innerHTML = weather;
                    highlowElement.innerHTML = `H: ${Math.round((data.daily.temperature_2m_max[0]) * (9 / 5) + 32)}&deg;F L: ${Math.round((data.daily.temperature_2m_min[0]) * (9 / 5) + 32)}&deg;F`;
                    windElement.innerHTML = `Wind: ${Math.round(data.hourly.wind_speed_10m[0] * 2.237)} mph`;
                } catch (error) {
                    tempElement.textContent = 'Error loading temp';
                }
            },
            (error) => {
                tempElement.textContent = error.code === error.PERMISSION_DENIED
                    ? 'Location denied'
                    : 'Location unavailable';
            }
        );
    } else {
        tempElement.textContent = 'Not supported';
    }
}


updateClock();
getDate();
getBatteryandNetworkStatus();
getTemperature();


setInterval(() => {
    updateClock();
    getDate();
}, 1000);

setInterval(() => {
    getTemperature();
}, 600000);
