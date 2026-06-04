import React, { useState } from 'react';
import { Mail, Lock, User, ShieldCheck, ArrowLeft, Building, ChevronRight, Check } from 'lucide-react';
import { ActiveScreen, UserSession } from '../types';
import { APP_LOGO_URL } from '../data';

interface AuthViewProps {
  onNavigate: (screen: ActiveScreen) => void;
  onLoginSuccess: (session: Partial<UserSession>) => void;
}

export const LoginView: React.FC<AuthViewProps> = ({ onNavigate, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Input Email dan Kata Sandi diperlukan.');
      return;
    }
    setLoading(true);
    // Simulate auth check helper
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({
        fullName: 'Bahruddin Yusuf',
        email: email,
        isLoggedIn: true,
        role: 'Petambak',
        package: 'Petambak Skala Menengah Atas'
      });
    }, 1200);
  };

  const fillDemoCreds = () => {
    setEmail('petambak.sukses@shrimpfy.id');
    setPassword('UdangVaname2026!');
    setErrorMessage('');
  };

  return (
    <div id="login-container" className="min-h-screen relative flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-transparent shrimp-pattern font-sans select-none">
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 animate-fadeIn">
        <button
          id="login-back-to-landing"
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 text-xs font-medium transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Beranda
        </button>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center flex-col items-center gap-2">
          <img 
            id="login-logo"
            src={APP_LOGO_URL} 
            alt="Shrimpfy AI Logo" 
            className="w-16 h-16 rounded-2xl bg-white/10 p-1 shadow-lg border border-white/20 cursor-pointer"
            onClick={() => onNavigate('landing')}
            referrerPolicy="no-referrer"
          />
          <h2 className="text-2xl font-extrabold text-white tracking-tight text-center">
            Masuk ke Akun Shrimpfy
          </h2>
          <p className="text-xs text-white/60">
            Akses dashboard monitoring udang AI pintar Anda
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="glass-card py-8 px-4 sm:rounded-2xl sm:px-10 space-y-6">
          <form id="login-form" onSubmit={handleLogin} className="space-y-4">
            {errorMessage && (
              <div id="login-error" className="p-3 text-xs text-red-200 bg-red-900/30 rounded-xl border border-red-500/30 font-medium">
                {errorMessage}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1">
                Alamat Email
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="login-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="block w-full pl-9 pr-3 py-2 text-xs border border-white/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white/5 text-white placeholder-white/30"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1">
                Kata Sandi
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="login-password-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-9 pr-3 py-2 text-xs border border-white/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white/5 text-white placeholder-white/30"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-500 border-white/20 rounded bg-white/5 focus:ring-0"
                  defaultChecked
                />
                <label htmlFor="remember-me" className="ml-2 block text-white/60">
                  Ingat Saya
                </label>
              </div>
              <button 
                type="button" 
                className="font-medium text-primary hover:text-primary-dark"
                onClick={() => alert("Fitur pemulihan kata sandi dikirim khusus via email administrasi mitra.")}
              >
                Lupa Sandi?
              </button>
            </div>

            <button
              id="login-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-white/10 text-xs font-semibold rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none transition shadow-lg shadow-primary/20"
            >
              {loading ? 'Memverifikasi...' : 'Masuk Aplikasi'}
            </button>
          </form>

          <div className="relative flex items-center justify-center my-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
            <span className="relative px-3 bg-white/10 rounded-full border border-white/10 text-[10px] text-white/50 uppercase font-mono tracking-wider">Demo / Sandbox</span>
          </div>

          <button
            id="login-demo-helper"
            onClick={fillDemoCreds}
            className="w-full py-2.5 px-4 rounded-lg bg-primary/20 text-primary text-xs font-bold border border-primary/30 hover:bg-primary/30 transition text-center"
          >
            Gunakan Akun Simulasi Cepat
          </button>

          <div className="text-center">
            <p className="text-xs text-white/55">
              Belum terdaftar?{' '}
              <button
                id="login-register-link"
                onClick={() => onNavigate('register')}
                className="font-bold text-primary hover:text-primary-dark"
              >
                Gabung Shrimpfy AI Sekarang
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RegisterView: React.FC<AuthViewProps> = ({ onNavigate, onLoginSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreement, setAgreement] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Compute password score helper
  const getPasswordStrength = () => {
    if (!password) return { level: 'Kosong', score: 0, color: 'bg-white/10', text: 'Masukkan kata sandi' };
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    switch (score) {
      case 1:
        return { level: 'Sangat Lemah', score: 25, color: 'bg-red-500', text: 'Lemah (Min 8 karakter, huruf kapital, angka & simbol)' };
      case 2:
        return { level: 'Sedang', score: 50, color: 'bg-yellow-500', text: 'Cukup (Saran tambahkan karakter unik)' };
      case 3:
        return { level: 'Kuat', score: 75, color: 'bg-emerald-500', text: 'Kuat & Aman' };
      case 4:
        return { level: 'Sangat Kuat', score: 100, color: 'bg-cyan-500', text: 'Sangat Kuat (Sempurna)' };
      default:
        return { level: 'Kurang', score: 10, color: 'bg-red-500', text: 'Terlalu pendek' };
    }
  };

  const strength = getPasswordStrength();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMessage('Semua baris isian formulir wajib dipenuhi.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Kata sandi konfirmasi tidak cocok.');
      return;
    }
    if (!agreement) {
      setErrorMessage('Anda wajib menyetujui syarat persetujuan privasi.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Navigate to choose-account role selector
      onLoginSuccess({
        fullName: fullName,
        email: email,
        isLoggedIn: false // keep false until role selected
      });
      onNavigate('choose-account');
    }, 1200);
  };

  return (
    <div id="register-container" className="min-h-screen relative flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-transparent shrimp-pattern font-sans select-none">
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 animate-fadeIn">
        <button
          id="register-back-to-landing"
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 text-xs font-medium transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Beranda
        </button>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center flex-col items-center gap-2">
          <img 
            id="register-logo"
            src={APP_LOGO_URL} 
            alt="Shrimpfy Logo" 
            className="w-16 h-16 rounded-2xl bg-white/10 p-1 border border-white/20 cursor-pointer shadow-lg"
            onClick={() => onNavigate('landing')}
            referrerPolicy="no-referrer"
          />
          <h2 className="text-2xl font-extrabold text-white tracking-tight text-center">
            Pendaftaran Kemitraan
          </h2>
          <p className="text-xs text-white/60">
            Dapatkan teknologi monitoring data kolam pintar Anda gratis
          </p>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="glass-card py-8 px-4 sm:rounded-2xl sm:px-10 space-y-6">
          <form id="register-form" onSubmit={handleRegister} className="space-y-4">
            {errorMessage && (
              <div id="register-error" className="p-3 text-xs text-red-200 bg-red-900/30 rounded-xl border border-red-500/30 font-medium">
                {errorMessage}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1">
                Nama Lengkap / Nama Farm
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                  <User className="h-4 w-4" />
                </div>
                <input
                  id="register-name-input"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Contoh: Bahruddin Yusuf"
                  className="block w-full pl-9 pr-3 py-2 text-xs border border-white/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white/5 text-white placeholder-white/30"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1">
                Alamat Email Aktif
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="register-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="bahruddin@gmail.com"
                  className="block w-full pl-9 pr-3 py-2 text-xs border border-white/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white/5 text-white placeholder-white/30"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1">
                Kata Sandi Baru
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="register-password-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Buat sandi minimal 8 karakter"
                  className="block w-full pl-9 pr-3 py-2 text-xs border border-white/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white/5 text-white placeholder-white/30"
                  required
                />
              </div>
              
              {/* Strength Meter */}
              {password && (
                <div className="mt-2 space-y-1">
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full ${strength.color} transition-all duration-300`} style={{ width: `${strength.score}%` }}></div>
                  </div>
                  <p className="text-[10px] text-white/60 font-mono italic">{strength.text}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1">
                Konfirmasi Kata Sandi
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="register-confirm-password-input"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Masukkan ulang kata sandi"
                  className="block w-full pl-9 pr-3 py-2 text-xs border border-white/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white/5 text-white placeholder-white/30"
                  required
                />
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreement"
                  type="checkbox"
                  checked={agreement}
                  onChange={(e) => setAgreement(e.target.checked)}
                  className="h-4 w-4 text-primary border-white/20 rounded bg-white/5 focus:ring-0"
                  required
                />
              </div>
              <div className="ml-3 text-xs">
                <label htmlFor="agreement" className="text-white/60 leading-normal">
                  Saya setuju terhadap <span className="text-primary font-bold hover:underline cursor-pointer">Syarat & Layanan Privasi</span> pengolahan big data budidaya Indonesia oleh Shrimpfy.
                </label>
              </div>
            </div>

            <button
              id="register-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-white/10 text-xs font-semibold rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none transition shadow-lg shadow-primary/20"
            >
              {loading ? 'Mendaftarkan Akun...' : 'Daftar Sekarang'}
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-white/55">
              Sudah memiliki akun?{' '}
              <button
                id="register-login-link"
                onClick={() => onNavigate('login')}
                className="font-bold text-primary hover:text-primary-dark"
              >
                Langsung Masuk Di Sini
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ChooseAccountProps extends AuthViewProps {
  session: UserSession;
}

export const ChooseAccountView: React.FC<ChooseAccountProps> = ({ onNavigate, onLoginSuccess, session }) => {
  const roles = [
    { 
      id: 'Nelayan' as const, 
      title: 'Nelayan Tangkap', 
      desc: 'Melaut mencari tangkapan udang segar alami di samudra dengan skala perahu kecil-menengah.', 
      icon: <Check className="w-5 h-5 text-primary" /> 
    },
    { 
      id: 'Petambak' as const, 
      title: 'Petambak Vaname', 
      desc: 'Mengelola tambak udang air payau sistem intensif, semi-intensif, maupun tradisional.', 
      icon: <Building className="w-5 h-5 text-primary" /> 
    },
    { 
      id: 'Industri' as const, 
      title: 'Industri / Korporat', 
      desc: 'Perusahaan skala besar eksportir udang, unit pengolah makanan laut, pembeku (cold storage).', 
      icon: <ShieldCheck className="w-5 h-5 text-primary" /> 
    },
    { 
      id: 'Lainnya' as const, 
      title: 'Mitra Logistik / Lainnya', 
      desc: 'Tengkulak pengepul wilayah, penyedia pakan, distributor, akademisi riset, atau kolektor pasar.', 
      icon: <ChevronRight className="w-5 h-5 text-primary" /> 
    },
  ];

  const selectRole = (role: 'Nelayan' | 'Petambak' | 'Industri' | 'Lainnya') => {
    onLoginSuccess({
      role: role,
      isLoggedIn: true // successfully complete full registration session flow!
    });
    // Redirect to newly registered pricing plan picker or straight to dashboard
    onNavigate('pricing');
  };

  return (
    <div id="choose-role-container" className="min-h-screen py-16 px-4 bg-transparent shrimp-pattern flex flex-col justify-center items-center font-sans select-none">
      <div className="max-w-xl w-full text-center space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-mono uppercase tracking-widest text-primary font-bold">Selamat bergabung, {session.fullName || 'Rekan Mitra'}</p>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Bagaimana Anda Menggunakan Shrimpfy AI?
          </h2>
          <p className="text-xs text-white/60 max-w-sm mx-auto">
            Sesuaikan konfigurasi algoritma rekomendasi pasar serta estimasi kualifikasi mutu berdasarkan segmen bisnis Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          {roles.map((r) => (
            <div
              key={r.id}
              id={`role-card-${r.id}`}
              onClick={() => selectRole(r.id)}
              className="p-5 rounded-2xl glass-card hover:bg-white/15 cursor-pointer transition-all duration-300 shadow-xl flex flex-col justify-between hover:translate-y-[-2px] border border-white/20"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  {r.icon}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-tight">{r.title}</h3>
                  <p className="text-[11px] text-white/70 leading-normal mt-1">{r.desc}</p>
                </div>
              </div>
              <div className="flex items-center justify-end text-primary font-bold text-[10px] uppercase tracking-wider mt-4">
                Pilih Peran <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          ))}
        </div>

        <button
          id="back-to-landing-role"
          onClick={() => onNavigate('landing')}
          className="inline-flex items-center gap-2 text-xs font-medium text-white/60 hover:text-white transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Kembali Ke Menu Utama
        </button>
      </div>
    </div>
  );
};
