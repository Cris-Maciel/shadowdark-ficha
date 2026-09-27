(() => {
  const STORAGE_KEY = "shadowdark-ficha-ptbr-v1";
  const sheet = document.getElementById("sheet");
  const fields = [...document.querySelectorAll(".field")];
  const indicator = document.getElementById("save-indicator");
  let saveTimer;

  function fitSheet() {
    const sheetW = 1313;
    const sheetH = 863;
    const pad = 16;
    const sx = Math.max(0.1, (window.innerWidth - pad) / sheetW);
    const sy = Math.max(0.1, (window.innerHeight - pad) / sheetH);
    const scale = Math.min(sx, sy, 1);
    sheet.style.transform = `translate(-50%, -50%) scale(${scale})`;
  }

  function load() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      for (const el of fields) {
        const key = el.dataset.field;
        if (Object.prototype.hasOwnProperty.call(data, key)) el.value = data[key];
      }
    } catch (_) {}
  }

  function save() {
    const data = {};
    for (const el of fields) data[el.dataset.field] = el.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    indicator.classList.add("show");
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => indicator.classList.remove("show"), 700);
  }

  fields.forEach(el => el.addEventListener("input", save));
  window.addEventListener("resize", fitSheet);
  load();
  fitSheet();
})();
