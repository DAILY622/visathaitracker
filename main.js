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
document.getElementById('logoutBtn').textContent = strings.logout;
document.getElementById('profileBtn').textContent = strings.profile;
document.getElementById('questsBtn').textContent = strings.quests;
document.getElementById('rewardsBtn').textContent = strings.rewards;
document.getElementById('visaHeader').textContent = strings.visaTypesHeader;

const visaList = document.getElementById('visaList');
strings.visaTypes.forEach(type => {
  const li = document.createElement('li');
  li.textContent = type;
  visaList.appendChild(li);
});
