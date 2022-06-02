//Version: 4.34
//Last Edited: 26/05/22
//Edited by: Tait

//This Script connects to the animechan.vercel.app API and returns famous quotes of the anime searched by the user.

//Stores the URL of the animechan.vercel.app API endpoint.
const apiUrl = 'https://animechan.vercel.app/api/quotes/anime?title'

//Declares all necessary variables so they are globally scoped.
const searchBox = document.getElementById("search")
const submitBtn = document.getElementById("submit")
const alertBox = document.querySelector('.alert')
const factsDiv = document.getElementById("facts");

//Added an addEventListener to the window object so that the default display of the error alertBox is hidden when the page first loads.
//Added LocalStorage getItem, so that browser will auto-load old search result when refresh page
window.addEventListener("load", function () {
  alertBox.style.display = "none"
  const saveSearch = localStorage.getItem('search')
  if (saveSearch) {
    searchBox.value = saveSearch;
    randomFact(saveSearch);
  }
})

//Added an addEventListener to make search box dynamic, with which users' search for the quotes of their desired favourite anime.
//Added LocalStorage setItem, so that browser will save current search result
//Added Client Form validation, where empty search will trigger a validation message
submitBtn.addEventListener("click", function (event) {
  event.preventDefault()
  let query = searchBox.value

  if (query.length > 0) {
    randomFact(query)
    localStorage.setItem('search', searchBox.value)
  } else {
    alertBox.style.display = "block"
    alertBox.innerHTML = "Please enter a valid search"
  }
})


//Connects to the API and fetches/gets the information.
async function randomFact(query) {
  try {
    const response = await fetch(`${apiUrl}=${query}`);
    const data = await response.json();
    console.log(data);
    displayData(data)

    //If user's search is valid, error message display is set to none.
    alertBox.style.display = "none"

    //If user's search is invalid, will display error message returned by the server
    if (data.error) {
      alertBox.style.display = "block"
      alertBox.innerHTML = data.error
    }

    //Try/catch function is programmed so that a server error will be logged if server is down
  } catch (error) {
    console.log(error);
    alertBox.style.display = "block"
    alertBox.innerHTML = "Sorry the Database is down try in 5mins"
  }
}

//Displays the data on the page.
function displayData(data) {

  //Empty string before for loop, so that new search entries will override old search entries.
  factsDiv.innerHTML = ""

  //For loop, so that information in array can be looped over and search entries will append each other to display the result.
  for (let j = 0; j < data.length; j++) {
    const para = document.createElement("p");
    const node = document.createTextNode(`Quote ${j + 1}: ${data[j].quote}`);
    para.appendChild(node);
    factsDiv.appendChild(para);
  }
}