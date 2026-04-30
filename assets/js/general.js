document.addEventListener("DOMContentLoaded", () => {
    const el = document.getElementById("last-updated");
    const date = new Date(document.lastModified);
    el.textContent = `Last updated: ${date.toLocaleDateString()}`;

    document.querySelectorAll("nav li").forEach(item => {
        item.addEventListener("click", () => {
            const target = item.dataset.target;
            if (!target) return;

            document.getElementById(target).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
});

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});