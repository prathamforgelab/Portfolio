const root = document.documentElement;
const themeButton = document.querySelector(".theme-toggle");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

try {
  const savedTheme = localStorage.getItem("pratham-theme");
  if (savedTheme === "dark" || savedTheme === "light") root.dataset.theme = savedTheme;
} catch (_) {
  // Theme remains usable when browser storage is unavailable.
}

function updateThemeButton() {
  const dark = root.dataset.theme === "dark";
  themeButton.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  document.querySelector('meta[name="theme-color"]').content = dark ? "#101714" : "#f5f6f3";
}

themeButton.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  updateThemeButton();
  try { localStorage.setItem("pratham-theme", root.dataset.theme); } catch (_) { /* no-op */ }
});
updateThemeButton();

function closeMenu(restoreFocus = false) {
  const wasOpen = menuButton.getAttribute("aria-expanded") === "true";
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  if (restoreFocus && wasOpen) menuButton.focus();
}

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  if (!open) {
    closeMenu();
    return;
  }
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Close navigation");
  nav.classList.add("open");
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => closeMenu()));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu(true);
});
document.addEventListener("click", (event) => {
  const menuOpen = menuButton.getAttribute("aria-expanded") === "true";
  if (menuOpen && !nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  try {
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          activeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });
    root.classList.add("reveal-ready");
    revealItems.forEach((item) => observer.observe(item));
  } catch (_) {
    root.classList.remove("reveal-ready");
    revealItems.forEach((item) => item.classList.add("visible"));
  }
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const cases = {
  greenmind: {
    kicker: "MULTI-CLOUD · DECISION SUPPORT",
    title: "GreenMind AI",
    summary: "An autonomous green cloud operations system that brings monitoring, forecasting, recommendations, and scenario exploration into one engineering cockpit.",
    problem: "Cloud teams balance performance, cost, reliability, and carbon across providers. GreenMind AI frames these concerns together and makes each recommendation inspectable.",
    approach: "The repository describes AWS, Azure, and GCP telemetry connectors; five-metric forecasting; five specialist agents with explicit conflict resolution; and a non-destructive digital twin. Demo and estimated data are labeled, and live remediations are not implemented.",
    tech: ["FastAPI", "React 18", "TypeScript", "scikit-learn", "LangGraph", "Docker"],
    repo: "https://github.com/Pratham-stack-coder/GreenMind-AI"
  },
  eval: {
    kicker: "LLMS · EVALUATION",
    title: "LLM Evaluation Lab",
    summary: "A reproducible toolkit for comparing prompt and model changes with a layered evaluator pipeline and statistical regression checks.",
    problem: "Small, manually inspected samples can make a model change look better or worse by chance. The lab turns evaluation into a repeatable experiment with explicit measurements.",
    approach: "The repository includes dataset validation; exact-match, token-F1, schema, latency, and other evaluators; a Python SDK, CLI, REST API, and web UI; plus paired bootstrap confidence intervals for regression decisions.",
    tech: ["Python", "FastAPI", "React 19", "Vite", "SQLite", "Statistics"],
    repo: "https://github.com/prathamforgelab/LLM-Evaluation-Lab"
  },
  industrial: {
    kicker: "TEMPORAL DATA · CAUSAL REASONING",
    title: "Industrial Failure Mechanism Discovery",
    summary: "A B.Tech major research project, described in its repository as a four-month project by a team of six.",
    problem: "Anomaly alerts and correlations can surface symptoms without explaining the sequence of events that led to a failure. This project investigates how heterogeneous temporal data can help rank competing mechanisms.",
    approach: "The documented pipeline normalizes sensor and operational data, mines change points and lead-lag patterns, builds an entity-event graph, scores candidate mechanisms using evidence and contradiction signals, then presents grounded reports through an API and dashboard.",
    tech: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "NetworkX"],
    repo: "https://github.com/Pratham-stack-coder/industrial-failure-mechanism-discovery"
  },
  echopilot: {
    kicker: "VOICE UI · PC COMPANION",
    title: "EchoPilot",
    summary: "A PC companion concept for Amazon Echo Show, centered on monitoring, remote control, AI assistance, and secure access.",
    problem: "A smart display can become a more useful desk companion when it can surface a computer's state and offer direct, accessible actions.",
    approach: "The repository provides a small Python service with Flask and psutil dependencies, a browser interface intended for the Echo Show, and a local setup flow. The case study stays within the functionality documented in the repository.",
    tech: ["Python", "Flask", "psutil", "Browser UI"],
    repo: "https://github.com/Pratham-stack-coder/EchoPilot"
  },
  voice: {
    kicker: "CONVERSATIONAL AI",
    title: "Python Voice Assistant",
    summary: "A real-time voice-to-voice assistant concept built with Python and ElevenLabs Conversational AI.",
    problem: "Voice interaction can make simple assistant tasks feel more immediate and natural than a text-only exchange.",
    approach: "The documented feature set includes personalized greetings, context-aware responses, and an extensible structure for reminders, calendar integration, and custom commands. The repository lists those integrations as future improvements, so they are not presented here as completed features.",
    tech: ["Python 3.12+", "ElevenLabs Conversational AI", "python-dotenv"],
    repo: "https://github.com/Pratham-stack-coder/Python-voice-AI"
  }
};

const dialog = document.querySelector("#case-dialog");
const closeDialog = document.querySelector(".dialog-close");
document.querySelectorAll(".case-open").forEach((button) => button.addEventListener("click", () => {
  const item = cases[button.dataset.case];
  if (!item) return;
  document.querySelector("#case-kicker").textContent = item.kicker;
  document.querySelector("#case-title").textContent = item.title;
  document.querySelector("#case-summary").textContent = item.summary;
  document.querySelector("#case-problem").textContent = item.problem;
  document.querySelector("#case-approach").textContent = item.approach;
  document.querySelector("#case-tech").replaceChildren(...item.tech.map((tech) => {
    const chip = document.createElement("span");
    chip.textContent = tech;
    return chip;
  }));
  document.querySelector("#case-repo").href = item.repo;
  dialog.showModal();
}));
closeDialog.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  const box = dialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
});

const tabs = document.querySelectorAll(".demo-tab");
const panes = document.querySelectorAll(".demo-pane");
function selectDemoTab(selectedTab, moveFocus = false) {
  tabs.forEach((item) => {
    const active = item === selectedTab;
    item.classList.toggle("active", active);
    item.setAttribute("aria-selected", String(active));
    item.tabIndex = active ? 0 : -1;
  });
  panes.forEach((pane) => {
    const active = pane.id === selectedTab.dataset.tab;
    pane.hidden = !active;
    pane.classList.toggle("active", active);
  });
  if (moveFocus) selectedTab.focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectDemoTab(tab));
  tab.addEventListener("keydown", (event) => {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;
    else return;
    event.preventDefault();
    selectDemoTab(tabs[nextIndex], true);
  });
});
if (tabs.length) selectDemoTab(tabs[0]);

function wordCoverage(text, phrase) {
  const tokens = phrase.toLowerCase().match(/[a-z0-9]+/g) || [];
  if (!tokens.length) return 0;
  const answer = new Set(text.toLowerCase().match(/[a-z0-9]+/g) || []);
  return Math.round(tokens.filter((token) => answer.has(token)).length / tokens.length * 100);
}

document.querySelector("#run-eval").addEventListener("click", () => {
  const phrase = document.querySelector("#expected-answer").value.trim();
  const baseline = wordCoverage(document.querySelector("#baseline-answer").value, phrase);
  const candidate = wordCoverage(document.querySelector("#candidate-answer").value, phrase);
  const result = document.querySelector("#eval-result");
  const delta = candidate - baseline;
  result.querySelector("strong").textContent = `Baseline ${baseline}% · Candidate ${candidate}%`;
  result.querySelector("small").textContent = `${delta >= 0 ? "+" : ""}${delta} points of phrase coverage in this tiny example.`;
});

const cpuRange = document.querySelector("#cpu-range");
const cpuOutput = document.querySelector("#cpu-output");
let scenario = "rightsize";
const scenarioCopy = {
  rightsize: (cpu) => cpu < 35 ? ["Review a smaller size", "Low sample utilization suggests a rightsizing review; check memory and peak demand first."] : cpu > 80 ? ["Keep capacity under review", "High sample utilization leaves less headroom; inspect demand before reducing capacity."] : ["Capacity looks balanced", `At ${cpu}% CPU, review headroom before changing instance size.`],
  scale: (cpu) => cpu > 72 ? ["Review a scale-up", `At ${cpu}% CPU, the sample is above a review threshold. Validate sustained load and latency.`] : ["No scale-up signal here", `At ${cpu}% CPU, this sample does not cross the illustrative scale-up threshold.`],
  shift: () => ["Consider flexible workloads", "For non-urgent batch jobs, compare the carbon intensity of available time windows before scheduling."]
};
function updateScenario() {
  const cpu = Number(cpuRange.value);
  cpuOutput.value = `${cpu}%`;
  cpuOutput.textContent = `${cpu}%`;
  const [title, detail] = scenarioCopy[scenario](cpu);
  document.querySelector("#scenario-result strong").textContent = title;
  document.querySelector("#scenario-result small").textContent = detail;
}
cpuRange.addEventListener("input", updateScenario);
document.querySelectorAll(".scenario-chip").forEach((button) => button.addEventListener("click", () => {
  scenario = button.dataset.scenario;
  document.querySelectorAll(".scenario-chip").forEach((item) => item.classList.toggle("selected", item === button));
  updateScenario();
}));
updateScenario();
document.querySelector("#year").textContent = new Date().getFullYear();
