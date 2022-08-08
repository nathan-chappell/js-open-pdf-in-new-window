const button = document.getElementById("open-pdf");
const fileSelector = document.getElementById("select-pdf");

const getData = () => fetch('http://localhost:8000').then(response => response.json());

let selectedFile = null;

button.onclick = async () => {
    const data = await getData();
    console.log(data);

    const decoded = atob(data.data);
    const pdfData = new Uint8Array(decoded.length);

    for (let i = 0; i < decoded.length; ++i) {
        pdfData[i] = decoded.charCodeAt(i);
    }
    
    const file = new File([pdfData], 'report.pdf', {type: 'application/pdf'});
    console.log(file);

    const url = URL.createObjectURL(file);
    newWindow = window.open(url);

    newWindow.onload = () => {
        URL.revokeObjectURL(url);
    }

    if (selectedFile !== null) {
        const b1 = await selectedFile.arrayBuffer();
        console.log(b1);
        const b2 = await file.arrayBuffer();
        console.log(b2);
        if (b1.length != b2.length) {
            console.log('buffers arent same size');
        } else {
            for (let i = 0; i < b1.length; ++i) {
                if (b1[i] != b2[i]) {
                    console.log('buffers dont match at ' + i.toString());
                    break;
                }
            }
        }
    }
}

fileSelector.onchange = () => {
    selectedFile = fileSelector.files[0];
    console.log(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    console.log(url);

    const newWindow = window.open(url);

    newWindow.onload = () => {
        URL.revokeObjectURL(url);
    }
}