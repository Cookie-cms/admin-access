export async function executeSQL() {
    const serverUrl = document.getElementById('server-select').value;
    const token = document.getElementById('token-input').value;
    const sqlCommand = document.getElementById('command-input').value.trim();

    if (!token) {
        alert("Please enter a valid token.");
        return;
    }

    if (!sqlCommand) {
        alert("Please enter a SQL command.");
        return;
    }

    try {
        const response = await fetch(`${serverUrl}/api/debug/sql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ query: sqlCommand })
        });

        const data = await response.json();
        
        // Выводим весь JSON-ответ с красивым форматированием
        document.getElementById('output-area').textContent = JSON.stringify(data, null, 2);
        
    } catch (error) {
        console.error('Error executing SQL:', error);
        document.getElementById('output-area').textContent = 'Error executing SQL.';
    }
}

// Слушаем кнопку для выполнения SQL
document.getElementById('execute-button').addEventListener('click', executeSQL);