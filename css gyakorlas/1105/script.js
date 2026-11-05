// Megkeressük azokat a navigációs linkeket, amelyek egy oldalon belüli részre mutatnak.
const navigaciosLinkek = document.querySelectorAll('nav a[href^="#"]');

navigaciosLinkek.forEach(function (link) {
    // A kurzor rákerül a linkre: megkeressük a hozzá tartozó kártyát.
    link.addEventListener('mouseenter', function () {
        const kartya = document.querySelector(link.getAttribute('href'));

        if (kartya) {
            kartya.classList.add('kiemelt');
        }
    });

    // A kurzor lekerül a linkről: eltávolítjuk a kiemelést.
    link.addEventListener('mouseleave', function () {
        const kartya = document.querySelector(link.getAttribute('href'));

        if (kartya) {
            kartya.classList.remove('kiemelt');
        }
    });
});
