import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldAlert, Check, TrendingUp, Cpu, Award } from 'lucide-react';
import { FAQ_ITEMS, COMPARISON_DATA, APP_LOGO_URL } from '../data';
import { ActiveScreen, UserSession } from '../types';

interface LandingViewProps {
  onNavigate: (screen: ActiveScreen) => void;
  session: UserSession;
  onLogout: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onNavigate, session, onLogout }) => {
  const [activeFAQ, setActiveFAQ] = useState<string | null>(null);

  return (
    <div id="landing-container" className="min-h-screen font-sans text-white shrimp-pattern select-none bg-transparent">
      {/* Header Navigation */}
      <header id="landing-header" className="sticky top-0 z-50 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-white/10 bg-white/10 backdrop-blur-xl text-white">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <img 
              id="app-logo-landing"
              src={APP_LOGO_URL} 
              alt="Shrimpfy AI Logo" 
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-lg sm:rounded-xl border border-white/15 bg-white/10 p-0.5 sm:p-1"
              referrerPolicy="no-referrer"
            />
            <div>
              <h1 className="text-sm sm:text-xl font-bold text-white tracking-tight flex items-center gap-1">
                Shrimpfy <span className="text-primary font-extrabold text-[9px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full bg-white/10 border border-white/10 uppercase tracking-widest">AI</span>
              </h1>
              <p className="text-[9px] text-white/60 font-mono uppercase tracking-wider hidden sm:block">Aquaculture Technology</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              id="landing-pricing-nav"
              onClick={() => onNavigate('pricing')} 
              className="text-xs sm:text-sm font-medium hover:text-primary text-white/90 transition"
            >
              <span className="hidden sm:inline">Harga &amp; Layanan</span>
              <span className="inline sm:hidden">Harga</span>
            </button>
            {session.isLoggedIn ? (
              <div className="flex items-center gap-1.5 sm:gap-3">
                <button 
                  id="landing-dashboard-nav"
                  onClick={() => onNavigate('dashboard')} 
                  className="px-2.5 py-1 sm:px-4 sm:py-1.5 text-xs font-semibold text-white bg-primary hover:bg-primary-dark transition shadow-lg shadow-primary/20 rounded-lg border border-white/10"
                >
                  Dashboard
                </button>
                <button 
                  id="landing-logout-nav"
                  onClick={onLogout} 
                  className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs text-danger hover:bg-white/5 rounded-lg font-medium transition"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button 
                  id="landing-login-btn"
                  onClick={() => onNavigate('login')} 
                  className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs font-medium hover:text-primary text-white/80 transition"
                >
                  Masuk
                </button>
                <button 
                  id="landing-signup-btn"
                  onClick={() => onNavigate('register')} 
                  className="px-2.5 py-1 sm:px-4 sm:py-1.5 text-xs font-semibold text-white bg-primary hover:bg-primary-dark rounded-lg transition shadow-lg shadow-primary/20 border border-white/15"
                >
                  <span className="hidden sm:inline">Mulai Sekarang</span>
                  <span className="inline sm:hidden">Daftar</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Banner Grid */}
      <section id="hero-banner" className="relative px-4 py-16 md:py-24 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/15 rounded-full text-primary text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Platform AI & Cloud untuk Optimasi Hasil Budidaya</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Platform AI untuk <br/>
            <span className="text-primary">Transparansi Kualitas</span> Udang Segar
          </h2>
          
          <p className="text-sm md:text-base text-white/70 max-w-xl leading-relaxed">
            Optimalkan panen tambak udang Vaname Anda secara presisi dengan sistem pemindai sensorik berbasis kecerdasan buatan. Ambil foto, dapatkan diagnosis kesehatan secara instan, kelas berat rata-rata, estimasi harga jual pasar, dan hubungkan langsung dengan tengkulak tepercaya.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              id="hero-get-started"
              onClick={() => onNavigate('register')}
              className="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark transition shadow-lg shadow-primary/20 text-sm border border-white/10"
            >
              Mulai Analisis Gratis
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="hero-view-pricing"
              onClick={() => onNavigate('pricing')}
              className="px-6 py-3 font-medium text-white bg-white/10 border border-white/15 rounded-xl hover:bg-white/15 transition text-sm flex items-center justify-center"
            >
              Lihat Paket Layanan
            </button>
          </div>

          <div className="flex items-center gap-6 pt-6 border-t border-white/10">
            <div className="text-left">
              <span className="block text-2xl font-bold text-primary">98.4%</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">Akurasi Deteksi AI</span>
            </div>
            <div className="text-left">
              <span className="block text-2xl font-bold text-white">5,400+</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">Scan Terlaksana</span>
            </div>
            <div className="text-left">
              <span className="block text-2xl font-bold text-white">550+</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">Mitra Pertambakan</span>
            </div>
          </div>
        </div>

        {/* Feature Interactive Visualization */}
        <div className="flex-1 w-full max-w-md relative">
          <div className="absolute -top-10 -left-10 w-44 h-44 bg-primary/15 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-water/15 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse"></div>
          
          <div className="relative glass-card rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="relative overflow-hidden rounded-2xl border border-white/15 shadow-sm bg-white/5">
              <img 
                src="/sample.jpeg" 
                alt="Shrimp Scanning Mock" 
                className="w-full h-48 object-cover object-center brightness-90 contrast-110"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="text-xs font-semibold text-white/80 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-water" /> Estimasi Kualitas
                </span>
                <span className="text-xs font-bold text-sehat px-2 py-0.5 bg-sehat/20 rounded border border-sehat/30">Sangat Segar (94%)</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="text-xs font-semibold text-white/80 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-water" /> Kelas Sizing (Berat)
                </span>
                <span className="text-xs font-bold text-white">Size 40 (25.1 gram)</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="text-xs font-semibold text-white/80 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-water" /> Status Penyakit
                </span>
                <span className="text-xs font-bold text-white flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sehat animate-pulse"></span> Negatif (Sehat)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Steps Section */}
      <section id="how-it-works" className="bg-white/5 backdrop-blur-md py-16 border-y border-white/10 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold tracking-tight text-white">Tiga Langkah Mudah Optimalkan Margin Anda</h3>
            <p className="text-sm text-white/60 max-w-lg mx-auto">Kami memadukan kecerdasan buatan kelas industri dengan akses pasar langsung untuk memperpendek rantai penjualan perikanan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl glass-card space-y-4 text-center cursor-default hover:translate-y-[-4px] transition duration-300">
              <div className="w-12 h-12 bg-white/10 text-primary border border-white/15 rounded-xl flex items-center justify-center font-bold text-lg mx-auto">
                1
              </div>
              <h4 className="text-lg font-bold text-white">Ambil Foto / Scan</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Nyalakan kamera di dasbor pemantau atau unggah foto sampel udang vaname segar langsung secara cepat di tepi kolam/tambak.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-card space-y-4 text-center cursor-default hover:translate-y-[-4px] transition duration-300">
              <div className="w-12 h-12 bg-white/10 text-primary border border-white/15 rounded-xl flex items-center justify-center font-bold text-lg mx-auto">
                2
              </div>
              <h4 className="text-lg font-bold text-white">Analisis Instan AI</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Algoritma vision kami memproses kelengkapan organ, kejernihan, estimasi bobot, penyakit, dan kesegaran secara presisi.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-card space-y-4 text-center cursor-default hover:translate-y-[-4px] transition duration-300">
              <div className="w-12 h-12 bg-white/10 text-primary border border-white/15 rounded-xl flex items-center justify-center font-bold text-lg mx-auto">
                3
              </div>
              <h4 className="text-lg font-bold text-white">Hubungkan Pembeli</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Gunakan hasil diagnosis digital berlisensi sebagai dasar kualifikasi negosiasi harga terbaik dengan daftar tengkulak tepercaya.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Plan Matrix */}
      <section id="compare-features" className="max-w-7xl mx-auto py-16 px-4 space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-white">Bandingkan Fitur Skema Shrimpfy AI</h3>
          <p className="text-sm text-white/60">Pilih akses sesuai tingkat kapasitas tambak dan kebutuhan tim operasional lapangan Anda.</p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/15 shadow-2xl bg-white/5 backdrop-blur-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/10 border-b border-white/15">
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-white/90 font-mono">Fitur Pembanding</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-primary font-mono text-center">Petambak Skala Kecil Menengah</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-primary font-mono text-center">Petambak Skala Menengah Atas</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-water font-mono text-center">Koperasi Nelayan (Pemerintah)</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-water font-mono text-center">Industri & Eksportir</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_DATA.map((item, index) => (
                <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition">
                  <td className="p-4 text-xs font-medium text-white/90">{item.featureName}</td>
                  <td className="p-4 text-center">
                    {typeof item.nelayan === 'boolean' ? (
                      item.nelayan ? <Check className="w-4.5 h-4.5 text-sehat mx-auto" /> : <span className="text-white/20">—</span>
                    ) : (
                      <span className="text-xs font-semibold text-white/80">{item.nelayan}</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {typeof item.skalaKM === 'boolean' ? (
                      item.skalaKM ? <Check className="w-4.5 h-4.5 text-sehat mx-auto" /> : <span className="text-white/20">—</span>
                    ) : (
                      <span className="text-xs font-semibold text-white/80">{item.skalaKM}</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {typeof item.skalaMA === 'boolean' ? (
                      item.skalaMA ? <Check className="w-4.5 h-4.5 text-sehat mx-auto" /> : <span className="text-white/20">—</span>
                    ) : (
                      <span className="text-xs font-semibold text-white/80">{item.skalaMA}</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {typeof item.enterprise === 'boolean' ? (
                      item.enterprise ? <Check className="w-4.5 h-4.5 text-sehat mx-auto" /> : <span className="text-white/20">—</span>
                    ) : (
                      <span className="text-xs font-semibold text-white/80">{item.enterprise}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Collapsible FAQ Section */}
      <section id="faq-section" className="bg-white/5 py-16 border-t border-white/10 px-4 backdrop-blur-md">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold tracking-tight text-white">Pertanyaan Umum (FAQ)</h3>
            <p className="text-xs text-white/60">Mencari tahu informasi teknis operasional langganan produk Shrimpfy.</p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => (
              <div 
                key={item.id} 
                className="bg-white/5 rounded-xl border border-white/10 shadow-lg overflow-hidden backdrop-blur-sm"
              >
                <button
                  id={`faq-btn-${item.id}`}
                  onClick={() => setActiveFAQ(activeFAQ === item.id ? null : item.id)}
                  className="w-full flex justify-between items-center p-4 text-left font-semibold text-xs text-white hover:bg-white/5 transition"
                >
                  <span>{item.question}</span>
                  <span className="text-primary font-bold ml-4">
                    {activeFAQ === item.id ? '−' : '+'}
                  </span>
                </button>
                {activeFAQ === item.id && (
                  <div className="p-4 border-t border-white/10 bg-white/5 text-xs text-white/70 leading-relaxed animate-fadeIn">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Universal Footer */}
      <footer id="universal-footer" className="bg-black/40 text-white/80 py-12 px-4 text-center border-t border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img 
              id="footer-logo"
              src={APP_LOGO_URL} 
              alt="Footer Logo" 
              className="w-8 h-8 rounded-lg bg-white/10 p-0.5 object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="text-base font-bold text-white tracking-tight">Shrimpfy AI</span>
          </div>
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Shrimpfy AI. Hak Cipta Dilindungi Undang-Undang. Layanan IoT Monitor Pertambakan Udang Indonesia.
          </p>
        </div>
      </footer>
    </div>
  );
};
