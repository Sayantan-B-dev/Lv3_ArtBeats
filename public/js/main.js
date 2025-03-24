function hideAlert(element) {
    element.classList.add("hide");
}


//for image carousel in eachArt
let currentIndex = 0;
function moveSlide(step) {
    const slides = document.querySelectorAll(".carousel-item");
    const totalSlides = slides.length;

    currentIndex += step;
    
    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    }

    const offset = -currentIndex * 100; 
    document.querySelector(".carousel-inner").style.transform = `translateX(${offset}%)`;
}
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".prev, .next").forEach(button => {
        button.addEventListener("click", function () {
            const step = parseInt(this.getAttribute("data-step"), 10);
            moveSlide(step);
        });
    });
});



//for upload button
function updateFileName() {
    const input = document.getElementById('file-upload');
    const display = document.getElementById('file-name-display');
    
    if (input.files.length > 0) {
        let fileNames = Array.from(input.files).map(file => file.name).join(', ');
        display.textContent = fileNames;
    } else {
        display.textContent = "No file chosen";
    }
}


//Each card click
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".art-card").forEach(card => {
        card.addEventListener("click", function () {
            const artId = this.getAttribute("data-art-id");
            window.location.href = `/ArtBeats/${artId}`;
        });
    });
});


//edit choose file button
document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file-upload");
    const fileNameDisplay = document.getElementById("file-name-display");

    fileInput.addEventListener("change", function () {
        if (fileInput.files.length > 0) {
            // Show selected file names
            fileNameDisplay.textContent = Array.from(fileInput.files).map(file => file.name).join(", ");
        } else {
            fileNameDisplay.textContent = "No file chosen";
        }
    });
});




//flash js
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".alert").forEach(alertBox => {
        alertBox.addEventListener("click", function () {
            hideAlert(this);
        });
    });
});

function hideAlert(element) {
    element.style.display = "none";
}

//navbar toggle 778 px
document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector(".navToggle");
    const navMenu = document.querySelector(".navMenu");

    toggleBtn.addEventListener("click", function () {
        if (window.innerWidth <= 778) {
            navMenu.classList.toggle("active"); // Toggle only on small screens
        }
    });
});
