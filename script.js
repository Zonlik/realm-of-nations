// Копирование IP
function copyIP() {
    const ip = document.getElementById('ip').textContent;
    navigator.clipboard.writeText(ip);
    alert('IP скопирован: ' + ip);
}

// Статус сервера
async function getServerStatus() {
    try {
        const response = await fetch('https://api.mcsrvstat.us/2/realmofnations.my-craft.cc:36020');
        const data = await response.json();
        const playersEl = document.getElementById('players');
        const statusEl = document.getElementById('status');
        const onlineNow = document.getElementById('online-now');
        const totalPlayers = document.getElementById('total-players');

        if (data.online) {
            const count = data.players.online || '?';
            if (playersEl) playersEl.textContent = count;
            if (statusEl) statusEl.innerHTML = '🟢 Онлайн: <span id="players">' + count + '</span> игроков';
            if (onlineNow) onlineNow.textContent = count;
            if (totalPlayers) totalPlayers.textContent = count;
        } else {
            if (statusEl) statusEl.innerHTML = '🔴 Сервер офлайн';
            if (onlineNow) onlineNow.textContent = '0';
            if (totalPlayers) totalPlayers.textContent = '0';
        }
    } catch (e) {
        document.getElementById('status').innerHTML = '🟡 Не удалось получить статус';
    }
}

// Покупка доната
function buyDonate(title, price) {
    if (confirm('Купить титул «' + title + '» за ' + price + ' ₽?')) {
        alert('Для покупки:\n1. Оплати ' + price + ' ₽\n2. Напиши администратору: /msg Admin');
    }
}

getServerStatus();
setInterval(getServerStatus, 30000);
