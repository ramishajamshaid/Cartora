import {Router} from 'express'
import { verifyJWT, verifySeller } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js'
import { getSellerDashboardData } from '../controllers/seller.controller.js'

const router = Router()

router.route('/get-seller-dashboard-data').get(verifyJWT, verifySeller, getSellerDashboardData)

export default router;