import React, { useState } from 'react';
import { Check, Sparkles, ArrowLeft, ArrowUpRight, Waves, BarChart3, Users, Factory, MessageSquare } from 'lucide-react';
import { ActiveScreen, UserSession } from '../types';
import { COMPARISON_DATA } from '../data';

interface PricingViewProps {
  onNavigate: (screen: ActiveScreen) => void;
  session: UserSession;
  onUpdateSession: (updates: Partial<UserSession>) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ onNavigate, session, onUpdateSession }) => {
  const [salesContacted, setSalesContacted] = useState(false);

  const plans = [
    {
      name: 'Free' as const,
      price: 'Gratis',
      badge: 'Free / Uji Coba',
      desc: 'Sesuai untuk uji coba sistem presisi scanning pemula dan nelayan tradisional.',
      features: [
        '3x Limit Pemindaian AI',
        'Diagnosis Kesegaran Organ',
        'Logbook Riwayat Sampel',
        'Akses Wawasan Budidaya'
      ],
      cta: 'Mulai Uji Coba',
      color: 'border-white/10 hover:border-white/20',
      badgeStyle: 'bg-white/5 text-white/50 border-white/10',
      iconStyle: 'bg-white/5 text-white/50',
      btnStyle: 'bg-white/10 text-white border-white/10 hover:bg-white/20',
      iconType: 'sparkles',
      popular: false
    },
    {
      name: 'Petambak Skala Kecil Menengah' as const,
      price: 'Rp100rb',
      badge: 'Petambak Skala Kecil Menengah',
      desc: 'Keandalan pengukuran biomassa mandiri berskala mikro untuk optimasi efisiensi harian.',
      features: [
        'Scan Kamera AI Tanpa Batas',
        'Deteksi Ukuran & Sizing',
        'Estimasi Bobot Biomassa',
        'Grafik Analisis Pertumbuhan',
        '1 Akun Pengguna Mandiri'
      ],
      cta: 'Langganan Skala Kecil Menengah',
      color: 'border-[#0ea5e9]/30 hover:border-[#0ea5e9]/60',
      badgeStyle: 'bg-[#0ea5e9]/10 text-[#0ea5e9] border-[#0ea5e9]/20',
      iconStyle: 'bg-[#0ea5e9]/10 text-[#0ea5e9]',
      btnStyle: 'bg-transparent text-white border-[#0ea5e9]/50 hover:bg-[#0ea5e9]/20 hover:border-[#0ea5e9]',
      iconType: 'waves',
      popular: false
    },
    {
      name: 'Petambak Skala Menengah Atas' as const,
      price: 'Rp600rb',
      badge: 'Petambak Skala Menengah Atas',
      desc: 'Meningkatkan produktivitas tim operasional tambak Anda dengan data kecerdasan buatan.',
      features: [
        'Semua Fitur Skala Kecil+',
        'Diagnosis Penyakit Dini AI',
        'Kalkulator Taksiran Harga',
        'Analisis Tren & Proyeksi Laba',
        'Hingga 5 Akun Tim Kolaborasi'
      ],
      cta: 'Langganan Skala Menengah Atas',
      color: 'border-primary/50 hover:border-primary/80',
      badgeStyle: 'bg-primary/20 text-primary border-primary/30',
      iconStyle: 'bg-primary/20 text-primary',
      btnStyle: 'bg-primary text-white border-transparent hover:bg-primary-dark shadow-lg shadow-primary/20',
      iconType: 'chart',
      popular: true
    },
    {
      name: 'Koperasi Nelayan (Pemerintah)' as const,
      price: 'Rp550rb',
      badge: 'Koperasi Nelayan (Pemerintah)',
      desc: 'Integrasi tata kelola tangkapan kelompok dengan dukungan pendanaan terstruktur.',
      features: [
        'Semua Fitur Menengah Atas+',
        'Manajemen Input Subsidi',
        'Logbook Konsolidasi Kelompok',
        'Portal Distribusi Nelayan',
        '5 Akun Admin Koperasi'
      ],
      cta: 'Langganan Koperasi',
      color: 'border-sehat/30 hover:border-sehat/60',
      badgeStyle: 'bg-sehat/10 text-sehat border-sehat/20',
      iconStyle: 'bg-sehat/10 text-sehat',
      btnStyle: 'bg-transparent text-white border-sehat/50 hover:bg-sehat/20 hover:border-sehat',
      iconType: 'users',
      popular: false
    },
    {
      name: 'Industri Pengolahan & Eksportir' as const,
      price: 'Rp2 Juta',
      badge: 'Industri Pengolahan & Eksportir',
      desc: 'Dukungan ekosistem lengkap untuk standardisasi komoditas ekspor kualitas prima.',
      features: [
        'Semua Fitur Koperasi+',
        'Integrasi API & Sistem Pabrik',
        'Perekaman Deteksi Multi-Batch',
        'Laporan Ekspor Berlisensi',
        'Akses 15 Akun Pemeriksa QC'
      ],
      cta: 'Hubungi Sales',
      color: 'border-white/10 hover:border-white/25',
      badgeStyle: 'bg-[#1e293b]/50 text-slate-300 border-white/10',
      iconStyle: 'bg-[#1e293b]/50 text-slate-300',
      btnStyle: 'bg-white/10 text-white border-white/10 hover:bg-white/20',
      iconType: 'factory',
      popular: false
    }
  ];

  const handleSelectPlan = (planName: any) => {
    if (planName === 'Industri Pengolahan & Eksportir') {
      setSalesContacted(true);
      setTimeout(() => setSalesContacted(false), 5000);
      return;
    }
    
    onUpdateSession({
      package: planName,
      billingMode: 'monthly'
    });
    // Redirect straight to dashboard
    onNavigate('dashboard');
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case 'sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'waves':
        return <Waves className="w-5 h-5" />;
      case 'chart':
        return <BarChart3 className="w-5 h-5" />;
      case 'users':
        return <Users className="w-5 h-5" />;
      case 'factory':
        return <Factory className="w-5 h-5" />;
      default:
        return <Waves className="w-5 h-5" />;
    }
  };

  return (
    <div id="pricing-container" className="min-h-screen bg-transparent text-white font-sans shrimp-pattern select-none py-12 px-4 animate-fadeIn">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Navigation back / logo header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6">
          <button
            id="pricing-back-landing"
            onClick={() => onNavigate('landing')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-primary transition"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali Ke Sebelumnya
          </button>
          
          <div className="text-center sm:text-right">
            <h1 className="text-sm font-bold text-white/40 font-mono tracking-widest uppercase">Paket Berlangganan Shrimpfy AI</h1>
            <p className="text-xs text-primary font-medium">Layanan transparansi kualitas dan akurasi panen terpercaya</p>
          </div>
        </div>

        {/* Big header */}
        <div className="text-center space-y-3">
          <span className="text-[10px] font-mono tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full uppercase">PILIHAN HARGA TERBAIK</span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Peralatan Canggih, <br className="sm:hidden"/> Investasi Hebat
          </h2>
          <p className="text-xs text-white/60 max-w-md mx-auto">
            Siklus penagihan terstandar yang terjangkau demi mendukung peningkatan kualitas udang secara meluas.
          </p>
        </div>

        {salesContacted && (
          <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl max-w-xl mx-auto text-center text-xs text-white animate-bounce">
            🎉 Terima kasih! Mitra penjualan Shrimpfy AI untuk korporasi industri akan segera menghubungi email Anda <span className="font-bold underline text-primary">{session.email || 'anda@gmail.com'}</span> dalam waktu 1x24 jam untuk demonstrasi API.
          </div>
        )}

        {/* Pricing Layout Cards (Beautiful Glassmorphic Dark Theme) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {plans.map((p) => {
            const isActive = session.package === p.name;

            return (
              <div
                key={p.name}
                id={`plan-card-${p.name.replace(/\s+/g, '-').toLowerCase()}`}
                className={`relative rounded-[28px] glass-card p-6 flex flex-col justify-between transition-all duration-300 ${p.color} ${
                  p.popular ? 'scale-103 z-10 shadow-[0_0_25px_rgba(249,115,22,0.25)] border-primary/50' : 'hover:-translate-y-1 bg-white/5'
                }`}
              >
                {p.popular && (
                  <span className="absolute top-3 right-3 bg-primary border border-white/20 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 animate-pulse" /> POPULAR
                  </span>
                )}

                <div className="space-y-5">
                  {/* Top Icon and Label Row */}
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${p.iconStyle} shrink-0 shadow-inner`}>
                      {renderIcon(p.iconType)}
                    </div>
                    <div className="space-y-0.5">
                      <span className={`text-[8px] font-bold uppercase tracking-wider font-mono border px-2 py-0.5 rounded-full ${p.badgeStyle}`}>
                        {p.name === 'Free' ? 'STARTER' : p.name.includes('Petambak') ? 'PETAMBAK' : p.name.includes('Koperasi') ? 'KOPERASI' : 'INDUSTRI'}
                      </span>
                      <h3 className="text-xs font-black text-white leading-tight mt-1">{p.name}</h3>
                    </div>
                  </div>

                  {/* Pricing segment */}
                  <div className="py-2.5">
                    <span className="text-2xl font-extrabold text-white block tracking-tight">
                      {p.price}
                    </span>
                    <span className="inline-block mt-1 text-[9px] font-mono font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-md uppercase tracking-wider font-sans">
                      Per 3 Bulan
                    </span>
                  </div>

                  {/* Standard summary text */}
                  <p className="text-[10.5px] text-white/70 leading-relaxed bg-white/5 p-3 rounded-xl border border-dashed border-white/10">
                    {p.desc}
                  </p>

                  <div className="w-full h-[1px] bg-white/10"></div>

                  {/* Features segment */}
                  <ul className="space-y-2.5">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-white/80 leading-tight font-medium">
                        <span className="w-4 h-4 rounded-full bg-sehat/10 text-sehat flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 border border-sehat/20">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions selection row */}
                <div className="pt-6">
                  {isActive ? (
                    <button
                      id={`plan-active-${p.name.replace(/\s+/g, '-').toLowerCase()}`}
                      onClick={() => onNavigate('dashboard')}
                      className="w-full py-2.5 px-4 rounded-2xl font-extrabold text-[11px] bg-sehat text-white border border-transparent cursor-pointer text-center flex items-center justify-center gap-1 hover:bg-sehat/90 transition-all shadow-md shadow-sehat/20"
                    >
                      Aktif (Ke Dashboard) <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      id={`plan-buy-${p.name.replace(/\s+/g, '-').toLowerCase()}`}
                      onClick={() => handleSelectPlan(p.name)}
                      className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition duration-300 text-center uppercase tracking-wider border cursor-pointer ${p.btnStyle}`}
                    >
                      {p.cta}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Plan Matrix Inlay */}
        <div className="hidden lg:block glass-card p-8 rounded-[32px] border border-white/10 shadow-xl space-y-4">
          <div className="border-b border-white/10 pb-4">
            <h4 className="text-sm font-bold text-white">Perincian Detail Skema Kemitraan</h4>
            <p className="text-[11px] text-white/40">Seluruh paket mendapatkan perlindungan backup data cloud terenkripsi otomatis secara instan.</p>
          </div>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 pb-2 text-white/50 font-mono tracking-wider text-[10px] uppercase">
                <th className="py-2">Fitur Utama</th>
                <th className="py-2 text-center text-primary">Kecil Menengah</th>
                <th className="py-2 text-center text-primary">Menengah Atas</th>
                <th className="py-2 text-center text-emerald-400">Koperasi Nelayan</th>
                <th className="py-2 text-center text-[#94a3b8]">Industri & Ekspor</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_DATA.map((item, index) => (
                <tr key={index} className="border-b border-white/10 py-3 hover:bg-white/5 transition">
                  <td className="py-3 font-semibold text-white/80">{item.featureName}</td>
                  <td className="py-3 text-center text-primary">
                    {typeof item.nelayan === 'boolean' ? (
                      item.nelayan ? '✓' : '—'
                    ) : (
                      item.nelayan
                    )}
                  </td>
                  <td className="py-3 text-center text-primary">
                    {typeof item.skalaKM === 'boolean' ? (
                      item.skalaKM ? '✓' : '—'
                    ) : (
                      item.skalaKM
                    )}
                  </td>
                  <td className="py-3 text-center text-emerald-400">
                    {typeof item.skalaMA === 'boolean' ? (
                      item.skalaMA ? '✓' : '—'
                    ) : (
                      item.skalaMA
                    )}
                  </td>
                  <td className="py-3 text-center text-slate-300">
                    {typeof item.enterprise === 'boolean' ? (
                      item.enterprise ? '✓' : '—'
                    ) : (
                      item.enterprise
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
