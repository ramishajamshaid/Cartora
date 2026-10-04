import { Bell, Search } from "lucide-react";

const AdminHeader = () => {
  return (
    <header className="fixed left-0 md:left-64 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-white px-6">
      
      {/* Page Title / Breadcrumb */}
      <div>
        <p className="text-[16px] font-medium font-title text-[#171717]">
          Admin Dashboard
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">
        
        {/* Search */}
        <div className="relative hidden w-72 md:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg bg-[#F6F3F2] py-2 pl-10 pr-4 text-sm text-[#171717] outline-none placeholder:text-text-secondary focus:ring-1 focus:ring-[#954518]"
          />
        </div>

        {/* Notifications */}
        <button
          type="button"
          className="relative rounded-full p-2 text-text-secondary transition-colors hover:bg-[#F6F3F2] hover:text-[#171717]"
        >
          <Bell size={21} strokeWidth={1.8} />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#954518]" />
        </button>

        {/* Admin */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#954518] text-sm font-semibold text-white">
            A
          </div>

          <div className="hidden flex-col md:flex">
            <span className="text-sm font-semibold text-[#171717]">
              Admin
            </span>
            <span className="text-xs text-text-secondary">
              Administrator
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;