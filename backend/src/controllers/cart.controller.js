import { Product } from '../models/product.model.js';
import { Store } from '../models/store.model.js';
import { User } from '../models/user.model.js';
import { Cart } from '../models/cart.model.js'
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js'

const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity = 1 } = req.body;

    // 1. Product check
    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    // 2. User ka cart find karo
    let cart = await Cart.findOne({
        user: req.user._id,
    });

    // 3. Agar cart nahi hai
    if (!cart) {
        if (quantity < 1) {
            throw new ApiError(400, "Invalid quantity");
        }

        cart = await Cart.create({
            user: req.user._id,
            items: [
                {
                    product: productId,
                    quantity,
                },
            ],
        });
    } else {
        const existingItem = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;

            // quantity 0 se neeche nahi ja sakti
            if (newQuantity < 1) {
                throw new ApiError(400, "Quantity cannot be less than 1");
            }

            // stock check
            if (newQuantity > product.stock) {
                throw new ApiError(400, "Requested quantity exceeds stock");
            }

            existingItem.quantity = newQuantity;
        } else {
            if (quantity < 1) {
                throw new ApiError(400, "Invalid quantity");
            }

            if (quantity > product.stock) {
                throw new ApiError(400, "Requested quantity exceeds stock");
            }

            cart.items.push({
                product: productId,
                quantity,
            });
        }

        await cart.save();
    }

    res.status(200).json(
        new ApiResponse(
            200,
            cart,
            "Cart updated successfully"
        )
    );
});

const removeFromCart = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    if (!productId) {
        throw new ApiError(400, "Product ID is required");
    }

    const cart = await Cart.findOne({
        user: req.user._id,
    });

    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    const itemExists = cart.items.some(
        (item) => item.product.toString() === productId
    );

    if (!itemExists) {
        throw new ApiError(404, "Product not found in cart");
    }

    cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId
    );

    await cart.save();

    res.status(200).json(
        new ApiResponse(
            200,
            cart,
            "Product removed from cart successfully"
        )
    );
});

const getCart = asyncHandler(async (req, res) => {
    const user = req.user;

    if (!user) {
        throw new ApiError(401, "Unauthorized Access");
    }

    console.log("USER ID:", user._id);

    const carts = await Cart.findOne({ user: user._id })
        .populate("items.product");

    console.log("CARTS:", carts);

    if (!carts) {
        throw new ApiError(404, "Cart is empty");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, carts, "Carts fetched successfully")
        );
});

export { addToCart, removeFromCart, getCart }