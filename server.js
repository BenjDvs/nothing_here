const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files (index.html and related files)
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle video download
app.post('/download', (req, res) => {
    const videoUrl = req.body.url;

    if (!videoUrl) {
        console.error('No video URL provided');
        return res.status(400).json({ error: 'No video URL provided' });
    }

    console.log(`Video URL received: ${videoUrl}`);

    // Execute the Python script
    exec(`python3 downloader.py ${videoUrl}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Execution Error: ${error.message}`);
            return res.status(500).json({ error: `Execution Error: ${error.message}` });
        }

        if (stderr) {
            console.error(`Python Script Error: ${stderr}`);
            return res.status(500).json({ error: `Python Script Error: ${stderr}` });
        }

        console.log(`Python Script Output: ${stdout}`);
        return res.status(200).json({ message: 'Video downloaded successfully', output: stdout });
    });
});

// Handle 404 errors for non-existing routes
app.use((req, res) => {
    res.status(404).send('Error: Cannot GET the requested resource');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
