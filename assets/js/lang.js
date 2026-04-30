async function loadLanguage(lang) {
    const response = await fetch(`assets/i18n/${lang}.yaml`);
    const yamlText = await response.text();
    const parsed = jsyaml.load(yamlText);

    const translations = flatten(parsed);

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        el.textContent = translations[key] || key;
    });

    localStorage.setItem("lang", lang);
}

document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("lang") || "en";
    loadLanguage(saved);
});

function flatten(obj, prefix = "", res = {}) {
    for (const key in obj) {
        const value = obj[key];
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === "object" && value !== null) {
            flatten(value, newKey, res);
        } else {
            res[newKey] = value;
        }
    }
    return res;
}
