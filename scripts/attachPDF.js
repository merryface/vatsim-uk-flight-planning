((d) => {
    const pdfUploadInput = d.querySelector("#pdf-upload");
    const pdfPreviewContainer = d.querySelector("#pdf-preview");
    let attachedPDFs = [];

    // Function to render a PDF file using PDF.js
    const renderPDF = async (file, container) => {
        const reader = new FileReader();

        reader.onload = async (e) => {
            const pdfData = e.target.result;

            // Load PDF using PDF.js
            const loadingTask = pdfjsLib.getDocument({ data: pdfData });
            const pdf = await loadingTask.promise;

            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const viewport = page.getViewport({ scale: 1.5 });

                // Create a canvas for the page
                const canvas = d.createElement("canvas");
                const context = canvas.getContext("2d");
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                // Render the page
                await page.render({ canvasContext: context, viewport }).promise;

                // Append the canvas to the container
                container.appendChild(canvas);
            }
        };

        reader.readAsArrayBuffer(file);
    };

    // Handle PDF uploads and append new files
    pdfUploadInput.addEventListener("change", async (event) => {
        const newFiles = Array.from(event.target.files);

        // Add new files to the attached PDFs list
        attachedPDFs.push(...newFiles);

        // Clear and rebuild the preview container
        pdfPreviewContainer.innerHTML = "";

        // Render all attached PDFs
        for (const [index, file] of attachedPDFs.entries()) {
            if (file.type === "application/pdf") {
                const pdfContainer = d.createElement("div");
                pdfContainer.classList.add("pdf-container");
                pdfContainer.innerHTML = `<strong>PDF ${index + 1}: ${file.name}</strong>`;
                pdfPreviewContainer.appendChild(pdfContainer);

                await renderPDF(file, pdfContainer);
            }
        }
    });

    // Function to include all PDFs in the print process
    const includePDFsInPrint = async () => {
        const mainContent = d.querySelector("main");
        if (!mainContent || attachedPDFs.length === 0) return;

        for (const file of attachedPDFs) {
            const pdfContainer = d.createElement("div");
            pdfContainer.classList.add("pdf-page-break");
            mainContent.appendChild(pdfContainer);

            await renderPDF(file, pdfContainer);
        }
    };

    // Attach to the download button
    const printButton = d.querySelector("#downloadPdf");
    if (printButton) {
        printButton.addEventListener("click", async () => {
            await includePDFsInPrint();
        });
    }
})(document);
