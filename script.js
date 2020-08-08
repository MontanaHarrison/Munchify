const api="7cc28bfe20c24537be6bc0924604b09c"
const searchURL="https://api.spoonacular.com/recipes/complexSearch"


//Using GET to recieve info from API within certain parameters
function getRecipes(query, cuisine, diet, minCalories, maxCalories, minProtein, maxProtein, minCarbs, maxCarbs, minFat, maxFat) {
 
  if (maxCalories.length <=0)
      maxCalories = 2000;
  if (minCalories.length <=0)
      minCalories = 0;
  if (maxProtein.length <=0)
      maxProtein = 2000;
  if (minProtein.length <=0)
      minProtein = 0;
  if (maxCarbs.length <=0)
      maxCarbs = 2000;
  if (minCarbs.length <=0)
      minCarbs = 0;
  if (maxFat.length <=0)
      maxFat = 2000;
  if (minFat.length <=0)
      minFat = 0;

  const intoleranceArray = []
    $("input[type=checkbox]:checked").each(function () {
      intoleranceArray.push($(this).val())
    }); 

  const params = {
    query,
    cuisine,
    diet,
    intolerances: intoleranceArray,
    minCalories,
    maxCalories,
    minProtein,
    maxProtein,
    minCarbs,
    maxCarbs,
    minFat,
    maxFat,
    number:15,
    addRecipeInformation: true,
    apiKey: api
  };

  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString
  console.log(url)
    fetch(url)
      .then(response => response.json())
      .then(responseJson =>
        displayResults(responseJson))
      .catch(error => alert('Error. Try again later.'))
}


//Allows the parameters to be formated easily into the sent request URL
function formatQueryParams(params) {
  const queryItems = Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}


//Adds content to the DOM, allows footer to be seen, and automatically scrolls down towards results
function displayResults(responseJson) {
  console.log(responseJson)
  $('#results').empty();
  for (let i = 0; i < responseJson.results.length; i++) {
    $('#results').append(
        `<form>
          <ul>
            <li><a href="${responseJson.results[i].sourceUrl}" target="\_blank"><h2>${responseJson.results[i].title}</h2></a></li>
            <img src="${responseJson.results[i].image}" class="result-img">
            <p class="result-info">${responseJson.results[i].summary}</p>
            <p class="result-info">${responseJson.results[i].nutrition[0].title} ${responseJson.results[i].nutrition[0].amount}</p>
            <p class="result-info"> ${responseJson.results[i].nutrition[1].title} ${responseJson.results[i].nutrition[1].amount}</p>
            <p class="result-info">${responseJson.results[i].nutrition[2].title} ${responseJson.results[i].nutrition[2].amount}</p>
            <p class="result-info">${responseJson.results[i].nutrition[3].title} ${responseJson.results[i].nutrition[3].amount}</p>
            <img src="img/cooking.png" class="cooking-img">
          </ul>
        </form>`
    )};

  $('#hiddenFooter').removeClass('hiddenFooter');

  const elmnt = document.getElementById("scroll");
  elmnt.scrollIntoView({behavior: 'smooth'});
}


//Takes values from user inputs, watches for 'submit' button to be used, and then runs the getRecipes function
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#searchTerm').val();
    const cuisine = $('#cuisine').val();
    const diet = $('#diet').val();
    const minumCalories = $('#min-calories').val();
    const maximCalories = $('#max-calories').val();
    const minumProtein = $('#min-protein').val();
    const maximProtein = $('#max-protein').val();
    const minumCarbs = $('#min-carbs').val();
    const maximCarbs = $('#min-carbs').val();
    const minumFat = $('#min-fat').val();
    const maximFat = $('#max-fat').val();

    getRecipes(searchTerm, cuisine, diet, minumCalories, maximCalories, minumProtein, maximProtein, minumCarbs, maximCarbs, minumFat, maximFat);
  });
} 


//Runs the watchFrom function
$(watchForm);