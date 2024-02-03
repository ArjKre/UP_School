
function changeImageCategory(category){
    document.getElementsByClassName("active-category")[0].classList.remove("active-category");
    document.getElementById(category).classList.add("active-category");
    document.getElementsByClassName("active-grid")[0].classList.remove("active-grid");
    document.getElementById("images_"+category).classList.add("active-grid");
}