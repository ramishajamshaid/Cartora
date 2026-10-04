import {Router} from 'express'
import { verifyJWT, verifySeller } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js'
import { getStoreInfo, updateStoreInfo } from '../controllers/store.controller.js'

const router = Router()

router.route('/get-my-store').get(verifyJWT, verifySeller, getStoreInfo)
router.route('/update-store-info').patch(verifyJWT, verifySeller, upload.single("storeLogo"), updateStoreInfo)

export default router;