const hamburger = document.getElementById("hamburger");
const menu = document.querySelector(".navigation-menu");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
});