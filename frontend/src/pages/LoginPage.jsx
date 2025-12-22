import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Car } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import toast from 'react-hot-toast';

export const LoginPage = () => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Bienvenue !', {
        style: {
          borderRadius: '12px',
          background: '#10b981',
          color: '#fff',
        },
      });
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Échec de connexion';
      const validationErrors = error.response?.data?.errors || {};
      
      setErrors(validationErrors);
      toast.error(errorMessage, {
        style: {
          borderRadius: '12px',
          background: '#ef4444',
          color: '#fff',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-800 via-slate-900 to-black">
      {/* Left Column - Professional Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-800 via-slate-900 to-black p-12 flex-col justify-center items-start text-white relative overflow-hidden"
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-xl">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120, damping: 12 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="relative w-20 h-20 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl border border-white/30 group"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Car className="w-10 h-10 text-white relative z-10" />
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-white">
                  Gestionnaire de Flotte
                </h1>
                <p className="text-slate-300 text-sm mt-1 font-medium">Système Professionnel</p>
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-24 bg-gradient-to-b from-white/60 via-white/30 to-transparent rounded-full" />
              <h2 className="text-3xl font-bold mb-4 leading-tight">
                Gérez votre flotte automobile en toute simplicité
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Une solution complète pour superviser vos véhicules, planifier les maintenances
                et optimiser les coûts de votre flotte automobile.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4 mt-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                whileHover={{ x: 8, scale: 1.02 }}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 group cursor-pointer transition-all hover:bg-white/10 hover:border-white/30"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-slate-200 text-base">Suivi en temps réel de tous vos véhicules</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                whileHover={{ x: 8, scale: 1.02 }}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 group cursor-pointer transition-all hover:bg-white/10 hover:border-white/30"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-slate-200 text-base">Gestion intelligente des maintenances</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
                whileHover={{ x: 8, scale: 1.02 }}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 group cursor-pointer transition-all hover:bg-white/10 hover:border-white/30"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-slate-200 text-base">Analyse des coûts et rapports détaillés</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                whileHover={{ x: 8, scale: 1.02 }}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 group cursor-pointer transition-all hover:bg-white/10 hover:border-white/30"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-slate-200 text-base">Interface moderne et intuitive</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Column - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-black">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="w-full max-w-md relative z-10"
        >
          {/* Mobile Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 120, damping: 12 }}
            className="lg:hidden mb-8 text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl border border-white/30">
                <Car className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Gestionnaire de Flotte
            </h1>
            <p className="text-slate-300 font-medium">
              Système Professionnel de Gestion
            </p>
          </motion.div>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
            whileHover={{ scale: 1.01 }}
            className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 lg:p-10 border border-white/20 relative overflow-hidden hover:border-white/30 transition-all duration-500"
          >
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/60 via-white/30 to-transparent" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl opacity-30" />
            
            <div className="mb-8 relative">
              <h2 className="text-3xl font-bold text-white mb-2">
                Bienvenue
              </h2>
              <p className="text-slate-300">Connectez-vous pour accéder à votre tableau de bord</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
              >
                <Input
                  label="Adresse Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={Mail}
                  placeholder="admin@example.com"
                  error={errors.email?.[0]}
                  variant="dark"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
              >
                <Input
                  label="Mot de passe"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={Lock}
                  placeholder="••••••••"
                  error={errors.password?.[0]}
                  variant="dark"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  type="submit"
                  loading={loading}
                  className="w-full bg-gradient-to-r from-white/25 via-white/15 to-white/10 hover:from-white/40 hover:via-white/30 hover:to-white/20 text-white font-bold py-4 px-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden group border border-white/40 hover:border-white/60"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">Se Connecter</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                </Button>
              </motion.div>
            </form>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
              className="text-center text-slate-300/80 mt-8 text-sm"
            >
              <p>
                © 2024 Gestionnaire de Flotte. Tous droits réservés.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
