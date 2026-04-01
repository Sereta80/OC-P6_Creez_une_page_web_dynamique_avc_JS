// import { getWorks, displayWorks } from "./script.js";

const editingBtn = document.querySelector('.container-editing');
const modalBackground = document.querySelector('.modal-bg');
const xmark = document.getElementById('xmark');
const photoBtn = document.getElementById('photo-btn');
const editingGallery = document.querySelector('.editing-gallery');
const editingForm = document.querySelector('.editing-form');

// Open modal
editingBtn.addEventListener("click", (event) => {
    modalBackground.style.display = "flex";
});

// Close modal - click on xmark icon
xmark.addEventListener("click", (event) => {
    modalBackground.style.display = "none";
});

// Close modal - click on modal background
modalBackground.addEventListener("click", (event) => {
    if (event.target === modalBackground && modalBackground.style.display === "flex") {
        modalBackground.style.display = "none";
    };
});

// Open Form and hide editing gallery section
photoBtn.addEventListener("click", (event) => {
    editingForm.style.display = "flex";
    editingGallery.style.display = "none";
});

// getWorks();
// displayWorks(editingGallery);
