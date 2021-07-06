const upload = document.querySelector('.upload');
const inputUpload = upload.querySelector('#file');
const fileName = upload.querySelector('span');



inputUpload.addEventListener("change", e=>{
    const files = Array.from(e.target.files);
    const filesName =[];
    files.forEach((file, index)=>{
        console.log(file.name);
        filesName.push(file.name) ;
        console.log(filesName);
    });
    console.log(filesName);
    fileName.innerHTML = filesName;
})