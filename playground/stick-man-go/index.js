const conveyor = document.querySelector(".conveyor");
const word = "go";
const animationBaseDurationSecs = 20;
const animationDurationRangeSecs = 10;

function createChunks() {
  const chunks = document.createElement("div");
  chunks.className = "chunks";
  const chunk1 = createChunk(word);
  const chunk2 = createChunk(word);

  chunk1.className = "chunk";
  chunk2.className = "chunk";

  // space between the spans to make it seamless
  chunks.appendChild(chunk1);
  chunks.appendChild(document.createTextNode(" "));
  chunks.appendChild(chunk2);

  return chunks;
}

function createChunk() {
  const chunk = document.createElement("span");
  chunk.textContent = Array(100).fill(word).join(" ");
  return chunk;
}

function createLines(num) {
  if (!num || num <= 0) return null;

  // line can be created once and duplicated
  for (let i = 0; i <= num; i++) {
    const line = document.createElement("div");
    line.className = "line";

    // add reverse and diferent animation duration
    line.style.animationDuration =
      animationBaseDurationSecs +
      Math.random() * animationDurationRangeSecs +
      "s";
    line.style.animationDirection = Math.random() > 0.5 ? "reverse" : "normal";

    const chunks = createChunks();
    line.appendChild(chunks);
    conveyor.appendChild(line);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // create go lines
  createLines(80);
});
