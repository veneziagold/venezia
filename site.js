const languageButtons = document.querySelectorAll('[data-language]');
const translatedElements = document.querySelectorAll('[data-en][data-tr]');
const tabButtons = document.querySelectorAll('[data-collection]');
const tabPanels = document.querySelectorAll('[role="tabpanel"]');

function setLanguage(language) {
    document.documentElement.lang = language;

    translatedElements.forEach((element) => {
        const value = element.dataset[language];
        if (value) {
            element.textContent = value;
        }
    });

    languageButtons.forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });

    localStorage.setItem('venezia-language', language);
}

function showCollection(collectionId) {
    tabButtons.forEach((button) => {
        const isActive = button.dataset.collection === collectionId;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-selected', String(isActive));
    });

    tabPanels.forEach((panel) => {
        panel.hidden = panel.id !== collectionId;
        panel.classList.toggle('active', panel.id === collectionId);
    });
}

languageButtons.forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.language));
});

tabButtons.forEach((button) => {
    button.addEventListener('click', () => showCollection(button.dataset.collection));
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

setLanguage(localStorage.getItem('venezia-language') || 'tr');
