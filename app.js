// app.js

document.getElementById('imageUploadForm').addEventListener('submit', async function (event) {
    event.preventDefault();  // Prevent the form from submitting in the traditional way

    const imageName = document.getElementById('imageName').value;
    const imageFile = document.getElementById('imageFile').files[0];

    if (!imageFile) {
        document.getElementById('responseMessage').innerText = 'Please select an image to upload.';
        return;
    }

    try {
        // Prepare the binary data for the image file
        const binaryData = await imageFile.arrayBuffer();
        
        // Make a POST request to the API Gateway (replace API_GATEWAY_URL with the actual URL)
        const response = await fetch('https://85y3s2ye7i.execute-api.ap-south-1.amazonaws.com/dev', {
            method: 'POST',
            headers: {
                'Content-Type': imageFile.type,  // Set the correct image content type (e.g., image/jpeg)
                'x-image-name': imageName        // Use a custom header to pass the image name
            },
            body: binaryData // Sending the image as binary data
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('responseMessage').innerText = `Image compressed successfully and stored in S3 bucket: ${data.compressed_image_url}`;
        } else {
            const errorData = await response.json();
            document.getElementById('responseMessage').innerText = `Error: ${errorData.message}`;
        }
    } catch (error) {
        document.getElementById('responseMessage').innerText = `Error: ${error.message}`;
    }
});
