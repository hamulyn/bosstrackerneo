// Load Jost Font
function loadCSS(e, t, n) {
    "use strict";
    var i = window.document.createElement("link");
    var o = t || window.document.getElementsByTagName("script")[0];
    i.rel = "stylesheet";
    i.href = e;
    i.media = "only x";
    o.parentNode.insertBefore(i, o);
    setTimeout(function () {
        i.media = n || "all"
    })
}
loadCSS("https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap");

// SERVER TIME CONFIG
const SERVER_TIMEZONE = "America/Los_Angeles";
const NA_OFFSET_HOURS = 1;
const EU_OFFSET_HOURS = 8;
let currentRegion = localStorage.getItem('selectedRegion') || 'NA';

function getServerTime() {
    const now = new Date();
    const serverTime = new Date(now.toLocaleString("en-US", { timeZone: SERVER_TIMEZONE }));
    let offset = NA_OFFSET_HOURS;
    if (currentRegion === 'EU') {
        offset = EU_OFFSET_HOURS;
    }
    serverTime.setHours(serverTime.getHours() + offset);
    return serverTime;
}

function formatServerTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

function updateServerClock() {
    const serverTime = getServerTime();
    const clockElement = document.getElementById('server-clock');
    if (clockElement) {
        clockElement.textContent = formatServerTime(serverTime);
    }
}

function getCurrentDay() {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[getServerTime().getDay()];
}

// EVENT DATA
const eventData = {
    Monday: [{ time: "12:55 AM" }, { time: "3:55 PM" }, { time: "6:55 PM" }, { time: "9:55 PM" }],
    Tuesday: [{ time: "12:55 AM" }, { time: "3:55 PM" }, { time: "6:55 PM" }, { time: "9:55 PM" }],
    Wednesday: [{ time: "12:55 AM" }, { time: "3:55 PM" }, { time: "6:55 PM" }, { time: "9:55 PM" }],
    Thursday: [{ time: "12:55 AM" }, { time: "3:55 PM" }, { time: "6:55 PM" }, { time: "9:55 PM" }],
    Friday: [{ time: "12:55 AM" }, { time: "3:55 PM" }, { time: "6:55 PM" }, { time: "9:55 PM" }],
    Saturday: [{ time: "12:55 AM" }, { time: "3:55 PM" }, { time: "6:55 PM" }, { time: "9:55 PM" }],
    Sunday: [{ time: "12:55 AM" }, { time: "3:55 PM" }, { time: "6:55 PM" }, { time: "9:55 PM" }]
};

function calculateCountdownFromDates(now, targetDate, isUnconfirmed = false) {
    const diffMs = targetDate - now;
    let totalSeconds = Math.floor(diffMs / 1000);
    let spawnPhase = false;
    if (!isUnconfirmed && totalSeconds < 0 && totalSeconds >= -300) {
        spawnPhase = true;
        totalSeconds = 300 + totalSeconds;
    }
    let hours = Math.max(0, Math.floor(totalSeconds / 3600));
    let minutes = Math.max(0, Math.floor((totalSeconds % 3600) / 60));
    let seconds = Math.max(0, totalSeconds % 60);
    return { hours, minutes, seconds, totalSeconds, spawnPhase };
}

function getCurrentBosses(data, currentDay) {
    const now = getServerTime();
    const todayBosses = (data[currentDay] || []).filter(boss =>
        boss.time && !boss.time.includes("--:--") && boss.time !== "Unknown"
    ).map(boss => {
        const [timePart, period] = boss.time.split(' ');
        let [hours, minutes] = timePart.split(':').map(Number);
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        const bossDate = new Date(now);
        bossDate.setHours(hours, minutes, 0, 0);
        return {
            ...boss,
            day: currentDay,
            date: bossDate,
            spawnEnd: new Date(bossDate.getTime() + 5 * 60 * 1000)
        };
    });
    todayBosses.sort((a, b) => a.date - b.date);
    let currentBoss = null;
    for (let i = 0; i < todayBosses.length; i++) {
        const boss = todayBosses[i];
        if (boss.date <= now && now <= boss.spawnEnd) {
            currentBoss = boss;
            break;
        } else if (boss.date > now) {
            currentBoss = boss;
            break;
        }
    }
    return { current: currentBoss };
}

// NOTIFICATIONS
const bossNotificationSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2574/2574-preview.mp3');
bossNotificationSound.preload = 'auto';

// RAGING YETI NOTIFICATION SYSTEM - SIMPLIFIED
function getYetiNotificationConfig() {
    const saved = localStorage.getItem(`yetiNotification_${currentRegion}`);
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            return { enabled: false, alertMinutes: 5 };
        }
    }
    return { enabled: false, alertMinutes: 5 };
}

function saveYetiNotificationConfig(config) {
    localStorage.setItem(`yetiNotification_${currentRegion}`, JSON.stringify(config));
}

function triggerYetiNotification() {
    const config = getYetiNotificationConfig();
    
    if (!config.enabled) return;
    
    // Play sound
    bossNotificationSound.currentTime = 0;
    bossNotificationSound.play().catch(err => console.warn('Audio play failed:', err));
    
    // Desktop notification
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification('⚠️ Raging Yeti Event', {
            body: `Yeti spawning in ${config.alertMinutes} minutes!\nHead to Rural Outfitters!`,
            icon: 'https://cdn.jsdelivr.net/npm/lucide-static@0.367.0/icons/alarm-clock.svg',
            requireInteraction: true
        });
    }
}

function renderYetiNotificationControls() {
    const config = getYetiNotificationConfig();
    
    return `
    <div class="yeti-notification-controls">
        <div class="yeti-sound-controls">
            <button class="btn-yeti-notification ${config.enabled ? 'active' : ''}" id="btn-yeti-notification" title="Toggle notification">
                <i data-lucide="bell"></i>
            </button>
            <button class="btn-yeti-test" id="btn-yeti-test" title="Test sound">
                <i data-lucide="volume-2"></i>
            </button>
        </div>
        <div class="yeti-time-selector">
            <label>Alert:</label>
            <div class="yeti-time-buttons">
                <button class="btn-yeti-time ${config.alertMinutes === 5 ? 'active' : ''}" data-minutes="5">5min</button>
                <button class="btn-yeti-time ${config.alertMinutes === 10 ? 'active' : ''}" data-minutes="10">10min</button>
                <button class="btn-yeti-time ${config.alertMinutes === 15 ? 'active' : ''}" data-minutes="15">15min</button>
            </div>
        </div>
    </div>
    `;
}

function createBossTimersHTML() {
    const currentDay = getCurrentDay();
    const eventBosses = getCurrentBosses(eventData, currentDay);

    function renderCurrentWithCountdown(boss) {
        if (!boss || !boss.date) {
            return `
        <div class="boss-card current-event placeholder-card">
          <div class="event-info">
            <div class="event-zone">Raging Yeti</div>
            <div class="event-subzone"><i data-lucide="locate-fixed"></i> Rural Outfitters</div>
            <div class="event-time">No active timer</div>
          </div>
          <div class="countdown countdown-inactive">--:--:--</div>
          ${renderYetiNotificationControls()}
        </div>`;
        }

        const now = getServerTime();
        const countdown = calculateCountdownFromDates(now, boss.date);
        let countdownClass = "countdown-active";
        let countdownText = `${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`;
        let spawnLabelHTML = "";

        if (countdown.spawnPhase) {
            countdownClass = "countdown-spawn-phase";
            countdownText = `${String(countdown.minutes).padStart(2, '0')}:${String(countdown.seconds).padStart(2, '0')}`;
            spawnLabelHTML = `<div class="spawn-label"><i data-lucide="alarm-clock"></i> Time until boss spawns</div>`;
        }

        return `
        <div class="boss-card current-event">
          <div class="event-info">
            <div class="event-zone">Raging Yeti</div>
            <div class="event-subzone"><i data-lucide="locate-fixed"></i> Rural Outfitters</div>
            <div class="event-time">${boss.day}, ${boss.time}</div>
          </div>
          ${spawnLabelHTML}
          <div class="countdown ${countdownClass}" id="event-countdown">${countdownText}</div>
          ${renderYetiNotificationControls()}
        </div>`;
    }

    let html = '<div class="col-12"><div class="boss-container event-container">';
    html += renderCurrentWithCountdown(eventBosses.current);
    html += '</div></div>';
    return html;
}

function loadBossTimers() {
    const container = document.getElementById('boss-timers-container');
    if (container) {
        container.innerHTML = createBossTimersHTML();
        lucide.createIcons();
        setupYetiNotificationListeners();
    }
}

function setupYetiNotificationListeners() {
    // Toggle notification button
    const toggleBtn = document.getElementById('btn-yeti-notification');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            const config = getYetiNotificationConfig();
            config.enabled = !config.enabled;
            saveYetiNotificationConfig(config);
            
            this.classList.toggle('active', config.enabled);
            lucide.createIcons({ elements: [this.querySelector('i')] });
        });
    }
    
    // Test sound button
    const testBtn = document.getElementById('btn-yeti-test');
    if (testBtn) {
        testBtn.addEventListener('click', function() {
            triggerYetiNotification();
        });
    }
    
    // Time selector buttons
    const timeButtons = document.querySelectorAll('.btn-yeti-time');
    timeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const minutes = parseInt(this.dataset.minutes);
            const config = getYetiNotificationConfig();
            config.alertMinutes = minutes;
            saveYetiNotificationConfig(config);
            
            // Update active state
            timeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Atualizar ícones após modificar as classes
    lucide.createIcons();
}

function updateCountdownTexts() {
    const currentDay = getCurrentDay();
    const eventBosses = getCurrentBosses(eventData, currentDay);
    const boss = eventBosses.current;
    if (!boss || !boss.date) return;

    const now = getServerTime();
    const countdown = calculateCountdownFromDates(now, boss.date);
    let countdownClass = "countdown-active";
    let countdownText = `${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`;

    if (countdown.spawnPhase) {
        countdownClass = "countdown-spawn-phase";
        countdownText = `${String(countdown.minutes).padStart(2, '0')}:${String(countdown.seconds).padStart(2, '0')}`;
    }

    const el = document.getElementById('event-countdown');
    if (el) {
        el.className = 'countdown ' + countdownClass;
        el.textContent = countdownText;
    }
    
    // Check for notification trigger
    const config = getYetiNotificationConfig();
    if (config.enabled) {
        const alertSeconds = config.alertMinutes * 60;
        const isInAlertWindow = countdown.totalSeconds <= alertSeconds && countdown.totalSeconds > alertSeconds - 2;
        
        if (isInAlertWindow && !window.yetiNotified) {
            window.yetiNotified = true;
            triggerYetiNotification();
            
            setTimeout(() => {
                window.yetiNotified = false;
            }, alertSeconds * 1000 + 5000);
        }
    }
}

function setMainTool(toolName) {
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    const mainToolLink = document.querySelector(`[data-section="${toolName}"]`);
    if (mainToolLink) mainToolLink.classList.add('active');
    document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
    const mainToolSection = document.getElementById(toolName);
    if (mainToolSection) {
        mainToolSection.classList.add('active');
        if (toolName === 'field-boss') loadBossTimers();
    }
    localStorage.setItem('activeSection', toolName);
}

function setRegion(region) {
    currentRegion = region;
    localStorage.setItem('selectedRegion', region);
    document.getElementById('region-na').classList.toggle('active', region === 'NA');
    document.getElementById('region-eu').classList.toggle('active', region === 'EU');
    loadBossTimers();
    updateServerClock();
}

// BOSS TIMER SYSTEM
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    const savedSection = localStorage.getItem('activeSection') || 'field-boss';
    setMainTool(savedSection);
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            setMainTool(section);
        });
    });

    const sidebarToggle = document.getElementById('sidebarToggleBtn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile) {
        const isSidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        if (isSidebarCollapsed) {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('expanded');
        }
    }
    
    sidebarToggle.addEventListener('click', () => {
        if (isMobile) {
            sidebar.classList.toggle('show');
        } else {
            const isNowCollapsed = sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded', isNowCollapsed);
            localStorage.setItem('sidebarCollapsed', isNowCollapsed);
        }
    });

    setRegion(currentRegion);
    document.getElementById('region-na').addEventListener('click', () => setRegion('NA'));
    document.getElementById('region-eu').addEventListener('click', () => setRegion('EU'));

    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-notification-toggle')) {
            const btn = e.target.closest('.btn-notification-toggle');
            const bossType = btn.dataset.bossType;
            if (bossType) {
                const config = getBossConfig(bossType);
                config.enabled = !config.enabled;
                saveBossConfig(bossType, config);
                updateBossNotificationUI(bossType);
            }
        }
    });

    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-test-sound')) {
            const btn = e.target.closest('.btn-test-sound');
            const bossType = btn.dataset.bossType;
            if (bossType) {
                triggerBossNotification(bossType);
            }
        }
    });

    setInterval(updateServerClock, 1000);
    setInterval(updateCountdownTexts, 1000);
    updateServerClock();
    updateCountdownTexts();

    // FIELD BOSS TIMER
    const CONFIG = {
        maxTimers: 6,
        defaultChannels: 20,
        maxChannels: 40,
        timerTypes: {
            normal: { duration: 300 },
            mutant: { duration: 480 }
        }
    };

    const channelContainer = document.getElementById('channel-container');
    const activeTimersContainer = document.getElementById('active-timers');
    const clearAllTimersBtn = document.getElementById('clear-all-timers');
    const toggleSortBtn = document.getElementById('toggle-sort-timers');
    const activeTimers = {};
    const SORT_KEY = 'timerSortOrder';
    let isAscending = localStorage.getItem(SORT_KEY) !== 'false';

    const notificationSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2870/2870-preview.mp3');
    notificationSound.preload = 'auto';

    const CHANNELS_KEY = 'additionalChannels';

    function saveTimers() {
        const timersToSave = {};
        for (const channel in activeTimers) {
            const timer = activeTimers[channel];
            timersToSave[channel] = {
                type: timer.type,
                remaining: timer.remaining,
                startTime: timer.type ? Date.now() - ((CONFIG.timerTypes[timer.type].duration - timer.remaining) * 1000) : null,
                notificationsEnabled: timer.notificationsEnabled || false
            };
        }
        localStorage.setItem('activeTimers', JSON.stringify(timersToSave));
    }

    function loadTimers() {
        const savedTimers = JSON.parse(localStorage.getItem('activeTimers') || '{}');
        for (const channel in savedTimers) {
            const timerData = savedTimers[channel];
            if (timerData.type) {
                createTimer(channel);
                const channelBtn = document.querySelector(`[data-channel="${channel}"]`);
                if (channelBtn) channelBtn.classList.add('selected');
                startTimer(channel, timerData.type, timerData.startTime);
                activeTimers[channel].notificationsEnabled = timerData.notificationsEnabled || false;
                updateNotificationToggle(channel);
            }
        }
        sortTimers();
    }

    function saveAdditionalChannels() {
        const additionalChannels = Array.from(channelContainer.querySelectorAll('.channel-btn'))
            .filter(btn => parseInt(btn.dataset.channel) > CONFIG.defaultChannels)
            .map(btn => parseInt(btn.dataset.channel))
            .sort((a, b) => a - b);
        localStorage.setItem(CHANNELS_KEY, JSON.stringify(additionalChannels));
    }

    function loadAdditionalChannels() {
        return JSON.parse(localStorage.getItem(CHANNELS_KEY) || '[]').sort((a, b) => a - b);
    }

    function generateChannelButtons() {
        channelContainer.innerHTML = '';
        for (let i = 1; i <= CONFIG.defaultChannels; i++) {
            createChannelButton(i);
        }
        const additionalChannels = loadAdditionalChannels();
        additionalChannels.forEach(channel => {
            if (channel <= CONFIG.maxChannels) {
                createChannelButton(channel, true);
            }
        });
        const addButton = document.createElement('button');
        addButton.className = 'channel-btn add-channel-btn';
        addButton.innerHTML = '<i data-lucide="plus"></i>';
        addButton.onclick = addNewChannel;
        channelContainer.appendChild(addButton);
        lucide.createIcons();
    }

    function createChannelButton(channel, removable = false) {
        const btnContainer = document.createElement('div');
        btnContainer.className = 'channel-btn-container';
        const btn = document.createElement('button');
        btn.className = 'channel-btn';
        btn.innerHTML = `CH${channel}`;
        btn.dataset.channel = channel;
        btn.onclick = toggleChannel;
        btnContainer.appendChild(btn);
        if (removable) {
            const removeBtn = document.createElement('button');
            removeBtn.className = 'channel-remove-btn';
            removeBtn.innerHTML = '<i data-lucide="x"></i>';
            removeBtn.onclick = () => removeChannel(channel);
            btnContainer.appendChild(removeBtn);
        }
        const existingContainers = Array.from(channelContainer.querySelectorAll('.channel-btn-container'));
        let inserted = false;
        for (const container of existingContainers) {
            const existingChannel = parseInt(container.querySelector('.channel-btn')?.dataset.channel || Infinity);
            if (channel < existingChannel) {
                channelContainer.insertBefore(btnContainer, container);
                inserted = true;
                break;
            }
        }
        if (!inserted) {
            const addButton = channelContainer.querySelector('.add-channel-btn');
            channelContainer.insertBefore(btnContainer, addButton);
        }
        lucide.createIcons();
    }

    function addNewChannel() {
        const currentChannels = Array.from(channelContainer.querySelectorAll('.channel-btn'))
            .filter(btn => btn.dataset.channel)
            .map(btn => parseInt(btn.dataset.channel))
            .sort((a, b) => a - b);
        let nextChannel = CONFIG.defaultChannels + 1;
        while (currentChannels.includes(nextChannel) && nextChannel <= CONFIG.maxChannels) {
            nextChannel++;
        }
        if (nextChannel > CONFIG.maxChannels) {
            alert(`Maximum channel limit (CH${CONFIG.maxChannels}) reached!`);
            return;
        }
        createChannelButton(nextChannel, true);
        saveAdditionalChannels();
    }

    function removeChannel(channel) {
        const btnContainer = channelContainer.querySelector(`.channel-btn[data-channel="${channel}"]`).parentElement;
        if (activeTimers[channel]) {
            removeTimer(channel);
        }
        btnContainer.remove();
        saveAdditionalChannels();
    }

    window.startTimer = function(channel, type, savedStartTime = null) {
        if (!activeTimers[channel]) return;
        const currentTimer = activeTimers[channel];
        clearInterval(currentTimer.interval);
        const duration = CONFIG.timerTypes[type].duration;
        currentTimer.type = type;
        currentTimer.soundPlayedAt60 = false;
        const timerBox = document.querySelector(`.timer-box[data-channel="${channel}"]`);
        const display = document.getElementById(`display-${channel}`);
        display.style.color = '';
        timerBox.classList.remove('timer-completed');
        timerBox.querySelectorAll('.btn-normal, .btn-mutant').forEach(btn => {
            btn.classList.remove('selected-timer-btn');
        });
        const clickedBtn = timerBox.querySelector(`.btn-${type}`);
        clickedBtn.classList.add('selected-timer-btn');
        const startTime = savedStartTime || Date.now();
        const endTime = startTime + (duration * 1000);
        const now = Date.now();
        currentTimer.remaining = savedStartTime ? Math.max(Math.round((endTime - now) / 1000), 0) : duration;
        updateDisplay(channel);
        if (currentTimer.remaining > 0) {
            currentTimer.interval = setInterval(() => {
                const now = Date.now();
                const remaining = Math.round((endTime - now) / 1000);
                currentTimer.remaining = Math.max(remaining, 0);
                updateDisplay(channel);
                saveTimers();
                sortTimers();
            }, 1000);
        } else {
            timerBox.classList.add('timer-completed');
        }
        saveTimers();
        sortTimers();
    };

    window.removeTimer = function(channel) {
        if (!activeTimers[channel]) return;
        const timerBox = document.getElementById(`timer-${channel}`);
        if (!timerBox) return;
        if (activeTimers[channel].interval) clearInterval(activeTimers[channel].interval);
        timerBox.classList.remove('visible');
        setTimeout(() => {
            timerBox.remove();
            delete activeTimers[channel];
            const channelBtn = document.querySelector(`[data-channel="${channel}"]`);
            if (channelBtn) channelBtn.classList.remove('selected');
            sortTimers();
            if (Object.keys(activeTimers).length === 0) {
                renderNoActiveTimersMessage();
            }
            saveTimers();
        }, 300);
    };

    window.resetTimer = function(channel) {
        if (activeTimers[channel]) {
            const timer = activeTimers[channel];
            const timerType = timer.type;
            if (timerType) {
                startTimer(channel, timerType);
            }
        }
    };

    function toggleChannel(e) {
        const channel = e.target.dataset.channel;
        if (e.target.classList.contains('selected')) {
            e.target.classList.remove('selected');
            removeTimer(channel);
            return;
        }
        if (Object.keys(activeTimers).length >= CONFIG.maxTimers) {
            alert(`Maximum of ${CONFIG.maxTimers} active timers!`);
            return;
        }
        e.target.classList.add('selected');
        createTimer(channel);
    }

    function updateNotificationToggle(channel) {
        const toggle = document.querySelector(`.notification-toggle[data-channel="${channel}"]`);
        if (!toggle) return;
        const isActive = activeTimers[channel]?.notificationsEnabled || false;
        toggle.classList.toggle('active', isActive);
        lucide.createIcons({ elements: [toggle.querySelector('i')] });
    }

    function createTimer(channel) {
        if (activeTimers[channel]) removeTimer(channel);
        const noActiveTimersMessage = document.querySelector('.no-active-timers');
        if (noActiveTimersMessage) noActiveTimersMessage.classList.add('hidden');

        const timerId = `timer-${channel}`;
        const timerHTML = `
      <div class="timer-box" id="${timerId}" data-channel="${channel}">
        <div class="timer-notifications">
          <div class="notification-toggle" data-channel="${channel}">
            <i data-lucide="bell"></i>
          </div>
          <span class="channel-badge">Channel ${channel}</span>
        </div>
        <div class="timer-controls">
          <button class="btn btn-normal" onclick="startTimer(${channel}, 'normal')">
            <i data-lucide="clock"></i> Normal
          </button>
          <button class="btn btn-mutant" onclick="startTimer(${channel}, 'mutant')">
            <i data-lucide="skull"></i> Mutant
          </button>
        </div>
        <div class="timer-display" id="display-${channel}">00:00</div>
        <div class="timer-box-actions">
          <button class="btn btn-reset" onclick="resetTimer(${channel})">
            <i data-lucide="rotate-ccw"></i> Reset
          </button>
          <button class="btn btn-remove" onclick="removeTimer(${channel})">
            <i data-lucide="trash-2"></i> Remove
          </button>
        </div>
      </div>
    `;
        activeTimersContainer.insertAdjacentHTML('beforeend', timerHTML);
        const newTimer = document.getElementById(timerId);
        setTimeout(() => newTimer.classList.add('visible'), 10);

        activeTimers[channel] = {
            element: newTimer,
            interval: null,
            remaining: 0,
            type: null,
            soundPlayedAt60: false,
            notificationsEnabled: false
        };

        const notificationToggle = newTimer.querySelector(`.notification-toggle[data-channel="${channel}"]`);
        notificationToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            activeTimers[channel].notificationsEnabled = this.classList.contains('active');
            saveTimers();
        });

        sortTimers();
        saveTimers();
        lucide.createIcons();
    }

    function sortTimers() {
        const timers = Array.from(activeTimersContainer.querySelectorAll('.timer-box'));
        timers.sort((a, b) => {
            const channelA = parseInt(a.getAttribute('data-channel'));
            const channelB = parseInt(b.getAttribute('data-channel'));
            const remainingA = activeTimers[channelA]?.remaining || 0;
            const remainingB = activeTimers[channelB]?.remaining || 0;
            return isAscending ? remainingA - remainingB : remainingB - remainingA;
        });
        activeTimersContainer.innerHTML = '';
        timers.forEach(timer => activeTimersContainer.appendChild(timer));
        lucide.createIcons();
    }

    function renderNoActiveTimersMessage() {
        const noActiveTimersHTML = `
      <div class="no-active-timers">
        <h3>Timer list is empty</h3>
        <p>Start by selecting a channel</p>
      </div>
    `;
        activeTimersContainer.innerHTML = noActiveTimersHTML;
    }

    function updateDisplay(channel) {
        const display = document.getElementById(`display-${channel}`);
        const timerBox = document.querySelector(`.timer-box[data-channel="${channel}"]`);
        if (!display || !activeTimers[channel]) return;

        const { remaining } = activeTimers[channel];
        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;
        display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        display.classList.remove('warning', 'timer-completed');
        timerBox.classList.remove('timer-completed');

        if (remaining === 60 && activeTimers[channel].notificationsEnabled && !activeTimers[channel].soundPlayedAt60) {
            activeTimers[channel].soundPlayedAt60 = true;
            notificationSound.currentTime = 0;
            notificationSound.play().catch(console.error);
            setTimeout(() => {
                notificationSound.currentTime = 0;
                notificationSound.play().catch(console.error);
            }, 800);
        }

        if (remaining === 0) {
            display.textContent = 'NOW!';
            display.classList.add('timer-completed');
            timerBox.classList.add('timer-completed');
        } else if (remaining <= 60) {
            display.classList.add('warning');
        }
    }

    clearAllTimersBtn.addEventListener('click', function() {
        const activeChannels = Object.keys(activeTimers);
        if (activeChannels.length === 0) {
            renderNoActiveTimersMessage();
            return;
        }
        activeChannels.forEach(channel => removeTimer(channel));
        document.querySelectorAll('.channel-btn.selected').forEach(btn => btn.classList.remove('selected'));
        saveTimers();
    });

    function initialize() {
        generateChannelButtons();
        loadTimers();
        if (Object.keys(activeTimers).length === 0) {
            renderNoActiveTimersMessage();
        } else {
            sortTimers();
        }
        toggleSortBtn.classList.toggle('ascending', isAscending);
        toggleSortBtn.title = isAscending ? 'Sort: Shortest to Longest' : 'Sort: Longest to Shortest';
        toggleSortBtn.addEventListener('click', function() {
            isAscending = !isAscending;
            localStorage.setItem(SORT_KEY, isAscending);
            toggleSortBtn.classList.toggle('ascending', isAscending);
            toggleSortBtn.title = isAscending ? 'Sort: Shortest to Longest' : 'Sort: Longest to Shortest';
            sortTimers();
        });
    }

    initialize();

    // Supreme Force Calculator
    const dungeonSelect = document.getElementById('dungeon-select');
    const dungeonForce = document.getElementById('dungeon-force');
    const memberInputs = [
        document.getElementById('member1'),
        document.getElementById('member2'),
        document.getElementById('member3'),
        document.getElementById('member4'),
        document.getElementById('member5'),
        document.getElementById('member6')
    ];
    const partyAverage = document.getElementById('party-average');
    let requiredForce = 14690;

    function updatePartyAverage() {
        let sum = 0;
        let count = 0;
        memberInputs.forEach(input => {
            const value = parseInt(input.value);
            if (!isNaN(value) && value > 0) {
                sum += value;
                count++;
            }
        });
        if (count > 0) {
            const average = Math.round(sum / count);
            partyAverage.innerHTML = `Party Average Force: <span class="party-average-display ${average >= requiredForce ? 'out-of-range' : 'within-range'}">${average.toLocaleString('en-US')}</span>`;
        } else {
            partyAverage.textContent = 'Party Average Force: -';
        }
    }

    dungeonSelect.addEventListener('change', function() {
        const selectedOption = dungeonSelect.options[dungeonSelect.selectedIndex];
        requiredForce = parseInt(selectedOption.getAttribute('data-force'));
        dungeonForce.textContent = `Required: ${requiredForce.toLocaleString('en-US')}`;
        updatePartyAverage();
    });

    memberInputs.forEach(input => {
        input.addEventListener('input', updatePartyAverage);
    });

    updatePartyAverage();

    // ANCIENT LUNAR - Monarch Tracker
    const MONARCH_WINDOW1_TIME = 8700; // 2h 25min in seconds
    const MONARCH_WINDOW2_TIME = 15900; // 4h 25min in seconds
    const monarchTimers = {};
    const monarchNotificationSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2574/2574-preview.mp3');
    const notifiedWindows = {};

    // Request notification permission
    if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
    }

    document.querySelectorAll('.btn-monarch-kill').forEach(btn => {
        btn.addEventListener('click', function() {
            const channel = this.dataset.channel;
            startMonarchTimer(channel);
        });
    });

    function startMonarchTimer(channel) {
        if (monarchTimers[channel]) {
            clearInterval(monarchTimers[channel].interval);
        }

        const killTime = Date.now();
        const window1Time = killTime + (MONARCH_WINDOW1_TIME * 1000);
        const window2Time = killTime + (MONARCH_WINDOW2_TIME * 1000);

        monarchTimers[channel] = {
            killTime,
            window1Time,
            window2Time,
            interval: setInterval(() => updateMonarchDisplay(channel), 1000)
        };

        notifiedWindows[channel] = { window1: false, window2: false };

        document.getElementById(`monarch-status-${channel}`).textContent = 'Tracking both windows...';
        document.getElementById(`monarch-notice-${channel}`).style.display = 'block';
        
        // Hide confirm buttons
        const confirmBtns = document.getElementById(`monarch-confirm-${channel}`);
        if (confirmBtns) confirmBtns.style.display = 'none';
        
        updateMonarchDisplay(channel);
        saveMonarchTimers();
    }

    function showDesktopNotification(title, body) {
        if ("Notification" in window && Notification.permission === "granted") {
            new Notification(title, {
                body: body,
                icon: 'https://cdn.jsdelivr.net/npm/lucide-static@0.367.0/icons/crown.svg',
                requireInteraction: true
            });
        }
    }

    function updateMonarchDisplay(channel) {
        const timer = monarchTimers[channel];
        if (!timer) return;

        const now = Date.now();
        const remaining1 = Math.max(0, Math.floor((timer.window1Time - now) / 1000));
        const remaining2 = Math.max(0, Math.floor((timer.window2Time - now) / 1000));
        
        const hours1 = Math.floor(remaining1 / 3600);
        const minutes1 = Math.floor((remaining1 % 3600) / 60);
        const seconds1 = remaining1 % 60;
        
        const hours2 = Math.floor(remaining2 / 3600);
        const minutes2 = Math.floor((remaining2 % 3600) / 60);
        const seconds2 = remaining2 % 60;
        
        const timer1El = document.getElementById(`monarch-timer${channel}-1`);
        const timer2El = document.getElementById(`monarch-timer${channel}-2`);
        const window1El = document.getElementById(`monarch-window${channel}-1`);
        const window2El = document.getElementById(`monarch-window${channel}-2`);
        const statusEl = document.getElementById(`monarch-status-${channel}`);

        if (remaining1 > 0) {
            timer1El.textContent = `${String(hours1).padStart(2, '0')}:${String(minutes1).padStart(2, '0')}:${String(seconds1).padStart(2, '0')}`;
            
            // Alert at 5 minutes
            if (remaining1 <= 300 && remaining1 > 298 && !notifiedWindows[channel].window1) {
                notifiedWindows[channel].window1 = true;
                const config = getMonarchConfig(channel);
                if (config.enabled) {
                    monarchNotificationSound.play();
                    showDesktopNotification(
                        `⚠️ MONARCH CH${channel} - Window 1`,
                        `Monarch may spawn in 5 minutes!\nWindow 1: 2h 25min mark\n\nCheck both CH1 and CH2!`
                    );
                    alert(`⚠️ MONARCH CH${channel} - Window 1\n\nMonarch may spawn in 5 minutes!\nWindow 1: 2h 25min mark\n\nNote: Check both CH1 and CH2 in case of channel swap!`);
                }
            }
            
            if (remaining1 <= 300) {
                window1El.classList.add('active');
            }
        } else {
            timer1El.textContent = 'Respawn Check';
            timer1El.style.color = 'var(--accent-color)';
            timer1El.style.fontSize = '1.2rem';
            window1El.classList.remove('active');
            
            // Show confirm buttons
            const confirmBtns = document.getElementById(`monarch-confirm-${channel}`);
            if (confirmBtns && remaining2 > 0) {
                confirmBtns.style.display = 'flex';
            }
        }

        if (remaining2 > 0) {
            timer2El.textContent = `${String(hours2).padStart(2, '0')}:${String(minutes2).padStart(2, '0')}:${String(seconds2).padStart(2, '0')}`;
            
            // Alert at 5 minutes
            if (remaining2 <= 300 && remaining2 > 298 && !notifiedWindows[channel].window2) {
                notifiedWindows[channel].window2 = true;
                const config = getMonarchConfig(channel);
                if (config.enabled) {
                    monarchNotificationSound.play();
                    showDesktopNotification(
                        `⚠️ MONARCH CH${channel} - Window 2`,
                        `Monarch may spawn in 5 minutes!\nWindow 2: 4h 25min mark\n\nCheck both CH1 and CH2!`
                    );
                    alert(`⚠️ MONARCH CH${channel} - Window 2\n\nMonarch may spawn in 5 minutes!\nWindow 2: 4h 25min mark\n\nNote: Check both CH1 and CH2 in case of channel swap!`);
                }
            }
            
            if (remaining2 <= 300) {
                window2El.classList.add('active');
            }
        } else {
            timer2El.textContent = 'Respawn Check';
            timer2El.style.color = 'var(--golden-color)';
            timer2El.style.fontSize = '1.2rem';
            window2El.classList.remove('active');
        }

        if (remaining1 === 0 && remaining2 === 0) {
            statusEl.textContent = 'Check both windows for respawn';
            statusEl.style.color = 'var(--text-color2)';
            
            // Show confirm buttons
            const confirmBtns = document.getElementById(`monarch-confirm-${channel}`);
            if (confirmBtns) {
                confirmBtns.style.display = 'flex';
            }
        } else if (remaining1 === 0) {
            statusEl.textContent = 'Window 1 passed - Tracking Window 2';
            statusEl.style.color = 'var(--golden-color)';
        } else {
            statusEl.textContent = 'Tracking both windows...';
            statusEl.style.color = 'var(--text-light)';
        }
    }

    // Confirm/Cancel respawn handlers
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-monarch-confirm')) {
            const btn = e.target.closest('.btn-monarch-confirm');
            const channel = btn.dataset.channel;
            
            if (monarchTimers[channel]) {
                clearInterval(monarchTimers[channel].interval);
                delete monarchTimers[channel];
                delete notifiedWindows[channel];
                saveMonarchTimers();
            }
            
            // Reset display
            document.getElementById(`monarch-timer${channel}-1`).textContent = '--:--:--';
            document.getElementById(`monarch-timer${channel}-2`).textContent = '--:--:--';
            document.getElementById(`monarch-status-${channel}`).textContent = 'Respawn confirmed';
            document.getElementById(`monarch-notice-${channel}`).style.display = 'none';
            document.getElementById(`monarch-confirm-${channel}`).style.display = 'none';
            
            setTimeout(() => {
                document.getElementById(`monarch-status-${channel}`).textContent = 'No timer set';
            }, 3000);
        }
        
        if (e.target.closest('.btn-monarch-cancel')) {
            const btn = e.target.closest('.btn-monarch-cancel');
            const channel = btn.dataset.channel;
            
            if (monarchTimers[channel]) {
                clearInterval(monarchTimers[channel].interval);
                delete monarchTimers[channel];
                delete notifiedWindows[channel];
                saveMonarchTimers();
            }
            
            // Reset display
            document.getElementById(`monarch-timer${channel}-1`).textContent = '--:--:--';
            document.getElementById(`monarch-timer${channel}-2`).textContent = '--:--:--';
            document.getElementById(`monarch-status-${channel}`).textContent = 'Timer cancelled';
            document.getElementById(`monarch-notice-${channel}`).style.display = 'none';
            document.getElementById(`monarch-confirm-${channel}`).style.display = 'none';
            
            setTimeout(() => {
                document.getElementById(`monarch-status-${channel}`).textContent = 'No timer set';
            }, 3000);
        }
    });

    function getMonarchConfig(channel) {
        const saved = JSON.parse(localStorage.getItem('monarchNotificationConfig') || '{}');
        return saved[channel] || { enabled: false };
    }

    function saveMonarchConfig(channel, config) {
        const all = JSON.parse(localStorage.getItem('monarchNotificationConfig') || '{}');
        all[channel] = config;
        localStorage.setItem('monarchNotificationConfig', JSON.stringify(all));
    }

    function saveMonarchTimers() {
        const timersToSave = {};
        for (const channel in monarchTimers) {
            timersToSave[channel] = {
                killTime: monarchTimers[channel].killTime,
                window1Time: monarchTimers[channel].window1Time,
                window2Time: monarchTimers[channel].window2Time
            };
        }
        localStorage.setItem('monarchTimers', JSON.stringify(timersToSave));
        localStorage.setItem('monarchNotifiedWindows', JSON.stringify(notifiedWindows));
    }

    function loadMonarchTimers() {
        const saved = JSON.parse(localStorage.getItem('monarchTimers') || '{}');
        const savedNotified = JSON.parse(localStorage.getItem('monarchNotifiedWindows') || '{}');
        
        for (const channel in saved) {
            const data = saved[channel];
            const now = Date.now();
            if (data.window2Time > now) {
                monarchTimers[channel] = {
                    killTime: data.killTime,
                    window1Time: data.window1Time,
                    window2Time: data.window2Time,
                    interval: setInterval(() => updateMonarchDisplay(channel), 1000)
                };
                notifiedWindows[channel] = savedNotified[channel] || { window1: false, window2: false };
                document.getElementById(`monarch-notice-${channel}`).style.display = 'block';
                updateMonarchDisplay(channel);
            }
        }
    }

    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-notification-toggle[data-monarch-channel]')) {
            const btn = e.target.closest('.btn-notification-toggle');
            const channel = btn.dataset.monarchChannel;
            const config = getMonarchConfig(channel);
            config.enabled = !config.enabled;
            saveMonarchConfig(channel, config);
            btn.classList.toggle('active', config.enabled);
            lucide.createIcons({ elements: [btn.querySelector('i')] });
        }

        if (e.target.closest('.btn-test-sound[data-monarch-channel]')) {
            const btn = e.target.closest('.btn-test-sound');
            const channel = btn.dataset.monarchChannel;
            monarchNotificationSound.currentTime = 0;
            monarchNotificationSound.play();
            
            // Show test alert
            alert(`⚠️ MONARCH CH${channel} - TEST ALERT\n\nThis is a test notification.\nMonarch may spawn in 5 minutes!\n\nWindow 1: 2h 25min mark\nWindow 2: 4h 25min mark\n\nNote: Check both CH1 and CH2 in case of channel swap!`);
        }
    });

    loadMonarchTimers();

    // Grind Calculator with Real XP Table
    let selectedMobLevel = 60;
    
    // XP Table from document (Big Mob XP at 100% boost)
    const xpTable = {
        60: {
            63: 797, 64: 737, 65: 677, 66: 617, 67: 557, 68: 497, 69: 429, 70: 368,
            71: 308, 72: 248, 73: 188, 74: 128, 75: 68, 76: 0, 77: 0, 78: 0, 79: 0, 80: 0
        },
        70: {
            63: 386, 64: 386, 65: 386, 66: 386, 67: 386, 68: 386, 69: 386, 70: 386,
            71: 386, 72: 386, 73: 358, 74: 331, 75: 304, 76: 277, 77: 250, 78: 223, 79: 193, 80: 165
        }
    };
    
    document.querySelectorAll('.btn-mob-level').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.btn-mob-level').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedMobLevel = parseInt(this.dataset.level);
        });
    });

    document.getElementById('calculate-grind').addEventListener('click', function() {
        const charLevel = parseInt(document.getElementById('char-level').value);
        const xpBoost = parseInt(document.getElementById('xp-boost').value);
        const smallMobs = parseInt(document.getElementById('small-mobs').value) || 0;
        const bigMobs = parseInt(document.getElementById('big-mobs').value) || 0;
        const clearTime = parseInt(document.getElementById('clear-time').value) || 0;

        if (!charLevel || charLevel < 63 || charLevel > 80) {
            alert('Please enter a valid character level (63-80)');
            return;
        }

        if (!xpBoost || xpBoost < 100 || xpBoost > 280) {
            alert('Please enter a valid XP boost (100-280%)');
            return;
        }

        if (smallMobs === 0 && bigMobs === 0) {
            alert('Please enter at least one mob count');
            return;
        }

        if (clearTime < 0) {
            alert('Please enter a valid clear time (0 or more seconds)');
            return;
        }

        // Get base XP for big mob at 100% boost
        const bigMobBaseXP = xpTable[selectedMobLevel][charLevel] || 0;
        
        if (bigMobBaseXP === 0) {
            alert(`No XP gained at level ${charLevel} from level ${selectedMobLevel} mobs`);
            document.getElementById('xp-per-min').textContent = '0';
            document.getElementById('xp-per-hour').textContent = '0';
            return;
        }
        
        // Small mob gives 43.75% of big mob XP
        const smallMobBaseXP = bigMobBaseXP * 0.4375;
        
        // Apply XP boost
        const bigMobXP = bigMobBaseXP * (xpBoost / 100);
        const smallMobXP = smallMobBaseXP * (xpBoost / 100);
        
        // Total XP per clear
        const xpPerClear = (bigMobs * bigMobXP) + (smallMobs * smallMobXP);
        
        // Time per cycle = clear time + 30 seconds respawn
        const timePerCycle = clearTime + 30;
        
        // XP per minute
        const xpPerMinute = (xpPerClear / timePerCycle) * 60;
        
        // XP per hour
        const xpPerHour = xpPerMinute * 60;

        document.getElementById('xp-per-min').textContent = Math.round(xpPerMinute).toLocaleString('en-US');
        document.getElementById('xp-per-hour').textContent = Math.round(xpPerHour).toLocaleString('en-US');

        const resultsContainer = document.getElementById('calc-results');
        resultsContainer.style.animation = 'none';
        setTimeout(() => {
            resultsContainer.style.animation = 'fadeIn 0.5s ease';
        }, 10);
    });
});

// Gold & XP Tracker
(function() {
    const LS_REGION_KEY = 'goldXpTracker_region';
    const LS_CHECKED_KEY = 'goldXpTracker_checkedItems';
    const LS_SHOW_VALUES_KEY = 'goldXpTracker_showValues';
    const INCREMENTABLE_CATEGORIES = ['lunar50', 'lunar55', 'lunar60', 'event', 'msp'];

    const trackerTypes = {
        dailies: {
            name: 'Dailies and Weekly',
            categories: {
                fieldBosses: { title: 'Field Bosses', type: 'daily', items: [
                    { name: 'Any Field Boss MW', gold: 0.81, xp: 3800 },
                    { name: 'Any Field Boss SF', gold: 0.85, xp: 5500 }
                ]},
                proDungeons: { title: 'PRO Dungeons', type: 'daily', items: [
                    { name: 'Any Purple MW', gold: 1.25, xp: 5200 },
                    { name: 'Garden', gold: 1.7, xp: 6700 },
                    { name: 'Asura', gold: 1.7, xp: 6700 },
                    { name: 'Lower Floor', gold: 1.7, xp: 62000 },
                    { name: 'Upper Floor', gold: 1.7, xp: 62000 },
                    { name: 'Labyrinth', gold: 1.25, xp: 6100 },
                    { name: 'Sea Garrison', gold: 1.25, xp: 6100 },
                    { name: 'Tree', gold: 1.25, xp: 6100 },
                    { name: 'Yeti', gold: 2.21, xp: 80600 }
                ]},
                blueDungeons: { title: 'Blue Dungeons', type: 'daily', items: [
                    { name: 'Any Blue MW', gold: 0.53, xp: 4400 },
                    { name: 'Chuanka', gold: 1.15, xp: 4900 },
                    { name: 'Talus', gold: 1.15, xp: 4900 },
                    { name: 'Ebondrake', gold: 1.15, xp: 4900 }
                ]},
                factionDaily: { title: 'Faction Daily', type: 'daily', items: [
                    { name: 'Silverfrost', gold: 0, xp: 27750 },
                    { name: 'Woods', gold: 0.9, xp: 9870 },
                    { name: 'Beach', gold: 0.44, xp: 4500 },
                    { name: 'East Razorwing', gold: 0, xp: 3410 },
                    { name: 'Desert', gold: 0, xp: 2580 },
                    { name: 'North Tomun', gold: 0, xp: 1400 }
                ]},
                normalQuests: { title: 'Silverfrost', type: 'daily', items: [
                    { name: 'Shifting Beneath', gold: 0.65, xp: 4800 },
                    { name: 'Slavery in the North', gold: 0.59, xp: 300 },
                    { name: 'Beastbog', gold: 1.5, xp: 30000 },
                    { name: 'Two Tribes', gold: 0.57, xp: 4800 }
                ]},
                misc: { title: 'Misc', type: 'daily', items: [
                    { name: 'Suspicious Ritual', gold: 0.5, xp: 2200 },
                    { name: 'Lunar Meadow', gold: 0.5, xp: 2200 },
                    { name: 'Tower floor 7', gold: 1.44, xp: 5000 },
                    { name: 'Beluga PvP x3', gold: 0.78, xp: 1500 },
                    { name: 'Beluga PvP Win', gold: 1.6, xp: 3000 }
                ]},
                weekly: { title: 'Weekly', type: 'weekly', items: [
                    { name: 'Floor 7 x7', gold: 1, xp: 10000 },
                    { name: 'Legendary x7', gold: 2, xp: 10000 },
                    { name: 'Heroic SF x7', gold: 2, xp: 10000 },
                    { name: 'Blue SF x7', gold: 1, xp: 10000 },
                    { name: 'Field Boss SF x3', gold: 1, xp: 10000 },
                    { name: 'Beluga PVP x2', gold: 2, xp: 10000 }
                ]}
            }
        },
        goldchest: {
            name: 'Gold Chest',
            categories: {
                lunar60: { title: 'Lunar lv60 Chest', type: 'daily', items: [
                    { name: '1 Gold', gold: 1.0 },
                    { name: '2 Gold', gold: 2.0 },
                    { name: '5 Gold', gold: 5.0 },
                    { name: '10 Gold', gold: 10.0 },
                    { name: '20 Gold', gold: 20.0 },
                    { name: '50 Gold', gold: 50.0 },
                    { name: '100 Gold', gold: 100.0 }
                ]},
                lunar55: { title: 'Lunar lv55 Chest', type: 'daily', items: [
                    { name: '60 Silver', gold: 0.60 },
                    { name: '120 Silver', gold: 1.2 },
                    { name: '3 Gold', gold: 3.0 },
                    { name: '6 Gold', gold: 6.0 },
                    { name: '12 Gold', gold: 12.0 },
                    { name: '30 Gold', gold: 30.0 },
                    { name: '60 Gold', gold: 60.0 }
                ]},
                lunar50: { title: 'Lunar lv50 Chest', type: 'daily', items: [
                    { name: '40 Silver', gold: 0.40 },
                    { name: '70 Silver', gold: 0.80 },
                    { name: '2 Gold', gold: 2.0 },
                    { name: '4 Gold', gold: 4.0 },
                    { name: '8 Gold', gold: 8.0 },
                    { name: '20 Gold', gold: 20.0 },
                    { name: '40 Gold', gold: 40.0 }
                ]},
                event: { title: 'Event: Yeti', type: 'daily', items: [
                    { name: '2 Gold', gold: 2.0 },
                    { name: '6 Gold', gold: 6.0 },
                    { name: '10 Gold', gold: 10.0 }
                ]},
                msp: { title: 'Golden Pig', type: 'daily', items: [
                    { name: '5 Gold', gold: 5.0 },
                    { name: '10 Gold', gold: 10.0 },
                    { name: '25 Gold', gold: 25.0 },
                    { name: '50 Gold', gold: 50.0 },
                    { name: '100 Gold', gold: 100.0 }
                ]},
                daily: { title: 'Daily Mission Chest', type: 'daily', items: [
                    { name: '3 Gold', gold: 3.0 },
                    { name: '5 Gold', gold: 5.0 },
                    { name: '7 Gold', gold: 7.0 },
                    { name: '10 Gold', gold: 10.0 },
                    { name: '25 Gold', gold: 25.0 }
                ]},
                soulstone: { title: 'Soulstone Chest', type: 'daily', items: [
                    { name: '1 Gold', gold: 1.0 },
                    { name: '2 Gold', gold: 2.0 },
                    { name: '3 Gold', gold: 3.0 },
                    { name: '5 Gold', gold: 5.0 }
                ]},
                weekly: { title: 'Weekly Mission Chest', type: 'weekly', items: [
                    { name: '4 Gold', gold: 4.0 },
                    { name: '6 Gold', gold: 6.0 },
                    { name: '10 Gold', gold: 10.0 },
                    { name: '20 Gold', gold: 20.0 },
                    { name: '40 Gold', gold: 40.0 }
                ]}
            }
        }
    };

    function loadFromStorage() {
        return {
            region: localStorage.getItem(LS_REGION_KEY) || 'dailies',
            checkedItems: JSON.parse(localStorage.getItem(LS_CHECKED_KEY) || '{}'),
            showValues: localStorage.getItem(LS_SHOW_VALUES_KEY) === 'true'
        };
    }

    function saveToStorage(region, checkedItems, showValues) {
        localStorage.setItem(LS_REGION_KEY, region);
        localStorage.setItem(LS_CHECKED_KEY, JSON.stringify(checkedItems));
        localStorage.setItem(LS_SHOW_VALUES_KEY, showValues);
    }

    function formatNumber(num) {
        return Math.max(0, parseFloat(num)).toFixed(2).replace('.', ',');
    }

    function calculateTotals(regionData, checkedItems) {
        let daily = { gold: 0, xp: 0 };
        let weekly = { gold: 0, xp: 0 };
        Object.entries(regionData.categories).forEach(([catKey, category]) => {
            const isIncrementable = INCREMENTABLE_CATEGORIES.includes(catKey);
            category.items.forEach(item => {
                const key = `${catKey}-${item.name}`;
                let count = isIncrementable ? (checkedItems[key] || 0) : (checkedItems[key] ? 1 : 0);
                if (count > 0) {
                    const goldValue = item.gold * count;
                    const xpValue = (item.xp || 0) * count;
                    if (category.type === 'daily') {
                        daily.gold += goldValue;
                        daily.xp += xpValue;
                    } else {
                        weekly.gold += goldValue;
                        weekly.xp += xpValue;
                    }
                }
            });
        });
        return {
            daily,
            weekly,
            grand: { gold: daily.gold + weekly.gold, xp: daily.xp + weekly.xp }
        };
    }

    function hasCheckedItems(regionData, checkedItems) {
        for (const catKey in regionData.categories) {
            const category = regionData.categories[catKey];
            for (const item of category.items) {
                const key = `${catKey}-${item.name}`;
                const isIncrementable = INCREMENTABLE_CATEGORIES.includes(catKey);
                if (isIncrementable) {
                    if ((checkedItems[key] || 0) > 0) return true;
                } else {
                    if (checkedItems[key]) return true;
                }
            }
        }
        return false;
    }

    function renderGoldXpTracker() {
        const container = document.getElementById('gold-xp-tracker-root');
        if (!container) return;

        const { region, checkedItems, showValues } = loadFromStorage();
        const currentRegionData = trackerTypes[region];
        const totals = calculateTotals(currentRegionData, checkedItems);
        const hasChecked = hasCheckedItems(currentRegionData, checkedItems);

        let html = `<div class="gxp-tracker-selector">
            <label class="gxp-tracker-label">Select:</label>
            <div class="gxp-tracker-buttons">
                <div class="gxp-main-selector">`;
        
        for (const [key, r] of Object.entries(trackerTypes)) {
            html += `<button class="gxp-tracker-btn ${region === key ? 'active' : ''}" data-select="${key}">${r.name}</button>`;
        }
        
        html += `</div>
                <button id="gxp-remove-selection-btn" class="gxp-tracker-btn" style="display: ${hasChecked ? 'inline-flex' : 'none'};">Remove Selection</button>
            </div>
        </div>
        <div class="gxp-categories-grid">`;

        for (const [catKey, cat] of Object.entries(currentRegionData.categories)) {
            const isIncrementable = INCREMENTABLE_CATEGORIES.includes(catKey);
            html += `<div class="gxp-card">
                <div class="gxp-card-header">
                    <h3 class="gxp-card-title">${cat.title}</h3>
                    <p class="gxp-card-subtitle"><i data-lucide="${cat.type === 'daily' ? 'calendar' : 'bar-chart-3'}"></i> ${cat.type === 'daily' ? 'Daily' : 'Weekly'}</p>
                </div>
                <div class="gxp-items-list">`;

            for (const item of cat.items) {
                const key = `${catKey}-${item.name}`;
                let count = checkedItems[key] || 0;
                const isChecked = isIncrementable ? count > 0 : !!checkedItems[key];
                
                const displayGold = isChecked ? (item.gold * count) : item.gold;
                const displayXp = (item.xp || 0) > 0 ? (isChecked ? ((item.xp || 0) * count) : (item.xp || 0)) : null;
                
                html += `<div class="gxp-item-wrapper">
                    <button class="gxp-item ${isChecked ? 'checked' : ''}" data-key="${key}" data-category="${catKey}">
                        <span class="gxp-item-name ${isChecked ? 'checked' : ''}">${item.name}</span>
                        ${showValues ? `<div class="gxp-item-values">${formatNumber(displayGold)}g${displayXp !== null ? ` | ${displayXp.toLocaleString('en-US')} XP` : ''}</div>` : ''}
                    </button>`;
                
                if (isIncrementable && isChecked) {
                    html += `<div class="gxp-item-controls">
                        <span class="gxp-item-count">${count}</span>
                        <div class="gxp-increment-container">
                            <button class="gxp-increment-btn" data-action="increment" data-key="${key}"><i data-lucide="plus"></i></button>
                            <button class="gxp-decrement-btn" data-action="decrement" data-key="${key}"><i data-lucide="minus"></i></button>
                        </div>
                    </div>`;
                }
                
                html += `</div>`;
            }

            html += `</div></div>`;
        }

        html += `</div>
        <div class="gxp-summary-grid">
            <div class="gxp-summary-card gxp-daily">
                <h4 class="gxp-summary-title"><i data-lucide="calendar"></i> Daily Total</h4>
                <div class="gxp-summary-gold">${formatNumber(totals.daily.gold)}g</div>
                ${region !== 'goldchest' ? `<div class="gxp-summary-xp">${totals.daily.xp.toLocaleString('en-US')} XP</div>` : ''}
            </div>
            <div class="gxp-summary-card gxp-weekly">
                <h4 class="gxp-summary-title"><i data-lucide="bar-chart-3"></i> Weekly Total</h4>
                <div class="gxp-summary-gold">${formatNumber(totals.weekly.gold)}g</div>
                ${region !== 'goldchest' ? `<div class="gxp-summary-xp">${totals.weekly.xp.toLocaleString('en-US')} XP</div>` : ''}
            </div>
            <div class="gxp-summary-card gxp-grand">
                <h4 class="gxp-summary-title"><i data-lucide="trophy"></i> Grand Total</h4>
                <div class="gxp-summary-gold">${formatNumber(totals.grand.gold)}g</div>
                ${region !== 'goldchest' ? `<div class="gxp-summary-xp">${totals.grand.xp.toLocaleString('en-US')} XP</div>` : ''}
            </div>
        </div>`;

        container.innerHTML = html;
        lucide.createIcons();

        const filterCheckbox = document.getElementById('gxp-filter-show-values');
        if (filterCheckbox) {
            filterCheckbox.checked = showValues;
        }
    }

    function setupEventListeners() {
        document.addEventListener('click', function(e) {
            if (e.target.matches('.gxp-tracker-btn[data-select]')) {
                const { region, checkedItems, showValues } = loadFromStorage();
                const newRegion = e.target.getAttribute('data-select');
                if (newRegion !== region) {
                    saveToStorage(newRegion, checkedItems, showValues);
                    renderGoldXpTracker();
                }
            }

            if (e.target.closest('.gxp-item') && !e.target.closest('.gxp-item-controls')) {
                const btn = e.target.closest('.gxp-item');
                const key = btn.getAttribute('data-key');
                const category = btn.getAttribute('data-category');
                const isIncrementable = INCREMENTABLE_CATEGORIES.includes(category);
                const { region, checkedItems, showValues } = loadFromStorage();

                if (isIncrementable) {
                    checkedItems[key] = checkedItems[key] ? 0 : 1;
                } else {
                    checkedItems[key] = !checkedItems[key];
                }

                saveToStorage(region, checkedItems, showValues);
                renderGoldXpTracker();
            }

            if (e.target.closest('.gxp-increment-btn') || e.target.closest('.gxp-decrement-btn')) {
                const btn = e.target.closest('.gxp-increment-btn, .gxp-decrement-btn');
                const action = btn.getAttribute('data-action');
                const key = btn.getAttribute('data-key');
                const { region, checkedItems, showValues } = loadFromStorage();

                if (action === 'increment') {
                    checkedItems[key] = (checkedItems[key] || 0) + 1;
                } else if (action === 'decrement' && checkedItems[key] > 0) {
                    checkedItems[key] = checkedItems[key] - 1;
                }

                saveToStorage(region, checkedItems, showValues);
                renderGoldXpTracker();
            }

            if (e.target.matches('#gxp-remove-selection-btn')) {
                const { region, showValues } = loadFromStorage();
                const currentRegionData = trackerTypes[region];
                const checkedItems = {};

                for (const catKey in currentRegionData.categories) {
                    const category = currentRegionData.categories[catKey];
                    for (const item of category.items) {
                        const key = `${catKey}-${item.name}`;
                        delete checkedItems[key];
                    }
                }

                saveToStorage(region, {}, showValues);
                renderGoldXpTracker();
            }
        });

        const filterCheckbox = document.getElementById('gxp-filter-show-values');
        if (filterCheckbox) {
            filterCheckbox.addEventListener('change', function() {
                const { region, checkedItems } = loadFromStorage();
                saveToStorage(region, checkedItems, this.checked);
                renderGoldXpTracker();
            });
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        renderGoldXpTracker();
        setupEventListeners();
    });
})();
