import helmet from 'helmet';
import express from 'express';

const port = 3002;
const app = express();

app.use(helmet());

app.all('/api/start', (req, res) => {
  // connect to postgres, take sites
  // post sites to FaaSHosts.processing
  // post processedData to FaaSHosts.normalize
  // post data to db
  // const sites: Sites = {
  //   farfetchMenSale: 'https://www.farfetch.com/ru/shopping/men/sale/all/items.aspx',
  //   farfetchWomenSale: 'https://www.farfetch.com/ru/shopping/women/sale/all/items.aspx',
  // };

  console.log(req.body);
  res.send('ok');
});

app.use((req, res, next) => {
  res.send('404 from api');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
