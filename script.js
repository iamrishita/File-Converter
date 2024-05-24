const dropArea = document.querySelector(".drag-image"),
      dragText = dropArea.querySelector("h6"),
      button = dropArea.querySelector("button"),
      input = dropArea.querySelector("input");
let file;

button.onclick = () => {
  input.click();
}

input.addEventListener("change", function() {
  file = this.files[0];
  dropArea.classList.add("active");
  viewfile();
});

dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  file = event.dataTransfer.files[0];
  dropArea.classList.add("active");
  viewfile();
});

function viewfile() {
  let fileType = file.type;
  let fileName = file.name;
  let validImageExtensions = ["image/jpeg", "image/jpg", "image/png"];
  let fileReader = new FileReader();

  if (validImageExtensions.includes(fileType)) {
    fileReader.onload = () => {
      let fileURL = fileReader.result;
      let imgTag = `<img src="${fileURL}" alt="image">`;
      dropArea.innerHTML = imgTag;
    }
    fileReader.readAsDataURL(file);
  } else {
    fileReader.onload = () => {
      let fileURL = fileReader.result;
      let fileTag = `<div class="file-info">
                       <p>File Name: ${fileName}</p>
                       <p>File Type: ${fileType}</p>
                       <p>File Size: ${formatFileSize(file.size)}</p>
                     </div>`;
      dropArea.innerHTML = fileTag;
    }
    fileReader.readAsDataURL(file);
  }
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
  else if (bytes < 1073741824) return (bytes / 1048576).toFixed(2) + ' MB';
  else return (bytes / 1073741824).toFixed(2) + ' GB';
}

