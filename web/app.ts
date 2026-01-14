const output = document.getElementById("output") as HTMLPreElement;
const trainButton = document.getElementById("trainButton") as HTMLButtonElement;
const predictButton = document.getElementById("predictButton") as HTMLButtonElement;

function pretty(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

trainButton.addEventListener("click", () => {
  const rows = (document.getElementById("rowsInput") as HTMLTextAreaElement).value;
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
  const row = (document.getElementById("rowInput") as HTMLInputElement).value;
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
