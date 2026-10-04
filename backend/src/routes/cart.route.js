import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { addToCart, getCart, removeFromCart } from '../controllers/cart.controller.js'

const router = Router()

router.route('/get-carts').get(verifyJWT, getCart)
router.route('/add-to-cart').post(verifyJWT, addToCart)
router.route('/remove-from-cart/:productId').delete(verifyJWT, removeFromCart)

export default router;