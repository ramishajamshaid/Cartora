import {
    Smartphone,
    Shirt,
    Sparkles,
    Home,
    Dumbbell,
} from "lucide-react";

export const CATEGORIES = [
    {
        value: "electronics",
        label: "Electronics",
        slug: "electronics",
        icon: Smartphone,
        subcategories: [
            "phones",
            "laptops",
            "tablets",
            "headphones",
            "cameras",
            "accessories",
        ],
    },
    {
        value: "fashion",
        label: "Fashion",
        slug: "fashion",
        icon: Shirt,
        subcategories: [
            "men",
            "women",
            "clothing",
            "shoes",
            "bags",
            "accessories",
        ],
    },
    {
        value: "beauty",
        label: "Beauty & Care",
        slug: "beauty",
        icon: Sparkles,
        subcategories: [
            "makeup",
            "skincare",
            "haircare",
            "fragrance",
            "personal-care",
        ],
    },
    {
        value: "home-living",
        label: "Home & Living",
        slug: "home-living",
        icon: Home,
        subcategories: [
            "home-decor",
            "furniture",
            "lighting",
            "kitchen",
            "bedding",
            "storage",
        ],
    },
    {
        value: "sports",
        label: "Sports & Fitness",
        slug: "sports",
        icon: Dumbbell,
        subcategories: [
            "fitness",
            "sports-equipment",
            "outdoor",
            "activewear",
            "sports-accessories",
        ],
    },
];