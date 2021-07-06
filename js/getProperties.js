console.log("get preopereties loader");
// const contentProperties = document.querySelector(".content__properties");
// const loader = contentProperties.previousElementSibling;

async function getProperties() {
  const url = "/db/properties.json";
  try {
    const properties = await (await fetch(url)).json();
    return properties;
  } catch (error) {
    console.log("there was an error ", (await fetch(url)).status);
    console.log(error);
    return "there was an error";
  }
}

function renderNavBtn(imgs) {
  let navsHtml = "";
  imgs.forEach((img, index) => {
    let navHtmlSegment = "";
    if (index == 0) {
      navHtmlSegment += `
      <button class="carousel__nav-button carousel__nav-button--active"></button>
        `;
    } else {
      navHtmlSegment += `
      <button class="carousel__nav-button"></button>
          `;
    }
    navsHtml += navHtmlSegment;
  });

  //   console.log(navsHtml);
  return navsHtml;
}
function renderImgs(imgs) {
  let imgsHtml = "";
  imgs.forEach((img, index) => {
    let imgHtmlSegment = "";
    if (index == 0) {
      imgHtmlSegment += `
        <img src="img/${img}" alt="img" class="carousel__img carousel__img--current">
        `;
    } else {
      imgHtmlSegment += `
          <img src="img/${img}" alt="img" class="carousel__img">
          `;
    }
    imgsHtml += imgHtmlSegment;
  });
  //   console.log(imgsHtml);
  return imgsHtml;
}

function renderRooms(roomsArr) {
  let rooms = "";
  roomsArr.forEach((room) => {
    rooms += room += " ";
  });
  //   console.log(rooms);
  return rooms;
}

function setUpLike(properties2){
  const properties = Array.from(properties2.children);
  console.log('like button clicked')
  properties.forEach((property, index) => {
    // e.stopPropagation();
    console.log('like button clicked inside 4each')
    const likeButton = property.querySelector(".property__like");
    likeButton.addEventListener("click", (e) => {
      console.log(likeButton.classList);
      likeButton.classList.toggle("property__like--active");
    });
  }); 
}

function setUpCarouselControl2(propertiesCont){
    //loop for each carousel --needed caz wont work on one
    const properties = Array.from(propertiesCont.children);
    console.log(document.querySelector('.property'));
    console.log(properties);
    console.log('in carousel contreller');
    properties.forEach((property, index) => {
      //varibles needed
      const prevButton = property.querySelector(".carousel__control--left");
      const nextButton = property.querySelector(".carousel__control--right");
      const carousel__container = property.querySelector(".carousel__container");
      const carousel__nav = property.querySelector(".carousel__nav");
      const dots = Array.from(carousel__nav.children);
      const carousel__imgs = Array.from(carousel__container.children);
    
    
     const img__width = carousel__imgs[0].getBoundingClientRect().width;
    
      //set img positions next to one another
      const setImgPos = (img, index) => {
        img.style.left = img__width * index + "px";
        
      };
      carousel__imgs.forEach(setImgPos);
    
      //move to slide
      const moveToImg = (currentImg, targetImg, carousel__container) => {
        carousel__container.style.transform =
          "translateX(-" + targetImg.style.left + ")";
        currentImg.classList.remove("carousel__img--current");
        targetImg.classList.add("carousel__img--current");
      };
    
      const updateDot = (currentDot, targetDot) => {
        currentDot.classList.remove("carousel__nav-button--active");
        targetDot.classList.add("carousel__nav-button--active");
      };
    
      const hideShowControllers = (targetIndex, dots) => {
        if (targetIndex === 0) {
          console.log("test 1");
          prevButton.classList.add("display-none");
          nextButton.classList.remove("display-none");
          return;
        }
        if (targetIndex === dots.length - 1) {
          console.log("test 2");
          nextButton.classList.add("display-none");
          prevButton.classList.remove("display-none");
          return;
        } else {
          console.log("test 3");
          nextButton.classList.remove("display-none");
          prevButton.classList.remove("display-none");
        }
      };
    
      const checkLastFirstImg = (
        currentImg,
        checkImg,
        targetImg,
        currentDot,
        targetDot
      ) => {
          console.log("test for last");
          moveToImg(checkImg, targetImg, carousel__container);
          updateDot(currentDot, targetDot);
      };
    
      //nextButton functionality
      console.log('b4 nest burrron click');
      nextButton.addEventListener("click", () => {
        console.log("naext button clicked");
        const currentImg = carousel__container.querySelector(
          ".carousel__img--current"
        );
        const nextImg = currentImg.nextElementSibling;
        const currentDot = carousel__nav.querySelector(
          ".carousel__nav-button--active"
        );
        const nextImgIndex = carousel__imgs.findIndex((img) => img === nextImg);
        const targetDot = dots[nextImgIndex];
    
        const lastImg = carousel__imgs[carousel__imgs.length - 1];
        const firstImg = carousel__imgs[0];
        const firstDot = dots[0];
    
        if (currentImg === lastImg) {
          checkLastFirstImg(currentImg, lastImg, firstImg, currentDot, firstDot);
          return;
        }
    
        moveToImg(currentImg, nextImg, carousel__container);
        updateDot(currentDot, targetDot);
    
        // hideShowControllers(nextImgIndex, dots);
      });
    
      //prevButton functionality
      prevButton.addEventListener("click", () => {
        const currentImg = carousel__container.querySelector(
          ".carousel__img--current"
        );
        const prevImg = currentImg.previousElementSibling;
        const currentDot = carousel__nav.querySelector(
          ".carousel__nav-button--active"
        );
        const prevImgIndex = carousel__imgs.findIndex((img) => img === prevImg);
        const targetDot = dots[prevImgIndex];
    
        const lastImg = carousel__imgs[carousel__imgs.length - 1];
        const firstImg = carousel__imgs[0];
        lastDot = dots[dots.length - 1];
    
        if (currentImg === firstImg) {
          checkLastFirstImg(currentImg, firstImg, lastImg, currentDot, lastDot);
          return;
        }
    
        moveToImg(currentImg, prevImg, carousel__container);
        updateDot(currentDot, targetDot);
    
        // hideShowControllers(prevImgIndex, dots);
      });
    
      //   console.log(dots);
    
      //nav__buttons functionality
      carousel__nav.addEventListener("click", (e) => {
        const currentDot = carousel__nav.querySelector(
          ".carousel__nav-button--active"
        );
        const targetDot = e.target.closest("button");
    
        if (!targetDot) return;
    
        const currentImg = carousel__container.querySelector(
          ".carousel__img--current"
        );
        const targetDotIndex = dots.findIndex((dot) => dot === targetDot);
        const nextImg = carousel__imgs[targetDotIndex];
    
        moveToImg(currentImg, nextImg, carousel__container);
        updateDot(currentDot, targetDot);
        // hideShowControllers(targetDotIndex, dots);
      });
    });
}

async function renderProperties() {
  let properties = await getProperties();
  let propertiesHtml = "";
  // const filteredProperties = filterProperties(properties);

  // contentProperties.classList.remove("display-none");
  // loader.classList.add("display-none");
  properties.forEach((property) => {
    let propertyHtmlSegment = `
      <div class="property">
      <div class="carousel property__picture">
          <div class="carousel__container">
            ${renderImgs(property.imgs)}
          </div>
          <button class="carousel__control carousel__control--left">
              <svg class="carousel__icon">
                  <use xlink:href="/img/sprite.svg#icon-arr-left"></use>
              </svg>
          </button>
          <button class="carousel__control carousel__control--right">
              <svg class="carousel__icon">
                  <use xlink:href="img/sprite.svg#icon-arr-right"></use>
              </svg>
          </button>

          <div class="carousel__nav">
          ${renderNavBtn(property.imgs)}
          </div>
      </div>
    <svg class="property__like">
      <use xlink:href="/img/sprite.svg#icon-like"></use>
    </svg>
    <div class="property__highlight">
      <span>${property.type[0]}</span>
      <span>${property.type[1]}</span>
    </div>
    <h4 class="heading-4 property__name">
      ${property.name}
      <p class="property__location">${property.location}</p>
    </h4>
    <p class="property__price">&#8358;${property.price}</p>
    <div class="property__rooms">${renderRooms(property.rooms)}</div>
  </div>
      `;
    propertiesHtml += propertyHtmlSegment;
  });
  let containerProperties = document.querySelector(".content__properties");
  containerProperties.innerHTML = propertiesHtml;
  setUpCarouselControl2(containerProperties);
  setUpLike(containerProperties)

}

renderProperties();
// const isLoaded = ()=>{
//   let mapLoaded = map;
  
//   if(mapLoaded){
//     renderProperties();
//     google.maps.event.addListener(map, "zoom_changed", () => {
//       console.log("in the fucking indes.js amd im listenening------;;;'''''");
//       renderProperties();
//     });
//   }
//   else{
//     contentProperties.classList.add("display-none");
//     loader.classList.remove("display-none");
//     console.log('mpa non available... retrhyubg');   
//     setTimeout(isLoaded, 500);
//   }

// }

// isLoaded();


// const isLoaded = ()=>{
//   let mapLoaded = map;
  
//   if(mapLoaded){
//     console.log('map loaded,,,,,;', mapLoaded)
//     console.log("in the fucking indes.js amd im listenening------;;;'''''", google.maps);
//     google.maps.event.addListener(map, "zoom_changed", () => {
//       console.log("in the fucking indes.js amd im listenening------;;;'''''");
//     });
//   }
//   else{
//     contentProperties.classList.add("display-none");
//     loader.classList.remove("display-none");
//     console.log('mpa non available... retrhyubg');   
//     setTimeout(isLoaded, 500);
//   }

// }

// isLoaded();