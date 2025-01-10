document.addEventListener("DOMContentLoaded", () => {
    // Constants
    const A4HeightInMM = 297; // Height of A4 in mm
    const mmToPx = 3.7795275591; // Conversion factor for mm to pixels (approx)

    // Find the pageBreak element
    const pageBreak = document.getElementById("pageBreak");
    if (!pageBreak) {
        console.error("No element found with ID 'pageBreak'.");
        return;
    }

    // Calculate the height of the DOM above the pageBreak element
    const rect = pageBreak.getBoundingClientRect();
    const domAboveHeight = rect.top + window.scrollY; // Height of all elements above in pixels

    // Calculate the new height for pageBreak
    const A4HeightInPx = A4HeightInMM * mmToPx;
    const newHeight = A4HeightInPx - domAboveHeight;

    // Apply the height to the pageBreak element
    if (newHeight > 0) {
        pageBreak.style.height = `${newHeight}px`;
    } else {
        console.warn("The DOM above the pageBreak exceeds 297mm. No height adjustment applied.");
        pageBreak.style.height = "0px"; // Set height to 0 if exceeded
    }
});
