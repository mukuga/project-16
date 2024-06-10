// Select elements
const select = (selector, all = false) => all ? document.querySelectorAll(selector) : document.querySelector(selector);

const sideMenu = select('aside');
const menuBtn = select('#menu-btn');
const closeBtn = select('#close-btn');
const darkMode = select('.dark-mode');
const sidebarOptions = select('.sidebar', true);
const showAllBtn = select('#show-all-btn');
const analyzeContainers = select('.analyze, .analyze1, .analyze2, .analyze3', true);
const showMoreBtn = select('#show-more-btn');
const hiddenSearches = select('.searches.hidden', true);
const showoreBtn = select('#Show-more-btn');
const iddenSearches = select('.searcheshidden1', true);
const sidebarLinks = select('.sidebar a', true);
const modal = select("#infoModal");
const btn = select("#infoIcon");
const span = select("#closeModal");
const pointer = select('#pointer');
const aboutIcon = select('#About');

// Add event listeners
const addListener = (element, event, handler) => element.addEventListener(event, handler);

addListener(menuBtn, 'click', () => sideMenu.style.display = 'block');
addListener(closeBtn, 'click', () => sideMenu.style.display = 'none');

sidebarOptions.forEach(option => addListener(option, 'click', () => {
    if (window.innerWidth <= 768) sideMenu.style.display = 'none';
}));

addListener(darkMode, 'click', () => {
    document.body.classList.toggle('dark-mode-variables');
    darkMode.querySelectorAll('span').forEach(span => span.classList.toggle('active'));
});

addListener(showAllBtn, 'click', () => {
    analyzeContainers.forEach(container => container.classList.toggle('show'));
    showAllBtn.textContent = showAllBtn.textContent === 'Show All' ? 'Show Less' : 'Show All';
});

addListener(showMoreBtn, 'click', () => {
    hiddenSearches.forEach(search => search.classList.toggle('hidden'));
    showMoreBtn.textContent = showMoreBtn.textContent === 'Show All' ? 'Show Less' : 'Show All';
});

addListener(showoreBtn, 'click', () => {
    iddenSearches.forEach(search => search.classList.toggle('searcheshidden1'));
    showoreBtn.textContent = showoreBtn.textContent === 'Show All' ? 'Show Less' : 'Show All';
});

sidebarLinks.forEach(link => addListener(link, 'click', () => {
    sidebarLinks.forEach(otherLink => otherLink.classList.remove('active'));
    link.classList.add('active');
}));

document.addEventListener("DOMContentLoaded", () => select('.sidebar').classList.add('show'));

addListener(btn, 'click', () => modal.style.display = "block");
addListener(span, 'click', () => modal.style.display = "none");
addListener(window, 'click', event => { if (event.target == modal) modal.style.display = "none"; });

const showPointer = () => {
    pointer.classList.remove('hidden');
    pointer.style.opacity = '1';
    setTimeout(() => {
        pointer.style.opacity = '0';
        setTimeout(() => pointer.classList.add('hidden'), 100);
    }, 5000);
};

addListener(select('#report-form'), 'submit', event => {
    event.preventDefault();
    const message = select('#message').value;
    const email = select('#email').value;
    emailjs.send("service_rymk9wk", "template_0hmqrv4", { message: message, email: email })
    .then(response => {
        console.log('SUCCESS!', response.status, response.text);
        select('#message-sent').classList.remove('hidden');
    })
    .catch(error => console.log('FAILED...', error));
});
