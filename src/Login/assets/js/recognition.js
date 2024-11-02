const apiKey = "a8IXOGUopV8kvYThTywIQdp0tdz4jRPl";
        const apiSecret = "fVwz2AhfJZbsLVlvj8sOCYDZDLBCnhqb";
        const apiUrl = "https://api-us.faceplusplus.com/facepp/v3/detect";

        async function detectFace() {
            const fileInput = document.getElementById("imageFile");
            const imageFile = fileInput.files[0];

            if (!imageFile) {
                alert("Por favor, selecciona una imagen.");
                return;
            }

            // Crear el objeto FormData
            const formData = new FormData();
            formData.append("api_key", apiKey);
            formData.append("api_secret", apiSecret);
            formData.append("image_file", imageFile);  
            formData.append("return_attributes", "age,gender,emotion");  

            try {
                const response = await fetch(apiUrl, {
                    method: "POST",
                    body: formData
                });
                
                const result = await response.json();
                console.log("Respuesta de la API:", result);

                if (result.faces && result.faces.length > 0) {
                    window.location.href = "/Inicio";
                } else {
                    alert("No se detectó ningún rostro en la imagen.");
                }
            } catch (error) {
                console.error("Error en la solicitud:", error);
                alert("Ocurrió un error al intentar detectar el rostro.");
            }
        }