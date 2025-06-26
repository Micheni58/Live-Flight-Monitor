const myApi = 'https://opensky-network.org/api/states/all';
function fetchAPi(){
    fetch('https://opensky-network.org/api/states/all')
    .then((res) => res.json())
    .then((data) => displayInfo(data))
    
}
function displayInfo(planeData){
    const list = document.createElement('li')
    list.innerText = planeData;
    const listItem = document.getElementsByClassName('plane-data')    
    listItem.appendChild(li)
}