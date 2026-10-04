import {Router} from 'express'
import { verifyAdmin, verifyJWT } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js'
import { deleteSellerStore, deleteUser, getAllProducts, getDashboardStats, getSellerDetail, getSellers, getUserDetail, getUsers, suspendUser, unSuspendUser } from '../controllers/admin.controller.js'

const router = Router()

router.route('/dashboard-stats').get(verifyJWT, verifyAdmin, getDashboardStats)
router.route('/sellers').get(verifyJWT, verifyAdmin, getSellers)
router.route('/users').get(verifyJWT, verifyAdmin, getUsers)
router.route('/get-user-detail/:id').get(verifyJWT, verifyAdmin, getUserDetail)
router.route('/suspend-user/:id').patch(verifyJWT, verifyAdmin, suspendUser)
router.route('/unsuspend-user/:id').patch(verifyJWT, verifyAdmin, unSuspendUser)
router.route('/delete-user/:id').delete(verifyJWT, verifyAdmin, deleteUser)
router.route('/seller-detail/:id').get(verifyJWT, verifyAdmin, getSellerDetail)
router.route('/get-all-products').get(verifyJWT, verifyAdmin, getAllProducts)
router.route('/delete-seller-admin/:id').delete(verifyJWT, verifyAdmin, deleteSellerStore)

export default router;