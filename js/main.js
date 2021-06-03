const search = document.getElementById('search');
const matchList = document.getElementById('match-list');


//search states.json and filter it
const searchStates = async searchText =>{
    const res = await fetch('data/states.json');
    const states = await res.json();

    //get matches to current text input
    let matches = states.filter(state=>{
const regex = new RegExp(`^${searchText}`, 'gi');
return state.name.match(regex) || state.abbr.match(regex);
    });// regx/RegExp (regular expression)
    // added ^ sign so that it starts with the letter that is enterd in search box
    //in 2nd parameter 'gi' is for g=global, i=case insensitive

    if(searchText.length === 0){
        matches = [];
        matchList.innerHTML = '';
    }

    outputHtml(matches);

}

//show results in html

const outputHtml = matches =>{
    if(matches.length>0){
        const html = matches.map(match => `
        
            <div class="card card-body mb-1">
            <h4>${match.name}(${match.abbr})
            <span class="text-primary">${match.capital}</span>
            <small>Lat: ${match.lat} / Long: ${match.long}</small>
            </h4>
            
            </div>
        `).join('');

        matchList.innerHTML = html;
    }
}

search.addEventListener('input', ()=> searchStates(search.value));
