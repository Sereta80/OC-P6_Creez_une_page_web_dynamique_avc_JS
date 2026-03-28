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
}
init();

async function getCategories() {
    // Get categories
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();
    console.log(categories)

    // Target filters section
    const filtersSection = document.querySelector('.filters');

    // Create button "Tous"
    const allBtn = document.createElement('button');
    allBtn.innerText = "Tous";
    allBtn.classList.add('categories-btn', 'isActive');

    // Attach button "Tous" to filters section
    filtersSection.appendChild(allBtn);

    // Loop on categories
    categories.forEach(categorie => {
        // Create categories buttons
        let categoriesBtn = document.createElement('button');
        categoriesBtn.innerText = categorie.name;
        categoriesBtn.classList.add('categories-btn');

        // Get categories ID buttons
        let categoriesId = categoriesBtn.dataset.id;
        categoriesId = categorie.id;

        // Attach buttons to filters section
        filtersSection.appendChild(categoriesBtn);
    })
}

getCategories();

// Listen filters buttons
function listenFiltersBtns() {
    const filtersBtn = document.querySelectorAll('.filters button');

    filtersBtn.forEach((button, id) => {
        button.addEventListener("click", (event) => {
            const categoryId = event.target.dataset.id;
            console.log(categoryId)
        });
    });
};