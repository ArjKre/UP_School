
function changeActiveCategoryCard(category){
    document.getElementsByClassName("active-category")[0].classList.remove("active-category")
    document.getElementById(category).classList.add("active-category");
}