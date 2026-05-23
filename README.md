# Recipe On The GO

Recipe On The GO is a full-stack recipe prediction project. The frontend lets users enter ingredients, the FastAPI backend predicts likely dishes using a trained machine learning model, and MySQL stores prediction history for the History and Dashboard pages.

## Features

- Predicts top recipe matches from entered ingredients
- Shows confidence scores for predicted dishes
- Displays recipe ingredients and cooking steps
- Saves prediction history in MySQL
- Includes a dashboard with total searches, top dish, and recent activity
- Supports common Hindi ingredient synonyms such as `aloo`, `pyaz`, `tamatar`, and `chawal`

## Project Structure

```text
.
|-- backend/
|   |-- app.py            # FastAPI routes
|   |-- db.py             # MySQL connection and history queries
|   `-- recipes.py        # Recipe data
|-- ml/
|   |-- dataset.csv       # Training dataset
|   |-- train_model.py    # Model training script
|   |-- model_loader.py   # Loads model and predicts dishes
|   `-- models/           # Generated model files, ignored by Git
|-- recipe-frontend/      # React + Vite frontend
|-- requirements.txt      # Python dependencies
|-- .env                  # Local secrets, ignored by Git
`-- .gitignore
```

## Requirements

- Python 3.11+
- Node.js and npm
- MySQL Server

## Backend Setup

1. Create and activate a virtual environment.

```bash
python -m venv venv
venv\Scripts\activate
```

2. Install Python dependencies.

```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the project root.

```env
PASSWORD=your_mysql_password
DATABASE=your_database_name
```

4. Create the MySQL database and history table.

```sql
CREATE DATABASE your_database_name;

USE your_database_name;

CREATE TABLE history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ingredients TEXT NOT NULL,
    predicted_dish VARCHAR(255) NOT NULL,
    confidence FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

5. Train or provide the ML model files.

The backend expects these files:

```text
ml/models/model.pkl
ml/models/vectorizer.pkl
```

To generate them, run the training script from the `ml` folder:

```bash
cd ml
python train_model.py
```

6. Start the backend server from the project root.

```bash
uvicorn backend.app:app --reload
```

The API will run at:

```text
http://127.0.0.1:8000
```

## Frontend Setup

1. Go to the frontend folder.

```bash
cd recipe-frontend
```

2. Install dependencies.

```bash
npm install
```

3. Start the frontend.

```bash
npm run dev
```

The frontend will run on the URL shown in the terminal, usually:

```text
http://localhost:5173
```

## API Routes

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/` | Health check |
| `POST` | `/predict` | Predict dishes from ingredients |
| `POST` | `/get-recipe` | Get recipe details for a dish |
| `GET` | `/history` | Get saved prediction history |

Example prediction request:

```json
{
  "ingredients": "chicken onion tomato"
}
```

## Git Notes

The following local/generated files are intentionally ignored:

- `.env`
- `venv/`
- `recipe-frontend/node_modules/`
- `__pycache__/`
- `notebook/`
- `new-ml/`
- `ml/models/`

Because `ml/models/` is ignored, a fresh clone needs to run `ml/train_model.py` before starting the backend, or the trained model files must be provided separately.

## Useful Commands

```bash
# Backend
uvicorn backend.app:app --reload

# Train model
cd ml
python train_model.py

# Frontend
cd recipe-frontend
npm run dev

# Frontend production build
cd recipe-frontend
npm run build
```
