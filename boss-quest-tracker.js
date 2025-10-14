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
  1: [{time:'0:00',boss:'Primeval',color:'primeval'},{time:'1:22',boss:'Primeval',color:'primeval'},{time:'2:37',boss:'Skypetal',color:'skypetal'},{time:'3:55',boss:'Primeval',color:'primeval'},{time:'5:57',boss:'Frostscale',color:'frostscale'},{time:'6:30',boss:'Primeval',color:'primeval'},{time:'7:49',boss:'Skypetal',color:'skypetal'},{time:'9:13',boss:'Primeval',color:'primeval'},{time:'10:56',boss:'Skypetal',color:'skypetal'},{time:'12:09',boss:'Primeval',color:'primeval'},{time:'13:43',boss:'Frostscale',color:'frostscale'},{time:'15:26',boss:'Frostscale',color:'frostscale'},{time:'17:09',boss:'Primeval',color:'primeval'},{time:'18:39',boss:'Primeval',color:'primeval'},{time:'20:08',boss:'Skypetal',color:'skypetal'},{time:'21:49',boss:'Skypetal',color:'skypetal'},{time:'23:05',boss:'Primeval',color:'primeval'}],
  2: [{time:'0:00',boss:'Frostscale',color:'frostscale'},{time:'1:16',boss:'Primeval',color:'primeval'},{time:'2:39',boss:'Frostscale',color:'frostscale'},{time:'4:18',boss:'Skypetal',color:'skypetal'},{time:'5:57',boss:'Primeval',color:'primeval'},{time:'7:22',boss:'Primeval',color:'primeval'},{time:'8:42',boss:'Frostscale',color:'frostscale'},{time:'10:16',boss:'Skypetal',color:'skypetal'},{time:'11:42',boss:'Frostscale',color:'frostscale'},{time:'13:20',boss:'Skypetal',color:'skypetal'},{time:'14:38',boss:'Skypetal',color:'skypetal'},{time:'15:56',boss:'Primeval',color:'primeval'},{time:'17:34',boss:'Skypetal',color:'skypetal'},{time:'19:05',boss:'Skypetal',color:'skypetal'},{time:'20:31',boss:'Frostscale',color:'frostscale'},{time:'21:49',boss:'Frostscale',color:'frostscale'},{time:'23:09',boss:'Frostscale',color:'frostscale'}],
  3: [{time:'0:00',boss:'Skypetal',color:'skypetal'},{time:'1:36',boss:'Primeval',color:'primeval'},{time:'3:02',boss:'Skypetal',color:'skypetal'},{time:'4:30',boss:'Skypetal',color:'skypetal'},{time:'6:08',boss:'Primeval',color:'primeval'},{time:'7:48',boss:'Primeval',color:'primeval'},{time:'9:26',boss:'Frostscale',color:'frostscale'},{time:'10:44',boss:'Primeval',color:'primeval'},{time:'12:11',boss:'Primeval',color:'primeval'},{time:'13:29',boss:'Frostscale',color:'frostscale'},{time:'14:57',boss:'Frostscale',color:'frostscale'},{time:'16:40',boss:'Skypetal',color:'skypetal'},{time:'18:03',boss:'Frostscale',color:'frostscale'},{time:'19:42',boss:'Skypetal',color:'skypetal'},{time:'21:22',boss:'Frostscale',color:'frostscale'},{time:'22:37',boss:'Primeval',color:'primeval'}],
  4: [{time:'0:08',boss:'Frostscale',color:'frostscale'},{time:'1:25',boss:'Primeval',color:'primeval'},{time:'3:08',boss:'Skypetal',color:'skypetal'},{time:'4:26',boss:'Skypetal',color:'skypetal'},{time:'5:53',boss:'Skypetal',color:'skypetal'},{time:'7:17',boss:'Skypetal',color:'skypetal'},{time:'8:52',boss:'Skypetal',color:'skypetal'},{time:'10:07',boss:'Primeval',color:'primeval'},{time:'11:44',boss:'Frostscale',color:'frostscale'},{time:'13:14',boss:'Primeval',color:'primeval'},{time:'14:57',boss:'Primeval',color:'primeval'},{time:'16:22',boss:'Primeval',color:'primeval'},{time:'17:53',boss:'Primeval',color:'primeval'},{time:'19:19',boss:'Frostscale',color:'frostscale'},{time:'20:40',boss:'Frostscale',color:'frostscale'},{time:'21:56',boss:'Primeval',color:'primeval'},{time:'23:25',boss:'Primeval',color:'primeval'}],
  5: [{time:'0:00',boss:'Skypetal',color:'skypetal'},{time:'1:44',boss:'Primeval',color:'primeval'},{time:'3:06',boss:'Primeval',color:'primeval'},{time:'4:38',boss:'Frostscale',color:'frostscale'},{time:'6:10',boss:'Primeval',color:'primeval'},{time:'7:52',boss:'Frostscale',color:'frostscale'},{time:'9:23',boss:'Skypetal',color:'skypetal'},{time:'10:42',boss:'Skypetal',color:'skypetal'},{time:'12:09',boss:'Skypetal',color:'skypetal'},{time:'13:36',boss:'Frostscale',color:'frostscale'},{time:'14:57',boss:'Skypetal',color:'skypetal'},{time:'16:23',boss:'Skypetal',color:'skypetal'},{time:'17:57',boss:'Frostscale',color:'frostscale'},{time:'19:25',boss:'Frostscale',color:'frostscale'},{time:'20:59',boss:'Primeval',color:'primeval'},{time:'22:19',boss:'Frostscale',color:'frostscale'},{time:'23:50',boss:'Primeval',color:'primeval'}],
  6: [{time:'0:52',boss:'Frostscale',color:'frostscale'},{time:'2:30',boss:'Primeval',color:'primeval'},{time:'3:52',boss:'Primeval',color:'primeval'},{time:'5:28',boss:'Skypetal',color:'skypetal'},{time:'6:51',boss:'Skypetal',color:'skypetal'},{time:'8:11',boss:'Skypetal',color:'skypetal'},{time:'9:56',boss:'Skypetal',color:'skypetal'},{time:'11:36',boss:'Frostscale',color:'frostscale'},{time:'12:54',boss:'Skypetal',color:'skypetal'},{time:'14:24',boss:'Primeval',color:'primeval'},{time:'16:01',boss:'Primeval',color:'primeval'},{time:'17:25',boss:'Skypetal',color:'skypetal'},{time:'19:01',boss:'Primeval',color:'primeval'},{time:'20:46',boss:'Primeval',color:'primeval'},{time:'22:27',boss:'Frostscale',color:'frostscale'},{time:'23:57',boss:'Skypetal',color:'skypetal'}],
  0: [{time:'1:15',boss:'Primeval',color:'primeval'},{time:'2:30',boss:'Primeval',color:'primeval'},{time:'4:06',boss:'Primeval',color:'primeval'},{time:'5:34',boss:'Frostscale',color:'frostscale'},{time:'7:06',boss:'Skypetal',color:'skypetal'},{time:'8:47',boss:'Skypetal',color:'skypetal'},{time:'10:23',boss:'Skypetal',color:'skypetal'},{time:'11:55',boss:'Frostscale',color:'frostscale'},{time:'13:18',boss:'Primeval',color:'primeval'},{time:'14:37',boss:'Primeval',color:'primeval'},{time:'16:00',boss:'Skypetal',color:'skypetal'},{time:'17:44',boss:'Primeval',color:'primeval'},{time:'19:10',boss:'Skypetal',color:'skypetal'},{time:'20:44',boss:'Frostscale',color:'frostscale'},{time:'22:23',boss:'Skypetal',color:'skypetal'}]
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
  if (ms <= 0) return 'Spawned';
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
    const colorClass = boss.timeUntil <= 0 ? 'spawned' : boss.color;
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
    { name: 'Be Ido Rides Again', gold: 1, silver: 70, copper: 0, xp: 6200 }
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
