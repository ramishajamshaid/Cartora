import dns from "dns";

dns.setServers([
    "8.8.8.8",
    "1.1.1.1"
]);
import mongoose from "mongoose";
import { User } from "./models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);

const existingAdmin = await User.findOne({
    email: "admin@cartora.com"
});

if (existingAdmin) {
    console.log("Admin already exists");
    process.exit();
}

await User.create({
    fullName: "Cartora Admin",
    username: "admin",
    email: "admin@cartora.com",
    password: "AdminPassword123",
    role: "admin"
});

console.log("Admin created successfully");

process.exit();