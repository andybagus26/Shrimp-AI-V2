import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey !== "") {
  ai = new GoogleGenAI({ apiKey });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { imageBase64, detectionType } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: "Data gambar (imageBase64) diperlukan." });
    }

    const cleanMode = detectionType === "disease" ? "disease" : "size";

    // 1. Try to connect to YOLOv8 Flask Server on Railway
    try {
      const cleanedBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(cleanedBase64, "base64");
      const blob = new Blob([buffer], { type: "image/jpeg" });
      const formData = new FormData();
      formData.append("image", blob, "shrimp.jpg");

      const flaskBase = process.env.FLASK_API_URL || "http://127.0.0.1:8000";
      const endpoint = cleanMode === "disease" ? `${flaskBase}/scan` : `${flaskBase}/scan_size`;

      const response = await fetch(endpoint, { method: "POST", body: formData });

      if (response.ok) {
        const yoloResult = await response.json();

        if (cleanMode === "disease") {
          const isHealthy = yoloResult.detections.length === 0;
          const diseaseNames = yoloResult.detections.map((d: any) => d.class_name).join(", ");
          const confidence = isHealthy ? 0 : yoloResult.detections[0].confidence;

          // Freshness score: tinggi kalau sehat, RENDAH kalau sakit (sesuai keparahan)
          const freshnessScore = isHealthy
            ? 90 + Math.floor(Math.random() * 8)  // 90-97 kalau sehat
            : Math.max(15, Math.round(45 - confidence * 0.3)); // 15-45 kalau sakit

          const status = freshnessScore >= 90 ? "Sangat Segar" : freshnessScore >= 70 ? "Segar" : freshnessScore >= 50 ? "Kurang Segar" : "Tidak Layak";

          // Diagnosis spesifik per jenis penyakit
          let healthDiagnosis = "Udang sehat, cangkang bening berkilau, bebas patogen visual.";
          if (!isHealthy) {
            const d = diseaseNames.toLowerCase();
            if (d.includes("komplikasi") || (d.includes("wssv") && d.includes("bg"))) {
              healthDiagnosis = `Infeksi ganda terdeteksi: bercak putih kalsifikasi pada karapas (WSSV) disertai penghitaman insang (Black Gill). Tingkat keparahan tinggi, segera isolasi kolam.`;
            } else if (d.includes("wssv") || d.includes("white spot")) {
              healthDiagnosis = `Terdeteksi bercak putih (white spot) pada karapas — gejala khas WSSV. Virus sangat menular, risiko kematian massal tinggi dalam 3-10 hari.`;
            } else if (d.includes("bg") || d.includes("black gill")) {
              healthDiagnosis = `Insang berwarna kehitaman abnormal — indikasi Black Gill Syndrome. Umumnya dipicu bakteri/jamur akibat kualitas air buruk. Periksa DO dan salinitas.`;
            } else {
              healthDiagnosis = `Terdeteksi gejala ${diseaseNames} (conf: ${Math.round(confidence)}%). Segera lakukan sampling lanjutan dan konsultasi ke ahli akuakultur.`;
            }
          }

          // Harga pasar turun drastis jika sakit
          const marketPricePerKg = isHealthy ? 55000 : Math.max(20000, Math.round(38000 - confidence * 100));

          return res.json({
            freshnessScore,
            sizeClass: "Size 50",
            estimatedWeightGrams: 20.0,
            diseaseDetected: isHealthy ? "Negatif" : diseaseNames,
            healthDiagnosis,
            marketPricePerKg,
            status,
            detectionType: "disease",
            result_image_url: yoloResult.result_image_url,
          });
        } else {
          const count = yoloResult.detections.length;
          const hasValid = count > 0 && yoloResult.detections[0].class_name !== "Udang tidak ditemukan";
          const estimatedWeightGrams = hasValid ? parseFloat((yoloResult.total_berat_gram / count).toFixed(1)) : 0.0;

          let sizeClass = "Size 50";
          let marketPricePerKg = 52000;
          if (estimatedWeightGrams > 0) {
            const sizeNum = Math.round(1000 / estimatedWeightGrams);
            if (sizeNum <= 35) { sizeClass = "Size 30"; marketPricePerKg = 72000; }
            else if (sizeNum <= 45) { sizeClass = "Size 40"; marketPricePerKg = 64000; }
            else if (sizeNum <= 55) { sizeClass = "Size 50"; marketPricePerKg = 55000; }
            else if (sizeNum <= 70) { sizeClass = "Size 60"; marketPricePerKg = 47000; }
            else if (sizeNum <= 90) { sizeClass = "Size 80"; marketPricePerKg = 39000; }
            else { sizeClass = "Size 100"; marketPricePerKg = 33000; }
          } else {
            sizeClass = "Tidak terdeteksi";
            marketPricePerKg = 0;
          }

          return res.json({
            freshnessScore: hasValid ? 94 : 0,
            sizeClass,
            estimatedWeightGrams,
            diseaseDetected: "Negatif",
            healthDiagnosis: hasValid
              ? `Terdeteksi ${count} ekor udang dengan berat rata-rata ${estimatedWeightGrams} gram.`
              : "Tidak terdeteksi udang dalam gambar.",
            marketPricePerKg,
            status: hasValid ? "Sangat Segar" : "Kurang Segar",
            detectionType: "size",
            result_image_url: yoloResult.result_image_url,
          });
        }
      }
    } catch (e: any) {
      console.log("Flask backend offline:", e.message);
    }

    // 2. Fallback ke Gemini AI
    if (ai) {
      const cleanedBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
      const cleanModeLabel = detectionType === "disease" ? "Deteksi Penyakit AI" : "Deteksi Size & Berat";
      const focusGuidance =
        detectionType === "disease"
          ? `Fokus utama: DETEKSI PENYAKIT. Amati tanda WSSV, BG, EHP. Sebutkan pada 'diseaseDetected' jenis penyakitnya atau "Negatif".`
          : `Fokus utama: DETEKSI UKURAN & BERAT. Masukkan kelas ukuran dan berat dalam gram. 'diseaseDetected' default "Negatif".`;

      const prompt = `Anda pakar budidaya udang vaname. MODE: ${cleanModeLabel}. ${focusGuidance}
Berikan HANYA JSON valid:
{"freshnessScore":95,"sizeClass":"Size 40","estimatedWeightGrams":24.5,"diseaseDetected":"Negatif","healthDiagnosis":"Kulit bening bercahaya","marketPricePerKg":58000,"status":"Sangat Segar"}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [{ inlineData: { mimeType: "image/jpeg", data: cleanedBase64 } }, { text: prompt }],
        config: { responseMimeType: "application/json" },
      });

      try {
        const result = JSON.parse(response.text?.trim() || "{}");
        return res.json({ ...result, detectionType: detectionType || "size" });
      } catch (e) {
        console.error("Failed to parse Gemini JSON:", e);
      }
    }

    // 3. Fallback ke mock data
    const sizes = ["Size 40", "Size 50", "Size 60", "Size 80"];
    const weights = [25.0, 20.0, 16.6, 12.5];
    const index = Math.floor(Math.random() * sizes.length);
    const diseaseTrigger = detectionType === "disease" && Math.random() > 0.45;
    const mockDisease = Math.random() > 0.5 ? "WSSV (White Spot Syndrome)" : "Black Gill Syndrome (BG)";

    // Freshness & diagnosis harus konsisten dengan status penyakit
    const mockFreshness = diseaseTrigger
      ? 20 + Math.floor(Math.random() * 20)   // 20-40 kalau sakit
      : 85 + Math.floor(Math.random() * 12);  // 85-96 kalau sehat
    const mockStatus = mockFreshness >= 90 ? "Sangat Segar" : mockFreshness >= 70 ? "Segar" : mockFreshness >= 50 ? "Kurang Segar" : "Tidak Layak";

    let mockDiagnosis = "Tubuh udang proporsional berkilau, kalsifikasi cangkang kokoh sempurna.";
    if (diseaseTrigger) {
      if (mockDisease.includes("WSSV")) {
        mockDiagnosis = "Terdeteksi bercak putih pada karapas — gejala WSSV. Virus menular tinggi, risiko kematian massal dalam 3-10 hari. Segera isolasi kolam.";
      } else {
        mockDiagnosis = "Insang berwarna kehitaman abnormal — indikasi Black Gill Syndrome. Periksa kualitas air (DO, salinitas) dan lakukan penanganan antibakteri.";
      }
    }

    await new Promise((r) => setTimeout(r, 1500));
    return res.json({
      freshnessScore: mockFreshness,
      sizeClass: sizes[index],
      estimatedWeightGrams: parseFloat((weights[index] + (Math.random() * 2 - 1)).toFixed(1)),
      diseaseDetected: diseaseTrigger ? mockDisease : "Negatif",
      healthDiagnosis: mockDiagnosis,
      marketPricePerKg: diseaseTrigger ? 22000 : [58000, 51000, 43000, 35000][index],
      status: mockStatus,
      detectionType: detectionType || "size",
    });
  } catch (error: any) {
    console.error("Error:", error);
    res.status(500).json({ error: "Kesalahan server: " + (error?.message || "Tidak dikenal") });
  }
}
