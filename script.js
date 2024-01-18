let providerData = [];

document.addEventListener('DOMContentLoaded', function() {
    fetch('/nybh/nyc_behavioral_health_providers_sample.json')
        .then(response => response.json())
        .then(data => {
            providerData = data.sort((a, b) => {
                // Safely handle possibly undefined 'name' properties
                const nameA = a.name || '';
                const nameB = b.name || '';
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
            (provider.name && provider.name.toLowerCase().includes(searchString)) ||
            (provider.services && provider.services.toLowerCase().includes(searchString))
        );
    });
    displayProviders(filteredProviders);
}

function displayProviders(providers) {
    const resultsContainer = document.getElementById('results');
    const htmlString = providers.map(provider => {
        return `
            <div class="provider">
                <h2>${provider.name || 'Unnamed Provider'}</h2>
                <p>${provider.services || 'No services listed'}</p>
                <!-- Add more details as needed -->
            </div>
        `;
    }).join('');
    resultsContainer.innerHTML = htmlString;
}
