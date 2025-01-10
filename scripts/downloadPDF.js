((d) => {
    // Function to generate the PDF
    const generatePdf = () => {
        const mainContent = d.querySelector('main'); // Element to convert to PDF
        const options = {
            margin: 0.5,
            filename: 'Navigation_Planner.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                ignoreElements: (element) => {
                    // Ignore elements with the 'hidden-in-pdf' class
                    return element.classList.contains('hidden-in-pdf');
                },
            },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Generate and save the PDF
        html2pdf().set(options).from(mainContent).save();
    };

    // Attach event listener to the download button
    const downloadPdfButton = d.querySelector('#downloadPdf');
    if (downloadPdfButton) {
        downloadPdfButton.addEventListener('click', generatePdf);
    }
})(document);
