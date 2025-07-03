import en from './lang/en.js';
import th from './lang/th.js';

const lang = localStorage.getItem('lang') || 'en';
const strings = lang === 'th' ? th : en;

document.getElementById('welcome').textContent = strings.welcome;
document.getElementById('loginBtn').textContent = strings.login;

window.switchLang = function (lang) {
  localStorage.setItem('lang', lang);
  location.reload();
};
