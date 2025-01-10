((d) => {
    // Function to generate the PDF
    const generatePdf = () => {
        const mainContent = d.querySelector('main'); // Element to convert to PDF

        // Temporarily replace inputs and textareas (excluding checkboxes) with their values
        const inputElements = mainContent.querySelectorAll('input, textarea');
        const replacements = [];

        inputElements.forEach((input) => {
            if (input.type !== 'checkbox') { // Ignore checkboxes
                const value = input.value || ''; // Get input value
                const span = d.createElement('span');
                span.textContent = value; // Set value as text content
                span.style.display = getComputedStyle(input).display; // Copy input's display style
                span.className = input.className; // Copy input's class for consistent styling
                input.parentNode.replaceChild(span, input); // Replace input with span
                replacements.push({ original: input, replacement: span }); // Track replacements
            }
        });

        // Temporarily hide elements with the 'hidden-in-pdf' class
        const elementsToHide = mainContent.querySelectorAll('.hidden-in-pdf');
        elementsToHide.forEach(element => {
            element.style.display = 'none';
        });

        const pdf = new window.jspdf.jsPDF(); // Create jsPDF instance
        const pdfWidth = pdf.internal.pageSize.width; // A4 page width in points
        const contentWidth = mainContent.offsetWidth;

        // Scale content to fit PDF width
        const scaleFactor = pdfWidth / contentWidth;

        pdf.html(mainContent, {
            callback: function (doc) {
                // Restore visibility of hidden elements
                elementsToHide.forEach(element => {
                    element.style.visibility = 'visible';
                });

                // Restore original inputs and textareas
                replacements.forEach(({ original, replacement }) => {
                    replacement.parentNode.replaceChild(original, replacement);
                });

                // Save the PDF
                doc.save('Navigation_Planner.pdf');
            },
            y: 10, // Add a small top margin
            html2canvas: {
                scale: scaleFactor, // Scale content to fit the PDF
                useCORS: true // Enable cross-origin resource sharing
            }
        });
    };

    // Attach event listener to the download button
    const downloadPdfButton = d.querySelector('#downloadPdf');
    if (downloadPdfButton) {
        downloadPdfButton.addEventListener('click', generatePdf);
    }
})(document);
