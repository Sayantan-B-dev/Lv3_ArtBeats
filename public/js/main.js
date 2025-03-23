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


