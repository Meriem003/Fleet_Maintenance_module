import { LogOut, Car } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AlertsBadge } from '../features/AlertsBadge';
import toast from 'react-hot-toast';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Déconnexion réussie');
      navigate('/login');
    } catch (error) {
      toast.error('Échec de la déconnexion');
    }
  };

  return (
    <header className="bg-white border-b border-gray-300 shadow-sm sticky top-0 z-30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group transition-all hover:opacity-80"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 group-hover:text-slate-700 transition-colors">Gestionnaire de Flotte</h1>
              <p className="text-xs text-gray-600 font-medium group-hover:text-slate-500 transition-colors">Système Professionnel</p>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <AlertsBadge />
            
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-slate-100 rounded-lg transition-colors border border-gray-300 hover:border-slate-400"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
