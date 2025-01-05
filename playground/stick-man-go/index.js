// dom elements
const conveyor = document.querySelector(".conveyor");
const stamps = document.querySelectorAll(".stamp");

const word = "go";
const animationBaseDurationSecs = 40;
const animationDurationRangeSecs = 10;

// change for alternate lines, otherwise they'll be random
const alternateLines = true;

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
    line.style.animationDirection = alternateLines
      ? i % 2 === 0
        ? "normal"
        : "reverse"
      : Math.random() > 0.5
      ? "reverse"
      : "normal";

    const chunks = createChunks();
    line.appendChild(chunks);
    conveyor.appendChild(line);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // create go lines
  createLines(80);

  stamps.forEach((el, key) =>
    el.addEventListener("click", (e) => {
      console.log(el, key);
    })
  );
});

// star shape web component
class Stamp extends HTMLElement {
  constructor() {
    super();
    this.className = "stamp";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <path
          d="M50 0 L61 25 L90 10 L75 39 L100 50 L75 61 L90 90 L61 75 L50 100 L39 75 L10 90 L25 61 L0 50 L25 39 L10 10 L39 25 Z"
          fill="currentColor"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <path
          d="M50 0 L61 25 L90 10 L75 39 L100 50 L75 61 L90 90 L61 75 L50 100 L39 75 L10 90 L25 61 L0 50 L25 39 L10 10 L39 25 Z"
          fill="currentColor"
        />
      </svg>
    `;
  }
}

customElements.define("custom-stamp", Stamp);
