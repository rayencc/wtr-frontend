'use client';

import Sidebar from "../../components/commun/Sidebar";
import TopBar from "../../components/commun/TopBar";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Fixed TopBar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <TopBar />
      </div>
      
      <div className="flex h-screen">
        {/* Fixed Sidebar */}
        <div className="w-64 fixed left-0 top-16 h-full bg-black text-white z-40">
          <Sidebar />
        </div>
        
        {/* Scrollable Content Area */}
        <main className="flex-1 ml-64 pt-16 overflow-y-auto">
          {children}
        </main>
      </div>
    </>
  );
}
