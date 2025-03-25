import express, { Request, Response } from 'express';
import sequelize  from './config/orm';
import fanRouter from './routes/fanRouter';
import adminRouter from './routes/adminRouter';
import cors from 'cors'
import authRouter from './routes/authRouter';
import celebrityRouter from './routes/celebrityRouter';
import { seedDatabase } from '../seedDatabase';
import path from 'path'





const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from server!');
}
)
app.use(
  cors({
    origin: "http://localhost:3000", // Allow only this domain
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
);
app.use("/admin", adminRouter)
app.use("/fans", fanRouter);
app.use ('/auth',authRouter)
app.use('/celebrities',celebrityRouter )
app.use('/uploads', express.static('uploads'));
sequelize.sync(
  { force: true } 
).then(() => {
  console.log('Database synced successfully!');
  seedDatabase()
}).catch((error: Error) => {
  console.error('Error syncing the database: ', error);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
