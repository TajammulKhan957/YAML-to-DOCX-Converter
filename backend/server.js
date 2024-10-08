const express = require('express');
const multer = require('multer');
const { spawn,exec} = require('child_process');
const path = require('path');
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Set up multer to store uploaded YAML files
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

exec('which python3', (err, stdout, stderr) => {
    if (err) {
        console.error(`Python3 not found: ${stderr}`);
        exec('which python', (err, stdout, stderr) => {
            if (err) {
                console.error(`Python not found: ${stderr}`);
            } else {
                console.log(`Python path: ${stdout}`);
            }
        });
    } else {
        console.log(`Python3 path: ${stdout}`);
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
app.listen(5001, () => {
    console.log('Server is running on port 5001');
});
