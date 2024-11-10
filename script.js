let slideIndex = 0;
let slideTimer;

document.getElementById('schedule-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  alert(`Schedule submitted for ${date} at ${time}`);
});

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

async function handleFormSubmit(event) {
  event.preventDefault();
  
  const formData = new FormData(event.submit);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      event.target.style.display = 'none';
      const message = document.createElement('p');
      message.textContent = "Thanks for doing business with us! We look forward to seeing you next time.";
      event.target.parentNode.appendChild(message);
      setTimeout(() => {
        location.reload();
      }, 2000);
    } else {
      alert('There was an error submitting the form. Please try again.');
    }
  } catch (error) {
    alert('There was an error submitting the form. Please try again.');
  }
}