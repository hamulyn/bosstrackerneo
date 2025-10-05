let bosses = [];
let myTimers = JSON.parse(localStorage.getItem("myTimers")) || [];
let notifiedBosses = {}; // Para controlar notificaciones únicas

// ========================
// HORA DEL SERVIDOR (PDT + offset)
// ========================
const offsetHours = 1; // <-- ajusta aquí si el server está 1h adelantado/atrasado

function getServerTime() {
  const now = new Date();
  let pdtTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
  pdtTime.setHours(pdtTime.getHours() + offsetHours);
  return pdtTime;
}

// ========================
// CARGAR JSON
// ========================
async function loadBosses() {
  const response = await fetch("bosses.json");
  bosses = await response.json();
  renderBosses("today"); // por defecto mostrar solo hoy
  renderMyTimers();
}
loadBosses();

// ========================
// FUNCIONES DE TIEMPO
// ========================
function formatCountdown(ms) {
  if (ms <= 0) return "Muerto";
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

function getDayName(day) {
  const days = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  return days[day];
}

// ========================
// FUNCIONES DE NOTIFICACIÓN
// ========================
function mostrarNotificacion(titulo, mensaje) {
  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") {
    new Notification(titulo, {
      body: mensaje,
      icon: "icon.png"
    });

    // sonido extra si está activado
    if (document.getElementById("soundNotification")?.checked) {
      const audio = new Audio("alert.mp3");
      audio.play();
    }
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        mostrarNotificacion(titulo, mensaje);
      }
    });
  }
}

// ========================
// RENDERIZAR TABLAS
// ========================
function renderBosses(dayFilter) {
  const tbody = document.getElementById("allBossesTableBody");
  tbody.innerHTML = "";

  const now = getServerTime();
  const today = now.getDay();

  let bossesToRender = [];

  bosses.forEach(boss => {
    const schedule = boss.schedule || {};

    Object.keys(schedule).forEach(dayKey => {
      const day = parseInt(dayKey);
      const hours = schedule[dayKey];

      // Mostrar solo si el filtro coincide
      if (dayFilter === "all" || (dayFilter === "today" && day === today) || Number(dayFilter) === day) {
        hours.forEach(hour => {
          const [h, m] = hour.split(":").map(Number);

          let spawn = new Date(now);
          spawn.setHours(h, m, 0, 0);

          // Ajustar al día correcto
          const diffDays = (day - now.getDay() + 7) % 7;
          spawn.setDate(now.getDate() + diffDays);

          let diff = spawn - now;
          let countdown = formatCountdown(diff);
          let spawnText = `${getDayName(day)} ${hour}`;

          // =============================
          // Nueva lógica para "Hoy"
          // =============================
          if (day === today && dayFilter === "today") {
            if (diff <= 0) {
              countdown = "Muerto";
              spawnText = "Próxima semana";
            } else if (diff > 24 * 60 * 60 * 1000) {
              countdown = "Próxima semana";
              spawnText = "Próxima semana";
            }
          }

          if (day !== today && (dayFilter === "today")) {
            return; // no mostrar bosses de otros días en "Hoy"
          }

          bossesToRender.push({
            boss,
            countdown,
            hour,
            spawnText,
            spawn,
            diff
          });
        });
      }
    });
  });

  // 🔹 Ordenar por tiempo de aparición
  bossesToRender.sort((a, b) => a.spawn - b.spawn);

  // Renderizar filas ya ordenadas
  bossesToRender.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.boss.icon} ${item.boss.name}</td>
      <td class="countdown" style="color:${item.countdown.includes("Muerto") || item.countdown.includes("Próxima") ? 'red' : '#38bdf8'}">${item.countdown}</td>
      <td>${item.hour}</td>
      <td>${item.spawnText}</td>
      <td><button class="botones" onclick="addToMyTimers(${item.boss.id}, '${item.hour}')">Añadir</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function renderMyTimers() {
  const tbody = document.getElementById("myTimersTableBody");
  tbody.innerHTML = "";

  if (myTimers.length === 0) {
    document.getElementById("emptyMyTimers").style.display = "block";
    return;
  }
  document.getElementById("emptyMyTimers").style.display = "none";

  myTimers.forEach(timer => {
    const boss = bosses.find(b => b.id === timer.id);
    if (!boss) return;

    const schedule = boss.schedule || {};
    let nextSpawn = null;
    const now = getServerTime();

    Object.keys(schedule).forEach(dayKey => {
      const day = parseInt(dayKey);
      schedule[dayKey].forEach(hour => {
        if (hour === timer.hour) {
          const [h, m] = hour.split(":").map(Number);
          let spawn = new Date(now);
          spawn.setHours(h, m, 0, 0);
          const diffDays = (day - now.getDay() + 7) % 7;
          spawn.setDate(now.getDate() + diffDays);
          if (!nextSpawn || spawn < nextSpawn) {
            nextSpawn = spawn;
          }
        }
      });
    });

    const diff = nextSpawn ? nextSpawn - now : 0;
    const countdown = formatCountdown(diff);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${boss.icon} ${boss.name}</td>
      <td class="countdown" style="color:${diff <= 0 ? 'red' : '#38bdf8'}">${countdown}</td>
      <td>${diff > 0 ? "Activo" : "Muerto"}</td>
      <td>${nextSpawn ? nextSpawn.toLocaleString("es-PE", { timeZone: "America/Los_Angeles" }) : "-"}</td>
      <td><button class="botonesr" onclick="removeFromMyTimers(${boss.id})">Eliminar</button></td>
    `;
    tbody.appendChild(tr);

    // Notificaciones
    checkNotifications(boss, diff, timer.hour);
  });
}

// ========================
// TIMERS Y NOTIFICACIONES
// ========================
function addToMyTimers(id, hour) {
  if (!myTimers.some(t => t.id === id && t.hour === hour)) {
    myTimers.push({ id, hour });
    localStorage.setItem("myTimers", JSON.stringify(myTimers));
    renderMyTimers();
  }
}

function removeFromMyTimers(id) {
  myTimers = myTimers.filter(t => t.id !== id);
  localStorage.setItem("myTimers", JSON.stringify(myTimers));
  renderMyTimers();
}

function checkNotifications(boss, diff, hour) {
  const enable = document.getElementById("enableNotifications").checked;
  if (!enable || diff <= 0) return;

  const options = Array.from(document.getElementById("notificationTimes").selectedOptions).map(o => parseInt(o.value));
  const minutesLeft = Math.floor(diff / 60000);

  // Usamos boss.id + hora + minuto para evitar duplicados
  const key = boss.id + "_" + hour + "_" + minutesLeft;

  if (options.includes(minutesLeft) && !notifiedBosses[key]) {
    notifiedBosses[key] = true;
    mostrarNotificacion("⚔️ Boss Tracker", `${boss.name} aparecerá en ${minutesLeft} minutos!`);
  }
}

// ========================
// ACTUALIZAR
// ========================
setInterval(() => {
  const activeBtn = document.querySelector(".day-btn.active");
  if (activeBtn) {
    renderBosses(activeBtn.dataset.day);
  } else {
    renderBosses("today");
  }
  renderMyTimers();
}, 1000);

// ========================
// EVENTOS DE UI
// ========================
document.querySelectorAll(".day-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".day-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderBosses(btn.dataset.day);
  });
});

// Tabs
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab + "Content").classList.add("active");
  });
});

// Botón test notificación
document.getElementById("testNotificationBtn").addEventListener("click", () => {
  mostrarNotificacion("⚔️ Boss Tracker", "Esto es una notificación de prueba.");
});

// ========================
// CLOCK DEL SERVIDOR
// ========================
function updateClock() {
  const el = document.getElementById("serverClock");
  if (!el) return;
  const now = getServerTime();
  el.textContent = now.toLocaleTimeString("es-PE", { hour12: false });
}
setInterval(updateClock, 1000);
updateClock();
