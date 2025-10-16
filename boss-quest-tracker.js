// ============= TAB SWITCHING =============
document.querySelectorAll('.nav-tab').forEach(tab => {
  tab.addEventListener('click', function() {
    const tabName = this.dataset.tab;
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    this.classList.add('active');
    document.getElementById(tabName + '-tab').classList.add('active');
  });
});

// ============= BOSS TRACKER CODE =============
const bossData = {
  1: [{time:'0:50',boss:'Unknown',color:'unknown'},{time:'1:00',boss:'Raging Yeti',color:'golden'},{time:'2:05',boss:'Unknown',color:'unknown'},{time:'3:23',boss:'Unknown',color:'unknown'},{time:'4:39',boss:'Unknown',color:'unknown'},{time:'5:58',boss:'Unknown',color:'unknown'},{time:'7:17',boss:'Unknown',color:'unknown'},{time:'8:41',boss:'Unknown',color:'unknown'},{time:'10:04',boss:'Unknown',color:'unknown'},{time:'11:37',boss:'Unknown',color:'unknown'},{time:'13:11',boss:'Unknown',color:'unknown'},{time:'14:54',boss:'Unknown',color:'unknown'},{time:'16:00',boss:'Raging Yeti',color:'golden'},{time:'16:37',boss:'Unknown',color:'unknown'},{time:'18:07',boss:'Unknown',color:'unknown'},{time:'19:00',boss:'Raging Yeti',color:'golden'},{time:'19:36',boss:'Unknown',color:'unknown'},{time:'21:17',boss:'Unknown',color:'unknown'},{time:'22:00',boss:'Raging Yeti',color:'golden'},{time:'22:33',boss:'Unknown',color:'unknown'},{time:'23:28',boss:'Unknown',color:'unknown'}],
  2: [{time:'0:44',boss:'Unknown',color:'unknown'},{time:'1:00',boss:'Raging Yeti',color:'golden'},{time:'2:07',boss:'Unknown',color:'unknown'},{time:'3:46',boss:'Unknown',color:'unknown'},{time:'5:25',boss:'Unknown',color:'unknown'},{time:'6:50',boss:'Unknown',color:'unknown'},{time:'8:10',boss:'Unknown',color:'unknown'},{time:'9:44',boss:'Unknown',color:'unknown'},{time:'11:10',boss:'Unknown',color:'unknown'},{time:'12:48',boss:'Unknown',color:'unknown'},{time:'14:06',boss:'Unknown',color:'unknown'},{time:'15:24',boss:'Unknown',color:'unknown'},{time:'16:00',boss:'Raging Yeti',color:'golden'},{time:'17:02',boss:'Unknown',color:'unknown'},{time:'18:33',boss:'Unknown',color:'unknown'},{time:'19:00',boss:'Raging Yeti',color:'golden'},{time:'19:59',boss:'Unknown',color:'unknown'},{time:'21:17',boss:'Unknown',color:'unknown'},{time:'22:00',boss:'Raging Yeti',color:'golden'},{time:'22:37',boss:'Unknown',color:'unknown'},{time:'23:28',boss:'Unknown',color:'unknown'}],
  3: [{time:'1:00',boss:'Raging Yeti',color:'golden'},{time:'1:04',boss:'Unknown',color:'unknown'},{time:'2:30',boss:'Unknown',color:'unknown'},{time:'4:05',boss:'Frostscale',color:'frostscale'},{time:'5:36',boss:'Frostscale',color:'frostscale'},{time:'7:09',boss:'Frostscale',color:'frostscale'},{time:'8:35',boss:'Skypetal',color:'skypetal'},{time:'10:08',boss:'Frostscale',color:'frostscale'},{time:'11:39',boss:'Frostscale',color:'frostscale'},{time:'13:06',boss:'Frostscale',color:'frostscale'},{time:'14:41',boss:'Primeval',color:'primeval'},{time:'16:00',boss:'Raging Yeti',color:'golden'},{time:'16:07',boss:'Skypetal',color:'skypetal'},{time:'17:34',boss:'Frostscale',color:'frostscale'},{time:'18:59',boss:'Frostscale',color:'frostscale'},{time:'19:00',boss:'Raging Yeti',color:'golden'},{time:'20:34',boss:'Frostscale',color:'frostscale'},{time:'22:00',boss:'Raging Yeti',color:'golden'},{time:'22:07',boss:'Skypetal',color:'skypetal'},{time:'23:36',boss:'Skypetal',color:'skypetal'}],
  4: [{time:'1:00',boss:'Raging Yeti',color:'golden'},{time:'1:01',boss:'Primeval',color:'primeval'},{time:'2:26',boss:'Primeval',color:'primeval'},{time:'3:58',boss:'Primeval',color:'primeval'},{time:'5:24',boss:'Skypetal',color:'skypetal'},{time:'6:55',boss:'Skypetal',color:'skypetal'},{time:'8:24',boss:'Primeval',color:'primeval'},{time:'9:54',boss:'Primeval',color:'primeval'},{time:'11:25',boss:'Primeval',color:'primeval'},{time:'13:00',boss:'Primeval',color:'primeval'},{time:'14:29',boss:'Skypetal',color:'skypetal'},{time:'15:54',boss:'Frostscale',color:'frostscale'},{time:'16:00',boss:'Raging Yeti',color:'golden'},{time:'17:25',boss:'Primeval',color:'primeval'},{time:'18:55',boss:'Skypetal',color:'skypetal'},{time:'19:00',boss:'Raging Yeti',color:'golden'},{time:'20:24',boss:'Frostscale',color:'frostscale'},{time:'21:59',boss:'Skypetal',color:'skypetal'},{time:'22:00',boss:'Raging Yeti',color:'golden'},{time:'22:53',boss:'Unknown',color:'unknown'},{time:'23:36',boss:'Unknown',color:'unknown'}],
  5: [{time:'0:28',boss:'Unknown',color:'unknown'},{time:'1:00',boss:'Raging Yeti',color:'golden'},{time:'1:12',boss:'Unknown',color:'unknown'},{time:'2:34',boss:'Unknown',color:'unknown'},{time:'4:06',boss:'Unknown',color:'unknown'},{time:'5:38',boss:'Unknown',color:'unknown'},{time:'7:20',boss:'Unknown',color:'unknown'},{time:'8:51',boss:'Unknown',color:'unknown'},{time:'10:10',boss:'Unknown',color:'unknown'},{time:'11:37',boss:'Unknown',color:'unknown'},{time:'13:04',boss:'Unknown',color:'unknown'},{time:'14:25',boss:'Unknown',color:'unknown'},{time:'15:51',boss:'Unknown',color:'unknown'},{time:'16:00',boss:'Raging Yeti',color:'golden'},{time:'17:25',boss:'Unknown',color:'unknown'},{time:'18:53',boss:'Unknown',color:'unknown'},{time:'19:00',boss:'Raging Yeti',color:'golden'},{time:'20:27',boss:'Unknown',color:'unknown'},{time:'21:47',boss:'Unknown',color:'unknown'},{time:'22:00',boss:'Raging Yeti',color:'golden'},{time:'23:18',boss:'Unknown',color:'unknown'}],
  6: [{time:'0:20',boss:'Unknown',color:'unknown'},{time:'1:00',boss:'Raging Yeti',color:'golden'},{time:'1:58',boss:'Unknown',color:'unknown'},{time:'3:20',boss:'Unknown',color:'unknown'},{time:'4:56',boss:'Unknown',color:'unknown'},{time:'6:19',boss:'Unknown',color:'unknown'},{time:'7:39',boss:'Unknown',color:'unknown'},{time:'9:24',boss:'Unknown',color:'unknown'},{time:'11:04',boss:'Unknown',color:'unknown'},{time:'12:22',boss:'Unknown',color:'unknown'},{time:'13:52',boss:'Unknown',color:'unknown'},{time:'15:29',boss:'Unknown',color:'unknown'},{time:'16:00',boss:'Raging Yeti',color:'golden'},{time:'16:53',boss:'Unknown',color:'unknown'},{time:'18:29',boss:'Unknown',color:'unknown'},{time:'19:00',boss:'Raging Yeti',color:'golden'},{time:'20:14',boss:'Unknown',color:'unknown'},{time:'21:55',boss:'Unknown',color:'unknown'},{time:'22:00',boss:'Raging Yeti',color:'golden'},{time:'23:25',boss:'Unknown',color:'unknown'}],
  0: [{time:'0:43',boss:'Unknown',color:'unknown'},{time:'1:00',boss:'Raging Yeti',color:'golden'},{time:'1:58',boss:'Unknown',color:'unknown'},{time:'3:34',boss:'Unknown',color:'unknown'},{time:'5:02',boss:'Unknown',color:'unknown'},{time:'6:34',boss:'Unknown',color:'unknown'},{time:'8:15',boss:'Unknown',color:'unknown'},{time:'9:51',boss:'Unknown',color:'unknown'},{time:'11:23',boss:'Unknown',color:'unknown'},{time:'12:46',boss:'Unknown',color:'unknown'},{time:'14:05',boss:'Unknown',color:'unknown'},{time:'15:28',boss:'Unknown',color:'unknown'},{time:'16:00',boss:'Raging Yeti',color:'golden'},{time:'17:12',boss:'Unknown',color:'unknown'},{time:'18:38',boss:'Unknown',color:'unknown'},{time:'19:00',boss:'Raging Yeti',color:'golden'},{time:'20:12',boss:'Unknown',color:'unknown'},{time:'21:51',boss:'Unknown',color:'unknown'},{time:'22:00',boss:'Raging Yeti',color:'golden'}]
};

let selectedDay = 'today';
let notifiedBosses = {};

function loadSettings() {
  const defaults = {
    enableNotifications: false,
    notificationMinutes: '5',
    soundEnabled: false
  };
  try {
    const saved = window.savedSettings || {};
    if (saved.enableNotifications !== undefined) defaults.enableNotifications = saved.enableNotifications;
    if (saved.notificationMinutes !== undefined) defaults.notificationMinutes = saved.notificationMinutes;
    if (saved.soundEnabled !== undefined) defaults.soundEnabled = saved.soundEnabled;
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
}

function cleanOldNotifications() {
  const now = Date.now();
  const twoHours = 2 * 60 * 60 * 1000;
  Object.keys(notifiedBosses).forEach(key => {
    if (notifiedBosses[key] && (now - notifiedBosses[key]) > twoHours) {
      delete notifiedBosses[key];
    }
  });
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

function getTimeUntilSpawn(timeStr, targetDay) {
  const serverTime = getServerTime();
  const currentDay = serverTime.getDay();
  let daysUntil = targetDay - currentDay;
  if (daysUntil < 0) daysUntil += 7;
  const spawnTime = parseTime(timeStr, daysUntil);
  const timeUntil = spawnTime - serverTime;
  if (timeUntil < 0 && daysUntil === 0) {
    return parseTime(timeStr, 7) - serverTime;
  }
  return timeUntil;
}

function formatCountdown(ms) {
  if (ms <= 0) return 'Dead';
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
  const bosses = bossData[displayDay].map(boss => {
    const timeUntil = getTimeUntilSpawn(boss.time, displayDay);
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
  
  let filteredBosses = bosses;
  if (selectedDay === 'today') {
    filteredBosses = bosses.filter(b => b.timeUntil <= 24 * 60 * 60 * 1000);
  }
  
  filteredBosses.sort((a, b) => a.timeUntil - b.timeUntil);
  
  const table = document.getElementById('bossTable');
  table.innerHTML = '';
  
  filteredBosses.forEach(boss => {
    const row = document.createElement('tr');
    const colorClass = boss.timeUntil <= 0 ? 'dead' : boss.color;
    row.innerHTML = `
      <td><span class="boss-name ${boss.color}">${boss.boss}</span></td>
      <td><span class="countdown ${colorClass}">${boss.countdown}</span></td>
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

function checkNotifications() {
  const enabled = document.getElementById('enableNotifications').checked;
  if (!enabled) return;
  
  const minutesBefore = parseInt(document.getElementById('notificationMinutes').value);
  const soundEnabled = document.getElementById('soundEnabled').checked;
  
  cleanOldNotifications();
  
  Object.keys(bossData).forEach(day => {
    bossData[day].forEach(boss => {
      const timeUntil = getTimeUntilSpawn(boss.time, parseInt(day));
      const secondsUntil = Math.floor(timeUntil / 1000);
      const spawnTimestamp = Date.now() + timeUntil;
      const notificationId = boss.boss + '_' + boss.time + '_day' + day + '_' + Math.floor(spawnTimestamp / 60000);
      
      const minSeconds = (minutesBefore * 60) - 30;
      const maxSeconds = (minutesBefore * 60) + 30;
      
      if (secondsUntil >= minSeconds && secondsUntil <= maxSeconds && !notifiedBosses[notificationId]) {
        notifiedBosses[notificationId] = Date.now();
        showNotification(boss.boss, boss.time, minutesBefore, soundEnabled);
        if (window.savedSettings) {
          window.savedSettings.notifiedBosses = notifiedBosses;
        }
      }
    });
  });
}

function showNotification(bossName, time, minutes, playSound) {
  if (!('Notification' in window)) return;
  
  if (Notification.permission === 'granted') {
    const notification = new Notification('🎮 Boss Spawn Alert!', {
      body: `${bossName} will spawn in ${minutes} minutes at ${time} (Server Time)!`,
      icon: '🎮',
      requireInteraction: true,
      tag: bossName + '_' + time
    });
    if (playSound) playNotificationSound();
    setTimeout(() => notification.close(), 10000);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        showNotification(bossName, time, minutes, playSound);
      }
    });
  }
}

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
      body: 'Notifications are working correctly! You will receive alerts like this one.',
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
        alert('Please allow notifications in your browser settings to use this feature.');
      }
    });
  }
}

// Boss Tracker Event Listeners
document.getElementById('dayFilter').addEventListener('click', function(e) {
  if (e.target.classList.contains('day-btn')) {
    document.querySelectorAll('.day-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    selectedDay = e.target.dataset.day;
    renderBosses();
  }
});

document.getElementById('testNotification').addEventListener('click', testNotification);
document.getElementById('saveSettings').addEventListener('click', saveSettings);

// Initialize Boss Tracker
const savedSettings = loadSettings();
applySettings(savedSettings);
document.getElementById('userTimezone').textContent = getUserTimezone();
renderBosses();
updateClock();
setInterval(() => {
  renderBosses();
  updateClock();
  checkNotifications();
}, 1000);

// ============= QUEST TRACKER CODE =============
const questData = {
  'frostscale': [
    { name: 'Shifting Beneath The Snow', gold: 0, silver: 64, copper: 80, xp: 4800 },
    { name: 'Slavery in the North', gold: 0, silver: 59, copper: 10, xp: 3000 },
    { name: 'Two Tribes, Three Chiefs', gold: 0, silver: 57, copper: 60, xp: 4800 }
  ],
  'msp': [
    { name: 'Guardian of the Moon', gold: 0, silver: 50, copper: 0, xp: 2200 }
  ],
  'ssp': [
    { name: 'Turning the Tide', gold: 0, silver: 67, copper: 0, xp: 6000 },
    { name: 'Battle Master', gold: 0, silver: 64, copper: 0, xp: 6000 },
    { name: 'Fierce Clash Upon the Plains', gold: 0, silver: 64, copper: 0, xp: 5200 },
    { name: 'Heal the Wounded', gold: 0, silver: 40, copper: 0, xp: 4250 },
    { name: 'Herbin\' Warfare', gold: 0, silver: 40, copper: 0, xp: 3700 },
    { name: 'The One Who Controls the Soulstone', gold: 0, silver: 40, copper: 0, xp: 2600 }
  ],
  'mushin': [
    { name: 'Monsters and Mayhem', gold: 0, silver: 59, copper: 0, xp: 2500, note: '(69s - 10s Antidote)' },
    { name: 'The Final Training', gold: 0, silver: 25, copper: 0, xp: 2500, note: '(75s - 50s Gem)' }
  ],
  'fieldboss': [
    { name: 'Kaishin\'s Ambition', gold: 0, silver: 85, copper: 0, xp: 5500 }
  ],
  'blues': [
    { name: 'Same Old Song', gold: 1, silver: 15, copper: 0, xp: 4900 },
    { name: 'Snowed In', gold: 1, silver: 15, copper: 0, xp: 4900 },
    { name: 'Jailhouse Rock', gold: 1, silver: 15, copper: 0, xp: 4900 }
  ],
  'silverfrost': [
    { name: 'The Gatecrasher', gold: 1, silver: 70, copper: 0, xp: 6200 },
    { name: 'Be Ido Rides Again', gold: 1, silver: 70, copper: 0, xp: 6200 },
    { name: 'Asura\'s Return', gold: 1, silver: 70, copper: 0, xp: 6700 },
    { name: 'Two Shadows', gold: 1, silver: 70, copper: 0, xp: 6700 }
  ],
  'moonwater': [
    { name: 'Moonwater Plains Evildoer Sweep', gold: 1, silver: 25, copper: 0, xp: 5200 },
    { name: 'Moonwater Plains Darkness Sweep', gold: 0, silver: 53, copper: 0, xp: 4400 },
    { name: 'Gale of Darkness', gold: 1, silver: 25, copper: 0, xp: 6100 },
    { name: 'Wailing Souls', gold: 1, silver: 25, copper: 0, xp: 6100 }
  ]
};

let completedQuests = {};

function loadProgress() {
  try {
    const saved = window.questProgress;
    if (saved) {
      completedQuests = saved;
    }
  } catch (e) {
    console.log('No saved progress found');
  }
}

function saveProgress() {
  window.questProgress = completedQuests;
}

function formatGold(gold, silver, copper) {
  let parts = [];
  if (gold > 0) parts.push(gold + 'g');
  if (silver > 0) parts.push(silver + 's');
  if (copper > 0) parts.push(copper + 'c');
  return parts.length > 0 ? parts.join(' ') : '0g';
}

function calculateTotals() {
  let earnedGold = 0, earnedSilver = 0, earnedCopper = 0, earnedXP = 0;
  let lostGold = 0, lostSilver = 0, lostCopper = 0, lostXP = 0;
  let completed = 0, total = 0;

  Object.keys(questData).forEach(section => {
    questData[section].forEach(quest => {
      total++;
      const questId = section + '_' + quest.name;
      if (completedQuests[questId]) {
        completed++;
        earnedGold += quest.gold;
        earnedSilver += quest.silver;
        earnedCopper += quest.copper;
        earnedXP += quest.xp;
      } else {
        lostGold += quest.gold;
        lostSilver += quest.silver;
        lostCopper += quest.copper;
        lostXP += quest.xp;
      }
    });
  });

  earnedSilver += Math.floor(earnedCopper / 100);
  earnedCopper = earnedCopper % 100;
  earnedGold += Math.floor(earnedSilver / 100);
  earnedSilver = earnedSilver % 100;

  lostSilver += Math.floor(lostCopper / 100);
  lostCopper = lostCopper % 100;
  lostGold += Math.floor(lostSilver / 100);
  lostSilver = lostSilver % 100;

  const totalGold = earnedGold + lostGold;
  const totalSilver = earnedSilver + lostSilver;
  const totalCopper = earnedCopper + lostCopper;
  const totalXP = earnedXP + lostXP;

  document.getElementById('completedCount').textContent = completed + '/' + total;
  document.getElementById('progressBar').style.width = ((completed / total) * 100) + '%';
  document.getElementById('goldEarned').textContent = formatGold(earnedGold, earnedSilver, earnedCopper);
  document.getElementById('goldLost').textContent = formatGold(lostGold, lostSilver, lostCopper);
  document.getElementById('xpEarned').textContent = earnedXP.toLocaleString();
  document.getElementById('xpLost').textContent = lostXP.toLocaleString();
  document.getElementById('totalValue').textContent = formatGold(totalGold, totalSilver, totalCopper);
  document.getElementById('totalXP').textContent = totalXP.toLocaleString();
}

function renderQuests() {
  Object.keys(questData).forEach(section => {
    const container = document.getElementById(section + '-quests');
    container.innerHTML = '';
    
    questData[section].forEach(quest => {
      const questId = section + '_' + quest.name;
      const isCompleted = completedQuests[questId] || false;
      
      const questItem = document.createElement('div');
      questItem.className = 'quest-item' + (isCompleted ? ' completed' : '');
      
      questItem.innerHTML = `
        <div class="quest-left">
          <input type="checkbox" class="quest-checkbox" data-quest="${questId}" ${isCompleted ? 'checked' : ''}>
          <span class="quest-name">${quest.name}${quest.note ? ' <span style="color: #8b949e; font-size: 0.85rem;">' + quest.note + '</span>' : ''}</span>
        </div>
        <div class="quest-rewards">
          <div class="reward-item">
            <div class="reward-label">Gold</div>
            <div class="reward-value">${formatGold(quest.gold, quest.silver, quest.copper)}</div>
          </div>
          <div class="reward-item">
            <div class="reward-label">XP</div>
            <div class="reward-value xp">${quest.xp.toLocaleString()}</div>
          </div>
        </div>
      `;
      
      container.appendChild(questItem);
      
      questItem.addEventListener('click', function(e) {
        if (e.target.type !== 'checkbox') {
          const checkbox = questItem.querySelector('.quest-checkbox');
          checkbox.checked = !checkbox.checked;
          toggleQuest(questId, checkbox.checked);
        }
      });
      
      const checkbox = questItem.querySelector('.quest-checkbox');
      checkbox.addEventListener('change', function(e) {
        e.stopPropagation();
        toggleQuest(questId, this.checked);
      });
    });
  });
}

function toggleQuest(questId, isCompleted) {
  if (isCompleted) {
    completedQuests[questId] = true;
  } else {
    delete completedQuests[questId];
  }
  saveProgress();
  calculateTotals();
  renderQuests();
}

document.getElementById('resetAll').addEventListener('click', function() {
  if (confirm('Are you sure you want to reset all quests?')) {
    completedQuests = {};
    saveProgress();
    calculateTotals();
    renderQuests();
  }
});

document.getElementById('completeAll').addEventListener('click', function() {
  Object.keys(questData).forEach(section => {
    questData[section].forEach(quest => {
      const questId = section + '_' + quest.name;
      completedQuests[questId] = true;
    });
  });
  saveProgress();
  calculateTotals();
  renderQuests();
});

// Initialize Quest Tracker
loadProgress();
renderQuests();
calculateTotals();

// ============= BOSS SPAWN REPORT SYSTEM =============
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwk_hRPQezbkjWO_NilIv_kchtXxZu9FhbYDitbnds7kqFnwjafR1jXSpi9zknhdFVI4w/exec'; // Replace with your Google Apps Script Web App URL

// Load recent reports from storage
function loadRecentReports() {
  try {
    const reports = window.bossReports || [];
    renderReports(reports);
  } catch (e) {
    console.log('No saved reports found');
  }
}

// Render reports table
function renderReports(reports) {
  const table = document.getElementById('reportsTable');
  
  if (reports.length === 0) {
    table.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #8b949e; padding: 2rem;">No reports yet. Be the first to contribute!</td></tr>';
    return;
  }
  
  table.innerHTML = '';
  
  // Show last 10 reports, most recent first
  reports.slice(-10).reverse().forEach(report => {
    const row = document.createElement('tr');
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const bossColors = {
      'Primeval': 'primeval',
      'Frostscale': 'frostscale',
      'Skypetal': 'skypetal'
    };
    
    row.innerHTML = `
      <td>${new Date(report.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
      <td>${dayNames[report.day]}</td>
      <td><span style="font-family: monospace; font-weight: bold;">${report.time}</span></td>
      <td><span class="boss-name ${bossColors[report.boss]}">${report.boss}</span></td>
      <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${report.notes || '-'}</td>
    `;
    table.appendChild(row);
  });
}

// Handle form submission
document.getElementById('reportForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const day = document.getElementById('reportDay').value;
  const time = document.getElementById('reportTime').value;
  const boss = document.getElementById('reportBoss').value;
  const notes = document.getElementById('reportNotes').value;
  
  if (!day || !time || !boss) {
    return;
  }
  
  const report = {
    timestamp: new Date().toISOString(),
    day: parseInt(day),
    time: time,
    boss: boss,
    notes: notes
  };
  
  // Save locally first
  const reports = window.bossReports || [];
  reports.push(report);
  window.bossReports = reports;
  
  // Update table
  renderReports(reports);
  
  // Send to Google Sheets
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(report)
    });
    
    // Show success message
    const statusEl = document.getElementById('reportStatus');
    statusEl.classList.add('show');
    setTimeout(() => statusEl.classList.remove('show'), 3000);
    
    // Reset form
    document.getElementById('reportForm').reset();
    
  } catch (error) {
    console.error('Error submitting report:', error);
    
    // Show error message
    const errorEl = document.getElementById('reportError');
    errorEl.classList.add('show');
    setTimeout(() => errorEl.classList.remove('show'), 3000);
  }
});

// Initialize reports on page load
loadRecentReports();

// MODIFICATION: Open the time picker when clicking anywhere on the time input field
document.getElementById('reportTime').addEventListener('click', function() {
    try {
        // This modern API programmatically shows the browser's picker UI
        this.showPicker();
    } catch (e) {
        // Fallback for browsers that do not support it
        console.log("Browser does not support the .showPicker() method.");
    }
});
