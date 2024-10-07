import React, { useState } from 'react';
import { Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { FadeInAnimation } from '../animations';
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';

function YamlToDocx() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please upload a YAML file');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);

        try {
            const response = await axios.post('https://your-backend-app.up.railway.app/convert', formData, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${file.name.replace('.yaml', '.docx')}`);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error during conversion:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div variants={FadeInAnimation} initial="hidden" animate="visible">
            <Grid container spacing={2} alignItems="center" direction="column" className="yaml-form">
                <Grid item>
                    <Typography variant="h6" align="center">
                        Upload a YAML file to convert to DOCX format.
                    </Typography>
                </Grid>
                <Grid item>
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Button variant="contained" component="label" startIcon={<CloudUploadIcon />} className="upload-button">
                            Upload YAML File
                            <input type="file" hidden accept=".yaml" onChange={handleFileChange} />
                        </Button>
                    </motion.div>
                </Grid>
                {file && (
                    <Grid item>
                        <TextField
                            disabled
                            value={file.name}
                            variant="outlined"
                            label="Selected File"
                            className="selected-file"
                        />
                    </Grid>
                )}
                <Grid item>
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            startIcon={<DownloadIcon />}
                            disabled={loading}
                            className="submit-button"
                        >
                            {loading ? <CircularProgress size={24} /> : 'Convert to DOCX'}
                        </Button>
                    </motion.div>
                </Grid>
            </Grid>
        </motion.div>
    );
}

export default YamlToDocx;
