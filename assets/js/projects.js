let allProjects = [];

function getFeatured(lang) {
    const featured = allProjects.find(p => p.featured);
    if (!featured) return "";

    return `
        <div class="featured-project fade-in" id="featured-click">
            <div class="project-card">
                <h3>${featured.title[lang]}</h3>
                <p>${featured.description[lang]}</p>
                <p class="tags">
                    ${featured.tags[lang].map(tag => `<span>${tag}</span>`).join("")}
                </p>
                <a href="${featured.link}" target="_blank" class="github-link">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/github.svg"
                         alt="GitHub-icon" class="github-icon">
                </a>
            </div>
        </div>
    `;
}

async function loadProjects() {
    const container = document.getElementById("project-list");
    const lang = localStorage.getItem("lang") || "en";

    container.innerHTML = `
        <div class="project-card shimmer" style="height:120px;"></div>
        <div class="project-card shimmer" style="height:120px;"></div>
        <div class="project-card shimmer" style="height:120px;"></div>
    `;

    const response = await fetch("assets/data/projects.json");
    const projects = await response.json();
    allProjects = projects;
    allProjects.sort((a, b) => (b.featured === true) - (a.featured === true));

    const featuredContainer = document.getElementById("featured-container");
    featuredContainer.innerHTML = getFeatured(lang);

    const featuredEl = featuredContainer.querySelector(".featured-project");
    const featuredCard = featuredContainer.querySelector(".project-card");
    
    if (featuredEl) observer.observe(featuredEl);
    if (featuredCard) observer.observe(featuredCard);

    renderProjects("all", lang);
}

function renderProjects(filter, lang) {
    const container = document.getElementById("project-list");

    const filtered = allProjects.filter(p => filter === "all" ? true : p.category === filter);

    container.innerHTML = filtered.map((p, idx) => `
        <div class="project-card fade-in" data-index="${idx}">
            <h3>${p.title[lang]}</h3>
            <p>${p.description[lang]}</p>
            <p class="tags">
                ${p.tags[lang].map(tag => `<span>${tag}</span>`).join("")}
            </p>
            <a href="${p.link}" target="_blank" class="github-link">
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/github.svg
" alt="GitHub-icon" class="github-icon">
            </a>
        </div>
    `).join("");

    document.querySelectorAll(".project-card.fade-in").forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.1}s`;
        observer.observe(el);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadProjects();

    const filters = document.querySelectorAll(".project-filters button");
    filters.forEach(btn => {
        btn.addEventListener("click", () => {
            const lang = localStorage.getItem("lang") || "en";
            filters.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderProjects(btn.dataset.filter, lang);
        });
    });

    const modal = document.getElementById("projectModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalTags = document.getElementById("modalTags");
    const modalLink = document.getElementById("modalLink");
    const modalClose = document.querySelector(".modal-close");

    document.addEventListener("click", e => {
        const card = e.target.closest(".project-card");
        if (!card) return;

        const lang = localStorage.getItem("lang") || "en";
        const idx = Number(card.dataset.index);
        const p = allProjects[idx];

        modalTitle.textContent = p.title[lang];
        modalDescription.textContent = p.description[lang];
        modalTags.textContent = p.tags[lang].join(" • ");
        modalLink.href = p.link;

        modal.classList.add("open");
    });

    modalClose.addEventListener("click", () => modal.classList.remove("open"));
    modal.addEventListener("click", e => {
        if (e.target === modal) modal.classList.remove("open");
    });


    document.addEventListener("click", e => {
    if (e.target.closest("#featured-click")) {
        document.querySelector(".projects").scrollIntoView({ behavior: "smooth" });
    }
});

});


