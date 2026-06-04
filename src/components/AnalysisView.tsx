import React, { useState } from 'react';
import { TrendingUp, Droplets, Heart, ShieldAlert, Sparkles, Activity, Bell, Info } from 'lucide-react';

export const AnalysisView: React.FC = () => {
  const [selectedPool, setSelectedPool] = useState<'Kolam 2 - Intensif' | 'Kolam 4 - Super Intensif'>('Kolam 2 - Intensif');

  // Interactive dummy datasets
  const poolMetrics = {
    'Kolam 2 - Intensif': {
      abw: '18.4 gram',
      sr: '91.2%',
      fcr: '1.25',
      do: '5.8 mg/L',
      ph: '7.8',
      salinity: '18 ppt',
      temp: '29.5 °C',
      score: 88,
      status: 'Sangat Sehat',
      scoreValue: 88,
      scoreColor: 'text-emerald-400',
      warnings: [
        { id: 'w-1', type: 'info', text: 'Kadar garam (salinitas) stabil di 18 ppt. Kondisi optimum untuk pertumbuhan benur.' },
        { id: 'w-2', type: 'warning', text: 'FCR sedikit meningkat dalam 3 hari terakhir. Periksa sisa pakan di anco.' }
      ]
    },
    'Kolam 4 - Super Intensif': {
      abw: '12.1 gram',
      sr: '84.5%',
      fcr: '1.42',
      do: '4.6 mg/L',
      ph: '8.2',
      salinity: '24 ppt',
      temp: '30.1 °C',
      score: 72,
      status: 'Kewaspadaan Sedang',
      scoreValue: 72,
      scoreColor: 'text-pink-400',
      warnings: [
        { id: 'w-3', type: 'alert', text: 'Kadar Oksigen Terlarut (DO) mendekati batas minimal 4.6 mg/L. Nyalakan kincir air tambahan!' },
        { id: 'w-4', type: 'warning', text: 'pH berfluktuasi antara pagi & siang melebihi batas 0.5. Kontrol asupan kapur dolomit.' }
      ]
    }
  };

  const metrics = poolMetrics[selectedPool];

  return (
    <div id="analysis-view-root" className="grid grid-cols-1 lg:grid-cols-12 gap-6 select-none font-sans animate-fadeIn">
      {/* Kolam Selector & Metrics Dashboard (Left Column) */}
      <div className="lg:col-span-8 glass-card p-6 rounded-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-300" /> Analitik Performa Tambak Vaname
            </h3>
            <p className="text-[11px] text-white/55 mt-0.5">Pantau parameter vital kualitas air dan estimasi indeks parameter biologi udang.</p>
          </div>

          <div className="flex snap-x overflow-x-auto gap-1">
            {(['Kolam 2 - Intensif', 'Kolam 4 - Super Intensif'] as const).map((p) => (
              <button
                key={p}
                id={`pool-tab-${p.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => setSelectedPool(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer border ${
                  selectedPool === p 
                    ? 'bg-indigo-650 text-white border-white/20 shadow-md' 
                    : 'bg-white/5 text-white/60 hover:text-white border-white/10 hover:bg-white/10'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Big metrics cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
            <span className="block text-[9px] font-bold text-white/40 uppercase tracking-widest font-mono">Rata-Rata Berat (ABW)</span>
            <span className="block text-lg font-black text-white mt-1">{metrics.abw}</span>
            <span className="text-[9px] text-[#db2777] font-bold block mt-0.5">+1.2gr minggu lalu</span>
          </div>

          <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
            <span className="block text-[9px] font-bold text-white/40 uppercase tracking-widest font-mono">Kelangsungan Hidup (SR)</span>
            <span className="block text-lg font-black text-white mt-1">{metrics.sr}</span>
            <span className="text-[9px] text-emerald-400 font-bold block mt-0.5">Kondisi Sangat Stabil</span>
          </div>

          <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
            <span className="block text-[9px] font-bold text-white/40 uppercase tracking-widest font-mono">Feed Conversion (FCR)</span>
            <span className="block text-lg font-black text-white mt-1">{metrics.fcr}</span>
            <span className="text-[9px] text-white/50 block mt-0.5">Rujukan target: 1.25</span>
          </div>

          <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
            <span className="block text-[9px] font-bold text-white/40 uppercase tracking-widest font-mono">Suhu Rata-Rata Air</span>
            <span className="block text-lg font-black text-white mt-1">{metrics.temp}</span>
            <span className="text-[9px] text-indigo-300 font-bold block mt-0.5">Siklus stabil harian</span>
          </div>
        </div>

        {/* Custom SVG Charts Frame Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Chart 1: Growth Weight curve */}
          <div className="p-4 rounded-xl border border-white/15 bg-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider font-mono flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-300" /> Kurva Pertumbuhan ABW (Hari Ke- X)
              </span>
              <span className="text-[9px] text-pink-300 font-bold">Minggu 1 - 8</span>
            </div>

            {/* Custom SVG Path render charts */}
            <div className="relative h-32 w-full bg-black/20 rounded-lg border border-white/10 p-2">
              <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                {/* Horizontal reference grids */}
                <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                <line x1="0" y1="30" x2="100" y2="30" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                {/* Smooth ascending growth path curve */}
                <path d="M 0 38 Q 20 35 40 28 T 80 12 T 100 4" fill="none" stroke="#db2777" strokeWidth="1.5" />
                {/* Highlights */}
                <circle cx="100" cy="4" r="1.5" fill="#db2777" />
                <circle cx="80" cy="12" r="1" fill="#db2777" />
              </svg>
              <div className="absolute top-2 left-2 text-[8px] font-mono text-white bg-white/10 px-1.5 py-0.5 border border-white/10 rounded uppercase">Satuan: Gram</div>
            </div>
          </div>

          {/* Chart 2: Dissolved DO/Water saturation progressions */}
          <div className="p-4 rounded-xl border border-white/15 bg-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider font-mono flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-indigo-300" /> Profil Kimia Air (Salinitas & pH)
              </span>
              <span className="text-[9px] text-[#db2777] font-bold">Mingguan</span>
            </div>

            <div className="relative h-32 w-full bg-black/20 rounded-lg border border-white/10 p-2 flex items-end justify-around">
              {/* Daily bars representation */}
              {[40, 60, 55, 80, 85, 90, 75].map((val, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-3 bg-white/10 rounded-full h-24 flex items-end">
                    <div className="w-full bg-gradient-to-t from-indigo-500 to-pink-500 rounded-full" style={{ height: `${val}%` }}></div>
                  </div>
                  <span className="text-[8px] font-mono text-white/50">H{i+1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Health Gauge & Warnings Log panel (Right Column) */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        {/* Farm index total health score dial gauge */}
        <div className="glass-card p-5 rounded-2xl text-center space-y-4">
          <h4 className="text-xs font-extrabold text-white border-b border-white/15 pb-2 tracking-wide text-left flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-pink-400" /> Status Skor Biosafety Tambak
          </h4>

          <div className="relative w-28 h-28 mx-auto flex flex-col items-center justify-center animate-pulse">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="56" cy="56" r="44" stroke="rgba(255,255,255,0.05)" strokeWidth="7" fill="transparent" />
              <circle cx="56" cy="56" r="44" stroke={metrics.scoreValue >= 80 ? '#10b981' : '#f59e0b'} strokeWidth="7" fill="transparent" 
                      strokeDasharray={276} strokeDashoffset={276 - (276 * metrics.scoreValue) / 100} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-2xl font-black ${metrics.scoreColor}`}>{metrics.scoreValue}</span>
              <span className="text-[8px] font-bold text-white/55 uppercase tracking-widest font-mono">Skor Mutu</span>
            </div>
          </div>

          <p className="text-xs font-bold text-white leading-normal">
            Kondisi:{' '}
            <span className={`font-extrabold ${metrics.scoreColor}`}>{metrics.status}</span>
          </p>
          <p className="text-[10px] text-white/50 max-w-xs mx-auto leading-relaxed">
            Skor dihitung otomatis berdasarkan sinergi parameter fisik air harian & rata-rata biometrik sampling udang vaname di kolam.
          </p>
        </div>

        {/* Live warnings feed channel listing */}
        <div className="glass-card p-4 rounded-2xl flex-1">
          <div className="border-b border-white/15 pb-2 mb-3 flex items-center gap-1.5">
            <Bell className="w-3.5 h-3.5 text-indigo-300 shrink-0" />
            <span className="text-xs font-bold text-white font-mono tracking-tight">Kanal Informasi & Peringatan ({metrics.warnings.length})</span>
          </div>

          <div className="space-y-3">
            {metrics.warnings.map((w) => (
              <div
                key={w.id}
                className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                  w.type === 'alert' 
                    ? 'bg-red-500/10 border-red-500/20 text-red-300' 
                    : w.type === 'warning'
                    ? 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                    : 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300'
                }`}
              >
                {w.type === 'alert' ? (
                  <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-4 h-4 text-indigo-300 shrink-0 mt-0.5" />
                )}
                <div className="space-y-0.5 text-left">
                  <span className="text-[9px] font-bold font-mono uppercase tracking-wider block text-white/40">Notifikasi Sensor</span>
                  <p className="text-[10px] leading-normal font-medium">{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
