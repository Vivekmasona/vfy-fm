<?php
// Function to extract YouTube video ID from URL
function getYouTubeVideoId($url) {
    $videoId = '';

    // Extract video ID from standard YouTube URL
    if (preg_match('/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/', $url, $match)) {
        $videoId = $match[1];
    }

    return $videoId;
}

// Get YouTube URL from the parameter
$youtubeUrl = isset($_GET['url']) ? $_GET['url'] : '';

// Validate and extract video ID
if (!empty($youtubeUrl)) {
    $videoId = getYouTubeVideoId($youtubeUrl);

    if (!empty($videoId)) {
        // Your server URL with the extracted video ID
        $serverUrl = 'https://vivekfy.deno.dev/vid?id=' . $videoId;

        // Use cURL to fetch JSON data from the server
        $ch = curl_init($serverUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $jsonData = curl_exec($ch);
        curl_close($ch);

        // Decode JSON
        $data = json_decode($jsonData, true);

        // Check if decoding was successful
        if ($data !== null) {
            // Fetching Opus audio URL
            $opusAudioUrl = $data['stream']['adaptiveFormats'][1]['url'];

            // Redirect the user directly to the Opus audio URL
            header("Location: $opusAudioUrl");
            exit();
        } else {
            // Display an error if decoding fails
            echo "Error decoding JSON data from the server.";
        }
    } else {
        // Display an error if video ID extraction fails
        echo "Error extracting YouTube video ID from the URL.";
    }
} else {
    // Display an error if URL parameter is missing
    echo "Please provide a YouTube URL using the 'url' parameter.";
}
?>
