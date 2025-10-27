function fetchResults(event) {
    event.preventDefault();

    const dest = document.getElementById('destination').value.trim().toLowerCase();
    const apiUrl = "./travelRecommendation_api.json";
    const result = document.getElementById('result');
    let filter;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            result.innerHTML = "";
            if (dest === "beaches" || dest === "temples") {
                switch (dest) {
                    case "beaches":
                        filter = data.beaches;
                        break;
                    case "temples":
                        filter = data.temples;
                        break;
                    default:
                        console.log("erreur non connu");

                }

                filter.forEach(elt => {
                    console.log(elt);
                    result.innerHTML += `
                            <article>
                                <img src="${elt.imageUrl}" alt="${elt.name}">
                                <h3>${elt.name}</h3>
                                <p>${elt.description}</p>
                                <button class="btn-green">Visit</button>
                            </article>
                        `;

                });

            }
            data.countries.forEach(country => {
                country.cities.forEach(elt => {
                    if (
                        country.name.toLowerCase().includes(dest) ||
                        elt.name.toLowerCase().includes(dest) ||
                        elt.description.toLowerCase().includes(dest)
                    ) {
                        result.innerHTML += `
                            <article>
                                <img src="${elt.imageUrl}" alt="${elt.name}">
                                <h3>${elt.name}</h3>
                                <p>${elt.description}</p>
                                <button class="btn-green">Visit</button>
                            </article>
                        `;
                    }
                });
            });

            if (result.innerHTML === "") {
                result.innerHTML = `<div class="no-result"><p>No results found for "${dest}"</p><div>`;
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

