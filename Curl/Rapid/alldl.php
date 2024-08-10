<?php
// Check if the 'url' parameter is present in the query string
if (isset($_GET['url'])) {
    // Get the URL from the query parameters
    $mediaUrl = $_GET['url'];
    // Build the API endpoint with the URL
    $apiUrl = "https://social-media-video-downloader.p.rapidapi.com/smvd/get/all?url=" . urlencode($mediaUrl);

    // Initialize cURL session
    $curl = curl_init();
    // Set cURL options
    curl_setopt_array($curl, [
        CURLOPT_URL => $apiUrl,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => [
            "x-rapidapi-host: social-media-video-downloader.p.rapidapi.com",
            "x-rapidapi-key: 650590bd0fmshcf4139ece6a3f8ep145d16jsn955dc4e5fc9a"
        ],
    ]);

    // Execute cURL request and get the response
    $response = curl_exec($curl);
    $err = curl_error($curl);
    // Close cURL session
    curl_close($curl);

    // Check for errors and handle the response
    if ($err) {
        // Output the error as JSON
        header('Content-Type: application/json');
        echo json_encode(['error' => "cURL Error #:" . $err]);
    } else {
        // Decode the JSON response
        $data = json_decode($response, true);
        // Check if decoding was successful
        if ($data === null) {
            // Output JSON error if decoding failed
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Error decoding JSON']);
        } else {
            // Function to extract all URLs from the JSON data
            function extractUrls($data) {
                $urls = [];
                if (is_array($data)) {
                    foreach ($data as $value) {
                        if (is_array($value)) {
                            $urls = array_merge($urls, extractUrls($value));
                        } else if (filter_var($value, FILTER_VALIDATE_URL)) {
                            $urls[] = $value;
                        }
                    }
                }
                return $urls;
            }

            // Extract all URLs from the response
            $urls = extractUrls($data);
            // Get the total number of URLs
            $totalUrls = count($urls);
            // Get the index from the query parameter if it exists
            $index = isset($_GET['index']) ? intval($_GET['index']) - 1 : null;

            // Check if an index is specified and within bounds
            if ($index !== null) {
                if (isset($urls[$index])) {
                    // Redirect to the URL at the specified index
                    header('Location: ' . $urls[$index]);
                    exit();
                } else {
                    // Handle case where index is out of bounds
                    header('Content-Type: application/json');
                    echo json_encode([
                        'error' => 'Index out of bounds.',
                        'total_urls' => $totalUrls
                    ]);
                }
            } else {
                // Output only the URLs as JSON if no index is specified
                if (!empty($urls)) {
                    header('Content-Type: application/json');
                    echo json_encode($urls, JSON_PRETTY_PRINT);
                } else {
                    // Handle case where no URLs are found
                    header('Content-Type: application/json');
                    echo json_encode(['error' => 'No URLs found in the response.']);
                }
            }
        }
    }
} else {
    // Handle missing URL parameter
    header('Content-Type: application/json');
    echo json_encode(['error' => 'URL parameter is missing.']);
}
?>



url example https://anything.com?index=1,2,3,4&url=anyurl

https://dlvivek.free.nf/test?index=3&url=https://www.instagram.com/reel/C4w8Qz6sHY9/?igsh=MTBucTg5MHg4NTF1dw==
