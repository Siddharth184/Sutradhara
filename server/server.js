// import express from 'express'
// import 'dotenv/config'
// import cors from 'cors'
// import connectDB from './config/db.js'
// import userRouter from './routes/userRoutes.js'
// import chatRouter from './routes/chatRoutes.js'
// import messageRouter from './routes/messageRoutes.js'
// import creditRouter from './routes/creditsRoutes.js'
// import { stripeWebhooks } from './controllers/webhooks.js'

// const app = express()

// await connectDB();

// //stripe webhooks
// app.post('/api/stripe', express.raw({type: 'application/json'}),stripeWebhooks)


// //Middleware
// app.use(cors())
// app.use(express.json())


// //Routes
// app.get('/', (req, res) => res.send('Server is Live!'))
// app.use('/api/user', userRouter)
// app.use('/api/chat', chatRouter)
// app.use('/api/message', messageRouter)
// app.use('/api/credits', creditRouter)

// const PORT = process.env.Port || 3000

// app.listen(PORT , () => {
//     console.log(`Server is running on port ${PORT}`);
    
// })

import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js'
import userRouter from './routes/userRoutes.js'
import chatRouter from './routes/chatRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import creditRouter from './routes/creditsRoutes.js'
import { stripeWebhooks } from './controllers/webhooks.js'

const app = express()

await connectDB();

// Middleware
app.use(cors())
app.use(express.json()) // apply globally first

// Stripe webhooks (⚠️ must come AFTER express.json but override it for this route)
app.post('/api/stripe', express.raw({ type: 'application/json' }), stripeWebhooks)

// Routes
app.get('/', (req, res) => res.send('Server is Live!'))
app.use('/api/user', userRouter)
app.use('/api/chat', chatRouter)
app.use('/api/message', messageRouter)
app.use('/api/credits', creditRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
