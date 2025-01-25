async function downloadVideo() {
    const videoUrl = document.getElementById('videoUrl').value;

    if (!videoUrl) {
        alert('Please enter a video URL!');
        return;
    }

    try {
        const response = await fetch('/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: videoUrl }),
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            console.log(result.output);
        } else {
            console.error(`Error from server: ${result.error}`);
            alert(`Error: ${result.error}`);
        }
    } catch (error) {
        console.error('Unexpected error occurred:', error);
        alert('Unexpected error occurred. Check the console for details.');
    }
}

