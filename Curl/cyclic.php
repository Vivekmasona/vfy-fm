<?php

// Check if the 'url' parameter is present in the query string
if (isset($_GET['url'])) {
    // Get the YouTube URL from the query parameters
    $youtubeUrl = $_GET['url'];

    // Build the full JSON URL with the YouTube URL as a parameter
    $json_url = 'https://vivekfy.cyclic.app/hack?url=' . urlencode($youtubeUrl);

    // Initialize cURL session
    $ch = curl_init($json_url);

    // Set cURL options
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Execute cURL session and get the JSON data
    $json_data = curl_exec($ch);

    // Check for cURL errors
    if (curl_errno($ch)) {
        echo 'Curl error: ' . curl_error($ch);
    }

    // Close cURL session
    curl_close($ch);

    // Decode JSON data
    $data = json_decode($json_data, true);

    // Check if decoding was successful
    if ($data === null) {
        echo 'Error decoding JSON';
    } else {
        // Assuming there's only one audio format, you can access its URL like this
        $audioUrl = $data['audioFormats'][0]['url'];

        // Redirect the user to the song URL
        header('Location: ' . $audioUrl);
        exit;
    }
} else {
    echo 'YouTube URL parameter is missing.';
}

?>
