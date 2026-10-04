import { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
    UserRound,
    Mail,
    Phone,
    MapPin,
    Package,
    Heart,
    ShoppingBag,
    Store,
    ArrowRight,
    Pencil,
    ReceiptText,
    KeyRound,
    LockKeyhole,
} from "lucide-react";
import { AuthContext } from "../../context/auth/AuthContext";
import ProfilePictureModal from "../../components/profileModals/ProfilePictureModal";
import api from "../../api/api";


const ProfilePage = () => {
    const { user, setUser, isLoading } = useContext(AuthContext)
    const [isPictureModalOpen, setIsPictureModalOpen] = useState(false)

    const isSeller = user?.role === "seller";

    const [sellerApplication, setSellerApplication] = useState(null);
    const [isApplicationLoading, setIsApplicationLoading] = useState(true);

    useEffect(() => {
        const getApplication = async () => {
            try {
                const res = await api.get("/seller-application/my-application");

                if (res.data?.success) {
                    setSellerApplication(res.data.data);
                }
            } catch (error) {
                // 404 means user has no application
                setSellerApplication(null);
            } finally {
                setIsApplicationLoading(false);
            }
        };

        if (user && user.role !== "seller") {
            getApplication();
        } else {
            setIsApplicationLoading(false);
        }
    }, [user]);

    return (
        <main className="min-h-screen bg-background mt-34">
            {isLoading ? (
                <div className="min-h-125 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-accent-light border-t-primary rounded-full animate-spin"></div>
                </div>
            ) : !user ? (
                <div className="min-h-125 flex flex-col items-center justify-center gap-2">
                    <LockKeyhole className="w-14 h-14 text-primary" />
                    <p className="text-gray-500">Please login to view your profile.</p>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">

                    {/* Page Heading */}
                    <div className="mb-8">
                        <h1 className="font-title text-2xl md:text-3xl font-semibold text-text-primary tracking-tight">
                            My Profile
                        </h1>
                        <p className="text-sm text-text-secondary mt-1">
                            Manage your account and personal information.
                        </p>
                    </div>

                    {/* Profile Header */}
                    <section className="bg-surface rounded-xl border border-border p-5 md:p-7 mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="w-18 h-18 shrink-0 md:w-20 md:h-20 rounded-full bg-accent-light text-primary flex items-center justify-center overflow-hidden">
                                    {user?.profile_image ? (
                                        <img
                                            src={user?.profile_image}
                                            alt={user?.username}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <UserRound size={30} />
                                    )}
                                </div>

                                <div className="flex flex-col sm:items-start items-center">
                                    <h2 className="text-lg md:text-xl font-semibold text-text-primary">
                                        {user?.username}
                                    </h2>

                                    <p className="text-sm text-text-secondary flex items-center gap-1.5 mt-1">
                                        <Mail size={14} />
                                        {user?.email}
                                    </p>

                                    <span className="inline-block mt-2 px-2.5 py-1 rounded-full bg-accent-light text-primary text-[11px] font-semibold capitalize">
                                        {user?.role}
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsPictureModalOpen(true)}
                                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container-low hover:bg-accent-light text-text-primary hover:text-primary transition-colors text-sm font-semibold cursor-pointer"
                            >
                                <Pencil size={15} />
                                Edit Profile
                            </button>
                        </div>
                    </section>

                    {/* Shopping Overview */}
                    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

                        <div className="bg-surface rounded-xl border border-border p-5 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-text-secondary uppercase tracking-wide">
                                    Orders
                                </p>
                                <p className="text-xl font-semibold text-text-primary mt-1">
                                    0
                                </p>
                            </div>

                            <div className="w-11 h-11 rounded-lg bg-accent-light text-primary flex items-center justify-center">
                                <Package size={21} />
                            </div>
                        </div>

                        <div className="bg-surface rounded-xl border border-border p-5 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-text-secondary uppercase tracking-wide">
                                    Wishlist
                                </p>
                                <p className="text-xl font-semibold text-text-primary mt-1">
                                    0
                                </p>
                            </div>

                            <div className="w-11 h-11 rounded-lg bg-accent-light text-primary flex items-center justify-center">
                                <Heart size={21} />
                            </div>
                        </div>

                        <div className="bg-surface rounded-xl border border-border p-5 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-text-secondary uppercase tracking-wide">
                                    Cart
                                </p>
                                <p className="text-xl font-semibold text-text-primary mt-1">
                                    0
                                </p>
                            </div>

                            <div className="w-11 h-11 rounded-lg bg-accent-light text-primary flex items-center justify-center">
                                <ShoppingBag size={21} />
                            </div>
                        </div>

                    </section>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* Personal Information */}
                        <section className="bg-surface rounded-xl border border-border p-5 md:p-7">

                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-text-primary">
                                        Personal Information
                                    </h2>
                                    <p className="text-xs text-text-secondary mt-1">
                                        Your account and contact details.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="flex justify-center items-center gap-1 text-primary hover:text-secondary text-xs font-semibold cursor-pointer"
                                >
                                    <Pencil size={14} />
                                    Edit
                                </button>
                            </div>

                            <div className="space-y-3">
                                <div className="flex flex-col items-center sm:flex-row gap-4">
                                    <div className="w-full bg-surface-container-low rounded-lg p-4">
                                        <p className="text-[11px] uppercase tracking-wide text-text-secondary mb-1">
                                            FullName
                                        </p>
                                        <p className="text-sm font-semibold text-text-primary">
                                            {user?.fullName}
                                        </p>
                                    </div>

                                    <div className="w-full bg-surface-container-low rounded-lg p-4">
                                        <p className="text-[11px] uppercase tracking-wide text-text-secondary mb-1">
                                            Username
                                        </p>
                                        <p className="text-sm font-semibold text-text-primary">
                                            {user?.username}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center sm:flex-row gap-4">
                                    <div className="w-full bg-surface-container-low rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Mail size={14} className="text-text-secondary" />
                                            <p className="text-[11px] uppercase tracking-wide text-text-secondary">
                                                Email
                                            </p>
                                        </div>

                                        <p className="text-sm font-semibold text-text-primary">
                                            {user?.email}
                                        </p>
                                    </div>

                                    <div className="w-full bg-surface-container-low rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Phone size={14} className="text-text-secondary" />
                                            <p className="text-[11px] uppercase tracking-wide text-text-secondary">
                                                Phone
                                            </p>
                                        </div>

                                        <p className="text-sm font-semibold text-text-primary">
                                            {user?.phone || "Not added yet"}
                                        </p>
                                    </div>
                                </div>


                                <div className="bg-surface-container-low rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <MapPin size={14} className="text-text-secondary" />
                                        <p className="text-[11px] uppercase tracking-wide text-text-secondary">
                                            Address
                                        </p>
                                    </div>

                                    <p className="text-sm font-semibold text-text-primary">
                                        {user?.address || "Not added yet"}
                                    </p>
                                </div>

                            </div>
                        </section>

                        {/* Seller Section */}
                        <section className="bg-surface rounded-xl border border-border p-5 md:p-7">

                            {isSeller ? (
                                <>
                                    <div className="w-11 h-11 rounded-lg bg-accent-light text-primary flex items-center justify-center mb-5">
                                        <Store size={22} />
                                    </div>

                                    <span className="inline-block px-2.5 py-1 rounded-full bg-success/10 text-success text-[11px] font-semibold">
                                        Seller Account
                                    </span>

                                    <h2 className="text-xl font-semibold text-text-primary mt-3">
                                        Manage your store
                                    </h2>

                                    <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                                        Manage your products, orders, inventory and
                                        store from your seller dashboard.
                                    </p>

                                    <Link
                                        to="/seller"
                                        className="w-full mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary hover:bg-secondary text-white text-sm font-semibold transition-colors"
                                    >
                                        Seller Dashboard
                                        <ArrowRight size={16} />
                                    </Link>
                                </>
                            ): isApplicationLoading ? (
                            <div className="min-h-70 flex items-center justify-center">
                                <div className="w-7 h-7 border-4 border-accent-light border-t-primary rounded-full animate-spin"></div>
                            </div>
                            ) : sellerApplication?.status === "pending" ? (
                            <>
                                <div className="w-11 h-11 rounded-lg bg-accent-light text-primary flex items-center justify-center mb-5">
                                    <Store size={22} />
                                </div>

                                <span className="inline-block px-2.5 py-1 rounded-full bg-primary text-white text-[11px] font-semibold">
                                    Application Pending
                                </span>

                                <h2 className="text-xl font-semibold text-text-primary mt-3">
                                    Your seller application is under review
                                </h2>

                                <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                                    Your application has been submitted successfully. Our team
                                    will review it and notify you once a decision has been made.
                                </p>
                            </>
                            ) : sellerApplication?.status === "rejected" ? (
                            <>
                                <div className="w-11 h-11 rounded-lg bg-accent-light text-primary flex items-center justify-center mb-5">
                                    <Store size={22} />
                                </div>

                                <span className="inline-block px-2.5 py-1 rounded-full bg-red-100 text-red-600 text-[11px] font-semibold">
                                    Application Rejected
                                </span>

                                <h2 className="text-xl font-semibold text-text-primary mt-3">
                                    Your seller application was rejected
                                </h2>

                                <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                                    You can review your information and submit a new application.
                                </p>

                                <NavLink
                                    to="/become-seller"
                                    className="w-full mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary hover:bg-secondary text-white text-sm font-semibold transition-colors"
                                >
                                    Apply Again
                                    <ArrowRight size={16} />
                                </NavLink>
                            </>
                            ) : (
                            <>
                                <span className="inline-block px-2.5 py-1 rounded-full bg-accent-light text-primary text-[11px] font-semibold">
                                    Seller Opportunity
                                </span>

                                <h2 className="text-xl font-semibold text-text-primary mt-3">
                                    Start selling on Cartora
                                </h2>

                                <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                                    Create your own store, add products and
                                    start selling to customers on Cartora.
                                </p>

                                <div className="mt-5 space-y-3.5">

                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-accent-light text-primary flex items-center justify-center shrink-0">
                                            <Store size={16} />
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-bold text-text-primary">
                                                Create your own store
                                            </h3>
                                            <p className="text-xs text-text-secondary leading-relaxed mt-0.5">
                                                Set up your store and start selling on Cartora.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-accent-light text-primary flex items-center justify-center shrink-0">
                                            <Package size={16} />
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-bold text-text-primary">
                                                Add and manage products
                                            </h3>
                                            <p className="text-xs text-text-secondary leading-relaxed mt-0.5">
                                                Add products, manage inventory and keep your catalog updated.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-accent-light text-primary flex items-center justify-center shrink-0">
                                            <ReceiptText size={16} />
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-bold text-text-primary">
                                                Manage customer orders
                                            </h3>
                                            <p className="text-xs text-text-secondary leading-relaxed mt-0.5">
                                                Manage orders and keep track of your sales.
                                            </p>
                                        </div>
                                    </div>

                                </div>

                                <NavLink
                                    to="/become-seller"
                                    className="w-full mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary hover:bg-secondary text-white text-sm font-semibold transition-colors"
                                >
                                    Become a Seller
                                    <ArrowRight size={16} />
                                </NavLink>
                            </>
                            )}

                        </section>

                    </div>
                </div>
            )}
            <ProfilePictureModal
                isOpen={isPictureModalOpen}
                onClose={() => setIsPictureModalOpen(false)}
                currentAvatar={user?.profile_image}
                setUser={setUser}
            />
        </main>
    );
};

export default ProfilePage;