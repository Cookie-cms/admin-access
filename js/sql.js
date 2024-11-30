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
            body: JSON.stringify({ query: sqlCommand })  // Insert the value from textarea into query
        });

        console.log('Response Status:', response.status);  // Debugging log to check response status
        const data = await response.json();

        console.log('Response Data:', data);  // Debugging log to check the response data

        if (data.success) {
            // Use 'data.data' instead of 'data.result'
            if (data.data && data.data.length > 0) {
                document.getElementById('output-area').textContent = JSON.stringify(data.data);
            } else {
                document.getElementById('output-area').textContent = 'No result returned from the query.';
            }
        } else {
            document.getElementById('output-area').textContent = `Error: ${data.message}`;
        }
    } catch (error) {
        console.error('Error executing SQL:', error);
        document.getElementById('output-area').textContent = 'Error executing SQL.';
    }
}
