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

strings.questsList.forEach((task, index) => {
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.style.marginRight = '0.5rem';

  checkbox.checked = saved[index] || false;
updateProgress();
checkTM30Reminder();

checkbox.addEventListener('change', () => {
  saved[index] = checkbox.checked;
  localStorage.setItem('questsProgress', JSON.stringify(saved));
  checkTM30Reminder();
});

  const icon = questIcons[task] || "📝";
  li.appendChild(checkbox);
  li.appendChild(document.createTextNode(`${icon} ${task}`));
  questsList.appendChild(li);
});

function updateProgress() {
  const saved = JSON.parse(localStorage.getItem('questsProgress') || '{}');
  const done = Object.values(saved).filter(Boolean).length;
  const percent = Math.round((done / total) * 100);

  const bar = document.getElementById('progressBar');
  const label = document.getElementById('progressLabel');

  bar.value = percent;
  label.textContent = `Progress: ${percent}%`;

  if (percent === 100) {
    bar.classList.add('full');
  } else {
    bar.classList.remove('full');
    
function updateProgress() {
  const saved = JSON.parse(localStorage.getItem('questsProgress') || '{}');
  const done = Object.values(saved).filter(Boolean).length;
  const total = strings.questsList.length;
  const percent = Math.round((done / total) * 100);

  const bar = document.getElementById('progressBar');
  const label = document.getElementById('progressLabel');

  if (bar && label) {
    bar.value = percent;
    label.textContent = `Progress: ${percent}%`;

    if (percent === 100) {
      bar.classList.add('full');
    } else {
      bar.classList.remove('full');
    }
  }
}
function checkTM30Reminder() {
  const saved = JSON.parse(localStorage.getItem('questsProgress') || '{}');
  const tm30Index = strings.questsList.findIndex(task =>
    task.includes('TM30') || task.includes('แจ้งที่พัก')
  );

  const reminder = document.getElementById('tm30Reminder');
  if (tm30Index !== -1 && !saved[tm30Index]) {
    reminder.style.display = 'block';
  } else {
    reminder.style.display = 'none';
  }
}
 updateProgress(); 
});
checkTM30Reminder();

function showVisaCountdown() {
  const storedDate = localStorage.getItem('visaExpirationDate');
  const expirationDate = storedDate ? new Date(storedDate) : null;
  const today = new Date();

  const daysLeftEl = document.getElementById('daysLeft');
  const dateInput = document.getElementById('visaDate');
  const warning = document.getElementById('visaWarning');
  const sound = document.getElementById('warningSound');

  if (expirationDate) {
    const diffTime = expirationDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    daysLeftEl.textContent = diffDays >= 0 ? diffDays : 'Expired';
    dateInput.value = expirationDate.toISOString().split('T')[0];

   if (diffDays >= 0 && diffDays <= 7) {
  if (!warning.classList.contains('pulse')) {
    warning.classList.add('pulse');
    sound?.play().catch(() => {});

    // Send browser notification
    if (Notification.permission === 'granted') {
      new Notification('⚠️ Visa Expiry Alert', {
        body: `Your visa expires in ${diffDays} day${diffDays === 1 ? '' : 's'}.`,
        icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828665.png'
      });
    }
  }
  warning.style.display = 'block';
} 
  } else {
    daysLeftEl.textContent = '--';
    warning.style.display = 'none';
  }

  dateInput.addEventListener('change', () => {
    localStorage.setItem('visaExpirationDate', dateInput.value);
    showVisaCountdown();
  });
}

showVisaCountdown();
function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
}
requestNotificationPermission();
function showTab(tabName) {
  document.querySelectorAll('.tabSection').forEach(section => {
    section.style.display = 'none';
  });
  const active = document.getElementById(`tab-${tabName}`);
  if (active) active.style.display = 'block';
  localStorage.setItem('activeTab', tabName);
}

  .tabBtn {
  background: #eee;
  border: none;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.tabBtn:hover {
  background: #ddd;
}

.tabSection {
  margin-top: 1rem;
}
document.getElementById('tm30Form')?.addEventListener('submit', async function (e) {
  e.preventDefault();
  const fileInput = document.getElementById('tm30File');
  const status = document.getElementById('tm30Status');

  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const storageRef = firebase.storage().ref(`tm30/${file.name}`);
    try {
      await storageRef.put(file);
      const url = await storageRef.getDownloadURL();
      localStorage.setItem('tm30Uploaded', 'true');
      localStorage.setItem('tm30URL', url);
      status.textContent = '✅ TM30 uploaded successfully!';
      status.style.display = 'block';
    } catch (err) {
      status.textContent = '❌ Upload failed. Please try again.';
      status.style.color = 'red';
      status.style.display = 'block';
    }
  }
});
