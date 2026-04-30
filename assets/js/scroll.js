let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
});
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll("nav li");

document.addEventListener("DOMContentLoaded", () => {
    

    document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
});

function updateActiveNav() {
    let index = sections.length;

    while(--index && window.scrollY + 200 < sections[index].offsetTop) {}

    navItems.forEach(li => li.classList.remove("active"));
    navItems[index].classList.add("active");
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

document.addEventListener("DOMContentLoaded", () => {
    const scrollBtn = document.getElementById("scrollTopBtn");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add("visible");
        } else {
            scrollBtn.classList.remove("visible");
        }
    });

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const hero = document.querySelector(".hero");
    window.addEventListener("scroll", () => {
        const offset = window.scrollY * 0.2;
        hero.style.transform = `translateY(${offset}px)`;
    }, { passive: true });

});
