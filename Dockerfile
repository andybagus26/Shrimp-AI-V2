FROM python:3.11-slim

WORKDIR /app

# Install system dependencies untuk OpenCV
RUN apt-get update && apt-get install -y \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy HANYA file Python dan model AI — abaikan Node.js/React
COPY app.py .
COPY "best penyakit.pt" .
COPY "best size.pt" .

# Buat folder uploads
RUN mkdir -p static/uploads

# Expose port (Railway inject $PORT via env)
EXPOSE 8000

CMD gunicorn app:app --bind 0.0.0.0:${PORT:-8000} --workers 1 --timeout 120
