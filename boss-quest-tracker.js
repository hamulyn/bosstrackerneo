// ===== TAB SWITCHING =====
document.querySelectorAll('.nav-tab').forEach(tab => {
  tab.addEventListener('click', function() {
    const tabName = this.dataset.tab;
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    this.classList.add('active');
    document.getElementById(tabName + '-tab').classList.add('active');
  });
});

// ===== BOSS DATA =====
const silverfrostData = {
  1: [{time:'0:00',boss:'Frostscale',color:'frostscale'},{time:'1:00',boss:'Raging Yeti',color:'golden'},{time:'1:25',boss:'Primeval',color:'primeval'},{time:'2:54',boss:'Frostscale',color:'frostscale'},{time:'4:28',boss:'Skypetal',color:'skypetal'},{time:'5:55',boss:'Frostscale',color:'frostscale'},{time:'7:21',boss:'Skypetal',color:'skypetal'},{time:'8:56',boss:'Primeval',color:'primeval'},{time:'10:29',boss:'Primeval',color:'primeval'},{time:'11:59',boss:'Frostscale',color:'frostscale'},{time:'13:25',boss:'Frostscale',color:'frostscale'},{time:'14:56',boss:'Primeval',color:'primeval'},{time:'16:00',boss:'Raging Yeti',color:'golden'},{time:'16:24',boss:'Primeval',color:'primeval'},{time:'17:52',boss:'Skypetal',color:'skypetal'},{time:'19:00',boss:'Raging Yeti',color:'golden'},{time:'19:26',boss:'Skypetal',color:'skypetal'},{time:'20:52',boss:'Primeval',color:'primeval'},{time:'22:00',boss:'Raging Yeti',color:'golden'},{time:'22:22',boss:'Frostscale',color:'frostscale'},{time:'23:56',boss:'Skypetal',color:'skypetal'}],
  2: [{time:'1:00',boss:'Raging Yeti',color:'golden'},{time:'1:02',boss:'Skypetal',color:'skypetal'},{time:'2:34',boss:'Primeval',color:'primeval'},{time:'4:08',boss:'Frostscale',color:'frostscale'},{time:'5:36',boss:'Skypetal',color:'skypetal'},{time:'7:06',boss:'Frostscale',color:'frostscale'},{time:'8:39',boss:'Primeval',color:'primeval'},{time:'10:12',boss:'Skypetal',color:'skypetal'},{time:'11:46',boss:'Skypetal',color:'skypetal'},{time:'13:12',boss:'Frostscale',color:'frostscale'},{time:'14:40',boss:'Primeval',color:'primeval'},{time:'16:00',boss:'Raging Yeti',color:'golden'},{time:'19:00',boss:'Raging Yeti',color:'golden'},{time:'22:00',boss:'Raging Yeti',color:'golden'}],
  3: [{time:'1:00',boss:'Raging Yeti',color:'golden'},{time:'11:39',boss:'Frostscale',color:'frostscale'},{time:'13:06',boss:'Frostscale',color:'frostscale'},{time:'14:41',boss:'Primeval',color:'primeval'},{time:'16:00',boss:'Raging Yeti',color:'golden'},{time:'16:07',boss:'Skypetal',color:'skypetal'},{time:'17:34',boss:'Frostscale',color:'frostscale'},{time:'18:59',boss:'Frostscale',color:'frostscale'},{time:'19:00',boss:'Raging Yeti',color:'golden'},{time:'20:34',boss:'Frostscale',color:'frostscale'},{time:'22:00',boss:'Raging Yeti',color:'golden'},{time:'22:07',boss:'Skypetal',color:'skypetal'},{time:'23:06',boss:'Skypetal',color:'skypetal'}],
  4: [{time:'1:00',boss:'Raging Yeti',color:'golden'},{time:'1:01',boss:'Primeval',color:'primeval'},{time:'2:36',boss:'Primeval',color:'primeval'},{time:'3:58',boss:'Primeval',color:'primeval'},{time:'5:24',boss:'Skypetal',color:'skypetal'},{time:'6:55',boss:'Skypetal',color:'skypetal'},{time:'8:24',boss:'Primeval',color:'primeval'},{time:'9:54',boss:'Primeval',color:'primeval'},{time:'11:25',boss:'Primeval',color:'primeval'},{time:'13:00',boss:'Primeval',color:'primeval'},{time:'14:29',boss:'Skypetal',color:'skypetal'},{time:'15:54',boss:'Frostscale',color:'frostscale'},{time:'16:00',boss:'Raging Yeti',color:'golden'},{time:'17:25',boss:'Primeval',color:'primeval'},{time:'18:55',boss:'Skypetal',color:'skypetal'},{time:'19:00',boss:'Raging Yeti',color:'golden'},{time:'20:24',boss:'Frostscale',color:'frostscale'},{time:'21:59',boss:'Skypetal',color:'skypetal'},{time:'22:00',boss:'Raging Yeti',color:'golden'},{time:'23:25',boss:'Frostscale',color:'frostscale'}],
  5: [{time:'0:00',boss:'Skypetal',color:'skypetal'},{time:'1:00',boss:'Raging Yeti',color:'golden'},{time:'1:32',boss:'Frostscale',color:'frostscale'},{time:'3:04',boss:'Primeval',color:'primeval'},{time:'4:37',boss:'Primeval',color:'primeval'},{time:'6:09',boss:'Primeval',color:'primeval'},{time:'7:35',boss:'Frostscale',color:'frostscale'},{time:'9:06',boss:'Skypetal',color:'skypetal'},{time:'10:37',boss:'Primeval',color:'primeval'},{time:'12:04',boss:'Frostscale',color:'frostscale'},{time:'13:38',boss:'Skypetal',color:'skypetal'},{time:'15:06',boss:'Primeval',color:'primeval'},{time:'16:00',boss:'Raging Yeti',color:'golden'},{time:'16:33',boss:'Frostscale',color:'frostscale'},{time:'17:58',boss:'Skypetal',color:'skypetal'},{time:'19:00',boss:'Raging Yeti',color:'golden'},{time:'19:33',boss:'Skypetal',color:'skypetal'},{time:'21:07',boss:'Frostscale',color:'frostscale'},{time:'22:00',boss:'Raging Yeti',color:'golden'},{time:'22:39',boss:'Skypetal',color:'skypetal'}],
  6: [{time:'0:00',boss:'Skypetal',color:'skypetal'},{time:'1:00',boss:'Raging Yeti',color:'golden'},{time:'1:26',boss:'Skypetal',color:'skypetal'},{time:'2:53',boss:'Frostscale',color:'frostscale'},{time:'4:19',boss:'Primeval',color:'primeval'},{time:'5:46',boss:'Primeval',color:'primeval'},{time:'7:13',boss:'Frostscale',color:'frostscale'},{time:'8:40',boss:'Frostscale',color:'frostscale'},{time:'10:05',boss:'Frostscale',color:'frostscale'},{time:'11:37',boss:'Primeval',color:'primeval'},{time:'13:04',boss:'Skypetal',color:'skypetal'},{time:'14:38',boss:'Frostscale',color:'frostscale'},{time:'16:00',boss:'Raging Yeti',color:'golden'},{time:'16:03',boss:'Frostscale',color:'frostscale'},{time:'17:36',boss:'Frostscale',color:'frostscale'},{time:'19:00',boss:'Raging Yeti',color:'golden'},{time:'19:10',boss:'Primeval',color:'primeval'},{time:'20:37',boss:'Frostscale',color:'frostscale'},{time:'22:00',boss:'Raging Yeti',color:'golden'},{time:'22:10',boss:'Skypetal',color:'skypetal'},{time:'23:44',boss:'Skypetal',color:'skypetal'}],
  0: [{time:'0:55',boss:'Primeval',color:'primeval'},{time:'1:00',boss:'Raging Yeti',color:'golden'},{time:'2:28',boss:'Primeval',color:'primeval'},{time:'4:00',boss:'Frostscale',color:'frostscale'},{time:'5:35',boss:'Skypetal',color:'skypetal'},{time:'7:07',boss:'Frostscale',color:'frostscale'},{time:'8:33',boss:'Skypetal',color:'skypetal'},{time:'10:00',boss:'Skypetal',color:'skypetal'},{time:'11:26',boss:'Frostscale',color:'frostscale'},{time:'12:52',boss:'Skypetal',color:'skypetal'},{time:'14:21',boss:'Skypetal',color:'skypetal'},{time:'15:51',boss:'Primeval',color:'primeval'},{time:'16:00',boss:'Raging Yeti',color:'golden'},{time:'17:16',boss:'Frostscale',color:'frostscale'},{time:'18:44',boss:'Skypetal',color:'skypetal'},{time:'19:00',boss:'Raging Yeti',color:'golden'},{time:'20:17',boss:'Primeval',color:'primeval'},{time:'21:42',boss:'Skypetal',color:'skypetal'},{time:'22:00',boss:'Raging Yeti',color:'golden'},{time:'23:16',boss:'Skypetal',color:'skypetal'}]
};

const moonwaterData = {
  1: [{time:'2:34',boss:'Kaari',color:'ciano'},{time:'4:04',boss:'Profane',color:'frostscale'},{time:'5:32',boss:'Lycan',color:'primeval'},{time:'8:31',boss:'Safiji',color:'skypetal'},{time:'9:56',boss:'Profane',color:'frostscale'},{time:'11:30',boss:'Safiji',color:'skypetal'},{time:'12:54',boss:'Kaari',color:'ciano'},{time:'14:25',boss:'Kaari',color:'ciano'},{time:'16:00',boss:'Profane',color:'frostscale'},{time:'17:32',boss:'Safiji',color:'skypetal'},{time:'19:07',boss:'Lycan',color:'primeval'},{time:'20:39',boss:'Lycan',color:'primeval'},{time:'22:07',boss:'Kaari',color:'ciano'},{time:'23:35',boss:'Profane',color:'frostscale'}],
  2: [{time:'0:58',boss:'Lycan',color:'primeval'},{time:'2:31',boss:'Lycan',color:'primeval'},{time:'3:57',boss:'Lycan',color:'primeval'},{time:'8:25',boss:'Safiji',color:'skypetal'},{time:'10:00',boss:'Kaari',color:'ciano'},{time:'11:30',boss:'Kaari',color:'ciano'},{time:'13:00',boss:'Safiji',color:'skypetal'},{time:'14:34',boss:'Kaari',color:'ciano'},{time:'16:01',boss:'Lycan',color:'primeval'},{time:'17:36',boss:'Lycan',color:'primeval'},{time:'19:09',boss:'Profane',color:'frostscale'},{time:'20:42',boss:'Lycan',color:'primeval'},{time:'22:11',boss:'Profane',color:'frostscale'},{time:'23:46',boss:'Safiji',color:'skypetal'}],
  3: [{time:'10:05',boss:'Kaari',color:'ciano'},{time:'11:33',boss:'Profane',color:'frostscale'},{time:'12:58',boss:'Kaari',color:'ciano'},{time:'14:28',boss:'Safiji',color:'skypetal'},{time:'15:58',boss:'Profane',color:'frostscale'},{time:'17:31',boss:'Lycan',color:'primeval'},{time:'18:57',boss:'Profane',color:'frostscale'},{time:'20:26',boss:'Kaari',color:'ciano'},{time:'21:52',boss:'Kaari',color:'ciano'},{time:'23:25',boss:'Profane',color:'frostscale'}],
  4: [{time:'1:25',boss:'Lycan',color:'primeval'},{time:'3:00',boss:'Safiji',color:'skypetal'},{time:'4:30',boss:'Kaari',color:'ciano'},{time:'6:02',boss:'Kaari',color:'ciano'},{time:'7:28',boss:'Lycan',color:'primeval'},{time:'9:01',boss:'Kaari',color:'ciano'},{time:'10:33',boss:'Safiji',color:'skypetal'},{time:'12:00',boss:'Safiji',color:'skypetal'},{time:'13:33',boss:'Profane',color:'frostscale'},{time:'14:57',boss:'Lycan',color:'primeval'},{time:'16:25',boss:'Lycan',color:'primeval'},{time:'17:45',boss:'Profane',color:'frostscale'},{time:'19:16',boss:'Kaari',color:'ciano'},{time:'20:51',boss:'Lycan',color:'primeval'},{time:'22:16',boss:'Kaari',color:'ciano'},{time:'23:48',boss:'Kaari',color:'ciano'}],
  5: [{time:'2:28',boss:'Profane',color:'frostscale'},{time:'4:03',boss:'Lycan',color:'primeval'},{time:'5:31',boss:'Profane',color:'frostscale'},{time:'7:05',boss:'Profane',color:'frostscale'},{time:'8:36',boss:'Lycan',color:'primeval'},{time:'10:05',boss:'Profane',color:'frostscale'},{time:'11:35',boss:'Profane',color:'frostscale'},{time:'13:00',boss:'Kaari',color:'ciano'},{time:'14:25',boss:'Profane',color:'frostscale'},{time:'15:52',boss:'Lycan',color:'primeval'},{time:'17:18',boss:'Lycan',color:'primeval'},{time:'18:43',boss:'Safiji',color:'skypetal'},{time:'20:17',boss:'Safiji',color:'skypetal'},{time:'21:50',boss:'Safiji',color:'skypetal'},{time:'23:20',boss:'Safiji',color:'skypetal'}],
  6: [{time:'0:00',boss:'Kaari',color:'ciano'},{time:'1:28',boss:'Kaari',color:'ciano'},{time:'2:50',boss:'Safiji',color:'skypetal'},{time:'4:26',boss:'Lycan',color:'primeval'},{time:'5:53',boss:'Lycan',color:'primeval'},{time:'7:25',boss:'Safiji',color:'skypetal'},{time:'8:57',boss:'Safiji',color:'skypetal'},{time:'10:29',boss:'Kaari',color:'ciano'},{time:'11:57',boss:'Safiji',color:'skypetal'},{time:'13:24',boss:'Profane',color:'frostscale'},{time:'14:49',boss:'Safiji',color:'skypetal'},{time:'16:15',boss:'Kaari',color:'ciano'},{time:'17:47',boss:'Profane',color:'frostscale'},{time:'19:21',boss:'Kaari',color:'ciano'},{time:'20:53',boss:'Profane',color:'frostscale'},{time:'22:20',boss:'Lycan',color:'primeval'},{time:'23:40',boss:'Lycan',color:'primeval'}],
  0: [{time:'0:59',boss:'Kaari',color:'ciano'},{time:'2:33',boss:'Profane',color:'frostscale'},{time:'4:08',boss:'Safiji',color:'skypetal'},{time:'5:35',boss:'Profane',color:'frostscale'},{time:'7:03',boss:'Safiji',color:'skypetal'},{time:'8:38',boss:'Profane',color:'frostscale'},{time:'10:03',boss:'Lycan',color:'primeval'},{time:'11:37',boss:'Lycan',color:'primeval'},{time:'13:05',boss:'Profane',color:'frostscale'},{time:'14:37',boss:'Profane',color:'frostscale'},{time:'16:12',boss:'Profane',color:'frostscale'},{time:'17:42',boss:'Kaari',color:'ciano'},{time:'19:10',boss:'Lycan',color:'primeval'},{time:'20:42',boss:'Kaari',color:'ciano'},{time:'22:07',boss:'Safiji',color:'skypetal'},{time:'23:34',boss:'Profane',color:'frostscale'}]
};

const ritualsData = {
  1: [{time:'8:10',boss:'Necro',color:'primeval'},{time:'11:01',boss:'Gloomdross',color:'primeval'},{time:'15:21',boss:'Fishing Longe',color:'primeval'},{time:'19:42',boss:'Gloomdross',color:'primeval'}],
  2: [{time:'9:28',boss:'Oakshade',color:'primeval'},{time:'13:30',boss:'Sentinel Rebel',color:'primeval'}],
  3: [{time:'8:26',boss:'Yehara Rebel',color:'primeval'},{time:'11:30',boss:'Sentinel',color:'primeval'},{time:'14:47',boss:'',color:'primeval'}],
  4: [{time:'6:52',boss:'Gloomdross',color:'primeval'},{time:'14:34',boss:'',color:'primeval'}],
  5: [{time:'8:59',boss:'',color:'primeval'},{time:'12:09',boss:'Rebel',color:'primeval'},{time:'15:03',boss:'',color:'primeval'}],
  6: [{time:'8:38',boss:'Rebel',color:'primeval'},{time:'12:34',boss:'',color:'primeval'}],
  0: [{time:'9:37',boss:'Clear Sky',color:'primeval'},{time:'12:08',boss:'Gloomdross',color:'primeval'},{time:'14:42',boss:'Gloomdross',color:'primeval'},{time:'19:06',boss:'Oakshade',color:'primeval'}]
};

let selectedDay = 'today';
let selectedRegion = 'silverfrost';
let notifiedBosses = {};

function getCurrentBossData() {
  if (selectedRegion === 'silverfrost') return silverfrostData;
  if (selectedRegion === 'moonwater') return moonwaterData;
  if (selectedRegion === 'rituals') return ritualsData;
  return silverfrostData;
}

function getServerTime() {
  const now = new Date();
  const utc = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
  return new Date(utc.getTime() - (6 * 60 * 60 * 1000));
}

function getUserTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function parseTime(timeStr, daysOffset) {
  const parts = timeStr.split(':');
  const hours = parseInt(parts[0]);
  const minutes = parseInt(parts[1]);
  const serverTime = getServerTime();
  const targetTime = new Date(serverTime);
  targetTime.setHours(hours, minutes, 0, 0);
  targetTime.setDate(targetTime.getDate() + daysOffset);
  return targetTime;
}

function getTimeUntilSpawn(timeStr, targetDay, originalSelectedDay) {
  const serverTime = getServerTime();
  const currentDay = serverTime.getDay();
  let daysUntil = targetDay - currentDay;
  if (daysUntil < 0) daysUntil += 7;
  const spawnTime = parseTime(timeStr, daysUntil);
  const timeUntil = spawnTime - serverTime;


  if (timeUntil < 0 && daysUntil === 0) {
    
    if (originalSelectedDay !== 'today') {
      return parseTime(timeStr, 7) - serverTime;
    }
  }

  return timeUntil;
}

function formatCountdown(ms) {
  if (ms <= 0) {
    return selectedRegion === 'rituals' ? 'Done' : 'Dead';
  }
  const seconds = Math.floor(ms / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
}

function renderBosses() {
  const serverTime = getServerTime();
  const currentDay = serverTime.getDay();
  const displayDay = selectedDay === 'today' ? currentDay : parseInt(selectedDay);
  const currentData = getCurrentBossData();
  
  const bosses = currentData[displayDay].map(boss => {
    const timeUntil = getTimeUntilSpawn(boss.time, displayDay, selectedDay);
    const localSpawnTime = new Date(Date.now() + timeUntil);
    return {
      boss: boss.boss,
      color: boss.color,
      time: boss.time,
      dayIndex: displayDay,
      timeUntil: timeUntil,
      countdown: formatCountdown(timeUntil),
      localSpawnTime: localSpawnTime
    };
  });
  
  bosses.sort((a, b) => a.timeUntil - b.timeUntil);
  
  const table = document.getElementById('bossTable');
  table.innerHTML = '';
  
  if (bosses.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = '<td colspan="4" style="text-align:center;color:#8b949e;padding:2rem">No bosses scheduled for this day</td>';
    table.appendChild(row);
    return;
  }
  
  bosses.forEach(boss => {
    const row = document.createElement('tr');
    const statusClass = boss.timeUntil <= 0 ? (selectedRegion === 'rituals' ? 'done' : 'dead') : boss.color;
    row.innerHTML = `
      <td><span class="boss-name ${boss.color}">${boss.boss}</span></td>
      <td><span class="countdown ${statusClass}">${boss.countdown}</span></td>
      <td>${boss.time}</td>
      <td>${boss.localSpawnTime.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })}</td>
    `;
    table.appendChild(row);
  });
}

function updateClock() {
  const serverTime = getServerTime();
  document.getElementById('serverClock').textContent = 'Server Time: ' + serverTime.toLocaleTimeString('en-US', { hour12: false });
}

// Region switching
document.querySelectorAll('[data-region]').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('[data-region]').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    selectedRegion = this.dataset.region;
    
    const titles = {
      silverfrost: 'Silverfrost Boss Schedule',
      moonwater: 'Moonwater Boss Schedule',
      rituals: 'Rituals Schedule'
    };
    document.getElementById('bossScheduleTitle').textContent = titles[selectedRegion];
    renderBosses();
  });
});

// Day switching
document.getElementById('dayFilter').addEventListener('click', function(e) {
  if (e.target.classList.contains('day-btn')) {
    document.querySelectorAll('#dayFilter .day-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    selectedDay = e.target.dataset.day;
    renderBosses();
  }
});

// Notification functions
function loadSettings() {
  const defaults = {
    enableNotifications: false,
    notificationMinutes: '5',
    soundEnabled: false,
    notifySilverfrost: true,
    notifyMoonwater: true,
    notifyRituals: true,
    silverfrostBosses: {
      primeval: true,
      frostscale: true,
      skypetal: true,
      golden: true
    },
    moonwaterBosses: {
      kaari: true,
      profane: true,
      lycan: true,
      safiji: true
    },
    ritualsBosses: {
      all: true
    }
  };
  try {
    const saved = window.savedSettings || {};
    if (saved.enableNotifications !== undefined) defaults.enableNotifications = saved.enableNotifications;
    if (saved.notificationMinutes !== undefined) defaults.notificationMinutes = saved.notificationMinutes;
    if (saved.soundEnabled !== undefined) defaults.soundEnabled = saved.soundEnabled;
    if (saved.notifySilverfrost !== undefined) defaults.notifySilverfrost = saved.notifySilverfrost;
    if (saved.notifyMoonwater !== undefined) defaults.notifyMoonwater = saved.notifyMoonwater;
    if (saved.notifyRituals !== undefined) defaults.notifyRituals = saved.notifyRituals;
    if (saved.silverfrostBosses) defaults.silverfrostBosses = saved.silverfrostBosses;
    if (saved.moonwaterBosses) defaults.moonwaterBosses = saved.moonwaterBosses;
    if (saved.ritualsBosses) defaults.ritualsBosses = saved.ritualsBosses;
    if (saved.notifiedBosses) notifiedBosses = saved.notifiedBosses;
  } catch (e) {
    console.log('No previous settings found');
  }
  return defaults;
}

function saveSettings() {
  const settings = {
    enableNotifications: document.getElementById('enableNotifications').checked,
    notificationMinutes: document.getElementById('notificationMinutes').value,
    soundEnabled: document.getElementById('soundEnabled').checked,
    notifySilverfrost: document.getElementById('notifySilverfrost').checked,
    notifyMoonwater: document.getElementById('notifyMoonwater').checked,
    notifyRituals: document.getElementById('notifyRituals').checked,
    silverfrostBosses: {
      primeval: document.getElementById('silverfrost-primeval').checked,
      frostscale: document.getElementById('silverfrost-frostscale').checked,
      skypetal: document.getElementById('silverfrost-skypetal').checked,
      golden: document.getElementById('silverfrost-golden').checked
    },
    moonwaterBosses: {
      kaari: document.getElementById('moonwater-kaari').checked,
      profane: document.getElementById('moonwater-profane').checked,
      lycan: document.getElementById('moonwater-lycan').checked,
      safiji: document.getElementById('moonwater-safiji').checked
    },
    ritualsBosses: {
      all: document.getElementById('rituals-all').checked
    },
    notifiedBosses: notifiedBosses,
    lastSaved: new Date().toISOString()
  };
  window.savedSettings = settings;
  const status = document.getElementById('saveStatus');
  status.classList.add('show');
  setTimeout(() => status.classList.remove('show'), 3000);
}

function applySettings(settings) {
  document.getElementById('enableNotifications').checked = settings.enableNotifications;
  document.getElementById('notificationMinutes').value = settings.notificationMinutes;
  document.getElementById('soundEnabled').checked = settings.soundEnabled;
  document.getElementById('notifySilverfrost').checked = settings.notifySilverfrost;
  document.getElementById('notifyMoonwater').checked = settings.notifyMoonwater;
  document.getElementById('notifyRituals').checked = settings.notifyRituals;
  
  document.getElementById('silverfrost-primeval').checked = settings.silverfrostBosses.primeval;
  document.getElementById('silverfrost-frostscale').checked = settings.silverfrostBosses.frostscale;
  document.getElementById('silverfrost-skypetal').checked = settings.silverfrostBosses.skypetal;
  document.getElementById('silverfrost-golden').checked = settings.silverfrostBosses.golden;
  
  document.getElementById('moonwater-kaari').checked = settings.moonwaterBosses.kaari;
  document.getElementById('moonwater-profane').checked = settings.moonwaterBosses.profane;
  document.getElementById('moonwater-lycan').checked = settings.moonwaterBosses.lycan;
  document.getElementById('moonwater-safiji').checked = settings.moonwaterBosses.safiji;
  
  document.getElementById('rituals-all').checked = settings.ritualsBosses.all;
  
  toggleRegionSettings('silverfrost', settings.notifySilverfrost);
  toggleRegionSettings('moonwater', settings.notifyMoonwater);
  toggleRegionSettings('rituals', settings.notifyRituals);
}

function toggleRegionSettings(region, enabled) {
  const section = document.getElementById(region + '-bosses');
  if (section) {
    section.style.display = enabled ? 'flex' : 'none';
  }
}

// Region notification toggles
document.getElementById('notifySilverfrost').addEventListener('change', function() {
  const isChecked = this.checked;
  toggleRegionSettings('silverfrost', isChecked);
  if (isChecked) {
    document.getElementById('silverfrost-primeval').checked = true;
    document.getElementById('silverfrost-frostscale').checked = true;
    document.getElementById('silverfrost-skypetal').checked = true;
    document.getElementById('silverfrost-golden').checked = true;
  }
});

document.getElementById('notifyMoonwater').addEventListener('change', function() {
  const isChecked = this.checked;
  toggleRegionSettings('moonwater', isChecked);
  if (isChecked) {
    document.getElementById('moonwater-kaari').checked = true;
    document.getElementById('moonwater-profane').checked = true;
    document.getElementById('moonwater-lycan').checked = true;
    document.getElementById('moonwater-safiji').checked = true;
  }
});

document.getElementById('notifyRituals').addEventListener('change', function() {
  const isChecked = this.checked;
  toggleRegionSettings('rituals', isChecked);
  if (isChecked) {
    document.getElementById('rituals-all').checked = true;
  }
});

function playNotificationSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch (e) {
    console.log('Could not play sound:', e);
  }
}

function testNotification() {
  if (!('Notification' in window)) {
    alert('Your browser does not support notifications');
    return;
  }
  
  if (Notification.permission === 'granted') {
    const soundEnabled = document.getElementById('soundEnabled').checked;
    const notification = new Notification('🎮 Boss Tracker Test', {
      body: 'Notifications are working correctly!',
      icon: '🎮',
      requireInteraction: false
    });
    if (soundEnabled) playNotificationSound();
    setTimeout(() => notification.close(), 5000);
  } else {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        testNotification();
      } else {
        alert('Please allow notifications in your browser settings.');
      }
    });
  }
}

document.getElementById('testNotification').addEventListener('click', testNotification);
document.getElementById('saveSettings').addEventListener('click', saveSettings);

// Initialize
const savedSettings = loadSettings();
applySettings(savedSettings);
document.getElementById('userTimezone').textContent = getUserTimezone();
renderBosses();
updateClock();
setInterval(() => {
  renderBosses();
  updateClock();
}, 1000);
