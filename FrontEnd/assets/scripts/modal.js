const editingBtn = document.querySelector('.container-editing');
const modal = document.querySelector('.modal-bg');

// Open modal
editingBtn.addEventListener("click", (event) => {
    modal.style.display = "block";
});
