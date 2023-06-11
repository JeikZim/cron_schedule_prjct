const express = require('express');
const path = require('path');

const PORT = process.env.APP_PORT || 5000;

const app = express();

app.use(express.json({ extended: true }))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "build", "index.html"));
    })
}

app.listen(PORT, () => {
    console.log(`Server start on port: ${PORT}`);
})