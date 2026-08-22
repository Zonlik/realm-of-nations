function copyIP() {
    const ip = document.getElementById('ip').textContent;
    navigator.clipboard.writeText(ip);
    alert('IP адрес скопирован: ' + ip);
}

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

function buyDonate(title, price) {
    if (confirm(`Купить титул «${title}» за ${price} ₽?`)) {
        alert(`Для покупки:\n1. Оплати ${price} ₽\n2. Напиши администратору: /msg Admin\n3. Получи титул!`);
        // Открыть Telegram для связи
        const telegram = 'https://t.me/ваш_ник'; // Замени
        if (confirm('Открыть Telegram для связи?')) {
            window.open(telegram, '_blank');
        }
    }
}

getServerStatus();
setInterval(getServerStatus, 30000);
