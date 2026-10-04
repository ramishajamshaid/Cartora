import {Router} from 'express'
import { getUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateUserProfilePicture } from '../controllers/user.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js'

const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(verifyJWT,logoutUser)
router.route('/refresh-token').post(refreshAccessToken)
router.route('/me').get(verifyJWT,getUser)
router.route('/profile-image').patch(verifyJWT, upload.single('profile_image'),updateUserProfilePicture)

export default router;