const apiKey = "a8IXOGUopV8kvYThTywIQdp0tdz4jRPl";
        const apiSecret = "fVwz2AhfJZbsLVlvj8sOCYDZDLBCnhqb";
        const apiUrl = "https://api-us.faceplusplus.com/facepp/v3/detect";

        async function detectFace() {
            const advertencia = document.querySelector('p');
            const fileInput = document.getElementById("imageFile");
            const imageFile = fileInput.files[0];

            if (!imageFile) {
                advertencia.style.display = "block";
                advertencia.style.color = "#ff4757";
                advertencia.innerHTML = "Por favor, selecciona una imagen con tu rostro antes de continuar.";
                return;
            }

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
                    advertencia.style.display = "block";
                    advertencia.style.color = "#ff4757";
                    advertencia.innerHTML = "Detección exitosa. Redirigiendo...";
                    setTimeout(() => {
                    window.location.href = "/Inicio"}, 2000);
                } else {
                    advertencia.style.display = "block";
                    advertencia.style.color = "#ff4757";
                    advertencia.innerHTML = "No se detectó un rostro en la imagen. Por favor, intenta de nuevo.";
                }
            } catch (error) {
                console.error("Error en la solicitud:", error);
                advertencia.style.display = "block";
                advertencia.style.color = "#ff4757";
                advertencia.innerHTML = "Ocurrió un error al intentar detectar el rostro.";
            }
        }