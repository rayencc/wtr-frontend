'use client';


import { Home, Bookmark, User, Users } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="flex flex-col space-y-6 mt-4">
    <nav>
      <ul className="space-y-4">
        <li className="flex items-center gap-4 px-4 py-2">
          <Home size={20} /> <span>Home</span>
        </li>
        <li className="flex items-center gap-4 px-4 py-2">
          <User size={20} /> <span>Recommended by me</span>
        </li>
        <li className="flex items-center gap-4 px-4 py-2">
          <Users size={20} /> <span>Recommended by others</span>
        </li>
        <li className="flex items-center gap-4 px-4 py-2">
          <Bookmark size={20} /> <span>Bookmarked by me</span>
        </li>
      </ul>
      
    </nav>
  </div>
  
    
  );
}
