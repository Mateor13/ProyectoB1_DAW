const files = document.querySelectorAll(".Fancy-file");
Array.from(files).forEach(f => {
    f.addEventListener('change', e => {
        const span  = document.querySelector(`.Fancy-file_Fancy-file-name > span`);
        if (f.files.length == 0) {
            span.innerHTML = "Ningún archivo seleccionado";
        }else if(f.files.length == 1){
            span.innerHTML = f.files[0].name;
        }
})
});