const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();


app.use(compression());
// index.html will be available inside a folder called build
app.use(express.static(path.join(__dirname, 'build')));
// all incoming requests will be served from index.html from within this folder
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
