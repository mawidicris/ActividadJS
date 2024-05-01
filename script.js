const searchBtn = document.getElementById('search-btn');
const GetBtn = document.querySelector('recipe-btn');
const mealList = document.getElementById('meal');
let botondebajar = document.getElementById("drop");
let list = document.getElementById("list");
let icon = document.getElementById("icon");
let span = document.getElementById("span");
let listItems = document.querySelectorAll(".lista-despegable-item");
const mealDetailsContent = document.querySelector('.meal-details-content');
const searchInput = document.getElementById('search-input');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

botondebajar.onclick = function () {
    if (list.classList.contains("show")) {
        icon.style.rotate = "0deg";
    } else {
        icon.style.rotate = "-180deg";
    }
    list.classList.toggle("show");
};

window.onclick = function (e) {
    if (
        e.target.id !== "drop" &&
        e.target.id !== "span" &&
        e.target.id !== "icon"
    ) {
        list.classList.remove("show");
        icon.style.rotate = "0deg";
    }
};

for (item of listItems) {
    item.onclick = function (e) {
        span.innerText = e.target.innerText;
        input.placeholder = "Buscar por " + e.target.innerText + "...";
    };
}

// Variable global para almacenar todos los resultados obtenidos
let allMeals = [];

// Variable global para mantener el índice de los resultados mostrados
let shownMealIndex = 0;

searchBtn.addEventListener('click', getMealList);
// Event listener para la tecla "Enter" en el campo de entrada de búsqueda
searchInput.addEventListener('keypress', function(e) {
    // Verificar si la tecla presionada es "Enter" (código de tecla 13)
    if (e.key === 'Enter') {
        // Llamar a la función getMealList cuando se presiona "Enter"
        getMealList();
    }
});
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
   
});
GetBtn.addEventListener('click', () => {
    document.querySelector('.meal-details').style.display = 'block';
    console.log("La función mealRecipeModal se ha llamado correctamente.");

}
);



// Función para obtener los ingredientes que coincidan

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
                            <a href = "#" class = "recipe-btn">Ver receta</a>
                        </div>
                    </div>
                `;
            });
            document.querySelector('#meal').style.display = 'grid';
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
            document.getElementById('notFoundImage').style.display = 'block';
        }
        var audio = document.getElementById('welcomeAudio');
        audio.play();
        mealList.innerHTML = html;
    });
}

// Función para mostrar las comidas
function showMeals(meals) {
    let html = "";
    meals.forEach(meal => {
        html += `
            <div class="meal-item" data-id="${meal.idMeal}">
                <div class="meal-img">
                    <img src="wanted.png">
                    <img src="${meal.strMealThumb}" alt="food">
                </div>
                <div class="meal-name">
                    <h3>${meal.strMeal}</h3>
                    <a href="#" class="recipe-btn">Get Recipe</a>
                </div>
            </div>
        `;
    });
    mealList.innerHTML = html;
   
   
    mealList.style.display = "grid";
    document.body.style.overflowY = "auto";
}

// Obtener receta de la comida
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        console.log(mealItem)
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data); 
                mealRecipeModal(data.meals)});
    }

}

// Crear un modal
function mealRecipeModal(meal) {
    console.log(meal)
    meal = meal[0];
    let html = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-instruct">
            <h3>Instrucciones:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="">
        </div>
        
      
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');



}



