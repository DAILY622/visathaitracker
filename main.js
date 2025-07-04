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
document.getElementById('profileEmail').textContent = `📧 Email: ${user.email}`;
document.getElementById('profileUID').textContent = `🆔 UID: ${user.uid}`;

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
const db = firebase.firestore();
db.collection("tm30").add({
  uid: uid,
  label: label,
  date: submissionDate,
  uploadedAt: timestamp,
  file: url,
  notes: notes
});
localStorage.setItem('lastReportSent', new Date().toISOString());
function login() {
  const email = document.getElementById('authEmail').value;
  const pass = document.getElementById('authPassword').value;
  firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(() => alert("✅ Logged in"))
    .catch(err => alert("❌ Login failed: " + err.message));
}

function signup() {
  const email = document.getElementById('authEmail').value;
  const pass = document.getElementById('authPassword').value;
  firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then(() => alert("✅ Account created"))
    .catch(err => alert("❌ Signup failed: " + err.message));
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('welcome').textContent = `👋 Welcome, ${user.email}`;
  } else {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('authSection').style.display = 'block';
  }
});
function resetPassword() {
  const email = document.getElementById('authEmail').value;
  if (!email) {
    document.getElementById('authMessage').textContent = "Please enter your email to reset password.";
    return;
  }
  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      document.getElementById('authMessage').style.color = 'green';
      document.getElementById('authMessage').textContent = "📧 Password reset email sent!";
    })
    .catch(err => {
      document.getElementById('authMessage').style.color = 'red';
      document.getElementById('authMessage').textContent = "❌ " + err.message;
    });
}
const user = firebase.auth().currentUser;
const uid = user ? user.uid : 'guest';
const historyKey = `tm30History_${uid}`;
const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
history.push({ label, date: submissionDate, uploadedAt: timestamp, file: url, notes });
localStorage.setItem(historyKey, JSON.stringify(history));
const user = firebase.auth().currentUser;
const uid = user ? user.uid : 'guest';
const historyKey = `tm30History_${uid}`;
const historyData = JSON.parse(localStorage.getItem(historyKey) || '[]');
function login() {
  const email = document.getElementById('authEmail').value;
  const pass = document.getElementById('authPassword').value;
  firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(() => {
      document.getElementById('authMessage').textContent = "";
    })
    .catch(err => {
      document.getElementById('authMessage').style.color = 'red';
      document.getElementById('authMessage').textContent = "❌ " + err.message;
    });
}

function signup() {
  const email = document.getElementById('authEmail').value;
  const pass = document.getElementById('authPassword').value;
  firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then(() => {
      document.getElementById('authMessage').textContent = "";
    })
    .catch(err => {
      document.getElementById('authMessage').style.color = 'red';
      document.getElementById('authMessage').textContent = "❌ " + err.message;
    });
}
function signup() {
  const email = document.getElementById('authEmail').value;
  const pass = document.getElementById('authPassword').value;
  firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then(userCredential => {
      userCredential.user.sendEmailVerification();
      document.getElementById('authMessage').style.color = 'green';
      document.getElementById('authMessage').textContent = "✅ Account created. Please verify your email before logging in.";
      firebase.auth().signOut();
    })
    .catch(err => {
      document.getElementById('authMessage').style.color = 'red';
      document.getElementById('authMessage').textContent = "❌ " + err.message;
    });
}
firebase.auth().onAuthStateChanged(user => {
  if (user && user.emailVerified) {
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('welcome').textContent = `👋 Welcome, ${user.email}`;
  } else {
    firebase.auth().signOut();
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('authSection').style.display = 'block';
    document.getElementById('authMessage').style.color = 'red';
    document.getElementById('authMessage').textContent = "📧 Please verify your email before logging in.";
  }
});
const adminUIDs = ['YOUR_ADMIN_UID_HERE']; // Replace with your Firebase UID
if (user.emailVerified) {
  const isAdmin = adminUIDs.includes(user.uid);
  document.getElementById('dashboard').style.display = 'block';
  document.getElementById('authSection').style.display = 'none';
  document.getElementById('welcome').textContent = `👋 Welcome, ${user.email}${isAdmin ? ' (Admin)' : ''}`;
  if (isAdmin) {
    document.body.classList.add('admin');
  }
}
document.getElementById('totalSubmissions').textContent = `Total Submissions: ${historyData.length}`;
if (historyData.length > 0) {
  const last = historyData[historyData.length - 1];
  document.getElementById('lastSubmission').textContent = `Last Submission: ${last.date}`;
}
const docRef = await firebase.firestore().collection("tm30").add({
  uid: uid,
  label: label,
  date: submissionDate,
  uploadedAt: timestamp,
  file: url,
  notes: notes
});
console.log("Saved with ID:", docRef.id);
// To delete
firebase.firestore().collection("tm30").doc(docId).delete();

// To update
firebase.firestore().collection("tm30").doc(docId).update({
  label: "Updated Label",
  notes: "Updated Notes"
});
Add role-based access, TM30 analytics, and Firestore edit/delete
if (isAdmin) {
  document.getElementById('adminPanel').style.display = 'block';
  const adminList = document.getElementById('adminFirestoreList');
  firebase.firestore().collection("tm30").get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      const li = document.createElement('li');
      li.innerHTML = `📧 ${data.uid}<br>📅 ${data.date}<br>🏷️ ${data.label}<br>📝 ${data.notes || '—'}<br><a href="${data.file}" target="_blank">🔗 View</a>`;
      adminList.appendChild(li);
    });
  });
}
document.getElementById('exportFirestoreCSV')?.addEventListener('click', () => {
  firebase.firestore().collection("tm30").get().then(snapshot => {
    const csv = ['UID,Label,Date,Uploaded At,Notes,File'];
    snapshot.forEach(doc => {
      const d = doc.data();
      csv.push(`"${d.uid}","${d.label}","${d.date}","${d.uploadedAt}","${d.notes || ''}","${d.file}"`);
    });
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tm30_firestore.csv';
    a.click();
    URL.revokeObjectURL(url);
  });
});
function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      alert("✅ Signed in as " + result.user.email);
    })
    .catch(err => {
      document.getElementById('authMessage').textContent = "❌ " + err.message;
    });
}
function filterAdminData() {
  const uidFilter = document.getElementById('filterUID').value.trim();
  const dateFilter = document.getElementById('filterDate').value;
  const adminList = document.getElementById('adminFirestoreList');
  adminList.innerHTML = '';

  firebase.firestore().collection("tm30").get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      const matchUID = !uidFilter || data.uid.includes(uidFilter);
      const matchDate = !dateFilter || data.date === dateFilter;
      if (matchUID && matchDate) {
        const li = document.createElement('li');
        li.innerHTML = `📧 ${data.uid}<br>📅 ${data.date}<br>🏷️ ${data.label}<br>📝 ${data.notes || '—'}<br><a href="${data.file}" target="_blank">🔗 View</a>`;
        adminList.appendChild(li);
      }
    });
  });
}
if (adminUIDs.includes(firebase.auth().currentUser.uid)) {
  new Notification("📥 New TM30 Submission", {
    body: `Label: ${label || '—'} | Date: ${submissionDate}`,
    icon: "https://cdn-icons-png.flaticon.com/512/1828/1828665.png"
  });
}
const dates = historyData.map(e => e.date);
const counts = {};
dates.forEach(d => counts[d] = (counts[d] || 0) + 1);

const ctx = document.getElementById('tm30Chart').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: Object.keys(counts),
    datasets: [{
      label: 'TM30 Submissions',
      data: Object.values(counts),
      backgroundColor: '#4caf50'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: '📊 TM30 Submission Trends' }
    }
  }
});
const cal = new CalHeatmap();
const dateCounts = {};
historyData.forEach(entry => {
  const ts = new Date(entry.date).setHours(0, 0, 0, 0) / 1000;
  dateCounts[ts] = (dateCounts[ts] || 0) + 1;
});
cal.paint({
  itemSelector: "#cal-heatmap",
  domain: "month",
  subDomain: "day",
  data: { source: dateCounts, type: "json" },
  range: 3,
  legend: [1, 2, 3, 5],
});
const lastSummary = localStorage.getItem('lastAdminSummary');
const now = new Date();
const week = 1000 * 60 * 60 * 24 * 7;

if (isAdmin && (!lastSummary || now - new Date(lastSummary) > week)) {
  alert("📤 Time to send your weekly TM30 summary!");
  localStorage.setItem('lastAdminSummary', now.toISOString());
}
const overdue = historyData.filter(entry => {
  const daysSince = (new Date() - new Date(entry.date)) / (1000 * 60 * 60 * 24);
  return daysSince > 90;
});

if (overdue.length > 0) {
  const overdueList = overdue.map(e => `• ${e.label || '—'} (${e.date})`).join('\n');
  alert(`⚠️ Overdue TM30s:\n${overdueList}`);
}
const visaTypes = JSON.parse(localStorage.getItem('visaTypes') || '[]');
const typeCounts = {};
visaTypes.forEach(type => {
  typeCounts[type] = (typeCounts[type] || 0) + 1;
});

const ctx2 = document.getElementById('visaTypeChart').getContext('2d');
new Chart(ctx2, {
  type: 'pie',
  data: {
    labels: Object.keys(typeCounts),
    datasets: [{
      label: 'Visa Types',
      data: Object.values(typeCounts),
      backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#e91e63']
    }]
  },
  options: {
    responsive: true,
    plugins: {
      title: { display: true, text: '📈 Visa Type Distribution' }
    }
  }
});
if (overdue.length > 0) {
  const overdueList = overdue.map(e => `• ${e.label || '—'} (${e.date})`).join('\n');
  const userEmail = document.getElementById('userEmail')?.value || firebase.auth().currentUser?.email;

  emailjs.send("service_clpexr7", "template_cxs4zgj", {
    name: "Visa Tracker",
    email: userEmail,
    report: `⚠️ Overdue TM30s:\n${overdueList}`
  });
}
const suggestions = [];
const lastEntry = historyData[historyData.length - 1];
if (lastEntry) {
  const daysSince = (new Date() - new Date(lastEntry.date)) / (1000 * 60 * 60 * 24);
  if (daysSince > 80 && daysSince < 90) {
    suggestions.push("🧠 Suggestion: Prepare for 90-day report soon.");
  }
  if (daysSince > 180) {
    suggestions.push("🧠 Suggestion: Consider visa extension or re-entry permit.");
  }
}

if (suggestions.length > 0) {
  alert(suggestions.join('\n'));
}
