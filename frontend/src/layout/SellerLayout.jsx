import React from "react";
import { Outlet } from "react-router-dom";
import SellerSidebar from "../components/seller/SellerSidebar";
import SellerHeader from "../components/seller/SellerHeader";
import SellerBottomNav from "../components/seller/SellerBottomNav";

function SellerLayout() {
    return (
        <div className="flex h-screen w-full overflow-hidden">
            {/* Desktop Sidebar */}
            <SellerSidebar />

            <div className="flex min-w-0 min-h-0 flex-1 flex-col">
                <SellerHeader />

                <main className="mt-16 min-h-0 flex-1 overflow-y-auto p-4 pb-20 lg:pb-4">
                    <Outlet />
                </main>
            </div>

            {/* Mobile Bottom Navigation */}
            <SellerBottomNav />
        </div>
    );
}

export default SellerLayout;