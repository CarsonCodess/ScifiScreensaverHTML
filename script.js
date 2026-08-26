function updateClock() {
    const clockElement = document.getElementById('time');
    const now = new Date();

    clockElement.textContent = now.toLocaleTimeString();
}

function getDate() {
    const options = {month: 'long', day: 'numeric' };
    const today = new Date().toLocaleDateString('en-US', options);

    const dayoptions = { weekday: 'long' };
    const day = new Date().toLocaleDateString('en-US', dayoptions);

    document.getElementById('date').textContent = day + ' // ' + today;
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
getBatteryandNetworkStatus();

setInterval(() => {
    updateClock();
    getDate();
    getBatteryandNetworkStatus();
}, 1000);