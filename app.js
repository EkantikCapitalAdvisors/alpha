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

// ═══════════════════════════════════
// MAIN
// ═══════════════════════════════════
function LeadMagnetSection() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [ref, visible] = useInView(0.1);
  const [hoverCta, setHoverCta] = useState(false);
  const [hoverConsult, setHoverConsult] = useState(false);

  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (honeypot) return; // bot trap
    if (!email.trim()) { setError("Please enter your email address."); return; }
    if (!validateEmail(email)) { setError("Please enter a valid email address."); return; }
    setError("");
    setLoading(true);
    // Simulate API call — Phase 2 will add real backend
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // Trigger download
      const link = document.createElement("a");
      link.href = "ECA_Investment_Framework.pptx";
      link.download = "ECA_Investment_Framework.pptx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Analytics event
      if (typeof gtag === "function") gtag("event", "lead_magnet_download_success", { page: "alpha", email_domain: email.split("@")[1] });
    }, 1200);
    if (typeof gtag === "function") gtag("event", "lead_magnet_submit_clicked", { page: "alpha" });
  };

  const trustBullets = [
    "Systematic 5-Step research framework",
    "Dual-Engine portfolio architecture",
    "Risk-first design with engineered capital protection"
  ];

  return React.createElement("section", {
    id: "lead-magnet",
    ref: ref,
    style: {
      padding: "100px 24px",
      background: "linear-gradient(180deg, " + NAVY + " 0%, " + DARK + " 100%)",
      position: "relative",
      overflow: "hidden"
    }
  },
  // Subtle glow
  React.createElement("div", { style: {
    position: "absolute", inset: 0,
    background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(200,169,81,0.04) 0%, transparent 70%)"
  }}),
  React.createElement("div", { style: { position: "relative", zIndex: 1, maxWidth: 1000, margin: "0 auto" }},
    React.createElement(Fade, null,
      React.createElement("div", {
        style: {
          background: "linear-gradient(135deg, rgba(27,42,74,0.95), rgba(15,22,41,0.98))",
          border: "1px solid rgba(200,169,81,0.2)",
          borderRadius: 12,
          padding: 0,
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(0,0,0,0.3)"
        }
      },
      React.createElement("div", {
        className: "lm-grid",
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: 420
        }
      },
      // LEFT — Visual mockup
      React.createElement("div", {
        style: {
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: "48px 40px",
          background: "linear-gradient(135deg, " + NAVY + ", #243B6A)",
          position: "relative"
        }
      },
        React.createElement("div", { style: {
          position: "absolute", top: 20, left: 24,
          background: "rgba(200,169,81,0.15)", color: GOLD,
          fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
          padding: "5px 14px", borderRadius: 4
        }}, "FREE DOWNLOAD"),
        // Deck mockup — stylized card stack
        React.createElement("div", { style: { position: "relative", width: 220, height: 160, margin: "20px 0 24px" }},
          // Shadow cards
          React.createElement("div", { style: {
            position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%) rotate(-3deg)",
            width: 200, height: 140, background: "rgba(200,169,81,0.08)", borderRadius: 8,
            border: "1px solid rgba(200,169,81,0.1)"
          }}),
          React.createElement("div", { style: {
            position: "absolute", bottom: 6, left: "50%", transform: "translateX(-50%) rotate(-1deg)",
            width: 208, height: 140, background: "rgba(200,169,81,0.12)", borderRadius: 8,
            border: "1px solid rgba(200,169,81,0.15)"
          }}),
          // Main card
          React.createElement("div", { style: {
            position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
            width: 216, height: 140, borderRadius: 8,
            background: "linear-gradient(135deg, #1B2A4A, #243B6A)",
            border: "1px solid rgba(200,169,81,0.3)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            padding: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
          }},
            React.createElement("div", { style: {
              fontFamily: "'Playfair Display', serif", fontSize: 13, color: GOLD,
              fontWeight: 700, marginBottom: 4, textAlign: "center", lineHeight: 1.3
            }}, "THE EKANTIK EDGE"),
            React.createElement("div", { style: {
              width: 30, height: 1, background: GOLD, margin: "6px 0", opacity: 0.5
            }}),
            React.createElement("div", { style: {
              fontSize: 8, color: "#94A3B8", textTransform: "uppercase",
              letterSpacing: 1.2, textAlign: "center"
            }}, "Investment Framework"),
            React.createElement("div", { style: {
              fontSize: 7, color: SLATE, marginTop: 8, textAlign: "center"
            }}, "Ekantik Capital Advisors")
          )
        ),
        React.createElement("div", { style: {
          fontSize: 13, color: "#94A3B8", fontWeight: 500, letterSpacing: 0.5
        }}, "20-Slide Framework")
      ),

      // RIGHT — Copy + Form
      React.createElement("div", {
        style: { padding: "48px 44px", display: "flex", flexDirection: "column", justifyContent: "center" }
      },
        !submitted ?
        // Pre-download state
        React.createElement("div", null,
          React.createElement("h2", { style: {
            fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 800,
            color: WHITE, lineHeight: 1.25, marginBottom: 8
          }}, "The Ekantik Edge"),
          React.createElement("p", { style: {
            fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#E8D9A0",
            marginBottom: 18, fontWeight: 400
          }}, "Our Proprietary Investment Framework"),
          React.createElement("p", { style: {
            color: "#94A3B8", fontSize: 14.5, lineHeight: 1.75, marginBottom: 22
          }}, "Discover the 5-step research methodology and dual-engine capital architecture that identifies the market\u2019s highest-conviction opportunities \u2014 before the consensus arrives."),
          // Trust bullets
          React.createElement("div", { style: { marginBottom: 26 }},
            trustBullets.map(function(b) {
              return React.createElement("div", { key: b, style: {
                display: "flex", alignItems: "center", gap: 10, marginBottom: 10
              }},
                React.createElement("span", { style: { color: GOLD, fontSize: 14 }}, "\u2713"),
                React.createElement("span", { style: { color: WHITE, fontSize: 14 }}, b)
              );
            })
          ),
          // Form
          React.createElement("form", { onSubmit: handleSubmit, style: { display: "flex", gap: 10, flexWrap: "wrap" }},
            // Honeypot (hidden)
            React.createElement("input", {
              type: "text", name: "website", value: honeypot,
              onChange: function(e) { setHoneypot(e.target.value); },
              style: { position: "absolute", left: -9999, opacity: 0, height: 0, width: 0 },
              tabIndex: -1, autoComplete: "off", "aria-hidden": "true"
            }),
            React.createElement("input", {
              type: "email", value: email,
              onChange: function(e) { setEmail(e.target.value); setError(""); },
              onFocus: function() { if (typeof gtag === "function") gtag("event", "lead_magnet_email_entered", { page: "alpha" }); },
              placeholder: "Enter your email address",
              style: {
                flex: "1 1 220px", padding: "14px 18px",
                background: WHITE, color: NAVY,
                border: "1px solid " + GOLD, borderRadius: 6,
                fontSize: 15, fontFamily: "'DM Sans', sans-serif",
                outline: "none", minWidth: 0
              }
            }),
            React.createElement("button", {
              type: "submit", disabled: loading,
              onMouseEnter: function() { setHoverCta(true); },
              onMouseLeave: function() { setHoverCta(false); },
              style: {
                background: hoverCta ? "#B8993E" : GOLD,
                color: NAVY, border: "none", borderRadius: 6,
                padding: "14px 28px", fontSize: 15, fontWeight: 700,
                cursor: loading ? "wait" : "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "background 0.3s",
                whiteSpace: "nowrap",
                opacity: loading ? 0.7 : 1
              }
            }, loading ? "Processing..." : "Download the Framework")
          ),
          error && React.createElement("p", { style: {
            color: "#EF4444", fontSize: 13, marginTop: 8
          }}, error),
          React.createElement("p", { style: {
            color: SLATE, fontSize: 12, fontStyle: "italic", marginTop: 12
          }}, "We respect your inbox. No spam, ever.")
        )
        :
        // Post-download (thank-you) state
        React.createElement("div", null,
          React.createElement("div", { style: {
            fontSize: 28, marginBottom: 12
          }}, "\u2705"),
          React.createElement("h2", { style: {
            fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 800,
            color: WHITE, lineHeight: 1.3, marginBottom: 14
          }}, "Your download is starting..."),
          React.createElement("p", { style: {
            color: "#94A3B8", fontSize: 14.5, lineHeight: 1.75, marginBottom: 28
          }}, "We\u2019ve also sent a copy to your inbox. Ready to see the full framework \u2014 including our proprietary position sizing parameters and risk architecture? Schedule your private strategy consultation."),
          React.createElement("a", {
            href: "mailto:info@ekantikcapital.com?subject=Private%20Consultation%20Request",
            style: { textDecoration: "none" }
          },
            React.createElement("button", {
              onMouseEnter: function() { setHoverConsult(true); },
              onMouseLeave: function() { setHoverConsult(false); },
              style: {
                background: hoverConsult ? "#B8993E" : GOLD,
                color: NAVY, border: "none", borderRadius: 6,
                padding: "14px 32px", fontSize: 15, fontWeight: 700,
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                transition: "background 0.3s", marginBottom: 14
              }
            }, "Schedule a Private Consultation")
          ),
          React.createElement("p", null,
            React.createElement("a", {
              href: "ECA_Investment_Framework.pptx",
              download: "ECA_Investment_Framework.pptx",
              style: { color: GOLD, fontSize: 13, textDecoration: "underline" }
            }, "Didn\u2019t start? Click here to download.")
          )
        )
      )
    )))
  ));
}
function ResearchPortalLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
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
      desc: "Target: 2\u00D7 market returns with a hard 20% maximum risk ceiling. Stocks capped at 14%, LEAPS at 6%. Live exposure monitoring so you always know where you stand."
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
  }, ["Alpha Engine", "Features", "Framework", "Get Access"].map(item => /*#__PURE__*/React.createElement("a", {
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
    href: "https://researchportal.ekantikcapital.com/register",
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
  }, "GET ACCESS"))))), /*#__PURE__*/React.createElement("section", {
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
  }, "Free access"), /*#__PURE__*/React.createElement("span", {
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
  }, "$100K model portfolio included"))), /*#__PURE__*/React.createElement(Fade, {
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
    href: "https://researchportal.ekantikcapital.com/register",
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-gold"
  }, "Explore the Research")), /*#__PURE__*/React.createElement("a", {
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
    label: "Target: Market Returns · 20% Max Risk"
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
  }, "Routine Evaluation Process:"), " Scan \u2192 Analyze \u2192 Evaluate \u2192 Adjust \u2192 Verify \u2192 Iterate. Applied continuously to all holdings and opportunities."))))),

  // ═══════════════════════════════════
  // HOW WE TARGET 2x MODULE
  // ═══════════════════════════════════
  /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "100px 24px",
      background: "linear-gradient(180deg, " + NAVY + " 0%, " + DARK + " 100%)",
      position: "relative",
      overflow: "hidden"
    }
  },
  // Subtle radial glow
  /*#__PURE__*/React.createElement("div", { style: {
    position: "absolute", inset: 0,
    background: "radial-gradient(ellipse 50% 50% at 50% 40%, rgba(200,169,81,0.03) 0%, transparent 70%)"
  }}),
  /*#__PURE__*/React.createElement("div", { style: { position: "relative", zIndex: 1, maxWidth: 960, margin: "0 auto" }},
    /*#__PURE__*/React.createElement(Fade, null,
      /*#__PURE__*/React.createElement("div", { style: { textAlign: "center", marginBottom: 56 }},
        /*#__PURE__*/React.createElement(GoldLine, null),
        /*#__PURE__*/React.createElement("h2", { style: {
          fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 700,
          marginBottom: 10, color: WHITE
        }}, "How We Target 2\u00D7 Market Returns"),
        /*#__PURE__*/React.createElement("p", { style: {
          fontFamily: "'Playfair Display', serif", fontSize: 18, color: GOLD,
          fontWeight: 400, fontStyle: "italic", marginBottom: 14
        }}, "The math of asymmetric capture"),
        /*#__PURE__*/React.createElement("p", { style: {
          color: SLATE, fontSize: 15, maxWidth: 620, margin: "0 auto", lineHeight: 1.8
        }}, "You don\u2019t need to crush the market every year. You just need to protect aggressively on the downside and slightly amplify the upside. The compounding does the rest.")
      )
    ),

    // Two-column insight layout
    /*#__PURE__*/React.createElement(Fade, { delay: 0.1 },
      /*#__PURE__*/React.createElement("div", {
        className: "target2x-grid",
        style: {
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginBottom: 40
        }
      },
        // Left — Downside Protection
        /*#__PURE__*/React.createElement("div", { style: {
          background: "linear-gradient(135deg, rgba(27,42,74,0.95), rgba(15,22,41,0.98))",
          border: "1px solid rgba(200,169,81,0.15)", borderRadius: 12,
          padding: "36px 32px"
        }},
          /*#__PURE__*/React.createElement("div", { style: {
            fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
            color: "#22C55E", marginBottom: 16
          }}, "\u25BC DOWNSIDE PROTECTION"),
          /*#__PURE__*/React.createElement("div", { style: {
            fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 800,
            color: WHITE, marginBottom: 6
          }}, "50%"),
          /*#__PURE__*/React.createElement("p", { style: {
            color: "#94A3B8", fontSize: 14, lineHeight: 1.7, marginBottom: 20
          }}, "We target capturing only half of market downside. When the S&P falls, our risk architecture is designed to absorb a fraction of the damage."),
          /*#__PURE__*/React.createElement("div", { style: {
            background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.15)",
            borderRadius: 8, padding: "16px 20px"
          }},
            /*#__PURE__*/React.createElement("div", { style: { color: SLATE, fontSize: 12, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}, "What this means in practice \u2014 modeled"),
            [
              ["2008 crash", "\u201337%", "~\u201318.5% modeled", "18.5pp modeled savings"],
              ["2018 dip", "\u20134.4%", "~\u20132.2% modeled", "2.2pp modeled savings"],
              ["2022 bear", "\u201318.1%", "~\u20139.1% modeled", "9.1pp modeled savings"]
            ].map(function(row) {
              return /*#__PURE__*/React.createElement("div", { key: row[0], style: {
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.04)"
              }},
                /*#__PURE__*/React.createElement("span", { style: { color: WHITE, fontSize: 13, fontWeight: 600, flex: "0 0 80px" }}, row[0]),
                /*#__PURE__*/React.createElement("span", { style: { color: "#EF4444", fontSize: 13, flex: "0 0 50px", textAlign: "center" }}, row[1]),
                /*#__PURE__*/React.createElement("span", { style: { color: "#94A3B8", fontSize: 13, flex: "0 0 20px", textAlign: "center" }}, "\u2192"),
                /*#__PURE__*/React.createElement("span", { style: { color: "#22C55E", fontSize: 13, flex: "0 0 90px", textAlign: "center" }}, row[2]),
                /*#__PURE__*/React.createElement("span", { style: {
                  color: GOLD, fontSize: 11, fontWeight: 700, flex: "0 0 110px", textAlign: "right"
                }}, row[3])
              );
            }),
            /*#__PURE__*/React.createElement("p", { style: {
              color: "#64748B", fontSize: 11, fontStyle: "italic", marginTop: 12, lineHeight: 1.6
            }}, "Retrospective model \u2014 Ekantik Capital did not manage capital during these periods. Figures assume the current architecture\u2019s 50% downside-capture target applied to historical S&P 500 drawdowns.")
          )
        ),

        // Right — Upside Amplification
        /*#__PURE__*/React.createElement("div", { style: {
          background: "linear-gradient(135deg, rgba(27,42,74,0.95), rgba(15,22,41,0.98))",
          border: "1px solid rgba(200,169,81,0.15)", borderRadius: 12,
          padding: "36px 32px"
        }},
          /*#__PURE__*/React.createElement("div", { style: {
            fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
            color: GOLD, marginBottom: 16
          }}, "\u25B2 UPSIDE AMPLIFICATION"),
          /*#__PURE__*/React.createElement("div", { style: {
            fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 800,
            color: WHITE, marginBottom: 6
          }}, "~110%"),
          /*#__PURE__*/React.createElement("p", { style: {
            color: "#94A3B8", fontSize: 14, lineHeight: 1.7, marginBottom: 20
          }}, "In up years, we need to capture roughly 110% of the market\u2019s return \u2014 just 9.8 percentage points above the S&P on average. Not heroic. Surprisingly achievable."),
          /*#__PURE__*/React.createElement("div", { style: {
            background: "rgba(200,169,81,0.06)", border: "1px solid rgba(200,169,81,0.12)",
            borderRadius: 8, padding: "16px 20px"
          }},
            /*#__PURE__*/React.createElement("div", { style: { color: SLATE, fontSize: 12, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}, "The compounding advantage"),
            /*#__PURE__*/React.createElement("p", { style: { color: "#94A3B8", fontSize: 13, lineHeight: 1.7, margin: "0 0 12px" }},
              "Across 20 years, the S&P had only ", /*#__PURE__*/React.createElement("strong", { style: { color: WHITE }}, "3 down years"),
              ". By saving ~29.8 percentage points of cumulative downside damage, that preserved capital compounds forward through 17 up years."
            ),
            /*#__PURE__*/React.createElement("p", { style: { color: "#94A3B8", fontSize: 13, lineHeight: 1.7, margin: 0 }},
              "Result: max drawdown drops from ", /*#__PURE__*/React.createElement("span", { style: { color: "#EF4444", fontWeight: 700 }}, "\u201337%"),
              " to ", /*#__PURE__*/React.createElement("span", { style: { color: "#22C55E", fontWeight: 700 }}, "\u201318.5%"),
              "."
            )
          )
        )
      )
    ),

    // $100K Comparison — S&P vs Modeled
    /*#__PURE__*/React.createElement(Fade, { delay: 0.15 },
      /*#__PURE__*/React.createElement("div", {
        className: "comparison-visual",
        style: {
          display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 0,
          marginBottom: 40, alignItems: "stretch"
        }
      },
        // Left — S&P 500
        /*#__PURE__*/React.createElement("div", { style: {
          background: "linear-gradient(135deg, rgba(15,22,41,0.95), rgba(15,22,41,0.8))",
          border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px 0 0 12px",
          padding: "32px 28px", textAlign: "center"
        }},
          /*#__PURE__*/React.createElement("div", { style: {
            fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
            color: "#64748B", marginBottom: 8
          }}, "S&P 500 INDEX"),
          /*#__PURE__*/React.createElement("div", { style: {
            fontSize: 13, color: "#94A3B8", marginBottom: 16
          }}, "$100,000 invested Jan 2005"),
          /*#__PURE__*/React.createElement("div", { style: {
            fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 800,
            color: WHITE, marginBottom: 4
          }}, "$718,000"),
          /*#__PURE__*/React.createElement("div", { style: {
            fontSize: 13, color: "#94A3B8", marginBottom: 16
          }}, "10.3% annualized"),
          /*#__PURE__*/React.createElement("div", { style: {
            display: "inline-block", background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.2)", borderRadius: 6,
            padding: "6px 14px"
          }},
            /*#__PURE__*/React.createElement("span", { style: { fontSize: 11, color: "#94A3B8" }}, "Max Drawdown "),
            /*#__PURE__*/React.createElement("span", { style: { fontSize: 14, color: "#EF4444", fontWeight: 700 }}, "\u201337%")
          )
        ),

        // Center divider
        /*#__PURE__*/React.createElement("div", { style: {
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "linear-gradient(180deg, rgba(200,169,81,0.15), rgba(200,169,81,0.05))",
          padding: "0 20px", position: "relative"
        }},
          /*#__PURE__*/React.createElement("div", { style: {
            fontSize: 12, fontWeight: 700, color: GOLD, textTransform: "uppercase",
            letterSpacing: 2, writingMode: "vertical-rl", transform: "rotate(180deg)"
          }}, "VS")
        ),

        // Right — Ekantik Alpha (Modeled)
        /*#__PURE__*/React.createElement("div", { style: {
          background: "linear-gradient(135deg, rgba(27,42,74,0.95), rgba(15,22,41,0.98))",
          border: "1px solid rgba(200,169,81,0.2)", borderRadius: "0 12px 12px 0",
          padding: "32px 28px", textAlign: "center"
        }},
          /*#__PURE__*/React.createElement("div", { style: {
            fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
            color: GOLD, marginBottom: 8
          }}, "EKANTIK ALPHA \u2014 MODELED"),
          /*#__PURE__*/React.createElement("div", { style: {
            fontSize: 13, color: "#94A3B8", marginBottom: 16
          }}, "$100,000 invested Jan 2005"),
          /*#__PURE__*/React.createElement("div", { style: {
            fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 800,
            color: GOLD, marginBottom: 4
          }}, "$1,342,000"),
          /*#__PURE__*/React.createElement("div", { style: {
            fontSize: 13, color: "#94A3B8", marginBottom: 16
          }}, "13.9% annualized"),
          /*#__PURE__*/React.createElement("div", { style: {
            display: "inline-block", background: "rgba(34,197,94,0.08)",
            border: "1px solid rgba(34,197,94,0.15)", borderRadius: 6,
            padding: "6px 14px"
          }},
            /*#__PURE__*/React.createElement("span", { style: { fontSize: 11, color: "#94A3B8" }}, "Max Drawdown "),
            /*#__PURE__*/React.createElement("span", { style: { fontSize: 14, color: "#22C55E", fontWeight: 700 }}, "\u201318.5%")
          )
        )
      ),
      /*#__PURE__*/React.createElement("p", { style: {
        color: "#64748B", fontSize: 11, fontStyle: "italic", textAlign: "center",
        marginTop: -28, marginBottom: 40, lineHeight: 1.5
      }}, "Hypothetical modeled performance based on S&P 500 Total Return Data, 2005\u20132024. Ekantik Capital did not manage capital during this period.")
    ),

    // Key Insight callout
    /*#__PURE__*/React.createElement(Fade, { delay: 0.2 },
      /*#__PURE__*/React.createElement("div", { style: {
        background: "linear-gradient(135deg, rgba(200,169,81,0.08), rgba(200,169,81,0.03))",
        border: "1px solid rgba(200,169,81,0.25)", borderRadius: 12,
        padding: "32px 36px", textAlign: "center"
      }},
        /*#__PURE__*/React.createElement("div", { style: {
          fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
          color: GOLD, marginBottom: 14
        }}, "KEY INSIGHT"),
        /*#__PURE__*/React.createElement("p", { style: {
          fontFamily: "'Playfair Display', serif", fontSize: 20, color: WHITE,
          lineHeight: 1.6, margin: "0 auto", maxWidth: 740, fontWeight: 500
        }},
          "Capital preservation does most of the heavy lifting. Protect aggressively in the few down years, ",
          /*#__PURE__*/React.createElement("span", { style: { color: GOLD }}, "slightly amplify"),
          " the many up years, and let ",
          /*#__PURE__*/React.createElement("span", { style: { color: GOLD }}, "compounding"),
          " bridge the gap to our 2\u00D7 target."
        ),
        /*#__PURE__*/React.createElement("p", { style: {
          color: "#64748B", fontSize: 14, fontStyle: "italic", marginTop: 16, lineHeight: 1.7,
          maxWidth: 700, margin: "16px auto 0"
        }}, "This outcome assumes consistent execution of the asymmetric capture profile across multiple market regimes. Actual capture ratios will vary \u2014 some drawdowns are too fast to hedge fully (e.g., Covid 2020), while some up years may see capture above or below 110%. The 2\u00D7 target is a multi-decade structural goal, not a yearly guarantee.")
      )
    ),

    // The Mechanism — how we actually target 50% downside capture
    /*#__PURE__*/React.createElement(Fade, { delay: 0.3 },
      /*#__PURE__*/React.createElement("div", { style: { marginTop: 40 }},
        /*#__PURE__*/React.createElement("div", { style: { textAlign: "center", marginBottom: 36 }},
          /*#__PURE__*/React.createElement("h3", { style: {
            fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700,
            color: WHITE, marginBottom: 8
          }}, "The Mechanism"),
          /*#__PURE__*/React.createElement("p", { style: {
            fontFamily: "'Playfair Display', serif", fontSize: 16, color: GOLD,
            fontWeight: 400, fontStyle: "italic", marginBottom: 6
          }}, "How we actually target 50% downside capture"),
          /*#__PURE__*/React.createElement("p", { style: {
            color: SLATE, fontSize: 14, maxWidth: 500, margin: "0 auto"
          }}, "The math is the outcome. These are the levers.")
        ),
        /*#__PURE__*/React.createElement("div", {
          className: "mechanism-grid",
          style: {
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginBottom: 32
          }
        },
          // Lever 1 — Structural Allocation
          /*#__PURE__*/React.createElement("div", { style: {
            background: "linear-gradient(135deg, rgba(27,42,74,0.95), rgba(15,22,41,0.98))",
            border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12,
            borderTop: "2px solid rgba(200,169,81,0.5)",
            padding: "28px 24px"
          }},
            /*#__PURE__*/React.createElement("div", { style: {
              fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
              color: GOLD, marginBottom: 12
            }}, "LEVER 1"),
            /*#__PURE__*/React.createElement("div", { style: {
              fontSize: 17, fontWeight: 700, color: WHITE, marginBottom: 14
            }}, "Structural Allocation"),
            /*#__PURE__*/React.createElement("p", { style: {
              color: "#94A3B8", fontSize: 13, lineHeight: 1.7, marginBottom: 20
            }}, "70\u201385% of capital held in SPY, high-quality equities, and cash equivalents. Shifts toward cash during corrections >10%, reducing exposure before drawdowns deepen."),
            /*#__PURE__*/React.createElement("div", { style: {
              borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 14
            }},
              /*#__PURE__*/React.createElement("div", { style: { fontSize: 10, color: SLATE, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}, "Contribution to downside capture:"),
              /*#__PURE__*/React.createElement("div", { style: { fontSize: 13, color: "#22C55E", fontWeight: 600 }}, "Primary \u2014 sets the baseline exposure")
            )
          ),

          // Lever 2 — Tactical Risk Layer
          /*#__PURE__*/React.createElement("div", { style: {
            background: "linear-gradient(135deg, rgba(27,42,74,0.95), rgba(15,22,41,0.98))",
            border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12,
            borderTop: "2px solid rgba(200,169,81,0.5)",
            padding: "28px 24px"
          }},
            /*#__PURE__*/React.createElement("div", { style: {
              fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
              color: GOLD, marginBottom: 12
            }}, "LEVER 2"),
            /*#__PURE__*/React.createElement("div", { style: {
              fontSize: 17, fontWeight: 700, color: WHITE, marginBottom: 14
            }}, "Tactical Risk Layer"),
            /*#__PURE__*/React.createElement("p", { style: {
              color: "#94A3B8", fontSize: 13, lineHeight: 1.7, marginBottom: 20
            }}, "3\u20135% defined-risk futures overlay with hard stops. Reduces net market exposure during high-volatility regimes without requiring market timing."),
            /*#__PURE__*/React.createElement("div", { style: {
              borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 14
            }},
              /*#__PURE__*/React.createElement("div", { style: { fontSize: 10, color: SLATE, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}, "Contribution to downside capture:"),
              /*#__PURE__*/React.createElement("div", { style: { fontSize: 13, color: "#22C55E", fontWeight: 600 }}, "Secondary \u2014 trims residual exposure during regime shifts")
            )
          ),

          // Lever 3 — Convexity Sleeve
          /*#__PURE__*/React.createElement("div", { style: {
            background: "linear-gradient(135deg, rgba(27,42,74,0.95), rgba(15,22,41,0.98))",
            border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12,
            borderTop: "2px solid rgba(200,169,81,0.5)",
            padding: "28px 24px"
          }},
            /*#__PURE__*/React.createElement("div", { style: {
              fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
              color: GOLD, marginBottom: 12
            }}, "LEVER 3"),
            /*#__PURE__*/React.createElement("div", { style: {
              fontSize: 17, fontWeight: 700, color: WHITE, marginBottom: 14
            }}, "Convexity Sleeve"),
            /*#__PURE__*/React.createElement("p", { style: {
              color: "#94A3B8", fontSize: 13, lineHeight: 1.7, marginBottom: 20
            }}, "3\u20135% asymmetric options positions deployed selectively during dislocations. Limited downside, asymmetric upside \u2014 contributes upside amplification without adding principal risk."),
            /*#__PURE__*/React.createElement("div", { style: {
              borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 14
            }},
              /*#__PURE__*/React.createElement("div", { style: { fontSize: 10, color: SLATE, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}, "Contribution to upside amplification:"),
              /*#__PURE__*/React.createElement("div", { style: { fontSize: 13, color: GOLD, fontWeight: 600 }}, "Primary \u2014 captures convex payoffs without leveraging principal")
            )
          )
        ),

        // Bottom band
        /*#__PURE__*/React.createElement("div", { style: {
          background: "linear-gradient(135deg, rgba(200,169,81,0.08), rgba(200,169,81,0.03))",
          border: "1px solid rgba(200,169,81,0.2)", borderRadius: 10,
          padding: "20px 28px", textAlign: "center"
        }},
          /*#__PURE__*/React.createElement("p", { style: {
            color: WHITE, fontSize: 14, lineHeight: 1.7, margin: 0
          }},
            "\u2699\uFE0F The mechanism matters more than the math. The math describes what happens ",
            /*#__PURE__*/React.createElement("em", null, "if"),
            " the mechanism works. The mechanism is what we actually execute \u2014 transparently, in real accounts, with every trade published."
          )
        ),

        // Expanded footer disclaimer
        /*#__PURE__*/React.createElement("p", { style: {
          color: "#64748B", fontSize: 11, fontStyle: "italic", marginTop: 20,
          textAlign: "center", lineHeight: 1.6, maxWidth: 780, margin: "20px auto 0"
        }}, "Based on S&P 500 Total Return Data, 2005\u20132024. Hypothetical analysis for illustrative purposes only. Modeled capture ratios assume the current Ekantik architecture\u2019s design targets applied retrospectively; Ekantik Capital did not manage capital during these periods. Actual capture ratios vary with market regime, execution quality, liquidity conditions, and portfolio sizing. Past performance does not guarantee future results.")
      )
    )
  )),

  /*#__PURE__*/React.createElement(LeadMagnetSection, null),
  /*#__PURE__*/React.createElement("section", {
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
    href: "https://researchportal.ekantikcapital.com/register",
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
  }, "Hypothetical results based on model portfolio signals. Does not represent actual trading or account performance. All investments carry risk, including potential loss of principal. Past performance does not guarantee future results.")))), /*#__PURE__*/React.createElement("section", {
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
    id: "get-access",
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
  }, "See the Methodology. Judge the Results."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: SLATE,
      fontSize: 15,
      maxWidth: 580,
      margin: "0 auto",
      lineHeight: 1.7
    }
  }, "We\u2019re not here to sell you a subscription. We\u2019re here to earn your trust. Get full access to every framework, every trade signal, and the live $100K model portfolio. Study the methodology. Watch the results. Then decide if this belongs in your process."))),
  /*#__PURE__*/React.createElement(Fade, {
    delay: 0.15
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg, rgba(27,42,74,0.6), rgba(27,42,74,0.2))`,
      border: `1.5px solid ${GOLD}`,
      borderRadius: 20,
      padding: "48px 40px",
      position: "relative",
      overflow: "hidden",
      maxWidth: 560,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0, left: 0, right: 0, height: 3,
      background: `linear-gradient(90deg, ${GOLD}, #D4B968, ${GOLD})`,
      backgroundSize: "200% 100%",
      animation: "shimmer 3s linear infinite"
    }
  }),
  /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center", marginBottom: 28
    }
  },
    /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11, color: GOLD, letterSpacing: 2, textTransform: "uppercase",
        fontWeight: 700, marginBottom: 10
      }
    }, "OPEN ACCESS"),
    /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 800,
        color: WHITE, marginBottom: 6
      }
    }, "Everything. Free."),
    /*#__PURE__*/React.createElement("p", {
      style: { color: SLATE, fontSize: 14, lineHeight: 1.6 }
    }, "No credit card. No time limit. No catch. Just the work.")
  ),
  /*#__PURE__*/React.createElement("div", {
    className: "feat-grid",
    style: {
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 32
    }
  }, [
    "12 proprietary frameworks",
    "$100K model portfolio",
    "Real-time trade alerts",
    "Complete trade journal",
    "Conviction scorecards",
    "Catalyst calendar",
    "Portfolio heat monitoring",
    "Discord community access"
  ].map(f => /*#__PURE__*/React.createElement("div", {
    key: f,
    style: { display: "flex", alignItems: "center", gap: 8, color: "#CBD5E1", fontSize: 13 }
  }, /*#__PURE__*/React.createElement("span", { style: { color: GOLD, fontSize: 10 } }, "\u25CF"), " ", f))),
  /*#__PURE__*/React.createElement("a", {
    href: "https://researchportal.ekantikcapital.com/register",
    target: "_blank",
    rel: "noopener noreferrer",
    style: { textDecoration: "none", display: "block" }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-gold",
    style: { width: "100%", fontSize: 15 }
  }, "Get Access")),
  /*#__PURE__*/React.createElement("p", {
    style: { color: SLATE, fontSize: 12, textAlign: "center", marginTop: 14 }
  }, "Study the methodology \xB7 Watch the track record build \xB7 Decide on your terms")
  )),
  /*#__PURE__*/React.createElement(Fade, {
    delay: 0.3
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex", justifyContent: "center", gap: 40, marginTop: 36, flexWrap: "wrap"
    }
  }, [{
    icon: "\uD83D\uDD2C",
    label: "Methodology First",
    desc: "Understand how we think"
  }, {
    icon: "\uD83E\uDD1D",
    label: "Trust Is Earned",
    desc: "We prove it, you decide"
  }, {
    icon: "\uD83D\uDCCA",
    label: "Live Track Record",
    desc: "Every trade on the record"
  }].map(t => /*#__PURE__*/React.createElement("div", {
    key: t.label,
    style: { textAlign: "center" }
  }, /*#__PURE__*/React.createElement("div", {
    style: { fontSize: 22, marginBottom: 6 }
  }, t.icon), /*#__PURE__*/React.createElement("div", {
    style: { fontSize: 13, color: WHITE, fontWeight: 600, marginBottom: 2 }
  }, t.label), /*#__PURE__*/React.createElement("div", {
    style: { fontSize: 12, color: SLATE }
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
    href: "https://researchportal.ekantikcapital.com/register",
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
  }, "Get Access")), /*#__PURE__*/React.createElement("button", {
    className: "btn-outline",
    onClick: function onClick() {
      var el = document.getElementById("lead-magnet");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, "Get the Framework Free")))
, /*#__PURE__*/React.createElement(Fade, {
    delay: 0.4
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: SLATE,
      fontSize: 12,
      marginTop: 28,
      letterSpacing: 0.8
    }
  }, "No credit card required \xB7 Full access \xB7 $100K model portfolio included")))), /*#__PURE__*/React.createElement("footer", {
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
