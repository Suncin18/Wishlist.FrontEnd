import { LogOut } from 'lucide-react';

interface NavbarProps {
  onLogout: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
  return (
    <nav className="bg-dark-subtle navbar px-4 py-3 mt-3 mx-3">
      <div className="font-bold">
        <span>DropWish MVP</span>
      </div>
      <button onClick={onLogout} className="flex items-center btn btn-secondary">
        <LogOut size={18} />
        <span>Salir</span>
      </button>
    </nav>
  );
}