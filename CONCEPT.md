# AI-Powered OCR Solution for Digitizing Historical Documents in Regional Languages

---

## Table of Contents
1. Introduction
2. Problem Statement
3. System Overview
4. Technology Stack & Rationale
5. Core Logic and Workflow
6. Data Flow & Processing Pipeline
7. AI Model: Theory & Implementation
8. Backend Orchestration & Automation
9. Hugging Face Model Deployment
10. Raspberry Pi Self-Retraining Logic
11. Security & Privacy
12. Use Cases & Educational Value
13. Future Work & Research Directions
14. References
15. Appendix (Diagrams, Tables, Glossary)

---

## 1. Introduction
Digitizing historical documents, especially in regional languages, is vital for preserving cultural heritage and enabling research. This project presents a comprehensive, AI-powered OCR system capable of extracting text from scanned images, including complex scripts like Tamil. The documentation provides a deep technical and educational dive, suitable for ECE students and academic review.

## 2. Problem Statement
- Many historical documents are inaccessible due to language, script complexity, and physical degradation.
- Existing OCR tools have limited support for regional languages and handwritten scripts.
- There is a need for a customizable, self-improving, and affordable OCR solution that can operate autonomously and adapt to new data.

## 3. System Overview
- Multi-language OCR (English, Tamil, extendable to others)
- Secure, privacy-focused data handling
- Self-retraining AI model based on user feedback
- Deployable on affordable hardware (Raspberry Pi)
- Model deployment and updates via Hugging Face
- End-to-end automation from document upload to model improvement

## 4. Technology Stack & Rationale
| Layer      | Technology                        | Rationale                                                      |
|------------|-----------------------------------|----------------------------------------------------------------|
| Backend    | FastAPI (Python), Node.js         | FastAPI for regional OCR, Node.js for English/general OCR      |
| AI Model   | Llama OCR (JS), Custom PyTorch    | Llama for English, custom model for Tamil                      |
| Storage    | Local file system, Hugging Face   | Simplicity, privacy, easy cleanup, scalable model hosting      |
| Hosting    | Raspberry Pi                      | Affordable, energy-efficient, hands-on for students           |

## 5. Core Logic and Workflow
### 5.1 End-to-End Process
1. **Document Upload:** User uploads a scanned document via the web interface. The file is validated and stored locally on the Raspberry Pi.
2. **Language Selection:** User selects the document language (e.g., English, Tamil). This determines which OCR model is invoked.
3. **Backend Routing:** The backend (FastAPI for regional, Node.js for English) receives the request and routes it to the appropriate AI model.
4. **Preprocessing:** The image undergoes denoising, deskewing, and contrast enhancement. Layout analysis is performed for complex documents.
5. **OCR Inference:** The selected AI model (Llama OCR for English, custom PyTorch for Tamil) processes the image and extracts text.
6. **Result Delivery:** The extracted text and confidence score are returned to the frontend and displayed to the user.
7. **User Correction:** The user reviews and corrects errors in the extracted text. Corrections are logged and stored as new training data.
8. **Self-Retraining Trigger:** When enough corrections are accumulated, the system triggers a retraining job on the Raspberry Pi.
9. **Model Update & Deployment:** The improved model is uploaded to Hugging Face and deployed to all connected devices.

### 5.2 Detailed Workflow Breakdown
#### 5.2.1 Document Upload & Validation
- Web interface accepts image files (JPG, PNG, TIFF, PDF).
- File size and format are validated client-side and server-side.
- Metadata (timestamp, user, language, device ID) is attached.
- Files are stored in a structured local directory for traceability.

#### 5.2.2 Language Selection & Model Routing
- User selects language from dropdown; default is auto-detect if not specified.
- Backend API receives language parameter and routes to:
  - Node.js (Llama OCR) for English/general scripts
  - FastAPI (Python) for regional scripts (e.g., Tamil)
- Routing logic is modular, allowing easy extension for new languages/models.

#### 5.2.3 Preprocessing Pipeline
- **Denoising:** Median filtering or deep learning-based denoising to remove artifacts.
- **Deskewing:** Hough transform or deep learning-based angle correction.
- **Contrast Enhancement:** Adaptive histogram equalization for faded documents.
- **Layout Analysis:** Detects text blocks, tables, and images using OpenCV or deep learning models.
- **Segmentation:** Splits document into lines, words, and characters for fine-grained OCR.

#### 5.2.4 OCR Inference
- **English/General:**
  - Llama OCR (JavaScript) is invoked via Node.js backend.
  - Model runs inference on preprocessed image segments.
  - Outputs text, bounding boxes, and confidence scores.
- **Regional (e.g., Tamil):**
  - Custom PyTorch model is invoked via FastAPI.
  - Model architecture: CNN for feature extraction, BiLSTM for sequence modeling, CTC loss for alignment.
  - Handles complex ligatures and handwritten scripts.
  - Outputs text, bounding boxes, and confidence scores.

#### 5.2.5 Result Aggregation & Delivery
- Results from OCR model are aggregated into a structured JSON response.
- Includes extracted text, confidence scores, bounding boxes, and error flags.
- Response is sent to frontend for display and user correction.

#### 5.2.6 User Correction & Feedback Logging
- Frontend allows user to edit extracted text inline.
- Corrections are logged with original image, extracted text, corrected text, and user metadata.
- Correction logs are stored locally and periodically synced to a central repository for retraining.

#### 5.2.7 Self-Retraining Trigger & Pipeline
- System monitors correction logs for each language/model.
- When threshold (e.g., 100 corrections) is reached, retraining is triggered.
- Retraining pipeline:
  1. Aggregate new training data from correction logs.
  2. Preprocess images and align with corrected text.
  3. Augment data (rotation, noise, scaling) for robustness.
  4. Fine-tune existing model weights using new data.
  5. Validate model on held-out set; if accuracy improves, proceed to deployment.

#### 5.2.8 Model Update & Deployment
- Improved model is versioned and uploaded to Hugging Face Model Hub.
- Devices periodically check for new model versions.
- On update, model is downloaded, verified (checksum), and hot-swapped into inference pipeline.
- Rollback mechanism in case of deployment failure.

## 6. Data Flow & Processing Pipeline
### 6.1 Data Flow Diagram (Textual)
1. User uploads document →
2. Backend validates & stores file →
3. Preprocessing pipeline →
4. Language/model routing →
5. OCR inference →
6. Result aggregation →
7. Frontend display & correction →
8. Correction logging →
9. Retraining trigger →
10. Model update & deployment

### 6.2 Processing Pipeline Details
- **Input:** Scanned image or PDF
- **Preprocessing:** Denoising, deskewing, contrast enhancement, layout analysis
- **Segmentation:** Line/word/character splitting
- **Feature Extraction:** CNN layers extract visual features
- **Sequence Modeling:** BiLSTM layers model character sequences
- **Decoding:** CTC loss decodes output into text
- **Postprocessing:** Spellcheck, language model correction
- **Output:** Structured text, confidence, bounding boxes

## 7. AI Model: Theory & Implementation
### 7.1 Llama OCR (English/General)
- JavaScript-based, lightweight, optimized for Latin scripts
- Uses CNN for feature extraction, attention for alignment
- Fast inference, suitable for real-time applications
- Integrates with Node.js backend via API

### 7.2 Custom PyTorch Model (Tamil/Regional)
- CNN-BiLSTM-CTC architecture
- Handles complex ligatures, diacritics, and handwritten forms
- Data augmentation for robustness
- Trained on synthetic and real-world datasets
- Exposed via FastAPI REST endpoint

### 7.3 Model Training & Fine-Tuning
- Initial training on large, diverse datasets
- Fine-tuning with user corrections (active learning)
- Early stopping, checkpointing, and rollback for stability
- Model evaluation: accuracy, CER/WER, confusion matrix

## 8. Backend Orchestration & Automation
### 8.1 Multi-Backend Architecture
- Node.js for English/general OCR (Llama)
- FastAPI (Python) for regional OCR (custom PyTorch)
- API gateway routes requests based on language/model
- Modular design for easy extension

### 8.2 Automation Pipeline
- File watcher monitors upload directory
- Automatic preprocessing and inference on new files
- Correction logs trigger retraining jobs
- Scheduled tasks for model update checks
- Logging and monitoring for all stages

### 8.3 Error Handling & Recovery
- Input validation at every stage
- Graceful fallback if model inference fails
- Retry logic for network/model download errors
- Alerting for critical failures

## 9. Hugging Face Model Deployment
### 9.1 Model Versioning & Hosting
- Models are versioned and uploaded to Hugging Face Model Hub
- Metadata includes language, version, accuracy, and changelog
- Public/private access controls for privacy

### 9.2 Device Synchronization
- Devices poll Hugging Face for new model versions
- Download and verify model integrity (checksum)
- Hot-swap model in inference pipeline
- Rollback to previous version if validation fails

### 9.3 Deployment Automation
- CI/CD pipeline automates model packaging and upload
- Automated tests for model accuracy and compatibility
- Notification system for successful/failed deployments

## 10. Raspberry Pi Self-Retraining Logic
### 10.1 Local Training Pipeline
- Raspberry Pi aggregates correction logs and new data
- Preprocessing and augmentation performed locally
- Fine-tunes model using PyTorch (optimized for ARM)
- Monitors CPU/memory usage to avoid overload
- Saves checkpoints and best model locally

### 10.2 Model Upload & Distribution
- After successful retraining, model is uploaded to Hugging Face
- Devices in the network are notified of new model
- Download and validation process as in Section 9

### 10.3 Resource Management
- Training jobs scheduled during low-usage periods
- Monitors temperature and throttles if overheating
- Logs resource usage for diagnostics

## 11. Security & Privacy
- All data stored locally by default; cloud sync is optional and encrypted
- User corrections anonymized before retraining
- Model downloads and uploads use secure HTTPS
- Access controls for model and data endpoints
- Regular security audits and vulnerability scans

## 12. Use Cases & Educational Value
- Digitization of historical manuscripts in regional languages
- Research datasets for linguistics and AI
- Hands-on AI/IoT projects for ECE students
- Community-driven model improvement

## 13. Future Work & Research Directions
- Expand to more languages and scripts
- Handwriting recognition improvements
- Federated learning for privacy-preserving model updates
- Integration with document management systems
- Real-time mobile OCR

## 14. References
- [Hugging Face Model Hub](https://huggingface.co/)
- [PyTorch Documentation](https://pytorch.org/docs/)
- [OpenCV Documentation](https://docs.opencv.org/)
- [Llama OCR](https://github.com/charlesw/tesseract.js)

## 15. Appendix (Diagrams, Tables, Glossary)
### 15.1 Glossary
- **OCR:** Optical Character Recognition
- **CTC:** Connectionist Temporal Classification
- **BiLSTM:** Bidirectional Long Short-Term Memory
- **CER/WER:** Character/Word Error Rate
- **ARM:** Advanced RISC Machine (Raspberry Pi CPU)

### 15.2 Example Correction Log Entry
```
{
  "image_id": "doc_00123",
  "original_text": "...",
  "corrected_text": "...",
  "user_id": "anon_42",
  "timestamp": "2024-06-01T12:34:56Z",
  "language": "Tamil"
}
```

### 15.3 Example Model Metadata
```
{
  "model_name": "ocr-tamil-v2.1",
  "language": "Tamil",
  "version": "2.1",
  "accuracy": 0.94,
  "date": "2024-06-01",
  "changelog": "Improved ligature handling, added 500 new samples"
}
```

---

This documentation provides a comprehensive, technical, and educational overview of the AI-powered OCR system, focusing on the core logic, backend orchestration, self-retraining, and deployment pipeline. It is designed for academic review, team onboarding, and future development reference.