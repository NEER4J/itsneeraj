"use client";

import { useEffect } from "react";

// A faithful port of the "Pixel Pet" — a draggable pixel-art companion that
// docks to screen edges, tracks the cursor, walks, blinks, naps, and reacts.
export function Pet() {
  useEffect(() => {
    const pet = document.getElementById("pet") as HTMLDivElement | null;
    const svg = document.getElementById("petSvg") as SVGSVGElement | null;
    const rot = pet?.querySelector<HTMLElement>(".rot") ?? null;
    const bub = document.getElementById("petBub") as HTMLDivElement | null;
    if (!pet || !svg || !rot || !bub) return;

    let alive = true;
    const cleanups: Array<() => void> = [];
    const on = (
      t: EventTarget,
      type: string,
      fn: EventListener,
      opts?: boolean | AddEventListenerOptions,
    ) => {
      t.addEventListener(type, fn, opts);
      cleanups.push(() => t.removeEventListener(type, fn, opts));
    };
    const reflow = () => void svg.getBoundingClientRect();

    /* ======================= CONFIG ======================= */
    const CFG = {
      startEdge: "bottom" as Edge,
      startFrac: 0,
      margin: 22,
      peekCells: { idle: 12, alert: 15, sleep: 8, happy: 16, drag: 12 } as Record<string, number>,
      sleepAfter: 15000,
      remember: true,
      phrases: {
        greet: ["drag me!", "hi :3"],
        idle: ["mrrp", "im watching u", "nice cursor", "*stares*", "shipped anything?", "still here"],
        landed: ["ok. here.", "i live here now", "good spot", "mine now"],
        petted: ["prrr", "<3", ":D", "again!"],
        hop: ["hup!", "wheee"],
        wake: ["?!", "five more min"],
      },
    };

    /* ======================= SPRITE ==========================
       18 x 21 grid.  O outline · R body · M light · G green    */
    const BODY = [
      ".......OOOOOOO....",
      ".....OORRRRRRRO...",
      "....ORRRRRRRRRRO..",
      "...ORRRRRRRRRRRO..",
      "...ORRRRRRRRRRRRO.",
      "..ORRRRRRRRRRRRRO.",
      "..ORRRRRRRRRRRRRRO",
      "..ORRRRRRRRRRRRRRO",
      ".OORRRRRRRRRRRRRRO",
      "ORRRRRRRRRRRRRRRRO",
      "ORRRRRRRRRRRRRRRO.",
      ".ORRO.............",
      "..OO..............",
    ];
    const LEG_L = ["", "", "", "", "", "", "", "", "", "", "",
      ".....OORORO.......",
      "......ORORO.......",
      "......ORORO.......",
      ".......OORO.......",
      "........OMO.......",
      "......OOOGO.......",
      ".....OMGGMO.......",
      ".....OMMGMO.......",
      ".....OMMGGO.......",
      ".....OOOOOO.......",
    ];
    const LEG_R = ["", "", "", "", "", "", "", "", "", "", "",
      "..........OROROO..",
      "..........ORORO...",
      "..........ORORO...",
      "..........OROO....",
      "..........OMO.....",
      "..........OGOOO...",
      "..........OMGGMO..",
      "..........OMGMMO..",
      "..........OGGMMO..",
      "..........OOOOOO..",
    ];
    const BROW = ["", "", "", "......OO....OO...."];
    const BROW_UP = ["", "", "......OO....OO...."];
    const EYES: [number, number][] = [[6, 5], [12, 5]]; // top-left of each 3x3 eye
    const OX = 1.5; // centres the 18-wide sprite in the 21 box
    const COL: Record<string, string> = {
      O: "var(--c-line)",
      R: "var(--c-body)",
      M: "var(--c-mint)",
      G: "var(--c-green)",
    };

    /* ======================= BUILD ======================= */
    svg.innerHTML = "";
    const NS = "http://www.w3.org/2000/svg";
    const rect = (x: number, y: number, w: number, h: number, f: string) => {
      const r = document.createElementNS(NS, "rect");
      r.setAttribute("x", String(x));
      r.setAttribute("y", String(y));
      r.setAttribute("width", String(w));
      r.setAttribute("height", String(h));
      r.setAttribute("fill", f);
      return r;
    };
    const layer = (cls: string, map: string[]) => {
      const g = document.createElementNS(NS, "g");
      g.setAttribute("class", cls);
      map.forEach((row, y) => {
        let x = 0;
        while (x < row.length) {
          const ch = row[x];
          if (COL[ch]) {
            let e = x;
            while (row[e + 1] === ch) e++;
            g.appendChild(rect(OX + x, y, e - x + 1, 1, COL[ch]));
            x = e;
          }
          x++;
        }
      });
      svg.appendChild(g);
      return g;
    };

    layer("g-legL", LEG_L);
    layer("g-legR", LEG_R);
    layer("g-body", BODY);
    layer("g-brow", BROW);
    layer("g-browUp", BROW_UP);

    // worried brows — inner ends lifted
    const worry = document.createElementNS(NS, "g");
    worry.setAttribute("class", "g-browWorry");
    ([[6, 4], [7, 3], [12, 3], [13, 4]] as [number, number][]).forEach(([x, y]) =>
      worry.appendChild(rect(OX + x, y, 1, 1, COL.O)),
    );
    svg.appendChild(worry);

    // eyes + tracking glint
    const eyeG = document.createElementNS(NS, "g");
    eyeG.setAttribute("class", "g-eye");
    const glints: SVGRectElement[] = [];
    EYES.forEach(([ex, ey]) => {
      eyeG.appendChild(rect(OX + ex, ey, 3, 3, COL.O));
      const g = rect(OX + ex + 2, ey, 1, 1, "var(--c-glint)");
      eyeG.appendChild(g);
      glints.push(g);
    });
    svg.appendChild(eyeG);

    // closed eyes
    const lid = document.createElementNS(NS, "g");
    lid.setAttribute("class", "g-lid");
    EYES.forEach(([ex, ey]) => {
      lid.appendChild(rect(OX + ex, ey, 3, 3, COL.R));
      lid.appendChild(rect(OX + ex, ey + 1, 3, 1, COL.O));
    });
    svg.appendChild(lid);

    // happy ^ ^ eyes
    const hap = document.createElementNS(NS, "g");
    hap.setAttribute("class", "g-happy");
    EYES.forEach(([ex, ey]) => {
      hap.appendChild(rect(OX + ex, ey, 3, 3, COL.R));
      hap.appendChild(rect(OX + ex, ey + 2, 1, 1, COL.O));
      hap.appendChild(rect(OX + ex + 1, ey + 1, 1, 1, COL.O));
      hap.appendChild(rect(OX + ex + 2, ey + 2, 1, 1, COL.O));
    });
    svg.appendChild(hap);

    /* ======================= STATE ======================= */
    const ANG: Record<Edge, number> = { bottom: 0, top: 180, left: 90, right: -90 };
    const S = () => pet.offsetWidth;
    const CELL = () => S() / 21;

    let edge: Edge = CFG.startEdge;
    let frac = CFG.startFrac;
    let mode = "idle";
    let dragging = false;
    let moved = false;
    let px = 0;
    let py = 0;
    let gx = 0;
    let gy = 0;
    let lastX = 0;
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let lastMove = Date.now();
    let rub = 0;
    let booting = document.documentElement.classList.contains("preload");
    let loadInt: ReturnType<typeof setInterval> | null = null;

    if (CFG.remember)
      try {
        const s = JSON.parse(localStorage.getItem("pixelPet") || "null");
        if (s && ANG[s.edge as Edge] !== undefined) {
          edge = s.edge;
          frac = +s.frac || 0;
        }
      } catch {}
    const save = () => {
      if (CFG.remember)
        try {
          localStorage.setItem("pixelPet", JSON.stringify({ edge, frac }));
        } catch {}
    };

    /* ======================= DOCKING ======================= */
    const range = (e: Edge) =>
      Math.max(
        1,
        (e === "bottom" || e === "top" ? window.innerWidth : window.innerHeight) - S() - CFG.margin * 2,
      );

    function dockXY(e: Edge, f: number, peek: number): [number, number] {
      const c = CFG.margin + f * range(e);
      if (e === "bottom") return [c, window.innerHeight - peek];
      if (e === "top") return [c, peek - S()];
      if (e === "left") return [peek - S(), c];
      return [window.innerWidth - peek, c];
    }
    const place = (x: number, y: number) => {
      px = x;
      py = y;
      pet!.style.left = x + "px";
      pet!.style.top = y + "px";
    };

    function dock(animate = true) {
      const cells = CFG.peekCells[mode] ?? CFG.peekCells.idle;
      pet!.classList.toggle("docking", animate);
      rot!.style.transform = `rotate(${ANG[edge]}deg)`;
      place(...dockXY(edge, frac, cells * CELL()));
      bubblePos();
    }
    const nearestEdge = (cx: number, cy: number): Edge =>
      (
        [
          ["top", cy],
          ["bottom", window.innerHeight - cy],
          ["left", cx],
          ["right", window.innerWidth - cx],
        ] as [Edge, number][]
      ).sort((a, b) => a[1] - b[1])[0][0];

    /* ======================= MODES ======================= */
    function setMode(m: string) {
      if (mode === m) return;
      mode = m;
      svg!.classList.toggle("alert", m === "alert");
      svg!.classList.toggle("worry", m === "drag");
      svg!.classList.toggle("dangle", m === "drag");
      svg!.classList.toggle("happy", m === "happy");
      if (m === "sleep") svg!.classList.add("blink");
      else svg!.classList.remove("blink");
    }

    /* ======================= WALK ======================= */
    let stepT: ReturnType<typeof setInterval> | null = null;
    function walk(steps = 4) {
      if (stepT) clearInterval(stepT);
      let n = 0;
      let flip = false;
      stepT = setInterval(() => {
        flip = !flip;
        svg!.classList.toggle("step", flip);
        svg!.classList.toggle("step2", !flip);
        if (++n >= steps) {
          if (stepT) clearInterval(stepT);
          svg!.classList.remove("step", "step2");
        }
      }, 130);
    }
    cleanups.push(() => {
      if (stepT) clearInterval(stepT);
    });

    /* ======================= BLINK ======================= */
    let blinkTid: ReturnType<typeof setTimeout> | null = null;
    (function blinkLoop() {
      blinkTid = setTimeout(() => {
        if (!alive) return;
        if (mode === "idle" || mode === "alert") {
          svg!.classList.add("blink");
          setTimeout(() => {
            if (alive && mode !== "sleep") svg!.classList.remove("blink");
          }, 150);
        }
        blinkLoop();
      }, 2400 + Math.random() * 3600);
    })();
    cleanups.push(() => {
      if (blinkTid) clearTimeout(blinkTid);
    });

    /* ======================= EYE TRACKING ======================= */
    function look() {
      if (mode === "sleep") return;
      const r = pet!.getBoundingClientRect();
      const dx = mouse.x - (r.left + r.width / 2);
      const dy = mouse.y - (r.top + r.height / 2);
      const a = booting ? 0 : (-ANG[edge] * Math.PI) / 180; // undo the edge rotation
      let lx = dx * Math.cos(a) - dy * Math.sin(a);
      let ly = dx * Math.sin(a) + dy * Math.cos(a);
      if (mode === "drag") {
        lx = 0;
        ly = 1;
      }
      const len = Math.hypot(lx, ly) || 1;
      const ox = Math.round(Math.max(-1, Math.min(1, (lx / len) * 1.6))) + 1; // 0..2
      const oy = Math.round(Math.max(0, Math.min(1, (ly / len) * 1.6 + 0.15))); // 0..1
      glints.forEach((g, i) => {
        g.setAttribute("x", String(OX + EYES[i][0] + ox));
        g.setAttribute("y", String(EYES[i][1] + oy));
      });
      if (mode !== "drag") {
        const t = lx / len;
        svg!.style.setProperty("--tilt", (t > 0.5 ? 4 : t < -0.5 ? -4 : 0) + "deg");
      }
    }

    /* ======================= BUBBLE ======================= */
    let bubT: ReturnType<typeof setTimeout> | null = null;
    function bubblePos() {
      bub!.dataset.tail = ({ bottom: "down", top: "up", left: "left", right: "right" } as Record<Edge, string>)[edge];
      bub!.style.left = bub!.style.right = bub!.style.top = bub!.style.bottom = "";
      if (edge === "bottom") {
        bub!.style.left = "64%";
        bub!.style.bottom = "58%";
      }
      if (edge === "top") {
        bub!.style.left = "64%";
        bub!.style.top = "58%";
      }
      if (edge === "left") {
        bub!.style.left = "58%";
        bub!.style.top = "22%";
      }
      if (edge === "right") {
        bub!.style.right = "58%";
        bub!.style.top = "22%";
      }
    }
    function say(list: string[] | string, ms = 2100) {
      bub!.textContent = Array.isArray(list) ? list[Math.floor(Math.random() * list.length)] : list;
      bub!.classList.add("on");
      if (bubT) clearTimeout(bubT);
      bubT = setTimeout(() => bub!.classList.remove("on"), ms);
    }
    cleanups.push(() => {
      if (bubT) clearTimeout(bubT);
    });

    /* ======================= PARTICLES ======================= */
    function puff(txt: string, n: number, color: string) {
      const r = pet!.getBoundingClientRect();
      for (let i = 0; i < n; i++) {
        const el = document.createElement("div");
        el.className = "pet-part";
        el.textContent = txt;
        el.style.color = color;
        el.style.left =
          Math.max(6, Math.min(window.innerWidth - 22, r.left + r.width * (0.3 + Math.random() * 0.4))) + "px";
        el.style.top = Math.max(6, Math.min(window.innerHeight - 18, r.top + r.height * 0.22)) + "px";
        el.style.setProperty("--dx", Math.random() * 30 - 15 + "px");
        el.style.animationDelay = i * 0.11 + "s";
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 2000);
      }
    }

    /* ======================= REACTIONS ======================= */
    function beHappy(phrase?: string[] | string) {
      setMode("happy");
      puff("♥", 3, "var(--heart)");
      if (phrase) say(phrase);
      svg!.classList.remove("squash");
      reflow();
      svg!.classList.add("squash");
      dock(true);
      setTimeout(() => {
        if (alive && mode === "happy") {
          setMode("idle");
          dock(true);
        }
      }, 1250);
    }
    function wake() {
      if (mode !== "sleep") return;
      setMode("alert");
      say(CFG.phrases.wake, 900);
      dock(true);
      walk(2);
    }

    /* ======================= POINTER ======================= */
    on(pet, "pointerdown", ((e: PointerEvent) => {
      if (booting) return;
      e.preventDefault();
      pet.setPointerCapture(e.pointerId);
      dragging = true;
      moved = false;
      const r = pet.getBoundingClientRect();
      gx = e.clientX - r.left;
      gy = e.clientY - r.top;
      lastX = e.clientX;
      document.body.style.userSelect = "none";
    }) as EventListener);

    on(pet, "pointermove", ((e: PointerEvent) => {
      if (!dragging) return;
      if (!moved && Math.hypot(e.clientX - (px + gx), e.clientY - (py + gy)) < 5) return;
      if (!moved) {
        moved = true;
        setMode("drag");
        pet.classList.add("st-drag");
        pet.classList.remove("docking");
        rot.style.transform = "rotate(0deg)";
        bub.classList.remove("on");
      }
      const vx = e.clientX - lastX;
      lastX = e.clientX;
      svg.style.setProperty("--tilt", Math.max(-15, Math.min(15, vx * 1.5)) + "deg");
      place(e.clientX - gx, e.clientY - gy);
    }) as EventListener);

    function drop() {
      document.body.style.userSelect = "";
      pet!.classList.remove("st-drag");
      if (!dragging) return;
      dragging = false;

      if (!moved) {
        beHappy(CFG.phrases.petted);
        return;
      }

      edge = nearestEdge(px + S() / 2, py + S() / 2);
      const c = edge === "bottom" || edge === "top" ? px : py;
      frac = Math.max(0, Math.min(1, (c - CFG.margin) / range(edge)));
      save();
      setMode("idle");
      svg!.style.setProperty("--tilt", "0deg");
      dock(true);
      pet!.addEventListener("transitionend", function land(ev) {
        if (ev.propertyName !== "left" && ev.propertyName !== "top") return;
        pet!.removeEventListener("transitionend", land);
        if (!alive) return;
        svg!.classList.remove("squash");
        reflow();
        svg!.classList.add("squash");
        setTimeout(() => {
          if (alive) walk(4);
        }, 300);
        if (Math.random() < 0.55) say(CFG.phrases.landed);
      });
    }
    on(pet, "pointerup", drop as EventListener);
    on(pet, "pointercancel", drop as EventListener);

    on(pet, "dblclick", (() => {
      svg.classList.remove("hop");
      reflow();
      svg.classList.add("hop");
      say(CFG.phrases.hop, 1100);
      puff("★", 2, "var(--star)");
    }) as EventListener);

    /* ======================= CURSOR ======================= */
    on(
      window,
      "pointermove",
      ((e: PointerEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        lastMove = Date.now();
        if (booting) return; // eyes still track, but no docking/reactions yet
        const r = pet.getBoundingClientRect();
        const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));

        if (mode === "sleep" && d < 150) wake();
        if (!dragging && (mode === "idle" || mode === "alert")) {
          const want = d < 140 ? "alert" : "idle";
          if (want !== mode) {
            setMode(want);
            dock(true);
            if (want === "alert") walk(2);
          }
        }
        if (d < 60 && !dragging) {
          if (++rub > 24) {
            rub = -50;
            beHappy("prrr");
          }
        } else if (rub > 0) rub--;
      }) as EventListener,
      { passive: true },
    );

    /* ======================= IDLE LOOP ======================= */
    const idleInt = setInterval(() => {
      if (!alive || booting) return;
      const idleFor = Date.now() - lastMove;
      if (mode === "idle" && idleFor > CFG.sleepAfter) {
        setMode("sleep");
        dock(true);
      }
      if (mode === "sleep") puff("z", 1, "var(--zzz)");
      else if (mode === "idle" && idleFor > 5000 && Math.random() < 0.2) say(CFG.phrases.idle);
    }, 1900);
    cleanups.push(() => clearInterval(idleInt));

    let rafId = 0;
    (function loop() {
      if (!alive) return;
      look();
      rafId = requestAnimationFrame(loop);
    })();
    cleanups.push(() => cancelAnimationFrame(rafId));

    /* ======================= KEYBOARD ======================= */
    on(pet, "keydown", ((e: KeyboardEvent) => {
      const along = edge === "bottom" || edge === "top" ? ["ArrowLeft", "ArrowRight"] : ["ArrowUp", "ArrowDown"];
      if (e.key === "Enter" || e.key === " ") {
        beHappy(CFG.phrases.petted);
        e.preventDefault();
      } else if (along.includes(e.key)) {
        frac = Math.max(0, Math.min(1, frac + (e.key === "ArrowRight" || e.key === "ArrowDown" ? 0.08 : -0.08)));
        save();
        dock(true);
        walk(3);
        e.preventDefault();
      } else if (e.key.startsWith("Arrow")) {
        edge = ({ ArrowUp: "top", ArrowDown: "bottom", ArrowLeft: "left", ArrowRight: "right" } as Record<string, Edge>)[
          e.key
        ];
        save();
        setMode("idle");
        dock(true);
        e.preventDefault();
      }
    }) as EventListener);

    /* ======================= BOOT / LOADING ======================= */
    function centerPet() {
      pet!.classList.remove("docking");
      rot!.style.transform = "rotate(0deg)";
      svg!.style.setProperty("--tilt", "0deg");
      place(
        Math.round(window.innerWidth / 2 - S() / 2),
        Math.round(window.innerHeight / 2 - S() / 2),
      );
    }
    function startLoading() {
      centerPet();
      bub!.dataset.tail = "down";
      bub!.style.left = "64%";
      bub!.style.right = "";
      bub!.style.top = "";
      bub!.style.bottom = "58%";
      bub!.textContent = "loading";
      bub!.classList.add("on");
      let dots = 0;
      loadInt = setInterval(() => {
        dots = (dots + 1) % 4;
        bub!.textContent = "loading" + ".".repeat(dots);
      }, 380);
    }
    function reveal() {
      if (!booting) return;
      booting = false;
      if (loadInt) {
        clearInterval(loadInt);
        loadInt = null;
      }
      bub!.classList.remove("on");
      setMode("idle");
      dock(true); // fly from center to its edge
      setTimeout(() => {
        if (alive) say(CFG.phrases.greet, 2200);
      }, 750);
    }
    cleanups.push(() => {
      if (loadInt) clearInterval(loadInt);
    });

    on(window, "resize", (() => {
      if (booting) centerPet();
      else dock(false);
    }) as EventListener);

    if (booting) {
      startLoading();
      on(window, "pet:reveal", (() => reveal()) as EventListener);
    } else {
      dock(false);
      const greetT = setTimeout(() => say(CFG.phrases.greet, 2400), 800);
      cleanups.push(() => clearTimeout(greetT));
    }

    return () => {
      alive = false;
      cleanups.forEach((c) => c());
    };
  }, []);

  return (
    <div
      id="pet"
      role="img"
      tabIndex={0}
      aria-label="Pixel companion. Click to pet it, drag it to an edge, arrow keys to move it."
    >
      <div className="rot">
        <svg id="petSvg" viewBox="0 0 21 21" aria-hidden="true" />
      </div>
      <div className="bub" id="petBub" data-tail="down" />
    </div>
  );
}

type Edge = "bottom" | "top" | "left" | "right";
