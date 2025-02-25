import express, { Request, Response } from 'express';
import sequelize  from './config/orm';
import { Booking } from './models/Booking';
import { Admin } from './models/Admin';
import fanRouter from './routes/fanRouter';
import adminRouter from './routes/adminRouter';




const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from server!');
}
)

app.use("/admin", adminRouter)
app.use("/fans", fanRouter);


sequelize.sync(
  { force: false } 
).then(() => {
  console.log('Database synced successfully!');
}).catch((error: Error) => {
  console.error('Error syncing the database: ', error);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
