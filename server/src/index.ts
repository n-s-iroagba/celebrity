// ... other imports
import celebrityRouter from "./routes/celebrityRouter" // Ensure this is correctly imported
import temporaryChatRouter from "./routes/temporaryChatRouter" // Import the new router
import authRouter from "./routes/authRouter"
import fanRouter from "./routes/fanRouter"
import chatRouter from "./routes/chatRouter"
import testSetupRouter from "./routes/testSetupRouter"
import reservationRouter from "./routes/reservationRouter"
import eventRouter from "./routes/eventRouter"
import orderRouter from "./routes/orderRouter" // Import the new order router
import sequelize from "./config/orm"
import path from "path"
import express, { type Express } from "express"
import cors from "cors"
import passport from "passport" // For OAuth
import session from "express-session" // For OAuth
import "./config/passport-setup" // Your passport configuration
import { createServer } from "http"
import { initializeWebSocketServer } from "./websocket"

const app: Express = express()
const PORT = process.env.PORT || 3001

// CORS configuration
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:3000",
  // Add other origins if needed, like your production frontend URL
]

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "The CORS policy for this site does not allow access from the specified Origin."
        return callback(new Error(msg), false)
      }
      return callback(null, true)
    },
    credentials: true, // Important for cookies, authorization headers with HTTPS
  }),
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")))

// Express Session Setup (Required for Passport OAuth sessions)
// Ensure SESSION_SECRET is set in your .env file
if (!process.env.SESSION_SECRET) {
  console.error("FATAL ERROR: SESSION_SECRET is not defined in .env file.")
  process.exit(1) // Exit if session secret is not set
}
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, // true if you want to store session for unauthenticated users
    cookie: {
      secure: process.env.NODE_ENV === "production", // true if using https
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day, for example
    },
  }),
)

// Passport Initialization
app.use(passport.initialize())
app.use(passport.session()) // For persistent login sessions with OAuth

// API Routes
app.use("/api/auth", authRouter)
app.use("/api/fans", fanRouter)
app.use("/api/celebrities", celebrityRouter) // Existing celebrity routes
app.use("/api/temp-chats", temporaryChatRouter) // Add new temporary chat routes
app.use("/api/chats", chatRouter)
app.use("/api/reservations", reservationRouter)
app.use("/api/events", eventRouter)
app.use("/api/orders", orderRouter) // Add the new order routes

// Test setup route (conditionally include)
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  app.use("/api/test-setup", testSetupRouter)
}

// Create HTTP server from the Express app
const httpServer = createServer(app)

// Initialize WebSocket server and attach it to the HTTP server
initializeWebSocketServer(httpServer)

// Database synchronization and Server Start
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synchronized successfully.")
    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
      console.log(`WebSocket server is listening on the same port.`)
      if (process.env.NODE_ENV === "development") {
        console.log(`Client URL configured as: ${process.env.CLIENT_URL}`)
      }
    })
  })
  .catch((error: Error) => {
    console.error("Unable to synchronize the database:", error)
  })
