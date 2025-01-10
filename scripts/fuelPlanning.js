((d) => {
    // Function to calculate and update total fuel
    const updateFuelTotal = () => {
        // Select all the fuel input elements (excluding fuel flow)
        const fuelInputs = [
            d.querySelector('#taxi'),
            d.querySelector('#trip'),
            d.querySelector('#contingency'),
            d.querySelector('#alternate'),
            d.querySelector('#reserve'),
            d.querySelector('#extra')
        ];

        // Calculate the sum of the input values
        let totalFuel = fuelInputs.reduce((total, input) => {
            const value = parseFloat(input.value) || 0; // Parse value or default to 0
            return total + value;
        }, 0);

        // Update the total in the span with id 'fuelTotal'
        const fuelTotalSpan = d.querySelector('#fuelTotal');
        fuelTotalSpan.textContent = totalFuel.toFixed(1); // Display with two decimal places
    };

    // Function to calculate and update the final reserve based on fuel flow
    const updateFinalReserve = () => {
        const fuelFlowInput = d.querySelector('#fuelFlow');
        const reserveInput = d.querySelector('#reserve');

        // Calculate half of the fuel flow and round up to the nearest full number
        const fuelFlow = parseFloat(fuelFlowInput.value) || 0;
        const finalReserve = Math.ceil(fuelFlow / 2);

        // Update the reserve input with the calculated value
        reserveInput.value = finalReserve;

        // Recalculate the total fuel
        updateFuelTotal();
    };

    // Update Fuel volume measurement unit
    const volumeUnit = d.getElementById("volumeUnit")
    const setVolumeUnit = d.getElementById("setVolumeUnit")

    setVolumeUnit.addEventListener("input", () => {
        volumeUnit.innerHTML = setVolumeUnit.value
    })

    // Add event listeners to update total on input changes
    const fuelInputs = d.querySelectorAll('#taxi, #trip, #contingency, #alternate, #reserve, #extra');
    fuelInputs.forEach(input => {
        input.addEventListener('input', updateFuelTotal);
    });

    // Add event listener to fuel flow input to calculate reserve
    const fuelFlowInput = d.querySelector('#fuelFlow');
    fuelFlowInput.addEventListener('input', updateFinalReserve);

    // Initialize the calculations
    updateFinalReserve();
    updateFuelTotal();
})(document);
