import { useState, useEffect } from 'react';
import { 
  Home, 
  LineChart, 
  Camera, 
  Coins, 
  User, 
  LogOut, 
  Award, 
  TrendingUp, 
  Bell, 
  Sparkles, 
  ArrowRight, 
  Activity, 
  BookOpen, 
  ShieldCheck, 
  Droplets,
  HelpCircle
} from 'lucide-react';
import { LandingView } from './components/LandingView';
import { LoginView, RegisterView, ChooseAccountView } from './components/AuthViews';
import { PricingView } from './components/PricingView';
import { CameraScan } from './components/CameraScan';
import { MarketView } from './components/MarketView';
import { AnalysisView } from './components/AnalysisView';
import { ActiveScreen, DashboardTab, UserSession, ScanResult } from './types';
import { APP_LOGO_URL } from './data';

// Helper: read from localStorage with fallback
function readLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw !== null) return JSON.parse(raw) as T;
  } catch {}
  return fallback;
}

export default function App() {
  // Navigation & User Session States — dipersist ke localStorage
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>(
    () => readLS<ActiveScreen>('shrimpfy_screen', 'landing')
  );
  const [dashboardTab, setDashboardTab] = useState<DashboardTab>(
    () => readLS<DashboardTab>('shrimpfy_tab', 'home')
  );
  
  const [session, setSession] = useState<UserSession>(
    () => readLS<UserSession>('shrimpfy_session', {
      fullName: '',
      email: '',
      role: '',
      package: 'Free',
      billingMode: 'monthly',
      isLoggedIn: false
    })
  );

  // Client-side Logbook State — dipersist ke localStorage
  const defaultLogs: ScanResult[] = [
    {
      timestamp: '10.24.15, 05/06/2026',
      freshnessScore: 94,
      sizeClass: 'Size 40',
      estimatedWeightGrams: 25.4,
      diseaseDetected: 'Negatif',
      healthDiagnosis: 'Kulit bersih transparan mengkilap, ruas organ utuh.',
      marketPricePerKg: 58000,
      status: 'Sangat Segar',
      detectionType: 'size'
    },
    {
      timestamp: '08.45.10, 05/06/2026',
      freshnessScore: 81,
      sizeClass: 'Size 60',
      estimatedWeightGrams: 16.6,
      diseaseDetected: 'Negatif',
      healthDiagnosis: 'Udang aktif normal segar, usus penuh berisi pakan.',
      marketPricePerKg: 43000,
      status: 'Segar',
      detectionType: 'disease'
    }
  ];
  const [scanLogs, setScanLogs] = useState<ScanResult[]>(
    () => readLS<ScanResult[]>('shrimpfy_logs', defaultLogs)
  );

  // Simpan ke localStorage setiap kali state berubah
  useEffect(() => {
    localStorage.setItem('shrimpfy_screen', JSON.stringify(activeScreen));
  }, [activeScreen]);

  useEffect(() => {
    localStorage.setItem('shrimpfy_tab', JSON.stringify(dashboardTab));
  }, [dashboardTab]);

  useEffect(() => {
    localStorage.setItem('shrimpfy_session', JSON.stringify(session));
  }, [session]);

  useEffect(() => {
    localStorage.setItem('shrimpfy_logs', JSON.stringify(scanLogs));
  }, [scanLogs]);

  const handleUpdateSession = (updates: Partial<UserSession>) => {
    setSession((prev) => ({ ...prev, ...updates }));
  };

  const handleLogout = () => {
    const emptySession: UserSession = {
      fullName: '',
      email: '',
      role: '',
      package: 'Free',
      billingMode: 'monthly',
      isLoggedIn: false
    };
    setSession(emptySession);
    localStorage.removeItem('shrimpfy_session');
    localStorage.removeItem('shrimpfy_screen');
    localStorage.removeItem('shrimpfy_tab');
    setActiveScreen('landing');
  };

  const handleAddScanLog = (newScan: ScanResult) => {
    setScanLogs((prev) => [newScan, ...prev]);
  };

  const handleClearLogs = () => {
    setScanLogs([]);
  };

  // Render Screens Router
  if (activeScreen === 'landing') {
    return <LandingView onNavigate={setActiveScreen} session={session} onLogout={handleLogout} />;
  }

  if (activeScreen === 'login') {
    return (
      <LoginView 
        onNavigate={setActiveScreen} 
        onLoginSuccess={handleUpdateSession} 
      />
    );
  }

  if (activeScreen === 'register') {
    return (
      <RegisterView 
        onNavigate={setActiveScreen} 
        onLoginSuccess={handleUpdateSession} 
      />
    );
  }

  if (activeScreen === 'choose-account') {
    return (
      <ChooseAccountView 
        onNavigate={setActiveScreen} 
        onLoginSuccess={handleUpdateSession} 
        session={session} 
      />
    );
  }

  if (activeScreen === 'pricing') {
    return (
      <PricingView 
        onNavigate={setActiveScreen} 
        session={session} 
        onUpdateSession={handleUpdateSession} 
      />
    );
  }

  // Dashboard Master Workspace Layout (Private Panel)
  return (
    <div id="dashboard-layout" className="min-h-screen bg-transparent text-white font-sans shrimp-pattern flex flex-col justify-between">
      {/* Dashboard Top Header Navigation */}
      <header id="dashboard-header" className="bg-white/10 border-b border-white/10 px-4 py-3 sticky top-0 z-40 shadow-lg backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              id="dash-logo"
              src={APP_LOGO_URL} 
              alt="Shrimpfy AI Logo animate-pulse" 
              className="w-9 h-9 object-contain rounded-lg border border-white/15 bg-white/10 p-1 cursor-pointer"
              onClick={() => setActiveScreen('landing')}
              referrerPolicy="no-referrer"
            />
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-white tracking-tight">Shrimpfy Workspace</h2>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-indigo-300 border border-white/10 font-mono uppercase tracking-widest leading-none">
                  AI Active
                </span>
              </div>
              <p className="text-[10px] text-white/60 font-medium">Pengguna: {session.fullName || 'Bahruddin Yusuf'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden md:flex flex-col items-end text-right">
              <span className="text-[9px] uppercase font-mono tracking-wider font-extrabold text-pink-300 bg-white/10 border border-white/10 px-2 py-0.5 rounded-full">
                {session.package} Plan
              </span>
              <p className="text-[10px] text-white/50 mt-0.5 font-mono">Siklus: {session.billingMode === 'monthly' ? 'Bulanan' : 'Tahunan'}</p>
            </div>

            <button
              id="dash-logout-btn"
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-white/50 hover:text-red-400 hover:bg-white/5 transition cursor-pointer"
              title="Keluar Akun"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Core View Area Content */}
      <main id="dashboard-main" className="max-w-7xl w-full mx-auto p-4 sm:p-6 flex-1">
        
        {/* Tab 1: Dashboard Home (Rangkuman) */}
        {dashboardTab === 'home' && (
          <div id="home-tab-view" className="space-y-6 select-none animate-fadeIn">
            {/* Greeting Card Badge Banner */}
            <div className="bg-white/10 backdrop-blur-md text-white p-6 rounded-3xl border border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
              <div className="space-y-2 z-10 text-left">
                <span className="text-[9px] font-extrabold tracking-widest text-indigo-300 font-mono uppercase block bg-white/10 border border-white/10 px-2.5 py-1 rounded-md w-fit">INFORMASI KELAS BISNIS</span>
                <h3 className="text-xl font-extrabold tracking-tight md:text-2xl">Selamat Datang di Shrimpfy AI</h3>
                <p className="text-xs text-white/70 max-w-lg leading-relaxed">
                  Semua sistem visualisasi computer vision udang vaname siap beroperasi. Pantau pertumbuhan berkala kolam Anda secara presisi untuk menjamin penawaran terbaik.
                </p>
              </div>
              <div className="flex gap-2 z-10 w-full sm:w-auto">
                <button
                  id="home-action-scan"
                  onClick={() => setDashboardTab('scan')}
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white border border-white/10 rounded-xl text-xs font-bold transition shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Uji Deteksi AI Udang
                </button>
                <button
                  id="home-action-pricing"
                  onClick={() => setActiveScreen('pricing')}
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5" /> Upgrade Lisensi
                </button>
              </div>
              {/* Absolut subtle watermark image decoration background */}
              <div className="absolute right-0 bottom-0 opacity-5 font-bold uppercase text-[12vw] font-mono tracking-tighter leading-none pointer-events-none select-none">
                AI UDANG
              </div>
            </div>

            {/* Sub content panel items */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Side: Recent scan summary overview list */}
              <div className="md:col-span-8 glass-card p-5 rounded-2xl border border-white/10 space-y-4">
                <h4 className="text-xs font-extrabold text-white border-b border-white/10 pb-2 flex items-center justify-between">
                  <span>Hasil Ringkasan Sampel Terbaru</span>
                  <button 
                    onClick={() => setDashboardTab('scan')} 
                    className="text-[10px] text-indigo-300 font-bold hover:text-indigo-200 cursor-pointer"
                  >
                    Buka Riwayat Lengkap →
                  </button>
                </h4>
                
                <div className="space-y-3">
                  {scanLogs.length > 0 ? (
                    scanLogs.slice(0, 3).map((log, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-left">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg border flex items-center justify-center font-bold font-mono text-xs ${
                            log.detectionType === 'disease'
                              ? 'bg-orange-500/10 border-orange-500/30 text-orange-400'
                              : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
                          }`}>
                            {log.detectionType === 'disease' ? 'P' : 'S'}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">
                              {log.detectionType === 'disease' ? 'Deteksi Penyakit AI' : `Deteksi Size: ${log.sizeClass}`}
                            </p>
                            <p className="text-[9px] text-white/50 font-mono mt-0.5">
                              {log.detectionType === 'disease'
                                ? (log.diseaseDetected === 'Negatif' ? 'Hasil: Sehat (Bebas Patogen)' : `Penyakit: ${log.diseaseDetected}`)
                                : `${log.sizeClass} — ${log.estimatedWeightGrams} gr (${log.status})`
                              }
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-black text-indigo-300">Rp{log.marketPricePerKg.toLocaleString('id-ID')}/Kg</p>
                          <span className={`text-[9px] font-bold font-mono ${
                            log.diseaseDetected === 'Negatif' ? 'text-emerald-400' : 'text-orange-400'
                          }`}>{log.diseaseDetected === 'Negatif' ? 'Sehat' : 'Terdeteksi'}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-white/50 text-center py-6">Belum ada aktivitas pemindaian. Lakukan scan pertama Anda di menu Kamera AI.</p>
                  )}
                </div>
              </div>

              {/* Right Side: Localized bulletins blog panel */}
              <div className="md:col-span-4 glass-card p-5 rounded-2xl border border-white/10 space-y-4 text-left">
                <h4 className="text-xs font-extrabold text-white border-b border-white/10 pb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-300" /> Wawasan Kemitraan Tambak
                </h4>

                <div className="space-y-3">
                  <div className="space-y-1 block hover:bg-white/5 p-2 rounded-lg transition cursor-pointer">
                    <span className="text-[9px] uppercase font-bold text-[#db2777] font-mono">Agro-Teknologi</span>
                    <h5 className="text-[11px] font-bold text-white leading-snug">Menjaga Salinitas Air Kolam di Musim Pancaroba Tropis</h5>
                    <p className="text-[10px] text-white/60 leading-normal">Pelajari cara mengontrol derajat keasinan air tambak agar udang tumbuh optimum...</p>
                  </div>

                  <div className="space-y-1 block hover:bg-white/5 p-2 rounded-lg transition cursor-pointer border-t border-white/10 pt-2">
                    <span className="text-[9px] uppercase font-bold text-[#db2777] font-mono">Analisis Harga</span>
                    <h5 className="text-[11px] font-bold text-white leading-snug">Permintaan Ekspor Hasil Laut Vaname ke Jepang Naik 4.8%</h5>
                    <p className="text-[10px] text-white/60 leading-normal">Statistik ekspor menunjukkan peningkatan apresiasi harga untuk udang Size 40...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Analysis (Performa Monitor) */}
        {dashboardTab === 'analysis' && <AnalysisView />}

        {/* Tab 3: Scan (Interactive Camera Scan) */}
        {dashboardTab === 'scan' && (
          <CameraScan 
            session={session} 
            onAddLog={handleAddScanLog} 
            logs={scanLogs} 
            onClearLogs={handleClearLogs} 
          />
        )}

        {/* Tab 4: Transactions (Simulasi Panen & Tengkulak) */}
        {dashboardTab === 'transactions' && <MarketView />}

        {/* Tab 5: Profile (Settings Panel) */}
        {dashboardTab === 'profile' && (
          <div id="profile-tab-view" className="max-w-xl mx-auto glass-card p-6 rounded-2xl space-y-6 select-none animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-center gap-4 border-b border-white/10 pb-4">
              <div className="w-14 h-14 rounded-full bg-indigo-600 text-white font-extrabold flex items-center justify-center text-lg shadow-inner uppercase border border-white/10">
                {session.fullName ? session.fullName.substring(0, 2) : 'BY'}
              </div>
              <div className="text-center sm:text-left space-y-1">
                <h3 className="text-base font-extrabold text-white leading-tight">{session.fullName || 'Bahruddin Yusuf'}</h3>
                <p className="text-xs text-white/60">{session.email || 'petambak.sukses@shrimpfy.id'}</p>
                <span className="inline-block text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/10 text-indigo-300 font-mono border border-white/10">
                  Petambak Vaname Terverifikasi
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {/* License management */}
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="space-y-0.5 text-left">
                  <span className="text-[9px] uppercase font-mono tracking-wider font-extrabold text-[#db2777]">Status Keanggotaan</span>
                  <p className="text-xs font-bold text-white">{session.package} Plan</p>
                  <p className="text-[10px] text-white/50">Pembayaran diulangi secara {session.billingMode === 'monthly' ? 'Bulanan' : 'Tahunan'}</p>
                </div>
                <button
                  id="profile-action-change-tier"
                  onClick={() => setActiveScreen('pricing')}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition shadow-lg shadow-indigo-500/20 cursor-pointer border border-white/10 font-mono"
                >
                  Ubah Paket
                </button>
              </div>

              {/* General account options */}
              <div className="space-y-2 pt-2 border-t border-white/10 text-left">
                <h4 className="text-[10px] font-bold text-white/40 uppercase font-mono tracking-wider mb-2">Konfigurasi Hak Akses</h4>
                
                <div className="flex justify-between items-center text-xs py-2 border-b border-white/10">
                  <span className="text-white/70 font-medium">Konektivitas Sensor IoT Salinitas</span>
                  <span className="text-pink-400 font-bold font-mono">BELUM TERHUBUNG</span>
                </div>

                <div className="flex justify-between items-center text-xs py-2 border-b border-white/10">
                  <span className="text-white/70 font-medium">Bahasa Default Sistem</span>
                  <span className="text-white font-bold uppercase font-mono">Bahasa Indonesia</span>
                </div>

                <div className="flex justify-between items-center text-xs py-2">
                  <span className="text-white/70 font-medium">Batas Maksimum Scanning AI Harian</span>
                  <span className="text-indigo-300 font-extrabold font-mono">Unlimited / Tanpa Batas</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Dashboard Bottom Responsive Utility Bar (Navbar) */}
      <footer id="dashboard-footer-nav" className="sticky bottom-0 z-45 bg-white/10 border-t border-white/10 py-2 shadow-2xl backdrop-blur-xl">
        <div className="max-w-md mx-auto grid grid-cols-5 gap-1 text-center">
          <button
            id="tab-btn-home"
            onClick={() => setDashboardTab('home')}
            className={`flex flex-col items-center gap-1 py-1.5 transition cursor-pointer ${
              dashboardTab === 'home' ? 'text-indigo-300' : 'text-white/50 hover:text-white'
            }`}
          >
            <Home className="w-5 h-5 shrink-0" />
            <span className="text-[9px] font-bold font-sans">Home</span>
          </button>

          <button
            id="tab-btn-analysis"
            onClick={() => setDashboardTab('analysis')}
            className={`flex flex-col items-center gap-1 py-1.5 transition cursor-pointer ${
              dashboardTab === 'analysis' ? 'text-indigo-300' : 'text-white/50 hover:text-white'
            }`}
          >
            <LineChart className="w-5 h-5 shrink-0" />
            <span className="text-[9px] font-bold font-sans">Analisis</span>
          </button>

          <button
            id="tab-btn-scan"
            onClick={() => setDashboardTab('scan')}
            className={`flex flex-col items-center gap-1 py-1.5 relative transition cursor-pointer ${
              dashboardTab === 'scan' ? 'text-indigo-300' : 'text-white/50 hover:text-white'
            }`}
          >
            {/* Pulsing indicator visual trigger */}
            <div className="absolute top-1 right-5 w-2 h-2 rounded-full bg-pink-500 animate-ping"></div>
            <div className="absolute top-1 right-5 w-2 h-2 rounded-full bg-pink-500"></div>
            <Camera className="w-5 h-5 shrink-0" />
            <span className="text-[9px] font-bold font-sans">Kamera AI</span>
          </button>

          <button
            id="tab-btn-transactions"
            onClick={() => setDashboardTab('transactions')}
            className={`flex flex-col items-center gap-1 py-1.5 transition cursor-pointer ${
              dashboardTab === 'transactions' ? 'text-indigo-300' : 'text-white/50 hover:text-white'
            }`}
          >
            <Coins className="w-5 h-5 shrink-0" />
            <span className="text-[9px] font-bold font-sans">Transaksi</span>
          </button>

          <button
            id="tab-btn-profile"
            onClick={() => setDashboardTab('profile')}
            className={`flex flex-col items-center gap-1 py-1.5 transition cursor-pointer ${
              dashboardTab === 'profile' ? 'text-indigo-300' : 'text-white/50 hover:text-white'
            }`}
          >
            <User className="w-5 h-5 shrink-0" />
            <span className="text-[9px] font-bold font-sans">Profil</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
