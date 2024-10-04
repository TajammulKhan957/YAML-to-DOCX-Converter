# YAML to DOCX/PDF Converter

A web-based tool that converts YAML files into DOCX or PDF formats. This project uses a React frontend and Flask backend to enable quick and easy document conversion. The app provides an intuitive user interface where users can upload a YAML file, select their desired output format, and download the generated document.

## Features

- Convert YAML files to DOCX or PDF formats.
- Simple drag-and-drop file upload interface.
- Option to download the converted file instantly.
- Responsive design with animations for an enhanced user experience.

## Demo

![Demo Screenshot](./assets/demo.png) <!-- Replace with an actual screenshot path -->

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
