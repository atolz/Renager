const searchPos = document.querySelector(".section-search");
const footer = document.querySelector(".footer");
const content = document.querySelector(".content");
const contentOverflow = document.querySelector(".content__overflow");

document.documentElement.scrollTop = 0;

let prevScroll = window.pageYOffset || document.documentElement.scrollTop;
let currentScroll = window.pageYOffset;

var prevScrollpos = window.pageYOffset;
var currentScrollPos = window.pageYOffset;
let scrolling = false;
let deltaScroll = 170;

if (window.matchMedia("(max-width:800px)").matches) {
  window.addEventListener("scroll", () => {
    console.log("scrolling");
    scrolling = true;
    currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
  });
}

setInterval(() => {

  console.log('scroll difference', currentScrollPos - prevScrollpos)
  if(Math.abs(currentScrollPos - prevScrollpos) <= deltaScroll) return;

  if (scrolling) {
    scrolling = false;
    if (footer.getBoundingClientRect().top <= 700) {
      // searchPos.style.top = "-1.2rem";
      searchPos.style.opacity = "0";
      searchPos.style.visibility = "hidden";
      return
    }
    if (prevScrollpos < currentScrollPos && currentScrollPos > 300) {
      // searchPos.style.top = "6.9rem";
      searchPos.style.opacity = "0";
      searchPos.style.visibility = "hidden";
    } else {
      // searchPos.style.top = "7.2rem";
      searchPos.style.opacity = "1";
      searchPos.style.visibility = "visible";
    }
    prevScrollpos = currentScrollPos;
  }
}, 300);

// window.addEventListener("scroll", () => {
//   var currentScrollPos = window.pageYOffset;
//   if (prevScrollpos > currentScrollPos) {
//     searchPos.style.opacity = 1;
//     searchPos.style.visibility = "visible";
//     content.style.marginTop = "169px";
//   } else {
//     searchPos.style.opacity = 0;
//     searchPos.style.visibility = "hidden";
//     content.style.marginTop = "72px";
//   }
//   prevScrollpos = currentScrollPos;
// },
// {passive: true});

// window.onscroll = function scroll() {
//   currentScroll = window.pageYOffset;
// //   console.log(e);
//   if (!window.matchMedia("(max-width:800px)").matches) {
//     return;
//   }
// if (prevScroll > currentScroll) {
//   console.log("scroll down");
//   searchPos.classList.remove("section-search--hide");
//   content.classList.remove("content--upscroll");
// prevScroll = currentScroll;
// }else if( prevScroll === currentScroll){
//     return
// } else {
//   console.log("sroll up");
//   searchPos.classList.add("section-search--hide");
//   content.classList.add("content--upscroll");
// console.log(" current scroll  ", currentScroll);
// console.log(" previous scroll  ", prevScroll);
// console.log(currentScroll - prevScroll);
// prevScroll = currentScroll;
//   }
//   prevScroll = currentScroll;

// //   console.log(" current scroll  ", currentScroll);
// //   console.log(" previous scroll  ", prevScroll);
// }

//   console.log('pager offset y', searchPos.getBoundingClientRect().top);
// console.log('pager offset y footer', footer.getBoundingClientRect().top);
// if(footer.getBoundingClientRect().top <= searchPos.getBoundingClientRect().top + 208){
// console.log('footer pass search')
// searchPos.classList.add("section-search--hide");
// }
// else{
//     searchPos.classList.remove("section-search--hide");
// }
