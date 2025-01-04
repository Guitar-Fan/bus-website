let slideIndex = 0;
let slideTimer;

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  resetSlideTimer();
}

function resetSlideTimer() {
  clearTimeout(slideTimer);
  slideTimer = setTimeout(() => showSlides(slideIndex += 1), 5000); // Change image every 5 seconds
}

document.addEventListener('DOMContentLoaded', (event) => {
  showSlides(slideIndex);
});

document.getElementById('myForm').addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  
}