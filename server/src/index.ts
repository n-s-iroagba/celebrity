import express, { Request, Response } from 'express';
import sequelize  from './config/orm';
import fanRouter from './routes/fanRouter';
import adminRouter from './routes/adminRouter';
import cors from 'cors'
import authRouter from './routes/authRouter';
import celebrityRouter from './routes/celebrityRouter';
import { seedDatabase } from '../seedDatabase';
import jobRouter from './routes/jobRouter';






const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('../uploads'));
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from server!');
}
)
app.use(
  cors({
    origin: '*', // Allow only this domain
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
);
app.use("/admin", adminRouter)
app.use("/fans", fanRouter);
app.use ('/auth',authRouter)
app.use('/jobs', jobRouter);
app.use('/celebrities',celebrityRouter )

sequelize.sync(
  // { force: true } 
).then(() => {
  console.log('Database synced successfully!');
  // seedDatabase()
}).catch((error: Error) => {
  console.error('Error syncing the database: ', error);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
