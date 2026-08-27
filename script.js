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

function getDotDate() {
    const month = new Date().toLocaleDateString('en-US', { month: 'numeric' });
    const day = new Date().toLocaleDateString('en-US', { day: 'numeric' });
    const year = new Date().toLocaleDateString('en-US', { year: 'numeric' });

    document.getElementById('dotdate').textContent = month + '.' + day + '.' + year;
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


function getWeatherAndConditions() {
    const tempElement = document.getElementById('temperature');
    const conditionElement = document.getElementById('weather-condition');
    const highlowElement = document.getElementById('highlow');
    const windElement = document.getElementById('wind');
    const humidityElement = document.getElementById('humidity');
    const pressureElement = document.getElementById('pressure');
    const visibilityElement = document.getElementById('visibility');
    const UVElement = document.getElementById('UV');

    if (!tempElement || !conditionElement || !highlowElement || !windElement ||
        !humidityElement || !pressureElement || !visibilityElement || !UVElement) return;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                const apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,temperature_2m_max,temperature_2m_min&hourly=visibility&current=pressure_msl,relative_humidity_2m,temperature_2m,wind_speed_10m,weather_code&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`;

                try {
                    const response = await fetch(apiURL);
                    if (!response.ok) throw new Error();
                    const data = await response.json();

                    tempElement.innerHTML = `${Math.round(data.current.temperature_2m)}&deg;F`;
                    windElement.innerHTML = `Wind: ${Math.round(data.current.wind_speed_10m)} mph`;
                    visibilityElement.innerHTML = `Visibility: ${Math.round(data.hourly.visibility[0])} m`;

                    const code = data.current.weather_code;
                    const weatherMap = {
                        0: 'Clear', 1: 'Mainly Clear', 2: 'Partly Cloudy', 3: 'Overcast',
                        45: 'Fog', 48: 'Depositing Rime Fog', 51: 'Drizzle: Light',
                        53: 'Drizzle: Moderate', 55: 'Drizzle: Dense', 56: 'Freezing Drizzle: Light',
                        57: 'Freezing Drizzle: Dense', 61: 'Rain: Slight', 63: 'Rain: Moderate',
                        65: 'Rain: Heavy', 66: 'Freezing Rain: Light', 67: 'Freezing Rain: Heavy',
                        71: 'Snow Fall: Slight', 73: 'Snow Fall: Moderate', 75: 'Snow Fall: Heavy',
                        77: 'Snow Grains', 80: 'Rain Showers: Slight', 81: 'Rain Showers: Moderate',
                        82: 'Rain Showers: Violent', 85: 'Snow Showers: Slight', 86: 'Snow Showers: Heavy',
                        95: 'Thunderstorm: Slight or Moderate', 96: 'Thunderstorm with Hail', 99: 'Thunderstorm with Hail'
                    };
                    conditionElement.innerHTML = weatherMap[code] || 'Unknown';

                    highlowElement.innerHTML = `H: ${Math.round(data.daily.temperature_2m_max[0])}&deg;F L: ${Math.round(data.daily.temperature_2m_min[0])}&deg;F`;
                    UVElement.innerHTML = `UV Index: ${Math.round(data.daily.uv_index_max[0])}`;

                    humidityElement.innerHTML = `Humidity: ${Math.round(data.current.relative_humidity_2m)}%`;
                    pressureElement.innerHTML = `Pressure: ${Math.round(data.current.pressure_msl)} hPa`;

                } catch (error) {
                    conditionElement.textContent = 'Error loading metrics';
                }
            },
            (error) => {
                conditionElement.textContent = error.code === error.PERMISSION_DENIED ? 'Location denied' : 'Location unavailable';
            }
        );
    } else {
        conditionElement.textContent = 'Not supported';
    }
}


function getLocation() {
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            document.getElementById('lat-lon').textContent = `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`;
        },
        (error) => {
            document.getElementById('lat-lon').textContent = error.code === error.PERMISSION_DENIED
                ? 'Location denied'
                : 'Location unavailable';
        }
    );
}


updateClock();
getDate();
getBatteryandNetworkStatus();
getWeatherAndConditions();
getLocation();
getDotDate();


setInterval(() => {
    updateClock();
    getDate();
    getDotDate();
    getBatteryandNetworkStatus();
}, 1000);

setInterval(() => {
    getWeatherAndConditions();
    getLocation();
}, 600000);
