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
