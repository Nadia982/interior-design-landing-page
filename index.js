// Navigation
function toggleMenu() {
    const toggleMenu = document.querySelector(".toggleMenu");
    const navigation = document.querySelector(".navigation");
    toggleMenu.classList.toggle("active");
    navigation.classList.toggle("active");
}

// End navigation

// Swiper
    const swiper = new Swiper(".testimonial-slider", {
      slidesPerView: 1,
      spaceBetween: 20,
      autoplay: {
        delay: 2500,
        disableOnInteraction: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        800: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1000: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      },
    });

// End swiper