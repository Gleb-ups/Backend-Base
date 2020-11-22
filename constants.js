const port = process.env.PORT || 3000;
const SERVER_URL = process.env.SERVER_URL || `http://localhost:${port}/`;

module.exports = {port, SERVER_URL};