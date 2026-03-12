import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/* ─── DATA ─────────────────────────────────────────────── */
const SKILLS = [
  { icon: "🌐", title: "Web Developer",    desc: "Building modern, responsive web apps with React, Next.js and cutting-edge CSS." },
  { icon: "📱", title: "React Native Dev", desc: "Cross-platform mobile apps with smooth UX using React Native and Expo." },
  { icon: "🎨", title: "3D & UI Designer", desc: "Creating immersive 3D visuals and polished interfaces with Three.js & Figma." },
];

const EXPERIENCE = [
  { role: "React.js Developer",    company: "Starbucks", period: "March 2020 – April 2021", side: "left",
    points: ["Developing and maintaining web applications using React.js and other related technologies.", "Collaborating with cross-functional teams including designers, product managers, and developers to create high-quality products.", "Implementing responsive design and ensuring cross-browser compatibility.", "Participating in code reviews and providing constructive feedback to other developers."] },
  { role: "React Native Developer", company: "Tesla",     period: "Jan 2021 – Feb 2022",    side: "right",
    points: ["Building performant cross-platform mobile applications using React Native and Expo.", "Collaborating with cross-functional teams to deliver seamless user experiences.", "Implementing responsive design and ensuring cross-browser compatibility.", "Participating in code reviews and providing constructive feedback to other developers."] },
  { role: "Full Stack Developer",   company: "Apple",     period: "Mar 2022 – Jan 2023",    side: "left",
    points: ["Developing and maintaining web applications using React.js and other related technologies.", "Collaborating with cross-functional teams to deliver scalable solutions.", "Implementing responsive design and ensuring cross-browser compatibility.", "Participating in code reviews and providing constructive feedback."] },
];

const TECH = [
  { label: "HTML5",       color: "#e34f26", bg: "#2a1208" },
  { label: "CSS3",        color: "#2965f1", bg: "#080f2a" },
  { label: "JavaScript",  color: "#f7df1e", bg: "#2a2500" },
  { label: "TypeScript",  color: "#3178c6", bg: "#091826" },
  { label: "React",       color: "#61dafb", bg: "#082028" },
  { label: "Next.js",     color: "#ffffff", bg: "#181818" },
  { label: "Node.js",     color: "#6cc24a", bg: "#0c1f0a" },
  { label: "Three.js",    color: "#ffffff", bg: "#1a1a1a" },
  { label: "MongoDB",     color: "#47a248", bg: "#0a1f0a" },
  { label: "Figma",       color: "#f24e1e", bg: "#2a0f08" },
  { label: "AWS",         color: "#ff9900", bg: "#2a1c00" },
  { label: "Docker",      color: "#2496ed", bg: "#081626" },
];

const PROJECTS = [
  { title: "3D Portfolio",   desc: "Immersive 3D portfolio built with Three.js and React, featuring particle systems and WebGL shaders.",      tags: ["#react","#threejs","#webgl"],        img: "🌌" },
  { title: "Crypto Tracker", desc: "Real-time cryptocurrency tracker with live charts, portfolio management and price alerts.",                  tags: ["#react","#nodejs","#mongodb"],      img: "💹" },
  { title: "AI Chat App",    desc: "Full-stack AI-powered chat application with real-time messaging and GPT integration.",                       tags: ["#nextjs","#openai","#socket.io"],   img: "🤖" },
  { title: "E-Commerce",     desc: "Modern e-commerce platform with 3D product previews, Stripe payments and admin dashboard.",                  tags: ["#react","#nodejs","#stripe"],       img: "🛍️" },
];

const TESTIMONIALS = [
  { quote: "I thought it was impossible to make a website as beautiful as our product, but Vivek proved me wrong.", name: "Sara Lee",   role: "CEO at Acme Co",         avatar: "SL" },
  { quote: "I've never met a web developer who truly cares about their clients' success like Vivek does.",          name: "Chris Brown", role: "CEO at BJ Corp",         avatar: "CB" },
  { quote: "Vivek delivered beyond expectations. The 3D elements he built made our site truly unforgettable.",      name: "Lisa Wang",   role: "CTO at IBM Integrated", avatar: "LW" },
];

/* ─── HERO WAVE CANVAS ─────────────────────────────────── */
function WaveCanvas() {
  const ref = useRef();
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    let raf, t = 0;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (let w = 0; w < 18; w++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${120 + w * 6}, ${40 + w * 3}, 255, ${0.06 + w * 0.012})`;
        ctx.lineWidth = 1;
        for (let x = 0; x <= c.width; x += 3) {
          const y = c.height * 0.5
            + Math.sin((x / c.width) * Math.PI * 3 + t + w * 0.4) * (60 + w * 14)
            + Math.cos((x / c.width) * Math.PI * 2 + t * 0.7 + w * 0.2) * (30 + w * 6);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      t += 0.012;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.7 }} />;
}

/* ─── 3D PLANET (Contact) ──────────────────────────────── */
function Planet3D() {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    const W = el.clientWidth, H = el.clientHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.set(0, 0, 5);
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const d1 = new THREE.DirectionalLight(0x9966ff, 3); d1.position.set(3, 3, 3); scene.add(d1);
    const d2 = new THREE.DirectionalLight(0x00c3ff, 2); d2.position.set(-3,-1, 2); scene.add(d2);

    const group = new THREE.Group();
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x88ccaa, metalness: 0.6, roughness: 0.3, emissive: 0x113322, emissiveIntensity: 0.2 });
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2, r = 1.4 + Math.random() * 0.3;
      const geo = new THREE.SphereGeometry(0.18 + Math.random() * 0.12, 6, 6);
      const mat = baseMat.clone();
      mat.color.setHSL(0.35 + Math.random() * 0.15, 0.5, 0.4 + Math.random() * 0.2);
      const m = new THREE.Mesh(geo, mat);
      m.position.set(Math.cos(angle) * r, (Math.random() - 0.5) * 2.2, Math.sin(angle) * r * 0.6);
      m.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      group.add(m);
    }
    group.add(new THREE.Mesh(
      new THREE.SphereGeometry(1.0, 32, 32),
      new THREE.MeshStandardMaterial({ color: 0x224433, metalness: 0.8, roughness: 0.2, emissive: 0x112211, emissiveIntensity: 0.3 })
    ));
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.8, 0.03, 8, 100),
      new THREE.MeshBasicMaterial({ color: 0x9966ff, opacity: 0.4, transparent: true })
    );
    ring.rotation.x = 1.1; group.add(ring);
    scene.add(group);

    let raf;
    const animate = () => { raf = requestAnimationFrame(animate); group.rotation.y += 0.006; group.rotation.x += 0.001; renderer.render(scene, camera); };
    animate();
    return () => { cancelAnimationFrame(raf); renderer.dispose(); if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement); };
  }, []);
  return <div ref={ref} style={{ width:"100%", height:"100%", position:"absolute", top:0, right:0 }} />;
}

/* ─── HEXAGON ──────────────────────────────────────────── */
function Hex({ label, color, bg }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width:90, height:104,
        clipPath:"polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
        background: hov ? `linear-gradient(135deg,${color}33,${bg})` : bg,
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        cursor:"pointer", transition:"all 0.3s ease",
        transform: hov ? "scale(1.12) translateY(-4px)" : "scale(1)",
        boxShadow: hov ? `0 0 24px ${color}44` : "none",
      }}>
      <span style={{ fontSize:11, fontWeight:700, color, textAlign:"center", letterSpacing:"0.04em", lineHeight:1.2, padding:"0 6px" }}>{label}</span>
    </div>
  );
}

/* ─── MAIN ─────────────────────────────────────────────── */
export default function Portfolio() {
  const [activeNav, setActiveNav]         = useState("Home");
  const [scrolled, setScrolled]           = useState(false);
  const [visibleSections, setVisibleSecs] = useState({});
  const sectionRefs = useRef({});

  // ── Intro state (same as Space3DPortfolio__1_.jsx) ──
  // 0=blank  1=Vivek. blooms  2=</> slides in  3=ball bounces
  // 4=Developer fades + </>→|  5=hold  6=fly-to-nav  7=done
  const [iPhase, setIPhase]       = useState(0);
  const [introDone, setIntroDone] = useState(false);

  /* Equally-spaced timers (~850ms gap each) */
  useEffect(() => {
    const T = [];
    T.push(setTimeout(() => setIPhase(1), 350));   // Vivek. blooms
    T.push(setTimeout(() => setIPhase(2), 1200));  // </> slides in
    T.push(setTimeout(() => setIPhase(3), 2050));  // ball launches
    T.push(setTimeout(() => setIPhase(4), 3400));  // Developer + |
    T.push(setTimeout(() => setIPhase(5), 4250));  // hold
    T.push(setTimeout(() => setIPhase(6), 5100));  // fly to nav
    T.push(setTimeout(() => { setIPhase(7); setIntroDone(true); }, 6300));
    return () => T.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!introDone) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setVisibleSecs(p => ({ ...p, [e.target.id]: true })); });
    }, { threshold: 0.12 });
    Object.values(sectionRefs.current).forEach(r => r && obs.observe(r));
    return () => obs.disconnect();
  }, [introDone]);

  const reg = (id) => (el) => { sectionRefs.current[id] = el; };
  const vis = (id) => visibleSections[id];
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id.charAt(0).toUpperCase() + id.slice(1));
  };

  return (
    <div style={{ background:"#0b0b1e", color:"#fff", fontFamily:"'Sora',sans-serif", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:#0b0b1e; }
        ::-webkit-scrollbar-thumb { background:#7b2fff55; border-radius:4px; }

        /* ── INTRO OVERLAY ── */
        .intro-overlay {
          position: fixed; inset: 0; z-index: 500;
          display: flex; align-items: center; justify-content: center;
          pointer-events: all;
        }
        .intro-bg {
          position: absolute; inset: 0; background: #0b0b1e;
          transition: opacity 1.2s ease;
        }
        .intro-glow {
          position: absolute; top: 50%; left: 50%;
          width: 560px; height: 200px;
          background: radial-gradient(ellipse, rgba(123,47,255,0.18) 0%, transparent 70%);
          transform: translate(-50%,-50%);
          border-radius: 50%; pointer-events: none;
          transition: opacity 0.6s ease;
        }

        /* ── THE TITLE ROW: animated intro → permanent navbar logo ──
           During intro: position:fixed, centered
           Phase 6+: flies to exact nav logo position
           After done: stays there forever as the logo
        */
        .intro-title {
          position: fixed;
          font-family: 'Sora', sans-serif;
          font-weight: 800;
          font-size: 72px;
          letter-spacing: -0.04em;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 18px;
          z-index: 600;
          transform-origin: left top;
        }
        .intro-title.phase-fly {
          transition:
            top       0.95s cubic-bezier(0.77,0,0.18,1),
            left      0.95s cubic-bezier(0.77,0,0.18,1),
            transform 0.95s cubic-bezier(0.77,0,0.18,1);
        }

        .t-vivek {
          background: linear-gradient(135deg,#fff 20%,#c4a8ff 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          display: inline-block;
          transition:
            opacity   0.9s cubic-bezier(0.34,1.4,0.64,1),
            transform 0.9s cubic-bezier(0.34,1.4,0.64,1),
            filter    0.9s ease;
        }
        .t-divider {
          display: inline-block;
          color: #7b2fff;
          -webkit-text-fill-color: #7b2fff;
          filter: drop-shadow(0 0 12px rgba(123,47,255,0.9));
          font-size: 0.62em;
          min-width: 38px; text-align: center;
          transition:
            opacity   0.55s cubic-bezier(0.34,1.4,0.64,1) 0.08s,
            transform 0.55s cubic-bezier(0.34,1.4,0.64,1) 0.08s;
        }
        .t-divider.morphing {
          animation: dividerMorph 0.45s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        @keyframes dividerMorph {
          0%   { transform: scale(1) rotate(0deg);    opacity:1; }
          40%  { transform: scale(1.3) rotate(15deg); opacity:0.6; }
          100% { transform: scale(1) rotate(0deg);    opacity:1; }
        }
        .t-dev {
          background: linear-gradient(135deg,#7b2fff,#00c3ff);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          display: inline-block;
          transition:
            opacity   0.7s cubic-bezier(0.34,1.4,0.64,1) 0.12s,
            transform 0.7s cubic-bezier(0.34,1.4,0.64,1) 0.12s,
            filter    0.5s ease;
        }

        /* Bouncing ball */
        .intro-ball {
          position: fixed; top: 50%; z-index: 610;
          width: 26px; height: 26px; border-radius: 50%;
          background: radial-gradient(circle at 35% 35%,#a855f7,#00c3ff,#7b2fff);
          box-shadow: 0 0 22px rgba(0,195,255,0.8), 0 0 44px rgba(123,47,255,0.5), inset 0 0 10px rgba(255,255,255,0.3);
          pointer-events: none;
          animation: ballBounce 1.35s cubic-bezier(0.4,0,0.4,1) forwards;
        }
        @keyframes ballBounce {
          0%   { right:-40px;   transform:translateY(-50%) scale(1);   opacity:1; }
          9%   { right:8vw;     transform:translateY(calc(-50% - 52px)) scale(0.95); }
          18%  { right:18vw;    transform:translateY(-50%) scale(1.05); }
          28%  { right:29vw;    transform:translateY(calc(-50% - 66px)) scale(0.9); }
          38%  { right:38vw;    transform:translateY(-50%) scale(1.08); }
          48%  { right:44vw;    transform:translateY(calc(-50% - 42px)) scale(0.93); }
          57%  { right:48vw;    transform:translateY(-50%) scale(1.05); }
          66%  { right:50vw;    transform:translateY(calc(-50% - 25px)) scale(0.96); }
          74%  { right:51vw;    transform:translateY(-50%) scale(1.02); }
          82%  { right:51.5vw;  transform:translateY(calc(-50% - 12px)) scale(0.98); }
          88%  { right:51.8vw;  transform:translateY(-50%) scale(1.0);  opacity:1; }
          94%  { right:51.8vw;  transform:translateY(-50%) scale(1.8);  opacity:0.6; }
          100% { right:51.8vw;  transform:translateY(-50%) scale(0.05); opacity:0; }
        }

        /* ── SCROLL REVEAL ── */
        .fade-up {
          opacity:0; transform:translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1);
        }
        .fade-up.visible { opacity:1; transform:translateY(0); }
        .fade-left {
          opacity:0; transform:translateX(-50px);
          transition: opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1);
        }
        .fade-left.visible { opacity:1; transform:translateX(0); }
        .fade-right {
          opacity:0; transform:translateX(50px);
          transition: opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1);
        }
        .fade-right.visible { opacity:1; transform:translateX(0); }

        /* ── CARDS ── */
        .skill-card {
          background:rgba(255,255,255,0.04); border:1px solid rgba(123,47,255,0.2);
          border-radius:18px; padding:32px 28px;
          transition:all 0.3s ease; cursor:default; backdrop-filter:blur(10px);
        }
        .skill-card:hover {
          background:rgba(123,47,255,0.1); border-color:rgba(123,47,255,0.5);
          transform:translateY(-6px); box-shadow:0 20px 50px rgba(123,47,255,0.2);
        }
        .timeline-card {
          background:rgba(255,255,255,0.03); border:1px solid rgba(123,47,255,0.18);
          border-radius:16px; padding:28px; backdrop-filter:blur(8px); transition:all 0.3s ease;
        }
        .timeline-card:hover { border-color:rgba(123,47,255,0.45); box-shadow:0 12px 40px rgba(123,47,255,0.15); }
        .project-card {
          background:rgba(255,255,255,0.03); border:1px solid rgba(123,47,255,0.15);
          border-radius:18px; overflow:hidden; transition:all 0.35s ease; cursor:pointer;
        }
        .project-card:hover {
          border-color:rgba(123,47,255,0.5); transform:translateY(-8px);
          box-shadow:0 24px 60px rgba(123,47,255,0.25);
        }
        .testi-card {
          background:rgba(255,255,255,0.04); border:1px solid rgba(123,47,255,0.18);
          border-radius:18px; padding:32px; transition:all 0.3s ease;
        }
        .testi-card:hover {
          border-color:rgba(123,47,255,0.45); background:rgba(123,47,255,0.08); transform:translateY(-4px);
        }

        /* ── NAV LINKS ── */
        .nav-link-item {
          color:rgba(200,200,255,0.55); font-size:14px; font-weight:500;
          background:none; border:none; cursor:pointer; padding:6px 4px;
          font-family:'Sora',sans-serif; transition:color 0.2s;
          position:relative; letter-spacing:0.01em;
        }
        .nav-link-item::after {
          content:''; position:absolute; bottom:0; left:0; right:100%;
          height:1.5px; background:linear-gradient(90deg,#7b2fff,#00c3ff);
          transition:right 0.28s ease;
        }
        .nav-link-item:hover::after, .nav-link-item.active::after { right:0; }
        .nav-link-item:hover, .nav-link-item.active { color:#fff; }

        .section-label  { font-size:11px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:#7b2fff; margin-bottom:10px; }
        .section-title  { font-size:clamp(36px,5vw,64px); font-weight:800; letter-spacing:-0.03em; color:#fff; line-height:1.05; }
        .section-title .dot { color:#7b2fff; }

        .tag { display:inline-block; padding:4px 10px; background:rgba(123,47,255,0.15); border:1px solid rgba(123,47,255,0.3); border-radius:999px; font-size:11px; color:#a78bfa; font-weight:600; letter-spacing:0.03em; }

        .form-input {
          width:100%; padding:14px 18px; background:rgba(255,255,255,0.04);
          border:1px solid rgba(123,47,255,0.2); border-radius:10px; color:#fff;
          font-size:14px; font-family:'Sora',sans-serif; outline:none;
          transition:border-color 0.2s, box-shadow 0.2s;
        }
        .form-input:focus { border-color:rgba(123,47,255,0.6); box-shadow:0 0 0 3px rgba(123,47,255,0.1); }
        .form-input::placeholder { color:rgba(255,255,255,0.25); }

        .send-btn {
          padding:14px 40px; background:linear-gradient(135deg,#7b2fff,#00c3ff);
          border:none; border-radius:999px; color:#fff; font-size:14px; font-weight:700;
          font-family:'Sora',sans-serif; cursor:pointer; letter-spacing:0.03em;
          box-shadow:0 0 28px rgba(123,47,255,0.4); transition:all 0.25s;
        }
        .send-btn:hover { transform:translateY(-2px); box-shadow:0 6px 40px rgba(0,195,255,0.5); }

        .glow-dot { width:14px; height:14px; border-radius:50%; background:linear-gradient(135deg,#7b2fff,#00c3ff); box-shadow:0 0 12px rgba(123,47,255,0.8); flex-shrink:0; }
        .timeline-line { position:absolute; top:0; bottom:0; left:50%; width:2px; background:linear-gradient(to bottom,transparent,#7b2fff55,#00c3ff55,transparent); transform:translateX(-50%); }

        .social-btn { width:38px; height:38px; border-radius:50%; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all 0.2s; color:rgba(255,255,255,0.5); font-size:15px; }
        .social-btn:hover { background:rgba(123,47,255,0.2); border-color:rgba(123,47,255,0.5); color:#fff; transform:translateY(-2px); }

        @keyframes float    { 0%,100%{transform:translateY(0) rotate(0)}  50%{transform:translateY(-18px) rotate(3deg)} }
        @keyframes pulse    { 0%,100%{opacity:1;transform:scale(1)}       50%{opacity:0.4;transform:scale(0.6)} }
        @keyframes gradShift{ 0%,100%{background-position:0% 50%}         50%{background-position:100% 50%} }

        /* Navbar slide in after intro */
        @keyframes fadeInDown { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:translateY(0)} }
        .navbar-appear { animation: fadeInDown 0.6s cubic-bezier(0.4,0,0.2,1) both; }
        .nav-link-drop { opacity:0; animation: fadeInDown 0.5s cubic-bezier(0.4,0,0.2,1) forwards; }
      `}</style>

      {/* ══════════════════════════════════════
          DARK INTRO VEIL — fades at phase 6
      ══════════════════════════════════════ */}
      {iPhase < 7 && (
        <div className="intro-overlay" style={{ pointerEvents: iPhase < 7 ? "all" : "none" }}>
          <div className="intro-bg"  style={{ opacity: iPhase >= 6 ? 0 : 1 }} />
          <div className="intro-glow" style={{ opacity: iPhase >= 1 && iPhase < 6 ? 1 : 0 }} />
        </div>
      )}

      {/* ══════════════════════════════════════
          INTRO TITLE → PERMANENT NAV LOGO
          Single element: animates from center
          → flies to nav slot → stays as logo
      ══════════════════════════════════════ */}
      <div
        className={`intro-title${iPhase >= 6 ? " phase-fly" : ""}`}
        style={{
          // Phase 0-5 = centered; Phase 6+ = nav logo slot
          top:       iPhase >= 6 ? "20px" : "50%",
          left:      iPhase >= 6 ? "40px" : "50%",
          // Phase 0-5 = center-anchor + full scale
          // Phase 6+  = top-left anchor + nav scale (shrink to match 16px logo)
          transform: iPhase >= 6
            ? "scale(0.26)"
            : "translate(-50%,-50%) scale(1)",
          transformOrigin: "left top",
          pointerEvents: introDone ? "auto" : "none",
          cursor: introDone ? "pointer" : "default",
        }}
        onClick={() => introDone && scrollTo("home")}
      >
        {/* Vivek. */}
        <span
          className="t-vivek"
          style={{
            opacity:   iPhase >= 1 ? 1 : 0,
            transform: iPhase >= 1
              ? (iPhase >= 2 ? "scale(1) translateX(-8px)" : "scale(1) translateX(0)")
              : "scale(0.02) translateX(0)",
            filter: iPhase >= 1 ? "blur(0px)" : "blur(20px)",
          }}
        >
          Vivek.
        </span>

        {/* </> → | */}
        <span
          className={`t-divider${iPhase === 4 ? " morphing" : ""}`}
          style={{
            opacity:   iPhase >= 2 ? 1 : 0,
            transform: iPhase >= 2 ? "translateX(0) scale(1)" : "translateX(28px) scale(0.2)",
          }}
        >
          {iPhase >= 4 ? "|" : "</>"}
        </span>

        {/* Developer */}
        <span
          className="t-dev"
          style={{
            opacity:   iPhase >= 4 ? 1 : 0,
            transform: iPhase >= 4 ? "translateX(0) scale(1)" : "translateX(-8px) scale(0.85)",
            filter:    iPhase >= 4 ? "blur(0px)" : "blur(6px)",
          }}
        >
          Developer
        </span>
      </div>

      {/* Bouncing ball — phase 3 only */}
      {iPhase === 3 && <div className="intro-ball" />}

      {/* ══════════════════════════════════════
          MAIN CONTENT (visible after intro)
      ══════════════════════════════════════ */}
      {introDone && (
        <>
          {/* ── NAVBAR ── */}
          <nav className="navbar-appear" style={{
            position:"fixed", top:0, left:0, right:0, zIndex:100,
            height:64, display:"flex", alignItems:"center", padding:"0 40px",
            background: scrolled ? "rgba(11,11,30,0.88)" : "transparent",
            backdropFilter: scrolled ? "blur(20px)" : "none",
            borderBottom: scrolled ? "1px solid rgba(123,47,255,0.12)" : "none",
            transition:"background 0.4s, backdrop-filter 0.4s, border 0.4s",
          }}>
            {/* Spacer: matches the logo width so links start after the logo */}
            <div style={{ width:200, flexShrink:0 }} />
            {/* Nav links + source code — all flush left after logo */}
            <div style={{ display:"flex", alignItems:"center", gap:28 }}>
              {["about","work","contact"].map((id,i) => (
                <button
                  key={id}
                  className={`nav-link-item nav-link-drop ${activeNav.toLowerCase()===id?"active":""}`}
                  style={{ animationDelay:`${i*0.08}s` }}
                  onClick={() => scrollTo(id)}
                >
                  {id.charAt(0).toUpperCase()+id.slice(1)}
                </button>
              ))}
              <button
                className="nav-link-item nav-link-drop"
                style={{ animationDelay:"0.24s", color:"rgba(200,200,255,0.55)" }}
              >
                Source Code
              </button>
            </div>
          </nav>

          {/* ══════════════════════════════════════
              HERO
          ══════════════════════════════════════ */}
          <section id="home" style={{ position:"relative", minHeight:"100vh", display:"flex", alignItems:"center", overflow:"hidden", paddingTop:64 }}>
            <WaveCanvas />
            <div style={{ position:"absolute", top:"20%", right:"10%", width:500, height:500, background:"radial-gradient(circle,rgba(123,47,255,0.18) 0%,transparent 70%)", borderRadius:"50%", pointerEvents:"none" }} />
            <div style={{ position:"relative", zIndex:2, padding:"0 8vw", maxWidth:680 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:"#7b2fff", boxShadow:"0 0 8px #7b2fff", animation:"pulse 2s infinite" }} />
                <span style={{ fontSize:12, fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", color:"#7b2fff" }}>Available for work</span>
              </div>
              <h1 style={{ fontSize:"clamp(42px,6vw,80px)", fontWeight:800, lineHeight:1.06, letterSpacing:"-0.04em", marginBottom:20 }}>
                Hi, I'm{" "}
                <span style={{ background:"linear-gradient(90deg,#7b2fff,#00c3ff,#7b2fff)", backgroundSize:"200%", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", animation:"gradShift 4s ease infinite" }}>
                  Vivek
                </span>
              </h1>
              <p style={{ fontSize:18, color:"rgba(180,180,255,0.55)", lineHeight:1.7, marginBottom:36, maxWidth:480 }}>
                I develop 3D visuals, user interfaces and web applications
              </p>
              <div style={{ display:"flex", gap:14 }}>
                <button className="send-btn" onClick={() => scrollTo("work")}>View My Work</button>
                <button
                  style={{ padding:"14px 36px", background:"transparent", border:"1.5px solid rgba(123,47,255,0.4)", borderRadius:999, color:"rgba(200,205,255,0.7)", fontSize:14, fontWeight:500, fontFamily:"'Sora',sans-serif", cursor:"pointer", transition:"all 0.25s" }}
                  onClick={() => scrollTo("contact")}
                  onMouseOver={e=>{e.currentTarget.style.borderColor="#7b2fff";e.currentTarget.style.color="#fff"}}
                  onMouseOut={e=>{e.currentTarget.style.borderColor="rgba(123,47,255,0.4)";e.currentTarget.style.color="rgba(200,205,255,0.7)"}}
                >
                  Contact Me
                </button>
              </div>
            </div>
            {/* Floating code editor */}
            <div style={{ position:"absolute", right:"5%", bottom:"8%", width:"min(520px,48vw)", animation:"float 6s ease-in-out infinite", zIndex:2 }}>
              <div style={{ background:"rgba(123,47,255,0.08)", border:"1px solid rgba(123,47,255,0.2)", borderRadius:16, padding:24, backdropFilter:"blur(10px)", boxShadow:"0 0 60px rgba(123,47,255,0.15)" }}>
                <div style={{ display:"flex", gap:6, marginBottom:12 }}>
                  {["#ff5f57","#ffbd2e","#28c840"].map(c=><div key={c} style={{ width:10, height:10, borderRadius:"50%", background:c }}/>)}
                </div>
                <div style={{ fontFamily:"monospace", fontSize:11, lineHeight:1.8, color:"rgba(255,255,255,0.7)" }}>
                  <div><span style={{color:"#569cd6"}}>const</span> <span style={{color:"#9cdcfe"}}>portfolio</span> <span style={{color:"#d4d4d4"}}>=</span> <span style={{color:"#ce9178"}}>{"{"}</span></div>
                  <div style={{paddingLeft:16}}><span style={{color:"#9cdcfe"}}>name</span><span style={{color:"#d4d4d4"}}>:</span> <span style={{color:"#ce9178"}}>"Vivek"</span>,</div>
                  <div style={{paddingLeft:16}}><span style={{color:"#9cdcfe"}}>role</span><span style={{color:"#d4d4d4"}}>:</span> <span style={{color:"#ce9178"}}>"Full Stack Dev"</span>,</div>
                  <div style={{paddingLeft:16}}><span style={{color:"#9cdcfe"}}>skills</span><span style={{color:"#d4d4d4"}}>:</span> <span style={{color:"#4fc1ff"}}>["React", "3D", "Node"]</span>,</div>
                  <div style={{paddingLeft:16}}><span style={{color:"#9cdcfe"}}>passion</span><span style={{color:"#d4d4d4"}}>:</span> <span style={{color:"#ce9178"}}>"Building great UX"</span></div>
                  <div><span style={{color:"#ce9178"}}>{"}"}</span>;</div>
                </div>
              </div>
            </div>
            {/* Scroll cue */}
            <div style={{ position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:6, color:"rgba(120,120,190,0.3)", fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase" }}>
              <div style={{ width:1, height:40, background:"linear-gradient(to bottom,rgba(123,47,255,0.5),transparent)", animation:"pulse 2s infinite" }} />
              scroll
            </div>
          </section>

          {/* ══════════════════════════════════════
              ABOUT / SKILLS
          ══════════════════════════════════════ */}
          <section id="about" ref={reg("about")} style={{ padding:"120px 8vw", position:"relative" }}>
            <div style={{ maxWidth:900, margin:"0 auto" }}>
              <div className={`fade-up ${vis("about")?"visible":""}`}>
                <div className="section-label">WHAT I DO</div>
                <h2 className="section-title" style={{ marginBottom:16 }}>I build things for the <span style={{color:"#7b2fff"}}>web</span><span className="dot">.</span></h2>
                <p style={{ fontSize:16, color:"rgba(170,175,255,0.5)", maxWidth:580, lineHeight:1.75, marginBottom:60 }}>
                  Passionate about creating digital experiences that combine beautiful design with robust engineering. Every project is a chance to push boundaries.
                </p>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:24 }}>
                {SKILLS.map((s,i) => (
                  <div key={i} className={`skill-card fade-up ${vis("about")?"visible":""}`} style={{ transitionDelay:`${i*0.12}s` }}>
                    <div style={{ fontSize:40, marginBottom:16 }}>{s.icon}</div>
                    <h3 style={{ fontSize:20, fontWeight:700, marginBottom:10, letterSpacing:"-0.02em" }}>{s.title}</h3>
                    <p style={{ fontSize:13.5, color:"rgba(170,175,255,0.5)", lineHeight:1.7 }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════
              EXPERIENCE TIMELINE
          ══════════════════════════════════════ */}
          <section id="experience" ref={reg("experience")} style={{ padding:"100px 8vw", background:"rgba(255,255,255,0.01)", position:"relative", overflow:"hidden" }}>
            <div style={{ maxWidth:900, margin:"0 auto" }}>
              <div className={`fade-up ${vis("experience")?"visible":""}`} style={{ textAlign:"center", marginBottom:70 }}>
                <div className="section-label">MY JOURNEY</div>
                <h2 className="section-title">Experience<span className="dot">.</span></h2>
              </div>
              <div style={{ position:"relative" }}>
                <div className="timeline-line" />
                <div style={{ display:"flex", flexDirection:"column", gap:60 }}>
                  {EXPERIENCE.map((e,i) => (
                    <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 60px 1fr", alignItems:"center", gap:0 }}>
                      {/* left */}
                      <div className={`fade-left ${vis("experience")?"visible":""}`} style={{ transitionDelay:`${i*0.15}s`, textAlign:"right", paddingRight:32, ...(e.side==="right"?{opacity:0,pointerEvents:"none"}:{}) }}>
                        {e.side === "left" && (
                          <div className="timeline-card">
                            <div style={{ fontSize:12, color:"#7b2fff", fontWeight:600, letterSpacing:"0.06em", marginBottom:6 }}>{e.period}</div>
                            <h3 style={{ fontSize:18, fontWeight:700, marginBottom:4 }}>{e.role}</h3>
                            <div style={{ fontSize:13, color:"rgba(200,200,255,0.45)", marginBottom:14, fontStyle:"italic" }}>{e.company}</div>
                            <ul style={{ listStyle:"none", paddingLeft:0 }}>
                              {e.points.map((p,j) => (
                                <li key={j} style={{ fontSize:13, color:"rgba(170,175,255,0.5)", lineHeight:1.65, marginBottom:6, display:"flex", alignItems:"flex-start", gap:8, textAlign:"left" }}>
                                  <span style={{ color:"#7b2fff", marginTop:3, flexShrink:0 }}>▸</span>{p}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      {/* dot */}
                      <div style={{ display:"flex", justifyContent:"center" }}>
                        <div className="glow-dot" />
                      </div>
                      {/* right */}
                      <div className={`fade-right ${vis("experience")?"visible":""}`} style={{ transitionDelay:`${i*0.15}s`, paddingLeft:32, ...(e.side==="left"?{opacity:0,pointerEvents:"none"}:{}) }}>
                        {e.side === "right" && (
                          <div className="timeline-card">
                            <div style={{ fontSize:12, color:"#7b2fff", fontWeight:600, letterSpacing:"0.06em", marginBottom:6 }}>{e.period}</div>
                            <h3 style={{ fontSize:18, fontWeight:700, marginBottom:4 }}>{e.role}</h3>
                            <div style={{ fontSize:13, color:"rgba(200,200,255,0.45)", marginBottom:14, fontStyle:"italic" }}>{e.company}</div>
                            <ul style={{ listStyle:"none" }}>
                              {e.points.map((p,j) => (
                                <li key={j} style={{ fontSize:13, color:"rgba(170,175,255,0.5)", lineHeight:1.65, marginBottom:6, display:"flex", alignItems:"flex-start", gap:8 }}>
                                  <span style={{ color:"#00c3ff", marginTop:3, flexShrink:0 }}>▸</span>{p}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════
              TECH STACK
          ══════════════════════════════════════ */}
          <section id="skills" ref={reg("skills")} style={{ padding:"100px 8vw" }}>
            <div style={{ maxWidth:860, margin:"0 auto" }}>
              <div className={`fade-up ${vis("skills")?"visible":""}`} style={{ textAlign:"center", marginBottom:56 }}>
                <div className="section-label">MY ARSENAL</div>
                <h2 className="section-title">Tech Stack<span className="dot">.</span></h2>
              </div>
              <div className={`fade-up ${vis("skills")?"visible":""}`} style={{ transitionDelay:"0.2s" }}>
                <div style={{ display:"flex", flexWrap:"wrap", gap:10, justifyContent:"center" }}>
                  {TECH.map((t,i) => <Hex key={i} {...t} />)}
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════
              PROJECTS
          ══════════════════════════════════════ */}
          <section id="work" ref={reg("work")} style={{ padding:"100px 8vw", background:"rgba(255,255,255,0.01)" }}>
            <div style={{ maxWidth:960, margin:"0 auto" }}>
              <div className={`fade-up ${vis("work")?"visible":""}`} style={{ marginBottom:20 }}>
                <div className="section-label">MY WORK</div>
                <h2 className="section-title">Projects<span className="dot">.</span></h2>
                <p style={{ fontSize:15, color:"rgba(170,175,255,0.45)", maxWidth:540, lineHeight:1.75, marginTop:14 }}>
                  Following projects showcase my skills through real-world examples. Each project is linked to its code repository and live demo.
                </p>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:24, marginTop:52 }}>
                {PROJECTS.map((p,i) => (
                  <div key={i} className={`project-card fade-up ${vis("work")?"visible":""}`} style={{ transitionDelay:`${i*0.1}s` }}>
                    <div style={{ height:170, background:"linear-gradient(135deg,rgba(123,47,255,0.2),rgba(0,195,255,0.1))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:64, position:"relative", overflow:"hidden" }}>
                      {p.img}
                      <div style={{ position:"absolute", inset:0, background:"radial-gradient(circle at 30% 30%,rgba(123,47,255,0.15),transparent)" }} />
                      <div style={{ position:"absolute", top:12, right:12, display:"flex", gap:6 }}>
                        <div style={{ width:28, height:28, borderRadius:"50%", background:"rgba(255,255,255,0.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, cursor:"pointer" }}>↗</div>
                        <div style={{ width:28, height:28, borderRadius:"50%", background:"rgba(255,255,255,0.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, cursor:"pointer" }}>⌥</div>
                      </div>
                    </div>
                    <div style={{ padding:24 }}>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 }}>
                        {p.tags.map((t,j) => <span key={j} className="tag">{t}</span>)}
                      </div>
                      <h3 style={{ fontSize:18, fontWeight:700, marginBottom:8, letterSpacing:"-0.02em" }}>{p.title}</h3>
                      <p style={{ fontSize:13, color:"rgba(170,175,255,0.5)", lineHeight:1.7 }}>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════
              TESTIMONIALS
          ══════════════════════════════════════ */}
          <section id="testimonials" ref={reg("testimonials")} style={{ padding:"100px 8vw" }}>
            <div style={{ maxWidth:960, margin:"0 auto" }}>
              <div className={`fade-up ${vis("testimonials")?"visible":""}`} style={{ marginBottom:52 }}>
                <div className="section-label">WHAT OTHERS SAY</div>
                <h2 className="section-title">Testimonials<span className="dot">.</span></h2>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:24 }}>
                {TESTIMONIALS.map((t,i) => (
                  <div key={i} className={`testi-card fade-up ${vis("testimonials")?"visible":""}`} style={{ transitionDelay:`${i*0.12}s` }}>
                    <div style={{ fontSize:42, color:"#7b2fff", lineHeight:1, marginBottom:16, opacity:0.7 }}>"</div>
                    <p style={{ fontSize:14.5, color:"rgba(200,205,255,0.7)", lineHeight:1.75, marginBottom:24 }}>{t.quote}</p>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ width:40, height:40, borderRadius:"50%", background:"linear-gradient(135deg,#7b2fff,#00c3ff)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, flexShrink:0 }}>{t.avatar}</div>
                      <div>
                        <div style={{ fontSize:14, fontWeight:600 }}>{t.name}</div>
                        <div style={{ fontSize:12, color:"rgba(170,175,255,0.4)", marginTop:2 }}>{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════
              CONTACT
          ══════════════════════════════════════ */}
          <section id="contact" ref={reg("contact")} style={{ padding:"100px 8vw", position:"relative", overflow:"hidden", minHeight:640 }}>
            <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 60% 50%,rgba(123,47,255,0.06) 0%,transparent 70%)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", right:0, top:"50%", transform:"translateY(-50%)", width:"min(480px,45vw)", height:"min(480px,45vw)", pointerEvents:"none" }}>
              <Planet3D />
            </div>
            <div style={{ maxWidth:500, position:"relative", zIndex:2 }}>
              <div className={`fade-left ${vis("contact")?"visible":""}`}>
                <div className="section-label">GET IN TOUCH</div>
                <h2 className="section-title" style={{ marginBottom:40 }}>Contact<span className="dot">.</span></h2>
              </div>
              <div className={`fade-left ${vis("contact")?"visible":""}`} style={{ transitionDelay:"0.15s", display:"flex", flexDirection:"column", gap:18 }}>
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:"rgba(200,200,255,0.5)", letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:8 }}>Your Name*</div>
                  <input className="form-input" placeholder="John Doe" />
                </div>
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:"rgba(200,200,255,0.5)", letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:8 }}>Your Email*</div>
                  <input className="form-input" type="email" placeholder="johndoe@email.com" />
                </div>
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:"rgba(200,200,255,0.5)", letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:8 }}>Your Message*</div>
                  <textarea className="form-input" rows={4} placeholder="Hello there!" style={{ resize:"vertical" }} />
                </div>
                <div style={{ marginTop:8 }}>
                  <button className="send-btn">Send Message →</button>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════
              FOOTER
          ══════════════════════════════════════ */}
          <footer style={{ padding:"28px 8vw", borderTop:"1px solid rgba(123,47,255,0.12)", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
            <span style={{ fontSize:13, color:"rgba(170,175,255,0.35)" }}>© Vivek 2025. All rights reserved.</span>
            <div style={{ display:"flex", gap:10 }}>
              {["𝕏","in","⌥","◎"].map((s,i) => (
                <button key={i} className="social-btn">{s}</button>
              ))}
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
