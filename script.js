// ===== КОПИРОВАНИЕ IP =====
function copyIP() {
    const ip = document.getElementById('ip').textContent;
    navigator.clipboard.writeText(ip);
    alert('IP адрес скопирован: ' + ip);
}

// ===== СТАТУС СЕРВЕРА =====
async function getServerStatus() {
    try {
        const response = await fetch('https://api.mcsrvstat.us/2/realmofnations.my-craft.cc:36020');
        const data = await response.json();
        const playersEl = document.getElementById('players');
        const statusEl = document.getElementById('status');
        const serverStatus = document.getElementById('server-status');
        const onlinePlayers = document.getElementById('online-players');

        if (data.online) {
            const count = data.players.online || '?';
            if (playersEl) playersEl.textContent = count;
            if (statusEl) statusEl.innerHTML = `🟢 Онлайн: <span id="players">${count}</span> игроков`;
            if (serverStatus) { serverStatus.textContent = '🟢 Онлайн'; serverStatus.style.color = '#4ade80'; }
            if (onlinePlayers) onlinePlayers.textContent = count;
        } else {
            if (statusEl) statusEl.innerHTML = '🔴 Сервер офлайн';
            if (serverStatus) { serverStatus.textContent = '🔴 Офлайн'; serverStatus.style.color = '#f87171'; }
            if (onlinePlayers) onlinePlayers.textContent = '0';
        }
    } catch (e) {
        const statusEl = document.getElementById('status');
        if (statusEl) statusEl.innerHTML = '🟡 Не удалось получить статус';
    }
}

// ===== ДОНАТ =====
function buyDonate(title, price) {
    if (confirm(`Купить титул «${title}» за ${price} ₽?`)) {
        alert(`Для покупки:\n1. Оплати ${price} ₽\n2. Напиши администратору: /msg Admin\n3. Получи титул!`);
        const telegram = 'https://t.me/ваш_ник';
        if (confirm('Открыть Telegram для связи?')) {
            window.open(telegram, '_blank');
        }
    }
}

// ===== ПАРТИКЛЫ =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

for (let i = 0; i < 80; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.5 + 0.1,
        color: ['#ffd700', '#ff6b6b', '#4ecdc4', '#fff'][Math.floor(Math.random() * 4)]
    });
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
    });

    requestAnimationFrame(drawParticles);
}

drawParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ===== AOS =====
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: false,
        offset: 100
    });
}

// ===== ОБНОВЛЯЕМ СТАТУС =====
getServerStatus();
setInterval(getServerStatus, 30000);
