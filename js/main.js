import { fetchLogs } from './logs.js';
import { fetchTableInfo, fetchTables } from './table.js';  // Correctly import the functions
import { executeSQL } from './sql.js';

// Function to get a cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Initialize event listeners
document.getElementById('server-select').addEventListener('change', function() {
    fetchLogs();
});

document.getElementById('token-input').addEventListener('input', function() {
    const token = this.value;
    document.cookie = `token=${token}; path=/;`;
    fetchLogs();
});

// Check if token cookie exists and set the token input value
const token = getCookie('token');
if (token) {
    document.getElementById('token-input').value = token;
    fetchLogs();
}

const server = getCookie('server');
if (server) {
    document.getElementById('server-select').value = server;
    if (server === 'custom') {
        document.getElementById('custom-server-input').style.display = 'block';
    }
}

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
    document.cookie = `server=${selectedOption}; path=/;`;
});