import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from './routes/user.route.js'
import sellerApplicationRouter from './routes/sellerApplication.route.js'
import adminRouter from './routes/admin.route.js'
import productRouter from './routes/product.route.js'
import storeRouter from './routes/store.route.js'
import sellerRouter from './routes/seller.route.js'
import cartRouter from './routes/cart.route.js'

app.use('/api/v1/users', userRouter)
app.use('/api/v1/seller-application', sellerApplicationRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/store', storeRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/seller', sellerRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500

    res.status(statusCode).json({
        success: false,
        message: err.message || "Something went wrong",
    })
})
export {app}