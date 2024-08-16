document.addEventListener('DOMContentLoaded', translatePage);

window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});

function translatePage() {
  const preferredLanguages = navigator.languages || [navigator.language || navigator.userLanguage];
  const primaryLanguage = preferredLanguages[0].toLowerCase();

  updateSpinnerText(primaryLanguage); // Update spinner text before translation starts
  loadGoogleTranslate(); // Always load Google Translate
}

function loadGoogleTranslate() {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.onload = function() {
    console.log("Google Translate loaded successfully");
    hideLoadingSpinner();
  };
  script.onerror = function() {
    console.error("Failed to load Google Translate.");
    hideLoadingSpinner(); // Hide spinner even if loading fails
  };
  document.body.appendChild(script);
}

function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'en,fr,es,de,it,pt,zh,ru,jp',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}

function hideLoadingSpinner() {
  const spinner = document.getElementById('loading-spinner');
  if (spinner) {
    spinner.style.display = 'none'; // Hide the spinner
  }
}

function updateSpinnerText(language) {
  const spinnerText = {
    en: "Translating...",
    fr: "Traduction...",
    es: "Traduciendo...",
    de: "Übersetzen...",
    it: "Traducendo...",
    pt: "Traduzindo...",
    zh: "翻译中...",
    ru: "Перевод..."
  };

  const spinnerElement = document.getElementById('loading-spinner');
  if (spinnerElement) {
    const textElement = spinnerElement.querySelector('p');
    if (textElement) {
      textElement.textContent = spinnerText[language] || "Translating..."; // Fallback to English if the language isn't found
    }
  }
}
