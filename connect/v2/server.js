const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let sessions = {};

app.post('/control', (req, res) => {
    const { action, value, sessionId } = req.body;

    if (!sessions[sessionId]) {
        sessions[sessionId] = { url: '', status: 'stop', volume: 100, action: null, value: null, lastSkipValue: null, lastSkipDirection: null };
    }

    const session = sessions[sessionId];

    if (action === 'skip') {
        const direction = value > session.lastSkipValue ? 'forward' : 'backward';

        if (value !== session.lastSkipValue || direction !== session.lastSkipDirection) {
            session.lastSkipValue = value;
            session.lastSkipDirection = direction;
            session.action = action;
            session.value = value;
            res.json({ status: 'Skip action processed', action, value, sessionId });
        } else {
            res.json({ status: 'Skip action ignored', action, value, sessionId });
        }
    } else {
        session.action = action;
        session.value = value;
        res.json({ status: 'Command received', action, value, sessionId });
    }
});

app.post('/update-url', (req, res) => {
    const { url, sessionId } = req.body;

    if (!sessions[sessionId]) {
        sessions[sessionId] = { url: '', status: 'stop', volume: 100, action: null, value: null, lastSkipValue: null, lastSkipDirection: null };
    }

    sessions[sessionId].url = url;
    res.json({ status: 'URL updated', sessionId });
});

app.get('/current-url/:sessionId', (req, res) => {
    const { sessionId } = req.params;

    if (!sessions[sessionId]) {
        return res.status(400).json({ error: 'Invalid session ID' });
    }

    res.json({
        success: true,
        sessionId,
        url: sessions[sessionId].url,
        status: sessions[sessionId].status,
        volume: sessions[sessionId].volume,
        action: sessions[sessionId].action,
        value: sessions[sessionId].value
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
