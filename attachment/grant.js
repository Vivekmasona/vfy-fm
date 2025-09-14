
        (async function requestClipboardPermission() {
            try {
                const permission = await navigator.permissions.query({ name: 'clipboard-read' });
                if (permission.state === 'granted') {
                    document.getElementById('status').textContent = 'Clipboard access is granted.';
                } else if (permission.state === 'prompt') {
                    await navigator.clipboard.readText();  // Triggers prompt
                    document.getElementById('status').textContent = 'Clipboard permission requested.';
                } else {
                    document.getElementById('status').textContent = 'Clipboard access denied.';
                }
            } catch (error) {
                document.getElementById('status').textContent = `Error: ${error.message}`;
            }
        })();
    
