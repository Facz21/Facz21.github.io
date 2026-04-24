const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.items_list');

hamburger.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('nav-open');
    hamburger.classList.toggle('is-active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.header_list a').forEach(function (link) {
    link.addEventListener('click', function () {
        nav.classList.remove('nav-open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});
