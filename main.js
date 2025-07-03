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
// Display quests checklist
document.getElementById('questsHeader').textContent = strings.questsHeader;
const questIcons = {
  "Submit TM30": "📨",
  "Extend Tourist Visa": "📅",
  "Apply for Re-entry Permit": "🔁",
  "Report 90 Days": "🗓️",
  "Renew Visa": "♻️",
  "แจ้งที่พัก (TM30)": "📨",
  "ขอต่อวีซ่าท่องเที่ยว": "📅",
  "ขอใบอนุญาตกลับเข้าประเทศ": "🔁",
  "รายงานตัวทุก 90 วัน": "🗓️",
  "ต่ออายุวีซ่า": "♻️"
};
const saved = JSON.parse(localStorage.getItem('questsProgress') || '{}');
const total = strings.questsList.length;
let completed = 0;

strings.questsList.forEach((task, index) => {
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.style.marginRight = '0.5rem';

  // Load saved state
  checkbox.checked = saved[index] || false;
  if (checkbox.checked) completed++;

  // Save state on change
  checkbox.addEventListener('change', () => {
    saved[index] = checkbox.checked;
    localStorage.setItem('questsProgress', JSON.stringify(saved));
    updateProgress();
  });

  const icon = questIcons?.[task] || "📝";
  li.appendChild(checkbox);
  li.appendChild(document.createTextNode(`${icon} ${task}`));
  questsList.appendChild(li);
});

function updateProgress() {
  function updateProgress() {
  const saved = JSON.parse(localStorage.getItem('questsProgress') || '{}');
  const done = Object.values(saved).filter(Boolean).length;
  const percent = Math.round((done / total) * 100);

  const bar = document.getElementById('progressBar');
  const label = document.getElementById('progressLabel');

  bar.value = percent;
  label.textContent = `Progress: ${percent}%`;

  // Toggle green style when full
  if (percent === 100) {
    bar.classList.add('full');
  } else {
    bar.classList.remove('full');
  }
}
const saved = JSON.parse(localStorage.getItem('questsProgress') || '{}');
  const done = Object.values(saved).filter(Boolean).length;
  const percent = Math.round((done / total) * 100);
  document.getElementById('progressBar').value = percent;
  document.getElementById('progressLabel').textContent = `Progress: ${percent}%`;
}

// Initialize progress bar
updateProgress();
