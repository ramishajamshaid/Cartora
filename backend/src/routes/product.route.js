import {Router} from 'express'
import { verifyAdmin, verifyJWT, verifySeller } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js'
import { addProduct, deleteProductAsAdmin, deleteSellerProduct, getProductDetailAsAdmin, getProducts, getSellerProductDetail, getSellerProducts,  updateProductDetailAsAdmin,  updateSellerProductDetail } from '../controllers/product.controller.js'

const router = Router()

router.route('/add-product').post(verifyJWT, verifySeller, upload.fields([{name:'images', maxCount:5}]),addProduct)
router.route('/get-seller-products').get(verifyJWT, verifySeller, getSellerProducts)
router.route('/get-seller-product-detail/:id').get(verifyJWT, verifySeller, getSellerProductDetail)
router.route('/update-seller-product-detail/:id').patch(verifyJWT, verifySeller, upload.array('images'),updateSellerProductDetail)
router.route('/delete-seller-product/:id').delete(verifyJWT, verifySeller, deleteSellerProduct)
router.route('/get-products').get(getProducts)
router.route('/get-product-detail-admin/:id').get(verifyJWT, verifyAdmin, getProductDetailAsAdmin)
router.route('/get-product-detail-customer/:id').get(getProductDetailAsAdmin)
router.route('/update-product-detail-admin/:id').patch(verifyJWT, verifyAdmin, upload.array('images'),updateProductDetailAsAdmin)
router.route('/delete-product-admin/:id').delete(verifyJWT, verifyAdmin, deleteProductAsAdmin)

export default router;