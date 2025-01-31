// Функция для получения списка таблиц
export async function fetchTables() {
    const serverUrl = document.getElementById('server-select').value;
    const token = document.getElementById('token-input').value;

    console.log('Fetching tables from server...');
    console.log('Server URL:', serverUrl);
    console.log('Token:', token);

    const url = `${serverUrl}/api/debug/sql?showtables`;
    console.log('Sending request to:', url);

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const rawResponse = await response.text();
        console.log('Raw Response:', rawResponse);

        const data = JSON.parse(rawResponse);
        console.log('Parsed Data:', data);

        if (data.success) {
            console.log('Tables fetched successfully!');
            const tables = data.tables;
            console.log('Tables Array:', tables);

            // Очистим весь контейнер перед добавлением новых данных
            const tablesTableElement = document.getElementById('tables-table');
            if (tablesTableElement) {
                tablesTableElement.innerHTML = ''; // Очистим контейнер таблицы
            }

            // Создадим таблицу с новым списком таблиц
            const table = document.createElement('table');
            const headerRow = document.createElement('tr');
            const th = document.createElement('th');
            th.textContent = 'Table Name';
            headerRow.appendChild(th);
            const th2 = document.createElement('th');
            th2.textContent = 'Actions';
            headerRow.appendChild(th2);
            table.appendChild(headerRow);

            // Добавляем строки с данными о таблицах
            tables.forEach(tableName => {
                const tr = document.createElement('tr');
                const td = document.createElement('td');
                td.textContent = tableName;
                tr.appendChild(td);
                const td2 = document.createElement('td');
                const button = document.createElement('button');
                button.textContent = 'View Details';
                button.classList.add('view-details');
                button.setAttribute('data-table', tableName);
                td2.appendChild(button);
                tr.appendChild(td2);
                table.appendChild(tr);
            });

            // Добавляем таблицу в контейнер
            tablesTableElement.appendChild(table);

            // Добавляем обработчики событий для кнопок "View Details"
            document.querySelectorAll('.view-details').forEach(button => {
                button.addEventListener('click', (event) => {
                    const tableName = event.target.getAttribute('data-table');
                    // Изменяем заголовок на название выбранной таблицы
                    const tableNameElement = document.getElementById('table-name');
                    if (tableNameElement) {
                        tableNameElement.textContent = `Table: ${tableName}`;
                    }
                    fetchTableInfo(tableName);  // Загружаем информацию о выбранной таблице
                });
            });
        }
    } catch (error) {
        console.error('Error fetching tables:', error);
    }
}

// Функция для получения информации о выбранной таблице
export async function fetchTableInfo(tableName) {
    const serverUrl = document.getElementById('server-select').value;
    const token = document.getElementById('token-input').value;

    if (!tableName) {
        console.error('No table selected!');
        return;
    }

    const url = `${serverUrl}/api/debug/sql?describe=${tableName}`;
    console.log('Fetching info for table:', tableName);
    console.log('Request URL:', url);

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const rawResponse = await response.text();
        console.log('Raw Response:', rawResponse);

        const data = JSON.parse(rawResponse);
        if (data.success) {
            const tableInfo = data.data; // Assuming the data structure is as expected
            const tablesTableElement = document.getElementById('tables-table');

            if (tablesTableElement) {
                // Очистим текущий контент
                tablesTableElement.innerHTML = '';

                // Создаем таблицу для отображения данных о таблице
                const table = document.createElement('table');
                const headerRow = document.createElement('tr');

                // Создаем заголовки таблицы
                const headers = Object.keys(tableInfo[0]);
                headers.forEach(header => {
                    const th = document.createElement('th');
                    th.textContent = header; // Отображаем имя колонки
                    headerRow.appendChild(th);
                });
                table.appendChild(headerRow);

                // Добавляем строки с данными
                tableInfo.forEach(row => {
                    const tr = document.createElement('tr');
                    headers.forEach(header => {
                        const td = document.createElement('td');
                        td.textContent = row[header] || 'N/A'; // Если значение null или undefined, показываем 'N/A'
                        tr.appendChild(td);
                    });
                    table.appendChild(tr);
                });

                // Кнопка "Назад"
                const backButton = document.createElement('button');
                backButton.textContent = 'Back to Table List';
                backButton.addEventListener('click', function() {
                    // Очистим текущий контент и загружаем список таблиц снова
                    fetchTables();  // Загружаем таблицы заново
                });

                // Добавляем таблицу и кнопку назад в контейнер
                tablesTableElement.appendChild(table);
                tablesTableElement.appendChild(backButton);
            } else {
                console.error("Element with ID 'tables-table' not found");
            }
        } else {
            console.log('Error retrieving table information');
        }
    } catch (error) {
        console.error('Error fetching table info:', error);
    }
}
