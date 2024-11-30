// main.js

import { fetchLogs } from './logs.js';
import { fetchTableInfo, fetchTables } from './table.js';  // Correctly import the functions
import { executeSQL } from './sql.js';

// Initialize event listeners
document.getElementById('server-select').addEventListener('change', function() {
    fetchLogs();
});

document.getElementById('token-input').addEventListener('input', function() {
    fetchLogs();
});


document.getElementById('execute-button').addEventListener('click', function() {
    executeSQL();
});

document.getElementById('scroll-button').addEventListener('click', function() {
    scrollToBottom();
});

// Fetch initial data when the page is loaded
window.addEventListener('load', function() {
    fetchLogs();
    fetchTables();  // Fetch tables when the page loads
});

// Функция для обработки изменения выбора сервера
document.getElementById('server-select').addEventListener('change', function() {
    const selectedOption = this.value;
    const customServerInput = document.getElementById('custom-server-input');
    
    // Если выбран "Custom Server", показываем поле для ввода домена
    if (selectedOption === 'custom') {
        customServerInput.style.display = 'block';
    } else {
        customServerInput.style.display = 'none';
    }
});

function echoMessage(tableName) {
    console.log(`Button clicked for table: ${tableName}`);
}
 