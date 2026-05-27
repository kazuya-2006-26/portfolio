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

    function getSFIALevel(level) {
        const map = {
            1: "Follow",
            2: "Assist",
            3: "Apply",
            4: "Enable",
            5: "Ensure/Advise",
            6: "Initiate/Influence",
            7: "Set Strategy"
        };
        return map[level] || "Unknown";
    }

    function sfiaToWidth(level) {
        return (Number(level) / 7) * 100;
    }



    document.querySelectorAll(".skill").forEach(skill => {
        const label = skill.querySelector(".skill-label");
        const sfia = label.dataset.sfia;
        const bar = skill.querySelector(".bar div");

        bar.style.width = sfiaToWidth(sfia) + "%";

        skill.addEventListener("mousemove", e => {
            const name = label.dataset.name;

            tooltip.textContent = `${name} — SFIA Level ${sfia} (${getSFIALevel(sfia)})`;
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