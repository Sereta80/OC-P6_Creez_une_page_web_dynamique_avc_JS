// Declarations
const editingBtn = document.querySelector('.container-editing');
const modalBackground = document.querySelector('.modal-bg');
const xmark = document.getElementById('xmark');
const leftArrow = document.getElementById('left-arrow');
const photoBtn = document.getElementById('photo-btn');
const editingGallery = document.querySelector('.editing-gallery');
const galleryTitle = document.querySelector('.modal-header h2');
const galleryGrid = document.querySelector('.gallery-grid');
const galleryView = document.querySelector('.gallery-grid figure')
const editingForm = document.querySelector('.editing-form');
const form = document.querySelector('.editing-form form')

// Open modal and hide left arrow
editingBtn.addEventListener("click", (event) => {
    modalBackground.style.display = "flex";
    leftArrow.style.visibility = "hidden";
});

// Close modal - click on xmark icon
xmark.addEventListener("click", (event) => {
    resetModal();
    resetPreview()
});

// Close modal - click on modal background
modalBackground.addEventListener("click", (event) => {
    if (event.target === modalBackground && modalBackground.style.display === "flex") {
        resetModal();
        resetPreview();
    };
});

// Open Form, hide editing gallery section and display left arrow
photoBtn.addEventListener("click", (event) => {
    editingForm.style.display = "flex";
    editingGallery.style.display = "none";
    galleryTitle.style.display = "none";
    leftArrow.style.visibility = "visible";
});

// Go back to editing gallery
leftArrow.addEventListener("click", (event) => {
    editingForm.style.display = "none";
    editingGallery.style.display = "flex";
    galleryTitle.style.display = "flex";
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
    return datas;
};

// Display modal gallery
function displayModalWorks(projectsToEdit) {
    galleryGrid.innerHTML = "";

    projectsToEdit.forEach(project => {

        // Create figure tag
        const projectElement = document.createElement("figure");
        projectElement.dataset.id = project.id;

        // Create image element
        const imgElement = document.createElement("img");
        imgElement.src = project.imageUrl;
        imgElement.classList.add('view');

        // Create trash image element
        const trashElement = document.createElement("img");
        trashElement.src = "./assets/icons/trash-icon.png";
        trashElement.classList.add('trash-icon');

        // Get project ID
        const projectId = project.id;

        // Add a listener to trash icon
        trashElement.addEventListener("click", (e) => {
            deleteWork(projectId);
        });

        // Attach elements to figure tag
        projectElement.appendChild(imgElement);
        projectElement.appendChild(trashElement);

        // Attach figure tag to gallery class
        galleryGrid.appendChild(projectElement);
    });
};

async function initModal() {
    const allWorks = await getModalWorks();
    displayModalWorks(allWorks);
};

initModal();

// Get categories for modal form
async function getFormCategories() {
    // Get categories (API)
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();

    // Target categories select
    const categoriesSelect = document.getElementById('categories-select');

    // Loop on categories
    categories.forEach(category => {
        // Create select option
        let categoryOption = document.createElement('option')
        categoryOption.innerText = category.name;

        // Get categories ID
        categoryOption.value = category.id;

        // Attach to categories select
        categoriesSelect.appendChild(categoryOption);
    });
};

getFormCategories();

// Delete works
async function deleteWork(id) {
    const token = localStorage.getItem("token");

    // Delete works request - API
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            "Accept": "*/*",
            "Authorization": `Bearer ${token}`
        },
    });

    // Delete figure
    if (response.ok) {
        const figureModalToDelete = document.querySelector(`.gallery-grid figure[data-id="${id}"]`);
        figureModalToDelete.remove();

        const figureHpToDelete = document.querySelector(`.gallery figure[data-id="${id}"]`);
        figureHpToDelete.remove();
    }
};

// Create image preview for modal form
let selectedFile;
let preview = document.createElement('img');
const fileUpload = document.getElementById('file-upload');
const labelFileUpload = document.getElementById('label-file-upload');
const uploadIcon = document.getElementById('upload-icon');
const uploadBtn = document.getElementById('upload-btn');
const additionnalTxt = document.getElementById('additional-txt');
fileUpload.addEventListener("change", (e) => {
    selectedFile = e.target.files[0];
    preview.src = URL.createObjectURL(selectedFile);
    preview.classList.add('preview');

    uploadIcon.style.display = "none";
    uploadBtn.style.display = "none";
    additionnalTxt.style.display = "none";
    labelFileUpload.appendChild(preview);
});

// Reset image preview for modal form
function resetPreview() {
    selectedFile = undefined;
    preview.remove();
    uploadIcon.style.display = "flex";
    uploadBtn.style.display = "flex";
    additionnalTxt.style.display = "flex";
};

// Send a new work
async function sendNewWork() {
    const token = localStorage.getItem("token");

    // Get form values
    let formTitle = document.getElementById('title').value;
    let formCategory = document.getElementById('categories-select').value;

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("title", formTitle);
    formData.append("category", formCategory);


    const response = await fetch ("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            "Accept": "*/*",
            "Authorization": `Bearer ${token}`
        },
        body: formData
    });

    if (response.ok) {
        const newWork = await response.json();
        addWorkToModal(newWork);
        addWorkToHp(newWork);
        modalForm.reset();
        resetPreview()
    } else {
        const errorMessage = document.createElement('h3');
        errorMessage.innerText = "Les champs ne sont pas correctemement remplis !";
        editingForm.insertBefore(errorMessage, form);
    }
};

// Submit a new work
const modalForm = document.querySelector('.editing-form form')
modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sendNewWork();
});

// Add a work to modal
function addWorkToModal(work) {
    // Create figure tag
    const projectElement = document.createElement("figure");
    projectElement.dataset.id = work.id;

    // Create image element
    const imgElement = document.createElement("img");
    imgElement.src = work.imageUrl;
    imgElement.classList.add('view');

    // Create trash image element
    const trashElement = document.createElement("img");
    trashElement.src = "./assets/icons/trash-icon.png";
    trashElement.classList.add('trash-icon');

    // Get project ID
    const projectId = work.id;

    // Add a listener to trash icon
    trashElement.addEventListener("click", (e) => {
        deleteWork(projectId);
    });

    // Attach elements to figure tag
    projectElement.appendChild(imgElement);
    projectElement.appendChild(trashElement);

    // Attach figure tag to gallery class
    galleryGrid.appendChild(projectElement);
};

// Add a work to home page
function addWorkToHp(work) {
    // Create figure tag
    const projectElement = document.createElement("figure");
    projectElement.dataset.id = work.id;

    // Create image element
    const imgElement = document.createElement("img");
    imgElement.src = work.imageUrl;

    // Create title element
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = work.title;

    // Attach elements to figure tag
    projectElement.appendChild(imgElement);
    projectElement.appendChild(titleElement);

    // Attach figure tag to gallery class
    const galleryClass = document.querySelector(".gallery");
    galleryClass.appendChild(projectElement);
};