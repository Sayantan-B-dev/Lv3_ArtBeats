
document
  .querySelector(".new-form ")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let formAlert = document.querySelector("#form-alert");

    const title = document.querySelector("#title").value.trim();
    const description = document.querySelector("#description").value.trim();
    const location = document.querySelector("#location").value.trim();
    const artistName = document.querySelector("#artist_name").value.trim();
    const fileInput = document.querySelector("#file-upload");
    


    function validateTitle(title, formAlert) {
      const titleRegex = /^[A-Za-z0-9.,\s]*$/;
      if (title.length < 5 || title.length > 40) {
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
        if (artistName.length < 2 || artistName.length > 20) {
          formAlert.innerText =
            "Number of characters of Artist name must be between 1-20";
          return false;
        }
        if (!artistRegex.test(artistName)) {
            formAlert.innerText =
            "Only characters and numbers are allowed in artist name";
            return false;
        }
        return true;
    }

    function validateUpload(fileInput, formAlert) {
        const files = fileInput.files;
        if (files.length > 3 ||files.length<1) {
            formAlert.innerText = "You have to upload minimum of 1 image and You can upload a maximum of 3 images .";
            fileInput.value = ""; 
            return false;
        } else {
            formAlert.innerText = ""; // Clear any previous error message
            return true;
        }
    }

    if (
      validateUpload(fileInput, formAlert) &&
      validateTitle(title, formAlert) &&
      validateDescription(description, formAlert) &&
      validateLocation(location, formAlert) &&
      validateArtistName(artistName, formAlert)
    ) {
      this.submit();
    }
  });


