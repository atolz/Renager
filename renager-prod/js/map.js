const mapText = document.querySelector(".map");
const mapContainer = document.querySelector(".content__map");
const mapDivElement = document.getElementById("map");

let map;
let infobox;
let renagerMarkers = [];
let infoboxes = [];
let detailboxes = [];
let activeDetailbox = null;
let shownProperties = [];
const loadDiv = document.createElement("div");
const searchText = document.createElement("div");
searchText.className = "map-zoom-search";
searchText.innerHTML = `Search as you zoom`;
loadDiv.className = "map-load-indicator";
loadDiv.innerHTML = `  
<div class="loader loader--map">
<div class="loader__icon loader__icon--1">&nbsp;</div>
<div class="loader__icon loader__icon--2">&nbsp;</div>
<div class="loader__icon loader__icon--3">&nbsp;</div>
</div>`;

//create renager markers
const createRenagerMarkers = function (location, name) {
  let marker = new google.maps.Marker({
    position: location,
    map: map,
    title: name,
    icon: "/img/svg/map-marker.svg",
  });
  renagerMarkers.push(marker);
};

//call setMap() on all renagermarkers passing the map or a null to toggle on or off i.e to close or open a marker
const toggleSetMapOnAll = function (map) {
  for (let i = 0; i < renagerMarkers.length; i++) {
    renagerMarkers[i].setMap(map);
  }
};

const clearMarkers = function () {
  toggleSetMapOnAll(null);
  renagerMarkers = [];
};

const hideMarkers = function () {
  console.log("hidding markers");
  toggleSetMapOnAll(null);
};

const showMarkers = function () {
  console.log("showing marker");
  toggleSetMapOnAll(map);
};

const createInfoboxes = function (index, marker, price, location) {
  //create infobox html
  const infodiv = document.createElement("div");
  infodiv.className = "info-box";
  infodiv.innerHTML = `
    <h4 class="heading-4">&#8358;${price}<h4>
    <p class="paragraph-1 mb-zero">${location}<p>
  `;
  //set infobox options
  const infoBoxOptions = {
    content: infodiv,
    // disableAutoPan: true,
    pixelOffset: new google.maps.Size(-58, -75),
    boxStyle: {
      minWidth: "1rem",
      width: "auto",
    },
    closeBoxURL: "",
    isHidden: false,
    pane: "floatPane",
    //   pane: "mapPane",
    enableEventPropagation: false,
  };
  let infobox = new InfoBox(infoBoxOptions);
  infobox.open(map, marker);
  infodiv.addEventListener("click", () => {
    if (activeDetailbox) {
      console.log("active details box");
      activeDetailbox.close();
    }
    console.log(index);
    detailboxes[index].open(map, marker);
    activeDetailbox = detailboxes[index];
    console.log("im fucking listening");
  });

  infoboxes.push(infobox);
};

const clearInfoboxes = function () {
  for (let i = 0; i < infoboxes.length; i++) {
    infoboxes[i].close();
  }
  infoboxes = [];
};
const showInfoboxes = function () {
  for (let i = 0; i < infoboxes.length; i++) {
    infoboxes[i].open(map, renagerMarkers[i]);
  }
  // infoboxes = [];
};

const createDetailboxes = function (content) {
  const propertyHtml = document.createElement("div");
  propertyHtml.className = "property-map";
  console.log('content////88',content)
  // propertyHtml.innerHTML = content;
  propertyHtml.appendChild(content);
  // setUpCarouselControl(propertyHtml);
  const InfoDetailsOptions = {
    content: propertyHtml,
    // disableAutoPan: true,
    pixelOffset: new google.maps.Size(-80, -75),
    infoBoxClearance: new google.maps.Size(50, 50),
    closeBoxURL: "",
    isHidden: false,
    pane: "floatPane",
    //   pane: "mapPane",
    enableEventPropagation: false,
  };
  let detailBox = new InfoBox(InfoDetailsOptions);
  detailboxes.push(detailBox);
};

const clearDetailboxes = function () {
  for (let i = 0; i < detailboxes.length; i++) {
    detailboxes[i].close();
  }
  detailboxes = [];
};

const getUserLocation = () => {
  if (!navigator.geolocation) {
    console.log("your browser does not support the geoloaction serviece");
    map.setCenter(new google.maps.LatLng(6.465422, 3.406448));
    return;
  }

  function errorCall() {
    console.log(
      "there was a problem gettinh your current location ,probablu due to bad internet or you rejected navigator api"
    );
    // map.setCenter(new google.maps.LatLng(8.150151178645409, 4.711589813232423));
    map.setZoom(6);
  }

  const options = {
    maximumAge: 0,
    enableHighAccuracy: true,
  };

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      console.log("getting your location");
      const coords = pos.coords;
      console.log(pos);
      console.log(coords);
      // map.setCenter(new google.maps.LatLng(coords.latitude, coords.longitude));
      map.setCenter({ lat: 6.465422, lng: 3.406448 });
      console.log(map.getCenter().lat());
      map.setZoom(14);
    },
    errorCall,
    options
  );
};

const closeMapInfoDetails = (infobox) => {
  infobox.close();
};


const initMap = function () {
  function closeControl(closeDiv, map) {
    const closeUI = document.createElement("button");
    closeUI.innerHTML = "&#x2716;";
    closeUI.title = "close map";
    closeUI.className = "close-map";
    closeDiv.appendChild(closeUI);
    closeDiv.addEventListener("click", () => {
      mapContainer.style.display = "none";
      console.log("in close div");
    });
  }

  function createLoadControl(map) {
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(searchText);
    let zooming = false;
    setInterval(() => {
      if (!zooming) return;
      if (activeDetailbox) {
        activeDetailbox.close();
      }
      // map.controls[google.maps.ControlPosition.TOP_CENTER].pop(searchText);
      // map.controls[google.maps.ControlPosition.TOP_CENTER].push(loadDiv);
      console.log("shotrl check if ara is empty....");

      setUpAllOverlays();
      zooming = false;
    }, 2000);
    google.maps.event.addListener(map, "zoom_changed", () => {
      console.log("to show indicator");
      console.log("current map bound", map.getBounds());
      console.log("getNorthEast()", map.getBounds().getNorthEast());
      console.log("getSouthWest()", map.getBounds().getSouthWest());
      console.log(
        "getSouthWest()Latitude",
        map.getBounds().getSouthWest().lat()
      );
      console.log(
        "getSouthWest() Longitued",
        map.getBounds().getSouthWest().lng()
      );
      console.log(
        "[6.460763, 3.458869] is in bounds????",
        map.getBounds().contains({ lat: 6.465422, lng: 3.406448 })
      );

      zooming = true;
    });
  }
  google.maps.visualRefresh = true;

  const mapOptions = {
    center: new google.maps.LatLng(6.42926, 3.422355),
    // center: { lat: 6.465422, lng: 3.406448 },
    zoom: 8,
    gestureHandling: "greedy",
    // mapTypeControl: false,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, "new_renager_map_style"],
    },
    fullscreenControl: false,
    streetViewControl: false,
  };

  const renagerMapStyle = new google.maps.StyledMapType(
    [
      {
        featureType: "administrative",
        elementType: "all",
        stylers: [
          {
            visibility: "simplified",
          },
        ],
      },
      {
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#444444",
          },
        ],
      },
      {
        featureType: "administrative",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "simplified",
          },
        ],
      },
      {
        featureType: "administrative.country",
        elementType: "geometry.stroke",
        stylers: [
          {
            visibility: "on",
          },
        ],
      },
      {
        featureType: "administrative.province",
        elementType: "geometry.stroke",
        stylers: [
          {
            visibility: "on",
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "all",
        stylers: [
          {
            color: "#f2f2f2",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "all",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "all",
        stylers: [
          {
            saturation: -100,
          },
          {
            lightness: 45,
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "all",
        stylers: [
          {
            visibility: "on",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "labels",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "all",
        stylers: [
          {
            color: "#46bcec",
          },
          {
            visibility: "on",
          },
        ],
      },
    ],
    { name: "RenagerMap" }
  );

  //   const renagerStyledMap = new google.maps.StyledMapType(renagerMapStyle);
  const newMapOptions = {
    center: new google.maps.LatLng(6.460763, 3.458869),
    zoom: 14,
    // disableDefaultUI: true
  };

  const boundAvailable = function(){
    let mapOk =  map.getBounds();
    if(mapOk){
      setUpAllOverlays();
      console.log(map.getBounds());
      console.log('creating map...map is defined')
      console.log('get bounds', map)
      console.log('get bounds', map.getBounds())
    }else{
      console.log('rechicing bounds...????????')
      setTimeout(boundAvailable, 500);
    }
  }

//   var check_bounds = function(){
//     var ok = true;
//     if (map.getBounds() === undefined)
//         ok = false;
//     if (!ok) {
//       console.log('rechicing bounds...????????')
//       setTimeout(check_bounds, 500);
//     }
//     else {
//          //ok to query bounds here
//          setUpAllOverlays();
//          console.log(map.getBounds());
//          console.log('creating map...map is defined')
//          console.log('get bounds', map)
//          console.log('get bounds', map.getBounds())
//     }   
// }

map = new google.maps.Map(mapDivElement, mapOptions);
map.mapTypes.set("new_renager_map_style", renagerMapStyle);
map.setMapTypeId("new_renager_map_style");
map.setOptions(newMapOptions);
console.log("map center is ", map.getCenter().lat());
// createPropertiesMarker();
const closeDiv = document.createElement("div");
closeControl(closeDiv, map);
createLoadControl(map);
map.controls[google.maps.ControlPosition.TOP_RIGHT].push(closeDiv);
boundAvailable();




  // getUserLocation();
  // setTimeout(() => {
  //   map.setZoom(14);
  //   map.setCenter({ lat: 6.460763, lng:3.458869});
  // }, 2000);
  google.maps.event.addListener(map, "click", () => {
    if (activeDetailbox) {
      activeDetailbox.close();
    }
  });
};

google.maps.event.addDomListener(window, "load", initMap);

//mapContainer func

let setUp = false;
mapText.addEventListener("click", () => {
  setUp = !setUp;
  mapContainer.style.display = "flex";
  console.log("in map text");
  setUp? setUpAllOverlays(): '';
});

mapContainer.addEventListener("click", () => {
  mapContainer.style.display = "none";
});

mapDivElement.addEventListener("click", (e) => {
  e.stopPropagation();
});

function gProperties() {
  let properties;
  async function getProperties() {
    const url = "/db/properties.json";
    const res = await (await fetch(url)).json();
    properties = res;
    console.log("testing properties new", properties);
  }
}

gProperties();

async function getProperties() {
  const url = "/db/properties.json";
  const res = await (await fetch(url)).json();
  return res;
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

function setUpCarouselControl(property) {
  console.log("setting up controller carousel");
  const prevButton = property.querySelector(".carousel__control--left");
  const likeButton = property.querySelector(".property__like");
  const nextButton = property.querySelector(".carousel__control--right");
  const carousel__container = property.querySelector(".carousel__container");
  const carousel__nav = property.querySelector(".carousel__nav");
  const dots = Array.from(carousel__nav.children);
  const carousel__imgs = Array.from(carousel__container.children);
  console.log(carousel__imgs);

    const img__width = carousel__imgs[0].getBoundingClientRect().width; //always returns 0
    console.log("setting image position", img__width);
  //set img positions next to one another
  const setImgPos = (img, index) => {
    img.style.left = 280 * index + "px";
    console.log("setting image position...../////", img.style.left);
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

  //like functionality
  likeButton.addEventListener("click", (e) => {
    console.log("like button clicked", likeButton.classList);
    likeButton.classList.toggle("property__like--active");
  });

  //nextButton functionality
  console.log("b4 nest burrron click");
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
    console.log("prev button clicked");
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
}

async function createPropertiesMarker() {
  // console.log(getProperties());
  const properties = await getProperties();
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
    const propertyHtml = document.createElement("div");
    propertyHtml.className = "property-map";
    propertyHtml.innerHTML = propertyHtmlSegment;
    setUpCarouselControl(propertyHtml);
    console.log("in create property marker");
    // console.log(propertyHtmlSegment);
    let lat = property.cord[0];
    let lng = property.cord[1];
    console.log(property.cord[0], property.cord[1]);
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: map,
      title: property.name,
      icon: "/img/svg/map-marker.svg",
    });

    // map.setCenter({ lat: 9.062503, lng: 7.468820});
    console.log("in property marker testing", map.getCenter().lat());

    const infodiv = document.createElement("div");
    infodiv.className = "info-box";
    infodiv.innerHTML = `
    <h4 class="heading-4">&#8358;${property.price}<h4>
    <p class="paragraph-1 mb-zero">${property.location}<p>
  `;
    const InfoBoxOptions = {
      position: new google.maps.LatLng(lat, lng),
      // position: { lat: property.cord[0], lng: property.cord[1] },
      content: infodiv,
      // disableAutoPan: true,
      pixelOffset: new google.maps.Size(-58, -75),
      boxStyle: {
        minWidth: "1rem",
        width: "auto",
      },
      closeBoxURL: "",
      isHidden: false,
      pane: "floatPane",
      //   pane: "mapPane",
      enableEventPropagation: false,
    };
    const infodivDetails = document.createElement("div");
    infodivDetails.className = "property-map";
    // infodivDetails.innerHTML = propertyHtmlSegment;

    const InfoDetailsOptions = {
      content: propertyHtml,
      // disableAutoPan: true,
      pixelOffset: new google.maps.Size(-80, -75),
      infoBoxClearance: new google.maps.Size(140, 150),
      closeBoxURL: "",
      isHidden: false,
      pane: "floatPane",
      //   pane: "mapPane",
      enableEventPropagation: false,
    };
    infobox = new InfoBox(InfoBoxOptions);
    const infoboxDetails = new InfoBox(InfoDetailsOptions);
    infobox.open(map);
    map.active_window = false;

    infodiv.addEventListener("click", () => {
      if (map.active_window) {
        map.active_window.infobox.close(map, map.active_window.marker);
      }
      infoboxDetails.open(map, marker);
      map.active_window = { infobox: infoboxDetails, marker: marker };
      console.log("ingo scliefdjlkjlk");
      google.maps.event.addListener(map, "click", function (event) {
        // close the infobox
        infoboxDetails.close(map, marker);
        // clear opened_box property
        map.active_window = false;
      });
      google.maps.event.addListener(map, "zoom_changed", function (event) {
        // close the infobox
        infoboxDetails.close(map, marker);
        // infobox.close(map, marker);
        // setTimeout(() => {
        //   infobox.open(map, marker);
        // }, 1500);
        // clear opened_box property
        map.active_window = false;
      });
    });

    infodivDetails.addEventListener("mouseleave", () => {
      //   infoboxDetails.close();
      console.log("mouseout");
    });
  });
}

const buildPropertyHtmlSegment = function (property) {
  let propertyDIv = document.createElement('div');
  propertyDIv.className = 'property';
  let propertyHtmlSegment = `
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
  `;
  propertyDIv.innerHTML = propertyHtmlSegment;
  setUpCarouselControl(propertyDIv);
  return propertyDIv;
};

const filterProperties = function (properties) {
  const filterProperties = properties.filter((property) => {
    let lat = property.cord[0];
    let lng = property.cord[1];
    if (map.getBounds().contains({ lat: lat, lng: lng })) return property;
  });
  return filterProperties;
};

async function setUpAllOverlays() {
  console.log('should pop search control noeeewww')
  map.controls[google.maps.ControlPosition.TOP_CENTER].pop(searchText);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(loadDiv);

  const properties = await getProperties();
  shownProperties = filterProperties(properties);

  setTimeout(() => { 

    clearMarkers();
    clearInfoboxes();
    clearDetailboxes(); 

    if (shownProperties.length < 1) {
      console.log("no prop found hhhh.....");
      searchText.innerHTML = `No properties in this area`;
      map.controls[google.maps.ControlPosition.TOP_CENTER].pop(loadDiv);
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(searchText);
      return
    } else {
      searchText.innerHTML = `Search as you zoom`;
      map.controls[google.maps.ControlPosition.TOP_CENTER].pop(loadDiv);
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(searchText);
    }
  
    shownProperties.forEach((property, index) => {
      const content = buildPropertyHtmlSegment(property);
      console.log(property.name);
      let lat = property.cord[0];
      let lng = property.cord[1];
      let location = new google.maps.LatLng(lat, lng);
      createRenagerMarkers(location, property.name);
      createInfoboxes(
        index,
        renagerMarkers[index],
        property.price,
        property.location
      );
      createDetailboxes(content);
    });
  }, 1800);
 
}


// export {map};
// console.log(shownProperties);
// console.log("current map bound", map.getBounds());
// console.log("getNorthEast()", map.getBounds().getNorthEast());
// console.log("getSouthWest()", map.getBounds().getSouthWest());
// console.log("getNorthEast()Latitude", map.getBounds().getNorthEast().lat());
// console.log("getNorthEast() Longitued", map.getBounds().getNorthEast().lng());
// console.log("getSouthWest()Latitude", map.getBounds().getSouthWest().lat());
// console.log("getSouthWest() Longitued", map.getBounds().getSouthWest().lng());
// console.log(
//   "[6.460763, 3.458869] is in bounds????",
//   map.getBounds().contains({ lat: 6.460763, lng: 3.458869 })
// );