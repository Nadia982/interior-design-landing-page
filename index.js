// Navigation
function toggleMenu() {
    const toggleMenu = document.querySelector(".toggleMenu");
    const navigation = document.querySelector(".navigation");
    toggleMenu.classList.toggle("active");
    navigation.classList.toggle("active");
}

// End navigation

// Swiper
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 20,
    //   autoplay: {
    //     delay: 2500,
    //     disableOnInteraction: true,
    //   },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        800: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      },
    });

// End swiper