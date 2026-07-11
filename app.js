function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  useEffect,
  useRef
} = React;
const NAVY = "#1B2A4A";
const GOLD = "#C8A951";
const SLATE = "#64748B";
const DARK = "#0a0f1e";
const DARK2 = "#0f1629";
const WHITE = "#FFFFFF";
const TEAL = "#0D9488";
const AMBER = "#F59E0B";
const GREEN = "#22C55E";
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, {
      threshold
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}
function Counter({
  end,
  suffix = "",
  prefix = "",
  duration = 2000
}) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useInView(0.3);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, end, duration]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref
  }, prefix, count.toLocaleString(), suffix);
}
function Fade({
  children,
  delay = 0,
  className = ""
}) {
  const [ref, visible] = useInView(0.08);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: className,
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(36px)",
      transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`
    }
  }, children);
}
function GoldLine({
  width = 60
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height: 3,
      background: GOLD,
      borderRadius: 2,
      margin: "0 auto 20px"
    }
  });
}
function ModuleCard({
  icon,
  title,
  desc,
  index
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement(Fade, {
    delay: index * 0.05
  }, /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      background: h ? `linear-gradient(135deg, ${NAVY}, #243B6A)` : DARK2,
      border: `1px solid ${h ? GOLD : "#1f2937"}`,
      borderRadius: 14,
      padding: "28px 24px",
      cursor: "default",
      transition: "all 0.35s ease",
      transform: h ? "translateY(-4px)" : "translateY(0)",
      boxShadow: h ? "0 16px 32px rgba(200,169,81,0.1)" : "none",
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 26,
      marginBottom: 14
    }
  }, icon), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 17,
      color: h ? GOLD : WHITE,
      marginBottom: 8,
      transition: "color 0.3s",
      fontWeight: 700
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      color: SLATE,
      fontSize: 13.5,
      lineHeight: 1.7,
      flex: 1,
      fontFamily: "'DM Sans', sans-serif"
    }
  }, desc), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      height: 2,
      background: h ? GOLD : "transparent",
      transition: "all 0.4s",
      borderRadius: 1,
      width: h ? "50%" : "0%"
    }
  })));
}
function StepCard({
  num,
  title,
  desc,
  frameworks,
  active,
  onClick
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      background: active ? `linear-gradient(135deg, ${NAVY}, #1E3158)` : "rgba(255,255,255,0.02)",
      border: `1px solid ${active ? GOLD : "rgba(255,255,255,0.06)"}`,
      borderRadius: 14,
      padding: active ? "24px 22px" : "18px 22px",
      cursor: "pointer",
      transition: "all 0.3s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: "50%",
      background: active ? GOLD : "rgba(200,169,81,0.12)",
      color: active ? DARK : GOLD,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 800,
      fontSize: 14,
      fontFamily: "'DM Sans', sans-serif",
      transition: "all 0.3s",
      flexShrink: 0
    }
  }, num), /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 16,
      color: active ? GOLD : WHITE,
      transition: "color 0.3s",
      margin: 0,
      fontWeight: 600
    }
  }, title)), active && /*#__PURE__*/React.createElement("div", {
    style: {
      paddingLeft: 48,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#94A3B8",
      fontSize: 14,
      lineHeight: 1.7,
      margin: "0 0 14px",
      fontFamily: "'DM Sans', sans-serif"
    }
  }, desc), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8
    }
  }, frameworks.map(f => /*#__PURE__*/React.createElement("span", {
    key: f,
    style: {
      padding: "4px 12px",
      borderRadius: 20,
      fontSize: 11,
      background: "rgba(200,169,81,0.1)",
      color: GOLD,
      border: "1px solid rgba(200,169,81,0.2)",
      fontWeight: 600
    }
  }, f)))));
}
function PrincipleCard({
  icon,
  title,
  desc,
  index
}) {
  return /*#__PURE__*/React.createElement(Fade, {
    delay: index * 0.1
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "0 8px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      borderRadius: "50%",
      border: `2px solid ${GOLD}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 16px",
      fontSize: 26
    }
  }, icon), /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: "'Playfair Display', serif",
      color: GOLD,
      fontSize: 15,
      marginBottom: 8,
      fontWeight: 700,
      letterSpacing: 0.8
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      color: SLATE,
      fontSize: 13,
      lineHeight: 1.7,
      fontFamily: "'DM Sans', sans-serif",
      maxWidth: 220,
      margin: "0 auto"
    }
  }, desc)));
}

function FreedomGapSection() {
  const [years, setYears] = useState(20);
  const [probe, setProbe] = useState(null);
  const [mob, setMob] = useState(false);
  const [startStr, setStartStr] = useState("100,000");
  const wrapRef = useRef(null);
  useEffect(() => {
    const check = () => setMob(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const onStart = (e) => {
    const digits = e.target.value.replace(/[^0-9]/g, "").slice(0, 8);
    setStartStr(digits ? Number(digits).toLocaleString() : "");
  };
  const START = Math.max(100, Number(startStr.replace(/,/g, "")) || 0);
  const AVG = 0.045;
  const TGT = 0.2;
  const fv = (r, t) => START * Math.pow(1 + r, t);
  const avgEnd = fv(AVG, years);
  const tgtEnd = fv(TGT, years);
  const gap = tgtEnd - avgEnd;
  const fmtC = (v) => v >= 1e9 ? "$" + (v / 1e9).toFixed(2) + "B" : v >= 1e6 ? "$" + (v / 1e6).toFixed(2) + "M" : v >= 1e3 ? "$" + Math.round(v / 1e3) + "K" : "$" + Math.round(v);
  const fmtTick = (v) => v >= 1e9 ? "$" + parseFloat((v / 1e9).toFixed(1)) + "B" : v >= 1e6 ? "$" + parseFloat((v / 1e6).toFixed(1)) + "M" : "$" + Math.round(v / 1e3) + "K";
  const fmtFull = (v) => "$" + Math.round(v).toLocaleString();
  const monthlyIncome = (v) => Math.round(v * 0.04 / 12);
  const rm = AVG / 12;
  const catchUp = gap * rm / (Math.pow(1 + rm, years * 12) - 1);
  const W = mob ? 400 : 760, H = mob ? 400 : 340, padL = mob ? 52 : 74, padR = mob ? 70 : 104, padT = 24, padB = 42;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const yMax = tgtEnd * 1.06;
  const xAt = (t) => padL + t / years * plotW;
  const yAt = (v) => padT + plotH - v / yMax * plotH;
  const linePts = (r) => {
    const pts = [];
    for (let i = 0; i <= 96; i++) {
      const t = i / 96 * years;
      pts.push(xAt(t).toFixed(1) + "," + yAt(fv(r, t)).toFixed(1));
    }
    return pts.join(" ");
  };
  const rawStep = yMax / 4;
  const mag = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= rawStep);
  const yTicks = [];
  for (let v = step; v <= yMax; v += step) yTicks.push(v);
  const xStep = mob ? years > 15 ? 10 : 5 : years > 15 ? 5 : years > 8 ? 2 : 1;
  const xTicks = [];
  for (let t = xStep; t <= years; t += xStep) xTicks.push(t);
  const onMove = (e) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const fx = (e.clientX - rect.left) / rect.width * W;
    const t = Math.max(0, Math.min(years, Math.round((fx - padL) / plotW * years)));
    setProbe(t);
  };
  const probeT = probe == null ? null : probe;
  const AXIS = "#334155";
  const GRID = "rgba(148,163,184,0.10)";
  const INK = "#E2E8F0";
  return /* @__PURE__ */ React.createElement("section", { id: "the-gap", style: { padding: "100px 24px", background: DARK2 } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 980, margin: "0 auto" } }, /* @__PURE__ */ React.createElement(Fade, null, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 48 } }, /* @__PURE__ */ React.createElement(GoldLine, null), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: GOLD, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 14 } }, "The Cost of Average"), /* @__PURE__ */ React.createElement("h2", { className: "gap-h2", style: { fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 700, marginBottom: 10, color: WHITE } }, "Same ", fmtC(START), ". Same Market. A Different Life."), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Playfair Display', serif", fontSize: 18, color: GOLD, fontWeight: 400, fontStyle: "italic", marginBottom: 14 } }, "A few percentage points feels like decimal dust. Compounded, it's everything."), /* @__PURE__ */ React.createElement("p", { style: { color: SLATE, fontSize: 15, maxWidth: 620, margin: "0 auto", lineHeight: 1.7 } }, "The typical investor nets 4\u20135% a year after fees, taxes, and behavior. The Alpha Engine's stated goal is 2\xD7 the market. Enter your number, drag the timeline, and watch what that gap actually buys."))), /* @__PURE__ */ React.createElement(Fade, { delay: 0.1 }, /* @__PURE__ */ React.createElement("div", { style: { background: DARK, border: "1px solid rgba(200,169,81,0.18)", borderRadius: 20, padding: "36px 32px 28px" } }, /* @__PURE__ */ React.createElement("div", { className: "gap-stats", style: { display: "flex", justifyContent: "center", gap: 56, flexWrap: "wrap", marginBottom: 28, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: SLATE, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600, marginBottom: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { display: "inline-block", width: 9, height: 9, borderRadius: "50%", background: SLATE, marginRight: 7, verticalAlign: "middle" } }), "The average path \xB7 4.5%/yr"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 800, color: "#94A3B8", lineHeight: 1 } }, fmtC(avgEnd))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: GOLD, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600, marginBottom: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { display: "inline-block", width: 9, height: 9, borderRadius: "50%", background: GOLD, marginRight: 7, verticalAlign: "middle" } }), "Ekantik target pace \xB7 2\xD7 market"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 800, color: WHITE, lineHeight: 1 } }, fmtC(tgtEnd)))), /* @__PURE__ */ React.createElement("div", { ref: wrapRef, onPointerMove: onMove, onPointerLeave: () => setProbe(null), style: { position: "relative", cursor: "crosshair" } }, /* @__PURE__ */ React.createElement("svg", { viewBox: `0 0 ${W} ${H}`, style: { width: "100%", height: "auto", display: "block" }, "aria-label": `Growth of ${fmtC(START)} over ${years} years: 4.5% per year reaches ${fmtC(avgEnd)}, the 2\xD7 market target pace illustrated at 20% per year reaches ${fmtC(tgtEnd)}.` }, yTicks.map((v) => /* @__PURE__ */ React.createElement("g", { key: v }, /* @__PURE__ */ React.createElement("line", { x1: padL, x2: W - padR, y1: yAt(v), y2: yAt(v), stroke: GRID, strokeWidth: "1" }), /* @__PURE__ */ React.createElement("text", { x: padL - 10, y: yAt(v) + 4, textAnchor: "end", fontSize: "11", fill: SLATE, fontFamily: "'DM Sans', sans-serif" }, fmtTick(v)))), /* @__PURE__ */ React.createElement("line", { x1: padL, x2: W - padR, y1: padT + plotH, y2: padT + plotH, stroke: AXIS, strokeWidth: "1" }), xTicks.map((t) => /* @__PURE__ */ React.createElement("text", { key: t, x: xAt(t), y: padT + plotH + 20, textAnchor: "middle", fontSize: "11", fill: SLATE, fontFamily: "'DM Sans', sans-serif" }, "Yr " + t)), /* @__PURE__ */ React.createElement("polygon", { points: `${padL},${yAt(0)} ${linePts(TGT)} ${W - padR},${yAt(0)}`, fill: GOLD, opacity: "0.09" }), /* @__PURE__ */ React.createElement("polyline", { points: linePts(AVG), fill: "none", stroke: SLATE, strokeWidth: "2", strokeLinejoin: "round", strokeLinecap: "round" }), /* @__PURE__ */ React.createElement("polyline", { points: linePts(TGT), fill: "none", stroke: GOLD, strokeWidth: "2.5", strokeLinejoin: "round", strokeLinecap: "round" }), probeT != null && /* @__PURE__ */ React.createElement("g", null, /* @__PURE__ */ React.createElement("line", { x1: xAt(probeT), x2: xAt(probeT), y1: padT, y2: padT + plotH, stroke: "rgba(226,232,240,0.25)", strokeWidth: "1" }), /* @__PURE__ */ React.createElement("circle", { cx: xAt(probeT), cy: yAt(fv(TGT, probeT)), r: "5", fill: GOLD, stroke: DARK, strokeWidth: "2" }), /* @__PURE__ */ React.createElement("circle", { cx: xAt(probeT), cy: yAt(fv(AVG, probeT)), r: "5", fill: SLATE, stroke: DARK, strokeWidth: "2" })), /* @__PURE__ */ React.createElement("circle", { cx: W - padR, cy: yAt(tgtEnd), r: "5.5", fill: GOLD, stroke: DARK, strokeWidth: "2" }), /* @__PURE__ */ React.createElement("circle", { cx: W - padR, cy: yAt(avgEnd), r: "5.5", fill: SLATE, stroke: DARK, strokeWidth: "2" }), /* @__PURE__ */ React.createElement("text", { x: W - padR + 12, y: yAt(tgtEnd) + 5, fontSize: "14", fontWeight: "700", fill: INK, fontFamily: "'DM Sans', sans-serif" }, fmtC(tgtEnd)), /* @__PURE__ */ React.createElement("text", { x: W - padR + 12, y: yAt(avgEnd) + 5, fontSize: "13", fontWeight: "600", fill: "#94A3B8", fontFamily: "'DM Sans', sans-serif" }, fmtC(avgEnd))), probeT != null && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: `${Math.min(82, Math.max(8, xAt(probeT) / W * 100))}%`, top: 0, transform: "translateX(-50%)", background: "rgba(10,15,30,0.96)", border: "1px solid rgba(200,169,81,0.3)", borderRadius: 10, padding: "10px 14px", pointerEvents: "none", whiteSpace: "nowrap", fontSize: 12.5, lineHeight: 1.8, zIndex: 5 } }, /* @__PURE__ */ React.createElement("div", { style: { color: INK, fontWeight: 700, marginBottom: 2 } }, "Year ", probeT), /* @__PURE__ */ React.createElement("div", { style: { color: "#CBD5E1" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: GOLD, marginRight: 6 } }), "Target pace: ", /* @__PURE__ */ React.createElement("b", { style: { color: WHITE } }, fmtC(fv(TGT, probeT)))), /* @__PURE__ */ React.createElement("div", { style: { color: "#CBD5E1" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: SLATE, marginRight: 6 } }), "Average: ", /* @__PURE__ */ React.createElement("b", { style: { color: WHITE } }, fmtC(fv(AVG, probeT)))), /* @__PURE__ */ React.createElement("div", { style: { color: SLATE } }, "Gap: ", /* @__PURE__ */ React.createElement("b", { style: { color: GOLD } }, fmtC(fv(TGT, probeT) - fv(AVG, probeT)))))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 28, marginTop: 22, flexWrap: "wrap", rowGap: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: SLATE, fontWeight: 500 } }, "Your starting amount:"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", background: "rgba(200,169,81,0.06)", border: "1px solid rgba(200,169,81,0.3)", borderRadius: 8, padding: "7px 12px" } }, /* @__PURE__ */ React.createElement("span", { style: { color: GOLD, fontWeight: 700, marginRight: 4, fontSize: 15 } }, "$"), /* @__PURE__ */ React.createElement("input", { value: startStr, onChange: onStart, inputMode: "numeric", placeholder: "100,000", "aria-label": "Your starting portfolio amount in dollars", style: { background: "transparent", border: "none", outline: "none", color: WHITE, fontSize: 15, fontWeight: 700, width: 94, fontFamily: "'DM Sans', sans-serif", letterSpacing: 0.3 } }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: SLATE, fontWeight: 500 } }, "Years of compounding:"), /* @__PURE__ */ React.createElement("input", { type: "range", min: "5", max: "30", step: "1", value: years, onChange: (e) => {
    setYears(Number(e.target.value));
    setProbe(null);
  }, style: { width: 200, accentColor: GOLD, cursor: "pointer" }, "aria-label": "Years of compounding" }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 800, color: GOLD, minWidth: 34, textAlign: "center" } }, years))))), /* @__PURE__ */ React.createElement(Fade, { delay: 0.15 }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", margin: "44px 0 40px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: SLATE, letterSpacing: 2.5, textTransform: "uppercase", fontWeight: 700, marginBottom: 10 } }, "After ", years, " years, the gap is"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "'Playfair Display', serif", fontSize: 56, fontWeight: 900, color: GOLD, lineHeight: 1.05, marginBottom: 10 } }, fmtFull(gap)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, color: "#CBD5E1", fontStyle: "italic", fontFamily: "'Playfair Display', serif" } }, "That's not a bigger portfolio. That's a different life."))), /* @__PURE__ */ React.createElement("div", { className: "gap-tiles", style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 } }, /* @__PURE__ */ React.createElement(Fade, { delay: 0.1 }, /* @__PURE__ */ React.createElement("div", { style: { background: DARK, border: "1px solid #1f2937", borderRadius: 14, padding: "26px 24px", height: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 24, marginBottom: 12 } }, "\u{1F4B5}"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: GOLD, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700, marginBottom: 14 } }, "Monthly income it could fund \u2014 for life"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 24, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 700, color: "#94A3B8" } }, "$" + monthlyIncome(avgEnd).toLocaleString(), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 500 } }, "/mo")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: SLATE } }, "at 4.5%")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 700, color: WHITE } }, "$" + monthlyIncome(tgtEnd).toLocaleString(), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 500 } }, "/mo")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: SLATE } }, "at target pace"))), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: SLATE, lineHeight: 1.7, margin: 0 } }, "At a 4% withdrawal rate. Same starting dollars, two very different monthly paychecks \u2014 without ever touching the principal."))), /* @__PURE__ */ React.createElement(Fade, { delay: 0.18 }, /* @__PURE__ */ React.createElement("div", { style: { background: DARK, border: "1px solid #1f2937", borderRadius: 14, padding: "26px 24px", height: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 24, marginBottom: 12 } }, "\u23F3"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: GOLD, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700, marginBottom: 14 } }, "Time for your money to double"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 24, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 700, color: "#94A3B8" } }, "16 ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 500 } }, "years")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: SLATE } }, "at 4.5%")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 700, color: WHITE } }, "3.6 ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 500 } }, "years")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: SLATE } }, "at target pace"))), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: SLATE, lineHeight: 1.7, margin: 0 } }, "Over ", years, " years, the average path doubles your money about ", (years / 16).toFixed(1), " times. The target pace doubles it about ", (years / 3.6).toFixed(1), " times."))), /* @__PURE__ */ React.createElement(Fade, { delay: 0.26 }, /* @__PURE__ */ React.createElement("div", { style: { background: DARK, border: "1px solid #1f2937", borderRadius: 14, padding: "26px 24px", height: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 24, marginBottom: 12 } }, "\u{1F9D7}"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: GOLD, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700, marginBottom: 14 } }, "What catching up would cost"), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 700, color: WHITE } }, "+$" + Math.round(catchUp).toLocaleString(), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 500 } }, "/mo")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: SLATE } }, "in extra savings, every month")), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: SLATE, lineHeight: 1.7, margin: 0 } }, "To reach ", fmtC(tgtEnd), " in ", years, " years at 4.5%, you'd have to save that much out of pocket \u2014 every single month. Compounding does it for free.")))), /* @__PURE__ */ React.createElement(Fade, { delay: 0.3 }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, color: "#475569", textAlign: "center", lineHeight: 1.6, maxWidth: 720, margin: "36px auto 0" } }, "Illustrative mathematics of constant-rate compounding on a hypothetical starting amount you choose \u2014 not a projection, forecast, or promise. The 2\xD7 market objective is a goal, illustrated here at 20% per year as if achieved every year, before taxes and withdrawals; actual results will differ and may include losses. The 4.5% path reflects commonly cited long-run net returns of typical balanced portfolios after fees and investor behavior. All investing involves risk, including loss of principal. Past performance does not guarantee future results."))));
}

// ═══════════════════════════════════
// MAIN
// ═══════════════════════════════════
function ResearchPortalLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [annual, setAnnual] = useState(true);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const modules = {
    intelligence: [{
      icon: "📊",
      title: "Dashboard",
      desc: "Your command center — investment pipeline, $100K model portfolio P&L, key metrics, priority intelligence, and entry zone monitoring. Performance tracked in real time."
    }, {
      icon: "⚡",
      title: "Intelligence Feed",
      desc: "Material events, dislocations, earnings surprises, and regime changes — filtered by step, category, impact level, and ticker. Signal, not noise."
    }, {
      icon: "🎯",
      title: "Watchlist",
      desc: "Active ticker universe with multi-framework scoring. Every name evaluated through the complete 5-step process before it earns inclusion."
    }, {
      icon: "🚀",
      title: "AOMG Themes",
      desc: "Area of Maximum Growth trend radar. Identifies secular tailwinds and structural advantages creating outsized opportunities before the crowd sees them."
    }, {
      icon: "📑",
      title: "Research Reports",
      desc: "Deep-dive multibagger reports, stock doubler analyses, and earnings architecture intelligence — institutional depth on every thesis."
    }],
    portfolio: [{
      icon: "🔥",
      title: "Portfolio Heat",
      desc: "The goal: 2× market returns with a hard 20% maximum risk ceiling. Stocks/LEAPS capped at 14%, options at 6%. Live exposure monitoring so you always know where you stand."
    }, {
      icon: "📖",
      title: "Trade Journal",
      desc: "Every entry, exit, position size, and rationale — fully transparent. Each trade feeds directly into the $100K model portfolio performance record."
    }, {
      icon: "🧮",
      title: "Position Calculator",
      desc: "Risk-appropriate position sizing based on portfolio equity, heat allocation, and individual security parameters. Discipline enforced systematically."
    }],
    market: [{
      icon: "🧭",
      title: "Market Positioning",
      desc: "Dynamic allocation guidance across Bull and Bear modes. 70/30/0 in bull, 25/15/60 in bear — market-responsive, not reactive."
    }, {
      icon: "⚠️",
      title: "Bias & Exit Monitor",
      desc: "Triple-test framework detecting whether momentum is genuine or misleading. Separates real accumulation from hype before it costs you."
    }],
    reference: [{
      icon: "🔭",
      title: "Observations",
      desc: "Pattern recognition and thesis development lab. Where conviction is built through structured market observations, not borrowed opinions."
    }, {
      icon: "🚫",
      title: "Avoid List",
      desc: "Companies with deteriorated moats or structurally broken business models. Knowing what NOT to own is half the edge."
    }, {
      icon: "📐",
      title: "Methodology",
      desc: "Complete transparency into the Alpha Engine, the 5-step pipeline, and all 12 proprietary frameworks. Every decision process, fully exposed."
    }]
  };
  const steps = [{
    title: "Identify AOMG — Area of Maximum Growth",
    desc: "Locate where secular tailwinds and structural advantages converge. AOMG trend analysis and TAM/SAM/SOM market sizing to map the opportunity landscape.",
    frameworks: ["AOMG Trend Analysis", "Market Sizing"]
  }, {
    title: "Track Disruption & Superlative Products",
    desc: "Detect products and business models that create or destroy competitive advantages. Score disruption potential and flag structurally broken models before the market reprices them.",
    frameworks: ["Disruption Detection", "Broken Business Model", "Superlative Scoring"]
  }, {
    title: "Track Episodic Pivots & Material Events",
    desc: "Monitor material events and regime changes that fundamentally alter investment theses — earnings surprises, regulatory shifts, dislocations, counter-trend exhaustion points.",
    frameworks: ["Episodic Pivot ID", "Material Events", "Stock Dislocation", "Counter-Trend"]
  }, {
    title: "Position Sizing & Optimum Entries",
    desc: "Size positions with discipline and identify optimal entry points. Map upcoming catalysts against valuation for asymmetric risk-reward setups.",
    frameworks: ["Position Calculator", "Catalyst Value", "Stock Doubler", "Earnings Architecture"]
  }, {
    title: "Monitor Bias Forming Factors & Exit",
    desc: "Track behavioral and technical signals to exit positions before conviction deteriorates. Social sentiment scanning and systematic profit-taking rules protect gains.",
    frameworks: ["Bias Mode Detection", "Social Sentiment", "Profit-Taking Strategy"]
  }];
  const principles = [{
    icon: "🌍",
    title: "MAXIMUM IMPACT",
    desc: "Deep financial outcomes — not surface-level advice."
  }, {
    icon: "🤝",
    title: "FULL ACCOUNTABILITY",
    desc: "We own results alongside you. Your outcomes are ours."
  }, {
    icon: "🛡️",
    title: "100% FIDUCIARY",
    desc: "Your interests are the only interests. No exceptions."
  }, {
    icon: "💎",
    title: "10× VALUE",
    desc: "Every interaction delivers exponentially more value."
  }, {
    icon: "🔓",
    title: "RADICAL TRANSPARENCY",
    desc: "You see everything we see. No hidden fees. No fine print."
  }];
  const allFeatures = ["Daily Intelligence Feed", "12 Proprietary Frameworks", "$100K Model Portfolio", "Multibagger Reports", "AOMG Trend Radar", "Market Commentary", "Avoid List", "Email & Push Notifications", "Magnificent 7 Scorecard", "Discord Trade Alerts", "Position Calculator", "Bias & Exit Monitor"];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'DM Sans', sans-serif",
      background: DARK,
      color: WHITE,
      minHeight: "100vh",
      overflowX: "hidden"
    }
  }, /*#__PURE__*/React.createElement("style", null, `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        ::selection { background: ${GOLD}; color: ${DARK}; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes enginePulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes countUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .btn-gold {
          background: linear-gradient(135deg, ${GOLD}, #D4B968);
          color: ${DARK}; border: none; padding: 16px 38px; font-size: 15px;
          font-weight: 700; border-radius: 8px; cursor: pointer;
          font-family: 'DM Sans', sans-serif; letter-spacing: 0.5px;
          transition: all 0.3s ease; text-transform: uppercase;
        }
        .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(200,169,81,0.3); }
        .btn-outline {
          background: transparent; color: ${GOLD}; border: 1.5px solid ${GOLD};
          padding: 14px 34px; font-size: 14px; font-weight: 600; border-radius: 8px;
          cursor: pointer; font-family: 'DM Sans', sans-serif; letter-spacing: 0.5px;
          transition: all 0.3s ease;
        }
        .btn-outline:hover { background: rgba(200,169,81,0.1); transform: translateY(-2px); }
        @media (max-width: 768px) {
          .hero-h1 { font-size: 36px !important; }
          .mod-grid { grid-template-columns: 1fr !important; }
          .compare-grid { grid-template-columns: 1fr !important; }
          .princ-row { flex-direction: column !important; gap: 32px !important; }
          .hero-btns { flex-direction: column !important; align-items: stretch !important; }
          .engine-grid { grid-template-columns: 1fr !important; }
          .feat-grid { grid-template-columns: 1fr !important; }
          .gap-tiles { grid-template-columns: 1fr !important; }
          .gap-stats { gap: 24px !important; }
          .gap-h2 { font-size: 30px !important; }
        }
      `), /*#__PURE__*/React.createElement("nav", {
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: scrolled ? "10px 0" : "18px 0",
      background: scrolled ? "rgba(10,15,30,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(200,169,81,0.12)" : "none",
      transition: "all 0.4s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "0 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 10,
      background: `linear-gradient(135deg, ${GOLD}, #D4B968)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 900,
      color: DARK,
      fontSize: 17,
      fontFamily: "'Playfair Display', serif"
    }
  }, "E"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 700,
      fontSize: 15,
      color: WHITE,
      letterSpacing: 0.8
    }
  }, "EKANTIK CAPITAL"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: GOLD,
      letterSpacing: 2.5,
      textTransform: "uppercase",
      fontWeight: 600
    }
  }, "Research Portal"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 28
    }
  }, ["Alpha Engine", "Features", "Framework", "Pricing"].map(item => /*#__PURE__*/React.createElement("a", {
    key: item,
    href: `#${item.toLowerCase().replace(/ /g, "-")}`,
    style: {
      fontSize: 13,
      color: SLATE,
      cursor: "pointer",
      textDecoration: "none",
      fontWeight: 500,
      letterSpacing: 0.5,
      transition: "color 0.3s"
    },
    onMouseEnter: e => e.target.style.color = GOLD,
    onMouseLeave: e => e.target.style.color = SLATE
  }, item)), /*#__PURE__*/React.createElement("a", {
    href: "https://ekantik-research-portal.pages.dev/register",
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-gold",
    style: {
      padding: "10px 22px",
      fontSize: 12
    }
  }, "Start Free Trial"))))), /*#__PURE__*/React.createElement("section", {
    style: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      padding: "120px 24px 80px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: `radial-gradient(ellipse 80% 60% at 20% 50%, rgba(27,42,74,0.8) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 30%, rgba(200,169,81,0.05) 0%, transparent 50%), ${DARK}`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      opacity: 0.025,
      backgroundImage: `linear-gradient(rgba(200,169,81,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,81,0.5) 1px, transparent 1px)`,
      backgroundSize: "60px 60px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "12%",
      right: "8%",
      width: 280,
      height: 280,
      borderRadius: "50%",
      background: `radial-gradient(circle, rgba(200,169,81,0.07) 0%, transparent 70%)`,
      animation: "float 6s ease-in-out infinite",
      filter: "blur(40px)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1,
      textAlign: "center",
      maxWidth: 880
    }
  }, /*#__PURE__*/React.createElement(Fade, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      padding: "8px 22px",
      border: "1px solid rgba(200,169,81,0.25)",
      borderRadius: 40,
      fontSize: 12,
      color: GOLD,
      letterSpacing: 2.2,
      textTransform: "uppercase",
      fontWeight: 600,
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: GOLD,
      animation: "enginePulse 2s ease-in-out infinite"
    }
  }), "Powered by the Ekantik Alpha Engine")), /*#__PURE__*/React.createElement(Fade, {
    delay: 0.12
  }, /*#__PURE__*/React.createElement("h1", {
    className: "hero-h1",
    style: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 62,
      fontWeight: 800,
      lineHeight: 1.1,
      marginBottom: 26,
      color: WHITE
    }
  }, "Institutional Intelligence.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: GOLD
    }
  }, "Individual Access."))), /*#__PURE__*/React.createElement(Fade, {
    delay: 0.25
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      color: "#94A3B8",
      lineHeight: 1.8,
      maxWidth: 640,
      margin: "0 auto 20px",
      fontWeight: 300
    }
  }, "One proprietary system. Two modes \u2014 real-time detection and deep-dive research. 12 frameworks. Human-reviewed. Every alert and trade signal tracked against a", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: WHITE
    }
  }, " $100,000 modeled portfolio"), " \u2014 live on your dashboard.")), /*#__PURE__*/React.createElement(Fade, {
    delay: 0.35
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 16,
      padding: "8px 22px",
      background: "rgba(245,158,11,0.06)",
      border: "1px solid rgba(245,158,11,0.18)",
      borderRadius: 10,
      marginBottom: 38,
      flexWrap: "wrap",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: AMBER,
      fontSize: 13,
      fontWeight: 700
    }
  }, "60-day free trial"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 4,
      height: 4,
      borderRadius: "50%",
      background: SLATE
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: SLATE,
      fontSize: 13
    }
  }, "No credit card required"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 4,
      height: 4,
      borderRadius: "50%",
      background: SLATE
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: SLATE,
      fontSize: 13
    }
  }, "Full $100K model portfolio access"))), /*#__PURE__*/React.createElement(Fade, {
    delay: 0.42
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-btns",
    style: {
      display: "flex",
      gap: 16,
      justifyContent: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://ekantik-research-portal.pages.dev/register",
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-gold"
  }, "Start Your Free Trial")), /*#__PURE__*/React.createElement("a", {
    href: "#framework",
    style: {
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-outline"
  }, "See the Methodology \u2192")))), /*#__PURE__*/React.createElement(Fade, {
    delay: 0.55
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 44,
      display: "flex",
      justifyContent: "center",
      gap: 32,
      flexWrap: "wrap"
    }
  }, ["12 Proprietary Frameworks", "$100K Model Portfolio", "Human-Reviewed"].map(badge => /*#__PURE__*/React.createElement("span", {
    key: badge,
    style: {
      fontSize: 11,
      color: SLATE,
      letterSpacing: 1.5,
      textTransform: "uppercase",
      fontWeight: 500
    }
  }, "\u25C6 ", badge)))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: NAVY,
      borderTop: "1px solid rgba(200,169,81,0.12)",
      borderBottom: "1px solid rgba(200,169,81,0.12)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "48px 24px",
      display: "flex",
      justifyContent: "space-around",
      flexWrap: "wrap",
      gap: 28,
      textAlign: "center"
    }
  }, [{
    value: 100,
    suffix: "K",
    prefix: "$",
    label: "Modeled Portfolio"
  }, {
    value: 12,
    suffix: "",
    prefix: "",
    label: "Proprietary Frameworks"
  }, {
    value: 13,
    suffix: "",
    prefix: "",
    label: "Intelligence Modules"
  }, {
    value: 5,
    suffix: "-Step",
    prefix: "",
    label: "Investment Pipeline"
  }, {
    value: 2,
    suffix: "×",
    prefix: "",
    label: "Market Return Goal · 20% Max Risk"
  }].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 36,
      fontWeight: 800,
      color: GOLD
    }
  }, /*#__PURE__*/React.createElement(Counter, {
    end: s.value,
    suffix: s.suffix,
    prefix: s.prefix
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: SLATE,
      letterSpacing: 1,
      textTransform: "uppercase",
      marginTop: 4,
      fontWeight: 500
    }
  }, s.label))))), /*#__PURE__*/React.createElement("section", {
    id: "alpha-engine",
    style: {
      padding: "100px 24px",
      maxWidth: 1100,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Fade, null, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 56
    }
  }, /*#__PURE__*/React.createElement(GoldLine, null), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 40,
      fontWeight: 800,
      marginBottom: 10,
      color: WHITE
    }
  }, "The Ekantik Alpha Engine"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 20,
      color: GOLD,
      fontWeight: 400,
      fontStyle: "italic",
      marginBottom: 16
    }
  }, "One engine. Every edge."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: SLATE,
      fontSize: 16,
      maxWidth: 580,
      margin: "0 auto",
      lineHeight: 1.7
    }
  }, "A single proprietary system operating in two modes \u2014 working in concert from detection through conviction. Every signal feeds into a ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: WHITE
    }
  }, "$100,000 modeled portfolio"), " tracked live on your dashboard."))), /*#__PURE__*/React.createElement(Fade, {
    delay: 0.1
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg, rgba(27,42,74,0.4), rgba(27,42,74,0.15))`,
      border: `1.5px solid rgba(200,169,81,0.2)`,
      borderRadius: 20,
      padding: 4,
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(90deg, rgba(200,169,81,0.08), rgba(13,148,136,0.08))`,
      borderRadius: "17px 17px 0 0",
      padding: "16px 28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 12,
      borderBottom: "1px solid rgba(200,169,81,0.1)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: GOLD,
      animation: "enginePulse 2s ease-in-out infinite"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 14,
      color: WHITE,
      fontWeight: 700,
      letterSpacing: 0.5
    }
  }, "ALPHA ENGINE"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: SLATE,
      fontWeight: 500
    }
  }, "\xB7 Active")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: SLATE,
      letterSpacing: 1.5,
      textTransform: "uppercase",
      fontWeight: 600
    }
  }, "12 Frameworks \xB7 Human-Reviewed"), /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "3px 10px",
      borderRadius: 6,
      fontSize: 10,
      background: "rgba(34,197,94,0.12)",
      color: GREEN,
      border: "1px solid rgba(34,197,94,0.2)",
      fontWeight: 700,
      letterSpacing: 0.5
    }
  }, "$100K MODEL TRACKED"))), /*#__PURE__*/React.createElement("div", {
    className: "engine-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "32px 28px",
      borderRight: "1px solid rgba(255,255,255,0.04)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 10,
      background: "rgba(13,148,136,0.12)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 20
    }
  }, "\u26A1"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: TEAL,
      letterSpacing: 2,
      textTransform: "uppercase",
      fontWeight: 700
    }
  }, "Mode 1"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 20,
      fontWeight: 700,
      color: WHITE,
      margin: 0
    }
  }, "Real-Time Detection"))), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#94A3B8",
      fontSize: 14,
      lineHeight: 1.75,
      marginBottom: 20
    }
  }, "Continuous scanning for material events, stock dislocations, earnings surprises, and regime changes the moment they occur. Every alert is triaged by impact level and delivered within minutes. All trade signals feed directly into the modeled portfolio."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8
    }
  }, ["Within Minutes", "Impact-Triaged", "Email · Push · Discord"].map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      padding: "4px 12px",
      borderRadius: 20,
      fontSize: 11,
      background: "rgba(13,148,136,0.08)",
      color: TEAL,
      border: "1px solid rgba(13,148,136,0.18)",
      fontWeight: 600
    }
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "32px 28px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 10,
      background: "rgba(200,169,81,0.10)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 20
    }
  }, "\uD83D\uDD2C"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: GOLD,
      letterSpacing: 2,
      textTransform: "uppercase",
      fontWeight: 700
    }
  }, "Mode 2"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 20,
      fontWeight: 700,
      color: WHITE,
      margin: 0
    }
  }, "Deep Research"))), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#94A3B8",
      fontSize: 14,
      lineHeight: 1.75,
      marginBottom: 20
    }
  }, "Weekly scorecards, multibagger reports, trend analysis, and structural risk assessments. Every output passes through 12 proprietary frameworks and human review. Entry and exit points tracked on the model portfolio."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8
    }
  }, ["12 Frameworks", "Human-Reviewed", "Institutional Depth"].map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      padding: "4px 12px",
      borderRadius: 20,
      fontSize: 11,
      background: "rgba(200,169,81,0.08)",
      color: GOLD,
      border: "1px solid rgba(200,169,81,0.18)",
      fontWeight: 600
    }
  }, t))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(34,197,94,0.04)",
      borderTop: "1px solid rgba(34,197,94,0.1)",
      borderRadius: "0 0 17px 17px",
      padding: "14px 28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: GREEN
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "#94A3B8"
    }
  }, "All alerts and trade signals are tracked against a ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: WHITE
    }
  }, "hypothetical $100,000 starting portfolio"), " \u2014 performance viewable live on your dashboard"))))), /*#__PURE__*/React.createElement("section", {
    id: "features",
    style: {
      padding: "80px 24px 100px",
      background: `linear-gradient(180deg, ${DARK} 0%, ${DARK2} 100%)`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Fade, null, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 56
    }
  }, /*#__PURE__*/React.createElement(GoldLine, null), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 38,
      fontWeight: 700,
      marginBottom: 14,
      color: WHITE
    }
  }, "The Intelligence Stack"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: SLATE,
      fontSize: 16,
      maxWidth: 560,
      margin: "0 auto",
      lineHeight: 1.7
    }
  }, "13 integrated modules across 4 categories. Every angle covered. Every blind spot eliminated."))), [{
    label: "INTELLIGENCE",
    color: TEAL,
    items: modules.intelligence
  }, {
    label: "PORTFOLIO",
    color: GOLD,
    items: modules.portfolio
  }, {
    label: "MARKET",
    color: "#8B5CF6",
    items: modules.market
  }, {
    label: "REFERENCE",
    color: SLATE,
    items: modules.reference
  }].map((cat, ci) => /*#__PURE__*/React.createElement("div", {
    key: cat.label,
    style: {
      marginBottom: 44
    }
  }, /*#__PURE__*/React.createElement(Fade, {
    delay: ci * 0.06
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 4,
      height: 20,
      borderRadius: 2,
      background: cat.color
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: cat.color,
      letterSpacing: 2.5,
      textTransform: "uppercase",
      fontWeight: 700
    }
  }, cat.label))), /*#__PURE__*/React.createElement("div", {
    className: "mod-grid",
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(auto-fit, minmax(240px, 1fr))`,
      gap: 16
    }
  }, cat.items.map((mod, i) => /*#__PURE__*/React.createElement(ModuleCard, _extends({
    key: mod.title
  }, mod, {
    index: ci * 5 + i
  })))))))), /*#__PURE__*/React.createElement("section", {
    id: "framework",
    style: {
      padding: "100px 24px",
      background: `linear-gradient(180deg, ${DARK2} 0%, ${NAVY} 100%)`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 780,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Fade, null, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 52
    }
  }, /*#__PURE__*/React.createElement(GoldLine, null), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 36,
      fontWeight: 700,
      marginBottom: 14,
      color: WHITE
    }
  }, "The 5-Step Investment Pipeline"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: SLATE,
      fontSize: 15,
      maxWidth: 520,
      margin: "0 auto",
      lineHeight: 1.7
    }
  }, "Proprietary. Systematic. Repeatable. Every ticker passes through all five steps \u2014 and every resulting trade is tracked on the $100K model portfolio."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, steps.map((step, i) => /*#__PURE__*/React.createElement(Fade, {
    key: i,
    delay: i * 0.05
  }, /*#__PURE__*/React.createElement(StepCard, _extends({
    num: i + 1
  }, step, {
    active: activeStep === i + 1,
    onClick: () => setActiveStep(i + 1)
  }))))), /*#__PURE__*/React.createElement(Fade, {
    delay: 0.3
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      padding: "20px 24px",
      background: "rgba(200,169,81,0.04)",
      border: "1px solid rgba(200,169,81,0.12)",
      borderRadius: 12,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#94A3B8",
      fontSize: 13,
      lineHeight: 1.7,
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: GOLD
    }
  }, "Routine Evaluation Process:"), " Scan \u2192 Analyze \u2192 Evaluate \u2192 Adjust \u2192 Verify \u2192 Iterate. Applied continuously to all holdings and opportunities."))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "100px 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 860,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Fade, null, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 52
    }
  }, /*#__PURE__*/React.createElement(GoldLine, null), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 38,
      fontWeight: 700,
      marginBottom: 10,
      color: WHITE
    }
  }, "We Put Our Signals on the Record"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 18,
      color: GOLD,
      fontWeight: 400,
      fontStyle: "italic",
      marginBottom: 14
    }
  }, "Radical transparency, in practice."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: SLATE,
      fontSize: 15,
      maxWidth: 560,
      margin: "0 auto",
      lineHeight: 1.7
    }
  }, "Most research services publish calls and move on. We track ours. Every alert and trade signal the Alpha Engine produces is recorded against a hypothetical portfolio \u2014 visible inside your dashboard the moment you log in."))), /*#__PURE__*/React.createElement(Fade, {
    delay: 0.12
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(160deg, ${NAVY}, #1E3158, ${NAVY})`,
      border: `1.5px solid rgba(200,169,81,0.25)`,
      borderRadius: 20,
      padding: "56px 40px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      opacity: 0.03,
      backgroundImage: `linear-gradient(rgba(200,169,81,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,81,0.5) 1px, transparent 1px)`,
      backgroundSize: "40px 40px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: GOLD,
      letterSpacing: 3,
      textTransform: "uppercase",
      fontWeight: 700,
      marginBottom: 20
    }
  }, "Hypothetical Starting Capital"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 72,
      fontWeight: 900,
      color: WHITE,
      lineHeight: 1,
      marginBottom: 8
    }
  }, "$", /*#__PURE__*/React.createElement(Counter, {
    end: 100000,
    prefix: "",
    suffix: "",
    duration: 2500
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: SLATE,
      marginBottom: 40
    }
  }, "Model portfolio \xB7 Updated with every trade signal"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 12,
      flexWrap: "wrap",
      marginBottom: 36
    }
  }, ["Total Return", "Win Rate", "Avg Win / Loss", "Open P&L", "Best & Worst Trade", "Every Entry & Exit", "Full Position Sizing"].map(item => /*#__PURE__*/React.createElement("span", {
    key: item,
    style: {
      padding: "8px 18px",
      borderRadius: 10,
      background: "rgba(200,169,81,0.06)",
      border: "1px solid rgba(200,169,81,0.15)",
      fontSize: 13,
      color: "#CBD5E1",
      fontWeight: 500
    }
  }, item))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 520,
      margin: "0 auto",
      padding: "20px 24px",
      background: "rgba(200,169,81,0.04)",
      borderRadius: 12,
      border: "1px solid rgba(200,169,81,0.1)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: "#94A3B8",
      lineHeight: 1.7,
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: GOLD,
      fontWeight: 700
    }
  }, "Other services publish picks with no accountability."), " We track every signal against a $100K model portfolio \u2014 complete with position sizing, entry rationale, and exit discipline \u2014 visible to every subscriber on the dashboard.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://ekantik-research-portal.pages.dev/register",
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-gold",
    style: {
      padding: "14px 36px",
      fontSize: 14
    }
  }, "See It Inside the Portal \u2192")))))), /*#__PURE__*/React.createElement(Fade, {
    delay: 0.25
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      color: "#475569",
      textAlign: "center",
      marginTop: 20,
      lineHeight: 1.6,
      maxWidth: 640,
      margin: "20px auto 0"
    }
  }, "Hypothetical results based on model portfolio signals. Does not represent actual trading or account performance. All investments carry risk, including potential loss of principal. Past performance does not guarantee future results.")))), /*#__PURE__*/React.createElement(FreedomGapSection, null), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "80px 24px 100px",
      maxWidth: 1100,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Fade, null, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement(GoldLine, null), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 36,
      fontWeight: 700,
      marginBottom: 14,
      color: WHITE
    }
  }, "Ekantik vs. The Industry"))), /*#__PURE__*/React.createElement("div", {
    className: "compare-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Fade, null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.05)",
      borderRadius: 16,
      padding: "36px 28px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: SLATE,
      letterSpacing: 2,
      textTransform: "uppercase",
      fontWeight: 600,
      marginBottom: 22
    }
  }, "Typical Research Services"), ["Recycled sell-side consensus", "No tracked performance record", "Price targets without methodology", "No accountability for calls", "No risk management framework", "Hidden conflicts of interest"].map(item => /*#__PURE__*/React.createElement("div", {
    key: item,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 13,
      color: "#6B7280",
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#EF4444",
      fontSize: 13
    }
  }, "\u2715"), " ", item)))), /*#__PURE__*/React.createElement(Fade, {
    delay: 0.12
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg, rgba(27,42,74,0.7), rgba(27,42,74,0.3))`,
      border: `1.5px solid ${GOLD}`,
      borderRadius: 16,
      padding: "36px 28px",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 14,
      right: 18,
      padding: "4px 12px",
      background: GOLD,
      color: DARK,
      borderRadius: 20,
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: 1
    }
  }, "ALPHA ENGINE"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: GOLD,
      letterSpacing: 2,
      textTransform: "uppercase",
      fontWeight: 600,
      marginBottom: 22
    }
  }, "Ekantik Research Portal"), ["$100K model portfolio tracked live", "2× market return goal · 20% max risk ceiling", "12 proprietary analytical frameworks", "Complete trade journal — entries, exits, rationale", "Every output human-reviewed before publication", "100% fiduciary — your interests only"].map(item => /*#__PURE__*/React.createElement("div", {
    key: item,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 13,
      color: "#CBD5E1",
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: GOLD,
      fontSize: 13
    }
  }, "\u2726"), " ", item)))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "100px 24px",
      background: `linear-gradient(180deg, ${NAVY} 0%, ${DARK} 100%)`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Fade, null, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: GOLD,
      letterSpacing: 3,
      textTransform: "uppercase",
      fontWeight: 600,
      marginBottom: 14
    }
  }, "Our Non-Negotiables"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 40,
      fontWeight: 800,
      color: WHITE,
      marginBottom: 14
    }
  }, "The Ekantik Standard"), /*#__PURE__*/React.createElement(GoldLine, null))), /*#__PURE__*/React.createElement("div", {
    className: "princ-row",
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 40,
      flexWrap: "wrap"
    }
  }, principles.map((p, i) => /*#__PURE__*/React.createElement(PrincipleCard, _extends({
    key: p.title
  }, p, {
    index: i
  })))))), /*#__PURE__*/React.createElement("section", {
    id: "pricing",
    style: {
      padding: "100px 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 900,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Fade, null, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement(GoldLine, null), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 38,
      fontWeight: 700,
      marginBottom: 14,
      color: WHITE
    }
  }, "Simple, Transparent Pricing"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: SLATE,
      fontSize: 15,
      maxWidth: 520,
      margin: "0 auto 24px",
      lineHeight: 1.7
    }
  }, "Every plan includes full access to the Alpha Engine, the $100K model portfolio dashboard, all 12 frameworks, and daily intelligence."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      background: "rgba(255,255,255,0.04)",
      borderRadius: 10,
      padding: 4,
      border: "1px solid #1f2937"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setAnnual(false),
    style: {
      padding: "10px 24px",
      borderRadius: 8,
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer",
      border: "none",
      background: !annual ? GOLD : "transparent",
      color: !annual ? DARK : SLATE,
      fontFamily: "'DM Sans', sans-serif",
      transition: "all 0.3s"
    }
  }, "Monthly"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setAnnual(true),
    style: {
      padding: "10px 24px",
      borderRadius: 8,
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer",
      border: "none",
      background: annual ? GOLD : "transparent",
      color: annual ? DARK : SLATE,
      fontFamily: "'DM Sans', sans-serif",
      transition: "all 0.3s"
    }
  }, "Annual ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700
    }
  }, "Save $789"))))), /*#__PURE__*/React.createElement(Fade, {
    delay: 0.15
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg, rgba(27,42,74,0.6), rgba(27,42,74,0.2))`,
      border: `1.5px solid ${GOLD}`,
      borderRadius: 20,
      padding: "44px 36px",
      position: "relative",
      overflow: "hidden",
      maxWidth: 520,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 3,
      background: `linear-gradient(90deg, ${GOLD}, #D4B968, ${GOLD})`,
      backgroundSize: "200% 100%",
      animation: "shimmer 3s linear infinite"
    }
  }), annual && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 18,
      right: 20,
      padding: "4px 14px",
      background: GREEN,
      color: WHITE,
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 0.5
    }
  }, "RECOMMENDED"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: GOLD,
      letterSpacing: 2,
      textTransform: "uppercase",
      fontWeight: 700,
      marginBottom: 8
    }
  }, annual ? "Annual · Committed Investor" : "Monthly · Flexible Access"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 4,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 52,
      fontWeight: 800,
      color: WHITE
    }
  }, annual ? "$999" : "$149"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: SLATE,
      fontSize: 16
    }
  }, "/", annual ? "year" : "month")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: SLATE,
      fontSize: 13,
      marginBottom: 24
    }
  }, annual ? "Best value for serious investors" : "Cancel anytime, no lock-in"), /*#__PURE__*/React.createElement("div", {
    className: "feat-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      marginBottom: 28
    }
  }, allFeatures.map(f => /*#__PURE__*/React.createElement("div", {
    key: f,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      color: "#CBD5E1",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: GOLD,
      fontSize: 10
    }
  }, "\u25CF"), " ", f))), /*#__PURE__*/React.createElement("a", {
    href: "https://ekantik-research-portal.pages.dev/register",
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      textDecoration: "none",
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-gold",
    style: {
      width: "100%",
      fontSize: 15
    }
  }, "Start Your 60-Day Free Trial")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: SLATE,
      fontSize: 12,
      textAlign: "center",
      marginTop: 14
    }
  }, "No credit card required \xB7 Full $100K model portfolio access \xB7 Cancel anytime"))), /*#__PURE__*/React.createElement(Fade, {
    delay: 0.3
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 40,
      marginTop: 36,
      flexWrap: "wrap"
    }
  }, [{
    icon: "🔒",
    label: "Secure Payments",
    desc: "Processed via Stripe"
  }, {
    icon: "↩️",
    label: "Cancel Anytime",
    desc: "No lock-in contracts"
  }, {
    icon: "💬",
    label: "Priority Support",
    desc: "Direct research team access"
  }].map(t => /*#__PURE__*/React.createElement("div", {
    key: t.label,
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      marginBottom: 6
    }
  }, t.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: WHITE,
      fontWeight: 600,
      marginBottom: 2
    }
  }, t.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: SLATE
    }
  }, t.desc))))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "120px 24px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      background: `linear-gradient(180deg, ${DARK} 0%, ${NAVY} 50%, ${DARK} 100%)`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: `radial-gradient(ellipse 70% 50% at 50% 50%, rgba(200,169,81,0.05) 0%, transparent 70%)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1,
      maxWidth: 680,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Fade, null, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 70,
      height: 2,
      background: GOLD,
      margin: "0 auto 36px",
      borderRadius: 1
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "'Playfair Display', serif",
      fontSize: 40,
      fontWeight: 800,
      lineHeight: 1.2,
      marginBottom: 22,
      color: WHITE
    }
  }, "The question isn't whether", /*#__PURE__*/React.createElement("br", null), "you can afford this intelligence.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: GOLD
    }
  }, "It's whether you can afford to invest without it."))), /*#__PURE__*/React.createElement(Fade, {
    delay: 0.15
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#94A3B8",
      fontSize: 16,
      lineHeight: 1.8,
      marginBottom: 40
    }
  }, "The Alpha Engine is running. Every signal tracked. Every trade journaled. A $100K model portfolio you can watch in real time. The question is whether you're inside it or outside it.")), /*#__PURE__*/React.createElement(Fade, {
    delay: 0.3
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      justifyContent: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://ekantik-research-portal.pages.dev/register",
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-gold",
    style: {
      fontSize: 16,
      padding: "18px 44px"
    }
  }, "Start Your 60-Day Free Trial")), /*#__PURE__*/React.createElement("a", {
    href: "https://ekantik-research-portal.pages.dev/methodology",
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-outline"
  }, "View Full Methodology")))), /*#__PURE__*/React.createElement(Fade, {
    delay: 0.4
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: SLATE,
      fontSize: 12,
      marginTop: 28,
      letterSpacing: 0.8
    }
  }, "No credit card required \xB7 60-day full access \xB7 $100K model portfolio included")))), /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: "1px solid rgba(200,169,81,0.08)",
      padding: "44px 24px 32px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 800,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Playfair Display', serif",
      color: SLATE,
      fontSize: 14,
      marginBottom: 10,
      letterSpacing: 0.5
    }
  }, "Your Wealth. Our Accountability. Total Transparency."), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#475569",
      fontSize: 11,
      lineHeight: 1.9,
      marginBottom: 18
    }
  }, "\xA9 2026 Ekantik Capital Advisors LLC. All rights reserved.", /*#__PURE__*/React.createElement("br", null), "All content is for educational and informational purposes only. Nothing herein constitutes investment advice.", /*#__PURE__*/React.createElement("br", null), "Hypothetical portfolio results are based on model signals and do not represent actual trading or account performance.", /*#__PURE__*/React.createElement("br", null), "All investments carry risk, including potential loss of principal. Past performance does not guarantee future results.", /*#__PURE__*/React.createElement("br", null), "EPIG performance targets are goals based on backtested methodology and are not guaranteed."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 22
    }
  }, ["Privacy", "Terms", "Disclosures", "Contact"].map(link => /*#__PURE__*/React.createElement("span", {
    key: link,
    style: {
      color: "#475569",
      fontSize: 12,
      cursor: "pointer",
      transition: "color 0.3s"
    },
    onMouseEnter: e => e.target.style.color = GOLD,
    onMouseLeave: e => e.target.style.color = "#475569"
  }, link))))));
}

// Mount
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(ResearchPortalLanding));
