const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
let botondebajar =document.getElementById("drop");
let list =document.getElementById("list");
let icon =document.getElementById("icon");
let span =document.getElementById("span");
let input =document.getElementById("search-input");
let listItems =document.querySelectorAll(".lista-despegable-item");
const searchInput = document.getElementById('search-input');
const recipeCloseBtn = document.getElementById('recipe-close-btn');


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
        input.placeholder = "Buscar en " + e.target.innerText + "...";
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
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}








 recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});