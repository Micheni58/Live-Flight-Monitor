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
    .catch((error) => console.error('Fetch error:', error)); // Add error handling
}
function displayInfo(planeData) {
  const listItem = document.querySelector('.plane-data'); // Use querySelector
  if (!listItem) {
    console.error('No .plane-data element found');
    return;
  }
  listItem.innerHTML = ''; // Clear existing content
  planeData.states.forEach(flight => { // Iterate over states
    const list = document.createElement('li');
    list.innerText = flight[1] ? flight[1].trim() : 'Unknown'; // Use callsign
    listItem.appendChild(list); // Use list
  });
}
fetchAPi(); // Call the function