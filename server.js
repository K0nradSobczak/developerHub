const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

const API_TOKEN = '3cced67b640e14777cf0ea6808ca340b4c5c3697'; // Replace with your actual Pipedrive API token

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to update deal name
app.post('/update-deal/:dealId', async (req, res) => {
    const { dealId } = req.params;

    try {
        const response = await axios.put(`https://api.pipedrive.com/v1/deals/${dealId}?api_token=${API_TOKEN}`, {
            title: "test1"
        });
        res.json({ success: true, data: response.data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
