import React from 'react';
import { Container, Typography, CssBaseline } from '@mui/material';
import YamlToDocx from './components/YamlToDocx';
import './styles.css';
import { motion } from 'framer-motion';

function App() {
    return (
        <div className="App">
            <CssBaseline />
            <Container maxWidth="md">
                <motion.div className="hero-section" initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
                    <img src="/assets/add_file.svg" alt="Upload Illustration" className="hero-image" />
                    <Typography variant="h3" align="center" className="hero-title">
                        YAML to DOCX Converter
                    </Typography>
                    <Typography variant="h6" align="center" className="hero-subtitle">
                        Upload your YAML file and download the converted DOCX or PDF instantly!
                    </Typography>
                </motion.div>
                <YamlToDocx />
            </Container>
        </div>
    );
}

export default App;
