# YAML to DOCX/PDF Converter

A web-based tool that converts YAML files into DOCX or PDF formats. This project uses a React frontend and Flask backend to enable quick and easy document conversion. The app provides an intuitive user interface where users can upload a YAML file, select their desired output format, and download the generated document.

## Features

- Convert YAML files to DOCX formats.
- Simple drag-and-drop file upload interface.
- Option to download the converted file instantly.
- Responsive design with animations for an enhanced user experience.

## Demo

![Screenshot from 2024-10-04 16-20-04](https://github.com/user-attachments/assets/1403e0e9-64af-4cd1-80f0-0226e8197180)


## Tech Stack

- **Frontend**: React, Material-UI, Framer Motion
- **Backend**: Flask, Python, ReportLab, Python-Docx
- **Styling**: Custom CSS with Material-UI for a modern interface

## Project Structure

```plaintext
YAML-to-DOCX
├── backend
│   ├── app.py                    # Flask app for file conversion
│   ├── requirements.txt           # Backend dependencies
│   └── uploads                    # Folder to store uploaded files temporarily
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   │   ├── YamlToDocx.js      # Main file upload and convert component
│   │   ├── animations.js          # Animation configurations
│   │   ├── App.js                 # Main app component
│   │   ├── index.js               # ReactDOM entry point
│   │   └── styles.css             # Custom styling
│   ├── package.json               # Frontend dependencies
│
└── README.md                      # Project documentation
