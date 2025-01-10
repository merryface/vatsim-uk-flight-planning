document.getElementById('addRow').addEventListener('click', () => {
    const tbody = document.querySelector('#tem-form tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="text" name="threat" placeholder="Enter threat/error"></td>
        <td><input type="text" name="management" placeholder="Enter management"></td>
    `;
    tbody.appendChild(newRow);
});