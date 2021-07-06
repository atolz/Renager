
// setTimeout(() => {
//   //loop for each carousel --needed caz wont work on one
//   const content__properties = document.querySelector(".content__properties");
//   const properties = Array.from(content__properties.children);
//   console.log(document.querySelector('.property'));
//   console.log(properties);
//   console.log('in carousel contreller');
//   properties.forEach((property, index) => {
//     //varibles needed
//     const prevButton = property.querySelector(".carousel__control--left");
//     const nextButton = property.querySelector(".carousel__control--right");
//     const carousel__container = property.querySelector(".carousel__container");
//     const carousel__nav = property.querySelector(".carousel__nav");
//     const dots = Array.from(carousel__nav.children);
//     const carousel__imgs = Array.from(carousel__container.children);
  
  
//    const img__width = carousel__imgs[0].getBoundingClientRect().width;
  
//     //set img positions next to one another
//     const setImgPos = (img, index) => {
//       img.style.left = img__width * index + "px";
//     };
//     carousel__imgs.forEach(setImgPos);
  
//     //move to slide
//     const moveToImg = (currentImg, targetImg, carousel__container) => {
//       carousel__container.style.transform =
//         "translateX(-" + targetImg.style.left + ")";
//       currentImg.classList.remove("carousel__img--current");
//       targetImg.classList.add("carousel__img--current");
//     };
  
//     const updateDot = (currentDot, targetDot) => {
//       currentDot.classList.remove("carousel__nav-button--active");
//       targetDot.classList.add("carousel__nav-button--active");
//     };
  
//     const hideShowControllers = (targetIndex, dots) => {
//       if (targetIndex === 0) {
//         console.log("test 1");
//         prevButton.classList.add("display-none");
//         nextButton.classList.remove("display-none");
//         return;
//       }
//       if (targetIndex === dots.length - 1) {
//         console.log("test 2");
//         nextButton.classList.add("display-none");
//         prevButton.classList.remove("display-none");
//         return;
//       } else {
//         console.log("test 3");
//         nextButton.classList.remove("display-none");
//         prevButton.classList.remove("display-none");
//       }
//     };
  
//     const checkLastFirstImg = (
//       currentImg,
//       checkImg,
//       targetImg,
//       currentDot,
//       targetDot
//     ) => {
//         console.log("test for last");
//         moveToImg(checkImg, targetImg, carousel__container);
//         updateDot(currentDot, targetDot);
//     };
  
//     //nextButton functionality
//     console.log('b4 nest burrron click');
//     nextButton.addEventListener("click", () => {
//       console.log("naext button clicked");
//       const currentImg = carousel__container.querySelector(
//         ".carousel__img--current"
//       );
//       const nextImg = currentImg.nextElementSibling;
//       const currentDot = carousel__nav.querySelector(
//         ".carousel__nav-button--active"
//       );
//       const nextImgIndex = carousel__imgs.findIndex((img) => img === nextImg);
//       const targetDot = dots[nextImgIndex];
  
//       const lastImg = carousel__imgs[carousel__imgs.length - 1];
//       const firstImg = carousel__imgs[0];
//       const firstDot = dots[0];
  
//       if (currentImg === lastImg) {
//         checkLastFirstImg(currentImg, lastImg, firstImg, currentDot, firstDot);
//         return;
//       }
  
//       moveToImg(currentImg, nextImg, carousel__container);
//       updateDot(currentDot, targetDot);
  
//       // hideShowControllers(nextImgIndex, dots);
//     });
  
//     //prevButton functionality
//     prevButton.addEventListener("click", () => {
//       const currentImg = carousel__container.querySelector(
//         ".carousel__img--current"
//       );
//       const prevImg = currentImg.previousElementSibling;
//       const currentDot = carousel__nav.querySelector(
//         ".carousel__nav-button--active"
//       );
//       const prevImgIndex = carousel__imgs.findIndex((img) => img === prevImg);
//       const targetDot = dots[prevImgIndex];
  
//       const lastImg = carousel__imgs[carousel__imgs.length - 1];
//       const firstImg = carousel__imgs[0];
//       lastDot = dots[dots.length - 1];
  
//       if (currentImg === firstImg) {
//         checkLastFirstImg(currentImg, firstImg, lastImg, currentDot, lastDot);
//         return;
//       }
  
//       moveToImg(currentImg, prevImg, carousel__container);
//       updateDot(currentDot, targetDot);
  
//       // hideShowControllers(prevImgIndex, dots);
//     });
  
//     //   console.log(dots);
  
//     //nav__buttons functionality
//     carousel__nav.addEventListener("click", (e) => {
//       const currentDot = carousel__nav.querySelector(
//         ".carousel__nav-button--active"
//       );
//       const targetDot = e.target.closest("button");
  
//       if (!targetDot) return;
  
//       const currentImg = carousel__container.querySelector(
//         ".carousel__img--current"
//       );
//       const targetDotIndex = dots.findIndex((dot) => dot === targetDot);
//       const nextImg = carousel__imgs[targetDotIndex];
  
//       moveToImg(currentImg, nextImg, carousel__container);
//       updateDot(currentDot, targetDot);
//       // hideShowControllers(targetDotIndex, dots);
//     });
//   });
// }, 1500);