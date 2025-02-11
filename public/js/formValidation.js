function validateTitle(title, formAlert) {
    const titleRegex = /^[A-Za-z0-9.,\s]*$/;
    if (title.length < 5 || title.length > 30) {
        formAlert.innerText = "Number of characters of title must be between 5-30";
        return false;
    } 
    if (!titleRegex.test(title)) {
      formAlert.innerText =
        "Only letters, numbers, spaces, commas, and periods are allowed in title";
      return false;
    }
    return true;
}

function validateDescription(description, formAlert) {
    const descriptionRegex = /^[A-Za-z0-9.,\s]*$/;
    if (description.length < 1 || description.length > 500) {
      formAlert.innerText =
        "Number of characters of description must be between 1-500";
      return false;
    }
    if (!descriptionRegex.test(description)) {
      formAlert.innerText ="Only letters, numbers, spaces, commas, and periods are allowed in the description.";
      return false;
    }
    return true;
}

function validateLocation(location, formAlert) {
    const locationRegex = /^[A-Za-z0-9\s.,'-]{2,100}$/;
    if (!locationRegex.test(location)) {
      formAlert.innerText =
        "Location must be 2-100 characters long and can only contain letters, numbers, spaces, commas, periods, apostrophes, and hyphens.";
      return false;
    }
    return true;
}

function validateArtistName(artistName, formAlert) {
    const artistRegex = /^[A-Za-z0-9.,\s]*$/;
    if (artistName.length < 1 || artistName.length > 30) {
      formAlert.innerText =
        "Number of characters of Artist name must be between 1-30";
      return false;
    }
    if (!artistRegex.test(artistName)) {
        formAlert.innerText =
        "Only characters and numbers are allowed in artist name";
        return false;
    }
    return true;
}

function validateDateCreated(dateCreated, formAlert) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateCreated)) {
      formAlert.innerText =
        "Please enter a valid date in the format YYYY-MM-DD.";
      return false;
    }
    const newDate = new Date(dateCreated);
    if (isNaN(newDate)) {
      formAlert.innerText = "Please enter a valid date.";
      return false;
    }
    return true;
}

function validateImageUrl(imageUrl, formAlert) {
    const ImageRegex = /^(https?:\/\/(?:www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})(\/[^\s]*)?\.(?:png|jpg|jpeg|gif)$/i;
    if (!ImageRegex.test(imageUrl)) {
        formAlert.innerText = "Please enter a valid image URL with PNG, JPG, JPEG, or GIF format.";
        return false;
    }

    const newURL =imageUrl.replace(/<script.*?>.*?<\/script>/gi, '').trim();

    if (newURL !== imageUrl) {
        formAlert.innerText = "The URL contains unsafe characters or script tags.";
        return false;
    }
    return true;
}




document
    .querySelector(".new-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        let formAlert = document.querySelector("#form-alert");

        const title = document.querySelector("#title").value.trim();
        const description = document.querySelector("#description").value.trim();
        const location = document.querySelector("#location").value.trim();
        const artistName = document.querySelector("#artist_name").value.trim();
        const dateCreated = document.querySelector("#date_created").value.trim();
        const imageUrl = document.querySelector("#image_url").value.trim();

        if(
            validateTitle(title, formAlert) &&
            validateDescription(description, formAlert) && 
            validateLocation(location, formAlert) && 
            validateArtistName(artistName, formAlert) && 
            validateDateCreated(dateCreated, formAlert) && 
            validateImageUrl(imageUrl, formAlert)
        ){
        this.submit();
        }
    });