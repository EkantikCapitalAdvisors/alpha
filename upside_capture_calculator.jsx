import { useState, useMemo } from "react";

const SP500_DATA = [
  { year: 1975, ret: 0.3720 }, { year: 1976, ret: 0.2384 }, { year: 1977, ret: -0.0718 },
  { year: 1978, ret: 0.0656 }, { year: 1979, ret: 0.1844 }, { year: 1980, ret: 0.3242 },
  { year: 1981, ret: -0.0491 }, { year: 1982, ret: 0.2155 }, { year: 1983, ret: 0.2256 },
  { year: 1984, ret: 0.0627 }, { year: 1985, ret: 0.3173 }, { year: 1986, ret: 0.1867 },
  { year: 1987, ret: 0.0525 }, { year: 1988, ret: 0.1661 }, { year: 1989, ret: 0.3169 },
  { year: 1990, ret: -0.0310 }, { year: 1991, ret: 0.3047 }, { year: 1992, ret: 0.0762 },
  { year: 1993, ret: 0.1008 }, { year: 1994, ret: 0.0132 }, { year: 1995, ret: 0.3758 },
  { year: 1996, ret: 0.2296 }, { year: 1997, ret: 0.3336 }, { year: 1998, ret: 0.2858 },
  { year: 1999, ret: 0.2104 }, { year: 2000, ret: -0.0910 }, { year: 2001, ret: -0.1189 },
  { year: 2002, ret: -0.2210 }, { year: 2003, ret: 0.2868 }, { year: 2004, ret: 0.1088 },
  { year: 2005, ret: 0.0491 }, { year: 2006, ret: 0.1579 }, { year: 2007, ret: 0.0549 },
  { year: 2008, ret: -0.3700 }, { year: 2009, ret: 0.2646 }, { year: 2010, ret: 0.1506 },
  { year: 2011, ret: 0.0211 }, { year: 2012, ret: 0.1600 }, { year: 2013, ret: 0.3239 },
  { year: 2014, ret: 0.1369 }, { year: 2015, ret: 0.0138 }, { year: 2016, ret: 0.1196 },
  { year: 2017, ret: 0.2183 }, { year: 2018, ret: -0.0438 }, { year: 2019, ret: 0.3149 },
  { year: 2020, ret: 0.1840 }, { year: 2021, ret: 0.2871 }, { year: 2022, ret: -0.1811 },
  { year: 2023, ret: 0.2629 }, { year: 2024, ret: 0.2502 },
];

const FULL_START = SP500_DATA[0].year;
const FULL_END = SP500_DATA[SP500_DATA.length - 1].year;

const PRESETS = [
  { label: "Full 50yr", start: 1975, end: 2024, note: "All regimes" },
  { label: "Lost Decade", start: 2000, end: 2009, note: "Dot-com + GFC" },
  { label: "Roaring 90s", start: 1990, end: 1999, note: "Greatest bull" },
  { label: "Volcker → Boom", start: 1980, end: 1989, note: "Disinflation" },
  { label: "GFC Recovery", start: 2009, end: 2019, note: "ZIRP era" },
  { label: "Post-Covid", start: 2020, end: 2024, note: "Inflation regime" },
  { label: "Last 20yr", start: 2005, end: 2024, note: "Modern era" },
];

function computeGrowth(data, downsideCapture, upsideCapture) {
  let equity = 1;
  const curve = [{ year: data[0].year - 1, value: 1 }];
  for (const d of data) {
    const r = d.ret < 0 ? d.ret * downsideCapture : d.ret * upsideCapture;
    equity *= 1 + r;
    curve.push({ year: d.year, value: equity });
  }
  return { final: equity, curve };
}

function findRequiredUpside(data, downsideCapture, targetMultiple) {
  if (data.length === 0) return 1;
  const market = computeGrowth(data, 1, 1);
  const targetFinal = 1 + (market.final - 1) * targetMultiple;
  let lo = 0.1, hi = 10.0;
  for (let i = 0; i < 100; i++) {
    const mid = (lo + hi) / 2;
    const result = computeGrowth(data, downsideCapture, mid);
    if (result.final < targetFinal) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

function MiniChart({ marketCurve, portfolioCurve, width = 720, height = 320 }) {
  if (marketCurve.length < 2) return null;
  const allValues = [...marketCurve.map(p => p.value), ...portfolioCurve.map(p => p.value)];
  const maxVal = Math.max(...allValues);
  const minVal = Math.min(...allValues, 1);
  const years = marketCurve.map(p => p.year);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  const pad = { top: 30, right: 30, bottom: 40, left: 70 };
  const w = width - pad.left - pad.right;
  const h = height - pad.top - pad.bottom;

  // Use log scale if range is wide, linear if narrow (better readability for short periods)
  const useLog = maxVal / Math.max(minVal, 0.5) > 5;

  const logMax = Math.log10(Math.max(maxVal, 1));
  const logMin = Math.log10(Math.max(minVal, 0.5));
  const x = (year) => maxYear === minYear ? pad.left + w / 2 : pad.left + ((year - minYear) / (maxYear - minYear)) * w;
  const y = (val) => {
    if (useLog) {
      const v = Math.max(val, 0.5);
      return pad.top + h - ((Math.log10(v) - logMin) / Math.max(logMax - logMin, 0.01)) * h;
    } else {
      return pad.top + h - ((val - minVal) / Math.max(maxVal - minVal, 0.01)) * h;
    }
  };

  const toPath = (curve) =>
    curve.map((p, i) => `${i === 0 ? "M" : "L"}${x(p.year).toFixed(1)},${y(p.value).toFixed(1)}`).join(" ");

  const toArea = (curve) => {
    const line = curve.map((p, i) => `${i === 0 ? "M" : "L"}${x(p.year).toFixed(1)},${y(p.value).toFixed(1)}`).join(" ");
    return `${line} L${x(curve[curve.length - 1].year).toFixed(1)},${y(minVal).toFixed(1)} L${x(curve[0].year).toFixed(1)},${y(minVal).toFixed(1)} Z`;
  };

  // Adaptive grid lines
  const gridLines = useLog
    ? [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 5000, 10000, 50000].filter(v => v <= maxVal * 1.1 && v >= minVal * 0.9)
    : (() => {
        const range = maxVal - minVal;
        const step = range <= 2 ? 0.25 : range <= 5 ? 0.5 : range <= 10 ? 1 : range <= 20 ? 2 : 5;
        const lines = [];
        for (let v = Math.ceil(minVal / step) * step; v <= maxVal; v += step) lines.push(v);
        return lines;
      })();

  // Year ticks — adaptive based on span
  const span = maxYear - minYear;
  const tickInterval = span >= 40 ? 5 : span >= 20 ? 4 : span >= 10 ? 2 : 1;
  const yearTicks = years.filter((yr, i) => i === 0 || i === years.length - 1 || (yr - minYear) % tickInterval === 0);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", maxWidth: width }}>
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8A951" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#C8A951" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5B8DEF" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#5B8DEF" stopOpacity="0.01" />
        </linearGradient>
      </defs>
      {gridLines.map(v => (
        <g key={v}>
          <line x1={pad.left} y1={y(v)} x2={width - pad.right} y2={y(v)} stroke="#2A3A5A" strokeWidth="1" />
          <text x={pad.left - 8} y={y(v) + 4} textAnchor="end" fill="#6B7B9A" fontSize="10" fontFamily="JetBrains Mono, monospace">
            {v >= 1000 ? (v / 1000).toFixed(v >= 10000 ? 0 : 1) + "k×" : v < 10 ? v.toFixed(1) + "×" : v.toFixed(0) + "×"}
          </text>
        </g>
      ))}
      {yearTicks.map(yr => (
        <text key={yr} x={x(yr)} y={height - 8} textAnchor="middle" fill="#6B7B9A" fontSize="10" fontFamily="JetBrains Mono, monospace">{yr}</text>
      ))}
      <path d={toArea(portfolioCurve)} fill="url(#goldGrad)" />
      <path d={toArea(marketCurve)} fill="url(#blueGrad)" />
      <path d={toPath(marketCurve)} fill="none" stroke="#5B8DEF" strokeWidth="2.5" strokeLinejoin="round" />
      <path d={toPath(portfolioCurve)} fill="none" stroke="#C8A951" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx={x(portfolioCurve[portfolioCurve.length - 1].year)} cy={y(portfolioCurve[portfolioCurve.length - 1].value)} r="5" fill="#C8A951" />
      <circle cx={x(marketCurve[marketCurve.length - 1].year)} cy={y(marketCurve[marketCurve.length - 1].value)} r="5" fill="#5B8DEF" />
      <text x={width - pad.right - 6} y={20} textAnchor="end" fill="#4A5568" fontSize="9" fontFamily="JetBrains Mono, monospace">
        {useLog ? "LOG SCALE" : "LINEAR SCALE"}
      </text>
    </svg>
  );
}

export default function UpsideCaptureCalculator() {
  const [downsideCapture, setDownsideCapture] = useState(0.333);
  const [targetMultiple, setTargetMultiple] = useState(2.0);
  const [startYear, setStartYear] = useState(FULL_START);
  const [endYear, setEndYear] = useState(FULL_END);

  // Sanitize range — end must be >= start
  const effStart = Math.min(startYear, endYear);
  const effEnd = Math.max(startYear, endYear);
  const filteredData = useMemo(
    () => SP500_DATA.filter(d => d.year >= effStart && d.year <= effEnd),
    [effStart, effEnd]
  );
  const years = filteredData.length;

  const analysis = useMemo(() => {
    if (filteredData.length === 0) return null;
    const market = computeGrowth(filteredData, 1, 1);
    const requiredUpside = findRequiredUpside(filteredData, downsideCapture, targetMultiple);
    const portfolio = computeGrowth(filteredData, downsideCapture, requiredUpside);

    const downYears = filteredData.filter(d => d.ret < 0);
    const upYears = filteredData.filter(d => d.ret >= 0);

    const marketCumReturn = (market.final - 1) * 100;
    const portfolioCumReturn = (portfolio.final - 1) * 100;
    const marketCAGR = (Math.pow(market.final, 1 / years) - 1) * 100;
    const portfolioCAGR = (Math.pow(portfolio.final, 1 / years) - 1) * 100;

    const computeDD = (curve) => {
      let peak = 0, maxDD = 0;
      for (const p of curve) {
        if (p.value > peak) peak = p.value;
        const dd = (peak - p.value) / peak;
        if (dd > maxDD) maxDD = dd;
      }
      return maxDD * 100;
    };

    const yearByYear = filteredData.map(d => {
      const mRet = d.ret * 100;
      const pRet = (d.ret < 0 ? d.ret * downsideCapture : d.ret * requiredUpside) * 100;
      return { year: d.year, marketRet: mRet, portfolioRet: pRet, isDown: d.ret < 0 };
    });

    const totalDownsideSaved = downYears.reduce((sum, d) => sum + Math.abs(d.ret) * (1 - downsideCapture) * 100, 0);

    return {
      market, portfolio, requiredUpside,
      marketCumReturn, portfolioCumReturn,
      marketCAGR, portfolioCAGR,
      marketMaxDD: computeDD(market.curve),
      portfolioMaxDD: computeDD(portfolio.curve),
      downYears: downYears.length, upYears: upYears.length,
      yearByYear, totalDownsideSaved
    };
  }, [filteredData, downsideCapture, targetMultiple, years]);

  const fmt = (n, d = 1) => n.toFixed(d);
  const fmtPct = (n) => (n >= 0 ? "+" : "") + n.toFixed(1) + "%";
  const fmtDollars = (n) => {
    if (n >= 10000) return "$" + (n / 1000).toFixed(0) + "k";
    if (n >= 1000) return "$" + (n / 1000).toFixed(1) + "k";
    return "$" + n.toFixed(2);
  };

  const applyPreset = (p) => { setStartYear(p.start); setEndYear(p.end); };
  const isActivePreset = (p) => effStart === p.start && effEnd === p.end;

  if (!analysis) {
    return <div style={{ background: "#0D1117", color: "#E6EDF3", padding: 40 }}>Select a valid date range.</div>;
  }

  return (
    <div style={{
      background: "#0D1117", color: "#E6EDF3", fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
      minHeight: "100vh", padding: "28px 20px"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input[type=range] { -webkit-appearance: none; width: 100%; height: 6px; background: #1B2A4A; border-radius: 3px; outline: none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; background: #C8A951; border-radius: 50%; cursor: pointer; border: 2px solid #0D1117; }
        input[type=range]::-moz-range-thumb { width: 20px; height: 20px; background: #C8A951; border-radius: 50%; cursor: pointer; border: 2px solid #0D1117; }
        .stat-card { background: #161B22; border: 1px solid #21262D; border-radius: 10px; padding: 16px 20px; }
        .gold { color: #C8A951; }
        .blue { color: #5B8DEF; }
        .dim { color: #6B7B9A; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .playfair { font-family: 'Playfair Display', serif; }
        .table-row { display: grid; grid-template-columns: 70px 1fr 1fr 1fr; gap: 4px; padding: 8px 12px; border-bottom: 1px solid #161B22; font-size: 13px; align-items: center; }
        .table-row:hover { background: #161B22; }
        .bar-container { height: 18px; display: flex; align-items: center; gap: 6px; }
        .bar { height: 14px; border-radius: 2px; min-width: 2px; transition: width 0.3s; }
        .preset-btn {
          background: #161B22; border: 1px solid #21262D; color: #B0BAC9;
          padding: 8px 12px; border-radius: 6px; font-size: 11px; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: all 0.15s;
          display: flex; flex-direction: column; align-items: flex-start; gap: 2px;
        }
        .preset-btn:hover { border-color: #C8A95150; color: #E6EDF3; }
        .preset-btn.active { background: linear-gradient(135deg, #1B2A4A, #2A3F6A); border-color: #C8A951; color: #C8A951; }
        .preset-btn .preset-note { color: #6B7B9A; font-size: 9px; font-family: 'JetBrains Mono', monospace; }
        .preset-btn.active .preset-note { color: #C8A95190; }
        @media (max-width: 600px) {
          .controls-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .period-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <div style={{ width: 4, height: 32, background: "#C8A951", borderRadius: 2 }} />
          <h1 className="playfair" style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.5px" }}>
            Upside Capture <span className="gold">Required</span>
          </h1>
        </div>
        <p className="dim" style={{ fontSize: 14, marginLeft: 16, marginBottom: 24 }}>
          S&P 500 Total Returns · Selectable Period · {FULL_START}–{FULL_END} Universe
        </p>

        {/* Period Selector Section */}
        <div className="stat-card" style={{ marginBottom: 20, padding: "18px 22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
            <span className="dim" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 600 }}>
              Analysis Period
            </span>
            <span className="mono gold" style={{ fontSize: 16, fontWeight: 500 }}>
              {effStart}–{effEnd} <span className="dim" style={{ fontSize: 12 }}>· {years} years</span>
            </span>
          </div>

          {/* Preset Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
            {PRESETS.map(p => (
              <button
                key={p.label}
                className={`preset-btn ${isActivePreset(p) ? "active" : ""}`}
                onClick={() => applyPreset(p)}
              >
                <span style={{ fontWeight: 600 }}>{p.label}</span>
                <span className="preset-note">{p.start}–{p.end} · {p.note}</span>
              </button>
            ))}
          </div>

          {/* Year Range Sliders */}
          <div className="period-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, paddingTop: 12, borderTop: "1px solid #21262D" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span className="dim" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>Start Year</span>
                <span className="mono gold" style={{ fontSize: 14 }}>{startYear}</span>
              </div>
              <input type="range" min={FULL_START} max={FULL_END} value={startYear}
                onChange={e => setStartYear(parseInt(e.target.value))} />
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span className="dim" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>End Year</span>
                <span className="mono gold" style={{ fontSize: 14 }}>{endYear}</span>
              </div>
              <input type="range" min={FULL_START} max={FULL_END} value={endYear}
                onChange={e => setEndYear(parseInt(e.target.value))} />
            </div>
          </div>
        </div>

        {/* Capture Controls */}
        <div className="controls-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          <div className="stat-card">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span className="dim" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>Downside Capture</span>
              <span className="mono gold" style={{ fontSize: 18, fontWeight: 500 }}>{fmt(downsideCapture * 100, 0)}%</span>
            </div>
            <input type="range" min="10" max="100" value={Math.round(downsideCapture * 100)}
              onChange={e => setDownsideCapture(parseInt(e.target.value) / 100)} />
            <div className="dim" style={{ fontSize: 11, marginTop: 6 }}>
              You lose {fmt(downsideCapture * 100, 0)}% of what the market loses
            </div>
          </div>
          <div className="stat-card">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span className="dim" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>Return Target</span>
              <span className="mono gold" style={{ fontSize: 18, fontWeight: 500 }}>{fmt(targetMultiple, 1)}×</span>
            </div>
            <input type="range" min="10" max="40" value={Math.round(targetMultiple * 10)}
              onChange={e => setTargetMultiple(parseInt(e.target.value) / 10)} />
            <div className="dim" style={{ fontSize: 11, marginTop: 6 }}>
              Target {fmt(targetMultiple, 1)}× the S&P 500 cumulative return
            </div>
          </div>
        </div>

        {/* Answer Box */}
        <div style={{
          background: "linear-gradient(135deg, #1B2A4A 0%, #0F1923 100%)",
          border: "1px solid #C8A95140", borderRadius: 12, padding: "24px 28px", marginBottom: 24,
          textAlign: "center"
        }}>
          <div className="dim" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 6 }}>
            Required Upside Capture · {effStart}–{effEnd}
          </div>
          <div className="playfair gold" style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.1 }}>
            {fmt(analysis.requiredUpside * 100, 1)}%
          </div>
          <div className="dim" style={{ fontSize: 13, marginTop: 8, lineHeight: 1.5 }}>
            Capture <span className="mono" style={{ color: "#E6EDF3" }}>{fmt(analysis.requiredUpside * 100, 1)}%</span> of every up-year
            with only <span className="mono" style={{ color: "#E6EDF3" }}>{fmt(downsideCapture * 100, 0)}%</span> downside capture
            → <span className="gold">{fmt(targetMultiple, 1)}× market returns</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
          {[
            { label: "S&P Cumulative", val: fmt(analysis.marketCumReturn, 0) + "%", sub: fmt(analysis.marketCAGR, 1) + "% CAGR", cls: "blue" },
            { label: "Portfolio Cumul.", val: fmt(analysis.portfolioCumReturn, 0) + "%", sub: fmt(analysis.portfolioCAGR, 1) + "% CAGR", cls: "gold" },
            { label: "S&P Max DD", val: "-" + fmt(analysis.marketMaxDD, 1) + "%", sub: "Peak to trough", cls: "blue" },
            { label: "Portfolio Max DD", val: "-" + fmt(analysis.portfolioMaxDD, 1) + "%", sub: "Peak to trough", cls: "gold" },
          ].map((s, i) => (
            <div key={i} className="stat-card" style={{ textAlign: "center" }}>
              <div className="dim" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{s.label}</div>
              <div className={`mono ${s.cls}`} style={{ fontSize: 20, fontWeight: 500 }}>{s.val}</div>
              <div className="dim" style={{ fontSize: 10, marginTop: 4 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="stat-card" style={{ marginBottom: 24, padding: "20px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, padding: "0 8px" }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>Growth of $1 · {effStart}–{effEnd}</span>
            <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
              <span><span style={{ display: "inline-block", width: 12, height: 3, background: "#5B8DEF", marginRight: 6, verticalAlign: "middle", borderRadius: 1 }} />S&P → <span className="mono blue">{fmtDollars(analysis.market.final)}</span></span>
              <span><span style={{ display: "inline-block", width: 12, height: 3, background: "#C8A951", marginRight: 6, verticalAlign: "middle", borderRadius: 1 }} />Portfolio → <span className="mono gold">{fmtDollars(analysis.portfolio.final)}</span></span>
            </div>
          </div>
          <MiniChart marketCurve={analysis.market.curve} portfolioCurve={analysis.portfolio.curve} />
        </div>

        {/* Year by Year Table */}
        <div className="stat-card" style={{ padding: "16px 0", marginBottom: 24 }}>
          <div style={{ padding: "0 16px 12px", fontSize: 14, fontWeight: 600 }}>
            Year-by-Year Comparison · {years} {years === 1 ? "Year" : "Years"}
          </div>
          <div className="table-row" style={{ borderBottom: "1px solid #21262D", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.8 }}>
            <span className="dim">Year</span>
            <span className="dim">S&P 500</span>
            <span className="dim">Portfolio</span>
            <span className="dim">Δ Advantage</span>
          </div>
          <div style={{ maxHeight: 460, overflowY: "auto" }}>
            {analysis.yearByYear.map(row => {
              const delta = row.portfolioRet - row.marketRet;
              const maxAbs = 50;
              const mWidth = Math.min(Math.abs(row.marketRet) / maxAbs * 100, 100);
              const pWidth = Math.min(Math.abs(row.portfolioRet) / maxAbs * 100, 100);
              return (
                <div key={row.year} className="table-row" style={{ background: row.isDown ? "#1a1215" : "transparent" }}>
                  <span className="mono" style={{ fontSize: 13, color: row.isDown ? "#FF6B6B" : "#E6EDF3" }}>{row.year}</span>
                  <div className="bar-container">
                    <div className="bar" style={{
                      width: `${mWidth}%`,
                      background: row.marketRet >= 0 ? "#5B8DEF" : "#FF6B6B"
                    }} />
                    <span className="mono dim" style={{ fontSize: 11 }}>{fmtPct(row.marketRet)}</span>
                  </div>
                  <div className="bar-container">
                    <div className="bar" style={{
                      width: `${pWidth}%`,
                      background: row.portfolioRet >= 0 ? "#C8A951" : "#FF6B6B"
                    }} />
                    <span className="mono dim" style={{ fontSize: 11 }}>{fmtPct(row.portfolioRet)}</span>
                  </div>
                  <span className="mono" style={{
                    fontSize: 12,
                    color: delta > 0 ? "#4ADE80" : delta < 0 ? "#FF6B6B" : "#6B7B9A"
                  }}>
                    {delta > 0 ? "+" : ""}{fmt(delta, 1)}pp
                  </span>
                </div>
              );
            })}
          </div>
          <div className="dim" style={{ fontSize: 10, textAlign: "center", marginTop: 10, paddingTop: 8, borderTop: "1px solid #21262D" }}>
            {analysis.upYears} positive · {analysis.downYears} negative · {fmt(analysis.upYears / years * 100, 0)}% market win rate
          </div>
        </div>

        {/* Key Insight */}
        <div style={{
          background: "#161B22", border: "1px solid #21262D", borderRadius: 10, padding: "20px 24px",
          borderLeft: "3px solid #C8A951"
        }}>
          <div className="gold" style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
            Key Insight · {effStart}–{effEnd}
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "#B0BAC9" }}>
            With <strong style={{ color: "#E6EDF3" }}>{fmt(downsideCapture * 100, 0)}% downside capture</strong>{downsideCapture <= 0.34 ? " (losing only ⅓ of down moves)" : ""},
            {analysis.downYears > 0
              ? <> you saved <span className="mono gold">{fmt(analysis.totalDownsideSaved, 1)}pp</span> of cumulative downside across {analysis.downYears} negative {analysis.downYears === 1 ? "year" : "years"} over {years} {years === 1 ? "year" : "years"} of history.</>
              : <> there were no negative years in this period — downside protection provided zero benefit here, but didn't cost anything either.</>}
            {" "}To translate {analysis.downYears > 0 ? "that protection" : "your capture profile"} into {fmt(targetMultiple, 1)}× cumulative
            market returns, you need to capture <span className="mono gold">{fmt(analysis.requiredUpside * 100, 1)}%</span> of
            every up-year — that's {analysis.requiredUpside > 1 ? "amplifying" : "capturing"} the upside
            by {fmt(Math.abs(analysis.requiredUpside - 1) * 100, 1)}pp {analysis.requiredUpside > 1 ? "above" : "below"} the
            S&P on average. Max drawdown drops
            from <span className="mono blue">-{fmt(analysis.marketMaxDD, 1)}%</span> to <span className="mono gold">-{fmt(analysis.portfolioMaxDD, 1)}%</span>.
            Per dollar invested in {effStart}: S&P ends at <span className="mono blue">{fmtDollars(analysis.market.final)}</span>,
            Portfolio at <span className="mono gold">{fmtDollars(analysis.portfolio.final)}</span> — a{" "}
            <span className="mono gold">{fmt(analysis.portfolio.final / analysis.market.final, 1)}×</span> wealth multiple.
          </p>
        </div>

        <div className="dim" style={{ fontSize: 11, textAlign: "center", marginTop: 20, letterSpacing: 0.5 }}>
          EKANTIK CAPITAL · S&P 500 Total Return Data · {FULL_START}–{FULL_END} Universe
        </div>
      </div>
    </div>
  );
}
