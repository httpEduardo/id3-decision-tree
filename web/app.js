"use strict";
const output = document.getElementById("output");
const trainButton = document.getElementById("trainButton");
const predictButton = document.getElementById("predictButton");
function pretty(value) {
    return JSON.stringify(value, null, 2);
}
trainButton.addEventListener("click", () => {
    const rows = document.getElementById("rowsInput").value;
    fetch("/api/train", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows, label: "label" }),
    })
        .then((res) => res.json())
        .then((data) => {
        output.textContent = pretty(data.tree || data);
    });
});
predictButton.addEventListener("click", () => {
    const row = document.getElementById("rowInput").value;
    fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ row }),
    })
        .then((res) => res.json())
        .then((data) => {
        output.textContent = pretty(data);
    });
});
