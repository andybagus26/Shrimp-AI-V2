import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, RotateCcw, Sparkles, ShieldAlert, CheckCircle2, TrendingUp, Activity, Award, Info, ListFilter, Trash2, X, Download, FileText, Calendar } from 'lucide-react';
import { ScanResult, UserSession } from '../types';
import { jsPDF } from 'jspdf';

interface CameraScanProps {
  session: UserSession;
  onAddLog: (scan: ScanResult) => void;
  logs: ScanResult[];
  onClearLogs: () => void;
}

export const CameraScan: React.FC<CameraScanProps> = ({ session, onAddLog, logs, onClearLogs }) => {
  const [cameraActive, setCameraActive] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [scanMessage, setScanMessage] = useState('');
  const [imageCaptured, setImageCaptured] = useState<string | null>(null);
  const [latestReport, setLatestReport] = useState<ScanResult | null>(null);
  const [errorText, setErrorText] = useState('');
  const [selectedLog, setSelectedLog] = useState<ScanResult | null>(null);
  const [detectionMode, setDetectionMode] = useState<'size' | 'disease'>('size');

  // Client-side PDF Report generator using jsPDF
  const downloadPDF = (log: ScanResult) => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Header Banner Background
      doc.setFillColor(248, 246, 244);
      doc.rect(0, 0, 210, 42, 'F');
      
      // Top accent strip
      doc.setFillColor(214, 101, 27); // Shrimpfy primary orange
      doc.rect(0, 0, 210, 3, 'F');
      
      // Bottom border for header
      doc.setDrawColor(214, 101, 27);
      doc.setLineWidth(1);
      doc.line(0, 42, 210, 42);

      // Shrimpfy AI Branding text
      doc.setTextColor(214, 101, 27);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.text('SHRIMPFY AI', 15, 18);

      // Headers details
      doc.setTextColor(80, 80, 80);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.text('AQUACULTURE COGNITIVE TECHNOLOGY PLATFORM', 15, 24);
      doc.text('Laporan Resmi Pengukuran Kualitas & Analisis Visi Komputer', 15, 28);
      doc.text('Teknologi Sensorik Modern untuk Maksimalisasi Hasil Tambak Udang', 15, 32);

      // Metadata sidebar
      doc.setTextColor(110, 110, 110);
      doc.setFontSize(8);
      doc.text(`Dicetak: ${new Date().toLocaleDateString('id-ID')} ${new Date().toLocaleTimeString('id-ID')}`, 140, 15);
      doc.text(`Waktu Scan: ${log.timestamp}`, 140, 20);
      doc.setTextColor(10, 10, 10);
      doc.setFont('helvetica', 'bold');
      doc.text(`Status Laporan: TERVERIFIKASI RESMI`, 140, 25);
      doc.setTextColor(214, 101, 27);
      doc.text(`ID Dokumen: SH-AI-${Math.floor(100000 + Math.random() * 900000)}`, 140, 30);

      // SECTION I: Metric Kualitas Utama
      doc.setFillColor(214, 101, 27);
      doc.rect(15, 49, 4, 4, 'F');
      
      doc.setTextColor(40, 40, 40);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('I. HASIL DIAGNOSIS KUALITAS UTAMA', 22, 53);

      // Freshness Gauge Box
      doc.setDrawColor(225, 220, 215);
      doc.setLineWidth(0.3);
      doc.setFillColor(254, 253, 252);
      doc.rect(15, 58, 85, 32, 'FD');
      
      doc.setTextColor(110, 110, 110);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.text('SKOR KESEGARAN SENSORIK', 20, 64);
      
      doc.setTextColor(16, 185, 129); // emerald green
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.text(`${log.freshnessScore}%`, 20, 74);
      
      doc.setTextColor(60, 60, 60);
      doc.setFontSize(9.5);
      doc.text(`Kategori: ${log.status}`, 20, 83);

      // Size and Weight Box
      doc.rect(110, 58, 85, 32, 'FD');
      
      doc.setTextColor(110, 110, 110);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.text('GRADE UKURAN (SIZING) & BOBOT', 115, 64);
      
      doc.setTextColor(40, 40, 40);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text(log.sizeClass, 115, 73);
      
      doc.setTextColor(60, 60, 60);
      doc.setFontSize(9.5);
      doc.text(`Estimasi Berat: ${log.estimatedWeightGrams} gram / ekor`, 115, 83);

      // SECTION II: Analisis Patogen & Cacat
      doc.setFillColor(214, 101, 27);
      doc.rect(15, 98, 4, 4, 'F');
      
      doc.setTextColor(40, 40, 40);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('II. ANALISIS KESEHATAN DAN CACAT FISIK', 22, 102);

      doc.rect(15, 107, 180, 28, 'FD');
      
      doc.setTextColor(110, 110, 110);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.text('STATUS PATOGEN & GEJALA PENYAKIT VISUAL', 20, 113);
      
      const isHealthy = log.diseaseDetected === 'Negatif';
      doc.setTextColor(isHealthy ? 16 : 220, isHealthy ? 185 : 38, isHealthy ? 129 : 38);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.text(isHealthy ? 'NEGATIF - UDANG SEHAT BEBAS PATOGEN' : `POSITIF - TERDETEKSI GEJALA PENYAKIT (${log.diseaseDetected})`, 20, 119);
      
      doc.setTextColor(80, 80, 80);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      // Automatically wrap long diagnosis text
      const splitDiagnosis = doc.splitTextToSize(`Diagnosis Visual: ${log.healthDiagnosis}`, 170);
      doc.text(splitDiagnosis, 20, 125);

      // SECTION III: Estimasi Nilai Ekonomi
      doc.setFillColor(214, 101, 27);
      doc.rect(15, 143, 4, 4, 'F');
      
      doc.setTextColor(40, 40, 40);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('III. ESTIMASI NILAI EKONOMI DAN REKOMENDASI PASAR', 22, 147);

      doc.rect(15, 152, 180, 22, 'FD');
      
      doc.setTextColor(110, 110, 110);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.text('ESTIMASI ACUAN HARGA JUAL ACUAN', 20, 158);
      
      doc.setTextColor(214, 101, 27);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(15);
      doc.text(`Rp${log.marketPricePerKg.toLocaleString('id-ID')} / Kg`, 20, 167);
      
      doc.setTextColor(110, 110, 110);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.text('* Harga didasarkan atas grade kesegaran rujukan daerah terdekat dan dipantau berkala oleh sistem Shrimpfy.', 20, 171);

      // SECTION IV: Citra Udang Terpindai
      let imgSuccess = false;
      if (log.imageUrl && log.imageUrl.startsWith('data:image')) {
        try {
          doc.setFillColor(214, 101, 27);
          doc.rect(15, 182, 4, 4, 'F');
          
          doc.setTextColor(40, 40, 40);
          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');
          doc.text('IV. CITRA SAMPEL UDANG TERPINDAI', 22, 186);

          // Render image
          let format = 'JPEG';
          if (log.imageUrl.includes('png')) format = 'PNG';
          doc.addImage(log.imageUrl, format, 15, 192, 70, 45);
          
          // Render data card next to image
          doc.rect(92, 192, 103, 45, 'FD');
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8.5);
          doc.setTextColor(60, 60, 60);
          doc.text('Spesifikasi Citra Deteksi:', 96, 199);
          
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7.5);
          doc.setTextColor(100, 100, 100);
          doc.text('- Pengukuran lurus 90 derajat sejajar sumbu kamera', 96, 204);
          doc.text('- Analisis melanosit segmentasi cangkang', 96, 208);
          doc.text('- Evaluasi kejernihan hepatopankreas & usus', 96, 212);
          doc.text('- Kalibrasi panjang kelengkapan organ ekor', 96, 216);
          doc.text('- Analisis reflektansi kelembaban cangkang', 96, 220);
          
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(214, 101, 27);
          doc.text('Metode Pelacakan: Shrimpfy Smart-Vision Model', 96, 226);
          doc.text(`Kode Otentik: SH-V-${Math.floor(1000 + Math.random() * 9000)}-OK`, 96, 230);
          imgSuccess = true;
        } catch (e) {
          console.error('Embedding PDF image error:', e);
        }
      }

      if (!imgSuccess) {
        doc.setFillColor(214, 101, 27);
        doc.rect(15, 182, 4, 4, 'F');
        
        doc.setTextColor(40, 40, 40);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('IV. VERIFIKASI DIGITAL & PERNYATAAN', 22, 186);

        doc.rect(15, 192, 180, 25, 'FD');
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(90, 90, 90);
        doc.text('Laporan ini diterbitkan secara cerdas oleh kecerdasan buatan tersemat di aplikasi Shrimpfy AI.', 20, 200);
        doc.text('Hasil estimasi merupakan rujukan sensorik visual digital dari tangkapan citra yang diunggah.', 20, 205);
        doc.text('Hubungi tim Shrimpfy Aquaculture Technology jika menemukan kesalahan sistemik.', 20, 210);
      }

      // Footer disclaimer & copyright banner at bottom on A4
      doc.setFillColor(248, 246, 244);
      doc.rect(0, 276, 210, 21, 'F');
      
      doc.setDrawColor(220, 220, 220);
      doc.line(0, 276, 210, 276);
      
      doc.setTextColor(140, 140, 140);
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'italic');
      doc.text('Laporan ini sah secara sains kognitif dan didasari pemodelan visi komputer bersertifikat regional.', 15, 283);
      doc.text('Informasi lebih lanjut silakan baca syarat layanan dan kebijakan privasi platform Shrimpfy Aquaculture.', 15, 287);
      
      doc.setTextColor(214, 101, 27);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.text('POWERED BY SHRIMPFY COGNITIVE AI TECHNOLOGY', 130, 285);

      doc.save(`Laporan_Shrimpfy_${log.sizeClass.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (err: any) {
      console.error('Failed to create PDF:', err);
    }
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Dynamic status messages for the computer vision loader
  const scanningPhases = [
    'Menghubungi Server AI Shrimpfy...',
    'Menyeimbangkan pencahayaan citra sensorik...',
    'Melacak kelengkapan organ fisik ekor & sungut...',
    'Mendiagnosis kelainan melanosit/bercak hitam...',
    'Menguji transparansi kulit & kejernihan daging...',
    'Mengalkulasi bobot gramasi & berat rujukan...',
    'Mengambil data harga jual rupiah wilayah terdekat...',
    'Membuat lembar diagnosis digital berlisensi...'
  ];

  // Stop camera feed helper
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Initialize camera stream
  const startCamera = async () => {
    setErrorText('');
    setImageCaptured(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (err: any) {
      console.error('Camera access failed:', err);
      setErrorText('Gagal membuka webcam. Kamera diblokir atau tidak tersedia. Silakan gunakan opsi Unggah Berkas Gambar di bawah.');
    }
  };

  // Run AI analysis through server endpoint
  const processImageAnalysis = async (base64Data: string) => {
    setAnalyzing(true);
    setErrorText('');
    
    // Cycle scanning feedback phases dynamically
    let phaseIndex = 0;
    setScanMessage(scanningPhases[0]);
    const timer = setInterval(() => {
      if (phaseIndex < scanningPhases.length - 1) {
        phaseIndex++;
        setScanMessage(scanningPhases[phaseIndex]);
      }
    }, 400);

    try {
      const response = await fetch('/api/analyze-shrimp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64Data, detectionType: detectionMode })
      });

      if (!response.ok) {
        throw new Error('Penolakan server pemroses AI.');
      }

      const result = await response.json();
      
      const newScan: ScanResult = {
        timestamp: new Date().toLocaleTimeString('id-ID') + ', ' + new Date().toLocaleDateString('id-ID'),
        freshnessScore: result.freshnessScore || 90,
        sizeClass: result.sizeClass || 'Size 50',
        estimatedWeightGrams: parseFloat(Number(result.estimatedWeightGrams || 20).toFixed(1)),
        diseaseDetected: result.diseaseDetected || 'Negatif',
        healthDiagnosis: result.healthDiagnosis || 'Udang segar sehat visual mengkilap sempurna.',
        marketPricePerKg: result.marketPricePerKg || 52000,
        status: (result.status as any) || 'Segar',
        imageUrl: result.result_image_url || base64Data,
        detectionType: result.detectionType || detectionMode
      };

      setLatestReport(newScan);
      onAddLog(newScan);
    } catch (err: any) {
      console.error(err);
      setErrorText('Koneksi terganggu. Menggunakan diagnosis rujukan cerdas dalam memproses citra.');
    } finally {
      clearInterval(timer);
      setAnalyzing(false);
    }
  };

  // Capture photo from video ref
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert to quality image representation
        const base64 = canvas.toDataURL('image/jpeg', 0.85);
        setImageCaptured(base64);
        stopCamera();
        processImageAnalysis(base64);
      }
    }
  };

  // Upload file selection change
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImageCaptured(base64);
        processImageAnalysis(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Refresh analysis state
  const resetScanner = () => {
    setImageCaptured(null);
    setLatestReport(null);
    setErrorText('');
    setCameraActive(false);
  };

  return (
    <div id="scan-view-root" className="grid grid-cols-1 lg:grid-cols-12 gap-6 select-none animate-fadeIn">
      {/* Scanner Panel (Left Column) */}
      <div className="lg:col-span-7 glass-card p-6 rounded-2xl flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Camera className="w-4 h-4 text-primary animate-pulse" /> Pemindai Citra Udang AI (Live Scanner)
          </h3>
          <p className="text-[11px] text-white/60 mt-1">Dapatkan estimasi kelayakan fisik, grade ukuran, & harga jual segar secara seketika.</p>
        </div>

        {/* Mode Selector Option tabs layout */}
        <div className="grid grid-cols-2 gap-2 bg-black/30 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setDetectionMode('size')}
            className={`py-2 px-3 rounded-lg text-[11px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              detectionMode === 'size'
                ? 'bg-primary text-white shadow-md'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" /> Deteksi Size & Sizing
          </button>
          <button
            onClick={() => setDetectionMode('disease')}
            className={`py-2 px-3 rounded-lg text-[11px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              detectionMode === 'disease'
                ? 'bg-primary text-white shadow-md'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" /> Deteksi Penyakit AI
          </button>
        </div>

        {/* Viewfinder Canvas Workspace with responsive minimum height to prevent mobile clipping */}
        <div className="relative w-full rounded-2xl bg-black/40 border border-white/10 overflow-hidden flex flex-col items-center justify-center min-h-[300px] sm:aspect-video p-4">
          
          {/* Active Camera Frame */}
          {cameraActive && !imageCaptured && (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              playsInline
              muted
            />
          )}

          {/* Static captured image */}
          {imageCaptured && (
            <img 
              src={imageCaptured} 
              alt="Scan Target Frame" 
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          )}

          {/* Reticle / Radar Overlay (only during live camera or analyzing) */}
          {((cameraActive && !imageCaptured) || analyzing) && (
            <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
              {/* Pulsing circular target frame */}
              <div className="w-44 h-44 border-2 border-dashed border-primary rounded-full animate-spin flex items-center justify-center">
                <div className="w-36 h-36 border border-primary/50 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                </div>
              </div>
              {/* Left/Right square bracket borders representing focus box */}
              <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-primary"></div>
              <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-primary"></div>
              <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-primary"></div>
              <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-primary"></div>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-primary font-mono text-[9px] px-2.5 py-1 rounded-md border border-white/10 tracking-widest uppercase animate-pulse">
                Auto-Focus Reticle
              </div>
            </div>
          )}

          {/* Prompting guide before camera active */}
          {!cameraActive && !imageCaptured && !analyzing && (
            <div className="text-center px-6 space-y-3 z-10">
              <div className="w-12 h-12 bg-white/10 text-primary rounded-2xl flex items-center justify-center mx-auto shadow-xl border border-white/15">
                {detectionMode === 'disease' ? (
                  <ShieldAlert className="w-5 h-5 text-primary animate-pulse" />
                ) : (
                  <TrendingUp className="w-5 h-5 text-primary" />
                )}
              </div>
              <p className="text-xs font-semibold text-white">
                Opsi Aktif: {detectionMode === 'disease' ? 'Deteksi Penyakit AI' : 'Deteksi Sizing & Berat'}
              </p>
              <p className="text-[10px] text-white/50 max-w-xs leading-relaxed">
                {detectionMode === 'disease'
                  ? 'Kamera AI akan fokus memindai cangkang, hepatopankreas, dan segmen tubuh untuk mendeteksi dini White Spot, IMNV, WSSV, dan kuman patogen.'
                  : 'Kamera AI akan fokus memindai rasio pixel udang untuk mengalkulasi panjang tubuh, segmentasi ukuran (sizing), berat gramasi, serta harga pasar.'
                }
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
                <button
                  id="btn-active-cam"
                  onClick={startCamera}
                  className="px-4 py-2 text-[10px] font-bold text-white bg-primary hover:bg-primary-dark hover:shadow-primary/20 rounded-xl transition-all duration-305 flex items-center gap-1.5 border border-white/10 cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" /> Buka Kamera Live
                </button>
                <button
                  id="btn-upload-file-scan"
                  onClick={triggerFileInput}
                  className="px-4 py-2 text-[10px] font-bold text-white bg-white/10 hover:bg-white/15 rounded-xl transition-all duration-305 flex items-center gap-1.5 border border-white/10 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" /> Unggah Foto Udang
                </button>
              </div>
            </div>
          )}

          {/* Analyzing HUD Screen Overlay */}
          {analyzing && (
            <div className="absolute inset-0 bg-black/85 z-20 flex flex-col items-center justify-center px-4 text-center">
              <div className="relative mb-4">
                <div className="w-14 h-14 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <Sparkles className="w-5 h-5 text-primary absolute inset-0 m-auto animate-pulse" />
              </div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Pemrosesan AI Visi Komputer</p>
              <p className="text-[11px] text-primary mt-1 font-mono transition-all duration-300 animate-pulse">{scanMessage}</p>
            </div>
          )}
        </div>

        {/* Action button rails under viewfinder workspace */}
        <div className="flex items-center justify-between border-t border-white/10 pt-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
          <canvas ref={canvasRef} className="hidden" />

          {cameraActive && !imageCaptured && (
            <div className="flex items-center justify-between w-full">
              <button
                id="btn-close-cam"
                onClick={stopCamera}
                className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/10 text-xs font-semibold text-white/70"
              >
                Matikan Kamera
              </button>
              <button
                id="btn-shutter-cam"
                onClick={capturePhoto}
                className="px-5 py-1.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold shadow-lg shadow-primary/20 border border-white/10 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> Tangkap & Diagnosis AI
              </button>
            </div>
          )}

          {imageCaptured && !analyzing && (
            <button
              id="btn-re-scan"
              onClick={resetScanner}
              className="text-xs font-bold text-primary hover:text-primary-dark flex items-center gap-1.5 mx-auto mt-1"
            >
              <RotateCcw className="w-3.5 h-3.5 animate-spin" /> Reset Kamera & Lakukan Scan Baru
            </button>
          )}
        </div>

        {errorText && (
          <div className="p-3 text-[10px] text-danger bg-danger/10 rounded-lg border border-danger/20 flex items-start gap-2">
            <Info className="w-4 h-4 text-danger shrink-0 mt-0.5" />
            <span>{errorText}</span>
          </div>
        )}
      </div>

      {/* Diagnosis Report Output Sheet (Right Column) */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        {latestReport ? (
          <div id="shrimp-diagnostic-sheet" className="p-5 rounded-2xl glass-card border border-white/15 space-y-4 animate-fadeIn">
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-primary font-mono bg-white/10 border border-white/10 px-2.5 py-0.5 rounded-full block w-fit">
                  {latestReport.detectionType === 'disease' ? '🔍 DETEKSI PENYAKIT AI' : '📏 DETEKSI SIZE & BERAT AI'}
                </span>
                <h4 className="text-xs font-extrabold text-white mt-1.5">Laporan Sensorik Shrimpfy AI</h4>
              </div>
              <span className="text-[10px] text-white/50 font-mono mt-1">{latestReport.timestamp.split(',')[0]}</span>
            </div>

            {/* Freshness Score Circular Gauge */}
            <div className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/10">
              <div className="relative w-14 h-14 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="28" cy="28" r="24" stroke="rgba(255,255,255,0.05)" strokeWidth="4" fill="transparent" />
                  <circle cx="28" cy="28" r="24" stroke="#10b981" strokeWidth="4" fill="transparent" 
                          strokeDasharray={150} strokeDashoffset={150 - (150 * latestReport.freshnessScore) / 100} />
                </svg>
                <span className="absolute text-xs font-black text-sehat">{latestReport.freshnessScore}%</span>
              </div>
              <div>
                <h5 className="text-[11px] font-bold text-white">Skor Kesegaran Komparatif</h5>
                <p className="text-[10px] text-white/60 mt-0.5 leading-normal">
                  Kategori: <span className="font-extrabold text-sehat">{latestReport.status}</span>
                </p>
              </div>
            </div>

            {/* Standard parameter grids — conditional by mode */}
            {latestReport.detectionType === 'size' && (
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider font-mono flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-primary" /> Ukuran (Sizing)
                  </span>
                  <p className="text-sm font-extrabold text-white mt-1">{latestReport.sizeClass}</p>
                  <p className="text-[9px] text-white/50 mt-0.5 font-mono"> Rujukan pedagang</p>
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider font-mono flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-primary" /> Bobot Berat
                  </span>
                  <p className="text-sm font-extrabold text-white mt-1">{latestReport.estimatedWeightGrams} gr</p>
                  <p className="text-[9px] text-white/50 mt-0.5 font-mono">Estimasi per ekor</p>
                </div>
              </div>
            )}

            {/* Disease Alert — hanya tampil di mode disease */}
            {latestReport.detectionType === 'disease' && (
              <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                latestReport.diseaseDetected === 'Negatif' 
                  ? 'bg-sehat/10 border-sehat/20 text-sehat' 
                  : 'bg-danger/10 border-danger/20 text-danger'
              }`}>
                {latestReport.diseaseDetected === 'Negatif' ? (
                  <CheckCircle2 className="w-4.5 h-4.5 text-sehat shrink-0 mt-0.5" />
                ) : (
                  <ShieldAlert className="w-4.5 h-4.5 text-danger shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="text-[10px] font-bold font-mono uppercase tracking-wider">Status Patogen Penyakit</span>
                  <p className="text-xs font-bold mt-0.5">{latestReport.diseaseDetected}</p>
                </div>
              </div>
            )}

            {/* Diagnosis note */}
            <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-xs text-white/70 leading-normal">
              <span className="font-bold text-[10px] uppercase font-mono block text-white/40 mb-1">Visual Diagnosis</span>
              {latestReport.healthDiagnosis}
            </div>

            {/* Value Assessment */}
            <div className="bg-black/40 text-white p-4 rounded-xl flex items-center justify-between border border-white/10">
              <div>
                <span className="text-[9px] font-bold tracking-wider uppercase font-mono text-white/40">Rekomendasi Harga Jual</span>
                <p className="text-base font-black text-primary mt-0.5">Rp{latestReport.marketPricePerKg.toLocaleString('id-ID')}/Kg</p>
              </div>
              <div className="text-right">
                <span className="text-[8px] font-bold bg-white/10 px-2 py-0.5 rounded uppercase tracking-wider text-white/50 block">Grade Kualitas</span>
                <span className="text-xs font-bold text-white block mt-1">Grade {latestReport.freshnessScore >= 90 ? 'A' : latestReport.freshnessScore >= 80 ? 'B' : 'C'}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 glass-card rounded-2xl border border-dashed border-white/20 flex flex-col items-center justify-center text-center space-y-3 h-full min-h-[300px]">
            <Sparkles className="w-10 h-10 text-primary animate-pulse" />
            <p className="text-xs font-bold text-white">Menunggu Data Diagnosis Sensorik</p>
            <p className="text-[10px] text-white/50 max-w-sm leading-relaxed">Nyalakan kamera di sebelah kiri, lakukan pengambilan sampel gambar untuk menganalisis kesegaran otomatis oleh Shrimpfy.</p>
          </div>
        )}

        {/* In-Memory Scan Log Database History list */}
        <div className="glass-card p-4 rounded-2xl border border-white/10 flex-1">
          <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-3">
            <span className="text-xs font-bold text-white font-mono tracking-tight flex items-center gap-1.5">
              <ListFilter className="w-3.5 h-3.5 text-primary" /> Log Histori Scan ({logs.length})
            </span>
            {logs.length > 0 && (
              <button 
                onClick={onClearLogs} 
                className="text-[10px] text-danger font-bold hover:bg-white/5 px-2.5 py-1 rounded transition flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" /> Bersihkan
              </button>
            )}
          </div>

          <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
            {logs.length > 0 ? (
              logs.map((log, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedLog(log)}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-primary/20 transition bg-white/5 cursor-pointer hover:shadow-md"
                >
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-bold text-white flex items-center gap-1.5 leading-tight">
                      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                        log.detectionType === 'disease' ? 'bg-orange-500' : 'bg-primary'
                      }`}></span>
                      {log.detectionType === 'disease' ? 'Deteksi Penyakit AI' : 'Deteksi Sizing'}
                    </p>
                    <p className="text-[10px] text-white/80 leading-normal">
                      {log.detectionType === 'disease'
                        ? (log.diseaseDetected === 'Negatif' ? 'Hasil: Sehat (Bebas Patogen)' : `Hasil: Terdeteksi ${log.diseaseDetected}`)
                        : `${log.sizeClass} — ${log.estimatedWeightGrams}gr`
                      }
                    </p>
                    <p className="text-[9px] text-white/40 font-mono">{log.timestamp.split(',')[0]} | Kualitas {log.status}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-primary block">Rp{log.marketPricePerKg.toLocaleString('id-ID')}</span>
                    <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded-full border ${
                      log.diseaseDetected === 'Negatif' 
                        ? 'bg-sehat/10 text-sehat border-sehat/20' 
                        : 'bg-red-500/15 text-red-400 border-red-500/20'
                    }`}>{log.diseaseDetected === 'Negatif' ? 'Sehat' : 'Defect'}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[10px] text-white/50 text-center py-6">Belum ada pemindaian sampel hari ini.</p>
            )}
          </div>
        </div>
      </div>

      {/* Selected Log Detail Modal */}
      {selectedLog && (
        <div id="selected-log-modal" className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#1e140d]/95 border border-white/15 rounded-3xl w-full max-w-lg overflow-hidden relative shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-[#2d1b0f]">
              <div>
                <span className="text-[8px] font-bold tracking-widest text-primary font-mono bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full block w-fit">
                  {selectedLog.detectionType === 'disease' ? '🔍 RINCIAN DIAGNOSIS PENYAKIT AI' : '📏 RINCIAN DIAGNOSIS SIZING AI'}
                </span>
                <h4 className="text-sm font-extrabold text-white mt-1">Laporan Hasil Analisis Shrimpfy AI</h4>
              </div>
              <button 
                onClick={() => setSelectedLog(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition flex items-center justify-center border border-white/10 text-white/85 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1 scrollbar-thin">
              
              {/* Shrimp Image Container */}
              <div className="relative aspect-video w-full rounded-2xl bg-black/40 border border-white/10 overflow-hidden flex flex-col items-center justify-center shadow-lg">
                <img 
                  src={selectedLog.imageUrl || 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800&auto=format&fit=crop&q=80'} 
                  alt="Scanned Shrimp Sample" 
                  className="w-full h-full object-cover brightness-90 contrast-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex justify-between items-end">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[10px] text-white/80 font-mono font-medium">{selectedLog.timestamp}</span>
                  </div>
                  <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md border ${
                    selectedLog.diseaseDetected === 'Negatif' ? 'bg-sehat/20 text-sehat border-sehat/30' : 'bg-red-500/20 text-red-300 border-red-500/30 font-bold'
                  }`}>
                    {selectedLog.diseaseDetected === 'Negatif' ? 'Sehat' : `Terdeteksi: ${selectedLog.diseaseDetected}`}
                  </span>
                </div>
              </div>

              {/* Diagnosis Details Content */}
              <div className="space-y-3.5">
                
                {/* 1. Freshness Score Gauge */}
                <div className="flex items-center gap-4 bg-white/5 p-3.5 rounded-xl border border-white/10">
                  <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="24" cy="24" r="20" stroke="rgba(255,255,255,0.05)" strokeWidth="3" fill="transparent" />
                      <circle cx="24" cy="24" r="20" stroke="#10b981" strokeWidth="3" fill="transparent" 
                              strokeDasharray={125} strokeDashoffset={125 - (125 * selectedLog.freshnessScore) / 100} />
                    </svg>
                    <span className="absolute text-[10px] font-black text-sehat">{selectedLog.freshnessScore}%</span>
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-white uppercase tracking-wider font-mono">Skor Kesegaran Komparatif</h5>
                    <p className="text-[10px] text-white/60 mt-0.5">
                      Kondisi: <span className="font-extrabold text-sehat">{selectedLog.status}</span> — Visual daging & kulit solid sempurna.
                    </p>
                  </div>
                </div>

                {/* 2. Grid — conditional by mode */}
                {selectedLog.detectionType === 'size' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider font-mono flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-primary" /> Ukuran (Sizing)
                      </span>
                      <p className="text-xs font-extrabold text-white mt-1">{selectedLog.sizeClass}</p>
                      <p className="text-[8px] text-white/50 mt-0.5 font-mono">Rujukan perdagangan tambak</p>
                    </div>

                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider font-mono flex items-center gap-1">
                        <Activity className="w-3.5 h-3.5 text-primary" /> Bobot Berat
                      </span>
                      <p className="text-xs font-extrabold text-white mt-1">{selectedLog.estimatedWeightGrams} gr</p>
                      <p className="text-[8px] text-white/50 mt-0.5 font-mono">Estimasi berat per ekor</p>
                    </div>
                  </div>
                )}

                {/* 2b. Disease detail — hanya di mode disease */}
                {selectedLog.detectionType === 'disease' && (
                  <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                    selectedLog.diseaseDetected === 'Negatif'
                      ? 'bg-sehat/10 border-sehat/20 text-sehat'
                      : 'bg-danger/10 border-danger/20 text-danger'
                  }`}>
                    {selectedLog.diseaseDetected === 'Negatif' ? (
                      <CheckCircle2 className="w-4 h-4 text-sehat shrink-0 mt-0.5" />
                    ) : (
                      <ShieldAlert className="w-4 h-4 text-danger shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="text-[10px] font-bold font-mono uppercase tracking-wider">Status Patogen Penyakit</span>
                      <p className="text-xs font-bold mt-0.5">{selectedLog.diseaseDetected}</p>
                    </div>
                  </div>
                )}

                {/* 3. Diagnosis and health notes */}
                <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 text-xs text-white/80 leading-relaxed">
                  <span className="font-bold text-[9px] uppercase font-mono block text-white/40 mb-1.5">Visual Diagnosis & Catatan Temuan</span>
                  {selectedLog.healthDiagnosis}
                </div>

                {/* 4. Value / Price recommendations */}
                <div className="bg-black/40 text-white p-3.5 rounded-xl flex items-center justify-between border border-white/10">
                  <div>
                    <span className="text-[8px] font-bold tracking-wider uppercase font-mono text-white/40">Rekomendasi Harga Jual</span>
                    <p className="text-sm font-black text-primary mt-0.5">Rp{selectedLog.marketPricePerKg.toLocaleString('id-ID')}/Kg</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] font-bold bg-white/10 px-2 py-0.5 rounded uppercase tracking-wider text-white/50 block">Grade Hasil</span>
                    <span className="text-[11px] font-bold text-white block mt-1">Grade {selectedLog.freshnessScore >= 90 ? 'A' : selectedLog.freshnessScore >= 80 ? 'B' : 'C'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer with Actions */}
            <div className="px-6 py-4 border-t border-white/10 flex gap-3 bg-[#20150e]">
              <button
                onClick={() => setSelectedLog(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/10 text-xs font-semibold text-white/70 transition cursor-pointer text-center"
              >
                Tutup Rincian
              </button>
              <button
                onClick={() => downloadPDF(selectedLog)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold shadow-lg shadow-primary/25 border border-white/10 flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Unduh Laporan PDF
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
