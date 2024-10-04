const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors()); // To allow cross-origin requests

// Set up multer to store uploaded YAML files in the uploads folder
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Route to upload the YAML file and trigger Python script
app.post('/convert', upload.single('file'), (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.file.filename);

    // Spawn a Python process to run the conversion script
    const pythonProcess = spawn('python3', ['app.py', filePath]);

    pythonProcess.on('close', (code) => {
        const outputFilePath = filePath.replace('.yaml', '.docx'); // Ensure the DOCX file path is correct
        console.log('Generated DOCX path:', outputFilePath); // Log the generated path

        res.download(outputFilePath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
