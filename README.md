# Id3 Decision Tree

![Python](https://img.shields.io/badge/Python-3.x-3776AB?logo=python&logoColor=white)

Id3 Decision Tree trains a small ID3 decision tree on categorical data.

## Quick start

```bash
python -m id3_decision_tree.server --port 5173
```

Open http://localhost:5173

## API

- POST `/api/train` `{ "rows": [...], "label": "label" }`
- POST `/api/predict` `{ "row": {...} }`

