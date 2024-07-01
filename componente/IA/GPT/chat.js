console.log("Chat.js running");

import { CreateWebWorkerMLCEngine } from "https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2.46/+esm";

const SELECTED_MODEL = "TinyLlama-1.1B-Chat-v1.0-q4f16_1-MLC-1k";

let engine;

(async () => {
  console.log("Chat.js running 1*");
  engine = await CreateWebWorkerMLCEngine(
    new Worker(`${prefixLoad}/componente/IA/GPT/worker.js`, { type: "module" }),
    SELECTED_MODEL,
    {
      initProgressCallback: (info) => {
        [
          ...document.querySelectorAll(
            ".chat-gpt .screen-overlay-progress .progress-text"
          ),
        ].forEach((e) => {
          e.innerHTML = `Cargando... ${Math.round(info.progress * 100)}%`;
        });
      },
    }
  );

  [...document.querySelectorAll(".chat-gpt .screen-overlay-progress")].forEach(
    (e) => {
      e.style.display = "none";
    }
  );

  window["GPTengine"] = engine;
})();

export default engine;
