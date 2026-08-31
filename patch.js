const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/import \{ useState, useEffect \} from 'react';/, "import { useState, useEffect, useRef } from 'react';");
code = code.replace(/const \[intro, setIntro\] = useState\(true\);/, "const [step, setStep] = useState(0);\n  const stepRef = useRef(0);\n  const lastStepAt = useRef(0);");

code = code.replace(/value=\{\{ intro, reduced \}\}/, "value={{ step, reduced }}");

const searchEffect = /const html = document\.documentElement;.*?(?=window\.addEventListener\("scroll", monitorRearm, opts\);)/s;
const newEffect = `const html = document.documentElement;
    const prevHtml = html.style.overflow;
    const prevBody = document.body.style.overflow;
    const prevOverscroll = document.body.style.overscrollBehavior;

    let mounted = 0;
    let revealTime = 0;
    let maxScroll = 0;
    let rearmTimer: ReturnType<typeof setTimeout> | null = null;
    const opts = { passive: true } as AddEventListenerOptions;

    const arm = () => {
      mounted = Date.now();
      stepRef.current = 0;
      setStep(0);
      html.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "none";
      window.addEventListener("wheel", onWheel, opts);
      window.addEventListener("touchmove", onTouch, opts);
      window.addEventListener("scroll", onScroll, opts);
      window.addEventListener("keydown", onKey);
    };

    const disarm = () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      html.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
      document.body.style.overscrollBehavior = prevOverscroll;
    };

    const unlock = () => {
      disarm();
    };

    const COOLDOWN = 700;
    const advance = () => {
      const now = Date.now();
      if (now - mounted < 400) return;
      if (now - lastStepAt.current < COOLDOWN) return;
      if (stepRef.current >= 3) return;
      lastStepAt.current = now;
      stepRef.current += 1;
      setStep(stepRef.current);
      if (stepRef.current === 3) {
        revealTime = Date.now();
        setTimeout(unlock, 900);
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (stepRef.current >= 3) return;
      if (Math.abs(e.deltaY) < 2) return;
      advance();
    };
    const onTouch = () => { 
      if (stepRef.current >= 3) return;
      advance(); 
    };
    const onScroll = () => {
      if (stepRef.current >= 3) return;
      if (window.scrollY <= 0) return;
      advance();
    };
    const onKey = (e: KeyboardEvent) => {
      if (stepRef.current >= 3) return;
      if ([" ", "ArrowDown", "PageDown"].includes(e.key)) advance();
      if (e.key === "Tab") {
        lastStepAt.current = Date.now();
        stepRef.current = 3;
        setStep(3);
        revealTime = Date.now();
        setTimeout(unlock, 900);
      }
    };

    const monitorRearm = () => {
      if (stepRef.current < 3) return;
      if (Date.now() - revealTime < 900) return;

      maxScroll = Math.max(maxScroll, window.scrollY);
      if (maxScroll > 200 && window.scrollY <= 4) {
        if (!rearmTimer) {
          rearmTimer = setTimeout(() => {
            if (window.scrollY <= 4) {
              maxScroll = 0;
              arm();
            }
            rearmTimer = null;
          }, 400);
        }
      } else {
        if (rearmTimer) {
          clearTimeout(rearmTimer);
          rearmTimer = null;
        }
      }
    };

    arm();
    `;
code = code.replace(searchEffect, newEffect);
fs.writeFileSync('src/App.tsx', code);
