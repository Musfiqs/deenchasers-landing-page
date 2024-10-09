window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const toTop = document.querySelector('.toTop');
    
    // Toggle the shrink class on the header based on scroll position
    if (window.scrollY > 50) {
        header.classList.add('shrink');
    } else {
        header.classList.remove('shrink');
    }

    // Determine if the "back-to-top" button should be shown
    const slides = document.querySelectorAll('.slides');
    let shouldShowToTop = false;
    
    slides.forEach(slide => {
        const slideTop = slide.offsetTop;
        const slideHeight = slide.clientHeight;
        const scrollPosition = window.scrollY + window.innerHeight;

        if (scrollPosition > slideTop + slideHeight / 2) {
            shouldShowToTop = true;
        }
    });

    // Toggle the visibility of the "back-to-top" button
    if (shouldShowToTop) {
        toTop.classList.add('active');
    } else {
        toTop.classList.remove('active');
    }
});

document.querySelector('.back-to-top').addEventListener('click', function(event) {
    // Scrolls to the section with id "home"
    window.location.href = '#home'; // Smooth scrolling with default browser behavior
});

//success message for the contact page
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const statusMessage = document.getElementById("status-message");

    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    }).then(response => {
        if (response.ok) {
            statusMessage.textContent = "Success! Your message has been sent.";
            statusMessage.className = "status-message success";
        } else {
            statusMessage.textContent = "Failed to send your message. Please try again.";
            statusMessage.className = "status-message error";
        }
        statusMessage.style.display = "block";
        
        setTimeout(() => {
            statusMessage.style.display = "none";
        }, 5000);
    }).catch(() => {
        statusMessage.textContent = "An error occurred. Please try again.";
        statusMessage.className = "status-message error";
        statusMessage.style.display = "block";
        
        setTimeout(() => {
            statusMessage.style.display = "none";
        }, 5000);
    });
});