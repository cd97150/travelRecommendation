function fetchResults(event) {
    event.preventDefault();

    const dest = document.getElementById('destination').value.trim().toLowerCase();
    const apiUrl = "./travelRecommendation_api.json";
    const result = document.getElementById('result');
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            result.innerHTML = "";
            data.countries.forEach(country => {
                country.cities.forEach(city => {
                    if (
                        country.name.toLowerCase().includes(dest) ||
                        city.name.toLowerCase().includes(dest) || 
                        city.description.toLowerCase().includes(dest) 
                    ) {
                        result.innerHTML += `
                            <article>
                                <img src="${city.imageUrl}" alt="${city.name}">
                                <h3>${city.name}</h3>
                                <p>${city.description}</p>
                                <button class="btn-green">Visit</button>
                            </article>
                        `;
                    }
                });
            });
            // Si rien n'est trouvé
            if (result.innerHTML === "") {
                result.innerHTML = `<p>No results found for "${dest}"</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            const result = document.getElementById('result');
            result.innerHTML = `<p>Échec de la récupération des datas. Veuillez réessayer.</p>`;
        });
}




document.getElementById('btnSearch').addEventListener('click', fetchResults);


function clearResults(event) {
    const dest = document.getElementById('destination');
    const result = document.getElementById('result');
    dest.value = "";
    result.innerHTML = "";
}

document.getElementById('btnClear').addEventListener('click', clearResults);

