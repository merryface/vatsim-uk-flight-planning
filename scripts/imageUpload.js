((d) => {
    // Function to handle image upload and display
    const handleImageUpload = (inputElement, previewElement) => {
      inputElement.addEventListener("change", event => {
        const file = event.target.files[0] // get the uploaded file
        if (file && file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = () => {
            // create an image element to display
            const img = d.createElement("img")
            img.src = reader.result;
            img.alt = "Uploaded image";

            // c;ear previous content and append new image
            previewElement.innerHTML = "";
            previewElement.appendChild(img)
          };
          reader.readAsDataURL(file); // read file as data url
        } else {
          previewElement.innerHTML = "<p>Please upload a valid image file.</p>";
        }
      });
    };

    // Select file input elements and preview containers
    const routeImageInput = d.querySelector("#route-pic-upload input[type='file']")
    const routeImagePreview = d.querySelector(".route-image-preview");

    const massImageInput = d.querySelector("#mass-and-balance input[type='file']");
    const massImagePreview = d.querySelector(".mAndB-image-preview");


    // Attach event listeners for file upload
    handleImageUpload(routeImageInput, routeImagePreview);
    handleImageUpload(massImageInput, massImagePreview);
})(document)
