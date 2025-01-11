import express, { Request, Response } from 'express';
import sequelize  from './config/orm';
import { Booking } from './models/Booking';


const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the App!');
});

sequelize.sync({ force: true }).then(() => {
  console.log('Database synced successfully!');
}).catch((error: Error) => {
  console.error('Error syncing the database: ', error);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
