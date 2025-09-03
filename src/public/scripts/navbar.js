const mobileMenuButton = document.querySelector("#mobile-menu-button");
const mobileMenu = document.querySelector("#mobile-menu");
const dropdownButtons = document.querySelectorAll(".dropdown-button");

const toggleMobileMenu = () => mobileMenu.classList.toggle("open");

const toggleDropdown = (e) => {
  const dropdownMenu = e.target.nextElementSibling;
  dropdownMenu.classList.toggle("open");
};

const closeDropdown = (e) => {
  const dropdownMenu = document.querySelector(".dropdown-menu.open");

  if (
    !dropdownMenu ||
    dropdownMenu?.contains(e.target) ||
    e.target.classList.contains("dropdown-button")
  ) {
    return;
  }

  dropdownMenu.classList.remove("open");
};

mobileMenuButton.addEventListener("click", toggleMobileMenu);

dropdownButtons.forEach((dropdownButton) => {
  dropdownButton.addEventListener("click", toggleDropdown);
});

window.addEventListener("click", closeDropdown);
