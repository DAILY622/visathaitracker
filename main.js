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
const notes = document.getElementById('tm30Notes').value;
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

  if ('Notification' in window && Notification.permission !== 'granted') {
  Notification.requestPermission();
}
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
const label = document.getElementById('tm30Label').value;
 const fileInput = document.getElementById('tm30File');
  const status = document.getElementById('tm30Status');

  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const storageRef = firebase.storage().ref(`tm30/${file.name}`);
    try {
     const timestamp = new Date().toLocaleString();
localStorage.setItem('tm30Timestamp', timestamp);
document.getElementById('tm30Time').textContent = `${strings.lastUploaded}: ${timestamp}`;
 await storageRef.put(file);
      const url = await storageRef.getDownloadURL();

      localStorage.setItem('tm30Uploaded', 'true');
      localStorage.setItem('tm30URL', url);

      document.getElementById('tm30Link').href = url;
      document.getElementById('tm30Preview').style.display = 'block';

      status.textContent = strings.uploadSuccess;
      status.style.display = 'block';
    } catch (err) {
      status.textContent = '❌ Upload failed. Please try again.';
      status.style.color = 'red';
      status.style.display = 'block';
    }
  }
});
const savedURL = localStorage.getItem('tm30URL');
if (savedURL) {
  document.getElementById('tm30Link').href = savedURL;
  document.getElementById('tm30Preview').style.display = 'block';
document.getElementById('downloadTM30').href = savedURL;
}
const savedTime = localStorage.getItem('tm30Timestamp');
if (savedTime) {
  document.getElementById('tm30Time').textContent = `${strings.lastUploaded}: ${savedTime}`;
}
if (savedTime) {
  document.getElementById('tm30Time').textContent = `${strings.lastUploaded}: ${savedTime}`;

  const lastDate = new Date(savedTime);
  const now = new Date();
  const diffDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));

  if (diffDays >= 90) {
  const reminder = document.createElement('p');
  reminder.textContent = strings.reminder90;
  reminder.style.color = 'red';
  reminder.style.fontWeight = 'bold';
  document.getElementById('tm30Preview').appendChild(reminder);
  }
}
document.getElementById('deleteTM30')?.addEventListener('click', async () => {
  const url = localStorage.getItem('tm30URL');
  if (!url) return;
document.getElementById('clearHistory')?.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear all TM30 history?')) {
    localStorage.removeItem('tm30History');
    document.getElementById('historyList').innerHTML = ''
  }
});
document.getElementById('exportCSV')?.addEventListener('click', () => {
  const history = JSON.parse(localStorage.getItem('tm30History') || '[]');
  if (history.length === 0) return alert('No history to export.');

  const csv = ['Label,Submission Date,Uploaded At,File URL'];
  history.forEach(entry => {
    const row = `"${entry.label || ''}","${entry.date}","${entry.uploadedAt}","${entry.file}"`;
    csv.push(row);
  history.push({ label, date: submissionDate, uploadedAt: timestamp, file: url, notes });
});

  const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'tm30_history.csv';
  a.click();
  URL.revokeObjectURL(url);
});

  try {
    if ('Notification' in window && Notification.permission === 'granted') {
  new Notification('📅 TM30 Reminder Set', {
    const history = JSON.parse(localStorage.getItem('tm30History') || '[]');
localStorage.setItem('tm30History', JSON.stringify(history));
body: 'We’ll remind you to re-submit in 90 days.',
    icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828665.png'
  });
}
const filePath = decodeURIComponent(new URL(url).pathname.split('/o/')[1].split('?')[0]);
    const storageRef = firebase.storage().ref().child(filePath);
    await storageRef.delete();

    localStorage.removeItem('tm30URL');
    localStorage.removeItem('tm30Uploaded');
    localStorage.removeItem('tm30Timestamp');

    document.getElementById('tm30Preview').style.display = 'none';
    document.getElementById('tm30Status').textContent = strings.deleteSuccess;
    document.getElementById('tm30Status').style.color = 'gray';
    document.getElementById('tm30Status').style.display = 'block';
 } catch (err) {
    document.getElementById('tm30Status').textContent = strings.deleteFail;
    document.getElementById('tm30Status').style.color = 'red';
    document.getElementById('tm30Status').style.display = 'block';
  }
});
document.getElementById('printTM30')?.addEventListener('click', () => {
  const url = localStorage.getItem('tm30URL');
  const date = localStorage.getItem('tm30Date');
  const time = localStorage.getItem('tm30Timestamp');

  const summary = `
${strings.summaryTitle}\n
----------------------------\n
${strings.submissionDate}: ${date || 'N/A'}\n
${strings.uploadedAt}: ${time || 'N/A'}\n
${strings.fileURL}: ${url || 'N/A'}\n
`;
  const printWindow = window.open('', '', 'width=600,height=400');
  printWindow.document.write(`<pre>${summary}</pre>`);
  printWindow.document.close();
  printWindow.print();
});
const historyList = document.getElementById('historyList');
const historyData = JSON.parse(localStorage.getItem('tm30History') || '[]');
historyData.forEach(entry => {
  const calendarList = document.getElementById('calendarList');
historyData.forEach(entry => {
  const item = document.createElement('li');
  item.textContent = `📌 ${entry.date} — ${entry.label || 'No label'}`;
  calendarList.appendChild(item);
});
const li = document.createElement('li');
  li.innerHTML = `📅 ${strings.submissionDate}: ${entry.date}<br>🕒 ${strings.uploadedAt}: ${entry.uploadedAt}<br><a href="${entry.file}" target="_blank">🔗 View File</a>`;
  li.style.marginBottom = '1rem';
  historyList.appendChild(li);
});
history.push({ label, date: submissionDate, uploadedAt: timestamp, file: url, notes });
li.innerHTML = `
  🏷️ ${entry.label || '—'}<br>
  📅 ${strings.submissionDate}: ${entry.date}<br>
  🕒 ${strings.uploadedAt}: ${entry.uploadedAt}<br>
  📝 ${entry.notes || '—'}<br>
  <a href="${entry.file}" target="_blank">🔗 View File</a>
`;
document.getElementById('downloadReport')?.addEventListener('click', () => {
  const history = JSON.parse(localStorage.getItem('tm30History') || '[]');
  if (history.length === 0) return alert('No history to export.');

  let report = 'TM30 Submission Report\n\n';
  history.forEach((entry, i) => {
    report += `#${i + 1}\n`;
    report += `Label: ${entry.label || '—'}\n`;
    report += `Submission Date: ${entry.date}\n`;
    report += `Uploaded At: ${entry.uploadedAt}\n`;
    report += `Notes: ${entry.notes || '—'}\n`;
    report += `File: ${entry.file}\n\n`;
  });

  const blob = new Blob([report], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'tm30_report.txt';
  a.click();
  URL.revokeObjectURL(url);
});
document.getElementById('emailReport')?.addEventListener('click', () => {
  const history = JSON.parse(localStorage.getItem('tm30History') || '[]');
  if (history.length === 0) return alert('No history to email.');

  let report = '';
  history.forEach((entry, i) => {
    report += `#${i + 1}\n`;
    report += `Label: ${entry.label || '—'}\n`;
    report += `Submission Date: ${entry.date}\n`;
    report += `Uploaded At: ${entry.uploadedAt}\n`;
    report += `Notes: ${entry.notes || '—'}\n`;
    report += `Files:\n${(entry.files || [entry.file]).join('\n')}\n\n`;
  });

 const userEmail = document.getElementById('userEmail').value;

emailjs.send("service_clpexr7", "template_cxs4zgj", {
  name: "Visa Tracker",
  email: userEmail,
  report: report
});
const lastSent = localStorage.getItem('lastReportSent');
const now = new Date();
if (!lastSent || new Date(lastSent).getMonth() !== now.getMonth()) {
  alert("📧 It's time to send your monthly TM30 report!");
}
localStorage.setItem('lastReportSent', new Date().toISOString());
