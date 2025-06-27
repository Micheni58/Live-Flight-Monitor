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


fetchAPi();