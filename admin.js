// Selecting all required elements
const dropArea = document.querySelector(".drag-area"),
    dragText = dropArea.querySelector("header"),
    button = dropArea.querySelector("button"),
    input = dropArea.querySelector("input");

let file; // This is a global variable and we'll use it inside multiple functions

button.onclick = () => {
    input.click(); // If the user clicks on the button, the input will also be clicked
}

input.addEventListener("change", function () {
    // Getting the user-selected file and [0] means selecting only the first one if multiple files are selected
    file = this.files[0];
    dropArea.classList.add("active");
    showFile(); // Calling the function to show the file
});

// If the user drags a file over the drop area
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault(); // Preventing default behavior
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
});

// If the user leaves the dragged file from the drop area
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
});

// If the user drops a file on the drop area
dropArea.addEventListener("drop", (event) => {
    event.preventDefault(); // Preventing default behavior
    // Getting the user-selected file and [0] means selecting only the first one if multiple files are selected
    file = event.dataTransfer.files[0];
    showFile(); // Calling the function to show the file
});

function showFile() {
    let fileType = file.type; // Getting the selected file type
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; // Adding some valid image extensions to an array
    if (validExtensions.includes(fileType)) { // If the user-selected file is an image file
        let fileReader = new FileReader(); // Creating a new FileReader object
        fileReader.onload = () => {
            let fileURL = fileReader.result; // Passing the user file source to the fileURL variable
            let imgTag = `<img src="${fileURL}" alt="">`; // Creating an img tag and passing the user-selected file source inside the src attribute
            dropArea.innerHTML = imgTag; // Adding the created img tag inside the dropArea container
        }
        fileReader.readAsDataURL(file);
    } else {
        alert("This is not an Image File!");
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
    }
}