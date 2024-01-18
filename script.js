let providerData = [];

document.addEventListener('DOMContentLoaded', function() {
    fetch('/nybh/nyc_behavioral_health_providers_sample.json')
        .then(response => response.json())
        .then(data => {
            providerData = data.sort((a, b) => {
                // Safely handle possibly undefined 'PROVIDER OR FACILITY NAME' properties
                const nameA = a['PROVIDER OR FACILITY NAME'] || '';
                const nameB = b['PROVIDER OR FACILITY NAME'] || '';
                return nameA.localeCompare(nameB);
            });
            displayProviders(providerData); // Display all providers initially
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });

    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('keyup', (e) => {
        const searchString = e.target.value.toLowerCase();
        searchProviders(searchString);
    });
});

function searchProviders(searchString) {
    const filteredProviders = providerData.filter(provider => {
        return (
            (provider['PROVIDER OR FACILITY NAME'] && provider['PROVIDER OR FACILITY NAME'].toLowerCase().includes(searchString)) ||
            (provider['PROFESSION OR SERVICE'] && provider['PROFESSION OR SERVICE'].toLowerCase().includes(searchString))
        );
    });
    displayProviders(filteredProviders);
}

function displayProviders(providers) {
    const resultsContainer = document.getElementById('results');
    const htmlString = providers.map(provider => {
        return `
            <div class="provider">
                <h2>${provider['PROVIDER OR FACILITY NAME'] || 'Unnamed Provider'}</h2>
                <p>${provider['PROFESSION OR SERVICE'] || 'No services listed'}</p>
                <!-- Add more details as needed -->
            </div>
        `;
    }).join('');
    resultsContainer.innerHTML = htmlString;
}
