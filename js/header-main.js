const header = document.querySelector("header");
const menuBackground = header.querySelector(".menu-background");
const navDropdown = header.querySelector(".header-main__nav");
const burgerMenu = menuBackground.querySelector(".burger-menu");

menuBackground.addEventListener("click", (e) => {
  burgerMenu.classList.toggle("burger-menu--active");
  if (getComputedStyle(navDropdown).visibility === "hidden") {
    console.log("make visible");
    navDropdown.style.visibility = "visible";
    navDropdown.style.opacity = "1";
    navDropdown.style.minHeight = "40.6rem";
    // navDropdown.style.height ="auto";
    return;
  }
  console.log("make hidden");
  navDropdown.style.visibility = "hidden";
  navDropdown.style.opacity = "0";
  navDropdown.style.minHeight = "0";
});
