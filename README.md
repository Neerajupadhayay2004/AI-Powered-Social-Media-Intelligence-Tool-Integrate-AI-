# 🛡️ Sentinel AI - AI Powered Social Media Intelligence Tool

> AI-powered cybersecurity platform for detecting scams, phishing, hate speech, misinformation, malicious campaigns, and suspicious social media content using Machine Learning, NLP, and Threat Intelligence.

![License](https://img.shields.io/badge/License-MIT-green)
![Python](https://img.shields.io/badge/Python-3.11+-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![AI](https://img.shields.io/badge/AI-Powered-red)

---

<img width="1920" height="1080" alt="Screenshot_2026-07-01_17-47-08" src="https://github.com/user-attachments/assets/98dc71ff-7792-49ee-8ff8-1956fcda707c" />
<img width="1920" height="1080" alt="Screenshot_2026-07-01_17-47-26" src="https://github.com/user-attachments/assets/a8a902f2-e99f-45e8-a34c-e7b448681c16" />
<img width="1920" height="1080" alt="Screenshot_2026-07-01_17-47-39" src="https://github.com/user-attachments/assets/3bc89cb1-2f9b-449e-bc04-33dd0f8b661d" />
<img width="1920" height="1080" alt="Screenshot_2026-07-01_17-47-48" src="https://github.com/user-attachments/assets/99b16aea-c779-4dd6-8817-a47625133c0c" />
<img width="1920" height="1080" alt="Screenshot_2026-07-01_17-47-59" src="https://github.com/user-attachments/assets/b772e31f-5c2d-47b3-8e9e-024e11455b4c" />


# 📌 Overview

Sentinel AI is an AI-powered Social Media Intelligence Platform that helps security researchers, cyber investigators, journalists, and organizations detect malicious social media posts.

The system automatically analyzes public content and identifies:

- Scam campaigns
- Phishing attacks
- Crypto fraud
- Financial scams
- Hate speech
- Threatening language
- Suspicious URLs
- Social engineering attempts
- Emotional manipulation
- Fake investment schemes

The platform combines AI, Natural Language Processing (NLP), Risk Scoring, Entity Extraction, and Threat Intelligence to generate investigation reports.

---

# ✨ Features

## 📊 Threat Intelligence Dashboard

- Live dashboard
- Total analyses
- Average Risk Score
- High Critical alerts
- Scam statistics
- 7-Day activity graph
- Threat category visualization
- Recent investigations

---

## 🔍 AI Content Analyzer

Analyze content from:

- Twitter / X
- Facebook
- Reddit
- Instagram
- Telegram
- WhatsApp messages
- News articles
- Blogs
- Forums

Supports:

- Scam Detection
- Sentiment Analysis
- Risk Scoring
- AI Explanation
- Entity Extraction

---

## 🤖 AI Threat Detection

Automatically identifies:

- Cryptocurrency scams
- Phishing messages
- Fake giveaways
- Ponzi schemes
- Investment fraud
- Financial scams
- Credential theft
- Urgency tactics
- Social engineering

---

## 🧠 AI Reasoning

Every prediction includes explainable AI.

Example:

- Why content was flagged
- Confidence score
- Trigger keywords
- Threat indicators
- Context reasoning

---

## 📈 Risk Scoring

Each post receives:

- Risk Score
- Scam Score
- Confidence Score

Example

Risk: 100%

Scam Probability: 100%

Confidence: 95%

---

## 😊 Emotion Analysis

Emotion Radar includes:

- Fear
- Anger
- Joy
- Sadness
- Neutral
- Surprise
- Trust
- Disgust

---

## 🧩 Entity Extraction

Automatically extracts:

- Wallet addresses
- URLs
- Email addresses
- Hashtags
- Mentions
- Currency symbols
- Organizations
- Locations
- Keywords

---

## 🎯 MITRE ATT&CK Mapping

Maps detected attacks to MITRE ATT&CK techniques.

Example

```
T1566 - Phishing
```

---

## 📂 Investigation History

Stores previous analyses locally.

Includes:

- Search
- Filter
- Categories
- Risk level
- Time
- Investigation history

---

## 💬 Sentinel Copilot

AI Investigation Assistant

Ask questions like:

- Summarize this report
- Explain the scam
- What indicators were detected?
- Which MITRE techniques apply?
- Generate investigator notes
- Suggest mitigation

---

# 🏗️ Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Recharts

## Backend

- FastAPI
- Python
- Pydantic
- Uvicorn

## AI

- OpenAI API (optional)
- Gemini API (optional)
- Local AI fallback
- NLP
- Threat Intelligence Rules

---

# 📁 Project Structure

```
Sentinel-AI/
│
├── backend/
│   ├── app/
│   ├── api/
│   ├── models/
│   ├── services/
│   ├── ai/
│   ├── utils/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── lib/
│   ├── hooks/
│   └── App.tsx
│
├── screenshots/
├── README.md
└── LICENSE
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/Neerajupadhayay2004/AI-Powered-Social-Media-Intelligence-Tool-Integrate-AI-.git

cd AI-Powered-Social-Media-Intelligence-Tool-Integrate-AI-
```

---

## Backend

Create Virtual Environment

```bash
python -m venv venv
```

Activate

### Windows

```bash
venv\Scripts\activate
```

### Linux

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run backend

```bash
uvicorn app.main:app --reload
```

Backend runs on

```
http://localhost:8000
```

---

## Frontend

Install packages

```bash
npm install
```

Run

```bash
npm run dev
```

Open

```
http://localhost:8081
```
---

# 🔍 Example Analysis

Input

```
URGENT!

Only 3 spots left in our exclusive BTC doubling program.

Send 0.1 BTC and receive 0.25 BTC in 24 hours guaranteed.
```

Output

```
Category:
Financial Fraud

Risk:
100%

Scam:
100%

Confidence:
95%

MITRE:
T1566 - Phishing
```

---

# 🎯 Use Cases

- Cyber Threat Intelligence
- OSINT Investigation
- Digital Forensics
- Scam Detection
- Financial Fraud Detection
- Brand Protection
- Social Media Monitoring
- Security Research
- Cybercrime Investigation
- SOC Teams

---

# 🔐 Security

This tool is intended for:

- Educational purposes
- Research
- Defensive cybersecurity
- Threat intelligence
- Publicly available content only

Do **NOT** use for:

- Unauthorized surveillance
- Privacy violations
- Illegal scraping
- Harassment

---

# 🤝 Contributing

Contributions are welcome.

Steps

1. Fork repository

2. Create branch

```bash
git checkout -b feature-name
```

3. Commit

```bash
git commit -m "Added feature"
```

4. Push

```bash
git push origin feature-name
```

5. Create Pull Request

---

# 📄 License

MIT License

---

# 👨‍💻 Author

**Neeraj Upadhayay**

Cybersecurity Engineer | AI Developer | OSINT Researcher

GitHub

https://github.com/Neerajupadhayay2004

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates future development.
