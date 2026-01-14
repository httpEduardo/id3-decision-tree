# DecisionSeed

DecisionSeed trains a small ID3 decision tree on categorical data.

## Quick start

```bash
python -m app.server --port 5173
```

Open http://localhost:5173

## API

- POST `/api/train` `{ "rows": [...], "label": "label" }`
- POST `/api/predict` `{ "row": {...} }`

