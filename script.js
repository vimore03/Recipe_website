
function searchRecipes() {
    const searchInput = document.getElementById('searchInput').value;
    const recipesDiv = document.getElementById('recipes');
    const notFoundDiv = document.getElementById('notFound');

    // Clear previous results
    recipesDiv.innerHTML = '';
    notFoundDiv.style.display = 'none';

    // Check if input is empty
    if (searchInput.trim() === '') {
        notFoundDiv.innerHTML = 'Please enter a recipe name to search!';
        notFoundDiv.style.display = 'block';
        return;
    }

    // Fetch recipe data from API
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            if (!data.meals) {
                notFoundDiv.innerHTML = 'Recipe not found, please try another search!';
                notFoundDiv.style.display = 'block';
            } else {
                data.meals.forEach(meal => {
                    const card = document.createElement('div');
                    card.classList.add('recipe-card');

                    card.innerHTML = `
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <h3>${meal.strMeal}</h3>
                        <button onclick="viewRecipe('${meal.idMeal}')">View Recipe</button>
                    `;

                    recipesDiv.appendChild(card);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            notFoundDiv.innerHTML = 'An error occurred. Please try again later.';
            notFoundDiv.style.display = 'block';
        });
}

// View a specific recipe by ID
function viewRecipe(idMeal) {
    const popupCard = document.getElementById('popup-card');
    const recipeTitle = document.getElementById('recipe-title');
    const recipeDetails = document.getElementById('recipeDetails');
    const notFoundDiv = document.getElementById('notFound');

    // Fetch recipe details using idMeal
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
        .then(response => response.json())
        .then(data => {
            if (data.meals && data.meals.length > 0) {
                popupCard.style.display = 'block';
                const meal = data.meals[0];
                recipeTitle.innerText = meal.strMeal;
                recipeDetails.innerText = meal.strInstructions;
            } else {
                notFoundDiv.innerHTML = 'Recipe not found!';
                notFoundDiv.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            notFoundDiv.innerHTML = 'An error occurred. Please try again later.';
            notFoundDiv.style.display = 'block';
        });
}

// Close the popup card
function closeRecipe() {
    document.getElementById('popup-card').style.display = 'none';
}
