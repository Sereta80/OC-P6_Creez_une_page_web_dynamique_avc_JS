const editingBtn = document.querySelector('.container-editing');
const modalBackground = document.querySelector('.modal-bg');
const xmark = document.getElementById('xmark');
const leftArrow = document.getElementById('left-arrow');
const photoBtn = document.getElementById('photo-btn');
const editingGallery = document.querySelector('.editing-gallery');
const editingForm = document.querySelector('.editing-form');

// Open modal and hide left arrow
editingBtn.addEventListener("click", (event) => {
    modalBackground.style.display = "flex";
    leftArrow.style.visibility = "hidden";
});

// Close modal - click on xmark icon
xmark.addEventListener("click", (event) => {
    resetModal();
});

// Close modal - click on modal background
modalBackground.addEventListener("click", (event) => {
    if (event.target === modalBackground && modalBackground.style.display === "flex") {
        resetModal();
    };
});

// Open Form, hide editing gallery section and display left arrow
photoBtn.addEventListener("click", (event) => {
    editingForm.style.display = "flex";
    editingGallery.style.display = "none";
    leftArrow.style.visibility = "visible";
});

// Go back to editing gallery
leftArrow.addEventListener("click", (event) => {
    editingForm.style.display = "none";
    editingGallery.style.display = "flex";
    leftArrow.style.visibility = "hidden";
});

// Reset modal
function resetModal() {
    modalBackground.style.display = "none";
    editingGallery.style.display = "flex";
    editingForm.style.display = "none";
    leftArrow.style.visibility = "hidden";
}

// Get works
async function getModalWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    const datas = await response.json();
    console.log(datas);
    return datas;
};

// Display gallery
function displayModalWorks(projectsToEdit) {
    editingGallery.innerHTML = "";

    projectsToEdit.forEach(project => {

        // Create figure tag
        const projectElement = document.createElement("figure");

        // Create image element
        const imgElement = document.createElement("img");
        imgElement.src = project.imageUrl;

        // Create trash image element
        const trashElement = document.createElement("img");
        trashElement.src = "./assets/icons/trash-icon.png";

        // Attach elements to figure tag
        projectElement.appendChild(imgElement);
        projectElement.appendChild(trashElement);

        // Attach figure tag to gallery class
        editingGallery.appendChild(projectElement);
    });
}

async function initModal() {
    const allWorks = await getModalWorks();
    displayModalWorks(allWorks);
}

initModal();