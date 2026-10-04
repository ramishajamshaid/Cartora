import mongoose from 'mongoose';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js'
import { User } from '../models/user.model.js'
import { Store } from '../models/store.model.js'
import { SellerApplication } from '../models/sellerApplication.model.js'
import { Product } from '../models/product.model.js';


const getDashboardStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments()
  const totalSellers = await User.countDocuments({ role: "seller" })
  const totalProducts = await Product.countDocuments()

  return res
    .status(201)
    .json(
      new ApiResponse(201, { totalUsers, totalSellers, totalProducts }, "Dashboard stats fetched sccessfully")
    )
})

const getSellers = asyncHandler(async (req, res) => {
  const approvedSellers = await Store.find()
  const pendingSellers = await SellerApplication.find({ status: "pending" })

  return res
    .status(201)
    .json(
      new ApiResponse(201, { approvedSellers, pendingSellers }, "Sellers fetched successfully")
    )
})

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()

  return res
    .status(201)
    .json(
      new ApiResponse(201, users, "users fetched successfully")
    )
})

const getSellerDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let seller = await SellerApplication.findById(id).populate("user", "-password -refreshToken");

  if (seller) {
    return res.status(200).json(
      new ApiResponse(200, {
        type: "application",
        seller
      }, "Seller application fetched successfully")
    );
  }

  seller = await Store.findById(id).populate(
    "owner",
    "-password -refreshToken"
  );

  if (seller) {
    return res.status(200).json(
      new ApiResponse(200, {
        type: "store",
        seller
      }, "Seller fetched successfully")
    );
  }

  throw new ApiError(404, "Seller not found");
});

const getUserDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(401, "Id is required")
  }

  let user = await User.findById(id).select("-password -refreshToken");

  if (user) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, user, "User fetched successfully")
      );
  }

  throw new ApiError(404, "User not found");
});

const suspendUser = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!id) {
    throw new ApiError(401, "Id is required")
  }

  const user = await User.findByIdAndUpdate(id,
    {
      accountStatus: "suspended"
    },
    {
      returnDocument: 'after'
    }
  )

  if (!user) {
    throw new ApiError(404, "User not found")
  }

  if (user.accountStatus !== "suspended") {
    throw new ApiError(409, "Something went wrong while suspending account")
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, user, "User suspended successfully")
    )
})

const unSuspendUser = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!id) {
    throw new ApiError(401, "Id is required")
  }

  const user = await User.findByIdAndUpdate(id,
    {
      accountStatus: "active"
    },
    {
      returnDocument: 'after'
    }
  )

  if (!user) {
    throw new ApiError(404, "User not found")
  }

  if (user.accountStatus !== "active") {
    throw new ApiError(409, "Something went wrong while unsuspending account")
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, user, "User unsuspended successfully")
    )
})

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Id is required");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user = await User.findById(id).session(session);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user.role === "seller") {
      await SellerApplication.deleteOne(
        { user: user._id },
        { session }
      );

      const store = await Store.findOne({
        owner: user._id,
      }).session(session);

      if (store) {
        await Store.deleteOne(
          { _id: store._id },
          { session }
        );

        await Product.deleteMany(
          { store: store._id },
          { session }
        );
      }
    }

    await User.deleteOne(
      { _id: user._id },
      { session }
    );

    await session.commitTransaction();

    return res.status(200).json(
      new ApiResponse(
        200,
        true,
        user.role === "seller"
          ? "Seller account and all related data deleted successfully"
          : "User deleted successfully"
      )
    );
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()

  return res
    .status(201)
    .json(
      new ApiResponse(201, products, "Products fetched successfully")
    )
})

const deleteSellerStore = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const { id } = req.params;

    if (!id) {
      throw new ApiError(400, "Store ID is required")
    }

    const store = await Store.findById(id).session(session)

    if (!store) {
      throw new ApiError(404, "Store not found");
    }

    const application = await SellerApplication.findOne({ 'user': store.owner }).session(session);

    if (!application) {
      throw new ApiError(404, "Seller Application not found")
    }

    await Product.deleteMany(
      { store: store._id },
      { session }
    );

    const deletedStore = await Store.findByIdAndDelete(id, { session })

    if (!deletedStore) {
      throw new ApiError(500, "Something went wrong while deleting store")
    }

    await SellerApplication.findByIdAndDelete(application._id, { session })

    const updatedUser = await User.findByIdAndUpdate(
      store.owner,
      {
        role: "customer"
      },
      {
        returnDocument: "after",
        session
      }
    )

    if (!updatedUser) {
      throw new ApiError(404, "User not found");
    }

    await session.commitTransaction()

    return res
      .status(201)
      .json(
        new ApiResponse(201, true, "seller deleted successfully")
      )
  } catch (error) {
    await session.abortTransaction()
    throw error;
  } finally {
    await session.endSession()
  }

})

export { getDashboardStats, getSellers, getUsers, getUserDetail, suspendUser, unSuspendUser, deleteUser, getSellerDetail, getAllProducts, deleteSellerStore }