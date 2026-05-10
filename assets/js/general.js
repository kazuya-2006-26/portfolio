document.addEventListener("DOMContentLoaded", () => {
    const el = document.getElementById("last-updated");
    const date = new Date(document.lastModified);
    const tooltip = document.getElementById("skillTooltip");
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

    function getSkillLevel(score) {
        score = Number(score);

        if (score < 20) return "Beginner";
        if (score < 40) return "Early Intermediate";
        if (score < 60) return "Intermediate";
        if (score < 75) return "Advanced";
        if (score < 90) return "Expert";
        return "Specialist";
    }


    document.querySelectorAll(".skill").forEach(skill => {
        skill.addEventListener("mousemove", e => {
            const label = skill.querySelector(".skill-label");
            const name = label.dataset.name;
            const score = label.dataset.score;

            tooltip.textContent = `${name} — ${score}% (${getSkillLevel(score)})`;
            tooltip.style.left = e.pageX + 12 + "px";
            tooltip.style.top = e.pageY + 12 + "px";
            tooltip.style.opacity = 1;
        });

        skill.addEventListener("mouseleave", () => {
            tooltip.style.opacity = 0;
        });
    });
});

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});