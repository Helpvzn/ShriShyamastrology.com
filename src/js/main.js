document.querySelectorAll(".nav-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".nav")?.classList.toggle("open");
  });
});

const slider = document.querySelector(".hero-slider");
if (slider) {
  const slides = [...slider.querySelectorAll("img")];
  let i = 0;
  const show = (n) => {
    slides.forEach((img, idx) => img.classList.toggle("active", idx === n));
  };
  show(0);
  setInterval(() => {
    i = (i + 1) % slides.length;
    show(i);
  }, 4500);
}


document.querySelectorAll(".faq-item button").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.classList.toggle("open");
  });
});

const form = document.querySelector("#consult-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get("name") || "";
    const msg = data.get("message") || "";
    const text = encodeURIComponent(`Namaste, I am ${name}. ${msg}`);
    window.open(`https://wa.me/917976325202?text=${text}`, "_blank");
  });
}
