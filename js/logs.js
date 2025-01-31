export async function fetchLogs() {
    const serverUrl = document.getElementById('server-select').value;
    const token = document.getElementById('token-input').value;

    if (!token) {
        alert("Please enter a valid token.");
        return;
    }

    try {
        const response = await fetch(`${serverUrl}/api/debug/logs`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (data.success) {
            const logs = data.logs.split('\n').map(log => {
                const timestampMatch = log.match(/\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\]/);
                const timestamp = timestampMatch ? timestampMatch[0] : '';
                const logWithoutTimestamp = log.replace(timestamp, '').trim();
                const isError = log.toLowerCase().includes('error') || log.includes('[ ERROR ]');
                const logClass = isError ? 'error' : 'info';
                const styledLog = `<span class="${logClass}">${logWithoutTimestamp}</span>`;
                return `<div class="log-entry"><span class="timestamp">${timestamp}</span> ${styledLog}</div>`;
            }).join('');

            document.getElementById('log-window').innerHTML += logs;
        } else {
            document.getElementById('log-window').textContent = data.message;
        }
    } catch (error) {
        console.error('Error fetching logs:', error);
        alert("Error fetching logs.");
    }
}
