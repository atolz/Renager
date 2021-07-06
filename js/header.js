const header = document.querySelector("header");
const menuBackground = header.querySelector(".menu-background");
const burgerMenu = menuBackground.querySelector(".burger-menu");
const sidebar = document.querySelector(".section-sidebar");
const sidebarNav = sidebar.querySelector(".nav");
const googlePlayDownload = sidebar.querySelector(".btn-download");

const nav = sidebar.querySelector(".nav");
let currentActiveLink = nav.querySelector(".nav__link-active");



menuBackground.addEventListener("click", (e) => {
    burgerMenu.classList.toggle("burger-menu--active");
    sidebar.classList.toggle("section-sidebar--show");
    sidebarNav.classList.toggle("nav--show");
    googlePlayDownload.classList.toggle("btn-download--show");
});

nav.addEventListener("click", (e)=>{
    const target = e.target.closest(".nav__item");
    if(!target) return;

    currentActiveLink = nav.querySelector(".nav__link-active");
    const newActiveLink = target.querySelector(".nav__link");
    
    currentActiveLink.classList.remove("nav__link-active");
    newActiveLink.classList.add("nav__link-active");
})

// fetch('js/serverText.json').then((response)=>{
//     console.log("in test server request");
//     console.log(response);
//     console.log(response.json().then((text)=>{
//         console.log(text)
//     }));
// })

async function getJson(){
    const response = await fetch('js/serverText.json');
    console.log(response);
    return response.json();
}

getJson()
// console.log(getJson());