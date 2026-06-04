import React, { useState } from 'react';
import { Coins, Sliders, MapPin, UserCheck, MessageSquare, ArrowRight, DollarSign, Activity, Check, Sparkles, Send, RotateCcw } from 'lucide-react';
import { BUYER_OFFERS } from '../data';

export const MarketView: React.FC = () => {
  // Simulator inputs
  const [grade, setGrade] = useState<'A' | 'B' | 'C'>('A');
  const [totalKg, setTotalKg] = useState<number>(1200);
  const [pricePerKg, setPricePerKg] = useState<number>(58000);
  
  // Cost overrides
  const [costPakan, setCostPakan] = useState<number>(15000000);
  const [costBenur, setCostBenur] = useState<number>(5000000);
  const [costOps, setCostOps] = useState<number>(8000000);

  // Active chat state
  const [negotiatingWith, setNegotiatingWith] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'buyer'; text: string; time: string }[]>([]);

  // Update referral price based on grade
  const handleGradeChange = (selectedGrade: 'A' | 'B' | 'C') => {
    setGrade(selectedGrade);
    if (selectedGrade === 'A') setPricePerKg(58000);
    else if (selectedGrade === 'B') setPricePerKg(51000);
    else setPricePerKg(42000);
  };

  // Math equations
  const grossRevenue = totalKg * pricePerKg;
  const totalCost = costPakan + costBenur + costOps;
  const netProfit = grossRevenue - totalCost;
  const roiPercentage = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;

  // Launch buyer chat flow
  const handleInitiateChat = (buyerName: string) => {
    setNegotiatingWith(buyerName);
    const initialMessage = `Halo ${buyerName}, saya ingin menawarkan hasil panen Udang Vaname kami sebanyak ${totalKg.toLocaleString('id-ID')} KG dengan rujukan kualifikasi Grade ${grade} (Kadar kesegaran digital teruji Shrimpfy AI). Berapa kisaran penawaran terbaik Anda hari ini?`;
    setChatMessage(initialMessage);
    setChatHistory([
      { sender: 'user', text: initialMessage, time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) }
    ]);
  };

  // Send message simulation helper
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMsg = chatMessage;
    setChatHistory((prev) => [...prev, { sender: 'user', text: userMsg, time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) }]);
    setChatMessage('');

    // Simulate buyer response helper
    setTimeout(() => {
      let buyerReply = '';
      if (grade === 'A') {
        buyerReply = `Terima kasih atas rincian laporannya. Udang Grade A Size tinggi sangat diminati cold storage kami. Kami berani mengambil di harga Rp${(pricePerKg + 1500).toLocaleString('id-ID')}/KG apabila dikirim besok subuh. Bagaimana?`;
      } else {
        buyerReply = `Terima kasih tawarannya. Estimasi rujukan kami saat ini adalah sekitar Rp${(pricePerKg - 1000).toLocaleString('id-ID')}/KG untuk kualifikasi tersebut. Bisa kami jadwalkan tim penilai lapangan ke tambak Anda lusa?`;
      }
      setChatHistory((prev) => [...prev, { sender: 'buyer', text: buyerReply, time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1505);
  };

  return (
    <div id="market-calculator-container" className="grid grid-cols-1 lg:grid-cols-12 gap-6 select-none font-sans animate-fadeIn">
      {/* Simulation form sheet (Left Column) */}
      <div className="lg:col-span-7 glass-card p-6 rounded-2xl space-y-6">
        <div>
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Coins className="w-4 h-4 text-indigo-300 animate-pulse" /> Simulasi Laba Panen Tambak Vaname
          </h3>
          <p className="text-[11px] text-white/60 mt-1">Uji kelayakan omset kotor & bersih dengan mengalibrasi target bobot serta pengeluaran modal tambak Anda.</p>
        </div>

        {/* Input variables form grids */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-white/55 uppercase tracking-wider font-mono mb-1.5">
              Grade Udang
            </label>
            <div className="grid grid-cols-3 gap-1">
              {(['A', 'B', 'C'] as const).map((g) => (
                <button
                  key={g}
                  id={`simulator-grade-${g}`}
                  type="button"
                  onClick={() => handleGradeChange(g)}
                  className={`py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
                    grade === g 
                      ? 'bg-indigo-600 text-white border-white/20 shadow-md' 
                      : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-white/55 uppercase tracking-wider font-mono mb-1.5">
              Jumlah Hasil (KG)
            </label>
            <input
              id="simulator-kg-input"
              type="number"
              value={totalKg}
              onChange={(e) => setTotalKg(Math.max(1, parseInt(e.target.value) || 0))}
              className="w-full px-3 py-1.5 text-xs text-white border border-white/15 rounded-lg focus:outline-none focus:border-indigo-400 bg-white/5 font-extrabold"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-white/55 uppercase tracking-wider font-mono mb-1.5">
              Harga Rujukan (/KG)
            </label>
            <input
              id="simulator-price-input"
              type="number"
              step="500"
              value={pricePerKg}
              onChange={(e) => setPricePerKg(Math.max(1, parseInt(e.target.value) || 0))}
              className="w-full px-3 py-1.5 text-xs border border-white/15 rounded-lg focus:outline-none focus:border-indigo-400 bg-white/5 font-extrabold text-indigo-300"
            />
          </div>
        </div>

        {/* Cost variables sliders panel */}
        <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-4">
          <span className="text-[10px] font-extrabold text-white uppercase tracking-wider font-mono flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5 text-indigo-300" /> Pos Pengeluaran Modal Produksi (RP)
          </span>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center text-[11px] mb-1">
                <span className="text-white/60 font-medium">Bahan Pakan & Suplemen</span>
                <span className="font-extrabold text-white">Rp{costPakan.toLocaleString('id-ID')}</span>
              </div>
              <input
                id="cost-pakan-slider"
                type="range"
                min="1000000"
                max="50000000"
                step="500000"
                value={costPakan}
                onChange={(e) => setCostPakan(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-550"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-[11px] mb-1">
                <span className="text-white/60 font-medium">Benih Udang (Benur F1)</span>
                <span className="font-extrabold text-white">Rp{costBenur.toLocaleString('id-ID')}</span>
              </div>
              <input
                id="cost-benur-slider"
                type="range"
                min="500000"
                max="20000000"
                step="250000"
                value={costBenur}
                onChange={(e) => setCostBenur(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-550"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-[11px] mb-1">
                <span className="text-white/60 font-medium">Listrik, Tenaga Kerja & Diesel</span>
                <span className="font-extrabold text-white">Rp{costOps.toLocaleString('id-ID')}</span>
              </div>
              <input
                id="cost-ops-slider"
                type="range"
                min="500000"
                max="15000000"
                step="250000"
                value={costOps}
                onChange={(e) => setCostOps(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-550"
              />
            </div>
          </div>
        </div>

        {/* Math results layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest font-mono">Penerimaan Kotor</span>
            <p className="text-base font-extrabold text-white">Rp{grossRevenue.toLocaleString('id-ID')}</p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest font-mono">Total Beban Operasional</span>
            <p className="text-base font-extrabold text-white/70">Rp{totalCost.toLocaleString('id-ID')}</p>
          </div>

          <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
            <span className="text-[9px] font-black text-emerald-300 uppercase tracking-widest font-mono block">Estimasi Laba Bersih</span>
            <p className="text-base font-black text-emerald-300 mt-1">Rp{netProfit.toLocaleString('id-ID')}</p>
            <span className="text-[9px] text-emerald-300/80 font-bold block mt-0.5">ROI Proyeksi: {roiPercentage.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Directory & negotiation workspace (Right Column) */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        {/* Buyer directory */}
        <div className="glass-card p-5 rounded-2xl">
          <h4 className="text-xs font-extrabold text-white border-b border-white/10 pb-2 mb-3 tracking-wide">
            Daftar Mitra Tengkulak & Pengepul Berlisensi
          </h4>

          <div className="space-y-3">
            {BUYER_OFFERS.map((b) => (
              <div key={b.id} className="flex gap-3 p-3 rounded-xl border border-white/10 bg-white/5 hover:border-indigo-400 transition duration-300">
                <img 
                  src={b.imageUrl} 
                  alt={b.name} 
                  className="w-10 h-10 rounded-lg object-cover border border-white/10"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h5 className="text-[11px] font-bold text-white tracking-tight">{b.name}</h5>
                    {b.trusted && (
                      <span className="text-[8px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 uppercase font-mono px-1.5 py-0.5 rounded tracking-wide font-black">Verified</span>
                    )}
                  </div>
                  <p className="text-[10px] text-white/60 flex items-center gap-1">
                    <MapPin className="w-3 w-3 text-indigo-300 shrink-0" /> {b.distance}
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <p className="text-[10px] font-bold text-pink-300 font-mono">Batas Rata: {b.pricePerKgRange}</p>
                    <button
                      id={`btn-negotiate-buyer-${b.id}`}
                      onClick={() => handleInitiateChat(b.name)}
                      className="px-2.5 py-1 text-[9px] font-extrabold uppercase bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 rounded-lg transition tracking-wide flex items-center gap-1 cursor-pointer border border-indigo-500/20"
                    >
                      Hubungi <MessageSquare className="w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Embedded simulated negotiation terminal */}
        {negotiatingWith ? (
          <div className="glass-card p-4 rounded-2xl flex-1 flex flex-col justify-between min-h-[300px] border border-white/15">
            <div className="border-b border-white/10 pb-2 mb-2 flex justify-between items-center">
              <span className="text-[11px] font-extrabold text-white flex items-center gap-1">
                <UserCheck className="w-4 h-4 text-emerald-400 animate-pulse" /> Nego dengan {negotiatingWith}
              </span>
              <button 
                onClick={() => setNegotiatingWith(null)} 
                className="text-[10px] text-white/50 hover:text-white cursor-pointer"
              >
                Tutup
              </button>
            </div>

            {/* Chat list history */}
            <div className="space-y-2 overflow-y-auto pr-1 flex-1 max-h-[160px] min-h-[130px] py-1 border-b border-white/10">
              {chatHistory.map((ch, i) => (
                <div key={i} className={`flex flex-col ${ch.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-2.5 rounded-2xl text-[10px] max-w-[85%] leading-normal ${
                    ch.sender === 'user' 
                      ? 'bg-indigo-650 text-white rounded-br-none font-medium border border-white/10' 
                      : 'bg-white/10 text-white rounded-bl-none border border-white/10'
                  }`}>
                    {ch.text}
                  </div>
                  <span className="text-[8px] text-white/50 mt-0.5 font-mono">{ch.time}</span>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSendMessage} className="flex gap-2 pt-2.5">
              <input
                id="negotiate-chat-input"
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Tulis pesan negosiasi harga..."
                className="flex-1 px-3 py-1.5 text-xs text-white border border-white/15 focus:border-indigo-400 rounded-lg bg-white/5"
                required
              />
              <button
                id="btn-send-msg"
                type="submit"
                className="p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition shrink-0 border border-white/10 cursor-pointer flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="p-6 glass-card border border-dashed border-white/20 text-center flex flex-col items-center justify-center space-y-2 h-[220px]">
            <MessageSquare className="w-8 h-8 text-indigo-300 animate-pulse" />
            <span className="text-xs font-bold text-white">Mulai Negosiasi Harga Panen</span>
            <p className="text-[10px] text-white/50 max-w-xs leading-relaxed">Tekan tombol Hubungi di panel mitra untuk memulai transaksi atau mengajukan penawaran digital.</p>
          </div>
        )}
      </div>
    </div>
  );
};
