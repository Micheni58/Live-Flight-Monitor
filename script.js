let api = "https://api.aviationstack.com/v1/flights? access_key = 4c5180e3b6e5d0787812f399072f65f7";

let planeDataCache = null;
let retryTimeout = null;

function fetchAPi() {
    fetch('https://api.aviationstack.com/v1/flights?access_key=4c5180e3b6e5d0787812f399072f65f7')
        .then((res) => {
            if (!res.ok) {
                if (res.status === 429) {
                    const listItem = document.querySelector('.plane-data');
                    if (listItem) {
                        listItem.innerHTML = `<li>Too many requests. Retrying in 60 seconds...</li>`;
                    }
                    clearTimeout(retryTimeout);
                    retryTimeout = setTimeout(fetchAPi, 60000);
                    throw new Error('Too many requests');
                }
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            planeDataCache = {
                states: data.data.map(flight => [
                    flight.flight?.icao || 'Unknown', 
                    flight.flight?.iata || 'Unknown', 
                    flight.departure?.timezone?.split('/')[1]?.replace('_', ' ') || 'Unknown', 
                    0, 0, // Placeholder
                    flight.live?.longitude || null, 
                    flight.live?.latitude || null, 
                    flight.live?.altitude || null, 
                    flight.flight_date || 'Unknown', 
                    flight.flight_status || 'Unknown' 
                ])
            };
            displayInfo(planeDataCache);
        })
        .catch((error) => {
            console.error('Fetch error:', error);
            const listItem = document.querySelector('.plane-data');
            if (listItem) {
                listItem.innerHTML = `<li>${error.message}</li>`;
            }
        });
}

function displayInfo(planeData) {
    const listItem = document.querySelector('.plane-data');
    if (!listItem) {
        console.error('No .plane-data element found');
        return;
    }
    listItem.innerHTML = '';
    planeData.states.slice(0, 50).forEach(flight => {
        const list = document.createElement('li');
        list.innerText = flight[1] ? flight[1].trim() : 'Unknown';
        listItem.appendChild(list);
    });
}

function searchData() {
    const searchButton = document.querySelector('#btnSearch');
    const searchInput = document.querySelector('#flightSearch');
    const resultList = document.querySelector('.result-list');
    const clearButton = document.querySelector('#btnClear');

    searchButton.addEventListener('click', () => {
        const callsign = searchInput.value.trim().toLowerCase();
        if (!callsign) {
            resultList.innerHTML = '<li>Please enter a callsign to search.</li>';
            return;
        }
        if (!planeDataCache) {
            resultList.innerHTML = '<li>No flight data available. Please wait for data to load!</li>';
            return;
        }
        const flight = planeDataCache.states.find(flight =>
            flight[1]?.trim().toLowerCase() === callsign
        );
        resultList.innerHTML = '';
        if (flight) {
            const li = document.createElement('li');
            li.innerHTML = `
                Callsign: ${flight[1] || 'Unknown'}<br>
                Origin Country: ${flight[2] || 'Unknown'}<br>
                Longitude: ${flight[5] || 'N/A'}<br>
                Latitude: ${flight[6] || 'N/A'}<br>
                Altitude: ${flight[7] || 'N/A'} m<br>
                Flight Date: ${flight[8] || 'N/A'}<br>
                Flight Status: ${flight[9] || 'N/A'}
            `;
            resultList.appendChild(li);
        } else {
            resultList.innerHTML = '<li>No flight found with that callsign.</li>';
        }
    });

    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        resultList.innerHTML = '';
    });
}

fetchAPi();
searchData();