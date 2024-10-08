const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');
const cors = require('cors');
const app = express();

// Configure CORS to allow only your Vercel frontend to access the backend
const allowedOrigins = ['https://yaml-to-docx-converter-git-main-tajammul-khans-projects.vercel.app'];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or Postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'CORS policy does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
};

app.use(cors(corsOptions)); // To allow cross-origin requests only from specified origins

// Set up multer to store uploaded YAML files in the uploads folder
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
