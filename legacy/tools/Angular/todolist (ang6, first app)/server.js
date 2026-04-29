const express = require('express');
const path = require('path');

const app = express();

const { name } = require('./package.json');

// Serve only the static files form the dist directory
app.use(express.static(`./dist/${name}`));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, `/dist/${name}/index.html`));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
