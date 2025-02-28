const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.querySelector('.toggle-btn');
const content = document.querySelector('.content');

// Set initial state of sidebar based on screen size.
function setInitialState() {
    if (window.innerWidth <= 768) {
        sidebar.classList.add('hidden');
        content.classList.add('full');
        toggleBtn.textContent = '▼';
    } else {
        sidebar.classList.remove('hidden');
        content.classList.remove('full');
        toggleBtn.textContent = '▶';
    }
}

window.addEventListener('load', setInitialState);

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
    content.classList.toggle('full');

    // Change arrow based on device screen width.
    if (window.innerWidth <= 768) {
        toggleBtn.textContent = sidebar.classList.contains('hidden') ? '▼' : '▲';
    } else {
        toggleBtn.textContent = sidebar.classList.contains('hidden') ? '▶' : '◀';
    }
});

// Update arrow when window is resized.
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        if (!sidebar.classList.contains('hidden')) {
            toggleBtn.textContent = '▲';
        } else {
            toggleBtn.textContent = '▼';;
        }
    } else {
        if (!sidebar.classList.contains('hidden')) {
            toggleBtn.textContent = '◀';
        } else {
            toggleBtn.textContent = '▶';
        }
    }
});