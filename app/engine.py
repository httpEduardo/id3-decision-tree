import math
from collections import Counter


def entropy(labels):
    total = len(labels)
    if total == 0:
        return 0.0
    counts = Counter(labels)
    return -sum((count / total) * math.log2(count / total) for count in counts.values())


def information_gain(rows, feature, label_key):
    base = entropy([row[label_key] for row in rows])
    total = len(rows)
    splits = {}
    for row in rows:
        splits.setdefault(row.get(feature), []).append(row)
    remainder = 0.0
    for subset in splits.values():
        remainder += (len(subset) / total) * entropy([row[label_key] for row in subset])
    return base - remainder


def build_tree(rows, label_key, features=None):
    labels = [row[label_key] for row in rows]
    if len(set(labels)) == 1:
        return {"label": labels[0]}

    if features is None:
        features = [key for key in rows[0].keys() if key != label_key]

    if not features:
        return {"label": Counter(labels).most_common(1)[0][0]}

    gains = {feature: information_gain(rows, feature, label_key) for feature in features}
    best = max(gains, key=gains.get)
    tree = {"feature": best, "branches": {}}
    values = set(row.get(best) for row in rows)
    for value in values:
        subset = [row for row in rows if row.get(best) == value]
        remaining = [f for f in features if f != best]
        tree["branches"][value] = build_tree(subset, label_key, remaining)
    return tree


def predict(tree, row, fallback=None):
    if "label" in tree:
        return tree["label"]
    feature = tree.get("feature")
    value = row.get(feature)
    branch = tree["branches"].get(value)
    if branch is None:
        return fallback
    return predict(branch, row, fallback=fallback)
