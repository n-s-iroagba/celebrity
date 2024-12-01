import express from "express";
import bodyParser from "body-parser";
import router from "../routes/survey";



const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



