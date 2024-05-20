const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstubwxyz!?";

const handleIntersection = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      startHacking(entry.target);
      observer.unobserve(entry.target); 
    }
  });
};


const observer = new IntersectionObserver(handleIntersection, {
  threshold: 0.5, 
});


const hackedElements = document.querySelectorAll('.hacked');
hackedElements.forEach((element) => {
  observer.observe(element);
});


function startHacking(element) {
  const originalText = element.dataset.value;
  let iteration = 0;


  const frameDelay = 20; 

  function animate() {
    element.innerText = originalText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return originalText[index];
        }
        return letters[Math.floor(Math.random() * 54)];
      })
      .join("");

    if (iteration < originalText.length) {
      iteration += 1 / 3;
      setTimeout(animate, frameDelay);
    }
  }

  animate();
}
document.addEventListener("DOMContentLoaded", function() {
  // Check if the user has already seen the message
  if (!hasUserSeenMessage()) {
    setTimeout(function() {
      const scrollMessage = document.querySelector(".scroll-message");
      scrollMessage.classList.remove("hidden");
      setTimeout(function() {
        scrollMessage.style.opacity = 1;
      }, 100);


      window.addEventListener("scroll", function() {
        if (!hasUserSeenMessage() && isElementInView(scrollMessage)) {
          hideMessage();
        }
      });
    }, 3000); 
  }
});


function hasUserSeenMessage() {
  return document.cookie.indexOf("messageSeen=true") !== -1;
}


function setUserHasSeenMessage() {
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1); // Cookie expires in 1 year
  document.cookie = "messageSeen=true; expires=" + expiryDate.toUTCString();
}


function hideMessage() {
  const scrollMessage = document.querySelector(".scroll-message");
  scrollMessage.style.opacity = 0;
  setTimeout(function() {
    scrollMessage.classList.add("hidden");
    setUserHasSeenMessage();
  }, 500); 
}


function isElementInView(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
