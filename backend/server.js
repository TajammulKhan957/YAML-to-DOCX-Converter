const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: 'https://yaml-to-docx-converter.vercel.app', // Update this to your frontend's URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions)); // Apply CORS middleware

// Set up multer to store uploaded YAML files
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Route to upload the YAML file and trigger the Python script for conversion
app.post('/convert', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = path.join(__dirname, 'uploads', req.file.filename);

    // Spawn a Python process to run the conversion script
    const pythonProcess = spawn('python3', ['app.py', filePath]);

    // Capture the Python process's output
    pythonProcess.stdout.on('data', (data) => {
        console.log(`Python stdout: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            return res.status(500).json({ error: 'Error during conversion process' });
        }

        const outputFilePath = filePath.replace('.yaml', '.docx'); // Ensure the DOCX file path is correct
        console.log('Generated DOCX path:', outputFilePath); // Log the generated path

        // Send the DOCX file to the frontend after successful conversion
        res.download(outputFilePath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).json({ error: 'Failed to send the file' });
            }
        });
    });
});

// Start the server on port 5000
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
