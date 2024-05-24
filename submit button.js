document.getElementById('uploadForm').addEventListener('submit', function(e)
 {
    e.preventDefault();

    var fileInput = document.getElementById('fileInput');
    var formatSelect = document.getElementById('formatSelect');
    var loadingIndicator = document.getElementById('loading');
    var result = document.getElementById('result');
    var downloadLink = document.getElementById('downloadLink');

    if (fileInput.files.length > 0 && formatSelect.value) {
        var file = fileInput.files[0];
        var format = formatSelect.value;

        // Show loading indicator
        loadingIndicator.classList.remove('hidden');
        result.classList.add('hidden');

        var formData = new FormData();
            formData.append('file', file);

            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/convert');
            xhr.upload.onprogress = function(event) {
                if (event.lengthComputable) {
                    var percentComplete = (event.loaded / event.total) * 100;
                    console.log(percentComplete + '% uploaded');
                }
            };
            xhr.onload = function() {
                if (xhr.status === 200) {
                    window.location.href = '/conversion-result?converted_file=' + xhr.responseText;
                } else {
                    console.error('File conversion failed.');
                    // Handle error
                }
            };
            xhr.send(formData);
    }
}
