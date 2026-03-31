// Get projects datas
async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    const datas = await response.json();
    console.log(datas);
    return datas;
}
getWorks();

// Display gallery
function displayWorks(projectsToShow) {
    const galleryClass = document.querySelector(".gallery");
    galleryClass.innerHTML = "";

    projectsToShow.forEach(project => {
        // console.log(project.title);
        // console.log(project.imageUrl);
        // console.log(project.category.name);

        // Create figure tag
        const projectElement = document.createElement("figure");

        // Create image element
        const imgElement = document.createElement("img");
        imgElement.src = project.imageUrl;

        // Create title element
        const titleElement = document.createElement("figcaption");
        titleElement.innerText = project.title;

        // Attach elements to figure tag
        projectElement.appendChild(imgElement);
        projectElement.appendChild(titleElement);

        // Attach figure tag to gallery class
        galleryClass.appendChild(projectElement);
    });
}

async function init() {
    // Get works only once at the beginning
    const allWorks = await getWorks();

    // Display all works by default
    displayWorks(allWorks);

    // Configure filters buttons
    listenFiltersBtns(allWorks);
}
init();

async function getCategories() {
    // Get categories (API)
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();
    console.log(categories)

    // Target filters section
    const filtersSection = document.querySelector('.filters');

    // Create button "Tous"
    const allBtn = document.createElement('button');
    allBtn.innerText = "Tous";
    allBtn.classList.add('categories-btn', 'isActive');
    allBtn.dataset.id = 0;

    // Attach button "Tous" to filters section
    filtersSection.appendChild(allBtn);

    // Loop on categories
    categories.forEach(category => {
        // Create categories buttons
        let categoriesBtn = document.createElement('button');
        categoriesBtn.innerText = category.name;
        categoriesBtn.classList.add('categories-btn');

        // Get categories ID buttons
        categoriesBtn.dataset.id = category.id;

        // Attach buttons to filters section
        filtersSection.appendChild(categoriesBtn);
    })
}

getCategories();

// Listen filters buttons
function listenFiltersBtns(allWorks) {
    const filtersBtn = document.querySelectorAll('.filters .categories-btn');

    filtersBtn.forEach((button) => {
        button.addEventListener("click", (event) => {
            // Get button ID (number)
            const btnCategoryId = parseInt(event.target.dataset.id);

            // Filter list
            if (btnCategoryId === 0) {
                displayWorks(allWorks);
            } else {
                let filteredList = allWorks.filter(work => work.category.id === btnCategoryId);
                displayWorks(filteredList);
            }

            // Button style with "isActive" class
            filtersBtn.forEach(btn => {
                btn.classList.remove('isActive')
            });
            event.target.classList.add('isActive')
        });
    });
};

const loginBtn = document.getElementById('login-btn');

// Log in account user
if (localStorage.getItem("token")) {
    // Display banner "edition mode"
    const divElement = document.createElement("div");
    divElement.classList.add("banner-edition");
    const imageElement = document.createElement("img");
    imageElement.src = "./assets/icons/edition-mode-icon.png";
    const titleElement = document.createElement("p");
    titleElement.innerText = "Mode édition";
    divElement.appendChild(imageElement);
    divElement.appendChild(titleElement);
    const header = document.querySelector("header");
    document.body.insertBefore(divElement, header);

    // Replace "login" by "logout"
    loginBtn.innerText = "logout"

    // Hide filters button
    const filterClass = document.querySelector(".filters");
    filterClass.style.display = "none";

    // Display button "Modifier"
    const galleryTitle = document.querySelector(".portfolio-header");
    const divEditing = document.createElement("div");
    divEditing.classList.add("container-editing");
    const blackImage = document.createElement("img");
    blackImage.src = "./assets/icons/edition-mode-icon-black.png"
    const editingBtn = document.createElement("p");
    editingBtn.innerText = "modifier";
    divEditing.appendChild(blackImage);
    divEditing.appendChild(editingBtn);
    galleryTitle.appendChild(divEditing);
}

// Log out account user
loginBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.reload();
});