import * as express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Event } from './entities/Event';
const app = express();

app.get('/', (_, res: express.Response) => {
  res.send('Server is running dude!');
});

app.listen(3000, () =>
  console.log('Backend for frontend listening on port 3000!'),
);
createConnection({
  type: 'sqlite',
  synchronize: true,
  logging: true,
  database: 'src/data/database.sqlite',
  entities: [Event],
})
  .then(async () => {
    console.log(
      await Event.findOne({ id: 'eec78699-9f6a-4e64-8151-a0d663351e57' }),
    );
  })
  .catch(e => console.log(e));
