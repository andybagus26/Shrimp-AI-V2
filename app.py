import os
import uuid
import cv2
import numpy as np 
from PIL import Image, ImageOps
from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO

app = Flask(__name__)
CORS(app)

# Konfigurasi Folder Penyimpanan
UPLOAD_FOLDER = 'static/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load Model AI
print("Sedang memuat dua otak Shrimpfy AI...")
model_penyakit = YOLO('best penyakit.pt') # Model Kotak Penyakit (WSSV/BG)
model_size = YOLO('best size.pt')         # Model Poligon Jago Deteksi Udang

@app.route('/')
def home():
    return jsonify({
        "status": "online",
        "message": "Shrimpfy YOLOv8 AI Backend API is running successfully."
    }) 

# ==========================================
# 1. API UNTUK DETEKSI PENYAKIT (KOTAK)
# ==========================================
@app.route('/scan', methods=['POST'])
def scan_shrimp():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'Tidak ada file gambar yang diunggah'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'File kosong'}), 400

        if file:
            filename = str(uuid.uuid4()) + ".jpg"
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            
            img = Image.open(file)
            img = ImageOps.exif_transpose(img) 
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")
            img.save(filepath)

            # Proses AI Penyakit
            results = model_penyakit.predict(source=filepath, conf=0.15)
            
            best_detections = {}
            for box in results[0].boxes:
                class_id = int(box.cls[0])
                raw_class_name = str(model_penyakit.names[class_id]).lower()
                confidence = float(box.conf[0]) * 100
                
                # ==========================================
                # MAPPING ISTILAH TEKNIS PROFESIONAL
                # ==========================================
                if raw_class_name in ["0", "bg", "black gill", "black_gill"]:
                    class_name = "Black Gill Syndrome (BG)"
                elif raw_class_name in ["1", "wssv", "white spot", "whitespot"]:
                    class_name = "WSSV / White Spot Disease"
                elif raw_class_name in ["healthy", "sehat", "normal", "shrimp", "udang"]:
                    class_name = "Healthy" # Dianggap normal
                else:
                    # HAPUS KATA "ANOMALI", Ganti dengan Healthy agar tidak muncul di web
                    class_name = "Healthy"
                
                if class_name in best_detections:
                    if confidence > best_detections[class_name]:
                        best_detections[class_name] = round(confidence, 1)
                else:
                    best_detections[class_name] = round(confidence, 1)
            
            detections = []
            has_bg = "Black Gill Syndrome (BG)" in best_detections
            has_wssv = "WSSV / White Spot Disease" in best_detections

            if has_bg and has_wssv:
                # Logika Komplikasi Profesional
                detections.append({
                    'class_name': "INFEKSI KOMPLIKASI (WSSV + BG)",
                    # Ambil confidence tertinggi untuk menunjukkan keparahan
                    'confidence': max(best_detections["Black Gill Syndrome (BG)"], best_detections["WSSV / White Spot Disease"])
                })
            elif has_bg:
                detections.append({
                    'class_name': "Black Gill Syndrome (BG)",
                    'confidence': best_detections["Black Gill Syndrome (BG)"]
                })
            elif has_wssv:
                detections.append({
                    'class_name': "WSSV / White Spot Disease",
                    'confidence': best_detections["WSSV / White Spot Disease"]
                })
            else:
                # Jika Healthy atau tidak terdeteksi, detections tetap kosong []
                # agar frontend menampilkan pesan "Udang Sehat"
                pass

            result_img = results[0].plot() 
            result_filename = "result_" + filename
            result_filepath = os.path.join(app.config['UPLOAD_FOLDER'], result_filename)
            cv2.imwrite(result_filepath, result_img)

            return jsonify({
                'success': True,
                'result_image_url': f'/{result_filepath}',
                'detections': detections
            })

    except Exception as e:
        print(f"GAGAL MEMPROSES GAMBAR PENYAKIT: {e}")
        return jsonify({'error': str(e)}), 500

# ==========================================
# 2. API DETEKSI SIZE & BERAT (POLIGON)
# ==========================================
@app.route('/scan_size', methods=['POST'])
def scan_size():
    # --- LOGIKA MODE SIZE (TETAP SAMA SEPERTI JALUR A) ---
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'Tidak ada file gambar yang diunggah'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'File kosong'}), 400

        if file:
            filename = str(uuid.uuid4()) + ".jpg"
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            
            img = Image.open(file)
            img = ImageOps.exif_transpose(img) 
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")
            img.save(filepath)

            results = model_size.predict(source=filepath, conf=0.25, iou=0.45, imgsz=640, retina_masks=True)
            
            detections = []
            total_berat = 0
            
            if results[0].masks is not None:
                masks = results[0].masks.data.cpu().numpy()
                
                for i, mask in enumerate(masks):
                    luas_piksel = np.sum(mask > 0)
                    angka_kalibrasi = 1500 
                    estimasi_berat = luas_piksel / angka_kalibrasi
                    total_berat += estimasi_berat
                    
                    detections.append({
                        'class_name': f"Udang {i+1}", 
                        'luas_piksel': float(luas_piksel),
                        'berat_gram': round(estimasi_berat, 2),
                        'confidence': round(float(results[0].boxes.conf[i]) * 100, 1)
                    })
            else:
                detections.append({
                    'class_name': "Udang tidak ditemukan",
                    'luas_piksel': 0,
                    'berat_gram': 0,
                    'confidence': 0
                })

            result_img = results[0].plot() 
            result_filename = "result_size_" + filename
            result_filepath = os.path.join(app.config['UPLOAD_FOLDER'], result_filename)
            cv2.imwrite(result_filepath, result_img)

            return jsonify({
                'success': True,
                'result_image_url': f'/{result_filepath}',
                'total_berat_gram': round(total_berat, 2),
                'detections': detections
            })

    except Exception as e:
        print(f"GAGAL MEMPROSES GAMBAR SIZE: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Ubah port dari 5000 ke 8000
    app.run(debug=True, port=8000)