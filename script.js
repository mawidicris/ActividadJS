    const searchBtn = document.getElementById('search-btn');
    const mealList = document.getElementById('meal');
    let botondebajar =document.getElementById("drop");
    let list =document.getElementById("list");
    let icon =document.getElementById("icon");
    let span =document.getElementById("span");
    let listItems =document.querySelectorAll(".lista-despegable-item");
    const searchInput = document.getElementById('search-input');
    const recipeCloseBtn = document.getElementById('recipe-close-btn');
    const segundaImagen = document.querySelector('.recipe-meal-img img:nth-child(2)');

    searchBtn.addEventListener('click', getMealList);
    mealList.addEventListener('click', getMealRecipe);
    recipeCloseBtn.addEventListener('click', () => {
        mealDetailsContent.parentElement.classList.remove('showRecipe');
    });
    botondebajar.onclick = function (){
        if(list.classList.contains("show")){
            icon.style.rotate =  "0deg";
        }
        else {
        icon.style.rotate =  "-180deg";}
        list.classList.toggle("show");

        
        
    };

    window.onclick = function(e){
        if(
        e.target.id !== "drop" &&
        e.target.id !== "span" &&
        e.target.id !== "icon" ){
            list.classList.remove("show");

            icon.style.rotate =  "0deg";
        }

    }
    for(item of listItems){
        item.onclick=function(e){
            span.innerText = e.target.innerText;
            input.placeholder = "Buscar por " + e.target.innerText + "...";
        };
    }

    // Función para obtener los ingredientes que coíncida 

function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src="wanted.png">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
            mealList.style.display = "grid";
            document.body.style.overflowY = "auto";

        } else{
            html = "Sorry, we didn't find any meal!...We haven't found the All Blue yet!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}


 // get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

   // create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    

    recipeCloseBtn.addEventListener('click', () => {
        mealDetailsContent.parentElement.classList.remove('showRecipe');
    });

    mealDetailsContent.parentElement.classList.add('showRecipe');


}