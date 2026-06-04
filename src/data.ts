import { FAQItem, FeatureComparison, BuyerOffer } from './types';

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Apakah saya bisa melakukan upgrade paket kapan saja?',
    answer: 'Ya, Anda dapat melakukan upgrade ke paket yang lebih tinggi kapan saja. Selisih biaya akan dihitung secara prorata berdasarkan sisa waktu langganan Anda saat ini.'
  },
  {
    id: 'faq-2',
    question: 'Apakah tersedia uji coba gratis (Free Trial)?',
    answer: 'Tentu! Kami menyediakan uji coba gratis selama 14 hari untuk paket Nelayan dan Skala Menengah agar Anda dapat merasakan manfaat langsung dari teknologi Shrimpfy AI tanpa komitmen awal.'
  },
  {
    id: 'faq-3',
    question: 'Bagaimana kebijakan pengembalian dana (Refund)?',
    answer: 'Kami menawarkan pengembalian dana penuh dalam waktu 7 hari pertama setelah pembelian jika Anda tidak puas dengan layanan kami. Syarat dan ketentuan berlaku untuk penggunaan data tertentu.'
  }
];

export const COMPARISON_DATA: FeatureComparison[] = [
  {
    featureName: 'Logbook Tangkapan & Budidaya',
    nelayan: true,
    skalaKM: true,
    skalaMA: true,
    enterprise: true
  },
  {
    featureName: 'Batas Akun Pengguna Terdaftar',
    nelayan: '1 Akun',
    skalaKM: '5 Akun',
    skalaMA: '5 Akun khusus',
    enterprise: '15 Akun Pabrik'
  },
  {
    featureName: 'Deteksi Cepat Ukuran & Berat',
    nelayan: true,
    skalaKM: true,
    skalaMA: true,
    enterprise: true
  },
  {
    featureName: 'Dashboard Laba & Analisis Tim',
    nelayan: false,
    skalaKM: true,
    skalaMA: true,
    enterprise: true
  },
  {
    featureName: 'Deteksi Penyakit Dini Terintegrasi',
    nelayan: false,
    skalaKM: true,
    skalaMA: false,
    enterprise: true
  },
  {
    featureName: 'Manajemen Data Subsidi / Tangkapan',
    nelayan: false,
    skalaKM: false,
    skalaMA: true,
    enterprise: true
  },
  {
    featureName: 'API Access & Laporan Standard Ekspor',
    nelayan: false,
    skalaKM: false,
    skalaMA: false,
    enterprise: true
  }
];

export const BUYER_OFFERS: BuyerOffer[] = [
  {
    id: 'b-1',
    name: 'Tengkulak Madani (Bapak Joko)',
    distance: '2 KM dari lokasi Anda',
    pricePerKgRange: 'Rp49.000 - Rp52.000',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=60',
    trusted: true
  },
  {
    id: 'b-2',
    name: 'PT. Bahari Nusantara Laut',
    distance: '8.5 KM dari lokasi Anda',
    pricePerKgRange: 'Rp50.500 - Rp53.000',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
    trusted: true
  },
  {
    id: 'b-3',
    name: 'Koperasi Mina Bakti Mandiri',
    distance: '12.1 KM dari lokasi Anda',
    pricePerKgRange: 'Rp48.000 - Rp50.500',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60',
    trusted: false
  }
];
export const APP_LOGO_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtiacVSNbJ83XOotH-gsqDc2pnJJVIhlV9Gvpt9imLh6GKOH2cWln44HSiOM-v8SCgCA2CzDqzIS4EFfRVgSHH9RM5S-eYjgRXLsEiMvEBYevGBUnkmdvQTs9jZexWQG9N32BU-bh6PDbbOkjKrCdoQ7omj_u3E225tKYBx0TtGyEeZO-cpFXpBmjalGV4RChckBO_lCAxUHNNU7s0HZQooyN4-x1tbiLp4PTjYv-Wj_mTuFnG6-H7PSoHXbrJY2QnE2EbkbGbNJ_M';
export const ALT_SHRIMP_APP_LOGO = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCq2qFt6ylH3L6Bij84TL8YvHIp2BhD4_qOSGLSwUL6GF_0n7f7ae8jl5kugY92jcWGoxHHmwSISSFdH9y4ARVABcXSXVveTd-N0ySXdVxrdp8PTSQSODJsrr263CUQl3cPATxvSyA0w8KwvPEha5XFkiXZhbfZBjbYCAkJm7-dApAefKHPGerRjflLi8cbF72VYtVV221nqL0JAi02J3oxJbKENNXiKWbHbOwpnTHa6hfrvs4Gxiz3e7dwn3ByA5hZsNemGPnFpyMb';
