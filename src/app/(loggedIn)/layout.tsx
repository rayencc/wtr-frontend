'use client';

import Sidebar from "../../components/dashbord/Sidebar";
import TopBar from "../../components/dashbord/TopBar";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopBar />
      {/* Main Content Area */}
      <div className="flex h-screen">
        {/* Sidebar - Fixed Left */}
             <div className="w-64 fixed left-0 top-16 h-full bg-black text-white z-40">
             <Sidebar />
        </div>
        {/* Page Content */}
        <main className="flex-1 ml-64 p-6 bg-gray-100 flex items-center justify-center max-w-screen-xl mx-auto">
          {children}
        </main>
      </div>
    </>
  );
}

