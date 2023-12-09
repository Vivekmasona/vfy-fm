<?php
// Get YouTube video ID from the URL parameter
$video_id = isset($_GET['id']) ? $_GET['id'] : '';

// Check if the video ID is provided
if (empty($video_id)) {
    echo "Please provide a valid YouTube video ID.";
    exit();
}

// Fetch JSON from your server
$json_url = "https://vivekfy.deno.dev/vid?id=$video_id"; // Use the provided video ID
$json_data = file_get_contents($json_url);

// Decode JSON data
$json_object = json_decode($json_data);

// Check if JSON decoding was successful
if ($json_object === null) {
    echo "Error decoding JSON data.";
    exit();
}

// Check if the necessary properties are available in the JSON
if (!isset($json_object->stream->formats[0]->url)) {
    echo "Audio URL not found in JSON data.";
    exit();
}

// Get the audio URL
$audio_url = $json_object->stream->formats[0]->url; // Assuming you want the first format

// Redirect to the audio URL
header("Location: $audio_url");
exit();
?>
