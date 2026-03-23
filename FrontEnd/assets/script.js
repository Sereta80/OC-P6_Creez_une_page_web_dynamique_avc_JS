// Get project datas
async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    const datas = await response.json();
    console.log(datas);

    datas.forEach(project => {
        console.log(project.title);
        console.log(project.imageUrl);
        console.log(project.category.name);

        // Create figure tag
        const projectElement = document.createElement("figure");

        // Create image element
        const imgElement = document.createElement("img");
        imgElement.src = project.imageUrl;

        // Create title element
        const titleElement = document.createElement("figcaption");
        titleElement.innerText = project.title;

        // Create category element
        // const categoryElement = document.createElement("p");
        // categoryElement.innerText = `Catégorie : ${project.category.name}`;

        // Attach elements to figure tag
        projectElement.appendChild(imgElement);
        projectElement.appendChild(titleElement);
        // projectElement.appendChild(categoryElement);

        // Attach figure tag to gallery class
        const galleryClass = document.querySelector(".gallery")
        galleryClass.appendChild(projectElement);

    });
}

getWorks();