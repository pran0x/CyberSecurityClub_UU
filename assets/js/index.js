// Header
$(window).scroll(function () {
  var scroll = $(window).scrollTop();

  if (scroll >= 80) {
    $(".header").addClass("border-bottom");
  } else {
    $(".header").removeClass("border-bottom");
  }
});

(() => {
  $(".navbar-burger").click(() => {
    $(".navbar-links").toggleClass("navbar-active");
    $(".navbar-burger").toggleClass("navbar-burger-active");

    $(".navbar-links li").each((i, el) => {
      if (el.style.animation) {
        el.style.animation = "";
      } else {
        el.style.animation = `navbar-link-fade 0.5s ease forwards 0.2s`;
      }
    });
  });
})();

// Enhanced Slideshow with Navigation and Controls
let currentSlide = 0;
let slideInterval;
let isPlaying = true;
let slideCount = 0;
const slideDuration = 5000; // 5 seconds

$(document).ready(function() {
  initializeSlideshow();
});

function initializeSlideshow() {
  const $slideshow = $("#slideshow");
  const $slides = $slideshow.find("img");
  slideCount = $slides.length;
  
  if (slideCount === 0) return;
  
  // Hide all slides except the first one
  $slides.hide().first().show();
  
  // Add navigation elements
  addSlideshowControls();
  
  // Start automatic slideshow
  startSlideshow();
  
  // Pause on hover
  $slideshow.parent().hover(
    function() {
      pauseSlideshow();
    },
    function() {
      resumeSlideshow();
    }
  );
}

function addSlideshowControls() {
  const $slideshowContainer = $(".slideshow");
  
  // Add navigation dots
  let dotsHTML = '<div class="slideshow-dots">';
  for (let i = 0; i < slideCount; i++) {
    dotsHTML += `<div class="slideshow-dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})"></div>`;
  }
  dotsHTML += '</div>';
  $slideshowContainer.append(dotsHTML);
  
  // Add progress bar
  $slideshowContainer.append('<div class="slideshow-progress"></div>');
}

function nextSlide() {
  const $slides = $("#slideshow img");
  
  $slides.eq(currentSlide).fadeOut(800);
  currentSlide = (currentSlide + 1) % slideCount;
  $slides.eq(currentSlide).fadeIn(800);
  
  updateDots();
  resetProgress();
}

function prevSlide() {
  const $slides = $("#slideshow img");
  
  $slides.eq(currentSlide).fadeOut(800);
  currentSlide = (currentSlide - 1 + slideCount) % slideCount;
  $slides.eq(currentSlide).fadeIn(800);
  
  updateDots();
  resetProgress();
}

function goToSlide(index) {
  if (index === currentSlide) return;
  
  const $slides = $("#slideshow img");
  
  $slides.eq(currentSlide).fadeOut(600);
  currentSlide = index;
  $slides.eq(currentSlide).fadeIn(600);
  
  updateDots();
  resetProgress();
}

function updateDots() {
  $(".slideshow-dot").removeClass("active");
  $(".slideshow-dot").eq(currentSlide).addClass("active");
}

function startSlideshow() {
  slideInterval = setInterval(nextSlide, slideDuration);
  isPlaying = true;
  startProgress();
}

function pauseSlideshow() {
  clearInterval(slideInterval);
  clearInterval(progressInterval);
  isPlaying = false;
}

function resumeSlideshow() {
  if (!isPlaying) {
    startSlideshow();
  }
}

// Progress bar functionality
let progressInterval;
let progressWidth = 0;

function startProgress() {
  progressWidth = 0;
  progressInterval = setInterval(function() {
    progressWidth += (100 / (slideDuration / 100));
    if (progressWidth >= 100) {
      progressWidth = 0;
    }
    $(".slideshow-progress").css("width", progressWidth + "%");
  }, 100);
}

function resetProgress() {
  clearInterval(progressInterval);
  progressWidth = 0;
  $(".slideshow-progress").css("width", "0%");
  if (isPlaying) {
    startProgress();
  }
}

// Keyboard navigation
$(document).keydown(function(e) {
  if ($(".slideshow:hover").length > 0) {
    switch(e.which) {
      case 37: // left arrow
        prevSlide();
        break;
      case 39: // right arrow
        nextSlide();
        break;
      case 32: // spacebar
        e.preventDefault();
        if (isPlaying) {
          pauseSlideshow();
        } else {
          resumeSlideshow();
        }
        break;
    }
  }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

$(".slideshow").on("touchstart", function(e) {
  touchStartX = e.changedTouches[0].screenX;
});

$(".slideshow").on("touchend", function(e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
}

//Dark Light Toggle - REMOVED

// window.addEventListener('scroll', function() {
//   document.body.style.backgroundPositionY = -window.pageYOffset/8 + "px";
// });

// Sticky Secondary Navbar
$(document).ready(function() {
  const secondaryHeader = $('.secondary-header');
  let isSticky = false;
  
  $(window).scroll(function() {
    const scroll = $(window).scrollTop();
    const headerHeight = $('.header').outerHeight() || 0;
    
    if (scroll >= headerHeight && !isSticky) {
      secondaryHeader.addClass('sticky-active');
      isSticky = true;
    } else if (scroll < headerHeight && isSticky) {
      secondaryHeader.removeClass('sticky-active');
      isSticky = false;
    }
  });
});
