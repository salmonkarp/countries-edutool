document.addEventListener('DOMContentLoaded', () => {
    let query = 'https://restcountries.com/v3.1/name/' + document.querySelector('input[type=hidden]').value + '?fullText=true';
    axios.get(query)
    .then(response => {
        let data = response.data[0];
        console.log(data);
        let root = document.querySelector('.body-detail');

        let nameDiv = document.createElement('div');
        nameDiv.classList.add('name');
        nameDiv.innerHTML = `${data.name.common}`;
        root.appendChild(nameDiv);

        let detailList = document.createElement('ul');
        detailList.classList.add('detail-list');
        detailList.innerHTML = `
        <li class="detail-detail">Native name: ${Object.values(data.name.nativeName)[0].common}</li>
        <li class="detail-detail">Population: ${parseInt(data.population / 100) * 100}</li>
        <li class="detail-detail">Region: ${data.region}</li>
        <li class="detail-detail">Sub Region: ${data.subregion}</li>
        <li class="detail-detail">Capital: ${data.capital[0] || ""}</li>
        <li class="detail-detail">Top Level Domain: ${data.tld}</li>
        <li class="detail-detail">Currency: ${Object.values(data.currencies)[0].name || ""}</li>
        `;
        root.appendChild(detailList);

        let borderCountries = document.createElement('div');
        borderCountries.classList.add('border-countries');
        borderCountries.innerHTML = `
            <p class="border-label">Border Countries:</p>
        `;
        if(data.borders){
            for(let i=0; i<data.borders.length; i++){
                let curname;
                let query = 'https://restcountries.com/v3.1/alpha/' + data.borders[i].toLowerCase();
                axios.get(query).then(response => {
                    curname = response.data[0].name.common;
                    borderCountries.innerHTML += `<button class="border-country dark-theme element" type="button" onclick="redirect('/${curname}')">${curname}</button>`
                })
                .finally(() => {
                    document.querySelector('.body-details').style.opacity = 100;
                });
            }
            root.appendChild(borderCountries);
        }
        

        let flag = document.querySelector('.detail-img');
        flag.src = data.flags.png;

    })
    .finally(() => {
        document.querySelector('.body-details').style.opacity = 100;
    });
})

function redirect(target){
    window.location.href = target;
}