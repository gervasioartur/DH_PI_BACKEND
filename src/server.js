require('./database');
require('dotenv/config');
const app = require('./app');
const port = process.env.PORT || 4001;

app.listen(port, () => {
  console.log('Server running on http://localhost:' + port);
});
