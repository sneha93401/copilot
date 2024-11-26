document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.querySelector('.menu-toggle');
  const menuList = document.querySelector('.menu-list');

  toggleButton.addEventListener('click', function () {
    menuList.classList.toggle('show');
  });
});

// FAQ section js

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    var panel = this.nextElementSibling;
    // Check if panel is open
    if (panel.style.maxHeight) {
      // Panel is open, so close it
      panel.style.maxHeight = null;
      this.classList.remove("active");
      this.parentElement.classList.remove("active");
    } else {
      // Close all other panels
      var allPanels = document.getElementsByClassName("pannel");
      for (var j = 0; j < allPanels.length; j++) {
        allPanels[j].style.maxHeight = null;
        acc[j].classList.remove("active");
        acc[j].parentElement.classList.remove("active");
      }
      // Open the clicked panel
      panel.style.maxHeight = panel.scrollHeight + "px";
      this.classList.add("active");
      this.parentElement.classList.add("active");
    }
  });
}

// card js

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
  carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
  // Autoplay the carousel after every 2500 ms
  timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

// marketing cards js

let budget = document.querySelectorAll("#budget");
let choose_bg = document.getElementById("choose_plan_bg");
let choice = document.getElementById("choice");
let choose_color = document.getElementById("choose1");
let choose1_color = document.getElementById("choose2")

// center
choice.addEventListener("click", () => {
  choice.style.border = '1px solid var(--color-blueviolet-200)';
  choose_color.style.color = "white";
  choose_plan1.style.boxShadow = "0px 1px 3px 0px rgba(0, 0, 0, 0.2)";
  free_trial.style.boxShadow = "0px 1px 3px 0px rgba(0, 0, 0, 0.2)";
  choice.style.boxShadow = "0px 1px 15px 3px rgba(0, 0, 0, 0.2)";
  free_trial.style.border = 'none';
  choose_plan1.style.border = 'none';
  choose_1.style.backgroundColor = "white";
  choose_2.style.backgroundColor = "white";
  choose_plan.style.color = "black";
  choose_2.style.color = "black"
  choice.style.boxShadow = "0 16px 60px rgba(26, 40, 75, 0.1);";
  choose_bg.style.backgroundColor = "var(--color-blueviolet-200)";

})

// left
let free_trial = document.getElementById("free");
let choose_1 = document.getElementById("choose_1")
free_trial.addEventListener("click", () => {
  choose_plan1.style.boxShadow = "0px 1px 3px 0px rgba(0, 0, 0, 0.2)";
  free_trial.style.border = ' 1px solid var(--color-blueviolet-200)';
  choose_1.style.backgroundColor = "var(--color-blueviolet-200)";
  free_trial.style.boxShadow = "0px 1px 15px 3px rgba(0, 0, 0, 0.2)";
  choice.style.border = 'none';
  choice.style.boxShadow = "0px 1px 3px 0px rgba(0, 0, 0, 0.2)";
  choose_plan1.style.border = 'none';
  choose_2.style.backgroundColor = "white"
  choose_bg.style.backgroundColor = "white";
  choose_color.style.color = "black";
  choose_plan.style.color = "white";
  choose_paln2.style.color = "black";

})

//  right
let choose_plan1 = document.getElementById("choose_plan1");
let choose_2 = document.getElementById("choose_2");

let choose_paln2 = document.querySelector(".choose-plan2");
let choose_plan = document.querySelector(".choose-plan");

choose_plan1.addEventListener("click", () => {

  free_trial.style.border = 'none';
  free_trial.style.boxShadow = "0px 1px 3px 0px rgba(0, 0, 0, 0.2)";

  choice.style.border = 'none';
  choose_1.style.backgroundColor = "white";
  choose_bg.style.backgroundColor = "white";
  choose_color.style.color = "black";
  choose_paln2.style.color = "white";
  choose_plan.style.color = "black";
  choice.style.boxShadow = "0px 1px 3px 0px rgba(0, 0, 0, 0.2)";
  choose_plan1.style.boxShadow = "0px 1px 15px 3px rgba(0, 0, 0, 0.2)";
  choose_plan1.style.border = ' 1px solid var(--color-blueviolet-200)';
  choose_2.style.backgroundColor = "var(--color-blueviolet-200)";
})

let button = document.querySelector(".chatbot-security-frame");
let isActive = false; 

let doodleFrame = document.querySelector('.what-is-doodle-frame');

doodleFrame.addEventListener("click", function(event) {
  if (!circle_btn.contains(event.target)) {
    // Toggle the button and update the prices
    if (cuount === 0) {
      circle_btn.style.position = "relative";
    circle_btn.style.left = "38px"
    price.innerHTML = "$25";
    cuount++;
    monthly.innerHTML = " /Yealry"
    monthly.style.position = "relative";
    monthly.style.left = "55px"
    monthly.innerHTML = " /Yearly"
    price1.innerHTML = "$70";
    monthly1.innerHTML = " /Yearly"
    } else {
      circle_btn.style.position = "relative";
    circle_btn.style.left = "2px";
    price.innerHTML = "$35";
    monthly.innerHTML = "  /Month (annually billed)";
    monthly.style.left = "0px"
    cuount = 0;
    price1.innerHTML = "$89"
    monthly1.innerHTML = "  /Month (annually billed)";
    monthly1.style.position = "relative";
    monthly1.style.left = "30px"
    }
  }
});

// center box
let price = document.querySelector(".question-entry");
let monthly = document.querySelector(".month-annually-billed");
let price1 = document.querySelector(".frame25");
let monthly1 = document.querySelector(".month-annually-billed1");

// button animation
let cuount = 0;
let circle_btn = document.querySelector(".circle");
circle_btn.addEventListener("click", () => {

  if (cuount == 0) {

    circle_btn.style.position = "relative";
    circle_btn.style.left = "38px"
    price.innerHTML = "$25";
    cuount++;
    monthly.innerHTML = " /Yealry"
    monthly.style.position = "relative";
    monthly.style.left = "55px"
    monthly.innerHTML = " /Yearly"
    price1.innerHTML = "$70";
    monthly1.innerHTML = " /Yearly"
  }
  else {
    circle_btn.style.position = "relative";
    circle_btn.style.left = "2px";
    price.innerHTML = "$35";
    monthly.innerHTML = "  /Month (annually billed)";
    monthly.style.left = "0px"
    cuount = 0;
    price1.innerHTML = "$89"
    monthly1.innerHTML = "  /Month (annually billed)";
    monthly1.style.position = "relative";
    monthly1.style.left = "30px"
  }
})
// Example function to update price with animation
function updatePriceWithAnimation(newPrice) {
  // Assuming priceElements are the actual text elements you want to update
  const priceElements = document.querySelectorAll(".price-text"); // Adjust selector as needed
  
  priceElements.forEach(el => {
    // Step 1: Fade out and scale up slightly
    el.style.opacity = '0';
    el.style.transform = 'scale(1.2)'; // Scale up for a pop effect
    
    setTimeout(() => {
      // Step 2: Update the text content and reset transformations
      el.innerHTML = newPrice;
      el.style.transform = 'scale(1)'; // Reset scale
      
      // Step 3: Fade back in
      el.style.opacity = '1';
    }, 500); // Match the transition duration from CSS
  });
}



// casousel js

const caroussel = document.querySelector(".caroussel"),
  firstImg = caroussel.querySelectorAll("img")[0],
  arrowIcons = document.querySelectorAll(".wraper i");

let isDragStarting = false, isDraging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
  let scrollWidth = caroussel.scrollWidth - caroussel.clientWidth;
  arrowIcons[0].style.display = caroussel.scrollLeft === 0 ? "none" : "block";
  arrowIcons[1].style.display = caroussel.scrollLeft === scrollWidth ? "none" : "block";
};

arrowIcons.forEach(icon => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 14;
    caroussel.scrollLeft += icon.id === "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(showHideIcons, 60);
  });
});

const dragStarting = (e) => {
  isDragStarting = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = caroussel.scrollLeft;
};

const draging = (e) => {
  if (!isDragStarting) return;
  e.preventDefault();
  isDraging = true;
  caroussel.classList.add("drangging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  caroussel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
};

const dragStopping = () => {
  isDragStarting = false;
  caroussel.classList.remove("drangging");
  if (!isDraging) return;
  isDraging = false;
  // autoSlide(); // Assuming you have more implementation for this or it's handled elsewhere
};

// Corrected the function names for event listeners
caroussel.addEventListener("mousedown", dragStarting);
caroussel.addEventListener("touchstart", dragStarting);

document.addEventListener("mousemove", draging);
caroussel.addEventListener("touchmove", draging);

document.addEventListener("mouseup", dragStopping);
caroussel.addEventListener("touchend", dragStopping);

// Automatic Slide Functionality
const autoSlide = () => {
  let firstImgWidth = firstImg.clientWidth + 14; // including the margin
  // Automatically move to the next image
  caroussel.scrollLeft += firstImgWidth;
  showHideIcons();
};

// Start the autoSlide function to run every 3 seconds
setInterval(autoSlide, 3000); // Adjust the timing to your preference



// form js 
let join = document.getElementById("Ai-Click");
let form_contain = document.getElementById("main_form");
let cross = document.getElementById("cross");
let overlay = document.getElementById("overlay"); // Reference to the overlay

function toggleOverlayAndScrolling(display, enableScrolling) {
    overlay.style.display = display ? 'block' : 'none';
    document.body.style.overflow = enableScrolling ? 'auto' : 'hidden';
}

join.addEventListener("click", () => {
    if (form_contain.style.display !== "block") {
        form_contain.style.display = "block";
        toggleOverlayAndScrolling(true, false); // Show overlay, disable scrolling
    }
});

cross.addEventListener("click", () => {
    form_contain.style.display = "none";
    toggleOverlayAndScrolling(false, true); // Hide overlay, enable scrolling
});

// scroll link
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();

          // Get the target element's top position relative to the document
          const targetId = this.getAttribute('href');
          const target = document.querySelector(targetId);
          if (!target) return;

          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;

          // Smooth scroll to the target position
          window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
          });
      });
  });
});

const circleButton = document.querySelector('.circle');
// Add a click event listener to the circle button
circleButton.addEventListener('click', function () {
  // Toggle the 'hover-effect' class when the button is clicked
  this.classList.toggle('hover-effect');
});


document.addEventListener('DOMContentLoaded', () => {
  const meetCoPilotElement = document.querySelector('.meet_copilet');
  const words = ["Meet The Best Co-Pilot \n in The World"];
  let wordIndex = 0;
  let letterIndex = 0;
  let currentText = '';
  let cursorSpan = '<span class="cursor">|</span>';

  function typeWord() {
    if (wordIndex < words.length) {
      // Handle the line break separately
      if (words[wordIndex] === "<br>") {
        currentText += words[wordIndex];
        wordIndex++;
        setTimeout(typeWord, 400); // Add a slight delay before starting the next line
      } else {
        // Continue typing out the current word
        if (letterIndex < words[wordIndex].length) {
          currentText += words[wordIndex].charAt(letterIndex);
          meetCoPilotElement.innerHTML = currentText + cursorSpan;
          letterIndex++;
          setTimeout(typeWord, 80); // Speed of typing each letter
        } else {
          // End of current word, add a space if it's not the last word or the line break
          if (wordIndex < words.length - 1 && words[wordIndex + 1] !== "<br>") {
            currentText += " ";
          }
          wordIndex++;
          letterIndex = 0; // Reset for the next word
          setTimeout(typeWord, 40); // Delay before starting the next word
        }
      }
    } else {
      // Typing complete, remove cursor
      meetCoPilotElement.innerHTML = currentText;
      // Optionally start the animation for the next element here
    }
  }
  // Start the typewriter effect
  typeWord();
});

// popup website 

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-popup');
      }
    });
  }, {
    threshold: 0.1 // Trigger when 10% of the element is in view
  });

  // Target all elements you want to animate
  document.querySelectorAll('.f-a-qs-parent *').forEach(el => {
    observer.observe(el);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-popup');
      }
    });
  }, {
    threshold: 0.1 // Adjust this value based on when you want the animation to trigger
  });

  // Observe all child elements of '.main-menu-frame' for intersection
  document.querySelectorAll('.main-menu-frame *').forEach(el => {
    observer.observe(el);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-popup');
      }
    });
  }, {
    threshold: 0.1 // Adjust this value based on when you want the animation to trigger
  });

  // Observe all child elements of '.main-menu-frame' for intersection
  document.querySelectorAll('.subscribe-form *').forEach(el => {
    observer.observe(el);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-popup');
      }
    });
  }, {
    threshold: 0.1 // Adjust this value based on when you want the animation to trigger
  });

  // Observe all child elements of '.main-menu-frame' for intersection
  document.querySelectorAll('.text-frame *').forEach(el => {
    observer.observe(el);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-popup');
      }
    });
  }, {
    threshold: 0.1 // Adjust this value based on when you want the animation to trigger
  });

  // Observe all child elements of '.main-menu-frame' for intersection
  document.querySelectorAll('.frame-parent-query-questions *').forEach(el => {
    observer.observe(el);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-popup');
      }
    });
  }, {
    threshold: 0.1 // Adjust this value based on when you want the animation to trigger
  });

  // Observe all child elements of '.main-menu-frame' for intersection
  document.querySelectorAll('.blog *').forEach(el => {
    observer.observe(el);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-popup');
      }
    });
  }, {
    threshold: 0.1 // Adjust this value based on when you want the animation to trigger
  });

  // Observe all child elements of '.main-menu-frame' for intersection
  document.querySelectorAll('.footer-distributed *').forEach(el => {
    observer.observe(el);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
      var img = document.getElementById('animated-img');
      // Make the image visible and start the animation
      img.style.visibility = 'visible';
      img.style.opacity = 1;
      img.style.animation = 'fadeIn 2s ease-in-out forwards';
  }, 4000); // Delay of 2 seconds
});

