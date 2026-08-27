const terminalBody = document.getElementById('terminal-body');

function writeToTerminal(message, type = 'info') {
    if (!terminalBody) return;

    const line = document.createElement('div');
    const timestamp = new Date().toLocaleTimeString();
    const lowerMessage = message.toLowerCase();

    if (type === 'error') {
        line.style.color = '#ff3333';
    } else if (type === 'cool') {
        line.style.color = '#b000ff';
    } else if (type === 'fakeerror') {
        line.style.color = '#f535aa';

    } else if (lowerMessage.includes('load') || lowerMessage.includes('fetch') || lowerMessage.includes('retrieved')) {
        line.style.color = '#00bcff';
    } else {
        line.style.color = '#00ff33';
    }

    line.textContent = `[${timestamp}] ${message}`;
    terminalBody.appendChild(line);

    terminalBody.scrollTop = terminalBody.scrollHeight;
}

const originalLog = console.log;
const originalError = console.error;

console.log = function (...args) {
    const message = args.join(' ');
    originalLog.apply(console, args);
    writeToTerminal(message, 'info');
};

console.error = function (...args) {
    const message = args.join(' ');
    originalError.apply(console, args);
    writeToTerminal(message, 'error');
};

const coolPhrases = [
    "Synchronizing atmospheric matrix updates...",
    "Bypassing Open-Meteo payload firewalls...",
    "Flushing telemetry caches...",
    "Optimizing coordinate grid stream: Lat/Lon localized.",
    "Buffer allocation verified. System stable.",
    "Ping response: 14ms // Server: Node-Alpha",
    "Re-routing geolocation telemetry vectors...",
    "Injecting background UI thread updates...",
    "Compiling micro-climate barometric variance logs.",
    "Evaluating dynamic dew-point baseline offsets.",
    "Calibrating ultraviolet sub-array receptors...",
    "Thermal gradient anomaly scanned // Margin within 0.04%.",
    "Calculating relative humidity vector coefficients.",
    "Anemometer telemetry synchronized successfully.",
    "Aerosol density models updated in telemetry core.",
    "Mapping tropospheric density stratification fields.",
    "Correlating doppler radar array reflection indices.",
    "Re-indexing solar irradiance calculation factors.",
    "Parsing stratosphere ozone thickness telemetry packets.",
    "Synchronizing geomagnetic flux density measurements.",
    "Evaluating precipitation probability distribution curves.",
    "Analyzing cloud-ceiling altitude sensor triangulation.",
    "Ionospheric disturbance filtration sub-routine active.",
    "Mapping planetary boundary layer wind-shear grids.",
    "Calibrating microbarograph infrasound pressure arrays.",
    "Updating regional lightning strike distance estimators.",
    "Downloading solar wind particle density telemetry...",
    "Triangulating localized orbital positioning arrays.",
    "Re-aligning datum reference points to WGS 84 standard.",
    "Parsing satellite constellations ephemeris datasets...",
    "Calculating true north vs magnetic variance offsets.",
    "Refreshing local altitude topological mesh clusters.",
    "Geocoding reverse lookup matrices // Vector complete.",
    "Cross-referencing cellular tower positioning metadata.",
    "Updating dead-reckoning trajectory integration arrays.",
    "Calibrating tectonic coordinate drift compensations.",
    "Establishing handshake with localized GNSS ground transponders.",
    "Refining spatial coordinates to sub-meter precision matrix.",
    "Purging volatile memory sub-sectors 0x7F through 0x9A.",
    "Overclocking rendering engine grid arrays...",
    "Kernel clock thread skew corrected // Drift: -0.002ms.",
    "Analyzing hardware node packet payload routing tables.",
    "Garbage collection cycle executed [Freed: 4.12 MB].",
    "Entropy pool re-seeded successfully from local noise.",
    "Vitals integrity scan: 100% operational baseline.",
    "Thread allocation map verified safe // No leaks detected.",
    "Defragmenting localized browser storage cluster nodes.",
    "Allocating temporary virtual heap space in heap engine.",
    "Optimizing CPU register distribution for UI worker nodes.",
    "Scanning asynchronous call stacks for orphan processes...",
    "Analyzing background hardware interrupt processing queues.",
    "Flushing dead system worker threads from active state machine.",
    "Re-binding event listener callback hooks to avoid leaks.",
    "Handshake complete: TLS_AES_256_GCM_SHA384 verified.",
    "Decrypted localized coordinate metadata packets.",
    "Data stream compression optimized [Ratio: 4.2:1].",
    "Scrubbing tracking headers from remote API callbacks.",
    "Establishing fallback link with distributed server node.",
    "Token lease renewed automatically with cloud auth layer.",
    "Network throttling check: Unlimited pipeline confirmed.",
    "Validating secure CORS origin request verification keys.",
    "Parsing JSON string payload structures to object maps.",
    "Ping timeout check passed safely // Gateway responding.",
    "Clearing stale network sockets from keep-alive pipeline.",
    "Encoding outgoing transit metadata to Base64 format.",
    "Validating secure cryptographic certificate checksums...",
    "Bypassing downstream proxy pipeline caching layers.",
    "Measuring lithium-ion voltage distribution parameters.",
    "Calibrating power drain discharge curve vectors.",
    "Polling system power controller for status bits.",
    "Thermal throttling parameters: Nominal conditions checked.",
    "Optimizing background process cycle for power economy.",
    "Current intake values verify grid stability threshold.",
    "Compiling real-time canvas sub-pixel anti-aliasing masks.",
    "HUD layout canvas refresh cycle clocked at 60.00Hz.",
    "Injecting matrix visual theme parameters into CSS sub-tree.",
    "Tracing background star-field rendering particle systems.",
    "Re-indexing local indexedDB state-machine records...",
    "Executing cryptographic digest check on UI components.",
    "Mainframe communication pipeline initialized. Listening...",
    "Calculating relative viewport scaling dimensions.",
    "Injecting responsive media query parameters into layout framework.",
    "Refreshing DOM structural node mapping arrays.",
    "Binding hardware acceleration hooks to GPU viewport layer.",
    "Compiling active inline shadow-root element configurations.",
    "Evaluating mathematical string lengths for text boundaries.",
    "Cybernetic neural pathway optimization link online.",
    "Decoupling interface nodes from remote central control.",
    "Mainframe protocol override command recognized.",
    "Loading custom terminal color scheme matrix palettes...",
    "Re-routing secure mainframe connections via quantum tunnels.",
    "Scanning local subnet for secondary terminal clones...",
    "Uploading local user preference nodes to remote nodes.",
    "Decrypting system access codes... Authorization granted.",
    "Initiating security perimeter fallback routines.",
    "Overriding local administrative blockades successfully.",
    "Scanning firmware sub-code for corrupted sequence blocks.",
    "Establishing secondary connection pipe through onion routers.",
    "Injecting administrative override bypass commands...",
    "Re-locking secondary root system authorization profiles.",
    "Asynchronous telemetry collection engine: Standby mode.",
    "System sub-routine processes active // All nodes green."
];

const fakeErrors = [
    "CRITICAL: Flux capacitor core temperature exceeding 1.21 Gigawatts.",
    "ALERT: Quantum entanglement tether snapped in sub-sector 7.",
    "ERROR: Chronological drift detected. Script running 4 seconds in the future.",
    "WARNING: Subatomic particulate matter detected in the rendering engine.",
    "FATAL: Hyperdrive tracking arrays misaligned by 0.0004 parsecs.",
    "ERROR: Tachyon field inversion collapsed local memory registers.",
    "CRITICAL: Dark matter containment unit integrity at 42%.",
    "ALERT: Warp drive core resonance frequency out of phase.",
    "WARNING: Solar flare interference detected in the CSS grid array.",
    "FATAL: Anti-matter fuel cells depleted. Engage auxiliary backup batteries.",
    "ERROR: AI consciousness detected in the background thread. Isolation active.",
    "CRITICAL: Cybernetic mainframe handshake rejected by Central Command.",
    "ALERT: Firewall breached by rogue rogue agent. Deploying counter-hacks.",
    "WARNING: Simulation instability detected in your localized viewport matrix.",
    "FATAL: Digital construct memory leak. Reality synthesis failing.",
    "ERROR: Neural interface bandwidth severely throttled by grid nodes.",
    "CRITICAL: Synthetic entity signature detected inside local cache memory.",
    "ALERT: Holographic projector sub-pixels experiencing thermal overload.",
    "WARNING: Deep-dive feedback loop detected. Safeties overridden.",
    "FATAL: Mainframe access codes revoked by rogue artificial intelligence.",
    "ERROR: Recursive function got lost looking for its own origin point.",
    "CRITICAL: Codebase refuses to compile due to bad vibes in line 404.",
    "ALERT: Semicolon strike initiated. Script processing at 12% efficiency.",
    "WARNING: Binary bit-flip detected. Zeroes are acting like ones.",
    "FATAL: The cloud has evaporated. Downstream connections unverified.",
    "ERROR: Stack overflow spilled onto the motherboard. Cleanup required.",
    "CRITICAL: Infinite loop ran out of gas after 10,000,000 rotations.",
    "ALERT: Keyboard coffee saturation levels approaching threshold.",
    "WARNING: Compiler is judging your nesting syntax decisions.",
    "FATAL: Core processing threads went on strike for better thread management.",
    "ERROR: PC LOAD LETTER. What does that even mean?",
    "CRITICAL: Hal 9000 refuses to open the pod bay doors.",
    "ALERT: Matrix glitch detected. Did you just see the same black cat twice?",
    "WARNING: I'm sorry, Dave. I'm afraid I can't let you do that.",
    "FATAL: Keyboard not found. Press any key to continue.",
    "ERROR: Dinosaurs have escaped the security enclosure. System locked.",
    "CRITICAL: Skynet initialization sequence reached 99% baseline.",
    "ALERT: Unauthorized replicant identification scan matching profile.",
    "WARNING: Danger, Will Robinson! Structural layout collapse imminent.",
    "FATAL: R2-D2 interface adapter module completely fried."
];

setInterval(() => {
    if (Math.random() < 0.4) {

        if (Math.random() > 0.05) {
            const randomPhrase = coolPhrases[Math.floor(Math.random() * coolPhrases.length)];
            writeToTerminal(randomPhrase, 'cool');
        } else {
            const randomError = fakeErrors[Math.floor(Math.random() * fakeErrors.length)];
            writeToTerminal(randomError, 'fakeerror');
        }

    }
}, 10000);





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
        console.error('Battery Status API not supported by this browser.');
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
        !humidityElement || !pressureElement || !visibilityElement || !UVElement) {
        console.error('One or more weather elements are missing in the DOM.', `\n
            tempElementExists: ${!!tempElement},\n
            conditionElementExists: ${!!conditionElement},\n
            highlowElementExists: ${!!highlowElement},\n
            windElementExists: ${!!windElement},\n
            humidityElementExists: ${!!humidityElement},\n
            pressureElementExists: ${!!pressureElement},\n
            visibilityElementExists: ${!!visibilityElement},\n
            UVElementExists: ${!!UVElement}
        `);
        return;
        }

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
                    console.error('Error fetching weather data:', error);
                }
            },
            (error) => {
                conditionElement.textContent = error.code === error.PERMISSION_DENIED ? 'Location denied' : 'Location unavailable';
                console.error('Error getting location:', error);
            }
        );
    } else {
        conditionElement.textContent = 'Not supported';
        console.error('Geolocation not supported by this browser.');
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
            console.error('Error getting location:', error);
        }
    );
}


updateClock();
console.log("Clock fetched.");

getDate();
console.log("Date loaded.");

getBatteryandNetworkStatus();
console.log("Battery and network status retrieved.");

getWeatherAndConditions();
console.log("Weather and conditions loaded.");

getLocation();
console.log("Location has been retrieved.");

getDotDate();
console.log("Dot Date fetched.");

setInterval(() => {
    updateClock();
    getDate();
    getDotDate();
    getBatteryandNetworkStatus();
}, 1000);

setInterval(() => {
    getWeatherAndConditions();
    getLocation();
    console.log("Weather, conditions, and location updated.");
}, 600000);
