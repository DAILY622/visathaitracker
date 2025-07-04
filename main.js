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

firebase.firestore().collection("visas").get().then(snapshot => {
  const typeCounts = {};
  snapshot.forEach(doc => {
    const type = doc.data().type;
    typeCounts[type] = (typeCounts[type] || 0) + 1;
  });

const visaType = classifyVisaType(text);
document.getElementById('visaSelector').value = visaType;
function classifyVisaType(text) {
  if (/tourist/i.test(text)) return "Tourist";
  if (/education|student/i.test(text)) return "Education";
  if (/non[- ]immigrant/i.test(text)) return "Non-Immigrant";
  if (/volunteer/i.test(text)) return "Volunteer";
  return "Unknown";
}
const adminUIDs = ['YOUR_ADMIN_UID_HERE']; // already defined
const user = firebase.auth().currentUser;

if (adminUIDs.includes(user?.uid)) {
  // Allow biometric credential registration
  async function biometricLogin() {
    // existing biometric logic here
  }
} else {
  document.getElementById('biometricBtn').disabled = true;
  document.getElementById('biometricBtn').title = "Admins only";
}
document.getElementById('cameraCapture')?.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  Tesseract.recognize(file, 'eng').then(({ data: { text } }) => {
    document.getElementById('cameraOCRResult').textContent = `📸 OCR Result:\n${text}`;
    validateVisaData(text); // reuse your existing AI validator
  });
});

const map = L.map('gpsMap').setView([13.7563, 100.5018], 4); // Bangkok
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const trail = [
  { lat: 13.7563, lng: 100.5018, label: "Bangkok" },
  { lat: 25.276987, lng: 55.296249, label: "Dubai" },
  { lat: 51.5074, lng: -0.1278, label: "London" }
];

visas.forEach(v => {
  const expiry = new Date(v.expiry);
  const daysLeft = (expiry - new Date()) / (1000 * 60 * 60 * 24);

  if (v.type === "Tourist" && daysLeft < 45 && daysLeft > 30) {
    visaSuggestions.push("🧠 Optimal time to switch to Education visa is now (30–45 days before expiry).");
  }

  if (v.type === "Non-Immigrant" && daysLeft < 20 && daysLeft > 10) {
    visaSuggestions.push("🧠 Consider applying for extension or re-entry permit within the next 10 days.");
  }
});
function syncToGoogleCalendar() {
  const date = document.getElementById('appointmentDate').value;
  const time = document.getElementById('appointmentTime').value;
  const note = document.getElementById('appointmentNote').value;

  const start = new Date(`${date}T${time}`);
  const end = new Date(start.getTime() + 30 * 60000); // 30 min later

  const format = d => d.toISOString().replace(/-|:|\.\d+/g, '');
  const link = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(note)}&dates=${format(start)}/${format(end)}&details=Visa+Appointment`;

  window.open(link, '_blank');
}
let marker = L.marker([trail[0].lat, trail[0].lng]).addTo(map).bindPopup("Starting in Bangkok").openPopup();

trail.forEach((point, i) => {
  setTimeout(() => {
    marker.setLatLng([point.lat, point.lng]).setPopupContent(`✈️ ${point.label}`).openPopup();
    map.setView([point.lat, point.lng], 5);
  }, i * 3000);
});
 const visaFees = {
  "Tourist → Education": 80,
  "Tourist → Volunteer": 60,
  "Non-Immigrant → Re-entry": 38,
  "Non-Immigrant → Extension": 60
};

function saveAppointment() {
  const date = document.getElementById('appointmentDate').value;
  const time = document.getElementById('appointmentTime').value;
  const note = document.getElementById('appointmentNote').value;
  const entry = { date, time, note };
  const appointments = JSON.parse(localStorage.getItem('visaAppointments') || '[]');
  appointments.push(entry);
  localStorage.setItem('visaAppointments', JSON.stringify(appointments));
  renderAppointments();
}

firebase.firestore().collection("visas").get().then(snapshot => {
  const switchCounts = { "Tourist → Education": 0, "Tourist → Volunteer": 0, "Non-Immigrant → Extension": 0 };
  snapshot.forEach(doc => {
    const v = doc.data();
    if (v.type === "Tourist" && v.next === "Education") switchCounts["Tourist → Education"]++;
    if (v.type === "Tourist" && v.next === "Volunteer") switchCounts["Tourist → Volunteer"]++;
    if (v.type === "Non-Immigrant" && v.next === "Extension") switchCounts["Non-Immigrant → Extension"]++;
  });

function generateTrackingLink(uid) {
  return `https://yourapp.com/track?user=${uid}`;
}
const gpsTrail = [
  { lat: 13.7563, lng: 100.5018, label: "Bangkok" },
  { lat: 25.276987, lng: 55.296249, label: "Dubai" },
  { lat: 51.5074, lng: -0.1278, label: "London" }
];

gpsTrail.forEach((point, i) => {
  setTimeout(() => {
    console.log(`✈️ Simulated location: ${point.label} (${point.lat}, ${point.lng})`);
  }, i * 2000);
});
 const deliveryStages = ["Submitted", "Processing", "Approved", "Delivered"];
const deliveryList = document.getElementById('visaDeliveryList');
visas.forEach((v, i) => {
  const li = document.createElement('li');
  const stage = deliveryStages[i % deliveryStages.length];
  li.textContent = `📦 ${v.type} visa — Status: ${stage}`;
  deliveryList.appendChild(li);
});
 new Chart(document.getElementById('switchTrendChart').getContext('2d'), {
    type: 'bar',
    data: {
      labels: Object.keys(switchCounts),
      datasets: [{
        label: 'Visa Switches',
        data: Object.values(switchCounts),
        backgroundColor: '#ff9800'
      }]
    },
    options: {
      plugins: { title: { display: true, text: '📊 Visa Switching Trends (Admin)' } }
    }
  });
});
function sendVisaSwitchSuggestions() {
  const userEmail = firebase.auth().currentUser?.email;
  if (!userEmail || visaSuggestions.length === 0) return;
  emailjs.send("service_clpexr7", "template_cxs4zgj", {
    name: "Visa Tracker",
    email: userEmail,
    report: visaSuggestions.join('\n')
  });
}
function renderAppointments() {
  const list = document.getElementById('appointmentList');
  list.innerHTML = '';
  const appointments = JSON.parse(localStorage.getItem('visaAppointments') || '[]');
  appointments.forEach(a => {
    const li = document.createElement('li');
    li.textContent = `📅 ${a.date} at ${a.time} — ${a.note}`;
    list.appendChild(li);
  });
}
renderAppointments();
if (daysLeft < 30 && v.type.includes("Tourist")) {
  visaSuggestions.push(`🧠 Consider switching to Education visa ($${visaFees["Tourist → Education"]}) or Volunteer visa ($${visaFees["Tourist → Volunteer"]}).`);
}
if (daysLeft < 15 && v.type.includes("Non-Immigrant")) {
  visaSuggestions.push(`🧠 Consider Re-entry permit ($${visaFees["Non-Immigrant → Re-entry"]}) or Extension ($${visaFees["Non-Immigrant → Extension"]}).`);
}
 const ctx = document.getElementById('adminVisaTrends').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(typeCounts),
      datasets: [{
        label: 'Visa Types Across All Users',
        data: Object.values(typeCounts),
        backgroundColor: '#2196f3'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: '📊 Visa Trends (Admin)' }
      }
    }
  });
});
const showArchived = document.getElementById('showArchived').checked;
const today = new Date();
const filteredVisas = visas.filter(v => {
  const expiry = new Date(v.expiry);
  return showArchived || expiry >= today;
});
const visaExpiry = new Date(document.getElementById('visaDate').value);
const daysLeft = Math.floor((visaExpiry - new Date()) / (1000 * 60 * 60 * 24));
if (daysLeft <= 30 && daysLeft > 0) {
  document.getElementById('renewalReminder').style.display = 'block';
}
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
async function biometricLogin() {
  if (!window.PublicKeyCredential) {
    alert("❌ Biometric login not supported on this device.");
    return;
  }

validateVisaData(text);
function validateVisaData(text) {
  const issues = [];
  if (!text.includes("Thailand")) issues.push("❌ Visa does not mention Thailand.");
  if (!text.match(/\d{4}-\d{2}-\d{2}/)) issues.push("❌ No valid expiry date found.");
  if (!text.match(/Tourist|Education|Non-Immigrant/)) issues.push("❌ Visa type not recognized.");

  if (issues.length > 0) {
    alert("⚠️ Visa validation issues:\n" + issues.join('\n'));
  } else {
    alert("✅ Visa document appears valid.");
  }
}
 Tesseract.recognize(file, 'eng').then(({ data: { text } }) => {
  document.getElementById('ocrResult').textContent = `🧾 Extracted Text:\n${text}`;

  // Auto-fill visa form fields
  if (text.includes("Tourist")) document.getElementById('visaSelector').value = "Tourist";
  const dateMatch = text.match(/\d{4}-\d{2}-\d{2}/);
  if (dateMatch) document.getElementById('visaDate').value = dateMatch[0];
});
 try {
    const cred = await navigator.credentials.get({
      publicKey: {
        challenge: new Uint8Array(32),
        allowCredentials: [],
        timeout: 60000,
        userVerification: "preferred"
      }
    });
    alert("✅ Biometric login successful!");
    // You can now show the dashboard or trigger Firebase login
  } catch (err) {
    alert("❌ Biometric login failed: " + err.message);
  }
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
const visaEvents = JSON.parse(localStorage.getItem('visaEvents') || '[]');
const timelineList = document.getElementById('timelineList');
visaEvents.forEach(event => {
  const li = document.createElement('li');
  li.innerHTML = `📌 <strong>${event.date}</strong>: ${event.label}`;
  timelineList.appendChild(li);
});
const visas = JSON.parse(localStorage.getItem('visas') || '[]');
const selector = document.getElementById('visaSelector');
visas.forEach((v, i) => {
  const opt = document.createElement('option');
  opt.value = i;
  opt.textContent = `${v.type} (${v.expiry})`;
  selector.appendChild(opt);
});

selector.addEventListener('change', () => {
  const selectedVisa = visas[selector.value];
  document.getElementById('visaDate').value = selectedVisa.expiry;
  document.getElementById('visaHeader').textContent = `🛂 ${selectedVisa.type}`;
});
if (Notification.permission !== 'granted') {
  Notification.requestPermission();
}
if (daysSince > 85 && Notification.permission === 'granted') {
  new Notification("⚠️ Visa Expiry Alert", {
    body: `Your ${selectedVisa.type} visa expires in ${Math.round(90 - daysSince)} days.`,
    icon: "https://cdn-icons-png.flaticon.com/512/1828/1828665.png"
  });
}
const user = firebase.auth().currentUser;
const db = firebase.firestore();
const newVisa = {
  uid: user.uid,
  type: visaType,
  expiry: visaExpiry,
  createdAt: new Date().toISOString()
};

db.collection("visas").add(newVisa).then(() => {
  alert("✅ Visa saved to Firestore");
});
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
document.getElementById('exportVisaPDF')?.addEventListener('click', () => {
  const visas = JSON.parse(localStorage.getItem('visas') || '[]');
  if (visas.length === 0) return alert('No visa history to export.');

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text("Visa History Report", 20, 20);

  visas.forEach((v, i) => {
    doc.text(`${i + 1}. Type: ${v.type} | Expiry: ${v.expiry}`, 20, 30 + i * 10);
  });

  doc.save("visa_history.pdf");
});
const visaSuggestions = [];
visas.forEach(v => {
  const expiry = new Date(v.expiry);
  const daysLeft = (expiry - new Date()) / (1000 * 60 * 60 * 24);
  if (daysLeft < 30 && v.type.includes("Tourist")) {
    visaSuggestions.push("🧠 Consider switching to an Education or Volunteer visa.");
  }
  if (daysLeft < 15 && v.type.includes("Non-Immigrant")) {
    visaSuggestions.push("🧠 Consider applying for a re-entry permit or extension.");
  }
});

if (visaSuggestions.length > 0) {
  alert(visaSuggestions.join('\n'));
}
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('visa-tracker').then(cache => {
      return cache.addAll(['./', './index.html', './main.js']);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('✅ PWA ready'))
    .catch(err => console.error('❌ PWA failed', err));
}
setInterval(() => {
  const storedDate = localStorage.getItem('visaExpirationDate');
  if (!storedDate) return;
  const daysLeft = Math.ceil((new Date(storedDate) - new Date()) / (1000 * 60 * 60 * 24));
  if (daysLeft === 7 && Notification.permission === 'granted') {
    new Notification('📅 Visa Reminder', {
      body: 'Your visa expires in 7 days. Prepare your documents!',
      icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828665.png'
    });
  }
}, 86400000); // Check once per day
document.getElementById('ocrUpload')?.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  Tesseract.recognize(file, 'eng').then(({ data: { text } }) => {
    document.getElementById('ocrResult').textContent = `🧾 Extracted Text:\n${text}`;
  });
});
