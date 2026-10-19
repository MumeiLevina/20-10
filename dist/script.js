(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const body = document.body;
  const ambientVideo = document.querySelector("#ambient-video");
  const story = document.querySelector("#story");
  const openGift = document.querySelector("#open-gift");
  const beginWishes = document.querySelector("#begin-wishes");
  const wishButtons = [...document.querySelectorAll(".wish-flower")];
  const wishCount = document.querySelector("#wish-count");
  const envelope = document.querySelector("#envelope");
  const openLetter = document.querySelector("#open-letter");
  const finish = document.querySelector("#finish");
  const replay = document.querySelector("#replay");
  const letter = document.querySelector(".letter");
  let opening = false;
  let letterOpened = false;
  const openedWishes = new Set();

  if (reducedMotion.matches) ambientVideo.pause();
  reducedMotion.addEventListener("change", (event) => {
    if (event.matches) ambientVideo.pause();
    else ambientVideo.play().catch(() => {});
  });

  const scrollTo = (target) => {
    target.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  }, { threshold: .16, rootMargin: "0px 0px -8%" });

  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

  openGift.addEventListener("click", () => {
    if (opening) return;
    opening = true;
    openGift.disabled = true;
    body.classList.add("is-opening");
    const delay = reducedMotion.matches ? 20 : 720;
    window.setTimeout(() => {
      body.classList.add("is-open");
      story.setAttribute("aria-hidden", "false");
      body.classList.remove("is-opening");
      window.scrollTo({ top: 0, behavior: "auto" });
    }, delay);
  });

  beginWishes.addEventListener("click", () => scrollTo(document.querySelector("#wishes")));

  wishButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.wish;
      const isOpen = button.classList.toggle("is-picked");
      button.setAttribute("aria-expanded", String(isOpen));
      if (isOpen) openedWishes.add(index);
      else openedWishes.delete(index);
      wishCount.textContent = String(openedWishes.size);
      if (isOpen) burstFrom(button, 9);
      if (openedWishes.size === wishButtons.length) {
        window.setTimeout(() => scrollTo(document.querySelector("#bridge")), reducedMotion.matches ? 0 : 850);
      }
    });
  });

  openLetter.addEventListener("click", () => {
    if (letterOpened) return;
    letterOpened = true;
    envelope.classList.add("is-open");
    letter.setAttribute("aria-hidden", "false");
    finish.hidden = false;
    window.setTimeout(() => finish.focus({ preventScroll: true }), reducedMotion.matches ? 10 : 1450);
    burstFrom(openLetter, 18);
  });

  finish.addEventListener("click", () => {
    scrollTo(document.querySelector("#finale"));
    window.setTimeout(() => shower(54), reducedMotion.matches ? 0 : 650);
  });

  replay.addEventListener("click", () => {
    wishButtons.forEach((button) => {
      button.classList.remove("is-picked");
      button.setAttribute("aria-expanded", "false");
    });
    openedWishes.clear();
    wishCount.textContent = "0";
    envelope.classList.remove("is-open");
    letter.setAttribute("aria-hidden", "true");
    finish.hidden = true;
    letterOpened = false;
    scrollTo(document.querySelector("#story .intro"));
  });

  const updateParallax = (event) => {
    const x = (event.clientX / window.innerWidth - .5) * 2;
    const y = (event.clientY / window.innerHeight - .5) * 2;
    body.style.setProperty("--px", x.toFixed(3));
    body.style.setProperty("--py", y.toFixed(3));
  };
  if (!reducedMotion.matches && window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("pointermove", updateParallax, { passive: true });
  }

  const canvas = document.querySelector("#petal-canvas");
  const context = canvas.getContext("2d");
  let particles = [];
  let frame = 0;

  const resizeCanvas = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * ratio);
    canvas.height = Math.round(window.innerHeight * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const colors = ["#f58f9d", "#ffd566", "#fff9dc", "#c9a9e3"];

  const addParticle = (x, y, spread = 1) => {
    particles.push({
      x,
      y,
      vx: (Math.random() - .5) * 3.2 * spread,
      vy: (-1.2 - Math.random() * 2.8) * spread,
      gravity: .035 + Math.random() * .025,
      spin: (Math.random() - .5) * .15,
      angle: Math.random() * Math.PI,
      size: 5 + Math.random() * 8,
      life: 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  };

  const drawParticle = (particle) => {
    context.save();
    context.globalAlpha = Math.max(0, particle.life);
    context.translate(particle.x, particle.y);
    context.rotate(particle.angle);
    context.fillStyle = particle.color;
    context.beginPath();
    context.ellipse(0, 0, particle.size, particle.size * .48, 0, 0, Math.PI * 2);
    context.fill();
    context.restore();
  };

  const animate = () => {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += particle.gravity;
      particle.angle += particle.spin;
      particle.life -= .012;
      drawParticle(particle);
    });
    particles = particles.filter((particle) => particle.life > 0 && particle.y < window.innerHeight + 40);
    if (particles.length) frame = requestAnimationFrame(animate);
    else frame = 0;
  };

  const startAnimation = () => {
    if (!frame && !reducedMotion.matches) frame = requestAnimationFrame(animate);
  };

  function burstFrom(element, amount) {
    if (reducedMotion.matches) return;
    const rect = element.getBoundingClientRect();
    for (let i = 0; i < amount; i += 1) addParticle(rect.left + rect.width / 2, rect.top + rect.height / 2, 1.1);
    startAnimation();
  }

  function shower(amount) {
    if (reducedMotion.matches) return;
    for (let i = 0; i < amount; i += 1) {
      const particle = {
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * window.innerHeight * .5,
        vx: (Math.random() - .5) * 1.5,
        vy: 1.4 + Math.random() * 2.2,
        gravity: .008,
        spin: (Math.random() - .5) * .1,
        angle: Math.random() * Math.PI,
        size: 5 + Math.random() * 10,
        life: 1.5 + Math.random() * .6,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
      particles.push(particle);
    }
    startAnimation();
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas, { passive: true });
})();
