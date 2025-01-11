((d) => {
    const saveToLocalStorage = () => {
        const inputs = d.querySelectorAll('input, textarea, select');
        const data = {};

        inputs.forEach((input) => {
            if (input.type === 'file') {
                // Skip file inputs as their values cannot be programmatically set
                return;
            } else if (input.type === 'checkbox') {
                data[input.id] = input.checked;
            } else {
                data[input.id] = input.value;
            }
        });

        localStorage.setItem('navigationPlannerData', JSON.stringify(data));
    };

    const loadFromLocalStorage = () => {
        const data = JSON.parse(localStorage.getItem('navigationPlannerData')) || {};

        Object.keys(data).forEach((id) => {
            const element = d.getElementById(id);

            if (element && element.type !== 'file') {
                if (element.type === 'checkbox') {
                    element.checked = data[id];
                } else {
                    element.value = data[id];
                }
            }
        });
    };

    // Save data on input change
    const inputs = d.querySelectorAll('input, textarea, select');
    inputs.forEach((input) => {
        input.addEventListener('input', saveToLocalStorage);
    });

    // Load data on page load
    d.addEventListener('DOMContentLoaded', loadFromLocalStorage);

    d.addEventListener('DOMContentLoaded', () => {
        const clearDataButton = document.getElementById('clear-data-button');
    
        if (clearDataButton) {
            clearDataButton.addEventListener('click', () => {
                if (confirm('Are you sure you want to clear all data?')) {
                    localStorage.removeItem('navigationPlannerData');
                    location.reload();
                }
            });
        }
    });
    
})(document);


