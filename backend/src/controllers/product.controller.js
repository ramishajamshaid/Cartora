import { Product } from '../models/product.model.js';
import { Store } from '../models/store.model.js';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const addProduct = asyncHandler(async (req, res) => {
    console.log("Req body: ", req.body);
    console.log("Req Files: ", req.files.images);
    const { title, description, price, comparePrice, stock, sku, category, subcategory, brand, condition, status, tags } = req.body
    const images = req.files?.images || []

    if ([title, price, stock, category].some(item => item.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const existingProduct = await Product.findOne({ sku });

    if (existingProduct) {
        throw new ApiError(400, "SKU already exists");
    }

    const store = await Store.findOne({ owner: req.user._id })

    if (!store) {
        throw new ApiError(404, "Store not found");
    }

    const uploadedImages = await Promise.all(
        images.map(image => uploadOnCloudinary(image.path))
    )

    const imageUrls = uploadedImages.map(image => image.secure_url)

    const product = await Product.create({
        store: store._id,
        title: title.trim(),
        description: description.trim(),
        price: price,
        comparePrice: comparePrice,
        stock: stock,
        sku: sku,
        category: category.trim(),
        subcategory: subcategory.trim(),
        brand: brand.trim(),
        condition: condition.trim(),
        tags: tags.trim(),
        images: imageUrls,
        status: status.trim(),
    })

    const addedProduct = await Product.findById(product._id)

    if (!addedProduct) {
        throw new ApiError(500, "Something went wrong while adding the product")
    }

    return res
        .status(201)
        .json(
            new ApiResponse(200, addedProduct, "User registered successfully")
        )
})

const getSellerProducts = asyncHandler(async (req, res) => {
    const store = await Store.findOne({ owner: req.user._id })
    if (!store) {
        throw new ApiError(402, "unAuthorized access")
    }
    const products = await Product.find({ store: store._id })

    return res
        .status(201)
        .json(
            new ApiResponse(201, products, "Products fetched successfully")
        )
})

const getSellerProductDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(401, "Product ID is required")
    }

    const productDetail = await Product.findById(id)

    return res
        .status(200)
        .json(
            new ApiResponse(200, productDetail, "Seller Product Detail fetched successfully")
        )
})

const updateSellerProductDetail = asyncHandler(async (req, res) => {
    const { id } = req.params
    console.log(id);

    const { title, description, price, comparePrice, stock, sku, category, subcategory, brand, condition, status, tags } = req.body
    const newImages = req.files || []
    console.log("New Images: ", newImages);


    if ([title, description, price, stock, sku, category].some(
        field => field === undefined || field === null || String(field).trim() === ""
    )) {
        throw new ApiError(400, "All fields are required");
    }

    const updateData = {
        ...req.body,
    };

    const existingImages = Array.isArray(req.body.existingImages)
        ? req.body.existingImages
        : req.body.existingImages
            ? [req.body.existingImages]
            : [];

    const uploadedImages = newImages?.length
        ? await Promise.all(
            newImages.map(async (image) => {
                const uploaded = await uploadOnCloudinary(image.path);
                return uploaded?.url;
            })
        )
        : [];

    updateData.images = [
        ...existingImages,
        ...uploadedImages.filter(Boolean),
    ];

    const store = await Store.findOne({ "owner": req.user._id })
    if (!store) {
        throw new ApiError(401, "Store not found")
    }
    const updatedProduct = await Product.findOneAndUpdate(
        { _id: id, "store": store._id },
        { $set: updateData },
        { returnDocument: 'after' }
    ).populate("store", "email");

    if (!updatedProduct) {
        throw new ApiError(404, "Product not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedProduct, "Product details updated successfully")
        )
})

const deleteSellerProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!id) {
        throw new ApiError(401, "Product Id is required")
    }

    const store = await Store.findOne({ "owner": req.user._id })
    const product = await Product.findOneAndDelete({ _id: id, "store": store._id })

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, true, "Product deleted Successfully")
        )
})

// Admin Controls

const updateProductDetailAsAdmin = asyncHandler(async (req, res) => {
    const { id } = req.params
    console.log(id);

    const { title, description, price, comparePrice, stock, sku, category, subcategory, brand, condition, status, tags } = req.body
    const newImages = req.files || []
    console.log("New Images: ", newImages);


    if ([title, description, price, stock, sku, category].some(
        field => field === undefined || field === null || String(field).trim() === ""
    )) {
        throw new ApiError(400, "All fields are required");
    }

    const updateData = {
        ...req.body,
    };

    const existingImages = Array.isArray(req.body.existingImages)
        ? req.body.existingImages
        : req.body.existingImages
            ? [req.body.existingImages]
            : [];

    const uploadedImages = newImages?.length
        ? await Promise.all(
            newImages.map(async (image) => {
                const uploaded = await uploadOnCloudinary(image.path);
                return uploaded?.url;
            })
        )
        : [];

    updateData.images = [
        ...existingImages,
        ...uploadedImages.filter(Boolean),
    ];

    const updatedProduct = await Product.findByIdAndUpdate(id,
        { $set: updateData },
        { returnDocument: 'after' }
    ).populate("store", "email");

    if (!updatedProduct) {
        throw new ApiError(404, "Product not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedProduct, "Product details updated successfully")
        )
})

const getProductDetailAsAdmin = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(401, "Product ID is required")
    }

    const productDetail = await Product.findById(id).populate("store")

    return res
        .status(200)
        .json(
            new ApiResponse(200, productDetail, "Product Detail fetched successfully")
        )
})

const getProductDetailAsCustomer = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(401, "Product ID is required")
    }

    const productDetail = await Product.findById(id).populate("store")

    return res
        .status(200)
        .json(
            new ApiResponse(200, productDetail, "Product Detail fetched successfully")
        )
})

const deleteProductAsAdmin = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!id) {
        throw new ApiError(401, "Product Id is required")
    }

    const product = await Product.findByIdAndDelete(id)

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, true, "Product deleted Successfully")
        )
})

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find()

    return res
        .status(201)
        .json(
            new ApiResponse(201, products, "products fetched successfully")
        )
})

export { addProduct, getSellerProducts, updateSellerProductDetail, getProducts, getSellerProductDetail, deleteSellerProduct, getProductDetailAsAdmin, getProductDetailAsCustomer, updateProductDetailAsAdmin, deleteProductAsAdmin }