// Debounce function to prevent rapid toggling
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Check the sidebar state on page load
document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar');
    const isSidebarClosed = localStorage.getItem('sidebarClosed') === 'true';

    if (isSidebarClosed) {
        sidebar.classList.add('close');
    } else {
        sidebar.classList.remove('close');
    }

    adjustMainContentMargin();
});

// Toggle the sidebar state and save it in localStorage
const toggleSidebar = debounce(function () {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('close');

    // Save the sidebar state
    localStorage.setItem('sidebarClosed', sidebar.classList.contains('close'));

    adjustMainContentMargin();
}, 200);  // 200ms debounce delay

document.querySelector('#sidebar-toggle').addEventListener('click', toggleSidebar);

function adjustMainContentMargin() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main');

    if (sidebar.classList.contains('close')) {
        mainContent.style.marginLeft = '88px';
    } else {
        mainContent.style.marginLeft = '250px';
    }
}

adjustMainContentMargin();

document.addEventListener("scroll", function () {
    const doc = document.documentElement;
    const scrollTop = window.pageYOffset || doc.scrollTop;
    const scrollHeight = doc.scrollHeight - window.innerHeight;

    let thumbBorderRadius;

    if (scrollTop === 0) {
        thumbBorderRadius = "0 0 15px 15px";
    } else if (scrollTop >= scrollHeight) {
        thumbBorderRadius = "15px 15px 0 0";
    } else {
        thumbBorderRadius = "15px";
    }

    const styleElement = document.getElementById('scrollbar-style') || document.createElement('style');
    styleElement.id = 'scrollbar-style';
    styleElement.innerHTML = `
        body::-webkit-scrollbar-thumb {
            background-color: #888;
            border-radius: ${thumbBorderRadius};
        }
    `;
    document.head.appendChild(styleElement);
});