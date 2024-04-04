let countryData;

document.addEventListener('DOMContentLoaded',() => {
    console.log('loaded');
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
        countryData = response.data;
        countryData.sort((a,b) => a.name.common.localeCompare(b.name.common));
        countryData.forEach(country => {
            let name = country.name.common;
            let region = country.region;
            let capital;
            let flagLink = country.flags.png;
            let flagAlt = country.flags.alt;
            let cardEl = document.createElement('div');
            cardEl.classList.add('content-card','element','dark-theme');
            cardEl.addEventListener('click', () => window.location.href = `/${name.toLowerCase()}`);
            if(country.capital){
                capital = country.capital[0];
                cardEl.innerHTML = `<img src="${flagLink}" alt="${flagAlt}">
            <div class="content-title">${name}</div>
            <div class="content-desc"><strong>Population:</strong> 81,000,000
<strong>Region:</strong> ${region} 
<strong>Capital:</strong> ${capital}
            </div>
            <input value=${region} class="region" hidden></input>`;
            }
            else {
                cardEl.innerHTML = `<img src="${flagLink}" alt="${flagAlt}">
            <div class="content-title">${name}</div>
            <div class="content-desc"><strong>Population:</strong> 81,000,000
<strong>Region:</strong> ${region}
            </div>
            <input value=${region} class="region" hidden></input>`;
            }            
            document.querySelector('.body-contents').appendChild(cardEl);
            
        })
    })
    .catch(error => {
        console.log(error);
    })
    .finally(() => {
        console.log('final');
    })
})

function updateFilter() {
    let nameFilter = document.querySelector('#textSearch').value.toLowerCase();
    let regionFilter = document.querySelector('#regionSearch').value;
    let children = Array.from(document.querySelector('.body-contents').children);
    let filteredElements = children.filter(child => 
        child.querySelector('.content-title').innerHTML.toLocaleLowerCase().includes(nameFilter) 
        && (child.querySelector('.region').value === regionFilter || regionFilter === 'null')
        );
    children.forEach(child => child.style.display = 'none');
    filteredElements.forEach(filteredElement => filteredElement.style.display = '');
}