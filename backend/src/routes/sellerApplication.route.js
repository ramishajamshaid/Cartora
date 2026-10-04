import {Router} from 'express'
import { verifyAdmin, verifyJWT } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js'
import { approveSellerApplication, createSellerApplication, getMySellerApplication } from '../controllers/sellerApplication.controller.js'

const router = Router()

router.route('/create-seller-application').post(verifyJWT, upload.single("storeLogo"), createSellerApplication)
router.route('/my-application').get(verifyJWT,getMySellerApplication)
router.route('/:id/approve').patch(verifyJWT,verifyAdmin,approveSellerApplication)
export default router;