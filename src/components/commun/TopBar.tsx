'use client';

import { Bell, UserCircle, Menu } from 'lucide-react'; // Added Menu icon
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Sidebar from '../commun/Sidebar'; // Import Sidebar

export default function TopBar() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      {/* Left: Logo and Sidebar Trigger */}
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-black">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-black text-white">
            <Sidebar />
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <div className="text-2xl font-bold">Planfinder</div>
      </div>

      {/* Right: Notifications and Profile */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell size={20} />
        </Button>
        <Button variant="ghost" size="icon">
          <UserCircle size={24} />
        </Button>
      </div>
    </header>
  );
}
