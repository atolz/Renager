// import {map} from './map.js'

const contentProperties = document.querySelector(".content__properties");
const loader = contentProperties.previousElementSibling;
const popUpBg = document.querySelector(".more-popup__bg");
const searchTab = document.querySelector(".section-search");
const closeBg = document.querySelector('.bg-white');

const filter = document.querySelector(".filter");
// const filterPills = filter.querySelectorAll(".filter__pill");
const filterPills = Array.from(filter.children).slice(0, -2);
// console.log(filterPills);

const typeBox = filter.querySelector(".type-box");
const filterPillType = filter.querySelector(".filter__type");
// console.log(filterPillType);

const bbBox = filter.querySelector(".bb-box");
const filterPillBb = filter.querySelector(".filter__bb");

const filterPillPrice = filter.querySelector(".filter__price");
const priceBox = filter.querySelector(".price-box");
const sliderMaxPrice = priceBox.querySelector(".slider__input--max");
const sliderMinPrice = priceBox.querySelector(".slider__input--min");
const trackPrice = priceBox.querySelector(".slider__track-container");
const priceMax = priceBox.querySelector(".slider__value--max");
const priceMin = priceBox.querySelector(".slider__value--min");

const popupBox = document.querySelector(".more-popup__box");
const sliderMaxLand = popupBox.querySelector(".slider__input--max");
const sliderMinLand = popupBox.querySelector(".slider__input--min");
const trackLand = popupBox.querySelector(".slider__track-container");
const areaMin = popupBox.querySelector(".slider__value--min");
const areaMax = popupBox.querySelector(".slider__value--max");
const doneMore = popupBox.querySelector(".btn-primary");

const moreFilter = filter.querySelector(".filter__pill--more");
// console.log(moreFilter);
const popup = document.querySelector(".more-popup__bg");
// console.log(popup)

moreFilter.addEventListener("click", ()=>{
    console.log('more filter clicked')
    console.log(popup)
    popup.classList.toggle("more-popup__bg--show");
})

// popup.addEventListener("click", ()=>{
//     popup.classList.remove("more-popup__bg--show");
// })

popupBox.addEventListener("click", (e) => {
  console.log("popup box event listener");
  e.stopPropagation();
  const moreFilter = e.target.closest(".filter-box");
  const done = e.target.closest(".btn-primary");
  const clear = e.target.closest(".link-1");
  const filterPillMore = filter.querySelector(".filter__pill--more");
  console.log(done);
  console.log("teste 333");
  console.log(moreFilter);

  if (clear) {
    sliderMaxLand.value = sliderMaxLand.defaultValue;
    sliderMinLand.value = sliderMinLand.defaultValue;
    trackLand.style.padding ="0";
    areaMax.innerHTML = sliderMaxLand.value;
    areaMin.innerHTML = sliderMinLand.value;

    const moreFiltersSelected = popupBox.querySelectorAll(
      ".filter-box--selected"
    );
    moreFiltersSelected.forEach((filter, index) => {
      filter.classList.remove("filter-box--selected");
    });
    filterPillMore.classList.remove("filter__pill--selected","filter__pill--active");
    return;
  }

  if (done) {
    console.log("dtest 444");
    console.log(filterPillMore);
    e.stopPropagation();
    const moreFilterIsActive = popupBox.querySelector(".filter-box--selected");

    setTimeout(()=>{
      contentProperties.classList.remove("display-none");
      loader.classList.add("display-none");
      searchTab.style.opacity = "1";
      searchTab.style.visibility = "visible";
    }, 2000);
    
    if (moreFilterIsActive) {
      console.log("filter more is active");
      filterPillMore.classList.add("filter__pill--selected");
      filterPillMore.classList.remove("filter__pill--active");
      window.scrollTo(0, 0)
      contentProperties.classList.add("display-none");
      loader.classList.remove("display-none");
    } else {
      console.log("filter more is not active");
      console.log(moreFilterIsActive);
      filterPillMore.classList.remove("filter__pill--selected","filter__pill--active");
    }


    if(sliderMaxLand.defaultValue !== sliderMaxLand.value || sliderMinLand.defaultValue !== sliderMinLand.value){
      filterPillMore.classList.add("filter__pill--selected");
      filterPillMore.classList.remove("filter__pill--active");
      window.scrollTo(0, 0)
      contentProperties.classList.add("display-none");
      loader.classList.remove("display-none");
    }

    popup.classList.remove("more-popup__bg--show");
    return;
  }
  if (!moreFilter) return;

  console.log("b4 moreFIlter event listener");

  console.log(moreFilter);
  moreFilter.classList.toggle("filter-box--selected");

  console.log("after moreFIlter event listener");
});

typeBox.addEventListener("click", (e) => {
  e.stopPropagation();
  const filterTypeBox = e.target.closest(".filter-box");
  if (!filterTypeBox) return;
  const filterText = filterTypeBox.children[0];
  filterTypeBox.classList.toggle("filter-box--selected");
  filterText.classList.toggle("filter__text--active");
});

bbBox.addEventListener("click", (e) => {
  e.stopPropagation();
  const bbNumber = e.target.closest(".property-nav__number");
  if (!bbNumber) return;
  console.log("test 555");
  bbNumber.classList.toggle("property-nav__number-active");
});

filterPills.forEach((filterPill, index) => {
  // console.log(filterPill);
  const dropDown = filterPill.querySelector(".drop-down");
  const done = filterPill.querySelector(".btn-primary");
  const clear = dropDown.querySelector(".link-1");
  // console.log(clear);

  clear.addEventListener('click', (e)=>{
    e.stopPropagation();
    if(filterPill.querySelector(".bb-box")){
        const activeFilters = filterPill.querySelectorAll(".property-nav__number-active");
        activeFilters.forEach((filter)=>{
            filter.classList.remove("property-nav__number-active");
        });
        filterPill.classList.remove("filter__pill--selected");
    }

    if(filterPill.querySelector(".type-box")){
        const activeFilters = filterPill.querySelectorAll(".filter-box");
        const filterText = filterPill.querySelectorAll(".filter__text--active");
        console.log(activeFilters);
        activeFilters.forEach((filter)=>{
            filter.classList.remove("filter-box--selected");
        });
        filterText.forEach((filter)=>{
            filter.classList.remove("filter__text--active");
        });
        filterPill.classList.remove("filter__pill--selected");

    }

    if(filterPill.querySelector(".price-box")){
      sliderMaxPrice.value = sliderMaxPrice.defaultValue;
      sliderMinPrice.value = sliderMinPrice.defaultValue;
      trackPrice.style.padding ="0";
      priceMax.innerHTML = sliderMaxPrice.value;
      priceMin.innerHTML = sliderMinPrice.value;
      filterPillPrice.classList.remove("filter__pill--selected");
      filterPillPrice.querySelector(".filter__text").classList.remove("filter__text--active");
    }
  });

  dropDown.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  done.addEventListener("click", (e) => {
    e.stopPropagation();
    const typesIsActive = filterPill.querySelector(".filter-box--selected");
    const bbIsActive = filterPill.querySelector(".property-nav__number-active");

    e.stopPropagation();
    console.log("test 3");
    filterPill.classList.toggle("filter__pill--active");
    dropDown.classList.toggle("drop-down--active");
    //close transparent bg
    closeBg.style.visibility = 'hidden';
    closeBg.style.opacity = '0';
    

    setTimeout(()=>{
      contentProperties.classList.remove("display-none");
      loader.classList.add("display-none");
      searchTab.style.opacity = "1";
      searchTab.style.visibility = "visible";
    }, 2000);

    if(filterPill.querySelector(".type-box")){
      if (typesIsActive) {
        console.log("type is active");
        console.log(typesIsActive);
        filterPillType.classList.add("filter__pill--selected");
        window.scrollTo(0, 0)
        contentProperties.classList.add("display-none");
        loader.classList.remove("display-none");
      } else {
        filterPillType.classList.remove("filter__pill--selected");
        console.log("types filter not activee");
      }
    }

    if(filterPill.querySelector(".bb-box")){
      if (bbIsActive) {
        filterPillBb.classList.add("filter__pill--selected");
        console.log("bb is active");
        window.scrollTo(0, 0)
        contentProperties.classList.add("display-none");
        loader.classList.remove("display-none");
      } else {
        filterPillBb.classList.remove("filter__pill--selected");
        console.log("bb is noot active");
      }
    }

    if(filterPill.querySelector(".price-box")){
      console.log("filter pill test in if");
      if(sliderMaxPrice.defaultValue !== sliderMaxPrice.value || sliderMinPrice.defaultValue !== sliderMinPrice.value){
        filterPillPrice.classList.add("filter__pill--selected");
        filterPillPrice.querySelector(".filter__text").classList.add("filter__text--active");
        window.scrollTo(0, 0)
        contentProperties.classList.add("display-none");
        loader.classList.remove("display-none");
        console.log('price is accidksktive')
      }else{
        filterPillPrice.classList.remove("filter__pill--selected");
        filterPillPrice.querySelector(".filter__text").classList.remove("filter__text--active");
      }
    }

  });

  //toggle dropdown on click
  filterPill.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log(filterPill);
    console.log("test 2");
    filterPill.classList.add("filter__pill--active");
    dropDown.classList.add("drop-down--active");
    closeBg.style.visibility = 'visible';
    closeBg.style.opacity = '1';
  });

  closeBg.addEventListener('click', ()=>{
    filterPill.classList.remove("filter__pill--active");
    dropDown.classList.remove("drop-down--active");
    closeBg.style.visibility = 'hidden';
    closeBg.style.opacity = '0';
  })
});

// console.log(filter);

console.log('just b4 like brn')
// setTimeout(() => {
//   const properties2 = Array.from(contentProperties.children);
//   console.log('like button clicked')
//   properties2.forEach((property, index) => {
//     // e.stopPropagation();
//     console.log('like button clicked inside 4each')
//     const likeButton = property.querySelector(".property__like");
//     likeButton.addEventListener("click", (e) => {
//       console.log(likeButton.classList);
//       likeButton.classList.toggle("property__like--active");
//     });
//   }); 
// }, 1000);


