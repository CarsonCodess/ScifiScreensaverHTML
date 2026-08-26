function updateClock() {
    const clockElement = document.getElementById('time');
    const now = new Date();

    clockElement.textContent = now.toLocaleTimeString();
}

function getDate() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date().toLocaleDateString('en-US', options);
    document.getElementById('date').textContent = today;
}

function getDay() {
    const options = { weekday: 'long' };
    const today = new Date().toLocaleDateString('en-US', options);
    document.getElementById('day').textContent = today;
}

function getBatteryandNetworkStatus() {
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            const updateBattery = () => {
                document.getElementById('battery').textContent = (battery.level * 100) + '%';
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

updateClock();
getDate();
getDay();
getBatteryandNetworkStatus();

setInterval(() => {
    updateClock();
    getDate();
    getDay();
    getBatteryandNetworkStatus();
}, 1000);