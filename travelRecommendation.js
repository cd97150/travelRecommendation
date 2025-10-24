function fetchResults(event) {
    event.preventDefault();

    const dest = document.getElementById('destination').value.trim().toLowerCase();
    const apiUrl = "./travelRecommendation_api.json";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            result.innerHTML = "";

            data.countries.forEach(country => {
                if (country.name.toLowerCase() === dest) {
                    console.log(country);
                    country.cities.forEach(city => {
                        const result = document.getElementById('result');
                        //afficher tout les resultats 
                        result.innerHTML += `<article><h3>${city.name}</h3><p>${city.description}</p><button class="btn-green">Visit<button></article>`
                    });
                }

            });
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
    dest.value= "";
    result.innerHTML = "";
}

document.getElementById('btnClear').addEventListener('click', clearResults);
