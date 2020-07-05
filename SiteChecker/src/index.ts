import helmet from 'helmet';
import express from 'express';

const port = 3003;
const app = express();

app.use(helmet());

app.all('/site-checker/sss', (req, res) => {
  console.log(req.body);
  res.send('ok');
});

app.use((req, res, next) => {
  res.send('404 from site-checker');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

