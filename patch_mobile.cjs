const fs = require('fs');

let hero = fs.readFileSync('src/components/HopStormHero.tsx', 'utf8');

// 1. DEVICE DETECTION (once at mount)
hero = hero.replace(
  /const containerRef = useRef<HTMLElement>\(null\);/,
  `const containerRef = useRef<HTMLElement>(null);\n  const isMobileRef = useRef<boolean>(false);\n  useEffect(() => {\n    isMobileRef.current = window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(hover: none) and (pointer: coarse)").matches;\n  }, []);`
);

// 2. THE MOBILE FRAME SET & CONFIG
hero = hero.replace(/const FRAME_IDS = \[/, "const FRAME_IDS_DESKTOP = [");
hero = hero.replace(
  /const N = FRAME_IDS\.length;/g,
  `const FRAME_IDS_MOBILE = [
      "ryu8ra","f4x9c8","rd71cf","ghg6y9","zlx2td","wavlcl","aiyfgg","br7vgb",
      "nh8vqb","p5lbuc","garf8r","qzjgbn","d2ymcm","ljs0kj","cnhnnf","mn6z5y",
      "bqfluh","t58cbf","uoleb1","rq2e2a","rbvtn3","bctwmp","skuakp","srneyy",
      "ya9ipn","jauvfl","jmrcj9","b0q7mg","oryb8c","sghxqj","oehimx","rtbm41",
      "j6xyxn","f0icwe","v1ewxz","fajtrr","o51k8l","kqpkhu","wdnteg","aihmre",
      "t3ix5m","jhkpsv","gkrtyr","h7vphn","oryy45","rmtwlz","olxhpv","axpsfx",
      "r6ffsq","tjlxg9","petotu","terzka","rupxmn","uto5jn","nedpqr","rdm0i1",
      "nb4kdq","g1od4h","uflpl7","dv0yf3","sjlmpy","ipcvos","x2c0mn","buafgu",
      "cxykz5","mxczpi","up3aly","kklpx8","nri19g","plcagt","k8zt6b","wfxzib",
      "abvcim","wv89gb","rkpx8r","fukocb","kz5ujf","rxdc6y","yqcpju","jjawnr",
      "blokmg","cl3xrs","topdtl","owxenj","xfpxcq","madqxa","e4rim6","rbeujg",
      "ej7tph","nmc8l6","qzhhyj","qacqhw","thuunm","m4dkmg","a1bxwx","togx7n",
      "ivipdf","z0zr28","xqiwp0","aqhuht","h7u8u7","eab4xu","nshp5c","asqhuz",
      "awju5a","sqa8cf","wk0qd5","kgj02y","v9ub69","rotja2","mtxyut","gyftll",
      "imdabc","lyacou","bghcjj","w1dyy7","wlbgrs","ralayb","nckgkp","e3hq1z",
      "wh7rub","fuq3q0","e6rrmm","ssianz","zbxacb","h8vmop","iy691f","zulfec",
      "cvccve","yid2re","wloqn0","gm0lnp","yhw3yk","wzetpw","aptc30","bphowz",
      "uyolzx","nmxev6","r1vgjm","am9gny","ioyqc3","lteeur","q3otrz","x1bduk",
      "nfuj5j"
    ];
    const isMobile = isMobileRef.current;
    const IDS = isMobile ? FRAME_IDS_MOBILE : FRAME_IDS_DESKTOP;
    const N = IDS.length;`
);

hero = hero.replace(
  /fit: 0\.15,[\s]*focal: \{ x: 0\.5, y: 0\.45 \},/,
  `fit: isMobileRef.current ? 0.35 : 0.15,
      focal: isMobileRef.current ? { x: 0.5, y: 0.40 } : { x: 0.5, y: 0.45 },`
);

hero = hero.replace(
  /const frameUrl = \(i: number, w: number\) =>[\s]*`\$\{CONFIG\.cloudBase\}\/f_auto,q_100,e_sharpen:60,c_scale,w_\$\{w\}\/hf_\$\{String\(i \+ 1\)\.padStart\(4, "0"\)\}_\$\{FRAME_IDS\[i\]\}\.jpg`;/,
  `const frameUrl = (i: number, w: number) => {
      const transform = isMobile ? "f_auto,q_auto:good,e_sharpen:40" : "f_auto,q_100,e_sharpen:60";
      return \`\${CONFIG.cloudBase}/\${transform},c_scale,w_\${w}/hf_\${String(i + 1).padStart(4, "0")}_\${IDS[i]}.jpg\`;
    };`
);

hero = hero.replace(
  /const LADDER = \[960, 1280, 1600, 1920\];\n[\s]*const needed = Math\.ceil\(initialCw\);\n[\s]*const loadWidth = Math\.min\(1920, LADDER\.find\(w => w >= needed\) \?\? 1920\);/,
  `const LADDER = isMobile ? [540, 720, 900, 1080] : [960, 1280, 1600, 1920];
    const needed = Math.ceil(initialCw);
    const maxNative = isMobile ? 1080 : 1920;
    const loadWidth = Math.min(maxNative, LADDER.find(w => w >= needed) ?? maxNative);`
);

// 3. INTERACTION WITHOUT A CURSOR
const mouseMoveReplacement = `
    let startX = 0;
    let startXValue = 0;
    let axis: "x" | "y" | null = null;
    let lastTouchX = 0;
    let lastTouchY = 0;

    function onTouchStart(e: TouchEvent) {
      if (!isMobile) return;
      moved = true;
      startX = e.touches[0].clientX;
      lastTouchX = e.touches[0].clientX;
      lastTouchY = e.touches[0].clientY;
      startXValue = targetX;
      axis = null;
    }

    function onTouchMove(e: TouchEvent) {
      if (!isMobile) return;
      const touch = e.touches[0];
      const dx = touch.clientX - lastTouchX;
      const dy = touch.clientY - lastTouchY;
      
      if (!axis) {
        if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
          axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        }
      }
      
      if (axis === "x") {
        if (hero) hero.style.touchAction = "pan-y";
        const newTarget = startXValue + ((touch.clientX - startX) / innerWidth) * 1.6;
        targetX = Math.min(1, Math.max(0, newTarget));
      } else if (axis === "y") {
        // ignore for scrubbing
      }
    }

    function onTouchEnd() {
      if (!isMobile) return;
      axis = null;
    }
    
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
`;

hero = hero.replace(
  /window\.addEventListener\("pointermove", onMove, \{ passive: true \}\);\n[\s]*window\.addEventListener\("mousemove", onMove, \{ passive: true \}\);/,
  mouseMoveReplacement
);

// Idle sway replacement
const swayReplacement = `const isTouchOnly = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    function targetFrame() {
      if (isMobile && !moved) {
        const now = performance.now();
        targetX = 0.5 + 0.32 * Math.sin(now / 4200 * Math.PI * 2);
      } else if (isTouchOnly && !isMobile && !moved) {
        // Fallback for tablet if not considered mobile
        const phase = (performance.now() / 8000) * Math.PI * 2;
        const s = Math.sin(phase) * 0.6;
        const e = Math.sign(s) * Math.pow(Math.abs(s), CONFIG.easing);
        const a = CONFIG.anchors;
        return e < 0
          ? a.center + (a.left - a.center) * -e
          : a.center + (a.right - a.center) * e;
      }`;

hero = hero.replace(
  /const isTouchOnly = window\.matchMedia\("\(hover: none\) and \(pointer: coarse\)"\)\.matches;\n\n[\s]*function targetFrame\(\) \{\n[\s]*if \(isTouchOnly && !moved\) \{[\s]*const phase = \(performance\.now\(\) \/ 8000\) \* Math\.PI \* 2;[\s]*const s = Math\.sin\(phase\) \* 0\.6;[\s]*const e = Math\.sign\(s\) \* Math\.pow\(Math\.abs\(s\), CONFIG\.easing\);[\s]*const a = CONFIG\.anchors;[\s]*return e < 0[\s]*\? a\.center \+ \(a\.left - a\.center\) \* -e[\s]*: a\.center \+ \(a\.right - a\.center\) \* e;[\s]*\}/,
  swayReplacement
);


// 4b. LOADING BUDGET
const loadReplacement = `(async () => {
      await loadFrame(CONFIG.anchors.center);
      
      const order: number[] = [];
      const connection = (navigator as any).connection;
      const saveData = connection?.saveData || connection?.effectiveType === "2g" || connection?.effectiveType === "3g";
      
      if (isMobile) {
        if (saveData) {
          for (let i = 0; i < N; i += 2) order.push(i);
        } else {
          for (let i = 0; i < N; i += 4) order.push(i);
          for (let i = 0; i < N; i++) if (i % 4) order.push(i);
        }
      } else {
        for (let i = 0; i < N; i += 8) order.push(i);
        for (let i = 0; i < N; i++) if (i % 8) order.push(i);
      }
      
      const queue = order.slice();
      const concurrency = isMobile ? 4 : 6;
      const workers = Array.from({ length: concurrency }, async () => {
        while (queue.length) await loadFrame(queue.shift()!);
      });
      await Promise.all(workers);
    })();`;

hero = hero.replace(
  /\(async \(\) => \{\n[\s]*await loadFrame\(CONFIG\.anchors\.center\);\n[\s]*const order: number\[\] = \[\];\n[\s]*for \(let i = 0; i < N; i \+= 8\) order\.push\(i\);\n[\s]*for \(let i = 0; i < N; i\+\+\) if \(i % 8\) order\.push\(i\);\n[\s]*const queue = order\.slice\(\);\n[\s]*const workers = Array\.from\(\{ length: 6 \}, async \(\) => \{\n[\s]*while \(queue\.length\) await loadFrame\(queue\.shift\(\)!\);\n[\s]*\}\);\n[\s]*await Promise\.all\(workers\);\n[\s]*\}\)\(\);/,
  loadReplacement
);


hero = hero.replace(
  /window\.removeEventListener\("pointermove", onMove\);\n[\s]*window\.removeEventListener\("mousemove", onMove\);/,
  `window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);`
);

fs.writeFileSync('src/components/HopStormHero.tsx', hero);
