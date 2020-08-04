const api="7cc28bfe20c24537be6bc0924604b09c"
const searchURL="https://api.spoonacular.com/recipes/complexSearch"





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




function formatQueryParams(params) {
  const queryItems = Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}





function displayResults(responseJson) {
  console.log(responseJson)
  $('#results').empty();
  for (let i = 0; i < responseJson.results.length; i++) {
    $('#results').append(
        `<ul>
          <li><h3>${responseJson.results[i].title}</h3></li>
          <img src="${responseJson.results[i].image}">
          <p>${responseJson.results[i].summary}</p>
          <p>${responseJson.results[i].nutrition[0].title} ${responseJson.results[i].nutrition[0].amount}</p>
          <p>${responseJson.results[i].nutrition[1].title} ${responseJson.results[i].nutrition[1].amount}</p>
          <p>${responseJson.results[i].nutrition[2].title} ${responseJson.results[i].nutrition[2].amount}</p>
          <p>${responseJson.results[i].nutrition[3].title} ${responseJson.results[i].nutrition[3].amount}</p>
          <p>Find out how to make it here:</p>
          <a href="${responseJson.results[i].sourceUrl}" target="\_blank">${responseJson.results[i].sourceUrl}</a>
        </ul>`
    )
  };
}





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

$(watchForm);