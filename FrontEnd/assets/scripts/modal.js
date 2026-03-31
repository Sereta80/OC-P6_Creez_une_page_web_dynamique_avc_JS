// import { getWorks, displayWorks } from "./script.js";

const editingBtn = document.querySelector('.container-editing');
const modalBackground = document.querySelector('.modal-bg');
const xmark = document.getElementById('xmark');
// const editingGallery = document.querySelector('.editing-gallery');

// Open modal
editingBtn.addEventListener("click", (event) => {
    modalBackground.style.display = "block";
});

// Close modal - click on xmark icon
xmark.addEventListener("click", (event) => {
    modalBackground.style.display = "none";
});

// Close modal - click on modal background
modalBackground.addEventListener("click", (event) => {
    if (event.target === modalBackground && modalBackground.style.display === "block") {
        modalBackground.style.display = "none";
    };
});

// getWorks();
// displayWorks(editingGallery);
