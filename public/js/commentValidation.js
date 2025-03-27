function validateComment(comment) {
    const commentRegex = /^[A-Za-z0-9.,\s]*$/;
    commentText=comment.value.trim()
    if (commentText.length < 1 || commentText.length > 400) {
        comment.style.backgroundColor = "lightcoral";
        comment.value = "Number of characters of comment must be between 1-100";
        setTimeout(() => {
            comment.value = "";
            comment.style.backgroundColor = "";
        }, 1500);
        return false;
    }
    if (!commentRegex.test(commentText)) {
        let invalidChars = "";
        for(let i = 0; i < commentText.length; i++){
            if(!commentRegex.test(commentText[i])){
                invalidChars += commentText[i];
            }
        }
        comment.style.backgroundColor = "lightcoral";
        comment.value ="Invalid characters in comment";
        setTimeout(() => {
            comment.value = "";
            comment.style.backgroundColor = "";
        }, 1500);
        return false;
    }
    comment.style.backgroundColor = "";
    return true;
}

document
  .querySelector(".comment-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const comment = document.querySelector("#comment");


    if (validateComment(comment)) {
        this.submit();
    }
  });


