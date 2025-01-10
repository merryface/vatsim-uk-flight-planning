((d) => {
	// Function to add page-break class conditionally
	const addPageBreaks = () => {
			const main = d.querySelector('main');
			const divs = main ? Array.from(main.children) : [];

			if (!main || divs.length === 0) {
					console.warn('No main element or children found to process for page breaks.');
					return;
			}

			const pageHeight = 297 * 3.7795275591; // A4 height in pixels
			let currentHeight = 0;

			divs.forEach((div) => {
					const rect = div.getBoundingClientRect();
					const divHeight = rect.height;

					// Calculate height including current content
					if (currentHeight + divHeight > pageHeight) {
							div.classList.add('page-break');
							currentHeight = divHeight; // Reset height for new page
					} else {
							div.classList.remove('page-break');
							currentHeight += divHeight;
					}
			});
	};

	// Function to trigger system print for PDF export
	const exportToPdf = () => {
			addPageBreaks(); // Add page breaks before triggering print
			window.print();
	};

	// Attach event listener to the download button
	const downloadPdfButton = d.querySelector('#downloadPdf');
	if (downloadPdfButton) {
			downloadPdfButton.addEventListener('click', exportToPdf);
	}
})(document);
