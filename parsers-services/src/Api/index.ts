import express from 'express';
import ParsersGateway from '../ParsersGateway';
import SiteChecker from '../SiteChecker';

const port = 3002;
const app = express();

app.get('/start', () => {
  try {
    SiteChecker();
    SiteChecker();

    ParsersGateway();
    return 'gg';
  } catch (error) {
    return error;
  }
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
