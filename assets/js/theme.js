function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    const btn = document.getElementById("themeToggle");
    if (!btn) return;
    
    btn.textContent = theme === "light" ? "🌙" : "☀️";
}

function toggleTheme() {
    const current = localStorage.getItem("theme") || "light";
    applyTheme(current === "light" ? "dark" : "light");
}

document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("theme") || "light";
    applyTheme(saved);
});
