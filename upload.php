<?php
if (isset($_FILES['file'])) {
    $file = $_FILES['file'];

    // Get the file details
    $fileName = $file['name'];
    $fileTmpName = $file['tmp_name'];
    $fileError = $file['error'];

    // Specify the target folder to save the file
    $targetFolder = "path/to/your/folder/";

    // Custom select input value for folder name
    $customFolder = $_POST['custom_folder'];

    // Create the folder if it doesn't exist
    if (!is_dir($targetFolder . $customFolder)) {
        mkdir($targetFolder . $customFolder, 0777, true);
    }

    // Move the uploaded file to the target folder
    if ($fileError === UPLOAD_ERR_OK) {
        move_uploaded_file($fileTmpName, $targetFolder . $customFolder . '/' . $fileName);
        echo "File uploaded successfully!";
    } else {
        echo "Error uploading file.";
    }
} else {
    echo 'file index not set';
}
echo 'klop';
?>