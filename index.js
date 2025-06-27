// const myApi = 'https://opensky-network.org/api/states/all';
// function fetchAPi(){
//     fetch('https://opensky-network.org/api/states/all')
//     .then((res) => res.json())
//     .then((data) => displayInfo(data))
//     .then((error) =>console.error('Nothing to show', error))
// }
// function displayInfo(planeData){
//     const list = document.createElement('li')
//     list.innerText = planeData;
//     const card = document.getElementsByClassName('plane-data')    
//     card.appendChild(li)
// }
// fetchAPi()
let planeDataCache = null;
function fetchAPi() {
  fetch('https://opensky-network.org/api/states/all')
    .then((res) => res.json())
    .then((data) => displayInfo(data))
    .catch((error) => console.error('Fetch error:', error)); 
}
function displayInfo(planeData) {
  const listItem = document.querySelector('.plane-data'); 
  if (!listItem) {
    console.error('No .plane-data element found');
    return;
  }
  listItem.innerHTML = ''; 
  planeData.states.forEach(flight => { 
    const list = document.createElement('li');
    list.innerText = flight[1] ? flight[1].trim() : 'Unknown'; 
    listItem.appendChild(list); 
  });
}
function searchData(){
    const searchButton = document.querySelector('#btnSearch')
    const searchInput = document.querySelector('#flightSearch')
    const resultList =document.querySelector('.result-list')
    // console.log(searchInput)
    searchButton.addEventListener('click',(e) =>{
    const callSign = searchInput.value.trim().toLowerCase();
        if(!callSign){
            resultList.innerHTML = '<li> Please enter a callsign to search </li>';
            return;
        }
        if(!planeDataCache){
            resultList.innerHTML = '<li> No flight data available.Pleas wait for data to load!</li>'
            return;
        }
        const flight = planeDataCache.states.find(flight =>
            flight[1]?.trim().toLowerCase() ===callSign
        );
        resultList.innerHTML = '';
        if(flight){
            const li = document.createElement('li');
            li.innerHTML = `
            CallSign: ${flight[1] || 'Unknown'}<br>
            Origin COuntry:${flight[2] || 'Unknown'}<br>
            Longitude:${flight[5] || 'N/A'}<br>
            Latitude: ${flight[6] || 'N/A'}<br>
            Altitude:${flight[7] || 'N/A'} m
            `;
            resultList.appendChild(li);
        }else{
            resultList.innerHTML = '<li>No flight found with that callsign</li>';
        }
    })


}
const clearButton = document.querySelector('#btnClear');
clearButton.addEventListener('click', ()=>{
    searchInput.value ='';
    resultList.innerHTML = '';
})
fetchAPi();