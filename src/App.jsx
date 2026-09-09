import React, { useState, useEffect, useRef } from "react";
import { Book, LogOut, ChevronDown, X, Save, Trash2, DatabaseBackup, UserPlus, CheckCircle2, Loader2, LayoutDashboard, LogIn, Pencil, Search } from "lucide-react";
import { supabase, STATE_ROW_ID } from "./supabaseClient";

/* ---------- Brand assets (embedded) ---------- */
const LOGO_ICON = "data:image/png;base64,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";
const NAMLIPI = "data:image/png;base64,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";

/* ---------- Design tokens : Cyan theme (matched to the Namlipi logo) ---------- */
const COLORS = {
  ink: "#0891b2",       // primary cyan
  inkDark: "#0e7490",   // deeper cyan
  inkDeep: "#164e63",   // near-black cyan for headlines
  inkDeeper: "#083344", // background gradient end
  paper: "#f3f9fa",     // cool paper background
  paperDark: "#dcedf0",
  paperLine: "#c3dde2",
  charcoal: "#1f2c30",
  charcoalSoft: "#5b7178",
  gold: "#b8873a",
  cream: "#ffffff",
};

const FONTS = (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
    .font-display { font-family: 'Source Serif 4', serif; }
    .font-body { font-family: 'Inter', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    @keyframes fadeUp { from { opacity:0; transform: translateY(10px);} to {opacity:1; transform:translateY(0);} }
    @keyframes blinkCursor { 0%,49%{opacity:1} 50%,100%{opacity:0} }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes pulseSkeleton { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
    .fade-up { animation: fadeUp .5s ease both; }
    /* Slim, theme-tinted scrollbars for modal bodies and grid boxes, so a
       scrollable area is obviously (and pleasantly) scrollable instead of
       relying on the browser's bulky default bar. */
    .themed-scroll { scrollbar-width: thin; scrollbar-color: #a9d2d9 transparent; }
    .themed-scroll::-webkit-scrollbar { width: 8px; height: 8px; }
    .themed-scroll::-webkit-scrollbar-track { background: transparent; }
    .themed-scroll::-webkit-scrollbar-thumb { background: #a9d2d9; border-radius: 8px; }
    .themed-scroll::-webkit-scrollbar-thumb:hover { background: #7fb8c2; }
    /* Hide number input spinner arrows across all browsers so numeric
       fields (Qty, rates, amounts, etc.) render as plain text boxes. */
    input[type="number"] { -moz-appearance: textfield; appearance: textfield; }
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; display: none; }
    /* Keep the app usable on phones/tablets: allow vertical scrolling and prevent
       horizontal overflow from fixed widths / long labels. */
    html, body, #root { height: 100%; width: 100%; margin: 0; padding: 0; overflow-x: hidden; }
    body { overflow-y: auto; }
    .modal-shell-card { width: min(100%, calc(100vw - 24px)); max-width: calc(100vw - 24px); }
    .responsive-two-col { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
    .modal-action-row { display: flex; flex-wrap: wrap; gap: 7px; }
    .mobile-menu-toggle { display: none; }
    @media (max-width: 900px) {
      .topbar-header { flex-wrap: wrap; gap: 8px; }
      .topbar-right { width: 100%; justify-content: space-between; }
      .mobile-menu-toggle { display: inline-flex !important; }
      .topnav-menu-wrap { display: none !important; }
      .topnav-menu-wrap.mobile-open { display: flex !important; flex-direction: column; width: 100%; }
      .topnav-menu-wrap.mobile-open > * { width: 100%; }
      .nav-trigger {
        width: 100%;
        justify-content: space-between;
        padding: 12px 14px !important;
      }
      .nav-dropdown {
        position: static !important;
        min-width: 0 !important;
        max-width: none !important;
        width: 100% !important;
        box-shadow: none !important;
        border-left: none !important;
        border-right: none !important;
        border-top: 1px solid rgba(8, 51, 68, 0.12) !important;
        margin-bottom: 6px;
      }
      .dashboard-shell { height: auto !important; min-height: 100vh; }
      .dashboard-hero { padding: 28px 12px 52px !important; }
      .dashboard-inner { max-width: 100% !important; }
      .dashboard-cards { gap: 14px !important; }
      .receipt-card { width: 100% !important; min-width: 0 !important; }
      .dashboard-welcome { display: none !important; }
      .dashboard-brand { width: 180px !important; }
      .hero-tagline { letter-spacing: 0.18em !important; font-size: 10px !important; }
      .login-screen { padding: 16px !important; }
      .login-panel { max-width: 100% !important; }
    }
    @media (max-width: 720px) {
      .modal-shell-card { width: min(100%, calc(100vw - 12px)) !important; max-width: calc(100vw - 12px) !important; border-radius: 12px !important; }
      .modal-shell-content { padding: 8px !important; }
      .responsive-two-col { grid-template-columns: 1fr !important; }
      .order-header-stack { flex-direction: column !important; }
      .order-search-panel { flex-basis: 100% !important; width: 100% !important; }
      .modal-action-row { width: 100%; }
      .modal-action-row > button { flex: 1 1 calc(50% - 7px); min-width: 110px; }
    }
    @media (max-width: 560px) {
      .topbar-header { padding: 8px 10px !important; }
      .topbar-right { gap: 8px; }
      .topbar-right > span { font-size: 11px !important; }
      .topbar-right > button:last-child { padding: 6px 10px !important; font-size: 11px !important; }
      .dashboard-hero { padding: 20px 10px 44px !important; }
      .dashboard-brand { width: 150px !important; }
      .hero-tagline { line-height: 1.5 !important; }
      .receipt-card .card-label { letter-spacing: 0.1em !important; font-size: 10px !important; }
      .receipt-card .card-value { font-size: 20px !important; }
      .sync-status { justify-content: center !important; text-align: center; }
      .modal-action-row > button { flex-basis: 100%; }
    }
    @media (min-width: 901px) {
      .topnav-menu-wrap { display: flex !important; }
      .mobile-menu-toggle { display: none !important; }
    }
  `}</style>
);

/* ---------- Menu data (mirrors the real ledger system) ---------- */
const MENUS = [
  {
    label: "Setup",
    items: [
      "Division", "District Information", "Party Information",
      "Publication / Binder Information", "Specimen Party", "Book Information",
      "Supplier Information", "Paper Type Information", "Press Information",
      "Plate / Lamination / Pasting Information", "Employee Information",
      "Writer Information", "Other Expense Group Name",
      "Other Expense Head Information", "Shop Name Entry",
      "Personal Loan Party Information", "Bank Account Information",
      "Other Person Telephones", "Transport Entry", "Settings",
    ],
  },
  {
    label: "Order",
    items: [
      "Paper Order", "Paper Print Order", "Paper Transfer Order",
      "Binder Order", "Book Receive / Binder Receive Entry",
      "Binder Order Cancel", "Cover Receive", "Cover Supply",
    ],
  },
  {
    label: "Sales, Return",
    items: [
      "Sales Memo Bookwise", "Book Return", "Book Specimen", "Money Receipt",
      "Book Stock Reject", "Bonus Category Entry", "Bonus Calculation", "Bonus",
    ],
  },
  {
    label: "Register",
    items: [
      "Small Sales Register", "Daily Collection Register",
      "Book Information Register", "Party Information Register", "Writer Information Register",
      "Book Received Register", "Book Sales Register",
      "Book Stock Reject Register", "Return Register", "Yearly Bonus Register",
      "Party Ledger Details", "Party Dues Ledger",
      "Money Receipt Party Ledger", "Specimen Party Ledger", "Condition Sales",
    ],
  },
  {
    label: "Report",
    items: [
      "Party Balance Report", "Book Stock Report", "Paper Stock Report",
      "Cover Stock Report", "Return Stock Report", "Binder Stock Report",
      "Binder Register Details", "Print Order Report", "Paper Order Report",
      "Binding Statement",
    ],
  },
  {
    label: "Account Bill Entry",
    items: [
      "Supplier Bill Entry",
      "Press / Binder / Wire / Lamination / Paste / Plate Bill Entry",
      "Employee Salary / Extra Payment Bill Entry", "Shop Rent Payment",
    ],
  },
  {
    label: "Accounts Bill Payment",
    items: [
      "Daily Expense Bill Payment",
      "Press / Binder / Wire / Lamination / Paste / Plate Bill Payment",
      "Supplier Bill Entry Payment", "Personal Loan Taken / Payment",
      "Employee Salary Payment", "Bank Deposit", "Bank Withdrawal",
    ],
  },
  {
    label: "Accounts Reports",
    items: [
      "Press Ledger", "Supplier Ledger", "Book Purchase / Binder Ledger",
      "Lamination / Paste / Plate Ledger", "Writer Ledger",
      "Other Expense Ledger", "Employee Ledger", "Bank Ledger",
      "Loan Party Ledger", "Daily Cash Report", "Income Expense Ledger",
    ],
  },
];

/* ---------- Live Dhaka Prayer Times (Aladhan API) ----------
   Replaces the old hard-coded sample times. Cached in localStorage per
   calendar day (Asia/Dhaka) so the API is only called once a day per
   browser, not on every render/reload. */
const PRAYER_LABELS = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
const PRAYER_CACHE_KEY = "ekalantor-pos:prayerTimes";
const PRAYER_API_URL = "https://api.aladhan.com/v1/timingsByCity?city=Dhaka&country=Bangladesh&method=1&school=1";

// "YYYY-MM-DD" in Asia/Dhaka -- used as the cache-day key, and re-fetches
// automatically once a new Dhaka day begins.
function dhakaISODate(date) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dhaka" }).format(date);
}

// "18:29" (API's 24-hour format, sometimes with a trailing " (+06)") -> "6:29 PM"
function formatTo12Hour(time24) {
  const match = /^(\d{1,2}):(\d{2})/.exec(time24 || "");
  if (!match) return time24 || "--:--";
  let h = parseInt(match[1], 10);
  const m = match[2];
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}

function usePrayerTimes(todayISO) {
  const [state, setState] = useState({ status: "loading", times: null });
  const [attempt, setAttempt] = useState(0); // bumped by retry() to force a re-fetch

  useEffect(() => {
    let cancelled = false;

    if (attempt === 0) {
      try {
        const cached = JSON.parse(window.localStorage.getItem(PRAYER_CACHE_KEY) || "null");
        if (cached && cached.date === todayISO && Array.isArray(cached.times)) {
          setState({ status: "ready", times: cached.times });
          return;
        }
      } catch {
        // corrupted cache -- fall through and fetch fresh
      }
    }

    setState({ status: "loading", times: null });
    fetch(PRAYER_API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Prayer times request failed");
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        const raw = json && json.data && json.data.timings;
        if (!raw) throw new Error("Unexpected Aladhan response shape");
        const times = PRAYER_LABELS.map((name) => ({ name, time: formatTo12Hour(raw[name]) }));
        try {
          window.localStorage.setItem(PRAYER_CACHE_KEY, JSON.stringify({ date: todayISO, times }));
        } catch {
          // localStorage full/unavailable -- not fatal, just won't cache
        }
        setState({ status: "ready", times });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error", times: null });
      });

    return () => { cancelled = true; };
  }, [todayISO, attempt]);

  return { ...state, retry: () => setAttempt((n) => n + 1) };
}

function useDhakaClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function formatDhakaTime(date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true,
  }).format(date);
}
function formatDhakaDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka", weekday: "long", day: "numeric", month: "long", year: "numeric",
  }).format(date);
}
/* dd/mm/yy -- used to auto-stamp entry forms (Party Information, etc.) the moment they're opened */
function formatShortDate(date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dhaka", day: "2-digit", month: "2-digit", year: "2-digit",
  }).formatToParts(date);
  const get = (t) => parts.find((p) => p.type === t)?.value || "";
  return `${get("day")}/${get("month")}/${get("year")}`;
}
/* zero-padded serial code, e.g. nextSerial(records) -> "01", "02", ...
   `pad` controls the zero-padding width -- 2 by default (Group Code, Book
   Code, ...), but Memo No / Payment No use 6 (000001, 000002, ... 002542,
   growing past that without ever losing the leading zeros). */
function nextSerial(list, key = "code", pad = 2) {
  let max = 0;
  (list || []).forEach((r) => { const n = parseInt(String(r?.[key] || "").replace(/\D/g, ""), 10); if (!isNaN(n) && n > max) max = n; });
  return String(max + 1).padStart(pad, "0");
}

/* ---------- localStorage persistence ----------
   Everything the person actually enters (Divisions/Districts/Countries,
   every Setup/Order/Report form's saved records, and the Create-User list)
   lives only in React state by default, which is wiped on every page
   reload. These two helpers save that state to the browser's localStorage
   after every change and reload it the next time the app opens, so data
   survives a refresh or closing the tab -- as long as it's the same
   browser on the same device (localStorage never leaves the browser, so
   it won't sync between different computers/phones or show up for a
   different person visiting the same URL). */
const PERSIST_KEY = "ekalantor-pos:v1";

function loadPersistedState() {
  try {
    const raw = window.localStorage.getItem(PERSIST_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    // Corrupted JSON, or localStorage unavailable (private browsing, etc.)
    // -- fall back to the normal seeded/empty state instead of crashing.
    return null;
  }
}

function savePersistedState(state) {
  try {
    window.localStorage.setItem(PERSIST_KEY, JSON.stringify(state));
  } catch {
    // Storage full, disabled, or unavailable -- the app keeps working in
    // memory for this session, it just won't be there on the next reload.
  }
}

/* ---------- Supabase sync (cross-device) ----------
   localStorage above is instant but device-local. These two functions
   read/write the same shape of state to a single shared row in Supabase
   so every device/browser that opens the app sees the same data. */
async function fetchCloudState() {
  const { data, error } = await supabase
    .from("pos_state")
    .select("data, updated_at")
    .eq("id", STATE_ROW_ID)
    .maybeSingle();
  if (error) { console.error("Supabase fetch failed:", error.message); return null; }
  return data || null;
}

async function pushCloudState(state) {
  const { error } = await supabase
    .from("pos_state")
    .upsert({ id: STATE_ROW_ID, data: state, updated_at: new Date().toISOString() });
  if (error) console.error("Supabase save failed:", error.message);
  return !error;
}

/* Called by the real BACKUP button (see BackupModal) -- inserts a
   never-overwritten timestamped snapshot, so you can always recover an
   earlier point even if today's live data gets messed up. */
async function pushBackupSnapshot(state) {
  const { error } = await supabase.from("pos_backups").insert({ data: state });
  if (error) console.error("Supabase backup failed:", error.message);
  return !error;
}

/* =========================================================
   Perforated "receipt slip" card -- the signature element
   ========================================================= */
function ReceiptCard({ children, style, className }) {
  const zig = "polygon(0% 6px,3% 0%,6% 6px,9% 0%,12% 6px,15% 0%,18% 6px,21% 0%,24% 6px,27% 0%,30% 6px,33% 0%,36% 6px,39% 0%,42% 6px,45% 0%,48% 6px,51% 0%,54% 6px,57% 0%,60% 6px,63% 0%,66% 6px,69% 0%,72% 6px,75% 0%,78% 6px,81% 0%,84% 6px,87% 0%,90% 6px,93% 0%,96% 6px,99% 0%,100% 6px,100% calc(100% - 6px),99% 100%,96% calc(100% - 6px),93% 100%,90% calc(100% - 6px),87% 100%,84% calc(100% - 6px),81% 100%,78% calc(100% - 6px),75% 100%,72% calc(100% - 6px),69% 100%,66% calc(100% - 6px),63% 100%,60% calc(100% - 6px),57% 100%,54% calc(100% - 6px),51% 100%,48% calc(100% - 6px),45% 100%,42% calc(100% - 6px),39% 100%,36% calc(100% - 6px),33% 100%,30% calc(100% - 6px),27% 100%,24% calc(100% - 6px),21% 100%,18% calc(100% - 6px),15% 100%,12% calc(100% - 6px),9% 100%,6% calc(100% - 6px),3% 100%,0% calc(100% - 6px))";
  return (
    <div
      className={className}
      style={{
        background: COLORS.cream,
        clipPath: zig,
        padding: "26px 30px",
        boxShadow: "0 10px 30px rgba(8,51,68,0.16)",
        position: "relative",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* =========================================================
   Top nav dropdown menu
   ========================================================= */
function NavMenu({ menu, isOpen, onToggle, onPick, onHoverOpen, onHoverClose }) {
  const closeTimer = useRef(null);

  const cancelClose = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => onHoverClose(menu.label), 180);
  };

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => { cancelClose(); onHoverOpen(menu.label); }}
      onMouseLeave={scheduleClose}
    >
      <button
        onClick={() => onToggle(menu.label)}
        className="font-body nav-trigger"
        style={{
          background: isOpen ? "rgba(255,255,255,0.14)" : "transparent",
          border: "none",
          color: "#eaf7fa",
          padding: "13px 14px",
          fontSize: 14.5,
          fontWeight: 600,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 4,
          whiteSpace: "nowrap",
          letterSpacing: "0.01em",
          borderBottom: isOpen ? `2px solid ${COLORS.gold}` : "2px solid transparent",
        }}
      >
        {menu.label}
        <ChevronDown size={13} style={{ opacity: 0.75, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .15s" }} />
      </button>
      {isOpen && (
        <div
          className="fade-up nav-dropdown"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            minWidth: 300,
            maxWidth: 340,
            background: COLORS.cream,
            border: `1px solid ${COLORS.paperLine}`,
            borderTop: `3px solid ${COLORS.gold}`,
            boxShadow: "0 18px 40px rgba(8,51,68,0.28)",
            zIndex: 50,
            padding: "6px 0",
            maxHeight: "70vh",
            overflowY: "auto",
          }}
        >
          {menu.items.map((it, i) => (
            <button
              key={i}
              onClick={() => onPick(it)}
              className="font-body"
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                background: "transparent",
                border: "none",
                borderBottom: i !== menu.items.length - 1 ? `1px dashed ${COLORS.paperLine}` : "none",
                padding: "9px 18px",
                fontSize: 13.7,
                color: COLORS.charcoal,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.paperDark)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {it}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   Login screen
   ========================================================= */
function LoginScreen({ onConnect }) {
  const [user, setUser] = useState("admin");
  const [pass, setPass] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState("");

  const handleConnect = (e) => {
    e.preventDefault();
    if (!user.trim()) { setError("Please enter a username"); return; }
    setError("");
    setConnecting(true);
    setTimeout(() => { setConnecting(false); onConnect(user); }, 850);
  };

  return (
    <div
      className="font-body login-screen"
      style={{
        minHeight: "100vh",
        width: "100%",
        background: `radial-gradient(circle at 20% -10%, #22b4d4 0%, ${COLORS.inkDeeper} 45%, #051b23 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: 20,
      }}
    >
      <div style={{
        position: "absolute", left: -120, top: -120, width: 340, height: 340, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(184,135,58,0.20), transparent 70%)"
      }} />
      <div style={{
        position: "absolute", right: -100, bottom: -140, width: 380, height: 380, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(34,180,212,0.28), transparent 70%)"
      }} />

      <div className="fade-up login-panel" style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 26 }}>
          <div style={{
            width: 74, height: 74,
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 16,
          }}>
            <img src={LOGO_ICON} alt="Ekalantor logo" style={{ width: 62, height: 62, objectFit: "contain" }} />
          </div>
          <img src={NAMLIPI} alt="Ekalantor Prokashoni" style={{ width: 210, marginBottom: 8 }} />
          <div className="font-mono" style={{ color: "#bfe9f2", fontSize: 11.5, letterSpacing: "0.22em", textTransform: "uppercase" }}>
            Publisher &amp; Distribution Ledger
          </div>
        </div>

        <ReceiptCard style={{ padding: "34px 32px 28px" }}>
          <div style={{ position: "absolute", top: 14, left: 16, width: 10, height: 10, borderRadius: "50%", background: COLORS.paper, boxShadow: "inset 0 1px 3px rgba(0,0,0,0.25)" }} />
          <h1 className="font-display" style={{ color: COLORS.inkDeep, fontSize: 22, margin: "0 0 4px", textAlign: "center" }}>
            Publisher Sign In
          </h1>
          <p style={{ textAlign: "center", color: COLORS.charcoalSoft, fontSize: 12.5, margin: "0 0 22px" }}>
            Enter your username and password to access the system
          </p>

          <form onSubmit={handleConnect}>
            <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: COLORS.inkDark, marginBottom: 5 }}>
              User Name
            </label>
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="font-mono"
              style={{
                width: "100%", padding: "10px 12px", marginBottom: 16, fontSize: 14.5,
                border: `1.5px solid ${COLORS.paperLine}`, background: COLORS.paper, color: COLORS.charcoal,
                outline: "none",
              }}
              placeholder="admin"
            />
            <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: COLORS.inkDark, marginBottom: 5 }}>
              Password
            </label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="font-mono"
              style={{
                width: "100%", padding: "10px 12px", marginBottom: error ? 6 : 22, fontSize: 14.5,
                border: `1.5px solid ${COLORS.paperLine}`, background: COLORS.paper, color: COLORS.charcoal,
                outline: "none",
              }}
              placeholder="••••••"
            />
            {error && <div style={{ color: "#b0282b", fontSize: 12, marginBottom: 16 }}>{error}</div>}

            <button
              type="submit"
              disabled={connecting}
              style={{
                width: "100%", padding: "12px 0", background: COLORS.ink, color: "#fff", border: "none",
                fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center",
                justifyContent: "center", gap: 8, letterSpacing: "0.02em",
                boxShadow: "0 8px 18px rgba(8,145,178,0.35)",
              }}
              className="font-body"
            >
              {connecting ? <><Loader2 size={16} style={{ animation: "spin 0.8s linear infinite" }} /> Connecting...</> : <><LogIn size={15} /> Connect</>}
            </button>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
              <button type="button" style={{ background: "none", border: "none", color: COLORS.charcoalSoft, fontSize: 12.5, cursor: "pointer", textDecoration: "underline" }}>Cancel</button>
              <button type="button" style={{ background: "none", border: "none", color: COLORS.charcoalSoft, fontSize: 12.5, cursor: "pointer", textDecoration: "underline" }}>Settings</button>
            </div>
          </form>
        </ReceiptCard>
      </div>
    </div>
  );
}

/* =========================================================
   Create User modal
   ========================================================= */
function ModernField({ label, children, compact, inline, labelWidth }) {
  if (inline) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: compact ? 3 : 7 }}>
        <label style={{ fontSize: compact ? 9 : 10, fontWeight: 700, color: COLORS.charcoalSoft, flex: labelWidth ? `0 0 ${labelWidth}px` : "0 0 auto", whiteSpace: "nowrap", letterSpacing: "0.03em", textTransform: "uppercase" }}>
          {label}
        </label>
        <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
      </div>
    );
  }
  return (
    <div style={{ marginBottom: compact ? 3 : 7 }}>
      <label style={{ fontSize: compact ? 9 : 10, fontWeight: 700, color: COLORS.charcoalSoft, display: "block", marginBottom: compact ? 1 : 3, letterSpacing: "0.03em", textTransform: "uppercase" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

/* A textarea that starts at a short box (1 line, or `minRows` lines when the
   field wants a taller starting box -- e.g. Address) and grows further to
   fit its content as the user types. `matchInputHeight`, when set, pins the
   1-row starting height to the same height as a plain <input>/<select> using
   the same style (they share identical padding/border/font, so the natural
   single-line height lines up) -- for header rows where an Address textarea
   sits beside Party Code / Sales Type / Publication style fields, this keeps
   every box's vertical center (not just its bottom edge) aligned, instead of
   the taller generic 1-row floor below. */
function AutoGrowTextarea({ value, onChange, style, minRows = 1, matchInputHeight = false, readOnly = false, disabled = false, title }) {
  const minH = matchInputHeight ? 24 : 14 + minRows * 20;
  const ref = useRef(null);
  const grow = (el) => {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.max(el.scrollHeight, minH) + "px";
  };
  // Re-fit height whenever the value changes for any reason -- typing,
  // but also loading a different record (First/Prev/Next/Last, search,
  // Clear), so a longer/shorter saved value never sits in a mis-sized box.
  useEffect(() => { grow(ref.current); }, [value]); // eslint-disable-line
  return (
    <textarea
      ref={ref}
      readOnly={readOnly}
      disabled={disabled}
      title={title}
      value={value || ""}
      onChange={(e) => { onChange(e.target.value); grow(e.target); }}
      rows={minRows}
      /* display:"block" matters here, not just cosmetically -- a <textarea>
         is inline-block by default, so its parent (a plain block <div>)
         otherwise reserves a few px of invisible descender space below it,
         the same line-height quirk that shows up as extra space under an
         <img>. <input>/<select> siblings don't hit this, so left alone it
         quietly throws off bottom alignment against them by that same few
         px -- forcing block layout removes the gap entirely. */
      style={{ ...style, resize: "none", overflow: "hidden", minHeight: minH, display: "block" }}
    />
  );
}

function CreateUserModal({ onClose, users, onSave, onDelete }) {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [type, setType] = useState("");
  const [focus, setFocus] = useState("");
  const [msg, setMsg] = useState("");
  const [justSaved, setJustSaved] = useState("");

  const fieldStyle = (key) => ({
    width: "100%",
    padding: "11px 13px",
    borderRadius: 10,
    border: `1.5px solid ${focus === key ? COLORS.ink : COLORS.paperLine}`,
    background: focus === key ? "#fff" : COLORS.paper,
    fontSize: 14,
    color: COLORS.charcoal,
    outline: "none",
    boxSizing: "border-box",
    boxShadow: focus === key ? `0 0 0 4px ${COLORS.ink}22` : "none",
    transition: "box-shadow .15s ease, border-color .15s ease, background .15s ease",
  });

  const flash = (text) => { setMsg(text); setTimeout(() => setMsg(""), 1800); };

  const handleSave = () => {
    if (!name.trim()) return flash("User Name is required");
    if (!pass.trim()) return flash("Password is required");
    if (users.some((u) => u.name.toLowerCase() === name.trim().toLowerCase())) {
      return flash("That user name already exists");
    }
    onSave({ name: name.trim(), type: type || "Sales" });
    setJustSaved(name.trim());
    setName(""); setPass(""); setType("");
    setTimeout(() => setJustSaved(""), 1800);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(5,27,35,0.6)", zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
      backdropFilter: "blur(2px)",
    }}>
      <div className="fade-up font-body" style={{
        width: 400, borderRadius: 20, background: COLORS.cream,
        boxShadow: "0 30px 70px rgba(0,0,0,0.45)", overflow: "hidden",
      }}>
        <div style={{
          background: `linear-gradient(135deg, ${COLORS.ink}, ${COLORS.inkDark})`,
          color: "#fff", padding: "20px 22px", display: "flex",
          alignItems: "center", justifyContent: "space-between", position: "relative",
        }}>
          <div style={{
            position: "absolute", inset: 0, opacity: 0.12,
            backgroundImage: "radial-gradient(circle at 85% -20%, #fff, transparent 55%)",
          }} />
          <div style={{ display: "flex", alignItems: "center", gap: 10, position: "relative" }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10, background: "rgba(255,255,255,0.18)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <UserPlus size={17} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15.5 }}>Create New User</div>
              <div style={{ fontSize: 11, opacity: 0.8 }}>Add a teammate to the system</div>
            </div>
          </div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.14)", border: "none", color: "#fff", cursor: "pointer",
            width: 30, height: 30, borderRadius: 9, display: "flex", alignItems: "center",
            justifyContent: "center", position: "relative",
          }}><X size={16} /></button>
        </div>
        {/* handleEnterAsTab (same helper used on the order-entry, report,
            and setup forms) was missing here too -- Enter after User Name
            just sat there instead of advancing to Password / Type. */}
        <div style={{ padding: 26 }} onKeyDown={handleEnterAsTab}>
          {justSaved ? (
            <div style={{
              display: "flex", alignItems: "center", gap: 8, marginBottom: 14,
              background: `${COLORS.ink}14`, border: `1px solid ${COLORS.ink}33`, borderRadius: 10,
              padding: "9px 12px", color: COLORS.inkDark, fontSize: 12.5, fontWeight: 600,
            }} className="fade-up">
              <CheckCircle2 size={15} /> Saved “{justSaved}” — add another below, or Exit when done.
            </div>
          ) : null}

          <ModernField label="User Name">
            <input
              value={name} onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocus("name")} onBlur={() => setFocus("")}
              style={fieldStyle("name")} placeholder="e.g. rahim.store"
            />
          </ModernField>
          <ModernField label="Password">
            <input
              type="password" value={pass} onChange={(e) => setPass(e.target.value)}
              onFocus={() => setFocus("pass")} onBlur={() => setFocus("")}
              style={fieldStyle("pass")} placeholder="••••••••"
            />
          </ModernField>
          <ModernField label="Type">
            <select
              value={type} onChange={(e) => setType(e.target.value)}
              onFocus={() => setFocus("type")} onBlur={() => setFocus("")}
              style={{ ...fieldStyle("type"), cursor: "pointer" }}
            >
              <option value="">Select type</option>
              <option>Admin</option>
              <option>Accounts</option>
              <option>Sales</option>
              <option>Store</option>
            </select>
          </ModernField>

          {msg && <div style={{ color: "#b0282b", fontSize: 12, marginBottom: 4 }}>{msg}</div>}

          <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
            <button
              onClick={handleSave}
              style={{
                flex: 1.4, background: `linear-gradient(135deg, ${COLORS.ink}, ${COLORS.inkDark})`, color: "#fff",
                border: "none", borderRadius: 11, padding: "11px 0", fontWeight: 700, fontSize: 13.5,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                boxShadow: `0 8px 18px ${COLORS.ink}44`,
              }}
            >
              <Save size={14} /> Save
            </button>
            <button
              onClick={onClose}
              style={{
                flex: 1, background: COLORS.paperDark, color: COLORS.charcoal, border: "none",
                borderRadius: 11, padding: "11px 0", fontWeight: 700, fontSize: 13.5, cursor: "pointer",
              }}
            >
              Exit
            </button>
          </div>

          <div style={{ marginTop: 22, paddingTop: 16, borderTop: `1px solid ${COLORS.paperLine}` }}>
            <div style={{
              fontSize: 10, fontWeight: 700, color: COLORS.charcoalSoft, letterSpacing: "0.05em",
              textTransform: "uppercase", marginBottom: 8,
            }}>
              Users ({users.length})
            </div>
            {users.length === 0 ? (
              <div style={{ fontSize: 12.5, color: COLORS.charcoalSoft, fontStyle: "italic" }}>
                No users yet — create one above.
              </div>
            ) : (
              <div className="themed-scroll" style={{ maxHeight: 160, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
                {users.map((u, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    background: COLORS.paper, border: `1px solid ${COLORS.paperLine}`, borderRadius: 9,
                    padding: "7px 10px",
                  }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 600, color: COLORS.charcoal, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.name}</div>
                      <div style={{ fontSize: 10.5, color: COLORS.charcoalSoft }}>{u.type}</div>
                    </div>
                    <button
                      onClick={() => onDelete(i)}
                      title="Delete user"
                      style={{
                        background: "transparent", color: "#c0392b", border: "none", cursor: "pointer",
                        padding: 6, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto",
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Settings modal (Business Info, Invoice Size, User Roles &
   Permissions, Payment Methods) -- lives under Setup > Settings
   ========================================================= */
const SETTINGS_TABS = ["Business Info", "Invoice Size", "User Roles & Permissions", "Payment Methods"];
const PERMISSION_KEYS = ["Setup Access", "Order Entry", "View Reports", "Backup Access", "Delete Records"];
const USER_ROLES = ["Admin", "Accounts", "Sales", "Store"];

function SettingsModal({ onClose, settings, setSettings }) {
  const [tab, setTab] = useState(SETTINGS_TABS[0]);
  const [focus, setFocus] = useState("");
  const [saved, setSaved] = useState(false);

  const s = settings || {};
  const business = s.business || { name: "", logo: "", address: "" };
  const permissions = s.permissions || {};
  const paymentMethods = s.paymentMethods || ["Cash"];
  const invoiceSize = s.invoiceSize || "80mm";

  const update = (patch) => setSettings((prev) => ({ ...(prev || {}), ...patch }));
  const flashSaved = () => { setSaved(true); setTimeout(() => setSaved(false), 1500); };

  const fieldStyle = (key) => ({
    width: "100%", padding: "11px 13px", borderRadius: 10,
    border: `1.5px solid ${focus === key ? COLORS.ink : COLORS.paperLine}`,
    background: focus === key ? "#fff" : COLORS.paper, fontSize: 14, color: COLORS.charcoal,
    outline: "none", boxSizing: "border-box",
    boxShadow: focus === key ? `0 0 0 4px ${COLORS.ink}22` : "none",
    transition: "box-shadow .15s ease, border-color .15s ease, background .15s ease",
  });

  const togglePermission = (role, key) => {
    const rolePerms = { ...(permissions[role] || {}) };
    rolePerms[key] = !rolePerms[key];
    update({ permissions: { ...permissions, [role]: rolePerms } });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update({ business: { ...business, logo: reader.result } });
    reader.readAsDataURL(file);
  };

  const addPaymentMethod = () => {
    const name = window.prompt("New payment method name (e.g. bKash, Nagad, Bank Transfer):");
    if (name && name.trim() && !paymentMethods.includes(name.trim())) {
      update({ paymentMethods: [...paymentMethods, name.trim()] });
    }
  };
  const removePaymentMethod = (m) => update({ paymentMethods: paymentMethods.filter((x) => x !== m) });

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(5,27,35,0.6)", zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
      backdropFilter: "blur(2px)",
    }}>
      <div className="fade-up font-body" style={{
        width: 620, maxWidth: "100%", maxHeight: "calc(100vh - 80px)", display: "flex", flexDirection: "column",
        borderRadius: 20, background: COLORS.cream, boxShadow: "0 30px 70px rgba(0,0,0,0.45)", overflow: "hidden",
      }}>
        <div style={{
          background: `linear-gradient(135deg, ${COLORS.ink}, ${COLORS.inkDark})`,
          color: "#fff", padding: "20px 22px", display: "flex",
          alignItems: "center", justifyContent: "space-between", position: "relative", flexShrink: 0,
        }}>
          <div style={{
            position: "absolute", inset: 0, opacity: 0.12,
            backgroundImage: "radial-gradient(circle at 85% -20%, #fff, transparent 55%)",
          }} />
          <div style={{ fontWeight: 700, fontSize: 15.5, position: "relative" }}>Settings</div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.14)", border: "none", color: "#fff", cursor: "pointer",
            width: 30, height: 30, borderRadius: 9, display: "flex", alignItems: "center",
            justifyContent: "center", position: "relative",
          }}><X size={16} /></button>
        </div>

        <div style={{ display: "flex", borderBottom: `1px solid ${COLORS.paperLine}`, flexShrink: 0, overflowX: "auto" }} className="themed-scroll">
          {SETTINGS_TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className="font-body" style={{
              flex: "0 0 auto", padding: "12px 16px", border: "none", background: "none", cursor: "pointer",
              fontSize: 12.5, fontWeight: 700, whiteSpace: "nowrap",
              color: tab === t ? COLORS.inkDark : COLORS.charcoalSoft,
              borderBottom: tab === t ? `2.5px solid ${COLORS.ink}` : "2.5px solid transparent",
            }}>
              {t}
            </button>
          ))}
        </div>

        <div className="themed-scroll" style={{ padding: 22, overflowY: "auto", flex: "1 1 auto" }}>
          {tab === "Business Info" && (
            <div>
              <ModernField label="Business Name">
                <input
                  value={business.name} onChange={(e) => update({ business: { ...business, name: e.target.value } })}
                  onFocus={() => setFocus("bname")} onBlur={() => setFocus("")}
                  style={fieldStyle("bname")} placeholder="e.g. Kalantor Prokashoni"
                />
              </ModernField>
              <ModernField label="Address">
                <AutoGrowTextarea
                  value={business.address}
                  onChange={(v) => update({ business: { ...business, address: v } })}
                  minRows={2} style={fieldStyle("baddr")}
                />
              </ModernField>
              <ModernField label="Logo">
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {business.logo && (
                    <img src={business.logo} alt="Logo" style={{ width: 44, height: 44, objectFit: "contain", borderRadius: 8, border: `1px solid ${COLORS.paperLine}` }} />
                  )}
                  <input type="file" accept="image/*" onChange={handleLogoUpload} style={{ fontSize: 12.5 }} />
                </div>
              </ModernField>
            </div>
          )}

          {tab === "Invoice Size" && (
            <div>
              <div style={{ fontSize: 12, color: COLORS.charcoalSoft, marginBottom: 12 }}>
                Choose the paper size used when printing invoices/memos.
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {["80mm", "A4"].map((sz) => (
                  <button key={sz} onClick={() => update({ invoiceSize: sz })} className="font-body" style={{
                    flex: 1, padding: "16px 10px", borderRadius: 12, cursor: "pointer", fontWeight: 700, fontSize: 14,
                    border: `2px solid ${invoiceSize === sz ? COLORS.ink : COLORS.paperLine}`,
                    background: invoiceSize === sz ? `${COLORS.ink}14` : COLORS.paper,
                    color: invoiceSize === sz ? COLORS.inkDark : COLORS.charcoal,
                  }}>
                    {sz} {sz === "80mm" ? "(Thermal Receipt)" : "(Full Page)"}
                  </button>
                ))}
              </div>
            </div>
          )}

          {tab === "User Roles & Permissions" && (
            <div>
              <div style={{ fontSize: 12, color: COLORS.charcoalSoft, marginBottom: 14 }}>
                Tick what each user type is allowed to do. (New users are assigned one of these types from Create User.)
              </div>
              <div className="themed-scroll" style={{ overflowX: "auto" }}>
                <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 12.5 }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", padding: "6px 8px", color: COLORS.charcoalSoft, fontSize: 10.5, textTransform: "uppercase" }}>Role</th>
                      {PERMISSION_KEYS.map((k) => (
                        <th key={k} style={{ textAlign: "center", padding: "6px 8px", color: COLORS.charcoalSoft, fontSize: 10.5, textTransform: "uppercase", whiteSpace: "nowrap" }}>{k}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {USER_ROLES.map((role) => (
                      <tr key={role} style={{ borderTop: `1px solid ${COLORS.paperLine}` }}>
                        <td style={{ padding: "8px", fontWeight: 700, color: COLORS.charcoal }}>{role}</td>
                        {PERMISSION_KEYS.map((k) => (
                          <td key={k} style={{ textAlign: "center", padding: "8px" }}>
                            <input
                              type="checkbox"
                              checked={!!(permissions[role] && permissions[role][k])}
                              onChange={() => togglePermission(role, k)}
                              style={{ width: 16, height: 16, cursor: "pointer" }}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "Payment Methods" && (
            <div>
              <div style={{ fontSize: 12, color: COLORS.charcoalSoft, marginBottom: 12 }}>
                Payment methods available when recording a Money Receipt or Payment.
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
                {paymentMethods.map((m) => (
                  <div key={m} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    background: COLORS.paper, border: `1px solid ${COLORS.paperLine}`, borderRadius: 9,
                    padding: "9px 12px",
                  }}>
                    <span style={{ fontSize: 13, color: COLORS.charcoal, fontWeight: 600 }}>{m}</span>
                    <button onClick={() => removePaymentMethod(m)} style={{
                      background: "none", border: "none", color: "#b0282b", cursor: "pointer",
                      display: "flex", alignItems: "center",
                    }}><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
              <button onClick={addPaymentMethod} className="font-body" style={{
                background: COLORS.paperDark, color: COLORS.charcoal, border: "none",
                borderRadius: 11, padding: "10px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer",
              }}>
                + Add Payment Method
              </button>
            </div>
          )}
        </div>

        <div style={{ padding: "14px 22px", borderTop: `1px solid ${COLORS.paperLine}`, display: "flex", gap: 8, flexShrink: 0, alignItems: "center" }}>
          <button
            onClick={flashSaved}
            style={{
              flex: 1.4, background: `linear-gradient(135deg, ${COLORS.ink}, ${COLORS.inkDark})`, color: "#fff",
              border: "none", borderRadius: 11, padding: "11px 0", fontWeight: 700, fontSize: 13.5,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
              boxShadow: `0 8px 18px ${COLORS.ink}44`,
            }}
          >
            <Save size={14} /> Save
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1, background: COLORS.paperDark, color: COLORS.charcoal, border: "none",
              borderRadius: 11, padding: "11px 0", fontWeight: 700, fontSize: 13.5, cursor: "pointer",
            }}
          >
            Exit
          </button>
          {saved && <CheckCircle2 size={18} color={COLORS.ink} />}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Backup modal
   ========================================================= */
function BackupModal({ onClose, state }) {
  const [rows, setRows] = useState([]);
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // Real table names/row-counts, taken straight from the data being backed up.
    const entries = [
      ["Divisions", (state.divisions || []).length],
      ["Districts", (state.districts || []).length],
      ["Countries", (state.countries || []).length],
      ["Users", (state.users || []).length],
      ...Object.entries(state.store || {}).map(([k, v]) => [k, Array.isArray(v) ? v.length : 0]),
    ];
    let i = 0;
    const id = setInterval(() => {
      if (i >= entries.length) {
        clearInterval(id);
        pushBackupSnapshot(state).then((ok) => { setFailed(!ok); setDone(true); });
        return;
      }
      setRows((r) => [...r, { table: entries[i][0], count: entries[i][1] }]);
      i++;
    }, 90);
    return () => clearInterval(id);
  }, [state]);

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ekalantor-pos-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(5,27,35,0.55)", zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
    }}>
      <div className="fade-up font-mono" style={{ width: 460, maxWidth: "100%", background: "#081b21", boxShadow: "0 24px 60px rgba(0,0,0,0.5)", border: `1px solid ${COLORS.gold}` }}>
        <div style={{ background: COLORS.inkDeeper, color: "#eaf7fa", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }} className="font-body">
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 13.5 }}>
            <DatabaseBackup size={15} /> Database Backup
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#eaf7fa", cursor: "pointer" }}><X size={16} /></button>
        </div>
        <div style={{ padding: "16px 18px", maxHeight: 320, overflowY: "auto", fontSize: 12.5 }}>
          {rows.map((r, i) => (
            <div key={i} style={{ color: "#7fd8e8", marginBottom: 3 }}>
              exporting table <span style={{ color: "#eaf7fa" }}>{r.table.padEnd(20, " ")}</span> {r.count} rows exported
            </div>
          ))}
          {!done && <div style={{ color: "#eaf7fa" }}>▌<span style={{ animation: "blinkCursor 1s step-start infinite" }}></span></div>}
          {done && !failed && <div style={{ color: COLORS.gold, marginTop: 8, fontWeight: 700 }} className="font-body">✓ Backup saved to cloud</div>}
          {done && failed && <div style={{ color: "#ff9d8a", marginTop: 8, fontWeight: 700 }} className="font-body">⚠ Cloud backup failed — check internet connection. You can still download a local copy below.</div>}
          {done && (
            <button onClick={downloadJson} className="font-body" style={{
              marginTop: 12, background: COLORS.gold, border: "none", color: "#081b21",
              padding: "8px 14px", fontWeight: 700, fontSize: 12.5, cursor: "pointer",
            }}>
              Download backup file (.json)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Coming soon placeholder
   ========================================================= */
function ComingSoon({ title, onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(5,27,35,0.55)", zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
    }}>
      <div className="fade-up font-body" style={{ width: 380, background: COLORS.cream, boxShadow: "0 24px 60px rgba(0,0,0,0.4)", textAlign: "center", padding: "30px 26px" }}>
        <div style={{
          width: 54, height: 54, borderRadius: "50%", background: COLORS.paperDark, margin: "0 auto 14px",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Book size={24} color={COLORS.ink} />
        </div>
        <div style={{ fontWeight: 700, color: COLORS.inkDark, marginBottom: 6, fontSize: 15 }}>{title}</div>
        <p style={{ fontSize: 12.5, color: COLORS.charcoalSoft, marginBottom: 18 }}>
          This form will be added in the next phase. It's currently a placeholder in the prototype.
        </p>
        <button onClick={onClose} style={{ background: COLORS.ink, color: "#fff", border: "none", padding: "9px 20px", fontWeight: 700, cursor: "pointer" }}>
          OK
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   Reusable Setup-form building blocks
   ========================================================= */
/* Plain modal card: the title bar stays pinned (position:sticky) while the
   card itself is the one scrollbar for everything below it. Forms that need
   their header fields / button row to also stay put pin those sections the
   same way (see OrderEntryForm) instead of this shell managing it. */
function ModalShell({ title, onClose, wide, width, maxHeight, children, noScroll }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(5,27,35,0.6)", zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "center",
      // Extra bottom padding reserves room for the fixed PreviewBar
      // (Login/Dashboard pill, ~60px tall, pinned at bottom:14, zIndex 300)
      // so it never sits on top of / hides the modal's own bottom
      // action-button row.
      padding: "16px 16px 96px",
      backdropFilter: "blur(2px)",
    }}>
      {/* The card is a fixed-height flex column: the title bar is a normal
          (non-scrolling) flex item up top, and the body below it is the
          ONE clearly-scrollable region -- no more nested/ambiguous scrolling
          between the card and its content. `overflow:hidden` on the card
          itself guarantees no outer/page-level scrollbar can ever appear;
          for grid forms (noScroll) the body doesn't scroll either -- only
          the book/line table's own small bordered box further down does,
          same as a frozen-header spreadsheet. */}
      <div className="fade-up font-body modal-shell-card" style={{
        width: width || (wide ? 780 : 440), maxWidth: "100%",
        maxHeight: maxHeight || "calc(100vh - 112px)", display: "flex", flexDirection: "column",
        borderRadius: 16, background: COLORS.cream, boxShadow: "0 30px 70px rgba(0,0,0,0.45)",
        overflow: "hidden",
      }}>
        <div style={{
          flex: "0 0 auto",
          background: `linear-gradient(135deg, ${COLORS.ink}, ${COLORS.inkDark})`, color: "#fff",
          padding: "13px 18px", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div className="font-display" style={{ fontWeight: 700, fontSize: 14.5 }}>{title}</div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.14)", border: "none", color: "#fff", cursor: "pointer",
            width: 26, height: 26, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
          }}><X size={14} /></button>
        </div>
        <div className="themed-scroll modal-shell-content" style={{
          flex: "1 1 auto", overflowY: noScroll ? "hidden" : "auto", overflow: noScroll ? "hidden" : undefined, padding: 10,
        }}>{children}</div>
      </div>
    </div>
  );
}

// forwardRef so a specific instance (Save, on Sales Memo Bookwise -- see
// saveButtonRef in OrderEntryForm) can be focused programmatically, e.g.
// after Enter on Paid Amount. Every other caller is unaffected -- ref is
// optional and simply ignored if not passed.
const FooterBtn = React.forwardRef(function FooterBtn({ children, onClick, onDoubleClick, primary, danger }, ref) {
  return (
    // type="button" -- without it, a <button> defaults to type="submit". These
    // buttons normally sit outside any <form>, but forcing the type removes
    // any doubt and guards against a button silently doing nothing (or
    // triggering an unrelated submit) if it ever ends up inside one.
    <button ref={ref} type="button" onClick={onClick} onDoubleClick={onDoubleClick} style={{
      padding: "7px 13px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer",
      border: primary ? "none" : danger ? "1.5px solid #f0b8b0" : `1.5px solid ${COLORS.paperLine}`,
      background: primary ? `linear-gradient(135deg, ${COLORS.ink}, ${COLORS.inkDark})` : danger ? "transparent" : COLORS.paperDark,
      color: primary ? "#fff" : danger ? "#c0392b" : COLORS.charcoal,
    }}>{children}</button>
  );
});

/* "List of Values" search popup -- mirrors the old Oracle Forms behaviour:
   put the cursor in a code field (or the Search box) and press Enter (or
   click the magnifier), and a filterable list of every matching record
   shows up so you can pick by NAME instead of needing to remember a code.
   Used by Party Information's Search box and by any "pair" header field
   that has a `lookup` config (e.g. Bookwise's District / Party Code). */
function LovPopup({ title, items, initialQuery, onPick, onClose }) {
  const [q, setQ] = useState(initialQuery || "");
  const inputRef = useRef(null);
  useEffect(() => { inputRef.current && inputRef.current.focus(); }, []);
  const filtered = items.filter((it) => {
    const s = q.trim().toLowerCase();
    if (!s) return true;
    return (it.code || "").toLowerCase().includes(s) || (it.name || "").toLowerCase().includes(s);
  });
  const pick = (it) => { onPick(it); onClose(); };
  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(5,27,35,0.6)", zIndex: 400,
        display: "flex", alignItems: "flex-start", justifyContent: "center", backdropFilter: "blur(2px)",
        paddingTop: 30,
      }}
      onClick={onClose}
    >
      <div
        className="fade-up font-body"
        style={{
          width: 420, maxWidth: "94%", maxHeight: "70vh", display: "flex", flexDirection: "column",
          borderRadius: 14, background: COLORS.cream, boxShadow: "0 30px 70px rgba(0,0,0,0.45)",
          overflow: "hidden", border: `1px solid ${COLORS.paperLine}`,
          marginTop: 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          flex: "0 0 auto", background: "#0b8ca3", color: "#fff",
          padding: "10px 12px 10px 16px", fontWeight: 700, fontSize: 13.5,
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
          borderBottom: "1px solid rgba(255,255,255,0.13)",
        }}>
          <span style={{ display: "inline-block", lineHeight: 1.2 }}>{title || "Search"}</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              background: "rgba(255,255,255,0.14)", border: "none", color: "#fff", cursor: "pointer",
              width: 22, height: 22, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
              padding: 0, flex: "0 0 auto",
            }}
          >
            <X size={12} strokeWidth={2.5} />
          </button>
        </div>
        <div style={{ padding: 10, flex: "0 0 auto" }}>
          <input
            ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Type a name or code to filter…" style={inputStyle}
            onKeyDown={(e) => {
              if (e.key === "Escape") onClose();
              if (e.key === "Enter" && filtered.length) pick(filtered[0]);
            }}
          />
        </div>
        <div className="themed-scroll" style={{ overflowY: "auto", flex: "1 1 auto", padding: "0 10px 10px" }}>
          {filtered.length === 0 && (
            <div style={{ fontSize: 12, color: COLORS.charcoalSoft, padding: "10px 4px" }}>No matches.</div>
          )}
          {filtered.map((it, i) => (
            <div
              key={`${it.code}-${i}`} onMouseDown={(e) => e.preventDefault()} onClick={() => pick(it)}
              style={{
                display: "flex", gap: 10, padding: "7px 8px", borderRadius: 8, cursor: "pointer",
                fontSize: 12.5, color: COLORS.charcoal, borderBottom: `1px dashed ${COLORS.paperLine}`,
              }}
            >
              <span style={{ fontWeight: 700, color: COLORS.inkDark, minWidth: 40 }}>{it.code}</span>
              <span>{it.name}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: 10, borderTop: `1.5px solid ${COLORS.paperLine}`, display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <FooterBtn onClick={onClose}>Cancel</FooterBtn>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "4px 8px", borderRadius: 6, border: `1.5px solid ${COLORS.paperLine}`,
  background: COLORS.paper, fontSize: 12, color: COLORS.charcoal, outline: "none", boxSizing: "border-box",
};
const thStyle = {
  padding: "3px 5px", textAlign: "left", color: COLORS.inkDark, fontWeight: 700,
  borderBottom: `1.5px solid ${COLORS.paperLine}`, whiteSpace: "normal", lineHeight: 1.15,
  position: "sticky", top: 0, background: COLORS.paperDark, zIndex: 1, fontSize: 11.5,
};
const tdStyle = { padding: "2px 5px", borderBottom: `1px dashed ${COLORS.paperLine}`, color: COLORS.charcoal };

const autoFieldStyle = { ...inputStyle, background: COLORS.paperDark, color: COLORS.charcoalSoft, fontWeight: 700, cursor: "not-allowed" };

/* Fixed-height "record block" for entry-line grids, matching the old desktop
   POS: header fields + Save/Exit buttons always stay put, only the book/line
   rows scroll -- and the box auto-scrolls down to reveal a freshly
   auto-added row (oldest rows glide up out of view), exactly like the
   Oracle Forms multi-record blocks this system replaces. Kept short enough
   that, together with the compact fields around it, a whole form fits in
   the modal's card without the card itself ever needing to scroll. A config
   can override this per-form (config.gridBoxHeight) when it has extra footer
   panels/buttons competing for space. */
const GRID_BOX_MAX_HEIGHT = 170;

/* One formula for every entry-grid's modal width, so screens are sized
   consistently from their column widths instead of hand-picked per form. */
function gridAutoWidth(grid) {
  if (!grid || !grid.columns || !grid.columns.length) return null;
  const sum = grid.columns.reduce((s, c) => s + (c.w || 100) + 20, 0) + 60;
  return Math.max(640, Math.min(1400, sum));
}

/* Soft background tints used to echo the legacy screens' colour-coded cells
   (pink = lookup code, yellow = amount to double-check, orange = system value) */
const TINT_COLORS = { pink: "#fbe3e6", yellow: "#fff6c2", orange: "#ffe7c4" };
function tintStyle(base, tint) {
  return tint && TINT_COLORS[tint] ? { ...base, background: TINT_COLORS[tint] } : base;
}
/* Rounds a computed number to 2dp and blanks out NaN, so derived grid/footer
   cells never show "NaN" or long float tails. */
function fmtNum(n) {
  if (n === null || n === undefined || Number.isNaN(n)) return "";
  return String(Math.round(n * 100) / 100);
}

/* ---------- Print layouts (Cash Memo / Challan / Booking Slip) ----------
   Sales Memo Bookwise's three print buttons each build a small HTML
   document (styled with plain inline CSS, so it looks right regardless of
   the app's own stylesheet) and hand it to a real print-preview window --
   window.print() opens the browser's normal print dialog (which itself
   offers "Save as PDF"), same as any other printable web page. */
function escapeHtml(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}
const PRINT_DOC_STYLE = `
  * { box-sizing: border-box; }
  body { font-family: "Segoe UI", Arial, Helvetica, sans-serif; padding: 26px; color: #1f2c30; }
  .doc-title { text-align: center; font-size: 19px; font-weight: 800; letter-spacing: 0.04em; margin: 0 0 2px; text-transform: uppercase; }
  .doc-sub { text-align: center; font-size: 11.5px; color: #5b7178; margin-bottom: 16px; }
  .hdr-row { display: flex; justify-content: space-between; gap: 20px; font-size: 12.5px; margin-bottom: 4px; flex-wrap: wrap; }
  .hdr-row > div { flex: 1 1 auto; }
  .hdr-row b { color: #164e63; }
  table.doc-table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 12.5px; }
  table.doc-table th, table.doc-table td { border: 1px solid #9fb8bd; padding: 5px 7px; }
  table.doc-table th { background: #dcedf0; text-align: left; }
  table.doc-table td.num, table.doc-table th.num { text-align: right; }
  .totals { width: 280px; margin-left: auto; margin-top: 12px; border-collapse: collapse; font-size: 12.5px; }
  .totals td { padding: 3px 6px; }
  .totals td:last-child { text-align: right; font-weight: 700; }
  .totals tr.grand td { border-top: 1.5px solid #164e63; font-size: 13.5px; padding-top: 6px; }
  .sign-row { display: flex; justify-content: space-between; margin-top: 60px; }
  .sign-row div { width: 160px; border-top: 1px solid #444; text-align: center; padding-top: 4px; font-size: 12px; }
  .remarks { margin-top: 14px; font-size: 12px; }
  @media print { body { padding: 8mm; } }
`;
function openPrintWindow(title, bodyHtml, style) {
  const w = window.open("", "_blank", "width=850,height=680");
  if (!w) return false;
  w.document.open();
  w.document.write(
    `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title>` +
    `<style>${style || PRINT_DOC_STYLE}</style></head><body>${bodyHtml}` +
    `<script>window.onload = function () { window.focus(); window.print(); };</script>` +
    `</body></html>`
  );
  w.document.close();
  return true;
}

/* ---------- Bengali (বাংলা) Cash Memo -- Ekalantor's own wholesale-book
   memo layout: a bordered header box (Sales Type / Address / Memo No /
   Date / Prepared by), a bordered book table, then an unruled totals
   column (Commission / Packing / Discount / Remaining / Deposit / Due /
   Previous Due / Total Due) with Manager & Delivery signature lines and a
   printed-at footer, matching the paper memo this replaces. Quantities,
   rates and money always render in Bengali numerals; the Memo No keeps
   its Latin "SL-" serial (as printed on the original paper memos) and
   Prepared-by keeps the plain username. */
const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
function toBnDigits(v) {
  return String(v).replace(/[0-9]/g, (d) => BN_DIGITS[d]);
}
/* Whole numbers (quantities) -- Bengali digits, no decimal point. */
function bnInt(n) {
  const v = Math.round(parseFloat(n) || 0);
  return toBnDigits(String(v));
}
/* Money / rates -- one decimal place, thousands-comma, Bengali digits;
   sign kept as a plain "-" (a due can legitimately go negative, i.e. an
   overpayment/advance, same as the paper memo shows). */
function bnMoney(n) {
  const v = Math.round((parseFloat(n) || 0) * 10) / 10;
  const neg = v < 0;
  const abs = Math.abs(v).toFixed(1);
  const [intPart, decPart] = abs.split(".");
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return toBnDigits(`${neg ? "-" : ""}${withCommas}.${decPart}`);
}
/* header.date is stored dd/mm/yy (see formatShortDate) -- expand to a
   4-digit year and render in Bengali digits, e.g. "07/09/26" -> "০৭/০৯/২০২৬". */
function bnDate(shortDate) {
  const parts = String(shortDate || "").split("/");
  if (parts.length !== 3) return toBnDigits(shortDate || "");
  let [d, m, y] = parts;
  if (y.length === 2) y = (parseInt(y, 10) >= 70 ? "19" : "20") + y;
  return toBnDigits(`${d}/${m}/${y}`);
}
const SALES_TYPE_BN = { Library: "লাইব্রেরী", Normal: "সাধারণ", Condition: "শর্তাধীন", Wholesale: "পাইকারি" };
/* Palette lifted from the "receipt studio" mockup the client approved:
   deep slate ink (#243a42), warm cream accent (#f4e9c8), soft slate-blue
   page background (#e9eef2) behind a rounded white paper card, thin
   #6d7b80-family borders instead of harsh black rules. Kept print-safe:
   the page tint/shadow are for the on-screen print-preview only and are
   flattened to plain white in @media print so no ink is wasted on paper. */
const CASH_MEMO_BN_STYLE = `
  * { box-sizing: border-box; }
  body {
    font-family: "Kalpurush", "Noto Sans Bengali", "Nikosh", "Segoe UI", Arial, sans-serif;
    background: #e9eef2; color: #1e292d; padding: 26px; font-size: 13px;
  }
  .bn-shell { max-width: 720px; margin: 0 auto; }
  .bn-paper {
    background: #fff; border-radius: 16px; padding: 26px 28px;
    box-shadow: 0 12px 32px rgba(36, 58, 66, 0.12); border: 1px solid #e2e8ea;
  }
  .bn-headrow {
    display: flex; justify-content: space-between; align-items: flex-end; gap: 14px;
    border-bottom: 1.5px solid #243a42; padding-bottom: 10px; margin-bottom: 14px;
  }
  .bn-headrow-left { display: flex; align-items: center; gap: 18px; font-weight: 700; }
  .bn-headrow-left .bn-tag { color: #718087; font-weight: 700; margin-right: 6px; }
  .bn-serial-chip {
    display: inline-flex; align-items: center; justify-content: center; min-width: 26px;
    padding: 2px 8px; border: 1.3px solid #6d7b80; border-radius: 7px; font-weight: 700; font-size: 12.5px;
  }
  .bn-memo-tag { color: #718087; font-weight: 700; margin-right: 6px; }
  .bn-memo-val { font-weight: 800; letter-spacing: 0.02em; }
  .bn-infogrid {
    display: grid; grid-template-columns: 1.25fr 1fr; border: 1.3px solid #cdd6d9;
    border-radius: 10px; overflow: hidden; font-size: 12.5px; margin-bottom: 14px;
  }
  .bn-cell {
    display: flex; border-bottom: 1px solid #e2e8ea;
  }
  .bn-infogrid > div:nth-child(odd) { border-right: 1px solid #e2e8ea; }
  .bn-cell:last-child, .bn-infogrid > div:last-child .bn-cell { border-bottom: none; }
  .bn-cell-label {
    width: 88px; flex-shrink: 0; padding: 7px 10px; font-weight: 700; color: #45565c;
    background: #f6f8f9; border-right: 1px solid #e2e8ea;
  }
  .bn-cell-value { flex: 1; padding: 7px 10px; }
  table.bn-table { width: 100%; border-collapse: collapse; font-size: 12.5px; border-radius: 10px; overflow: hidden; border: 1.3px solid #cdd6d9; }
  table.bn-table th {
    background: #f4e9c8; color: #3a3220; text-align: center; font-weight: 700;
    padding: 7px 8px; border-bottom: 1.3px solid #cdd6d9;
  }
  table.bn-table td { padding: 6px 8px; border-top: 1px solid #eef1f2; }
  table.bn-table td.num { text-align: right; }
  .bn-total-row td { border-top: 1.5px solid #243a42; padding: 7px 8px; font-weight: 800; background: #f6f8f9; }
  .bn-below { display: flex; justify-content: space-between; margin-top: 16px; gap: 24px; }
  .bn-notes { font-size: 12.5px; flex: 1; }
  .bn-notes .note-line { margin-bottom: 8px; color: #45565c; font-weight: 600; }
  .bn-notes .note-line span.fill { border-bottom: 1px solid #c3ccd0; display: inline-block; min-width: 150px; margin-left: 4px; }
  .bn-sign { display: flex; gap: 40px; margin-top: 46px; }
  .bn-sign div { width: 150px; border-top: 1.3px solid #6d7b80; text-align: center; padding-top: 5px; font-size: 12px; font-weight: 600; color: #45565c; }
  .bn-summary { border-collapse: collapse; font-size: 12.5px; min-width: 230px; }
  .bn-summary td { padding: 4px 4px; }
  .bn-summary td:first-child { color: #45565c; }
  .bn-summary td:nth-child(2) { color: #93a0a5; padding: 0 6px; }
  .bn-summary td:last-child { text-align: right; min-width: 90px; font-variant-numeric: tabular-nums; }
  .bn-summary tr.bn-strong td { font-weight: 800; color: #182226; }
  .bn-summary tr.bn-rule td { border-top: 1.3px solid #243a42; padding-top: 7px; }
  .bn-footer {
    display: flex; justify-content: space-between; margin-top: 30px; font-size: 10.5px;
    color: #93a0a5; border-top: 1px solid #e2e8ea; padding-top: 8px;
  }
  @media print {
    body { background: #fff; padding: 8mm; }
    .bn-paper { box-shadow: none; border: none; border-radius: 0; padding: 0; }
  }

  /* Compact print-preview layout used by both Cash Memo Print and Challan Due. */
  @page { size: A4 portrait; margin: 0; }
  body { background: #303030; padding: 8px; font-size: 11px; }
  .bn-shell { width: 540px; min-height: 774px; max-width: none; margin: 150px auto 0; background: #fff; }
  .bn-paper { min-height: 774px; padding: 86px 22px 42px; border: 0; border-radius: 0; box-shadow: 0 0 18px rgba(0,0,0,0.35); }
  .bn-headrow { display: grid; grid-template-columns: 1fr 150px; align-items: stretch; border: 1px solid #696969; min-height: 27px; margin: 0; padding: 0; }
  .bn-headrow-left { display: flex; align-items: center; justify-content: space-between; gap: 0; }
  .bn-headrow-left > span:first-child { display: flex; align-items: center; flex: 1; }
  .bn-headrow-left .bn-tag { width: 42px; padding: 4px 6px; margin: 0 7px 0 0; border-right: 1px solid #696969; color: #202020; }
  .bn-serial-chip { width: 34px; min-width: 34px; height: 23px; margin: 1px 3px 1px 0; padding: 0; border: 1px solid #696969; border-radius: 0; font-size: 11px; }
  .bn-headrow > div:last-child { display: flex; align-items: center; border-left: 1px solid #696969; }
  .bn-memo-tag { width: 54px; padding: 4px 5px; margin: 0; border-right: 1px solid #696969; color: #202020; }
  .bn-memo-val { padding-left: 9px; }
  .bn-infogrid { display: grid; grid-template-columns: 1fr 150px; grid-template-rows: 27px 27px; border: 1px solid #696969; border-top: 0; border-radius: 0; margin-bottom: 7px; font-size: 10.5px; }
  .bn-cell { display: flex; border-bottom: 1px solid #696969; }
  .bn-cell:nth-child(1) { grid-row: 1 / 3; }
  .bn-infogrid > div:nth-child(2) { grid-column: 2; grid-row: 1; border-left: 0; }
  .bn-infogrid > div:nth-child(3) { grid-column: 1; grid-row: 2; border-right: 1px solid #696969; }
  .bn-infogrid > div:nth-child(4) { grid-column: 2; grid-row: 2; border-left: 0; }
  .bn-cell-label { width: 48px; padding: 5px 6px; color: #202020; background: #fff; border-right: 1px solid #696969; }
  .bn-cell-value { padding: 5px 7px; }
  table.bn-table { width: 100%; table-layout: fixed; border-collapse: collapse; border: 1px solid #696969; border-radius: 0; overflow: visible; font-size: 10.5px; }
  table.bn-table th { background: #fff; color: #202020; padding: 4px 3px; height: 21px; border: 1px solid #696969; }
  table.bn-table th:nth-child(1) { width: 12%; }
  table.bn-table th:nth-child(2) { width: 39%; }
  table.bn-table th:nth-child(3) { width: 16%; }
  table.bn-table th:nth-child(4) { width: 16%; }
  table.bn-table th:nth-child(5) { width: 17%; }
  table.bn-table td { height: 20px; padding: 3px 5px; border: 1px solid #696969; }
  .bn-total-row td { padding: 4px 5px; background: #fff; border-top: 1px solid #696969; }
  .bn-below { display: grid; grid-template-columns: 1fr 178px; min-height: 174px; margin-top: 0; gap: 0; }
  .bn-notes { padding: 10px 7px; font-size: 10.5px; }
  .bn-notes .note-line { margin-bottom: 8px; color: #202020; }
  .bn-notes .note-line span.fill { min-width: 116px; border-bottom: 1px solid #999; }
  .bn-sign { justify-content: space-around; gap: 30px; margin-top: 86px; }
  .bn-sign div { width: 88px; border-top: 1px solid #999; padding-top: 4px; font-size: 9.5px; color: #202020; }
  .bn-summary { width: 100%; min-width: 0; border-left: 1px solid #696969; font-size: 10.5px; }
  .bn-summary td { padding: 3px 4px; }
  .bn-summary td:first-child { color: #202020; text-align: right; }
  .bn-summary td:nth-child(2) { color: #202020; padding: 0 6px; }
  .bn-summary td:last-child { min-width: 55px; color: #202020; }
  .bn-summary tr.bn-strong td { color: #202020; }
  .bn-summary tr.bn-rule td { border-top: 1px solid #696969; padding-top: 5px; }
  .bn-footer { position: absolute; left: 22px; right: 22px; bottom: 39px; margin: 0; padding: 0; border: 0; color: #202020; font-size: 9px; }
  @media (max-width: 600px) { body { background: #fff; padding: 0; } .bn-shell, .bn-paper { width: 100%; min-height: 100vh; } .bn-paper { padding-left: 12px; padding-right: 12px; } .bn-footer { left: 12px; right: 12px; } }
  @media print { body { background: #fff; padding: 0; } .bn-shell, .bn-paper { width: 100%; min-height: 297mm; } .bn-paper { padding: 22mm 15mm 15mm; box-shadow: none; } .bn-footer { left: 15mm; right: 15mm; bottom: 13mm; } }
`;

/* Record-navigation buttons (First/Previous/Next/Last) render as their own
   right-aligned row, separate from the Save/Cancel/Exit action row -- this
   matches the old Oracle Forms layout, where that cluster sits apart. */
const NAV_BUTTON_LABELS = ["First", "Previous", "Next", "Last"];

/* Old Oracle Forms muscle memory: Enter moves to the next field instead of
   needing Tab or a mouse click, all the way through header fields, the
   book/line grid, and the footer/payment panels. Attached once on a
   container (onKeyDown, event delegation) rather than on every input.
   Multi-line text areas keep Enter for a newline; the Search box keeps its
   own "Enter runs the search" behaviour (that handler fires first and
   doesn't stop propagation, so focus still advances afterwards). */
function handleEnterAsTab(e) {
  if (e.key !== "Enter") return;
  const tag = e.target.tagName;
  if (tag === "TEXTAREA" || tag === "BUTTON") return;
  e.preventDefault();
  const focusable = Array.from(
    e.currentTarget.querySelectorAll(
      'input:not([disabled]):not([readonly]), select:not([disabled]), textarea:not([disabled]):not([readonly])'
    )
  ).filter((el) => el.offsetParent !== null);
  const idx = focusable.indexOf(e.target);
  if (idx > -1 && idx < focusable.length - 1) {
    const next = focusable[idx + 1];
    next.focus();
    if (next.select) next.select();
  }
}

/* Companion to handleEnterAsTab, for the one case that helper can't cover:
   picking a value out of a search popup (List of Values). That pick happens
   via a mouse click, or an Enter pressed *inside the popup's own filter
   box* -- never a keydown on the underlying form -- so it never bubbles up
   to handleEnterAsTab and the cursor would otherwise just sit wherever the
   popup happened to close. Called with the field that originally opened the
   popup (the Code input/cell), it moves focus on to the next visible,
   enabled focusable element in DOM order -- the same "next field" rule
   handleEnterAsTab uses -- so picking from the list advances the cursor
   exactly like typing a matching code and pressing Enter does. */
function focusNextFocusable(fromEl) {
  if (!fromEl) return;
  const focusable = Array.from(
    document.querySelectorAll(
      'input:not([disabled]):not([readonly]), select:not([disabled]), textarea:not([disabled]):not([readonly])'
    )
  ).filter((el) => el.offsetParent !== null);
  const idx = focusable.indexOf(fromEl);
  if (idx > -1 && idx < focusable.length - 1) {
    const next = focusable[idx + 1];
    next.focus();
    if (next.select) next.select();
  }
}

/* Compact "saved entries" list shown under a record form so a mistyped entry can be
   found and corrected -- click the pencil to load it back into the form for editing. */
function RecordsList({ records, columns, activeIdx, onEdit, onDelete }) {
  // Defined below (used by OrderRecordsList too); a "pair" column's saved
  // value is a {code, name} object, so it needs the name/code picked out
  // for display instead of being handed straight to React as a child.
  if (!records.length) return null;
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, color: COLORS.charcoalSoft, marginBottom: 4, letterSpacing: "0.03em", textTransform: "uppercase" }}>
        Saved Entries ({records.length}) — click ✎ to edit a mistake
      </div>
      <div style={{ border: `1.5px solid ${COLORS.paperLine}`, borderRadius: 9, maxHeight: 150, overflowY: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: COLORS.paperDark, position: "sticky", top: 0 }}>
              {columns.map((c) => <th key={c.key} style={thStyle}>{c.label}</th>)}
              <th style={{ ...thStyle, width: 60, textAlign: "center" }}></th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i} style={{ background: i === activeIdx ? `${COLORS.ink}1a` : undefined }}>
                {columns.map((c) => (
                  <td key={c.key} style={{ ...tdStyle, maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {summarizeHeaderValue(c, r[c.key])}
                  </td>
                ))}
                <td style={{ ...tdStyle, textAlign: "center" }}>
                  <button onClick={() => onEdit(i)} title="Edit" style={{ background: "none", border: "none", color: COLORS.inkDark, cursor: "pointer", marginRight: 8 }}>
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => onDelete(i)} title="Delete" style={{ background: "none", border: "none", color: "#c0392b", cursor: "pointer" }}>
                    <X size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* inputRef/onKeyDown are optional -- only the Book Entry grid passes them
   (for the per-cell Enter-to-next-field navigation below); every other
   caller is unaffected. */
function FieldInput({ field, value, onChange, store, inputRef, onKeyDown, onBlur, onCascade }) {
  /* A "pair" field (code + auto-filled name + search icon) needs the same
     code-lookup / retype / search-and-select machinery as the Order/Report
     forms use -- rather than re-implement it here, hand off to
     OrderHeaderField, which already renders exactly that for any field with
     a `lookup` config (e.g. District Name on Specimen Party). */
  if (field.type === "pair") {
    return <OrderHeaderField field={field} value={value} onChange={onChange} store={store} onCascade={onCascade} />;
  }
  if (field.disabled) {
    return <input readOnly disabled value={value || ""} style={tintStyle(autoFieldStyle, field.tint)} title={field.label} />;
  }
  if (field.auto) {
    return <input value={value || ""} readOnly disabled style={autoFieldStyle} title="Auto-generated serial code" />;
  }
  if (field.type === "dynamicSelect") {
    const options = ((store && store[field.sourceKey]) || []).map((r) => r.name).filter(Boolean);
    return (
      <select ref={inputRef} onKeyDown={onKeyDown} onBlur={onBlur} value={value || ""} onChange={(e) => onChange(e.target.value)} style={{ ...tintStyle(inputStyle, field.tint), cursor: "pointer" }}>
        <option value="">{options.length ? `Select ${field.label}` : `No ${field.sourceKey} saved yet`}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    );
  }
  if (field.type === "select") {
    return (
      <select ref={inputRef} onKeyDown={onKeyDown} onBlur={onBlur} value={value || ""} onChange={(e) => onChange(e.target.value)} style={{ ...tintStyle(inputStyle, field.tint), cursor: "pointer" }}>
        <option value="">Select {field.label}</option>
        {(field.options || []).map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    );
  }
  if (field.type === "textarea") {
    return <AutoGrowTextarea value={value} onChange={onChange} style={tintStyle(inputStyle, field.tint)} />;
  }
  return (
    <input
      ref={inputRef} onKeyDown={onKeyDown} onBlur={onBlur}
      type={field.type === "number" ? "number" : field.type === "email" ? "email" : "text"}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      style={tintStyle(inputStyle, field.tint)}
    />
  );
}

/* Single-record navigable form (Code/Name/... + Save/Clear/Delete/Exit + First/Prev/Next/Last) */
function RecordSetupForm({ config, records, setRecords, store, mirrorRecords, onClose }) {
  const autoKeys = config.fields.filter((f) => f.auto).map((f) => f.key);
  const blankForm = () => Object.fromEntries(autoKeys.map((k) => [k, nextSerial(records, k)]));
  const [idx, setIdx] = useState(-1);
  const [form, setForm] = useState(blankForm);
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");
  const [showLov, setShowLov] = useState(false);

  useEffect(() => {
    let changed = false;
    const used = Object.fromEntries(autoKeys.map((key) => [key, []]));
    const normalized = records.map((record) => {
      const nextRecord = { ...record };
      autoKeys.forEach((key) => {
        if (used[key].some((value) => value === record[key])) {
          nextRecord[key] = nextSerial(used[key].map((value) => ({ [key]: value })), key);
          changed = true;
        }
        used[key].push(nextRecord[key]);
      });
      return nextRecord;
    });
    if (changed) setRecords(normalized);
  }, [records, autoKeys.length]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { setForm(idx >= 0 ? records[idx] : blankForm()); }, [idx]); // eslint-disable-line

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const applyCascade = (cascade, record) => {
    cascade.forEach((item) => {
      if (item.type === "pair") {
        setField(item.targetKey, { code: record[item.codeField] || "", name: record[item.nameField] || "" });
      } else {
        setField(item.targetKey, record[item.field] || "");
      }
    });
  };

  const handleSave = () => {
    const hasValue = Object.entries(form).some(([k, v]) => !autoKeys.includes(k) && v);
    if (!hasValue) { setMsg("Nothing to save"); setTimeout(() => setMsg(""), 1400); return; }
    if (idx >= 0) {
      const next = records.slice(); next[idx] = form; setRecords(next);
      if (mirrorRecords) mirrorRecords((rs) => rs.map((r) => r.partyCode === (form.partyCode || form.code) ? { ...r, ...form, partyCode: form.partyCode || form.code, partyName: form.partyName || form.name } : r));
      setMsg("Saved successfully");
    } else {
      const next = [...records, form]; setRecords(next);
      if (mirrorRecords) mirrorRecords((rs) => [...rs, { ...form, partyCode: form.partyCode || form.code, partyName: form.partyName || form.name, partyType: form.partyType || "Special People", districtCode: form.district?.code || form.districtCode || "", districtName: form.district?.name || form.districtName || "" }]);
      /* Ready the form for the next entry right away, instead of parking on the
         just-saved record -- matches the old ledger system's "save & continue" flow. */
      const nextForm = Object.fromEntries(autoKeys.map((key) => [key, nextSerial(next, key)]));
      setForm(nextForm); setIdx(-1);
      setMsg("Saved — ready for next entry");
    }
    setTimeout(() => setMsg(""), 1600);
  };
  const handleDelete = () => {
    if (idx < 0) return;
    const next = records.filter((_, i) => i !== idx);
    setRecords(next);
    setIdx(next.length ? Math.min(idx, next.length - 1) : -1);
  };
  const goFirst = () => records.length && setIdx(0);
  const goLast = () => records.length && setIdx(records.length - 1);
  const goNext = () => records.length && setIdx(idx < 0 || idx >= records.length - 1 ? 0 : idx + 1);
  const goPrev = () => records.length && setIdx(idx <= 0 ? records.length - 1 : idx - 1);
  const doSearch = () => {
    setShowLov(true);
  };
  const listColumns = config.fields.filter((f) => f.type !== "textarea").slice(0, 3);
  const editFromList = (i) => setIdx(i);
  const deleteFromList = (i) => {
    const next = records.filter((_, ix) => ix !== i);
    setRecords(next);
    if (i === idx) setIdx(-1);
    else if (idx > i) setIdx(idx - 1);
  };

  return (
    <ModalShell title={config.title} onClose={onClose} wide={config.wide}>
      {/* handleEnterAsTab (same helper used on the order-entry and report
          forms) was missing here too -- Enter after typing one field just
          sat there instead of advancing to the next field. */}
      <div onKeyDown={handleEnterAsTab}>
      {config.searchable && (
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && doSearch()}
            placeholder="Search..." style={inputStyle}
          />
          <FooterBtn onClick={doSearch}>Search</FooterBtn>
        </div>
      )}
      {showLov && <LovPopup title={`Find ${config.title}`} initialQuery={search}
        items={records.map((r, i) => ({ code: r.code || r.partyCode || "", name: r.name || r.partyName || "", _idx: i }))}
        onPick={(it) => { setIdx(it._idx); setShowLov(false); }} onClose={() => setShowLov(false)} />}
      <div className="responsive-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
        {config.fields.map((f) => (
          <div key={f.key} style={f.type === "textarea" ? { gridColumn: "1 / -1" } : undefined}>
            <ModernField label={f.label}>
              <FieldInput
                field={f} value={form[f.key]} onChange={(v) => setField(f.key, v)} store={store}
                onCascade={f.lookup && f.lookup.cascade ? (record) => applyCascade(f.lookup.cascade, record) : undefined}
              />
            </ModernField>
          </div>
        ))}
      </div>
      {msg && <div style={{ color: COLORS.inkDark, fontSize: 12, marginBottom: 8, fontWeight: 600 }}>{msg}</div>}
      <div style={{ fontSize: 11, color: COLORS.charcoalSoft, marginBottom: 10 }}>
        Record: {idx >= 0 ? idx + 1 : 0} / {records.length}
      </div>
      <div className="modal-action-row" style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        <FooterBtn onClick={handleSave} primary>Save</FooterBtn>
        <FooterBtn onClick={handleDelete} danger>Delete</FooterBtn>
        <FooterBtn onClick={goFirst}>First</FooterBtn>
        <FooterBtn onClick={goPrev}>Previous</FooterBtn>
        <FooterBtn onClick={goNext}>Next</FooterBtn>
        <FooterBtn onClick={goLast}>Last</FooterBtn>
        <FooterBtn onClick={onClose}>Exit</FooterBtn>
      </div>
      </div>
    </ModalShell>
  );
}

/* Full-viewport shell for forms that must never need an inner scrollbar (e.g. Book Entry) */
function FullScreenShell({ title, onClose, children }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: COLORS.cream, zIndex: 200,
      display: "flex", flexDirection: "column",
    }} className="fade-up font-body">
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.ink}, ${COLORS.inkDark})`, color: "#fff",
        padding: "13px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flex: "0 0 auto",
      }}>
        <div className="font-display" style={{ fontWeight: 700, fontSize: 15.5 }}>{title}</div>
        <button onClick={onClose} style={{
          background: "rgba(255,255,255,0.14)", border: "none", color: "#fff", cursor: "pointer",
          width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
        }}><X size={15} /></button>
      </div>
      <div style={{ flex: "1 1 auto", overflowY: "auto", padding: 18, display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </div>
  );
}

/* Multi-row grid form (Transport Entry, Paper Type Entry, Book Entry ...) */
function GridSetupForm({ config, rows, setRows, onClose }) {
  const blankRow = () => Object.fromEntries(config.fields.map((f) => [f.key, ""]));
  const [group, setGroup] = useState({ code: "", name: "" });
  const [msg, setMsg] = useState("");
  const gridBoxRef = useRef(null);
  const justAddedRow = useRef(false);

  useEffect(() => {
    if (justAddedRow.current && gridBoxRef.current) {
      gridBoxRef.current.scrollTo({ top: gridBoxRef.current.scrollHeight, behavior: "smooth" });
    }
    justAddedRow.current = false;
  }, [rows.length]);

  const updateCell = (ri, key, val) => {
    setRows((rs) => {
      const next = rs.map((r, i) => (i === ri ? { ...r, [key]: val } : r));
      if (ri === next.length - 1 && val) { next.push(blankRow()); justAddedRow.current = true; }
      return next;
    });
  };
  const removeRow = (ri) => setRows((rs) => (rs.length > 1 ? rs.filter((_, i) => i !== ri) : rs));
  const handleSave = () => { setMsg("Saved successfully"); setTimeout(() => setMsg(""), 1400); };
  const handleCancel = () => {
    setRows(Array.from({ length: config.initialRows || 6 }, blankRow));
    if (gridBoxRef.current) gridBoxRef.current.scrollTop = 0;
  };

  const body = (
    // handleEnterAsTab (same helper used on the order-entry, report, and
    // record-setup forms) was missing here too -- Enter in one cell just
    // sat there instead of advancing to the next cell/field.
    <div onKeyDown={handleEnterAsTab}>
      {config.groupLabel && (
        <div style={{ display: "flex", gap: 14, marginBottom: 12, flex: "0 0 auto" }}>
          <ModernField label={`${config.groupLabel} Code`}>
            <input style={inputStyle} value={group.code} onChange={(e) => setGroup((g) => ({ ...g, code: e.target.value }))} />
          </ModernField>
          <ModernField label={`${config.groupLabel} Name`}>
            <input style={inputStyle} value={group.name} onChange={(e) => setGroup((g) => ({ ...g, name: e.target.value }))} />
          </ModernField>
        </div>
      )}
      <div ref={gridBoxRef} style={{
        overflowX: "auto", overflowY: "scroll",
        height: config.fullPage ? "68vh" : GRID_BOX_MAX_HEIGHT,
        border: `1.5px solid ${COLORS.paperLine}`, borderRadius: 10, marginBottom: 12,
        flex: "0 0 auto",
      }}>
        <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 12.5 }}>
          <thead>
            <tr style={{ background: COLORS.paperDark }}>
              {config.fields.map((f) => (
                <th key={f.key} style={{ ...thStyle, minWidth: f.w || 110 }}>{f.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                {config.fields.map((f) => (
                  <td key={f.key} style={tdStyle}>
                    {f.auto
                      ? <input value={String(ri + 1).padStart(2, "0")} readOnly disabled style={autoFieldStyle} title="Auto-generated serial code" />
                      : <FieldInput field={f} value={row[f.key]} onChange={(v) => updateCell(ri, f.key, v)} />}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {msg && <div style={{ color: COLORS.inkDark, fontSize: 12.5, marginBottom: 10, fontWeight: 600, flex: "0 0 auto" }}>{msg}</div>}
      <div style={{ display: "flex", gap: 8, flex: "0 0 auto" }}>
        <FooterBtn onClick={handleSave} primary>Save</FooterBtn>
        <FooterBtn onClick={() => setRows((rs) => [...rs, blankRow()])}>Add New</FooterBtn>
        <FooterBtn onClick={handleCancel}>Cancel</FooterBtn>
        <FooterBtn onClick={onClose}>Exit</FooterBtn>
      </div>
    </div>
  );

  if (config.fullPage) {
    return <FullScreenShell title={config.title} onClose={onClose}>{body}</FullScreenShell>;
  }
  const popupWidth = config.title === "Book Entry Form"
    ? Math.min(gridAutoWidth({ columns: config.fields }) || 980, 980)
    : gridAutoWidth({ columns: config.fields });
  return <ModalShell title={config.title} onClose={onClose} wide width={popupWidth}>{body}</ModalShell>;
}

/* "Group List" popup modal for Book Entry Form's Search box -- opened by
   pressing Enter in the box or clicking "Search" (see GroupSearchBox
   below). Lists every saved Book Group (Creative Books, Textbook, ...),
   filterable by typing, same as the LovPopup used elsewhere for District /
   Party / Book Code -- but deliberately a two-step pick here, matching the
   legacy Oracle Forms List of Values window: a single click only
   highlights a row (arrow keys move the highlight too); the group isn't
   actually loaded and the popup doesn't close until that highlighted row
   is confirmed -- by pressing Enter, double-clicking the row, or clicking
   the Select button. */
function GroupListModal({ groups, initialQuery, onPick, onClose }) {
  const [q, setQ] = useState(initialQuery || "");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef(null);
  useEffect(() => { inputRef.current && inputRef.current.focus(); }, []);
  const filtered = groups.filter((g) => {
    const s = q.trim().toLowerCase();
    if (!s) return true;
    return (g.code || "").toLowerCase().includes(s) || (g.name || "").toLowerCase().includes(s);
  });
  // Re-anchor the highlight to the top match whenever the filter text
  // changes, instead of leaving it pointed at whatever row used to be at
  // that position before the list was narrowed down.
  useEffect(() => { setSelectedIdx(0); }, [q]);
  const commit = (g) => { if (!g) return; onPick(g); onClose(); };
  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(5,27,35,0.6)", zIndex: 400,
        display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(2px)",
      }}
      onClick={onClose}
    >
      <div
        className="fade-up font-body"
        style={{
          width: 420, maxWidth: "94%", maxHeight: "70vh", display: "flex", flexDirection: "column",
          borderRadius: 14, background: COLORS.cream, boxShadow: "0 30px 70px rgba(0,0,0,0.45)",
          overflow: "hidden", border: `1px solid ${COLORS.paperLine}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          flex: "0 0 auto", background: `linear-gradient(135deg, ${COLORS.ink}, ${COLORS.inkDark})`, color: "#fff",
          padding: "11px 16px", fontWeight: 700, fontSize: 13.5,
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
        }}>
          <span>Book Group List</span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.35)", color: "#fff",
                cursor: "pointer", padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700,
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              style={{
                background: "rgba(255,255,255,0.14)", border: "none", color: "#fff", cursor: "pointer",
                width: 22, height: 22, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                padding: 0, flex: "0 0 auto",
              }}
            >
              <X size={12} strokeWidth={2.5} />
            </button>
          </div>
        </div>
        <div style={{ padding: 10, flex: "0 0 auto" }}>
          <input
            ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Type a group name or code to filter…" style={inputStyle}
            onKeyDown={(e) => {
              if (e.key === "Escape") onClose();
              if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIdx((i) => Math.min(i + 1, filtered.length - 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIdx((i) => Math.max(i - 1, 0)); }
              if (e.key === "Enter" && filtered.length) commit(filtered[selectedIdx] || filtered[0]);
            }}
          />
        </div>
        <div className="themed-scroll" style={{ overflowY: "auto", flex: "1 1 auto", padding: "0 10px 10px" }}>
          {filtered.length === 0 && (
            <div style={{ fontSize: 12, color: COLORS.charcoalSoft, padding: "10px 4px" }}>
              {groups.length === 0 ? "No groups saved yet." : "No matches."}
            </div>
          )}
          {filtered.map((g, i) => (
            <div
              key={g.code}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setSelectedIdx(i)}
              onDoubleClick={() => commit(g)}
              style={{
                display: "flex", gap: 10, padding: "7px 8px", borderRadius: 8, cursor: "pointer",
                fontSize: 12.5, color: COLORS.charcoal, borderBottom: `1px dashed ${COLORS.paperLine}`,
                background: i === selectedIdx ? `${COLORS.ink}1a` : undefined,
              }}
            >
              <span style={{ fontWeight: 700, color: COLORS.inkDark, minWidth: 40 }}>{g.code}</span>
              <span>{g.name}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: 10, borderTop: `1.5px solid ${COLORS.paperLine}`, display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <FooterBtn onClick={onClose}>Cancel</FooterBtn>
          <FooterBtn onClick={() => commit(filtered[selectedIdx])} primary>Select</FooterBtn>
        </div>
      </div>
    </div>
  );
}

/* Search box for Book Entry Form, styled after the legacy Oracle Forms
   "Search" panel (a bordered box, a Press-Enter field, and a Search
   button) -- but rather than searching inline, both pressing Enter in the
   box and clicking "Search" open the GroupListModal popup above (whatever
   was typed here becomes that popup's starting filter, or the popup opens
   showing every group if the box is still empty). Picking a group there
   loads it (with its saved books) straight into the form, with no separate
   popup screen to navigate. */
function GroupSearchBox({ groups, onSelect }) {
  const [q, setQ] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const pick = (g) => { onSelect(g); setQ(""); };

  return (
    <div style={{
      border: `1.5px solid ${COLORS.paperLine}`, borderRadius: 10, padding: "8px 12px",
      background: COLORS.paperDark, flex: "0 0 auto",
    }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: COLORS.charcoalSoft, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 5 }}>
        Search
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <label style={{ fontSize: 11.5, fontWeight: 700, color: COLORS.charcoal, whiteSpace: "nowrap" }}>Press Enter</label>
        <input
          value={q} onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" || e.key === "F9") && openModal()}
          placeholder="Group name (or F9 / Search)" style={{ ...inputStyle, width: 150 }}
        />
        <FooterBtn onClick={openModal} primary>Search</FooterBtn>
      </div>
      {modalOpen && (
        <GroupListModal
          groups={groups}
          initialQuery={q}
          onPick={pick}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

/* Book Entry Form (Setup > Book Information). Books live inside named
   Groups: typing a Group Name and pressing Save creates/updates that
   group -- the Search box above reloads a previously saved group (with
   the books already saved under it) so more titles can be added to it.
   First/Next/Previous/Last page through the saved groups, same as the
   legacy Oracle Forms screen. */
function BookEntryForm({ config, groups, setGroups, books, setBooks, onClose }) {
  const blankRow = () => Object.fromEntries(config.fields.map((f) => [f.key, ""]));
  const hasContent = (row) => config.fields.some((f) => !f.auto && String(row[f.key] || "").trim() !== "");
  // Keep at least this many rows on screen at all times (padded with blanks)
  // so the grid never looks like a mostly-empty box -- matches the legacy
  // form, which always showed a full page of entry lines.
  const minRows = config.initialRows || 12;
  const freshRows = () => Array.from({ length: minRows }, blankRow);
  const padRows = (arr) => (arr.length >= minRows ? arr : [...arr, ...Array.from({ length: minRows - arr.length }, blankRow)]);

  const [group, setGroup] = useState({ code: "", name: "" });
  const [groupIdx, setGroupIdx] = useState(-1); // index into `groups`; -1 = new/unsaved group
  const [rows, setRows] = useState(freshRows);
  const [msg, setMsg] = useState("");
  const gridBoxRef = useRef(null);
  const justAddedRow = useRef(false);
  // cellRefs.current[rowIndex][fieldIndex] -> the actual <input>/<select> DOM
  // node for that cell (bookCode isn't tracked here -- it's the read-only
  // auto-serial cell and is never a valid Enter-navigation target).
  const cellRefs = useRef({});
  const setCellRef = (ri, fi) => (el) => {
    if (!cellRefs.current[ri]) cellRefs.current[ri] = [];
    cellRefs.current[ri][fi] = el;
  };
  // Enter inside a grid cell moves to the next editable column in the same
  // row, or -- once past the last column -- to the first editable column
  // of the next row, mirroring the old Oracle Forms grid. This is scoped
  // to the grid itself via explicit per-cell refs (rather than a generic
  // DOM-order tab-through), so it can't be thrown off by the Group Name /
  // Search fields above the grid or by rows being added while typing.
  const firstEditableFieldIdx = config.fields.findIndex((f) => !f.auto);
  const handleCellEnter = (e, ri, fi) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    e.stopPropagation(); // this cell owns Enter navigation -- don't also let it bubble to the outer handleEnterAsTab
    let nextFi = fi + 1;
    while (nextFi < config.fields.length && config.fields[nextFi].auto) nextFi++;
    let target = nextFi < config.fields.length ? cellRefs.current[ri]?.[nextFi] : null;
    if (!target && ri < rows.length - 1) target = cellRefs.current[ri + 1]?.[firstEditableFieldIdx];
    if (target) {
      target.focus();
      if (target.select) target.select();
    }
  };

  useEffect(() => {
    if (justAddedRow.current && gridBoxRef.current) {
      gridBoxRef.current.scrollTo({ top: gridBoxRef.current.scrollHeight, behavior: "smooth" });
    }
    justAddedRow.current = false;
  }, [rows.length]);

  const flash = (t) => { setMsg(t); setTimeout(() => setMsg(""), 1600); };

  const loadGroupRows = (code) => {
    const saved = books.filter((b) => b.groupCode === code);
    setRows(saved.length ? padRows([...saved.map((b) => ({ ...b })), blankRow()]) : freshRows());
  };

  const openGroup = (g, idx) => {
    setGroup({ code: g.code, name: g.name });
    setGroupIdx(idx);
    loadGroupRows(g.code);
  };

  const updateCell = (ri, key, val) => {
    setRows((rs) => {
      const next = rs.map((r, i) => (i === ri ? { ...r, [key]: val } : r));
      if (ri === next.length - 1 && val) { next.push(blankRow()); justAddedRow.current = true; }
      return next;
    });
  };
  const addRow = () => { justAddedRow.current = true; setRows((rs) => [...rs, blankRow()]); };
  // Row-level Delete: this grid live-registers a book into the permanent
  // `books` register on blur (see registerBook above) with no separate Save
  // step, so a mistyped/test row can't just be reverted by clicking away or
  // clicking Cancel -- it needs its own way to actually remove that saved
  // record, not merely clear the on-screen cells.
  const deleteRow = (ri) => {
    const row = rows[ri];
    if (row && row.bookCode) setBooks((bs) => bs.filter((b) => b.bookCode !== row.bookCode));
    setRows((rs) => {
      const next = rs.filter((_, i) => i !== ri);
      return next.length ? next : freshRows();
    });
  };

  // Typing a Book Name and tabbing/clicking away registers that row into the
  // Book Information register right away -- it no longer waits on a Group
  // Name being typed and Save being clicked. This also fixes the Book Sales
  // Entry Form's Book Code auto-fill: previously the on-screen Book Code
  // column here just showed the row's on-screen position (01, 02, ...),
  // which only matched the book's real, permanent, saved Book Code by
  // coincidence for the very first group -- so typing that same-looking
  // code into the Sales grid found nothing for any later group. Assigning
  // (and displaying) the real permanent code the moment the book is
  // registered keeps the two screens in sync.
  const registerBook = (ri) => {
    setRows((rs) => {
      const row = rs[ri];
      if (!row || !String(row.bookName || "").trim()) return rs;
      if (row.bookCode) {
        // Already registered -- keep the shared register in sync with any
        // further edits (rate, stock, etc.) made after the first blur,
        // instead of only ever picking those up on the next explicit Save.
        setBooks((bs) => bs.map((b) => (b.bookCode === row.bookCode ? { ...b, ...row } : b)));
        return rs;
      }
      const bookCode = nextSerial(books, "bookCode");
      const finalRow = {
        ...row,
        bookCode,
        groupCode: group.code || row.groupCode || "UG",
        groupName: group.name || row.groupName || "Ungrouped",
      };
      setBooks((bs) => (bs.some((b) => b.bookCode === bookCode) ? bs : [...bs, finalRow]));
      return rs.map((r, i) => (i === ri ? finalRow : r));
    });
  };

  // Typing a name directly always targets a new-or-reuse-by-exact-match group
  // (see handleSave) -- so editing the name box clears any loaded group's
  // code, rather than silently renaming whatever was last opened via Search.
  const editGroupName = (name) => { setGroup({ code: "", name }); setGroupIdx(-1); };

  const handleSave = () => {
    const name = group.name.trim();
    if (!name) { flash("Please enter a Group Name first"); return; }

    // Reuse an existing group of the same name instead of saving a duplicate.
    let code = group.code;
    let idx = groupIdx;
    if (!code) {
      const existing = groups.find((g) => g.name.trim().toLowerCase() === name.toLowerCase());
      if (existing) { code = existing.code; idx = groups.findIndex((g) => g.code === existing.code); }
    }

    let nextGroups = groups;
    if (!code) {
      code = nextSerial(groups);
      nextGroups = [...groups, { code, name }];
      idx = nextGroups.length - 1;
    } else if (groups[idx]?.name !== name) {
      nextGroups = groups.map((g) => (g.code === code ? { ...g, name } : g));
    }
    if (nextGroups !== groups) setGroups(nextGroups);

    // Read the row state fresh at commit time (a functional setRows update)
    // instead of the `rows` closure captured when this render happened --
    // clicking Save right after typing/tabbing out of a field queues that
    // field's own registerBook update first (see registerBook above), and
    // reading the stale closure here could otherwise miss that row's just
    // -assigned Book Code, or hand it a second, different one.
    setRows((currentRows) => {
      // Each book keeps the same on-screen row number (01, 02, ...) within
      // this Group either way -- but the *saved* Book Code (r.bookCode)
      // also needs to be a real, permanent, globally-unique value, not
      // just left blank, or the Book Sales Entry Form has nothing reliable
      // to match against once more than one Group has been saved. A row
      // that already has one (loaded from a previously-saved Group, or
      // already live-registered) keeps it; only brand new rows get a
      // freshly assigned one, counting on from the highest Book Code used
      // anywhere so far.
      let nextCode = parseInt(nextSerial(books, "bookCode"), 10);
      const validRows = currentRows.filter(hasContent).map((r) => {
        if (r.bookCode) return { ...r, groupCode: code, groupName: name };
        const bookCode = String(nextCode).padStart(2, "0");
        nextCode++;
        return { ...r, bookCode, groupCode: code, groupName: name };
      });
      // Drop anything that shares a Book Code with what's being saved now
      // -- not just anything already filed under this exact group -- so a
      // book that got live-registered (see registerBook) under the
      // "Ungrouped" placeholder before a real Group Name was typed doesn't
      // end up saved twice once it's properly grouped here.
      const validCodes = new Set(validRows.map((r) => r.bookCode));
      setBooks((bs) => [...bs.filter((b) => b.groupCode !== code && !validCodes.has(b.bookCode)), ...validRows]);

      setGroup({ code, name });
      setGroupIdx(idx);
      return validRows.length ? padRows([...validRows.map((r) => ({ ...r })), blankRow()]) : freshRows();
    });
    flash("Saved successfully");
  };

  // Oracle Forms convention: Cancel clears the form back to a blank, ready-
  // for-a-new-entry state -- Group Code, Group Name and every book row --
  // rather than reverting to whatever group happened to be open before.
  // (It does NOT touch anything already saved: the group and its books,
  // if any, are still sitting in `groups`/`books` exactly as Save left
  // them -- Cancel only clears what's currently on screen.)
  const handleCancel = () => {
    setGroup({ code: "", name: "" });
    setGroupIdx(-1);
    setRows(freshRows());
    if (gridBoxRef.current) gridBoxRef.current.scrollTop = 0;
    flash("Cleared");
  };

  // First/Previous/Next/Last page through the saved Groups in `groups`
  // (oldest -> newest, since handleSave always appends a brand-new group to
  // the end) -- Last in particular jumps straight to groups[groups.length-1]
  // and, via openGroup -> loadGroupRows, pulls in every book already saved
  // under that group, not just the group's own Code/Name.
  const goFirst = () => groups.length && openGroup(groups[0], 0);
  const goLast = () => groups.length && openGroup(groups[groups.length - 1], groups.length - 1);
  const goNext = () => groupIdx < groups.length - 1 && openGroup(groups[groupIdx + 1], groupIdx + 1);
  const goPrev = () => groupIdx > 0 && openGroup(groups[groupIdx - 1], groupIdx - 1);

  const body = (
    // handleEnterAsTab (same helper used on the order-entry forms) moves
    // focus to the next field on Enter -- this was missing here, so Enter
    // just did nothing instead of advancing through the row.
    <div onKeyDown={handleEnterAsTab}>
      <div style={{ display: "flex", gap: 14, marginBottom: 12, flex: "0 0 auto", alignItems: "end", flexWrap: "wrap" }}>
        <ModernField label="Group Code">
          <input style={autoFieldStyle} value={group.code} readOnly disabled placeholder="Auto" title="Assigned automatically on Save" />
        </ModernField>
        <ModernField label="Group Name">
          <input
            style={{ ...inputStyle, width: 220 }} value={group.name}
            onChange={(e) => editGroupName(e.target.value)}
            placeholder="e.g. Compiled Books"
          />
        </ModernField>
        <GroupSearchBox groups={groups} onSelect={(g) => openGroup(g, groups.findIndex((x) => x.code === g.code))} />
        <div style={{ fontSize: 11, color: COLORS.charcoalSoft }}>
          Group: {groupIdx >= 0 ? groupIdx + 1 : 0} / {groups.length}
        </div>
      </div>

      <div ref={gridBoxRef} style={{
        // overflowX:auto in case the fixed column widths below add up to
        // more than a narrower window can fit -- scrolls instead of
        // squeezing any column smaller than its declared width.
        overflowX: "auto", overflowY: "auto",
        // height:auto + maxHeight means the box hugs its rows when there
        // are only a few (no dead space below), and only starts scrolling
        // once the rows would otherwise exceed 68% of the viewport height.
        height: "auto", maxHeight: "68vh",
        // width:fit-content (capped at 100%) makes the box hug the table's
        // own fixed-column width instead of stretching to the full page
        // width -- without this the border ran far past the last (Status)
        // column, leaving a big empty gap on the right.
        width: "fit-content", maxWidth: "100%",
        border: `1.5px solid ${COLORS.paperLine}`, borderRadius: 10, marginBottom: 12, flex: "0 0 auto",
      }}>
        {/* table-layout:fixed + an explicit w on every column (including
            Book Name / Writer Name, matched to the Book Return Entry
            Form's Book Name column) means each renders at exactly that
            pixel size -- no more stretching to fill the full page. The
            table has no width:100% for the same reason: its own width is
            just the sum of its columns, so it doesn't get pulled wider
            than what's declared. overflowX:auto on the wrapper above is
            just a safety net in case a narrower window can't fit that sum. */}
        <table style={{ borderCollapse: "collapse", tableLayout: "fixed", fontSize: 12.5 }}>
          <thead>
            <tr style={{ background: COLORS.paperDark }}>
              {config.fields.map((f) => (
                <th key={f.key} style={{ ...thStyle, width: f.w }}>{f.label}</th>
              ))}
              <th style={{ ...thStyle, width: 34 }}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                {config.fields.map((f, fi) => (
                  <td key={f.key} style={tdStyle}>
                    {f.auto
                      // Shows the book's real saved Book Code once it's been
                      // registered (see registerBook) -- only falls back to
                      // the on-screen row position before that, as a preview
                      // of roughly where the next code will land.
                      ? <input value={row.bookCode || String(ri + 1).padStart(2, "0")} readOnly disabled style={autoFieldStyle} title="Auto-generated serial code" />
                      : (
                        <FieldInput
                          field={f} value={row[f.key]} onChange={(v) => updateCell(ri, f.key, v)}
                          inputRef={setCellRef(ri, fi)}
                          onKeyDown={(e) => handleCellEnter(e, ri, fi)}
                          onBlur={() => registerBook(ri)}
                        />
                      )}
                  </td>
                ))}
                <td style={{ ...tdStyle, textAlign: "center" }}>
                  {/* Only a row that's actually been registered (has a real
                      saved Book Code) or has any typed content is worth a
                      delete control -- an already-blank template row has
                      nothing to remove. */}
                  {(row.bookCode || hasContent(row)) && (
                    <button
                      type="button" onClick={() => deleteRow(ri)}
                      title="Delete this book"
                      style={{ background: "none", border: "none", color: "#c0392b", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}
                    >
                      <X size={13} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {msg && <div style={{ color: COLORS.inkDark, fontSize: 12.5, marginBottom: 10, fontWeight: 600, flex: "0 0 auto" }}>{msg}</div>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, flex: "0 0 auto" }}>
        <FooterBtn onClick={handleSave} primary>Save</FooterBtn>
        <FooterBtn onClick={handleCancel}>Cancel</FooterBtn>
        <FooterBtn onClick={goFirst}>First</FooterBtn>
        <FooterBtn onClick={goPrev}>Previous</FooterBtn>
        <FooterBtn onClick={goNext}>Next</FooterBtn>
        <FooterBtn onClick={goLast}>Last</FooterBtn>
        <FooterBtn onClick={onClose}>Exit</FooterBtn>
      </div>
    </div>
  );

  const popupWidth = config.title === "Book Entry Form"
    ? Math.min(gridAutoWidth({ columns: config.fields }) || 980, 980)
    : gridAutoWidth({ columns: config.fields });

  return (
    <ModalShell title={config.title} onClose={onClose} wide width={popupWidth}>
      {body}
    </ModalShell>
  );
}

/* =========================================================
   Bangladesh Division & District reference data
   ========================================================= */
const BD_DIVISIONS = [
  { code: "01", name: "Dhaka" },
  { code: "02", name: "Chattogram" },
  { code: "03", name: "Rajshahi" },
  { code: "04", name: "Khulna" },
  { code: "05", name: "Sylhet" },
  { code: "06", name: "Barisal" },
  { code: "07", name: "Rangpur" },
  { code: "08", name: "Mymensingh" },
];

const BD_DISTRICTS_BY_DIVISION = {
  Dhaka: ["Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail"],
  Chattogram: ["Bandarban", "Brahmanbaria", "Chandpur", "Chattogram", "Cumilla", "Cox's Bazar", "Feni", "Khagrachari", "Lakshmipur", "Noakhali", "Rangamati"],
  Rajshahi: ["Bogura", "Joypurhat", "Naogaon", "Natore", "Chapainawabganj", "Pabna", "Rajshahi", "Sirajganj"],
  Khulna: ["Bagerhat", "Chuadanga", "Jashore", "Jhenaidah", "Khulna", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"],
  Barisal: ["Barguna", "Barisal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur"],
  Sylhet: ["Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"],
  Rangpur: ["Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon"],
  Mymensingh: ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"],
};

function buildDistrictSeed() {
  let n = 1; const rows = [];
  Object.entries(BD_DISTRICTS_BY_DIVISION).forEach(([division, list]) => {
    list.forEach((name) => { rows.push({ code: String(n).padStart(2, "0"), name, division }); n++; });
  });
  rows.push({ code: "OOC", name: "Out Of Country", division: "—" });
  return rows;
}

const ALL_DISTRICT_NAMES = [...Object.values(BD_DISTRICTS_BY_DIVISION).flat(), "Out Of Country"];

/* Party types offered in the Party Type popup -- add more here any time a new
   kind of institution needs to be supported. */
const PARTY_TYPES = ["Private Institution", "Madrasha", "School", "Library", "Special People"];

/* Out Of Country: a permanent grouping (separate from the 64 districts) where individual
   country names can be added, for books/parties outside Bangladesh. */
function buildCountrySeed() {
  return [{ code: "C01", name: "India" }];
}

/* Division: seeded with Bangladesh's 8 fixed administrative divisions, but kept editable
   since a 9th could be formed by the government in the future -- new ones get the next
   serial code automatically. */
function DivisionForm({ divisions, setDivisions, onClose }) {
  const [newName, setNewName] = useState("");
  const nextCode = nextSerial(divisions);

  const addDivision = () => {
    if (!newName.trim()) return;
    setDivisions((ds) => [...ds, { code: nextSerial(ds), name: newName.trim() }]);
    setNewName("");
  };
  const removeDivision = (code) => {
    if (BD_DIVISIONS.some((d) => d.code === code)) return; // the original 8 stay permanent
    setDivisions((ds) => ds.filter((d) => d.code !== code));
  };

  return (
    <ModalShell title="Division Setup" onClose={onClose}>
      <div style={{ border: `1.5px solid ${COLORS.paperLine}`, borderRadius: 10, overflow: "hidden", marginBottom: 16 }}>
        {divisions.map((d, i) => (
          <div key={d.code} style={{
            display: "flex", alignItems: "center", padding: "10px 14px", fontSize: 13.5,
            borderBottom: i < divisions.length - 1 ? `1px dashed ${COLORS.paperLine}` : "none",
          }}>
            <div className="font-mono" style={{ width: 60, color: COLORS.inkDark, fontWeight: 700 }}>{d.code}</div>
            <div style={{ color: COLORS.charcoal, flex: 1 }}>{d.name}</div>
            {!BD_DIVISIONS.some((bd) => bd.code === d.code) && (
              <button onClick={() => removeDivision(d.code)} style={{ background: "none", border: "none", color: "#c0392b", cursor: "pointer" }}>
                <X size={13} />
              </button>
            )}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "end", flexWrap: "wrap" }}>
        <ModernField label={`New Division Name  ·  Code ${nextCode}`}>
          <input style={inputStyle} value={newName} onChange={(e) => setNewName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addDivision()} />
        </ModernField>
        <FooterBtn onClick={addDivision} primary>+ Add Division</FooterBtn>
      </div>
      <div style={{ marginTop: 18 }}><FooterBtn onClick={onClose}>Exit</FooterBtn></div>
    </ModalShell>
  );
}

/* District: 64 pre-loaded districts grouped by division, expandable, plus a permanent
   "Out Of Country" entry for foreign sales (e.g. India). */
function DistrictForm({ districts, setDistricts, countries, setCountries, divisions, onClose }) {
  const [newDist, setNewDist] = useState({ name: "", division: "" });
  const [newCountry, setNewCountry] = useState("");
  const [q, setQ] = useState("");

  const addDistrict = () => {
    if (!newDist.name.trim()) return;
    setDistricts((rs) => {
      const ooc = rs.find((r) => r.code === "OOC");
      const rest = rs.filter((r) => r.code !== "OOC");
      const code = String(rest.length + 1).padStart(2, "0");
      return [...rest, { code, name: newDist.name.trim(), division: newDist.division || "—" }, ...(ooc ? [ooc] : [])];
    });
    setNewDist({ name: "", division: "" });
  };
  const addCountry = () => {
    if (!newCountry.trim()) return;
    setCountries((cs) => [...cs, { code: `C${nextSerial(cs)}`, name: newCountry.trim() }]);
    setNewCountry("");
  };
  const filtered = districts.filter((r) => !q || r.name.toLowerCase().includes(q.toLowerCase()) || r.division.toLowerCase().includes(q.toLowerCase()));

  return (
    <ModalShell title="District Information" onClose={onClose} wide>
      <input
        placeholder="Search district or division..." value={q} onChange={(e) => setQ(e.target.value)}
        style={{ ...inputStyle, marginBottom: 14 }}
      />
      <div style={{ maxHeight: 320, overflowY: "auto", border: `1.5px solid ${COLORS.paperLine}`, borderRadius: 10, marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
          <thead>
            <tr style={{ background: COLORS.paperDark, position: "sticky", top: 0 }}>
              <th style={thStyle}>Code</th><th style={thStyle}>District Name</th><th style={thStyle}>Division</th>
            </tr>
          </thead>
          <tbody>
            {filtered.filter((r) => r.code !== "OOC").map((r) => (
              <tr key={r.code}>
                <td style={tdStyle} className="font-mono">{r.code}</td>
                <td style={tdStyle}>{r.name}</td>
                <td style={tdStyle}>{r.division}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "end", flexWrap: "wrap", marginBottom: 22 }}>
        <ModernField label="New District Name">
          <input
            style={inputStyle} value={newDist.name}
            onChange={(e) => setNewDist((d) => ({ ...d, name: e.target.value }))}
            onKeyDown={(e) => e.key === "Enter" && addDistrict()}
          />
        </ModernField>
        <ModernField label="Division">
          <select style={{ ...inputStyle, cursor: "pointer" }} value={newDist.division} onChange={(e) => setNewDist((d) => ({ ...d, division: e.target.value }))}>
            <option value="">Select division</option>
            {divisions.map((d) => <option key={d.code} value={d.name}>{d.name}</option>)}
          </select>
        </ModernField>
        <FooterBtn onClick={addDistrict} primary>+ Add District</FooterBtn>
      </div>

      <div style={{ paddingTop: 18, borderTop: `1.5px dashed ${COLORS.paperLine}` }}>
        <div style={{ fontWeight: 700, color: COLORS.inkDark, fontSize: 13.5, marginBottom: 6 }}>Out Of Country — Country Names</div>
        <div style={{ maxHeight: 160, overflowY: "auto", border: `1.5px solid ${COLORS.paperLine}`, borderRadius: 10, marginBottom: 14, background: `${COLORS.gold}0d` }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
            <tbody>
              {countries.map((c) => (
                <tr key={c.code}>
                  <td style={{ ...tdStyle, width: 70 }} className="font-mono">{c.code}</td>
                  <td style={tdStyle}>{c.name}</td>
                </tr>
              ))}
              {!countries.length && <tr><td style={tdStyle} colSpan={2}>No countries added yet.</td></tr>}
            </tbody>
          </table>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "end", flexWrap: "wrap" }}>
          <ModernField label={`Country Name  ·  Code C${nextSerial(countries)}`}>
            <input style={inputStyle} value={newCountry} onChange={(e) => setNewCountry(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addCountry()} placeholder="e.g. India, Nepal, UK..." />
          </ModernField>
          <FooterBtn onClick={addCountry} primary>+ Add Country</FooterBtn>
        </div>
      </div>

      <div style={{ marginTop: 22 }}><FooterBtn onClick={onClose}>Exit</FooterBtn></div>
    </ModalShell>
  );
}

/* =========================================================
   Setup menu -> form configuration registry
   ========================================================= */
const SETUP_FORMS = {
  /* Party Information gets its own hand-built form (see PartyInformationForm) --
     this entry only exists so it still lights up in the Setup menu. */
  "Party Information": {
    kind: "record", title: "Party Information Entry Form", searchable: true,
    fields: [
      { key: "code", label: "Code", auto: true }, { key: "name", label: "Name" },
      { key: "address", label: "Address", type: "textarea" },
      { key: "opBalance", label: "Op. Balance", type: "number" },
    ],
  },
  "Publication / Binder Information": {
    kind: "record", title: "Binder Entry Form", searchable: true, wide: true,
    fields: [
      { key: "code", label: "Code", auto: true }, { key: "name", label: "Name" },
      { key: "phone", label: "Phone" }, { key: "email", label: "Email", type: "email" },
      { key: "address", label: "Address", type: "textarea" },
      { key: "opBalance", label: "Op. Balance", type: "number" },
    ],
  },
  "Specimen Party": {
    kind: "record", title: "Specimen Party Information Form", searchable: true, wide: true,
    fields: [
      {
        key: "district", label: "District Name", type: "pair",
        // Same code-in / auto-name / search-icon system as every other
        // District field in the app: type the District Information code
        // and Tab/Enter out, retype if it was wrong, or click the search
        // icon to find and pick one by name.
        lookup: { sourceKey: "District Information", codeKey: "code", nameKey: "name" },
      },
      { key: "partyCode", label: "Party Code", auto: true }, { key: "partyName", label: "Party Name" },
      { key: "partyType", label: "Party Type", type: "select", options: PARTY_TYPES }, { key: "phone", label: "Phone" },
      { key: "address", label: "Address", type: "textarea" },
    ],
  },
  "Book Information": {
    kind: "grid", title: "Book Entry Form", groupLabel: "Group", initialRows: 12,
    fields: [
      { key: "bookCode", label: "Book Code", w: 65, auto: true },
      // w:200 on Book Name and Writer Name to match the Book Name column's
      // width on the Book Return Entry Form ("Book Return" grid.columns
      // below) -- a consistent, fixed size across both forms instead of
      // stretching to fill whatever's left on this page. Book Code, Book
      // Size, Rate, Return Rate, Com. and Open. Balance are all matched to
      // Costing Price's 65px box, and Status is widened to 140 so its
      // "Select Status" / "Active" / "Inactive" options aren't clipped.
      { key: "bookName", label: "Book Name", w: 200 },
      { key: "bookSize", label: "Book Size", w: 65 }, { key: "forma", label: "Forma", w: 44 },
      { key: "writer", label: "Writer Name", w: 200 },
      { key: "costPrice", label: "Costing Price", w: 65, type: "number" },
      { key: "rate", label: "Rate", w: 65, type: "number" },
      { key: "returnRate", label: "Return Rate", w: 65, type: "number" },
      { key: "com", label: "Com.", w: 65, type: "number" },
      { key: "openBalance", label: "Open. Balance", w: 65, type: "number" },
      { key: "status", label: "Status", w: 140, type: "select", options: ["Active", "Inactive"] },
    ],
  },
  "Supplier Information": {
    kind: "record", title: "Supplier Information Entry Form", searchable: true, wide: true,
    fields: [
      { key: "code", label: "Code", auto: true }, { key: "name", label: "Name" },
      { key: "phone", label: "Phone" }, { key: "email", label: "Email", type: "email" },
      { key: "address", label: "Address", type: "textarea" },
      { key: "opBalance", label: "Op. Balance", type: "number" },
    ],
  },
  "Paper Type Information": {
    kind: "grid", title: "Paper Type Entry", initialRows: 1,
    fields: [{ key: "papCode", label: "Pap Code", w: 110, auto: true }, { key: "paperTypeName", label: "Paper Type Name", w: 280 }],
  },
  "Press Information": {
    kind: "record", title: "Press Information Entry Form", searchable: true, wide: true,
    fields: [
      { key: "code", label: "Code", auto: true }, { key: "name", label: "Name" },
      { key: "phone", label: "Phone" }, { key: "email", label: "Email", type: "email" },
      { key: "address", label: "Address", type: "textarea" },
      { key: "opBalance", label: "Op. Balance", type: "number" },
    ],
  },
  "Plate / Lamination / Pasting Information": {
    kind: "record", title: "Plate / Pasting / Lamination Entry Form", searchable: true, wide: true,
    fields: [
      { key: "code", label: "Code", auto: true }, { key: "name", label: "Name" },
      { key: "phone", label: "Phone" }, { key: "address", label: "Address", type: "textarea" },
      { key: "opBalance", label: "Op. Balance", type: "number" },
    ],
  },
  "Employee Information": {
    kind: "record", title: "Employee Entry", searchable: true, wide: true,
    fields: [
      { key: "code", label: "Code", auto: true }, { key: "name", label: "Name" }, { key: "nid", label: "National Id" },
      { key: "phone", label: "Phone" }, { key: "designation", label: "Designation" },
      { key: "address", label: "Address", type: "textarea" },
      { key: "salary", label: "Basic Salary", type: "number" }, { key: "opBalance", label: "Op. Balance", type: "number" },
    ],
  },
  "Writer Information": {
    kind: "record", title: "Writer Information", searchable: true, wide: true,
    fields: [
      { key: "code", label: "Code", auto: true }, { key: "name", label: "Name" },
      { key: "division", label: "Division", disabled: true },
      {
        key: "district", label: "District", type: "pair",
        lookup: {
          sourceKey: "District Information", codeKey: "code", nameKey: "name",
          cascade: [{ targetKey: "division", field: "division" }],
        },
      },
      { key: "contributorType", label: "Contributor Type", type: "select", options: ["Writer", "Translator", "Editor", "Proofreader"] }, { key: "phone", label: "Phone" },
      { key: "email", label: "Email", type: "email" },
      { key: "address", label: "Address", type: "textarea" },
      { key: "opBalance", label: "Op. Balance", type: "number" },
    ],
  },
  "Other Expense Group Name": {
    kind: "record", title: "Others Group Entry", searchable: true, wide: true,
    fields: [{ key: "code", label: "Code", auto: true }, { key: "name", label: "Name" }],
  },
  "Other Expense Head Information": {
    kind: "record", title: "Others Entry Form", searchable: true, wide: true,
    fields: [
      { key: "code", label: "Code", auto: true }, { key: "name", label: "Name" }, { key: "remarks", label: "Remarks" },
      { key: "group", label: "Group Name", type: "dynamicSelect", sourceKey: "Other Expense Group Name" },
    ],
  },
  "Shop Name Entry": {
    kind: "record", title: "Shop Name Entry Form", searchable: true, wide: true,
    fields: [
      { key: "code", label: "Code", auto: true }, { key: "name", label: "Shop Name" },
      { key: "mobile", label: "Mobile Number" },
      { key: "address", label: "Address", type: "textarea" },
      { key: "opBalance", label: "Op. Balance", type: "number" },
    ],
  },
  "Personal Loan Party Information": {
    kind: "record", title: "Loan Party", searchable: true, wide: true,
    fields: [
      { key: "code", label: "Code", auto: true }, { key: "name", label: "Name" }, { key: "phone", label: "Phone" },
      { key: "address", label: "Address", type: "textarea" }, { key: "remarks", label: "Remarks" },
      { key: "opBalance", label: "Op. Balance", type: "number" },
    ],
  },
  "Bank Account Information": {
    kind: "record", title: "Bank Account Entry", searchable: true, wide: true,
    fields: [
      { key: "code", label: "Code", auto: true }, { key: "bankName", label: "Bank Name" },
      { key: "branchName", label: "Branch Name" }, { key: "accHolder", label: "Account Holder Name" },
      { key: "accNo", label: "Account No." }, { key: "routingNo", label: "Routing No." },
      { key: "accType", label: "Account Type", type: "select", options: ["Savings", "Current"] },
      { key: "opBalance", label: "Op. Balance", type: "number" },
    ],
  },
  "Other Person Telephones": {
    kind: "record", title: "Others Person Telephone", searchable: true, wide: true,
    fields: [
      { key: "code", label: "Code", auto: true }, { key: "name", label: "Name" }, { key: "profession", label: "Profession" },
      { key: "phone", label: "Phone" },
      { key: "address", label: "Address", type: "textarea" },
    ],
  },
  "Transport Entry": {
    kind: "grid", title: "Transport Name Entry", initialRows: 1,
    fields: [{ key: "transportName", label: "Transport Name", w: 280 }, { key: "transportCode", label: "Trns Cd", w: 100, auto: true }],
  },
};

/* =========================================================
   Party Information Entry Form (hand-built to mirror the old Oracle form,
   with Division/District looked up automatically from their code)
   ========================================================= */
function PartyInformationForm({ records, setRecords, divisions, districts, countries, onClose }) {
  const blankForm = () => ({
    divisionCode: "", divisionName: "", districtCode: "", districtName: "",
    partyCode: nextSerial(records, "partyCode"), partyName: "", partyType: "Library",
    address: "", phone: "", email: "", web: "", opBalance: "",
    date: formatShortDate(new Date()),
  });
  const [idx, setIdx] = useState(-1);
  const [form, setForm] = useState(blankForm);
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");
  const [divWarn, setDivWarn] = useState("");
  const [distWarn, setDistWarn] = useState("");
  // Search-and-select popups (point 3 of the district/division input system:
  // type the code if you remember it, retype if it was wrong, or search by
  // name and pick if you don't) -- one LOV each for Division and District.
  const [divLovOpen, setDivLovOpen] = useState(false);
  const [distLovOpen, setDistLovOpen] = useState(false);

  useEffect(() => { setForm(idx >= 0 ? records[idx] : blankForm()); setDivWarn(""); setDistWarn(""); }, [idx]); // eslint-disable-line

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const lookupDivision = () => {
    const code = (form.divisionCode || "").trim();
    if (!code) { setDivWarn(""); return; }
    const found = divisions.find((d) => d.code === code || d.code === code.padStart(2, "0"));
    if (found) { setField("divisionName", found.name); setDivWarn(""); }
    else { setField("divisionName", ""); setDivWarn("No division with that code"); }
  };
  // Returns true/false so Enter (below) knows whether the lookup actually
  // resolved a district -- on a hit, focus should move on to the next field
  // like every other field in this form; on a miss, the cursor needs to stay
  // put (and the Find District popup opens) so the warning is visible.
  const lookupDistrict = () => {
    const code = (form.districtCode || "").trim();
    if (!code) { setDistWarn(""); return false; }
    if (/^c/i.test(code)) {
      const found = countries.find((c) => c.code.toLowerCase() === code.toLowerCase());
      if (found) { setForm((f) => ({ ...f, districtName: `Out Of Country — ${found.name}`, divisionCode: "", divisionName: "" })); setDistWarn(""); return true; }
    }
    const found = districts.find((d) => d.code === code || d.code === code.padStart(2, "0"));
    if (found) {
      setForm((f) => ({ ...f, districtName: found.name, divisionCode: found.division === "—" ? "" : (divisions.find((d) => d.name === found.division)?.code || ""), divisionName: found.division === "—" ? "" : found.division }));
      setDistWarn("");
      return true;
    }
    setField("districtName", "");
    setDistWarn("No district/country with that code (use C01, C02… for Out Of Country)");
    return false;
  };

  // Enter here now matches every other lookup field in the app: a code that
  // resolves lets the keydown bubble up to handleEnterAsTab so focus advances
  // to the next field, same as Tab. A code that doesn't resolve (or an empty
  // field) instead pops the Find District search, same as the F9/search-icon
  // flow, instead of silently doing nothing.
  const triggerDistrictLookup = (e) => {
    const ok = lookupDistrict();
    if (!ok) {
      if (e && typeof e.preventDefault === "function") e.preventDefault();
      if (e && typeof e.stopPropagation === "function") e.stopPropagation();
      setDistLovOpen(true);
    }
  };
  // Items for the two search popups -- District's list also folds in every
  // saved "Out Of Country" entry (C01, C02, ...) alongside the 64 districts,
  // same as typing a C-code by hand above.
  const divisionLovItems = divisions.map((d) => ({ code: d.code, name: d.name }));
  const districtLovItems = [
    ...districts.map((d) => ({ code: d.code, name: d.name })),
    ...countries.map((c) => ({ code: c.code, name: `Out Of Country — ${c.name}` })),
  ];
  const pickDivision = (it) => { setForm((f) => ({ ...f, divisionCode: it.code, divisionName: it.name })); setDivWarn(""); };
  const pickDistrict = (it) => {
    const found = districts.find((d) => d.code === it.code);
    setForm((f) => ({ ...f, districtCode: it.code, districtName: it.name, divisionCode: found?.division === "—" ? "" : (divisions.find((d) => d.name === found?.division)?.code || ""), divisionName: found?.division === "—" ? "" : (found?.division || "") }));
    setDistWarn("");
  };

  const handleSave = () => {
    if (!form.partyName?.trim()) { setMsg("Party Name is required"); setTimeout(() => setMsg(""), 1600); return; }
    if (idx >= 0) {
      const next = records.slice(); next[idx] = form; setRecords(next);
      setMsg("Saved successfully");
    } else {
      const next = [...records, form]; setRecords(next);
      /* Ready the form for the next entry right away, instead of parking on the
         just-saved record -- matches the old ledger system's "save & continue" flow. */
      setForm(blankForm()); setIdx(-1); setDivWarn(""); setDistWarn("");
      setMsg("Saved — ready for next entry");
    }
    setTimeout(() => setMsg(""), 1600);
  };
  const handleClear = () => { setForm(blankForm()); setIdx(-1); setDivWarn(""); setDistWarn(""); };
  const handleDelete = () => {
    if (idx < 0) return;
    const next = records.filter((_, i) => i !== idx);
    setRecords(next);
    setIdx(next.length ? Math.min(idx, next.length - 1) : -1);
  };
  const goFirst = () => records.length && setIdx(0);
  const goLast = () => records.length && setIdx(records.length - 1);
  const goNext = () => records.length && setIdx(idx < 0 || idx >= records.length - 1 ? 0 : idx + 1);
  const goPrev = () => records.length && setIdx(idx <= 0 ? records.length - 1 : idx - 1);
  const [showLov, setShowLov] = useState(false);
  // Pressing Enter in the Search box (with it empty or not) opens the
  // searchable list of every saved party -- same as putting the cursor in
  // the old Oracle Forms search field and pressing Enter -- instead of
  // silently jumping to the first record that happens to match.
  const doSearch = () => setShowLov(true);
  const codeFieldStyle = { ...inputStyle, width: 90, flex: "0 0 90px" };
  const warnStyle = { fontSize: 11, color: "#c0392b", marginTop: 4 };

  return (
    <ModalShell title="Party Information Entry Form" onClose={onClose} wide>
      {/* handleEnterAsTab (same helper used on the order-entry forms) was
          missing here, so Enter just did nothing instead of advancing
          through Division Code / District Code / Party Type / Phone /
          Email / Web / Op. Balance. Party Name and Address stay exempt
          (they're textareas -- Enter still inserts a newline there),
          matching every other form in this app. */}
      <div onKeyDown={handleEnterAsTab}>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <input
          value={search} onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && doSearch()}
          placeholder="Search..." style={inputStyle}
        />
        <FooterBtn onClick={doSearch}>Search</FooterBtn>
      </div>
      {showLov && (
        <LovPopup
          title="Find Party"
          items={records.map((r, i) => ({ code: r.partyCode || "", name: r.partyName || "", _idx: i }))}
          initialQuery={search}
          onPick={(it) => setIdx(it._idx)}
          onClose={() => setShowLov(false)}
        />
      )}

      <div className="responsive-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 2 }}>
        <ModernField label="Division (auto-detected from District)">
          <input style={autoFieldStyle} value={form.divisionName || (String(form.districtName || "").startsWith("Out Of Country") ? "Out Of Country" : "")} readOnly disabled title="Automatically filled from District" />
        </ModernField>
        <ModernField label="District Code  (or C01, C02… for Out Of Country — or search)">
          <div style={{ display: "flex", gap: 10, alignItems: "start" }}>
            <input
              style={codeFieldStyle} value={form.districtCode || ""}
              onChange={(e) => { setField("districtCode", e.target.value); if (distWarn) setDistWarn(""); }}
              onBlur={lookupDistrict}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  triggerDistrictLookup(e);
                }
              }}
              placeholder="e.g. 01"
            />
            <div style={{ flex: 1 }}>
              <input style={{ ...inputStyle, background: COLORS.paperDark, color: COLORS.charcoalSoft, fontWeight: 600 }} value={form.districtName || ""} readOnly disabled placeholder="Auto from code" />
              {distWarn && <div style={warnStyle}>{distWarn}</div>}
            </div>
            <button
              type="button" onClick={() => setDistLovOpen(true)} title="Search District"
              style={{
                flex: "0 0 auto", width: 30, height: 30, borderRadius: 6, border: `1.5px solid ${COLORS.paperLine}`,
                background: COLORS.paperDark, color: COLORS.charcoal, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            ><Search size={13} /></button>
          </div>
        </ModernField>
        {divLovOpen && (
          <LovPopup
            title="Find Division" items={divisionLovItems} initialQuery={form.divisionCode || form.divisionName}
            onPick={pickDivision} onClose={() => setDivLovOpen(false)}
          />
        )}
        {distLovOpen && (
          <LovPopup
            title="Find District" items={districtLovItems} initialQuery={form.districtCode || form.districtName}
            onPick={pickDistrict} onClose={() => setDistLovOpen(false)}
          />
        )}

        <ModernField label="Party Code">
          <input style={autoFieldStyle} value={form.partyCode || ""} readOnly disabled title="Auto-generated serial code" />
        </ModernField>
        <ModernField label="Party Name">
          <AutoGrowTextarea style={inputStyle} value={form.partyName || ""} onChange={(v) => setField("partyName", v)} minRows={1} />
        </ModernField>

        <ModernField label="Party Type">
          <select style={{ ...inputStyle, cursor: "pointer" }} value={form.partyType || ""} onChange={(e) => setField("partyType", e.target.value)}>
            <option value="">Select Party Type</option>
            {PARTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </ModernField>
        <ModernField label="Date">
          <input style={autoFieldStyle} value={form.date || ""} readOnly disabled title="Auto-generated on entry" />
        </ModernField>

        <div style={{ gridColumn: "1 / -1" }}>
          <ModernField label="Address">
            <AutoGrowTextarea style={inputStyle} value={form.address || ""} onChange={(v) => setField("address", v)} minRows={2} />
          </ModernField>
        </div>

        <ModernField label="Phone">
          <input style={inputStyle} value={form.phone || ""} onChange={(e) => setField("phone", e.target.value)} />
        </ModernField>
        <ModernField label="Email">
          <input type="email" style={inputStyle} value={form.email || ""} onChange={(e) => setField("email", e.target.value)} />
        </ModernField>
        <ModernField label="Web">
          <input style={inputStyle} value={form.web || ""} onChange={(e) => setField("web", e.target.value)} />
        </ModernField>
        <ModernField label="Op. Balance">
          <input type="number" style={inputStyle} value={form.opBalance || ""} onChange={(e) => setField("opBalance", e.target.value)} />
        </ModernField>
      </div>

      {/* Saved parties now live only in the Party Information Register
          (Setup > Reports) -- no need to duplicate that list here. To fix
          a mistyped entry, use the Search box above (or First/Previous/
          Next/Last) to bring it back into the form, then Save again. */}

      {msg && <div style={{ color: COLORS.inkDark, fontSize: 12, margin: "8px 0", fontWeight: 600 }}>{msg}</div>}
      <div style={{ fontSize: 11, color: COLORS.charcoalSoft, margin: "8px 0" }}>
        Record: {idx >= 0 ? idx + 1 : 0} / {records.length}
      </div>
      <div className="modal-action-row" style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        <FooterBtn onClick={handleSave} primary>Save</FooterBtn>
        <FooterBtn onClick={handleDelete} danger>Delete</FooterBtn>
        <FooterBtn onClick={handleClear}>Clear</FooterBtn>
        <FooterBtn onClick={goFirst}>First</FooterBtn>
        <FooterBtn onClick={goPrev}>Previous</FooterBtn>
        <FooterBtn onClick={goNext}>Next</FooterBtn>
        <FooterBtn onClick={goLast}>Last</FooterBtn>
        <FooterBtn onClick={onClose}>Exit</FooterBtn>
      </div>
      </div>
    </ModalShell>
  );
}

/* =========================================================
   Order module -- Paper / Binder / Cover entry forms
   (rebuilt from the legacy Oracle Forms screens: Cover Supply,
   Cover Receive, Binder Order Cancel, Book Received, Binder
   Order, Paper Transfer, Paper Print Order, Paper Order)
   ========================================================= */
const PAPER_TYPE_OPTIONS = ["80 GSM Offset", "100 GSM Offset", "Art Paper", "Newsprint", "Card Paper"];
const PRINTING_TYPE_OPTIONS = ["Offset", "Digital"];
const FORMA_TYPE_OPTIONS = ["Full Forma", "Half Forma"];
const COLOR_TYPE_OPTIONS = ["Black & White", "2 Color", "4 Color"];
const ORDER_TYPE_OPTIONS = ["Regular", "Reprint"];
const SALES_TYPE_OPTIONS = ["Library", "Normal", "Condition", "Wholesale"];
const PAY_MODE_OPTIONS = ["Cash", "Cheque", "Bank Transfer", "Card"];
const CHALLAN_OPTIONS = ["No", "Yes"];
const BONUS_CATEGORY_OPTIONS = ["A", "B", "C", "D", "E", "F"];
const SUPPLIER_TYPE_OPTIONS = ["Press", "Binder", "Paper", "Others"];
const BILL_ENTRY_TYPE_OPTIONS = ["Press", "Binder", "Plate", "Lamination", "Paste", "Wire"];
const MONTH_OPTIONS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const BILL_PAYMENT_TYPE_OPTIONS = ["Press", "Binding", "Writer", "Plate/Liminating/Pesting"];
const LOAN_TYPE_OPTIONS = ["Loan Takan", "Payment"];

function blankFieldValue(f) {
  if (f.type === "pair") return { code: "", name: "" };
  if (f.type === "triple") return { code: "", name: "", stock: "" };
  if (f.type === "date") return formatShortDate(new Date());
  // f.default lets a field (e.g. Sales Type) start pre-selected instead of
  // blank/"Select..." -- used by Sales Memo Bookwise so Sales Type opens
  // on "Library" already chosen.
  if (f.default !== undefined) return f.default;
  return "";
}

/* Looks up a saved record by code for a "pair" field's `lookup` config --
   e.g. { sourceKey: "Party Information", codeKey: "partyCode", nameKey: "partyName" }.
   Matches the code loosely (trimmed, case-insensitive, tolerant of a missing
   leading zero) the same way the existing Division/District code lookups do. */
function lookupRecordName(store, lookup, code) {
  if (!lookup || !code) return null;
  const list = (store && store[lookup.sourceKey]) || [];
  const c = code.toString().trim().toLowerCase();
  const found = list.find((r) => {
    const rc = (r[lookup.codeKey] || "").toString().trim().toLowerCase();
    // A record whose name was left/cleared blank (e.g. a leftover test row)
    // should never match as if it were a real saved record.
    return (rc === c || rc === c.padStart(2, "0")) && String(r[lookup.nameKey] || "").trim() !== "";
  });
  return found ? (found[lookup.nameKey] || "") : null;
}

/* Same idea as lookupRecordName, but for a Setup *grid* form (like Book
   Information) whose row "code" is never actually stored -- it's only ever
   shown as the row's 1-based serial (see GridSetupForm's `f.auto` column) --
   so the match here is against row position instead of a stored code field. */
function lookupBySerial(store, sourceKey, nameKey, code) {
  if (!code) return null;
  const list = (store && store[sourceKey]) || [];
  const c = code.toString().trim().padStart(2, "0");
  const idx = list.findIndex((_, i) => String(i + 1).padStart(2, "0") === c);
  if (idx === -1) return null;
  const name = list[idx][nameKey] || "";
  return name.trim() !== "" ? name : null;
}

/* Same match as lookupRecordName, but hands back the whole saved record
   instead of just one field -- used when a single code lookup (e.g. Party
   Code) needs to auto-fill several other fields at once (District, Address,
   Previous Dues, ...) via a field's `lookup.cascade` config. */
function lookupFullRecord(store, lookup, code) {
  if (!lookup || !code) return null;
  const list = (store && store[lookup.sourceKey]) || [];
  const c = code.toString().trim().toLowerCase();
  const found = list.find((r) => {
    const rc = (r[lookup.codeKey] || "").toString().trim().toLowerCase();
    if (rc !== c && rc !== c.padStart(2, "0")) return false;
    // Some callers (e.g. runGridLookup's Book Code match) don't pass a
    // nameKey -- only enforce the blank-name guard when one was given.
    if (lookup.nameKey && String(r[lookup.nameKey] || "").trim() === "") return false;
    return true;
  });
  return found || null;
}

/* Same idea as lookupBySerial, but hands back the whole saved row instead of
   one field -- used when a grid `gridLookup.fields` config needs to auto-fill
   several columns (Stock, Net Rate, Com, Sale Rate, ...) from one code entry. */
function lookupRowBySerial(store, sourceKey, code) {
  if (!code) return null;
  const list = (store && store[sourceKey]) || [];
  const c = code.toString().trim().padStart(2, "0");
  const idx = list.findIndex((_, i) => String(i + 1).padStart(2, "0") === c);
  return idx === -1 ? null : list[idx];
}

/* Renders one header field -- plain text/number/date/select/textarea, a
   "code + name" lookup pair (e.g. Binder Name), or a "code + name + stock"
   triple (e.g. From Press / To Press on the Paper Transfer form). */
function OrderHeaderField({ field, value, onChange, store, onCascade, onLookupComplete }) {
  // Declared unconditionally (not inside the branches below) so this hook
  // runs in the same order on every render no matter which field type this
  // particular instance is rendering -- fields that never use it (anything
  // that isn't a lookup "pair") simply never turn it on.
  const [lovOpen, setLovOpen] = useState(false);
  // Feedback for a "pair" lookup field (District / Party Code on Bookwise)
  // whose typed code didn't match anything -- previously this failed
  // completely silently (nothing filled in, no message), which looked
  // exactly like "entering a code does nothing". Cleared again as soon as
  // the code is edited or a match succeeds.
  const [codeWarn, setCodeWarn] = useState("");
  // The Code input of a "pair" lookup field, so a popup opened from it (F9,
  // or Enter on a miss) can hand focus on to the next field once something
  // is picked -- see pickFromLov below. Declared unconditionally alongside
  // lovOpen/codeWarn above for the same reason: this hook must run in the
  // same order on every render regardless of which branch below ends up
  // used for this particular field.
  const codeInputRef = useRef(null);

  if (field.disabled) {
    const display = value && typeof value === "object" ? (value.name || value.code || "") : (value || "");
    // A disabled *textarea* field (e.g. Bookwise's Address, auto-filled from
    // Party Code and locked from editing) still needs to show multiple
    // wrapped lines -- squashing it into a single-line <input> like every
    // other disabled field would clip a long address. Routed through the
    // same AutoGrowTextarea used by editable textareas (rather than a
    // hardcoded rows={2} box) so matchInputHeight is actually honoured --
    // it starts at the same single-line height as Party Code / Sales Type
    // (so the row's stretch+flex-end alignment lines their boxes up
    // correctly, see the header-row layout below) and only grows taller
    // once the address itself needs more room.
    if (field.type === "textarea") {
      return (
        <AutoGrowTextarea
          value={display}
          onChange={() => {}}
          readOnly
          disabled
          minRows={field.rows || 1}
          matchInputHeight={field.matchInputHeight}
          style={{ ...tintStyle(autoFieldStyle, field.tint), fontFamily: "inherit" }}
          title={field.label}
        />
      );
    }
    return <input readOnly disabled value={display} style={tintStyle(autoFieldStyle, field.tint)} title={field.label} />;
  }
  if (field.type === "pair") {
    const v = value || { code: "", name: "" };
    /* Returns true/false so the Enter handler below knows whether the typed
       code actually matched something -- on a miss (or an empty code) it
       falls back to the searchable popup instead of just doing nothing. */
    const doLookup = () => {
      if (!field.lookup) return false;
      if (!v.code || !v.code.trim()) { setCodeWarn(""); return false; }
      /* Cascading fields (e.g. Party Code -> District / Address / Previous
         Dues) need the whole matched record, not just its name column. */
      if (field.lookup.cascade) {
        const rec = lookupFullRecord(store, field.lookup, v.code);
        if (rec) {
          onChange({ ...v, name: rec[field.lookup.nameKey] || "" });
          if (onCascade) onCascade(rec);
          setCodeWarn("");
          return true;
        }
        setCodeWarn(`No ${field.lookup.sourceKey} found for code "${v.code}"`);
        return false;
      }
      const found = lookupRecordName(store, field.lookup, v.code);
      if (found !== null) { onChange({ ...v, name: found }); setCodeWarn(""); return true; }
      setCodeWarn(`No ${field.lookup.sourceKey} found for code "${v.code}"`);
      return false;
    };
    /* Old Oracle Forms muscle memory, now on every "pair" lookup field
       (District Code, Party Code, Transport Name Code, ...): F9 always pops
       the List of Values open, exactly like clicking the search icon --
       whatever is (or isn't) already typed in Code is ignored. Enter is
       smarter: it tries the typed code first (same as before) and only
       falls back to the popup on a miss, so a correct code + Enter still
       fills the Name in place without ever opening anything. This only
       ever runs on Enter/F9 -- every other keystroke must reach the input
       normally, or typing itself would be blocked. */
    const handleCodeKeyDown = (e) => {
      if (e.key !== "Enter" && e.key !== "F9") return;
      if (!field.lookup) return;
      if (e.key === "F9") {
        e.stopPropagation();
        e.preventDefault();
        setLovOpen(true);
        return;
      }
      if (doLookup()) {
        // Matched by code -- for fields like Party Code this should land
        // the cursor straight in the grid instead of tabbing through
        // District / Address / Sales Type / Publication.
        if (field.lookup.jumpToGrid && onLookupComplete) { e.stopPropagation(); e.preventDefault(); onLookupComplete(); }
        return;
      }
      // No code typed, or it didn't match anything -- open the searchable
      // list (same "put the cursor here and press Enter" flow as the old
      // Oracle Forms List of Values window) instead of leaving the field
      // stuck on a bad code.
      e.stopPropagation();
      e.preventDefault();
      setLovOpen(true);
    };
    const lovItems = field.lookup
      ? ((store && store[field.lookup.sourceKey]) || [])
          // Drop incomplete/blank rows (e.g. a grid master's perpetual empty
          // last row, or a book row whose Name got cleared but the record
          // itself was never actually deleted) -- these should never be
          // pickable as if they were a real saved record.
          .filter((r) => String(r[field.lookup.nameKey] || "").trim() !== "")
          .map((r) => ({
            code: r[field.lookup.codeKey] || "", name: r[field.lookup.nameKey] || "", _rec: r,
          }))
      : [];
    const pickFromLov = (it) => {
      onChange({ ...v, code: it.code, name: it.name });
      if (field.lookup && field.lookup.cascade && it._rec && onCascade) onCascade(it._rec);
      if (field.lookup && field.lookup.jumpToGrid && onLookupComplete) { onLookupComplete(); return; }
      // Land the cursor on the next field automatically -- same as picking
      // a match by typing the code and pressing Enter -- instead of leaving
      // it sitting in Code after the popup closes.
      const el = codeInputRef.current;
      setTimeout(() => focusNextFocusable(el), 0);
    };
    return (
      <>
        <div style={{ display: "flex", gap: 6 }}>
          <input
            ref={codeInputRef}
            style={{ ...tintStyle(inputStyle, field.tint), width: 64, flex: "0 0 auto" }} placeholder="Code" value={v.code}
            onChange={(e) => { onChange({ ...v, code: e.target.value }); if (codeWarn) setCodeWarn(""); }}
            onBlur={field.lookup ? doLookup : undefined}
            onKeyDown={field.lookup ? handleCodeKeyDown : undefined}
            title={field.lookup ? `Enter the ${field.lookup.sourceKey} code, or press Enter/F9 to search by name` : undefined}
          />
          <input
            style={{ ...inputStyle, flex: 1 }} placeholder="Name" value={v.name}
            readOnly={!!field.lookup}
            title={field.lookup ? "Auto-filled from the Code -- not manually editable" : undefined}
            onChange={(e) => { if (!field.lookup) onChange({ ...v, name: e.target.value }); }}
          />
          {field.lookup && (
            <button
              type="button" onClick={() => setLovOpen(true)} title={`Search ${field.lookup.sourceKey} (F9)`}
              style={{
                flex: "0 0 auto", width: 30, borderRadius: 6, border: `1.5px solid ${COLORS.paperLine}`,
                background: COLORS.paperDark, color: COLORS.charcoal, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            ><Search size={13} /></button>
          )}
        </div>
        {codeWarn && <div style={{ fontSize: 10.5, color: "#c0392b", marginTop: 3 }}>{codeWarn}</div>}
        {lovOpen && field.lookup && (
          <LovPopup
            title={`Find ${field.lookup.sourceKey}`}
            items={lovItems}
            initialQuery={v.code || v.name}
            onPick={pickFromLov}
            onClose={() => setLovOpen(false)}
          />
        )}
      </>
    );
  }
  if (field.type === "triple") {
    const v = value || { code: "", name: "", stock: "" };
    return (
      <div style={{ display: "flex", gap: 6 }}>
        <input style={{ ...inputStyle, width: 56, flex: "0 0 auto" }} placeholder="Code" value={v.code} onChange={(e) => onChange({ ...v, code: e.target.value })} />
        <input style={{ ...inputStyle, flex: 1 }} placeholder="Name" value={v.name} onChange={(e) => onChange({ ...v, name: e.target.value })} />
        <input readOnly disabled style={{ ...autoFieldStyle, width: 64, flex: "0 0 auto" }} value={v.stock || "0"} title="Stock balance" />
      </div>
    );
  }
  if (field.type === "select") {
    return (
      <select value={value || ""} onChange={(e) => onChange(e.target.value)} style={{ ...tintStyle(inputStyle, field.tint), cursor: "pointer" }}>
        <option value="">Select {field.label}</option>
        {(field.options || []).map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    );
  }
  if (field.type === "groupSelect") {
    /* Book Group picker for the Book Information report -- lists every
       saved Book Group (see BookEntryForm) plus an "All Groups" option so
       the report can be run for one group or every group at once. */
    const groups = (store && store["Book Groups"]) || [];
    return (
      <select value={value || ""} onChange={(e) => onChange(e.target.value)} style={{ ...tintStyle(inputStyle, field.tint), cursor: "pointer" }}>
        <option value="">All Groups</option>
        {groups.map((g) => <option key={g.code} value={g.code}>{g.name}</option>)}
      </select>
    );
  }
  if (field.type === "districtSelect") {
    /* District picker for the Party Information Register -- lists every
       saved District (see District Information) plus an "All Districts"
       option so the report can be run for one district or everyone. */
    const districts = (store && store["District Information"]) || [];
    return (
      <select value={value || ""} onChange={(e) => onChange(e.target.value)} style={{ ...tintStyle(inputStyle, field.tint), cursor: "pointer" }}>
        <option value="">All Districts</option>
        {districts.map((d) => <option key={d.code} value={d.code}>{d.name}</option>)}
      </select>
    );
  }
  if (field.type === "textarea") {
    return (
      <AutoGrowTextarea
        value={value}
        onChange={onChange}
        style={tintStyle(inputStyle, field.tint)}
        minRows={field.rows || 1}
        matchInputHeight={field.matchInputHeight}
      />
    );
  }
  return (
    <input
      type={field.type === "number" ? "number" : "text"}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      style={tintStyle(inputStyle, field.tint)}
    />
  );
}

/* Config for each of the 8 "Order" menu items -- header fields + an
   optional editable line-item grid + which footer buttons to show
   (kept close to the button labels seen on the legacy forms). */
const ORDER_FORMS = {
  "Cover Supply": {
    title: "Cover Supply Entry Form",
    headerFields: [
      { key: "date", label: "Date", type: "date" },
      { key: "receive", label: "Rceive", type: "number" },
      { key: "suppNo", label: "Supp. No", type: "text" },
      { key: "supply", label: "Supply", type: "number" },
      {
        key: "binder", label: "Binder Name", type: "pair",
        lookup: { sourceKey: "Publication / Binder Information", codeKey: "code", nameKey: "name" },
      },
      { key: "balance", label: "Balance", type: "number" },
    ],
    grid: {
      initialRows: 6,
      columns: [
        { key: "groupCode", label: "Group Code", w: 90 },
        { key: "groupName", label: "Group Name", w: 160 },
        { key: "bookCode", label: "Book Code", w: 90 },
        { key: "bookName", label: "Book Name", w: 200 },
        { key: "quantity", label: "Quantity", type: "number", w: 90 },
      ],
    },
    buttons: ["Save", "Cancel", "Exit", "First", "Next", "Previous", "Delete", "Last", "Slip"],
  },

  "Cover Receive": {
    title: "Cover Received Entry Form",
    modalWidth: 900,
    headerFields: [
      { key: "date", label: "Date", type: "date" },
      { key: "balance", label: "Balance", type: "number" },
      { key: "recvNo", label: "Recv No", type: "text" },
    ],
    grid: {
      initialRows: 6,
      columns: [
        { key: "groupCode", label: "Group Code", w: 90 },
        { key: "group", label: "Group", w: 140 },
        { key: "code", label: "Code", w: 80 },
        { key: "bookName", label: "Book Name", w: 180 },
        { key: "quantity", label: "Quantity", type: "number", w: 80 },
        { key: "rate", label: "Rate", type: "number", w: 80 },
        { key: "total", label: "Total", w: 90 },
      ],
      autoTotal: { qtyKey: "quantity", rateKey: "rate", totalKey: "total" },
    },
    buttons: ["Save", "Cancel", "Exit", "First", "Next", "Previous", "Delete", "Last", "SLIP"],
  },

  "Binder Order Cancel": {
    title: "Binder Order Cancel",
    headerFields: [
      { key: "date", label: "Date", type: "date" },
      {
        key: "binder", label: "Binder", type: "pair",
        lookup: { sourceKey: "Publication / Binder Information", codeKey: "code", nameKey: "name" },
      },
      { key: "orderNo", label: "Order no.", type: "text" },
      {
        key: "group", label: "Groupe", type: "pair",
        lookup: { sourceKey: "Book Groups", codeKey: "code", nameKey: "name" },
      },
      {
        key: "book", label: "Book Name", type: "pair",
        lookup: { sourceKey: "Book Information", codeKey: "bookCode", nameKey: "bookName" },
      },
      { key: "qty", label: "Qntity", type: "number" },
    ],
    buttons: ["Save", "Cancel", "Exit", "First", "Next", "Previous", "Last"],
  },

  "Book Receive / Binder Receive Entry": {
    title: "Purchase / Binder Book Received Entry Form",
    modalWidth: 920,
    headerFields: [
      { key: "date", label: "Date", type: "date" },
      { key: "receiveNo", label: "Receive No", type: "text" },
      {
        key: "binder", label: "Binder Name", type: "pair",
        lookup: { sourceKey: "Publication / Binder Information", codeKey: "code", nameKey: "name" },
      },
      { key: "orderNo", label: "Order no", type: "text" },
      { key: "challanNo", label: "Challan No", type: "text" },
    ],
    grid: {
      initialRows: 6,
      columns: [
        { key: "bookCode", label: "Book Code", w: 90 },
        { key: "bookName", label: "Book Name", w: 200 },
        { key: "groupCode", label: "Group Code", w: 90 },
        { key: "groupName", label: "Group Name", w: 140 },
        { key: "qty", label: "Qty", type: "number", w: 70 },
        { key: "rate", label: "Rate", type: "number", w: 80 },
        { key: "total", label: "Total", w: 90 },
      ],
      autoTotal: { qtyKey: "qty", rateKey: "rate", totalKey: "total" },
    },
    buttons: ["Save", "Cancel", "Exit", "First", "Next", "Previous", "Last", "SLIP", "Delete"],
  },

  "Binder Order": {
    title: "Binder Order Entry Form",
    headerFields: [
      { key: "date", label: "Date", type: "date" },
      { key: "orderNo", label: "Order No.", type: "text" },
      {
        key: "name", label: "Name", type: "pair",
        lookup: { sourceKey: "Publication / Binder Information", codeKey: "code", nameKey: "name" },
      },
      {
        key: "groupCode", label: "Group Code", type: "pair",
        lookup: { sourceKey: "Book Groups", codeKey: "code", nameKey: "name" },
      },
      {
        key: "bookCode", label: "Book Code", type: "pair",
        lookup: { sourceKey: "Book Information", codeKey: "bookCode", nameKey: "bookName" },
      },
      { key: "quantity", label: "Quantity", type: "number" },
      { key: "formaQnty", label: "Forma Qnty", type: "number" },
    ],
    grid: {
      initialRows: 6,
      columns: [
        { key: "code", label: "Code", w: 80 },
        { key: "pressName", label: "Press Name", w: 220 },
        { key: "rimQty", label: "Rim Qty", type: "number", w: 90 },
      ],
    },
    buttons: ["Save", "Cancel", "Exit", "Slip", "First", "Next", "Previous", "Last", "Delete Line", "Delete"],
  },

  "Paper Transfer Order": {
    title: "Paper Transfer",
    headerFields: [
      { key: "date", label: "Date", type: "date" },
      { key: "transferNo", label: "Transfer No", type: "text" },
      { key: "fromPress", label: "From Press", type: "triple" },
      { key: "toPress", label: "To Press", type: "triple" },
      /* TODO: unclear which master list "Type" should look up here -- left without a lookup on purpose (see chat). */
      { key: "type", label: "Type", type: "pair" },
      { key: "paperType", label: "Paper Type", type: "select", options: PAPER_TYPE_OPTIONS },
      { key: "qty", label: "Qty", type: "number" },
    ],
    buttons: ["Save", "Cancel", "Exit", "Slip", "Delete"],
  },

  "Paper Print Order": {
    title: "Paper Print Order",
    modalWidth: 1300,
    compactHeader: true,
    headerFields: [
      { key: "tranDate", label: "TranDate", type: "date" },
      { key: "orderNo", label: "Order No", type: "text" },
      {
        key: "pressCode", label: "Press Code", type: "pair",
        lookup: { sourceKey: "Press Information", codeKey: "code", nameKey: "name" },
      },
      { key: "remarks", label: "Remarks", type: "textarea", wide: true },
    ],
    grid: {
      initialRows: 6,
      columns: [
        { key: "printingType", label: "Printing Type", type: "select", options: PRINTING_TYPE_OPTIONS, w: 110 },
        { key: "groupName", label: "Group Name", w: 120 },
        { key: "bookName", label: "Book Name", w: 155 },
        { key: "forma", label: "Forma", type: "number", w: 65 },
        { key: "plate", label: "Plate", type: "number", w: 65 },
        { key: "formaType", label: "Forma type", type: "select", options: FORMA_TYPE_OPTIONS, w: 105 },
        { key: "colorType", label: "Color Type", type: "select", options: COLOR_TYPE_OPTIONS, w: 105 },
        { key: "paperName", label: "Paper Name", w: 120 },
        { key: "type", label: "Type", type: "select", options: ORDER_TYPE_OPTIONS, w: 95 },
        { key: "papQty", label: "Pap Qty", type: "number", w: 75 },
        { key: "bookQty", label: "Book Qty", type: "number", w: 75 },
      ],
    },
    buttons: ["Save", "Cancel", "Print", "Exit", "Next", "Previous", "Last", "Delete memo", "Delete Line"],
  },

  "Paper Order": {
    title: "Paper Order Entry Form",
    headerFields: [
      { key: "date", label: "Date", type: "date" },
      {
        key: "supplierName", label: "Suppplier Name", type: "pair",
        lookup: { sourceKey: "Supplier Information", codeKey: "code", nameKey: "name" },
      },
      { key: "slipNo", label: "Slip No", type: "text" },
      /* TODO: unclear which master list "Type" should look up here -- left without a lookup on purpose (see chat). */
      { key: "type", label: "Type", type: "pair" },
      { key: "paperType", label: "Paper Type", type: "select", options: PAPER_TYPE_OPTIONS },
      { key: "qty", label: "Qty", type: "number" },
    ],
    grid: {
      initialRows: 5,
      columns: [
        { key: "pressCode", label: "press code", w: 90 },
        { key: "pressName", label: "Press Name", w: 220 },
        { key: "rimQty", label: "Rim Qty", type: "number", w: 90 },
      ],
    },
    buttons: ["Save", "Clear", "Exit", "Slip", "Delete", "Next", "Previous", "Last"],
  },

  /* ---- Sales, Return menu (rebuilt from Book Sales / Return / Specimen /
     Collection / Reject / Bonus screens) ---- */
  "Sales Memo Bookwise": {
    title: "Book Sales Entry Form",
    modalWidth: 1120,
    gridBoxHeight: 150,
    compactHeader: true,
    searchable: true,
    // Memo-number search only -- the dropdown/result list should show the
    // Memo No alone, not "000001 -- Party Name" like other forms.
    hideSearchPartyName: true,
    /* Saved sales memos already flow into the Book Information register /
       Sales reports, so this entry screen doesn't need to re-list them --
       First/Previous/Next/Last still page through saved memos to fix a
       mistake. */
    hideSavedEntries: true,
    extraField: { key: "cardNo", label: "Card No", type: "text" },
    headerFields: [
      { key: "date", label: "Date", type: "date", tint: "orange", hw: 72 },
      // autoSerial: freshly generated (000001, 000002, ... -- 6 digits,
      // counting up from the highest Memo No used across every saved
      // Bookwise memo so far) each time this form opens on a new/blank
      // entry -- see blankHeader in OrderEntryForm.
      { key: "memoNo", label: "Memo No", type: "text", disabled: true, tint: "orange", hw: 110, autoSerial: { pad: 6 } },
      {
        key: "district", label: "Ditrict name", type: "pair", hw: 260,
        // Typing a District Code here directly (not via the Party Code
        // cascade) now looks it up too, same as Party Information's own
        // District Code field. Enter/F9 also opens the "Find District
        // Information" search popup (on a miss, or always for F9), same as
        // every other lookup field.
        lookup: { sourceKey: "District Information", codeKey: "code", nameKey: "name" },
      },
      { key: "previousDues", label: "Previous Dues", type: "text", disabled: true, tint: "orange", hw: 78 },
      {
        key: "party", label: "Party Code", type: "pair", tint: "pink", hw: 280, newRow: true,
        lookup: {
          sourceKey: "Party Information", codeKey: "partyCode", nameKey: "partyName",
          /* Selecting a Party Code auto-fills District, Address and Previous
             Dues from that party's saved record, instead of leaving them for
             separate manual entry. */
          cascade: [
            { targetKey: "district", type: "pair", codeField: "districtCode", nameField: "districtName" },
            { targetKey: "address", field: "address" },
            { targetKey: "previousDues", field: "opBalance" },
          ],
          // Party Code is the last thing to fill in by hand before entering
          // books -- resolving it (by exact code, or by a pick from the
          // search popup) sends the cursor straight to Qty in the grid below.
          jumpToGrid: true,
        },
      },
      // Locked/read-only -- Address is only ever set via the Party Code
      // lookup above (see cascade), never typed directly here.
      // inlineLabel (label beside the box, not stacked above) keeps this
      // field's own natural height shorter than Party Code / Sales Type's
      // stacked label-above layout -- combined with the header row's
      // stretch+flex-end alignment (see body below), that's what settles
      // the Address box down into the same bottom line as those boxes
      // instead of sitting high with a gap underneath it.
      { key: "address", label: "Address", type: "textarea", tint: "yellow", grow: 3, matchInputHeight: true, inlineLabel: true, disabled: true },
      { key: "salesType", label: "Sales Type", type: "select", options: SALES_TYPE_OPTIONS, hw: 160, default: "Library" },
      {
        key: "publication", label: "publication", type: "pair", hw: 160,
        lookup: { sourceKey: "Publication / Binder Information", codeKey: "code", nameKey: "name" },
      },
    ],
    grid: {
      initialRows: 6,
      noRowDelete: true,
      /* Widths sum small enough (with th/td padding) to fit inside modalWidth
         without a horizontal scrollbar -- only the vertical one (from the
         fixed-height box above) is meant to show. */
      columns: [
        { key: "qty", label: "Qty", type: "number", w: 45 },
        {
          key: "bookCode", label: "Book Code", w: 65,
          /* Entering a Book Code auto-fills the rest of the row (Book Name,
             Stock, Net Rate, Com, Sale Rate) from the Book Information
             register, instead of leaving them for separate manual entry.
             codeKey matches against each book's own saved Book Code (see
             BookEntryForm) rather than its on-screen row position, so this
             still finds the right book once more than one Group has been
             saved -- a position match would only ever line up for the
             first group entered. */
          // code/categoryName here are the Group Code / Group Name the book
          // was saved under back on the Book Entry Form (groupCode /
          // groupName on its saved row) -- both were missing from this
          // mapping, so the Code / Category Name columns never auto-filled.
          // nameKey is only used to label each row inside the Enter/F9
          // search popup (see the grid cell below) -- the actual auto-fill
          // on a match still runs entirely off `fields`.
          gridLookup: { sourceKey: "Book Information", codeKey: "bookCode", nameKey: "bookName", fields: { bookName: "bookName", code: "groupCode", categoryName: "groupName", stock: "openBalance", netRate: "rate", com: "com", saleRate: "rate" } },
          // Book Code stays locked until Qty (the first cell on the row) has
          // something in it -- typing a quantity first, then the book, mirrors
          // the old ledger's "how many, then which book" order and stops a
          // book code being entered against an empty/blank line.
          disabledUnless: "qty",
        },
        { key: "bookName", label: "Book Name", w: 250, disabled: true },
        { key: "code", label: "Code", w: 45, disabled: true },
        { key: "categoryName", label: "Category Name", w: 150, disabled: true },
        { key: "stock", label: "Stock", disabled: true, w: 50 },
        // Editable -- Book Code still auto-fills it from the Book Information
        // register, but the person can now correct/override the rate by hand
        // afterwards (e.g. a one-off discount) instead of it being locked.
        { key: "netRate", label: "Net.Rate", type: "number", w: 60 },
        { key: "com", label: "Com", type: "number", tint: "pink", w: 50 },
        {
          key: "saleRate", label: "Sale Rate", type: "number", w: 60,
          // Recomputes the moment Com (or Net Rate) changes, instead of
          // needing a separate manual edit to keep Sale Rate in sync --
          // Com is treated as a trade discount off Net Rate, same as the
          // old ledger. Total (below) is already qty * saleRate, so this
          // is what makes Total / Sub Total / Net Bill all cascade
          // automatically off a Com change too.
          compute: (r) => {
            const net = parseFloat(r.netRate) || 0;
            const com = parseFloat(r.com) || 0;
            return net - (net * com) / 100;
          },
        },
        { key: "total", label: "Total", type: "number", compute: (r) => (parseFloat(r.qty) || 0) * (parseFloat(r.saleRate) || 0), w: 65 },
      ],
    },
    footerPanels: [
      {
        bordered: true,
        flex: "1 1 260px",
        fields: [
          { key: "remarks", label: "Remarks", type: "text" },
          { key: "packetQty", label: "Packet Qty", type: "number" },
          { key: "bookingRemarks", label: "Booking Remarks", type: "textarea" },
          {
            key: "transportName", label: "Transport Name", type: "pair",
            lookup: { sourceKey: "Transport Entry", codeKey: "transportCode", nameKey: "transportName" },
          },
        ],
      },
      {
        title: "Payment",
        bordered: true,
        flex: "1 1 220px",
        fields: [
          // Same auto-numbering as Memo No above (000001, 000002, ...).
          { key: "paymentNo", label: "Payment No", type: "text", disabled: true, autoSerial: { pad: 6 } },
          { key: "payMode", label: "Pay Mode", type: "select", options: PAY_MODE_OPTIONS, default: "Cash" },
          {
            key: "bankName", label: "Bank name", type: "pair",
            lookup: { sourceKey: "Bank Account Information", codeKey: "code", nameKey: "bankName" },
          },
          // Enter here jumps straight to Save (see focusSaveOnEnter handling
          // in renderFooterField) instead of tabbing on to Ext.com/Less/Packing.
          { key: "paidAmount", label: "Paid Amount", type: "number", focusSaveOnEnter: true },
        ],
      },
      {
        bordered: true,
        flex: "1 1 200px",
        fields: [
          { key: "totalPrice", label: "Total Price", compute: (ctx) => ctx.rows.reduce((s, r) => s + (parseFloat(r.total) || 0), 0) },
          { type: "pctAmount", pctKey: "extCom", label: "Ext.com.(%)", amtCompute: (ctx) => ((ctx.rows.reduce((s, r) => s + (parseFloat(r.total) || 0), 0)) * (parseFloat(ctx.footer.extCom) || 0)) / 100 },
          {
            key: "subTotal", label: "Sub Total",
            compute: (ctx) => {
              const tot = ctx.rows.reduce((s, r) => s + (parseFloat(r.total) || 0), 0);
              const ext = (tot * (parseFloat(ctx.footer.extCom) || 0)) / 100;
              return tot - ext;
            },
          },
          { key: "less", label: "Less", type: "number" },
          { key: "packing", label: "Packing", type: "number" },
          {
            key: "netBill", label: "Net Bill",
            compute: (ctx) => {
              const tot = ctx.rows.reduce((s, r) => s + (parseFloat(r.total) || 0), 0);
              const ext = (tot * (parseFloat(ctx.footer.extCom) || 0)) / 100;
              const sub = tot - ext;
              return sub - (parseFloat(ctx.footer.less) || 0) + (parseFloat(ctx.footer.packing) || 0);
            },
          },
          {
            key: "dues", label: "Dues",
            compute: (ctx) => {
              const tot = ctx.rows.reduce((s, r) => s + (parseFloat(r.total) || 0), 0);
              const ext = (tot * (parseFloat(ctx.footer.extCom) || 0)) / 100;
              const sub = tot - ext;
              const net = sub - (parseFloat(ctx.footer.less) || 0) + (parseFloat(ctx.footer.packing) || 0);
              const prevDues = parseFloat(ctx.header.previousDues) || 0;
              return prevDues + net - (parseFloat(ctx.footer.paidAmount) || 0);
            },
          },
        ],
      },
    ],
    buttons: ["Save", "Cancel", "Exit", "Delete memo", "Delete Line", "Cash Memo Print", "Challan Due", "Booking Slip", "First", "Previous", "Next", "Last"],
  },

  "Book Return": {
    title: "Book Return Entry Form",
    modalWidth: 1100,
    searchable: true,
    headerFields: [
      { key: "date", label: "Date", type: "date" },
      {
        key: "district", label: "District", type: "pair",
        lookup: { sourceKey: "District Information", codeKey: "code", nameKey: "name" },
      },
      {
        key: "party", label: "Party Code", type: "pair",
        lookup: {
          sourceKey: "Party Information", codeKey: "partyCode", nameKey: "partyName",
          cascade: [{ targetKey: "district", type: "pair", codeField: "districtCode", nameField: "districtName" }],
          jumpToGrid: true,
        },
      },
      { key: "returnNo", label: "Return No", type: "text" },
      { key: "challanReturn", label: "Challan Return", type: "select", options: CHALLAN_OPTIONS },
    ],
    grid: {
      initialRows: 5,
      columns: [
        { key: "qty", label: "Qty", type: "number", w: 60 },
        { key: "bookCode", label: "Book Code", w: 90 },
        { key: "groupCode", label: "Group Code", w: 90 },
        { key: "groupName", label: "Group Name", w: 130 },
        { key: "bookName", label: "Book Name", w: 200 },
        { key: "comm", label: "COMM", type: "number", w: 70 },
        { key: "bookRate", label: "Book Rate", type: "number", w: 85 },
        {
          key: "returnRate", label: "Return Rate", disabled: true,
          compute: (r) => (parseFloat(r.bookRate) || 0) - ((parseFloat(r.bookRate) || 0) * (parseFloat(r.comm) || 0)) / 100,
          w: 90,
        },
        { key: "total", label: "Total", disabled: true, compute: (r) => (parseFloat(r.qty) || 0) * ((parseFloat(r.bookRate) || 0) - ((parseFloat(r.bookRate) || 0) * (parseFloat(r.comm) || 0)) / 100), w: 90 },
      ],
    },
    footerPanels: [
      {
        flex: "1 1 260px",
        fields: [
          { key: "total", label: "Total", compute: (ctx) => ctx.rows.reduce((s, r) => s + (parseFloat(r.total) || 0), 0) },
          { key: "transportBill", label: "Transport Bill(-)", type: "number" },
          {
            type: "pctAmount", pctKey: "bonusPct", label: "Bonus(%)",
            amtCompute: (ctx) => (ctx.rows.reduce((s, r) => s + (parseFloat(r.total) || 0), 0) * (parseFloat(ctx.footer.bonusPct) || 0)) / 100,
          },
          {
            key: "netReturn", label: "Net Return",
            compute: (ctx) => {
              const tot = ctx.rows.reduce((s, r) => s + (parseFloat(r.total) || 0), 0);
              const bonusAmt = (tot * (parseFloat(ctx.footer.bonusPct) || 0)) / 100;
              return tot - (parseFloat(ctx.footer.transportBill) || 0) - bonusAmt;
            },
          },
        ],
      },
    ],
    buttons: ["Save", "Cancel", "Exit", "First", "Next", "Previous", "Last", "Report Preview", "Delete"],
  },

  "Book Specimen": {
    title: "Book Specimen Entry Form",
    modalWidth: 1000,
    searchable: true,
    headerFields: [
      { key: "date", label: "Date", type: "date" },
      {
        key: "district", label: "Ditrict name", type: "pair",
        lookup: { sourceKey: "District Information", codeKey: "code", nameKey: "name" },
      },
      {
        key: "party", label: "Party Name", type: "pair",
        lookup: {
          sourceKey: "Party Information", codeKey: "partyCode", nameKey: "partyName",
          cascade: [{ targetKey: "district", type: "pair", codeField: "districtCode", nameField: "districtName" }],
        },
      },
      {
        key: "specimen", label: "Specimen name", type: "pair",
        lookup: {
          sourceKey: "Specimen Party", codeKey: "partyCode", nameKey: "partyName",
          cascade: [{ targetKey: "district", field: "district" }],
          jumpToGrid: true,
        },
      },
      { key: "memoNo", label: "Memo No", type: "text", disabled: true },
    ],
    grid: {
      initialRows: 8,
      columns: [
        { key: "qty", label: "Qty", type: "number", w: 60 },
        { key: "groupCode", label: "Group Code", w: 90 },
        { key: "groupName", label: "Group Name", w: 130 },
        { key: "bookCode", label: "Book Code", w: 90 },
        { key: "bookName", label: "Book Name", w: 260 },
      ],
    },
    buttons: ["Save", "Cancel", "Delete", "Exit", "First", "Previous", "Next", "Last", "Party slip", "SPECIMEN_MEMO"],
  },

  "Money Receipt": {
    title: "Collection Form",
    searchable: true,
    headerFields: [
      { key: "date", label: "Date", type: "date" },
      { key: "mrNo", label: "MR No", type: "text", disabled: true },
      {
        key: "district", label: "District Name", type: "pair",
        lookup: { sourceKey: "District Information", codeKey: "code", nameKey: "name" },
      },
      {
        key: "party", label: "Party Code", type: "pair",
        lookup: {
          sourceKey: "Party Information", codeKey: "partyCode", nameKey: "partyName",
          cascade: [{ targetKey: "district", type: "pair", codeField: "districtCode", nameField: "districtName" }],
        },
      },
      { key: "mode", label: "Mode", type: "select", options: PAY_MODE_OPTIONS },
      { key: "chequeNo", label: "Cheque No", type: "text" },
      { key: "chequeDate", label: "Cheque Date", type: "date" },
      {
        key: "bankName", label: "Bank name", type: "pair",
        lookup: { sourceKey: "Bank Account Information", codeKey: "code", nameKey: "bankName" },
      },
      { key: "branchName", label: "Branch Name", type: "text" },
      { key: "amount", label: "Amount", type: "number", tint: "yellow" },
      { key: "receiverName", label: "Receiver Name & Bikas no", type: "text" },
      { key: "senderName", label: "Sender Name & Bikas no", type: "text" },
      { key: "remarks", label: "Remarks", type: "textarea", wide: true },
    ],
    buttons: ["Save", "Cancel", "Exit", "First", "Next", "Previous", "Last", "Delete", "Mony Recipt"],
  },

  "Book Stock Reject": {
    title: "Book Reject Entry Form",
    modalWidth: 1100,
    searchable: true,
    headerFields: [
      { key: "date", label: "Date", type: "date" },
      {
        key: "district", label: "District", type: "pair",
        lookup: { sourceKey: "District Information", codeKey: "code", nameKey: "name" },
      },
      {
        key: "party", label: "Party Name", type: "pair",
        lookup: {
          sourceKey: "Party Information", codeKey: "partyCode", nameKey: "partyName",
          cascade: [{ targetKey: "district", type: "pair", codeField: "districtCode", nameField: "districtName" }],
          jumpToGrid: true,
        },
      },
      { key: "rejectNo", label: "Reject No", type: "text" },
    ],
    grid: {
      initialRows: 5,
      columns: [
        { key: "qty", label: "Qty", type: "number", w: 60 },
        { key: "groupCode", label: "Group Code", w: 90 },
        { key: "groupName", label: "Group Name", w: 110 },
        { key: "bookCode", label: "Book Code", w: 90 },
        { key: "bookName", label: "Book Name", w: 190 },
        { key: "stock", label: "Stock", disabled: true, w: 70 },
        { key: "totalValue", label: "Total Value", type: "number", w: 90 },
        { key: "bookRate", label: "Book Rate", type: "number", w: 85 },
        { key: "rejectRate", label: "Reject Rate", type: "number", w: 90 },
        { key: "total", label: "Total", compute: (r) => (parseFloat(r.qty) || 0) * (parseFloat(r.rejectRate) || 0), w: 90 },
      ],
    },
    footerPanels: [
      {
        flex: "1 1 200px",
        fields: [
          { key: "total", label: "Total", compute: (ctx) => ctx.rows.reduce((s, r) => s + (parseFloat(r.total) || 0), 0) },
        ],
      },
    ],
    buttons: ["Save", "Cancel", "Exit", "First", "Next", "Previous", "Last", "Delete", "Slip"],
  },

  "Bonus Category Entry": {
    title: "Bonus Category Entry",
    headerFields: [
      { key: "tranDate", label: "Tran Date", type: "date" },
      { key: "year", label: "Year", type: "text" },
      { key: "category", label: "Category", type: "select", options: BONUS_CATEGORY_OPTIONS },
      { key: "bonusPrct", label: "Bonus Prct", type: "number" },
      { key: "description", label: "Description", type: "text", wide: true },
    ],
    grid: {
      initialRows: 9,
      columns: [
        { key: "code", label: "Code", w: 70 },
        { key: "groupName", label: "Gorup Name", w: 150 },
        { key: "bookCode", label: "Book Code", w: 90 },
        { key: "bookName", label: "Book Name", w: 220 },
      ],
    },
    buttons: ["Save", "Cancel", "Exit", "First", "Next", "Previous", "Last", "Delete", "Line Delete"],
  },

  "Bonus Calculation": {
    title: "Party Bonus calculation",
    modalWidth: 1180,
    compactHeader: true,
    searchable: true,
    searchLabel: "Preview",
    headerFields: [
      { key: "slNo", label: "SL No", type: "text", disabled: true },
      { key: "date", label: "Date", type: "date" },
      {
        key: "district", label: "District", type: "pair",
        lookup: { sourceKey: "District Information", codeKey: "code", nameKey: "name" },
      },
      {
        key: "party", label: "Party", type: "pair",
        lookup: {
          sourceKey: "Party Information", codeKey: "partyCode", nameKey: "partyName",
          cascade: [
            { targetKey: "district", type: "pair", codeField: "districtCode", nameField: "districtName" },
            { targetKey: "address", field: "address" },
          ],
        },
      },
      { key: "address", label: "Address", type: "textarea", wide: true },
      { key: "fromDate", label: "From Date", type: "date" },
      { key: "toDate", label: "To Date", type: "date" },
    ],
    grid: {
      initialRows: 8,
      columns: [
        { key: "groupName", label: "Group Name", w: 115 },
        { key: "sal", label: "Sal", type: "number", w: 62 },
        { key: "returnQty", label: "Return", type: "number", w: 62 },
        { key: "actualSales", label: "Actual Sales", disabled: true, compute: (r) => (parseFloat(r.sal) || 0) - (parseFloat(r.returnQty) || 0), w: 78 },
        { key: "generalCom", label: "General Com(%)", type: "number", w: 78 },
        {
          key: "generalBonusAmt", label: "General Bonus Amount", disabled: true,
          compute: (r) => (((parseFloat(r.sal) || 0) - (parseFloat(r.returnQty) || 0)) * (parseFloat(r.generalCom) || 0)) / 100,
          w: 88,
        },
        { key: "extCom", label: "Ext. Com(%)", type: "number", w: 70 },
        {
          key: "extAmount", label: "Ext. Amount", disabled: true,
          compute: (r) => (((parseFloat(r.sal) || 0) - (parseFloat(r.returnQty) || 0)) * (parseFloat(r.extCom) || 0)) / 100,
          w: 78,
        },
        { key: "rtCom", label: "RT Com%", type: "number", w: 62 },
        { key: "reduceAmt", label: "Reduce amt", type: "number", w: 70 },
        {
          key: "totalBonusAmt", label: "Tota Bonus Amount", disabled: true,
          compute: (r) => {
            const actual = (parseFloat(r.sal) || 0) - (parseFloat(r.returnQty) || 0);
            const gen = (actual * (parseFloat(r.generalCom) || 0)) / 100;
            const ext = (actual * (parseFloat(r.extCom) || 0)) / 100;
            return gen + ext - (parseFloat(r.reduceAmt) || 0);
          },
          w: 88,
        },
      ],
      totalsRow: { label: "Total", cols: ["sal", "returnQty", "actualSales"] },
    },
    footerPanels: [
      {
        flex: "1 1 260px",
        fields: [
          { key: "categoryAmount", label: "A,B,C ,D ,E,F Category Amount", type: "number" },
          { key: "depositAmount", label: "Deposit Amount", type: "number" },
          { key: "depositPct", label: "Deposit Pct(%)", type: "number" },
        ],
      },
      {
        flex: "1 1 220px",
        fields: [
          {
            type: "pctAmount", pctKey: "salesBonusPct", label: "Sales Bonus",
            amtCompute: (ctx) => (ctx.rows.reduce((s, r) => s + (parseFloat(r.actualSales) || 0), 0) * (parseFloat(ctx.footer.salesBonusPct) || 0)) / 100,
          },
          {
            type: "pctAmount", pctKey: "returnBonusPct", label: "Return Bonus",
            amtCompute: (ctx) => (ctx.rows.reduce((s, r) => s + (parseFloat(r.returnQty) || 0), 0) * (parseFloat(ctx.footer.returnBonusPct) || 0)) / 100,
          },
          { key: "specialBonus", label: "Special Bonus", type: "number" },
          {
            key: "totalBonus", label: "Total Bonus",
            compute: (ctx) => {
              const gridTotal = ctx.rows.reduce((s, r) => s + (parseFloat(r.totalBonusAmt) || 0), 0);
              const salesAmt = (ctx.rows.reduce((s, r) => s + (parseFloat(r.actualSales) || 0), 0) * (parseFloat(ctx.footer.salesBonusPct) || 0)) / 100;
              const returnAmt = (ctx.rows.reduce((s, r) => s + (parseFloat(r.returnQty) || 0), 0) * (parseFloat(ctx.footer.returnBonusPct) || 0)) / 100;
              return gridTotal + salesAmt + returnAmt + (parseFloat(ctx.footer.specialBonus) || 0) - (parseFloat(ctx.footer.depositAmount) || 0);
            },
          },
        ],
      },
    ],
    buttons: ["Save", "Cancel", "Exit", "First", "Next", "Previous", "Last", "Delete", "Line Delete", "Transfer"],
  },

  "Bonus": {
    title: "Yearly Bonus Entry Form",
    searchable: true,
    headerFields: [
      { key: "date", label: "Date", type: "date" },
      {
        key: "district", label: "District Name", type: "pair",
        lookup: { sourceKey: "District Information", codeKey: "code", nameKey: "name" },
      },
      {
        key: "party", label: "Party Code", type: "pair",
        lookup: {
          sourceKey: "Party Information", codeKey: "partyCode", nameKey: "partyName",
          cascade: [{ targetKey: "district", type: "pair", codeField: "districtCode", nameField: "districtName" }],
        },
      },
      { key: "amount", label: "Amount", type: "number" },
    ],
    buttons: ["Save", "Cancel", "Exit", "First", "Next", "Previous", "Last", "Delete"],
  },

  "Supplier Bill Entry": {
    title: "Supplier Bill Entry Form",
    searchable: true,
    headerFields: [
      { key: "date", label: "Date", type: "date" },
      { key: "billDate", label: "Bill Date", type: "text" },
      { key: "billNo", label: "Bill No.", type: "text" },
      { key: "suppType", label: "Supp Type", type: "select", options: SUPPLIER_TYPE_OPTIONS },
      {
        key: "suppName", label: "Supp. Name", type: "pair",
        lookup: { sourceKey: "Supplier Information", codeKey: "code", nameKey: "name" },
      },
      {
        key: "pressName", label: "Press Name", type: "pair",
        lookup: { sourceKey: "Press Information", codeKey: "code", nameKey: "name" },
      },
      /* TODO: unclear which master list "Type" should look up here -- left without a lookup on purpose (see chat). */
      { key: "type", label: "Type", type: "pair" },
      { key: "paperType", label: "Paper Type", type: "select", options: PAPER_TYPE_OPTIONS },
      { key: "paperQnty", label: "Paper Qnty", type: "number" },
      { key: "prizeRimWise", label: "Prize Rim Wise", type: "number" },
      { key: "goodsDescription", label: "Goods Discriptio", type: "text" },
      { key: "billAmount", label: "Bill Amount", type: "number" },
    ],
    buttons: ["Save", "Cancel", "Exit", "Slip", "First", "Next", "Delete", "Last"],
  },

  "Press / Binder / Wire / Lamination / Paste / Plate Bill Entry": {
    title: "Bill Entry For Press/Binding/Plet/Lemi/Pesting/Wr",
    searchable: true,
    headerFields: [
      { key: "date", label: "Date", type: "date" },
      { key: "billNo", label: "Bill No.", type: "text" },
      { key: "billDate", label: "Bill Date", type: "text" },
      { key: "type", label: "Type", type: "select", options: BILL_ENTRY_TYPE_OPTIONS },
      {
        key: "press", label: "Press", type: "pair",
        lookup: { sourceKey: "Press Information", codeKey: "code", nameKey: "name" },
      },
      {
        key: "binder", label: "Binder", type: "pair",
        lookup: { sourceKey: "Publication / Binder Information", codeKey: "code", nameKey: "name" },
      },
      {
        key: "pletLemiPesting", label: "Plet/Lemi/Pesting", type: "pair",
        lookup: { sourceKey: "Plate / Lamination / Pasting Information", codeKey: "code", nameKey: "name" },
      },
      {
        key: "writerName", label: "Writer Name", type: "pair",
        lookup: { sourceKey: "Writer Information", codeKey: "code", nameKey: "name" },
      },
      { key: "amount", label: "Amount", type: "number" },
      { key: "remarks", label: "Remarks", type: "textarea", wide: true },
    ],
    buttons: ["Save", "Clear", "Delete", "Last", "Exit"],
  },

  "Employee Salary / Extra Payment Bill Entry": {
    title: "Employee Salary/Extra Bill Entry",
    searchable: true,
    headerFields: [
      { key: "date", label: "Date", type: "date" },
      { key: "year", label: "Year", type: "text" },
      { key: "month", label: "Month", type: "select", options: MONTH_OPTIONS },
      {
        key: "name", label: "Name", type: "pair",
        lookup: { sourceKey: "Employee Information", codeKey: "code", nameKey: "name" },
      },
      { key: "salaryDeduc", label: "Salary Deduc.", type: "number" },
      { key: "bonusOvertime", label: "Bonous/Overtime", type: "number" },
      { key: "salary", label: "Salary", type: "number" },
      { key: "remarks", label: "Ramarks", type: "select", options: ["Regular", "Advance", "Adjustment"] },
    ],
    buttons: ["Save", "Clear", "Delete", "Exit", "Last"],
  },

  "Shop Rent Payment": {
    title: "Shop Rent Payment Entry Form",
    searchable: true,
    headerFields: [
      { key: "date", label: "Date", type: "date" },
      { key: "year", label: "Year", type: "text" },
      { key: "month", label: "Month", type: "select", options: MONTH_OPTIONS },
      {
        key: "shop", label: "Shop Name", type: "pair",
        lookup: { sourceKey: "Shop Name Entry", codeKey: "code", nameKey: "name" },
      },
      { key: "rentAmount", label: "Rent Amount", type: "number" },
      { key: "paymentMode", label: "Payment Mode", type: "select", options: PAY_MODE_OPTIONS },
      {
        key: "bankName", label: "Bank Name", type: "pair",
        lookup: { sourceKey: "Bank Account Information", codeKey: "code", nameKey: "bankName" },
      },
      { key: "cheqNo", label: "Cheq. No.", type: "text" },
      { key: "cheqDate", label: "Cheq. Date", type: "text" },
      { key: "remarks", label: "Remarks", type: "textarea", wide: true },
    ],
    buttons: ["Save", "Clear", "Delete", "Exit", "Last"],
  },

  /* ---- Accounts Bill Payment forms ---- */
  "Daily Expense Bill Payment": {
    title: "Others Expanse Bill Payment",
    searchable: true,
    headerFields: [
      { key: "date", label: "Date", type: "date" },
      { key: "reciverName", label: "Reciver name", type: "text" },
      {
        key: "expHead", label: "Exp. Head", type: "pair",
        lookup: { sourceKey: "Other Expense Head Information", codeKey: "code", nameKey: "name" },
      },
      { key: "paymentMode", label: "Payment Mode", type: "select", options: PAY_MODE_OPTIONS },
      {
        key: "bankName", label: "Bank Name", type: "pair",
        lookup: { sourceKey: "Bank Account Information", codeKey: "code", nameKey: "bankName" },
      },
      { key: "cheqNo", label: "Cheq. No.", type: "text" },
      { key: "cheqDate", label: "Cheq. Date", type: "text" },
      { key: "amount", label: "Amount", type: "number" },
      { key: "remarks", label: "Remarks", type: "textarea", wide: true },
    ],
    buttons: ["Save", "Cancel", "Exit", "Slip", "First", "Next", "Delete", "Last"],
  },

  "Press / Binder / Wire / Lamination / Paste / Plate Bill Payment": {
    title: "Bill Payment For Writer/Press/Binding/Plet/Lemi/Pesting",
    searchable: true,
    headerFields: [
      { key: "date", label: "Date", type: "date" },
      { key: "billNo", label: "Bill No.", type: "text" },
      { key: "mrrNo", label: "MRR. NO.", type: "text" },
      { key: "type", label: "Type", type: "select", options: BILL_PAYMENT_TYPE_OPTIONS },
      {
        key: "press", label: "Press", type: "pair",
        lookup: { sourceKey: "Press Information", codeKey: "code", nameKey: "name" },
      },
      {
        key: "binder", label: "Binder", type: "pair",
        lookup: { sourceKey: "Publication / Binder Information", codeKey: "code", nameKey: "name" },
      },
      {
        key: "pletLemiPesting", label: "Plet/Lemi/Pesting", type: "pair",
        lookup: { sourceKey: "Plate / Lamination / Pasting Information", codeKey: "code", nameKey: "name" },
      },
      {
        key: "writerName", label: "Writer Name", type: "pair",
        lookup: { sourceKey: "Writer Information", codeKey: "code", nameKey: "name" },
      },
      { key: "paymentMode", label: "Payment Mode", type: "select", options: PAY_MODE_OPTIONS },
      {
        key: "bankName", label: "Bank Name", type: "pair",
        lookup: { sourceKey: "Bank Account Information", codeKey: "code", nameKey: "bankName" },
      },
      { key: "chequeNo", label: "Cheque No.", type: "text" },
      { key: "chequeDate", label: "Cheque Date", type: "text" },
      { key: "amount", label: "Amount", type: "number" },
    ],
    buttons: ["Save", "Clear", "Slip", "Next", "Delete", "Last", "Exit"],
  },

  "Supplier Bill Entry Payment": {
    title: "Supplier Bill Payment",
    searchable: true,
    headerFields: [
      { key: "date", label: "Date", type: "date" },
      { key: "billNo", label: "Bill No.", type: "text" },
      { key: "mrNo", label: "MR. No.", type: "text" },
      {
        key: "suppName", label: "Supp. Name", type: "pair",
        lookup: { sourceKey: "Supplier Information", codeKey: "code", nameKey: "name" },
      },
      { key: "paymentMode", label: "Payment Mode", type: "select", options: PAY_MODE_OPTIONS },
      {
        key: "bankName", label: "Bank Name", type: "pair",
        lookup: { sourceKey: "Bank Account Information", codeKey: "code", nameKey: "bankName" },
      },
      { key: "cheqNo", label: "Cheq No.", type: "text" },
      { key: "chequeDate", label: "Cheque Date", type: "text" },
      { key: "amount", label: "Amount", type: "number" },
    ],
    buttons: ["Save", "Cancel", "Exit", "Slip", "First", "Next", "Delete", "Last"],
  },

  "Personal Loan Taken / Payment": {
    title: "Personal Loan Taken/Paymet",
    headerFields: [
      { key: "date", label: "Date", type: "date" },
      { key: "type", label: "Type", type: "select", options: LOAN_TYPE_OPTIONS },
      {
        key: "party", label: "Party", type: "pair",
        lookup: { sourceKey: "Personal Loan Party Information", codeKey: "code", nameKey: "name" },
      },
      { key: "amount", label: "Amount", type: "number" },
    ],
    buttons: ["Save", "Clear", "Delete", "Last", "Exit"],
  },

  "Employee Salary Payment": {
    title: "Employee Salary/Extra Payment",
    searchable: true,
    headerFields: [
      { key: "code", label: "code", type: "text" },
      { key: "date", label: "Date", type: "date" },
      { key: "year", label: "Year", type: "text" },
      { key: "month", label: "Month", type: "select", options: MONTH_OPTIONS },
      {
        key: "name", label: "Name", type: "pair",
        lookup: { sourceKey: "Employee Information", codeKey: "code", nameKey: "name" },
      },
      { key: "paymentMode", label: "Payment Mode", type: "select", options: PAY_MODE_OPTIONS },
      {
        key: "bankName", label: "Bank Name", type: "pair",
        lookup: { sourceKey: "Bank Account Information", codeKey: "code", nameKey: "bankName" },
      },
      { key: "chequeNo", label: "Cheque No.", type: "text" },
      { key: "chequeDate", label: "Cheque Date", type: "text" },
      { key: "amount", label: "Amount", type: "number" },
      { key: "remarks", label: "Remarks", type: "text" },
    ],
    buttons: ["Save", "Clear", "Delete", "Last", "Exit", "Slip"],
  },

  "Bank Deposit": {
    title: "Bank Deposit",
    headerFields: [
      { key: "date", label: "Date", type: "date" },
      { key: "depNo", label: "Dep no", type: "text" },
      {
        key: "bankName", label: "Bank Name", type: "pair",
        lookup: { sourceKey: "Bank Account Information", codeKey: "code", nameKey: "bankName" },
      },
      { key: "mode", label: "Mode", type: "select", options: PAY_MODE_OPTIONS },
      { key: "partyBankName", label: "Party Bank Nam", type: "text", wide: true },
      { key: "chequeDdTt", label: "Cheque/DD/TT", type: "text", wide: true },
      {
        key: "district", label: "District", type: "pair",
        lookup: { sourceKey: "District Information", codeKey: "code", nameKey: "name" },
      },
      {
        key: "party", label: "Party", type: "pair",
        lookup: { sourceKey: "Party Information", codeKey: "partyCode", nameKey: "partyName",
          cascade: [{ targetKey: "district", type: "pair", codeField: "districtCode", nameField: "districtName" }] },
      },
      { key: "amount", label: "Amount", type: "number" },
    ],
    buttons: ["Save", "Cancel", "Exit", "First", "Next", "Delete", "Last"],
  },

  "Bank Withdrawal": {
    title: "Bank Withdrawal",
    headerFields: [
      { key: "date", label: "Date", type: "date" },
      { key: "slNo", label: "SL no", type: "text" },
      {
        key: "bankName", label: "Bank Name", type: "pair",
        lookup: { sourceKey: "Bank Account Information", codeKey: "code", nameKey: "bankName" },
      },
      { key: "accNo", label: "Acc. No.", type: "text" },
      { key: "cheqNo", label: "Cheq. No.", type: "text" },
      { key: "withdrawlBy", label: "Withdrawl By", type: "text" },
      { key: "amount", label: "Amount", type: "number" },
    ],
    buttons: ["Save", "Clear", "Delete", "Last", "Exit"],
  },
};

const PARTY_TYPE_OPTIONS = ["Sales Party", "Return Party", "Both"];
const PAPER_SIZE_OPTIONS = ["20/30", "20/32", "23/26", "Cover"];

/* Config for the "Register" / "Report" menu search-and-preview screens --
   simple label+box fields stacked vertically (no line-item grid), each
   rebuilt from a legacy Oracle Forms screenshot. `fields` supports the
   same "pair"/"text"/"select" types as OrderHeaderField, plus a
   "dateRange" field (renders a From/To pair -- inline on one row by
   default, or stacked on two rows with `stacked: true`). */
const REPORT_FORMS = {
  "Book Stock Report": {
    title: "Stock",
    subtitle: "Book Stock Report",
    fields: [
      {
        key: "group", label: "Group Code", type: "pair",
        lookup: { sourceKey: "Book Groups", codeKey: "code", nameKey: "name" },
      },
      {
        key: "book", label: "Book Code", type: "pair",
        lookup: { sourceKey: "Book Information", codeKey: "bookCode", nameKey: "bookName" },
      },
      { type: "dateRange", fromKey: "fromDate", toKey: "toDate", fromLabel: "From Date", toLabel: "To" },
    ],
    buttons: ["Preview", "Exit"],
  },
  "Return Stock Report": {
    title: "Stock",
    fields: [
      {
        key: "district", label: "District Name", type: "pair",
        lookup: { sourceKey: "District Information", codeKey: "code", nameKey: "name" },
      },
      {
        key: "group", label: "Group Code", type: "pair",
        lookup: { sourceKey: "Book Groups", codeKey: "code", nameKey: "name" },
      },
      {
        key: "book", label: "Book Code", type: "pair",
        lookup: { sourceKey: "Book Information", codeKey: "bookCode", nameKey: "bookName" },
      },
      { type: "dateRange", fromKey: "fromDate", toKey: "toDate", fromLabel: "From Date", toLabel: "To" },
    ],
    buttons: ["Preview", "Exit"],
  },
  "Specimen Party Ledger": {
    title: "Party Ledger Details",
    subtitle: "Specimen Party Ledger",
    fields: [
      {
        key: "district", label: "District Name", type: "pair",
        lookup: { sourceKey: "District Information", codeKey: "code", nameKey: "name" },
      },
      {
        key: "specimen", label: "Select Specimen", type: "pair",
        lookup: {
          sourceKey: "Specimen Party", codeKey: "partyCode", nameKey: "partyName",
          // Specimen Party's own District field is already a {code, name}
          // pair on the saved record, so it copies straight across.
          cascade: [{ targetKey: "district", field: "district" }],
        },
      },
      {
        key: "party", label: "Party Code", type: "pair",
        lookup: {
          sourceKey: "Party Information", codeKey: "partyCode", nameKey: "partyName",
          cascade: [{ targetKey: "district", type: "pair", codeField: "districtCode", nameField: "districtName" }],
        },
      },
      { type: "dateRange", fromKey: "fromDate", toKey: "toDate", fromLabel: "From", toLabel: "To" },
    ],
    buttons: ["specimen", "Exit", "Clear", "Party Specimen"],
  },
  "Money Receipt Party Ledger": {
    title: "Party Ledger Details",
    subtitle: "Money Receipt Ledger",
    fields: [
      {
        key: "district", label: "District Name", type: "pair",
        lookup: { sourceKey: "District Information", codeKey: "code", nameKey: "name" },
      },
      {
        key: "party", label: "Select Party", type: "pair",
        lookup: {
          sourceKey: "Party Information", codeKey: "partyCode", nameKey: "partyName",
          cascade: [{ targetKey: "district", type: "pair", codeField: "districtCode", nameField: "districtName" }],
        },
      },
      { type: "dateRange", fromKey: "fromDate", toKey: "toDate", fromLabel: "From", toLabel: "To" },
    ],
    buttons: ["Preview", "Exit", "Clear"],
  },
  "Party Dues Ledger": {
    title: "Party Dues Ledger",
    subtitle: "Party Dues Ledger",
    fields: [
      {
        key: "district", label: "District Name", type: "pair",
        lookup: { sourceKey: "District Information", codeKey: "code", nameKey: "name" },
      },
      {
        key: "party", label: "Select Party", type: "pair",
        lookup: {
          sourceKey: "Party Information", codeKey: "partyCode", nameKey: "partyName",
          cascade: [{ targetKey: "district", type: "pair", codeField: "districtCode", nameField: "districtName" }],
        },
      },
      { key: "partyType", label: "Party type", type: "select", options: PARTY_TYPE_OPTIONS },
      { key: "lastDate", label: "Last Date", type: "date" },
    ],
    buttons: ["Preview", "Exit", "Clear"],
  },
  "Party Ledger Details": {
    title: "Party Ledger Details",
    subtitle: "Party Ledger",
    fields: [
      {
        key: "district", label: "District Name", type: "pair",
        lookup: { sourceKey: "District Information", codeKey: "code", nameKey: "name" },
      },
      {
        key: "party", label: "Select Party", type: "pair",
        lookup: {
          sourceKey: "Party Information", codeKey: "partyCode", nameKey: "partyName",
          cascade: [{ targetKey: "district", type: "pair", codeField: "districtCode", nameField: "districtName" }],
        },
      },
      { type: "dateRange", fromKey: "fromDate", toKey: "toDate", fromLabel: "From", toLabel: "To" },
    ],
    buttons: ["Party Le...", "Sale", "Return", "Exit", "Clear", "Group Ledger"],
  },
  "Condition Sales": {
    title: "Stock",
    subtitle: "Condition Sales Register",
    fields: [
      {
        key: "district", label: "District Name", type: "pair",
        lookup: { sourceKey: "District Information", codeKey: "code", nameKey: "name" },
      },
      {
        key: "party", label: "Party Name", type: "pair",
        lookup: {
          sourceKey: "Party Information", codeKey: "partyCode", nameKey: "partyName",
          cascade: [{ targetKey: "district", type: "pair", codeField: "districtCode", nameField: "districtName" }],
        },
      },
      {
        key: "group", label: "Group Code", type: "pair",
        lookup: { sourceKey: "Book Groups", codeKey: "code", nameKey: "name" },
      },
      {
        key: "book", label: "Book Code", type: "pair",
        lookup: { sourceKey: "Book Information", codeKey: "bookCode", nameKey: "bookName" },
      },
      { type: "dateRange", fromKey: "fromDate", toKey: "toDate", fromLabel: "From Date", toLabel: "To" },
    ],
    buttons: ["Preview", "Exit", "Clear"],
  },
  "Yearly Bonus Register": {
    title: "Bonus Report",
    subtitle: "Bonus Report",
    fields: [
      {
        key: "district", label: "District", type: "pair",
        lookup: { sourceKey: "District Information", codeKey: "code", nameKey: "name" },
      },
      {
        key: "party", label: "Party", type: "pair",
        lookup: {
          sourceKey: "Party Information", codeKey: "partyCode", nameKey: "partyName",
          cascade: [{ targetKey: "district", type: "pair", codeField: "districtCode", nameField: "districtName" }],
        },
      },
      { type: "dateRange", fromKey: "fromDate", toKey: "toDate", fromLabel: "From", toLabel: "To" },
    ],
    buttons: ["Preview", "Exit"],
  },
  "Return Register": {
    title: "Stock",
    subtitle: "Return Register",
    fields: [
      {
        key: "district", label: "District Name", type: "pair",
        lookup: { sourceKey: "District Information", codeKey: "code", nameKey: "name" },
      },
      {
        key: "party", label: "Party Name", type: "pair",
        lookup: {
          sourceKey: "Party Information", codeKey: "partyCode", nameKey: "partyName",
          cascade: [{ targetKey: "district", type: "pair", codeField: "districtCode", nameField: "districtName" }],
        },
      },
      {
        key: "group", label: "Group Code", type: "pair",
        lookup: { sourceKey: "Book Groups", codeKey: "code", nameKey: "name" },
      },
      {
        key: "book", label: "Book Code", type: "pair",
        lookup: { sourceKey: "Book Information", codeKey: "bookCode", nameKey: "bookName" },
      },
      { type: "dateRange", fromKey: "fromDate", toKey: "toDate", fromLabel: "From Date", toLabel: "To" },
    ],
    buttons: ["Preview", "Exit"],
  },
  "Book Stock Reject Register": {
    title: "Stock",
    subtitle: "Reject Register",
    fields: [
      {
        key: "district", label: "District Name", type: "pair",
        lookup: { sourceKey: "District Information", codeKey: "code", nameKey: "name" },
      },
      {
        key: "party", label: "Party Name", type: "pair",
        lookup: {
          sourceKey: "Party Information", codeKey: "partyCode", nameKey: "partyName",
          cascade: [{ targetKey: "district", type: "pair", codeField: "districtCode", nameField: "districtName" }],
        },
      },
      {
        key: "group", label: "Group Code", type: "pair",
        lookup: { sourceKey: "Book Groups", codeKey: "code", nameKey: "name" },
      },
      {
        key: "book", label: "Book Code", type: "pair",
        lookup: { sourceKey: "Book Information", codeKey: "bookCode", nameKey: "bookName" },
      },
      { type: "dateRange", fromKey: "fromDate", toKey: "toDate", fromLabel: "From Date", toLabel: "To" },
    ],
    buttons: ["Preview", "Exit"],
  },
  "Party Information Register": {
    title: "Party Balance",
    subtitle: "Party Information",
    modalWidth: 620,
    /* Filter every saved party by District (type/retype a District
       Information code, or search-and-pick one -- same system as every
       other District field) and/or Party Type, then Preview. Leave the
       District code blank to see every district. */
    liveReport: "partyInformation",
    fields: [
      { key: "partyType", label: "Party type", type: "select", options: PARTY_TYPES },
      {
        key: "district", label: "District", type: "pair",
        lookup: { sourceKey: "District Information", codeKey: "code", nameKey: "name" },
      },
    ],
    buttons: ["Preview", "Clear", "Exit"],
  },
  "Writer Information Register": {
    title: "Writer Information Register", subtitle: "Writer Information", modalWidth: 980, fullPage: true,
    liveReport: "writerInformation",
    fields: [
      { key: "contributorType", label: "Contributor Type", type: "select", default: "All", options: ["All", "Writer", "Translator", "Editor", "Proofreader"] },
      {
        key: "district", label: "District", type: "pair",
        lookup: { sourceKey: "District Information", codeKey: "code", nameKey: "name" },
      },
    ],
    buttons: ["Preview", "Clear", "Exit"],
  },
  "Book Sales Register": {
    title: "Stock",
    subtitle: "Book Sales Register",
    fields: [
      {
        key: "district", label: "District Name", type: "pair",
        lookup: { sourceKey: "District Information", codeKey: "code", nameKey: "name" },
      },
      {
        key: "party", label: "Party Name", type: "pair",
        lookup: {
          sourceKey: "Party Information", codeKey: "partyCode", nameKey: "partyName",
          cascade: [{ targetKey: "district", type: "pair", codeField: "districtCode", nameField: "districtName" }],
        },
      },
      {
        key: "exchangePerson", label: "Exchange person", type: "pair",
        lookup: { sourceKey: "Party Information", codeKey: "partyCode", nameKey: "partyName" },
      },
      {
        key: "group", label: "Group Code", type: "pair",
        lookup: { sourceKey: "Book Groups", codeKey: "code", nameKey: "name" },
      },
      {
        key: "book", label: "Book Code", type: "pair",
        lookup: { sourceKey: "Book Information", codeKey: "bookCode", nameKey: "bookName" },
      },
      { type: "dateRange", fromKey: "fromDate", toKey: "toDate", fromLabel: "From Date", toLabel: "To" },
    ],
    buttons: ["Daily Profit", "Exit", "Groupwise Sale", "Book Exchange Regist...", "Memo wise Sales"],
  },
  "Book Received Register": {
    title: "Stock",
    subtitle: "Book Receive Register",
    underlineSubtitle: true,
    fields: [
      {
        key: "group", label: "Group Code", type: "pair",
        lookup: { sourceKey: "Book Groups", codeKey: "code", nameKey: "name" },
      },
      {
        key: "book", label: "Book Code", type: "pair",
        lookup: { sourceKey: "Book Information", codeKey: "bookCode", nameKey: "bookName" },
      },
      { type: "dateRange", fromKey: "fromDate", toKey: "toDate", fromLabel: "From Date", toLabel: "To" },
    ],
    buttons: ["Preview", "Exit", "Clear"],
  },
  "Small Sales Register": {
    title: "Daily Collection Statement",
    subtitle: "Salles Report",
    fields: [
      {
        key: "district", label: "District", type: "pair",
        lookup: { sourceKey: "District Information", codeKey: "code", nameKey: "name" },
      },
      {
        key: "party", label: "Party", type: "pair",
        lookup: {
          sourceKey: "Party Information", codeKey: "partyCode", nameKey: "partyName",
          cascade: [{ targetKey: "district", type: "pair", codeField: "districtCode", nameField: "districtName" }],
        },
      },
      { type: "dateRange", fromKey: "fromDate", toKey: "toDate", fromLabel: "From", toLabel: "To" },
    ],
    buttons: ["Total Sale", "Exit", "Due Sale"],
  },
  "Daily Collection Register": {
    title: "Daily Collection Statement",
    subtitle: "Collection Report",
    fields: [
      {
        key: "district", label: "District", type: "pair",
        lookup: { sourceKey: "District Information", codeKey: "code", nameKey: "name" },
      },
      {
        key: "party", label: "Party", type: "pair",
        lookup: {
          sourceKey: "Party Information", codeKey: "partyCode", nameKey: "partyName",
          cascade: [{ targetKey: "district", type: "pair", codeField: "districtCode", nameField: "districtName" }],
        },
      },
      { type: "dateRange", fromKey: "fromDate", toKey: "toDate", fromLabel: "From", toLabel: "To" },
    ],
    buttons: ["Preview", "Exit"],
  },
  "Book Information Register": {
    title: "Book Information",
    subtitle: "Book Information Report",
    modalWidth: 620,
    liveReport: "bookInformation",
    fields: [
      { key: "group", label: "Group", type: "groupSelect" },
    ],
    buttons: ["Run Report", "Clear", "EXIT"],
  },
  "Binding Statement": {
    title: "Binder Report",
    subtitle: "Book Binding Statement Order Wise",
    fields: [
      {
        key: "binder", label: "Binder", type: "pair",
        lookup: { sourceKey: "Publication / Binder Information", codeKey: "code", nameKey: "name" },
      },
      {
        key: "group", label: "Group Code", type: "pair",
        lookup: { sourceKey: "Book Groups", codeKey: "code", nameKey: "name" },
      },
      {
        key: "book", label: "Book Code", type: "pair",
        lookup: { sourceKey: "Book Information", codeKey: "bookCode", nameKey: "bookName" },
      },
    ],
    buttons: ["Order", "Receive", "Exit", "Clear"],
  },
  "Paper Order Report": {
    title: "Paper Order",
    subtitle: "Paper Order Report",
    fields: [
      { key: "paperType", label: "Paper Type", type: "select", options: PAPER_SIZE_OPTIONS },
      { key: "orderType", label: "Type", type: "text", hint: "press Ctrl+L" },
      { type: "dateRange", fromKey: "fromDate", toKey: "toDate", fromLabel: "From Date", toLabel: "To Date" },
    ],
    buttons: ["View", "Exit"],
  },
  "Print Order Report": {
    title: "Paper Print Order",
    subtitle: "Paper Print Order Report",
    fields: [
      { key: "paperType", label: "Paper Type", type: "select", options: PAPER_SIZE_OPTIONS },
      { type: "dateRange", fromKey: "fromDate", toKey: "toDate", fromLabel: "From Date", toLabel: "To Date" },
    ],
    buttons: ["View", "Exit"],
  },
  "Binder Register Details": {
    title: "Stock",
    subtitle: "Binder Register Details",
    underlineSubtitle: true,
    fields: [
      {
        key: "group", label: "Group Code", type: "pair",
        lookup: { sourceKey: "Book Groups", codeKey: "code", nameKey: "name" },
      },
      {
        key: "book", label: "Book Code", type: "pair",
        lookup: { sourceKey: "Book Information", codeKey: "bookCode", nameKey: "bookName" },
      },
      {
        key: "binder", label: "Binder code", type: "pair",
        lookup: { sourceKey: "Publication / Binder Information", codeKey: "code", nameKey: "name" },
      },
      /* TODO: blank label, unclear what "extra" should look up -- left without a lookup on purpose (see chat). */
      { key: "extra", label: "", type: "pair" },
    ],
    buttons: ["Preview", "Exit"],
  },
  "Binder Stock Report": {
    title: "Stock",
    fields: [
      {
        key: "group", label: "Group Code", type: "pair",
        lookup: { sourceKey: "Book Groups", codeKey: "code", nameKey: "name" },
      },
      {
        key: "book", label: "Book Code", type: "pair",
        lookup: { sourceKey: "Book Information", codeKey: "bookCode", nameKey: "bookName" },
      },
      {
        key: "binder", label: "Binder code", type: "pair",
        lookup: { sourceKey: "Publication / Binder Information", codeKey: "code", nameKey: "name" },
      },
    ],
    buttons: ["Preview", "Exit"],
  },
  "Cover Stock Report": {
    title: "Cover Report",
    subtitle: "Cover Report",
    fields: [
      { type: "dateRange", fromKey: "fromDate", toKey: "toDate", fromLabel: "From", toLabel: "To", stacked: true },
    ],
    buttons: ["Preview", "Exit"],
  },
  "Party Balance Report": {
    title: "Party Balance",
    subtitle: "Party Balance",
    liveReport: "partyBalance",
    fields: [
      {
        key: "district", label: "District", type: "pair",
        lookup: { sourceKey: "District Information", codeKey: "code", nameKey: "name" },
      },
      { key: "asOn", label: "As On:", type: "date" },
    ],
    buttons: ["Preview", "Clear", "Exit"],
  },
  "Paper Stock Report": {
    title: "Yearly Sales",
    subtitle: "Paper Order & Expediture",
    fields: [
      {
        key: "press", label: "Press", type: "pair",
        lookup: { sourceKey: "Press Information", codeKey: "code", nameKey: "name" },
      },
      {
        key: "paper", label: "Paper", type: "pair",
        lookup: { sourceKey: "Paper Type Information", codeKey: "papCode", nameKey: "paperTypeName" },
      },
      { key: "paperType", label: "paper type", type: "select", options: PAPER_TYPE_OPTIONS },
    ],
    buttons: ["Preview", "Exit"],
  },

  /* ---- Accounts Reports (ledgers) ---- */
  "Press Ledger": {
    title: "Party Ledger Details",
    subtitle: "Press Ledeger",
    fields: [
      {
        key: "press", label: "Select Press", type: "pair",
        lookup: { sourceKey: "Press Information", codeKey: "code", nameKey: "name" },
      },
      { type: "dateRange", fromKey: "fromDate", toKey: "toDate", fromLabel: "From", toLabel: "To" },
    ],
    buttons: ["Party Le...", "Exit", "Clear"],
  },
  "Supplier Ledger": {
    title: "Party Ledger Details",
    subtitle: "SupplierLedeger",
    fields: [
      {
        key: "supplier", label: "Select Supplier", type: "pair",
        lookup: { sourceKey: "Supplier Information", codeKey: "code", nameKey: "name" },
      },
      { type: "dateRange", fromKey: "fromDate", toKey: "toDate", fromLabel: "From", toLabel: "To" },
    ],
    buttons: ["Party Ledger", "Exit", "Clear"],
  },
  "Book Purchase / Binder Ledger": {
    title: "Party Ledger Details",
    subtitle: "Book Purchase/ Binder Ledeger",
    fields: [
      {
        key: "name", label: "Select Name", type: "pair",
        lookup: { sourceKey: "Publication / Binder Information", codeKey: "code", nameKey: "name" },
      },
      { type: "dateRange", fromKey: "fromDate", toKey: "toDate", fromLabel: "From", toLabel: "To" },
    ],
    buttons: ["Purchase Ledger", "Exit", "Clear", "Binder Ledger"],
  },
  "Lamination / Paste / Plate Ledger": {
    title: "Party Ledger Details",
    subtitle: "Plat/Pest/Lamination Ledger",
    fields: [
      {
        key: "plat", label: "Select Plat/Pesting/Lam.", type: "pair",
        lookup: { sourceKey: "Plate / Lamination / Pasting Information", codeKey: "code", nameKey: "name" },
      },
      { type: "dateRange", fromKey: "fromDate", toKey: "toDate", fromLabel: "From", toLabel: "To" },
    ],
    buttons: ["View Report", "Exit", "Clear"],
  },
  "Writer Ledger": {
    title: "Party Ledger Details",
    subtitle: "Writer Ledeger",
    fields: [
      {
        key: "writer", label: "Select Writer", type: "pair",
        lookup: { sourceKey: "Writer Information", codeKey: "code", nameKey: "name" },
      },
      { type: "dateRange", fromKey: "fromDate", toKey: "toDate", fromLabel: "From", toLabel: "To" },
    ],
    buttons: ["Party Ledger", "Exit", "Clear"],
  },
  "Other Expense Ledger": {
    title: "Party Ledger Details",
    subtitle: "Others Ledeger",
    fields: [
      {
        key: "group", label: "Group Name", type: "pair",
        lookup: { sourceKey: "Other Expense Group Name", codeKey: "code", nameKey: "name" },
      },
      {
        key: "expHead", label: "Select Expense Head", type: "pair",
        lookup: { sourceKey: "Other Expense Head Information", codeKey: "code", nameKey: "name" },
      },
      { type: "dateRange", fromKey: "fromDate", toKey: "toDate", fromLabel: "From", toLabel: "To" },
    ],
    buttons: ["Party Le...", "Exit", "Clear"],
  },
  "Employee Ledger": {
    title: "Employee Ledger",
    subtitle: "Employee Ledger",
    fields: [
      {
        key: "employee", label: "Employee Name", type: "pair",
        lookup: { sourceKey: "Employee Information", codeKey: "code", nameKey: "name" },
      },
      { type: "dateRange", fromKey: "fromDate", toKey: "toDate", fromLabel: "From", toLabel: "To" },
    ],
    buttons: ["Preview", "Exit"],
  },
  "Bank Ledger": {
    title: "Bank Statment",
    subtitle: "Bank  Statment",
    fields: [
      {
        key: "bankName", label: "Bank Name", type: "pair",
        lookup: { sourceKey: "Bank Account Information", codeKey: "code", nameKey: "bankName" },
      },
      { type: "dateRange", fromKey: "fromDate", toKey: "toDate", fromLabel: "From", toLabel: "To" },
    ],
    buttons: ["Preview", "Exit"],
  },
  "Loan Party Ledger": {
    title: "Loan Party ledger",
    fields: [
      {
        key: "loanParty", label: "Loan Party", type: "pair",
        lookup: { sourceKey: "Personal Loan Party Information", codeKey: "code", nameKey: "name" },
      },
      { type: "dateRange", fromKey: "fromDate", toKey: "toDate", fromLabel: "From", toLabel: "To" },
    ],
    buttons: ["Preview", "Exit"],
  },
  "Daily Cash Report": {
    title: "Daily Cash",
    subtitle: "Daily Cash Report",
    fields: [
      { key: "date", label: "Date", type: "date" },
    ],
    buttons: ["Preview", "Exit"],
  },
  "Income Expense Ledger": {
    title: "Party Ledger Details",
    subtitle: "Monthly Ledeger",
    underlineSubtitle: true,
    fields: [
      { type: "dateRange", fromKey: "fromDate", toKey: "toDate", fromLabel: "From", toLabel: "To" },
    ],
    buttons: ["Preview", "Exit", "Clear"],
  },
};

/* One field row for a Register/Report search screen -- reuses
   OrderHeaderField for "pair"/"text"/"select"/"date", and handles the
   From/To "dateRange" field inline. */
function ReportField({ field, values, onChange, labelWidth, store, onCascade }) {
  if (field.type === "dateRange") {
    const fromField = (
      <ModernField label={field.fromLabel || "From"} inline labelWidth={labelWidth}>
        <OrderHeaderField field={{ type: "text" }} value={values[field.fromKey]} onChange={(v) => onChange(field.fromKey, v)} />
      </ModernField>
    );
    const toField = (
      <ModernField label={field.toLabel || "To"} inline labelWidth={labelWidth}>
        <OrderHeaderField field={{ type: "text" }} value={values[field.toKey]} onChange={(v) => onChange(field.toKey, v)} />
      </ModernField>
    );
    if (field.stacked) return <div>{fromField}{toField}</div>;
    // Single flex row, not two independently label-padded halves -- splitting
    // into two `labelWidth`-padded halves left almost no room for the actual
    // date box (the fixed label alone could eat most of a half-width column),
    // so the "From" date was getting clipped/invisible. Here only the FIRST
    // label reserves the shared `labelWidth` column (so it still lines up
    // with the field labels above it); the "To" label sizes to its own text,
    // and both date boxes get an equal, generous share of what's left.
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
        <label style={{
          fontSize: 10, fontWeight: 700, color: COLORS.charcoalSoft, flex: `0 0 ${labelWidth}px`,
          whiteSpace: "nowrap", letterSpacing: "0.03em", textTransform: "uppercase",
        }}>{field.fromLabel || "From"}</label>
        <div style={{ flex: 1, minWidth: 90 }}>
          <OrderHeaderField field={{ type: "text" }} value={values[field.fromKey]} onChange={(v) => onChange(field.fromKey, v)} />
        </div>
        <label style={{
          fontSize: 10, fontWeight: 700, color: COLORS.charcoalSoft, flex: "0 0 auto",
          whiteSpace: "nowrap", letterSpacing: "0.03em", textTransform: "uppercase",
        }}>{field.toLabel || "To"}</label>
        <div style={{ flex: 1, minWidth: 90 }}>
          <OrderHeaderField field={{ type: "text" }} value={values[field.toKey]} onChange={(v) => onChange(field.toKey, v)} />
        </div>
      </div>
    );
  }
  return (
    <ModernField label={field.label} inline labelWidth={labelWidth}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <OrderHeaderField field={field} value={values[field.key]} onChange={(v) => onChange(field.key, v)} store={store} onCascade={onCascade} />
        </div>
        {field.hint && <span style={{ fontSize: 11, color: COLORS.charcoalSoft, fontStyle: "italic", whiteSpace: "nowrap" }}>{field.hint}</span>}
      </div>
    </ModernField>
  );
}

/* Renders one of the Register/Report search screens -- a compact card of
   stacked search fields plus a row of action buttons underneath (Preview,
   Clear, Exit, and the odd form-specific action like "Groupwise Sale").
   None of these carry a saved-entries grid -- Preview/Run Report etc. just
   flash a "prototype" toast, matching how the rest of this build stands in
   for the real report engine. */
function ReportSearchForm({ config, store, onClose }) {
  const labelWidth = config.labelWidth || 130;
  const blank = () => {
    const obj = {};
    (config.fields || []).forEach((f) => {
      if (f.type === "dateRange") {
        obj[f.fromKey] = formatShortDate(new Date());
        obj[f.toKey] = formatShortDate(new Date());
      } else {
        obj[f.key] = blankFieldValue(f);
      }
    });
    return obj;
  };
  const [values, setValues] = useState(blank);
  const [msg, setMsg] = useState("");
  const [results, setResults] = useState(null); // only used by liveReport: "bookInformation"
  const flash = (t) => { setMsg(t); setTimeout(() => setMsg(""), 1400); };
  const update = (key, v) => setValues((s) => ({ ...s, [key]: v }));
  // Same fan-out as the Order forms' applyCascade -- e.g. picking a Party
  // Code here auto-fills its saved District too, instead of needing it
  // typed/searched separately.
  const applyCascade = (cascade, rec) => {
    setValues((s) => {
      const next = { ...s };
      cascade.forEach((c) => {
        if (c.type === "pair") {
          const code = rec[c.codeField] || "";
          const name = rec[c.nameField] || "";
          if (code || name) next[c.targetKey] = { code, name };
        } else {
          const val = rec[c.field] || "";
          if (val) next[c.targetKey] = val;
        }
      });
      return next;
    });
  };

  const handle = (b) => {
    if (b === "Exit" || b === "EXIT") return onClose();
    if (b === "Clear") { setValues(blank()); setResults(null); return; }
    if (config.liveReport === "bookInformation" && b === "Run Report") {
      const groupCode = values.group;
      const all = ((store && store["Book Information"]) || []).filter((r) => (r.bookName || "").trim() !== "");
      setResults(groupCode ? all.filter((r) => r.groupCode === groupCode) : all);
      return;
    }
    if (config.liveReport === "partyInformation" && b === "Preview") {
      const distCode = (values.district && values.district.code) || "";
      const all = ((store && store["Party Information"]) || []).filter((r) => (r.partyName || "").trim() !== "");
      const filtered = all.filter((r) => {
        if (distCode && r.districtCode !== distCode) return false;
        if (values.partyType && r.partyType !== values.partyType) return false;
        return true;
      });
      setResults(filtered);
      return;
    }
    if (config.liveReport === "writerInformation" && b === "Preview") {
      const districtCode = (values.district && values.district.code) || "";
      setResults(((store && store["Writer Information"]) || [])
        .filter((r) => (r.name || "").trim() !== "")
        .filter((r) => {
          if (!districtCode) return true;
          const savedCode = r.district && typeof r.district === "object" ? r.district.code : r.districtCode;
          // District master codes are zero-padded (01), while a typed code
          // may be entered as 1. Keep legacy writers without location data
          // visible until they are edited and assigned a District.
          return !savedCode || String(savedCode).replace(/^0+/, "") === String(districtCode).replace(/^0+/, "");
        })
        .filter((r) => !values.contributorType || values.contributorType === "All" || r.contributorType === values.contributorType)
        .map((r, i) => ({ ...r, code: String(i + 1).padStart(2, "0") })));
      return;
    }
    // Party Balance Report: every saved party, with their District and
    // Address alongside the running balance (Op. Balance -- there's no
    // separate ledger of memo-by-memo dues in this prototype yet, so
    // Op. Balance is the party's balance as of now). Filterable by
    // District (type/retype a code, or search-and-pick one) -- leave it
    // blank to see every district.
    if (config.liveReport === "partyBalance" && b === "Preview") {
      const distCode = (values.district && values.district.code) || "";
      const all = ((store && store["Party Information"]) || []).filter((r) => (r.partyName || "").trim() !== "");
      const filtered = distCode ? all.filter((r) => r.districtCode === distCode) : all;
      setResults(filtered);
      return;
    }
    flash(`${b} (prototype)`);
  };

  return (
    <ModalShell title={config.title} onClose={onClose} width={config.modalWidth || 460}>
      {/* handleEnterAsTab (same helper used on the order-entry forms) moves
          focus to the next field on Enter -- this was missing here, so
          pressing Enter after District (or any other field) just did
          nothing instead of advancing to Party / the next field. */}
      <div onKeyDown={handleEnterAsTab}>
      <div style={{ background: COLORS.paperDark, borderRadius: 10, padding: "14px 16px" }}>
        {config.subtitle && (
          <div className="font-display" style={{
            fontWeight: 700, fontSize: 15, color: COLORS.inkDark, marginBottom: 12, textAlign: "center",
            textDecoration: config.underlineSubtitle ? "underline" : "none",
          }}>{config.subtitle}</div>
        )}
        {config.fields.map((f, i) => (
          <ReportField
            key={f.key || f.fromKey || i} field={f} values={values} onChange={update} labelWidth={labelWidth} store={store}
            onCascade={f.lookup && f.lookup.cascade ? (rec) => applyCascade(f.lookup.cascade, rec) : undefined}
          />
        ))}
        {config.fields.length === 0 && (
          <div style={{ fontSize: 12, color: COLORS.charcoalSoft, textAlign: "center", padding: "6px 0 4px" }}>
            No filters needed -- run the report directly.
          </div>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
        {config.buttons.map((b) => (
          <FooterBtn key={b} onClick={() => handle(b)} primary={b !== "Exit" && b !== "EXIT" && b !== "Clear"}>{b}</FooterBtn>
        ))}
      </div>
      {msg && <div style={{ textAlign: "center", marginTop: 9, fontSize: 11.5, color: COLORS.charcoalSoft }}>{msg}</div>}
      {results !== null && config.liveReport === "partyInformation" && (
        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: COLORS.charcoalSoft, marginBottom: 6, letterSpacing: "0.03em", textTransform: "uppercase" }}>
            {results.length} part{results.length === 1 ? "y" : "ies"} found {(values.district && values.district.code) ? "" : "— all districts"}
          </div>
          {results.length === 0 ? (
            <div style={{ fontSize: 12.5, color: COLORS.charcoalSoft, textAlign: "center", padding: "10px 0" }}>
              No parties saved for this selection yet.
            </div>
          ) : (
            <div style={{ border: `1.5px solid ${COLORS.paperLine}`, borderRadius: 10, maxHeight: 260, overflow: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ background: COLORS.paperDark, position: "sticky", top: 0 }}>
                    <th style={thStyle}>Code</th>
                    <th style={thStyle}>Party Name</th>
                    {!(values.district && values.district.code) && <th style={thStyle}>District</th>}
                    <th style={thStyle}>Address</th>
                    <th style={thStyle}>Type</th>
                    <th style={thStyle}>Phone</th>
                    <th style={thStyle}>Op. Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr key={i}>
                      <td style={tdStyle}>{r.partyCode || "—"}</td>
                      <td style={tdStyle}>{r.partyName || "—"}</td>
                      {!(values.district && values.district.code) && <td style={tdStyle}>{r.districtName || "—"}</td>}
                      <td style={tdStyle}>{r.address || "—"}</td>
                      <td style={tdStyle}>{r.partyType || "—"}</td>
                      <td style={tdStyle}>{r.phone || "—"}</td>
                      <td style={tdStyle}>{r.opBalance || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      {results !== null && config.liveReport === "partyBalance" && (
        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: COLORS.charcoalSoft, marginBottom: 6, letterSpacing: "0.03em", textTransform: "uppercase" }}>
            {results.length} part{results.length === 1 ? "y" : "ies"} found {(values.district && values.district.code) ? "" : "— all districts"}
          </div>
          {results.length === 0 ? (
            <div style={{ fontSize: 12.5, color: COLORS.charcoalSoft, textAlign: "center", padding: "10px 0" }}>
              No parties saved for this selection yet.
            </div>
          ) : (
            <div style={{ border: `1.5px solid ${COLORS.paperLine}`, borderRadius: 10, maxHeight: 260, overflow: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ background: COLORS.paperDark, position: "sticky", top: 0 }}>
                    <th style={thStyle}>Code</th>
                    <th style={thStyle}>Party Name</th>
                    <th style={thStyle}>District</th>
                    <th style={thStyle}>Address</th>
                    <th style={thStyle}>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr key={i}>
                      <td style={tdStyle}>{r.partyCode || "—"}</td>
                      <td style={tdStyle}>{r.partyName || "—"}</td>
                      <td style={tdStyle}>{r.districtName || "—"}</td>
                      <td style={tdStyle}>{r.address || "—"}</td>
                      <td style={tdStyle}>{r.opBalance || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      {results !== null && config.liveReport === "writerInformation" && (
        results.length === 0 ? (
          <div style={{ marginTop: 14, padding: "14px 10px", border: `1.5px solid ${COLORS.paperLine}`, borderRadius: 10, color: COLORS.charcoalSoft, textAlign: "center", fontSize: 12.5 }}>
           no writers saved for this selection yet.
          </div>
        ) : (
          <div style={{ marginTop: 14, border: `1.5px solid ${COLORS.paperLine}`, borderRadius: 10, maxHeight: "calc(100vh - 300px)", overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead><tr style={{ background: COLORS.paperDark }}><th style={thStyle}>Code</th><th style={thStyle}>Name</th><th style={thStyle}>Division</th><th style={thStyle}>District Code</th><th style={thStyle}>District Name</th><th style={thStyle}>Contributor Type</th><th style={thStyle}>Phone</th><th style={thStyle}>Email</th></tr></thead>
              <tbody>{results.map((r, i) => {
                const district = r.district && typeof r.district === "object" ? r.district : { code: r.districtCode, name: r.districtName || r.district };
                return <tr key={i}><td style={tdStyle}>{r.code || "—"}</td><td style={tdStyle}>{r.name || "—"}</td><td style={tdStyle}>{r.division || "—"}</td><td style={tdStyle}>{district.code || "—"}</td><td style={tdStyle}>{district.name || "—"}</td><td style={tdStyle}>{r.contributorType || "—"}</td><td style={tdStyle}>{r.phone || "—"}</td><td style={tdStyle}>{r.email || "—"}</td></tr>;
              })}</tbody>
            </table>
          </div>
        )
      )}
      {results !== null && config.liveReport !== "partyInformation" && config.liveReport !== "partyBalance" && config.liveReport !== "writerInformation" && (
        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: COLORS.charcoalSoft, marginBottom: 6, letterSpacing: "0.03em", textTransform: "uppercase" }}>
            {results.length} book{results.length === 1 ? "" : "s"} found {values.group ? "" : "— all groups"}
          </div>
          {results.length === 0 ? (
            <div style={{ fontSize: 12.5, color: COLORS.charcoalSoft, textAlign: "center", padding: "10px 0" }}>
              No books saved for this selection yet.
            </div>
          ) : (
            <div style={{ border: `1.5px solid ${COLORS.paperLine}`, borderRadius: 10, maxHeight: 260, overflow: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ background: COLORS.paperDark, position: "sticky", top: 0 }}>
                    {!values.group && <th style={thStyle}>Group</th>}
                    <th style={thStyle}>Book Name</th>
                    <th style={thStyle}>Writer</th>
                    <th style={thStyle}>Rate</th>
                    <th style={thStyle}>Com.</th>
                    <th style={thStyle}>Open Bal.</th>
                    <th style={thStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr key={i}>
                      {!values.group && <td style={tdStyle}>{r.groupName || "—"}</td>}
                      <td style={tdStyle}>{r.bookName || "—"}</td>
                      <td style={tdStyle}>{r.writer || "—"}</td>
                      <td style={tdStyle}>{r.rate || "—"}</td>
                      <td style={tdStyle}>{r.com || "—"}</td>
                      <td style={tdStyle}>{r.openBalance || "—"}</td>
                      <td style={tdStyle}>{r.status || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      </div>
    </ModalShell>
  );
}

/* Turns a header field's value into one short display string for the saved
   entries list -- pair/triple lookup fields show their name (falling back
   to code), everything else shows as-is. */
function summarizeHeaderValue(field, value) {
  if (field.type === "pair" || field.type === "triple") return (value && (value.name || value.code)) || "—";
  return value || "—";
}

/* Compact "saved entries" list under an Order form, same idea as the Setup
   module's RecordsList -- click the pencil to load an entry back in for
   editing, or the X to remove it. */
function OrderRecordsList({ records, columns, activeIdx, onEdit, onDelete }) {
  if (!records.length) return null;
  return (
    <div style={{ marginBottom: 10, flex: "0 0 auto" }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, color: COLORS.charcoalSoft, marginBottom: 4, letterSpacing: "0.03em", textTransform: "uppercase" }}>
        Saved Entries ({records.length}) — click ✎ to edit a mistake
      </div>
      <div style={{ border: `1.5px solid ${COLORS.paperLine}`, borderRadius: 9, maxHeight: 150, overflowY: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: COLORS.paperDark, position: "sticky", top: 0 }}>
              {columns.map((c) => <th key={c.key} style={thStyle}>{c.label}</th>)}
              <th style={{ ...thStyle, width: 60, textAlign: "center" }}></th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i} style={{ background: i === activeIdx ? `${COLORS.ink}1a` : undefined }}>
                {columns.map((c) => (
                  <td key={c.key} style={{ ...tdStyle, maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {summarizeHeaderValue(c, r.header[c.key])}
                  </td>
                ))}
                <td style={{ ...tdStyle, textAlign: "center" }}>
                  <button onClick={() => onEdit(i)} title="Edit" style={{ background: "none", border: "none", color: COLORS.inkDark, cursor: "pointer", marginRight: 8 }}>
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => onDelete(i)} title="Delete" style={{ background: "none", border: "none", color: "#c0392b", cursor: "pointer" }}>
                    <X size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* One generic navigable entry form that drives all 8 Order screens above --
   header fields on top, an editable line grid (Save auto-appends a fresh
   blank row), a saved-entries list to add new / edit a mistake, plus
   First/Next/Previous/Last to page through saved entries. */
function OrderEntryForm({ config, records, setRecords, store, preparedBy, onClose }) {
  // Group header fields into rows on each `newRow` marker so every row
  // renders as its own single-line flex container (see body below) --
  // this is what makes fields like Party Code / Address / Sales Type /
  // Publication sit on one line together instead of wrapping unpredictably.
  const headerRows = [];
  config.headerFields.forEach((f) => {
    if (f.newRow || headerRows.length === 0) headerRows.push([]);
    headerRows[headerRows.length - 1].push(f);
  });

  // A header/footer field flagged `autoSerial: { pad }` (Memo No, Payment
  // No) starts life on a fresh/blank entry already filled with the next
  // zero-padded serial -- 000001, 000002, ... -- counted up from the
  // highest value already used across every saved entry for this form, the
  // same way Group Code / Book Code auto-number on the Book Entry Form.
  const blankHeader = () => Object.fromEntries(config.headerFields.map((f) => [
    f.key,
    f.autoSerial ? nextSerial(records.map((r) => (r && r.header) || {}), f.key, f.autoSerial.pad || 6) : blankFieldValue(f),
  ]));
  const blankRows = () =>
    Array.from({ length: (config.grid && config.grid.initialRows) || 0 }, () =>
      Object.fromEntries((config.grid ? config.grid.columns : []).map((c) => [c.key, ""]))
    );
  const blankFooter = () =>
    Object.fromEntries(
      [...(config.footerPanels || []).flatMap((p) => p.fields), ...(config.extraField ? [config.extraField] : [])].flatMap((f) => {
        if (f.type === "pctAmount") return [[f.pctKey, ""]];
        if (f.compute) return [];
        if (f.autoSerial) return [[f.key, nextSerial(records.map((r) => (r && r.footer) || {}), f.key, f.autoSerial.pad || 6)]];
        // f.default lets a footer field (e.g. Pay Mode) start pre-selected --
        // same convention as blankFieldValue's f.default for header fields.
        return [[f.key, f.type === "pair" ? { code: "", name: "" } : (f.default !== undefined ? f.default : "")]];
      })
    );

  const [header, setHeader] = useState(blankHeader);
  const [rows, setRows] = useState(blankRows);
  const [footer, setFooter] = useState(blankFooter);
  const [idx, setIdx] = useState(-1); // -1 = new / unsaved entry
  const [msg, setMsg] = useState("");
  const [search, setSearch] = useState("");
  // Dropdown of saved entries under the Search box (see body below) --
  // open while the box has focus, closed on blur/Escape/picking one.
  const [showSearchList, setShowSearchList] = useState(false);
  const gridBoxRef = useRef(null);
  const justAddedRow = useRef(false);
  // The grid's very first input (row 0, column 0 -- Qty on Sales Memo
  // Bookwise). A header field's lookup can flag `jumpToGrid: true` (see
  // Party Code below) to send focus straight here once it resolves,
  // instead of tabbing through District / Address / Sales Type / Publication.
  const gridFirstCellRef = useRef(null);
  // Tracks whichever grid row currently holds the cursor (updated on focus
  // of any cell in that row -- see the grid <td> below), so "Delete Line"
  // removes THAT row instead of always the last one.
  const activeRowRef = useRef(0);
  // Which grid cell's Enter/F9 search popup (List of Values) is currently
  // open, if any -- e.g. { ri: 2, colKey: "bookCode", triggerEl } for Book
  // Code on row 2. triggerEl is the <input> that opened it, so the picked
  // value can hand focus on to the next field the same way a header "pair"
  // lookup field's popup does (see focusNextFocusable).
  const [gridLov, setGridLov] = useState(null);
  // The Save button's own DOM node -- so a field flagged `focusSaveOnEnter`
  // (Paid Amount, on Sales Memo Bookwise) can send focus straight to it on
  // Enter, instead of tabbing on to whichever field happens to sit next in
  // the DOM (Ext.com% / Less / Packing).
  const saveButtonRef = useRef(null);

  const flash = (t) => { setMsg(t); setTimeout(() => setMsg(""), 1400); };

  // Only the line-grid scrolls (header fields & Save/Exit buttons stay put).
  // A freshly auto-added row scrolls into view -- the earlier rows glide up
  // out of sight -- while switching/loading a saved entry resets to the top.
  useEffect(() => {
    if (justAddedRow.current && gridBoxRef.current) {
      gridBoxRef.current.scrollTo({ top: gridBoxRef.current.scrollHeight, behavior: "smooth" });
    }
    justAddedRow.current = false;
  }, [rows.length]);
  useEffect(() => {
    if (gridBoxRef.current) gridBoxRef.current.scrollTop = 0;
  }, [idx]);

  const loadEntry = (i) => {
    const e = records[i];
    if (!e) return;
    setHeader({ ...blankHeader(), ...e.header });
    setRows(e.rows && e.rows.length ? e.rows.map((r) => ({ ...r })) : blankRows());
    setFooter({ ...blankFooter(), ...(e.footer || {}) });
    setIdx(i);
  };

  const updateHeader = (key, val) => setHeader((h) => ({ ...h, [key]: val }));
  /* Fans a single lookup (e.g. the Party Code match) out to several other
     header fields at once -- see the `cascade` entries on Sales Memo
     Bookwise's Party Code field (District, Address, Previous Dues).
     Only ever overwrites a target with something the matched record
     actually has -- a Party record that was saved without a District (or
     any other cascaded field) leaves whatever's already sitting in that
     box alone, instead of blanking out a value the person already typed
     in themselves before picking the Party Code. */
  const applyCascade = (cascade, rec) => {
    setHeader((h) => {
      const next = { ...h };
      cascade.forEach((c) => {
        if (c.type === "pair") {
          const code = rec[c.codeField] || "";
          const name = rec[c.nameField] || "";
          if (code || name) next[c.targetKey] = { code, name };
        } else {
          const val = rec[c.field] || "";
          if (val) next[c.targetKey] = val;
        }
      });
      return next;
    });
  };
  const updateCell = (ri, key, val) => {
    setRows((rs) => {
      const next = rs.map((r, i) => (i === ri ? { ...r, [key]: val } : r));
      if (config.grid && ri === next.length - 1 && val) {
        next.push(Object.fromEntries(config.grid.columns.map((c) => [c.key, ""])));
        justAddedRow.current = true;
      }
      return next;
    });
  };
  /* Same as updateCell, but patches several columns of one row at once --
     used by a `gridLookup.fields` match (Book Code -> Book Name / Stock /
     Net Rate / Com / Sale Rate) so it's a single state update instead of one
     per column. */
  const updateCells = (ri, patch) => {
    setRows((rs) => {
      const next = rs.map((r, i) => (i === ri ? { ...r, ...patch } : r));
      if (config.grid && ri === next.length - 1 && Object.values(patch).some((v) => v)) {
        next.push(Object.fromEntries(config.grid.columns.map((c) => [c.key, ""])));
        justAddedRow.current = true;
      }
      return next;
    });
  };
  /* Runs a grid column's gridLookup (e.g. Book Code -> Book Name / Stock /
     Net Rate / Com / Sale Rate). codeKey matches the saved record's own
     stored code field (e.g. bookCode) when given -- the reliable match,
     since it works no matter which Group the book was saved under. Without
     a codeKey it falls back to matching by on-screen row position, for any
     older/simpler gridLookup config that doesn't set one. Returns true/false
     so the Enter/F9 handler below knows whether the typed code actually
     matched -- on a miss it falls back to the search popup, same as a
     header "pair" lookup field does. */
  const runGridLookup = (gridLookup, ri, code) => {
    if (gridLookup.fields) {
      const rec = gridLookup.codeKey
        ? lookupFullRecord(store, { sourceKey: gridLookup.sourceKey, codeKey: gridLookup.codeKey, nameKey: gridLookup.nameKey }, code)
        : lookupRowBySerial(store, gridLookup.sourceKey, code);
      if (rec) {
        const patch = {};
        Object.entries(gridLookup.fields).forEach(([targetKey, srcKey]) => { patch[targetKey] = rec[srcKey] || ""; });
        updateCells(ri, patch);
        return true;
      }
      return false;
    }
    const found = lookupBySerial(store, gridLookup.sourceKey, gridLookup.nameKey, code);
    if (found !== null) { updateCell(ri, gridLookup.targetKey, found); return true; }
    return false;
  };
  const removeRow = (ri) => setRows((rs) => (rs.length > 1 ? rs.filter((_, i) => i !== ri) : rs));

  const rowsWithTotal = (rs) => {
    if (!config.grid) return rs;
    let out = rs;
    if (config.grid.autoTotal) {
      const { qtyKey, rateKey, totalKey } = config.grid.autoTotal;
      out = out.map((r) => {
        const q = parseFloat(r[qtyKey]) || 0;
        const rate = parseFloat(r[rateKey]) || 0;
        return { ...r, [totalKey]: q && rate ? String(q * rate) : r[totalKey] || "" };
      });
    }
    const computeCols = config.grid.columns.filter((c) => c.compute);
    if (computeCols.length) {
      out = out.map((r) => {
        const rr = { ...r };
        computeCols.forEach((c) => { rr[c.key] = fmtNum(c.compute(rr)); });
        return rr;
      });
    }
    return out;
  };

  const displayRows = rowsWithTotal(rows);
  const grandTotal = config.grid && config.grid.autoTotal
    ? displayRows.reduce((s, r) => s + (parseFloat(r[config.grid.autoTotal.totalKey]) || 0), 0)
    : null;
  const footerCtx = { rows: displayRows, header, footer, records };

  const doSearch = () => {
    const q = search.trim().toLowerCase();
    if (!q) return;
    const found = records.findIndex((r) =>
      Object.values(r.header || {}).some((v) => {
        const s = v && typeof v === "object" ? `${v.code || ""} ${v.name || ""}` : String(v || "");
        return s.toLowerCase().includes(q);
      })
    );
    if (found >= 0) loadEntry(found); else flash("Not found");
  };
  // Search-box dropdown: one label per saved entry, built from whichever
  // header field is this form's own primary running number (Memo No,
  // Return No, ... -- the autoSerial'd field, same one shown/incremented
  // on a blank entry) plus the Party Code's name if this form has one, so
  // e.g. Sales Memo Bookwise shows "000006 -- Karim Book Depot" instead of
  // a bare number. Falls back to "Entry N" for a form with neither.
  const primarySearchField = config.headerFields.find((f) => f.autoSerial) || (config.footerPanels || []).flatMap((p) => p.fields || []).find((f) => f.autoSerial);
  // hideSearchPartyName (Sales Memo Bookwise) keeps this list to the bare
  // Memo No -- no "-- Party Name" suffix -- instead of every form's default.
  const partySearchField = config.hideSearchPartyName ? null : config.headerFields.find((f) => f.key === "party");
  const searchCandidates = records.map((r, i) => {
    const primary = primarySearchField ? (r.header && r.header[primarySearchField.key]) || "" : "";
    const partyName = partySearchField ? ((r.header && r.header[partySearchField.key] && r.header[partySearchField.key].name) || "") : "";
    const label = [primary, partyName].filter(Boolean).join(" — ") || `Entry ${i + 1}`;
    return { i, label };
  });
  const filteredSearchCandidates = (() => {
    const q = search.trim().toLowerCase();
    const list = q ? searchCandidates.filter((c) => c.label.toLowerCase().includes(q)) : searchCandidates;
    return list.slice(0, 30);
  })();
  const pickSearchCandidate = (i) => { loadEntry(i); setSearch(""); setShowSearchList(false); };

  const handleSave = () => {
    const cleanRows = config.grid
      ? displayRows.filter((r) => config.grid.columns.some((c) => String(r[c.key] || "").trim()))
      : [];
    const entry = { header: { ...header }, rows: cleanRows, footer: { ...footer } };
    const wasNew = idx < 0;
    setRecords((rs) => (wasNew ? [...rs, entry] : rs.map((r, i) => (i === idx ? entry : r))));
    if (wasNew) setIdx(records.length);
    flash("Saved successfully");
  };
  const handleCancel = () => { setHeader(blankHeader()); setRows(blankRows()); setFooter(blankFooter()); setIdx(-1); };
  const handleDelete = () => {
    if (idx < 0 || idx >= records.length) return;
    setRecords((rs) => rs.filter((_, i) => i !== idx));
    setHeader(blankHeader()); setRows(blankRows()); setFooter(blankFooter()); setIdx(-1);
    flash("Deleted");
  };
  // First/Previous/Next/Last page through the saved records -- flash a
  // message when there's nothing to page to (empty list, already at an
  // end) instead of silently doing nothing, which otherwise looks
  // indistinguishable from the button being broken.
  const goFirst = () => {
    if (!records.length) { flash("No saved records yet"); return; }
    loadEntry(0);
  };
  const goLast = () => {
    if (!records.length) { flash("No saved records yet"); return; }
    // Always jumps to whatever is currently the LAST saved record --
    // records.length - 1 is re-read fresh every click, so a memo saved a
    // moment ago is picked up immediately, not just whatever was last
    // when the form first opened.
    loadEntry(records.length - 1);
  };
  const goNext = () => {
    if (!records.length) { flash("No saved records yet"); return; }
    if (idx >= 0 && idx >= records.length - 1) { flash("Already at the last record"); return; }
    loadEntry(Math.min((idx < 0 ? records.length - 1 : idx) + 1, records.length - 1));
  };
  const goPrevious = () => {
    if (!records.length) { flash("No saved records yet"); return; }
    if (idx === 0) { flash("Already at the first record"); return; }
    loadEntry(Math.max((idx < 0 ? 0 : idx) - 1, 0));
  };
  // Clears ONLY the row the cursor is currently sitting in (tracked via
  // activeRowRef, updated on focus of any cell -- see the grid below) --
  // resets that row's Book Code / Book Name / Qty / etc back to blank, but
  // keeps the row itself in place. Previously this spliced the row out of
  // the array entirely, which shifted every row below it up by one --
  // "Delete Line" should only ever blank out the line under the cursor,
  // never delete the row/line from the table.
  const handleDeleteLine = () => {
    if (!config.grid) return;
    setRows((rs) => {
      const ri = Math.min(Math.max(activeRowRef.current, 0), rs.length - 1);
      const blankRow = Object.fromEntries(config.grid.columns.map((c) => [c.key, ""]));
      return rs.map((r, i) => (i === ri ? blankRow : r));
    });
  };
  // Wipes the ENTIRE memo -- header, every line, footer/payment fields --
  // and, if this was an already-saved memo (idx >= 0), removes it from the
  // saved records too, same as the "Delete" button. Previously this only
  // cleared the grid rows, leaving the header/footer (and the saved record
  // itself, if any) untouched.
  const handleDeleteMemo = () => {
    if (idx >= 0 && idx < records.length) {
      setRecords((rs) => rs.filter((_, i) => i !== idx));
      flash("Memo deleted");
    } else {
      flash("Memo cleared");
    }
    setHeader(blankHeader()); setRows(blankRows()); setFooter(blankFooter()); setIdx(-1);
  };
  const handleSlip = () => flash("Slip sent to printer (prototype)");

  // Reads every footerPanels field's current/computed value into a flat
  // {key: value} map (Total Price, Sub Total, Net Bill, Dues, Remarks,
  // Transport Name, ... whatever this config defines) -- the three print
  // handlers below build their layouts off this instead of re-deriving
  // each total by hand.
  const getFooterComputedMap = () => {
    const map = {};
    (config.footerPanels || []).forEach((p) => (p.fields || []).forEach((f) => {
      if (f.type === "pctAmount") { map[f.pctKey] = footer[f.pctKey] || ""; map[`${f.pctKey}Amt`] = f.amtCompute(footerCtx); return; }
      if (f.compute) { map[f.key] = f.compute(footerCtx); return; }
      map[f.key] = footer[f.key];
    }));
    return map;
  };
  // Computed columns turn blank template rows into numeric "0" values, so
  // checking every column would incorrectly print a stack of empty rows.
  // A printable book row must have an entered book, code, or quantity.
  const savedRowsForPrint = () => displayRows.filter((r) => (
    String(r.bookName || r.bookCode || r.qty || "").trim() !== ""
  ));

  /* Cash Memo Print -- the customer-facing bill: books sold with rate/total,
     then the same Total / Ext.com / Sub Total / Less / Packing / Net Bill /
     Dues cascade shown on-screen, plus Manager/Delivery signature lines. */
  const handleCashMemoPrint = (documentTitle = "Cash Memo") => {
    const fc = getFooterComputedMap();
    const rows = savedRowsForPrint();
    const totalQty = rows.reduce((s, r) => s + (parseFloat(r.qty) || 0), 0);
    const rowsHtml = rows.map((r) => `
      <tr>
        <td class="num">${bnInt(r.qty)}</td>
        <td>${escapeHtml(r.bookName)}</td>
        <td class="num">${bnMoney(r.netRate)}</td>
        <td class="num">${bnMoney(r.saleRate)}</td>
        <td class="num">${bnMoney(r.total)}</td>
      </tr>`).join("");
    const salesTypeBn = SALES_TYPE_BN[header.salesType] || escapeHtml(header.salesType || "");
    const memoNo = header.memoNo ? `SL-${header.memoNo}` : "";
    const due = (parseFloat(fc.netBill) || 0) - (parseFloat(fc.paidAmount) || 0);
    const transportName = (fc.transportName && fc.transportName.name) || "";
    const now = new Date();

    const body = `
      <div class="bn-shell"><div class="bn-paper">
      <div class="bn-headrow">
        <div class="bn-headrow-left">
          <span><span class="bn-tag">নাম</span>${salesTypeBn}</span>
          <span class="bn-serial-chip">১</span>
        </div>
        <div><span class="bn-memo-tag">মেমো নং</span><span class="bn-memo-val">${escapeHtml(memoNo)}</span></div>
      </div>
      <div class="bn-infogrid">
        <div class="bn-cell"><div class="bn-cell-label">ঠিকানা</div><div class="bn-cell-value">${escapeHtml(header.address)}</div></div>
        <div class="bn-cell"><div class="bn-cell-label">তারিখ</div><div class="bn-cell-value">${bnDate(header.date)}</div></div>
        <div></div>
        <div class="bn-cell"><div class="bn-cell-label">Prepared by</div><div class="bn-cell-value">${escapeHtml(preparedBy || "admin")}</div></div>
      </div>
      <table class="bn-table">
        <thead>
          <tr><th>পরিমাণ</th><th>বইয়ের নাম</th><th>মুদ্রিত মূল্য</th><th>বিক্রয় মূল্য</th><th>মোট টাকা</th></tr>
        </thead>
        <tbody>${rowsHtml || `<tr><td colspan="5" style="text-align:center;color:#93a0a5;">কোনো বই যোগ করা হয়নি</td></tr>`}</tbody>
        <tfoot>
          <tr class="bn-total-row">
            <td>${bnInt(totalQty)}</td>
            <td colspan="3" style="text-align:right;">মোট :</td>
            <td class="num">${bnMoney(fc.totalPrice)}</td>
          </tr>
        </tfoot>
      </table>
      <div class="bn-below">
        <div class="bn-notes">
          <div class="note-line">ট্রান্সপোর্ট<span class="fill">${escapeHtml(transportName)}</span></div>
          <div class="note-line">মন্তব্য<span class="fill">${escapeHtml(fc.remarks || "")}</span></div>
          <div class="bn-sign"><div>ম্যানেজার</div><div>ডেলিভারি</div></div>
        </div>
        <table class="bn-summary">
          <tbody>
            <tr><td>কমিশন</td><td>:</td><td>${bnMoney(fc.extComAmt)}</td></tr>
            <tr><td>প্যাকেট খরচ</td><td>:</td><td>${bnMoney(fc.packing)}</td></tr>
            <tr><td>ছাড়</td><td>:</td><td>${bnMoney(fc.less)}</td></tr>
            <tr class="bn-rule bn-strong"><td>অবশিষ্ট</td><td>:</td><td>${bnMoney(fc.netBill)}</td></tr>
            <tr class="bn-strong"><td>জমা</td><td>:</td><td>${bnMoney(fc.paidAmount)}</td></tr>
            <tr class="bn-strong"><td>বাকি</td><td>:</td><td>${bnMoney(due)}</td></tr>
            <tr><td>পূর্বের বকেয়া</td><td>:</td><td>${bnMoney(header.previousDues)}</td></tr>
            <tr class="bn-rule bn-strong"><td>মোট বকেয়া</td><td>:</td><td>${bnMoney(fc.dues)}</td></tr>
          </tbody>
        </table>
      </div>
      <div class="bn-footer">
        <div>${escapeHtml(formatDhakaDate(now).replace(",", ""))} ${escapeHtml(formatDhakaTime(now))}</div>
        <div>Page 1 of 1</div>
      </div>
      </div></div>
    `;




    if (!openPrintWindow(`${documentTitle} - ${memoNo}`, body, CASH_MEMO_BN_STYLE)) flash("Please allow pop-ups to print");
  };

  // Challan Due intentionally uses the exact same compact Bengali invoice
  // layout as Cash Memo Print; only the document title changes.
  const handleChallanDue = () => handleCashMemoPrint("Challan Due");

  /* Booking Slip -- handed to the transport company: who/where it's going,
     transport name, packet count and total book qty, plus any booking
     remarks -- deliberately no prices, since a courier doesn't need them. */
  const handleBookingSlip = () => {
    const fc = getFooterComputedMap();
    const partyName = (header.party && header.party.name) || "";
    const districtName = (header.district && header.district.name) || "";
    const transportName = (fc.transportName && fc.transportName.name) || "";
    const totalQty = savedRowsForPrint().reduce((s, r) => s + (parseFloat(r.qty) || 0), 0);
    const body = `
      <div class="doc-title">Booking Slip</div>
      <div class="doc-sub">Transport Booking -- ${escapeHtml(config.publisherName || "Namlipi Prokashoni")}</div>
      <div class="hdr-row"><div><b>Memo No:</b> ${escapeHtml(header.memoNo)}</div><div><b>Date:</b> ${escapeHtml(header.date)}</div></div>
      <div class="hdr-row"><div><b>Consignee (Party):</b> ${escapeHtml(partyName)}</div><div><b>District:</b> ${escapeHtml(districtName)}</div></div>
      <div class="hdr-row"><div><b>Address:</b> ${escapeHtml(header.address)}</div></div>
      <div class="hdr-row"><div><b>Transport:</b> ${escapeHtml(transportName)}</div><div><b>Packet Qty:</b> ${escapeHtml(fc.packetQty)}</div></div>
      <div class="hdr-row"><div><b>Total Book Qty:</b> ${fmtNum(totalQty)}</div></div>
      ${fc.bookingRemarks ? `<div class="remarks"><b>Booking Remarks:</b> ${escapeHtml(fc.bookingRemarks)}</div>` : ""}
      <div class="sign-row"><div>Sender</div><div>Transport / Booking Officer</div></div>
    `;
    if (!openPrintWindow(`Booking Slip - ${header.memoNo || ""}`, body)) flash("Please allow pop-ups to print");
  };

  const BUTTON_HANDLERS = {
    Save: { fn: handleSave, primary: true },
    Cancel: { fn: handleCancel },
    Clear: { fn: handleCancel },
    Exit: { fn: onClose },
    First: { fn: goFirst },
    Next: { fn: goNext },
    Previous: { fn: goPrevious },
    Last: { fn: goLast },
    Delete: { fn: handleDelete, danger: true },
    "Delete Line": { fn: handleDeleteLine, danger: true },
    "Line Delete": { fn: handleDeleteLine, danger: true },
    "Delete memo": { fn: handleDeleteMemo, danger: true },
    "Cash Memo Print": { fn: handleCashMemoPrint },
    "Challan Due": { fn: handleChallanDue },
    "Booking Slip": { fn: handleBookingSlip },
    Slip: { fn: handleSlip },
    SLIP: { fn: handleSlip },
    Print: { fn: handleSlip, primary: true },
  };

  const renderFooterField = (f) => {
    if (f.type === "pctAmount") {
      return (
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <input
            type="number" style={{ ...inputStyle, width: 62, flex: "0 0 auto" }}
            value={footer[f.pctKey] || ""}
            onChange={(e) => setFooter((s) => ({ ...s, [f.pctKey]: e.target.value }))}
          />
          <span style={{ fontSize: 11.5, color: COLORS.charcoalSoft }}>%</span>
          <input readOnly disabled style={{ ...autoFieldStyle, flex: 1 }} value={fmtNum(f.amtCompute(footerCtx))} />
        </div>
      );
    }
    if (f.compute) {
      return <input readOnly disabled style={autoFieldStyle} value={fmtNum(f.compute(footerCtx))} />;
    }
    if (f.type === "pair") {
      return <OrderHeaderField field={f} value={footer[f.key]} onChange={(v) => setFooter((s) => ({ ...s, [f.key]: v }))} />;
    }
    return (
      <FieldInput
        field={f}
        value={footer[f.key]}
        onChange={(v) => setFooter((s) => ({ ...s, [f.key]: v }))}
        onKeyDown={f.focusSaveOnEnter ? (e) => {
          if (e.key !== "Enter") return;
          e.preventDefault();
          e.stopPropagation(); // don't let handleEnterAsTab also run
          if (saveButtonRef.current) saveButtonRef.current.focus();
        } : undefined}
      />
    );
  };

  const body = (
    <div onKeyDown={handleEnterAsTab}>
      {/* Header fields + Search: normal (non-sticky) block. An earlier sticky
          version of this box overlapped and hid the grid's own column-header
          row right below it, so this stays in normal flow -- only the title
          bar and the Save/Exit button row (further down) stay pinned. */}
      <div className="order-header-stack" style={{
        display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 2,
      }}>
        <div style={{
          display: "flex", flexDirection: "column",
          gap: config.compactHeader ? 4 : 6,
          marginBottom: config.compactHeader ? 6 : 10,
          flex: "1 1 auto", minWidth: 0,
        }}>
          {/* Fields are grouped into rows on each `newRow` marker, and each
              row gets its own nowrap flex line -- CSS grid-like behaviour
              (`auto 1fr auto auto`) via flexbox: fixed-width fields keep
              their hw, and any field marked `grow` stretches to fill the
              remaining space in its row instead of being squeezed or
              wrapping onto the next line. */}
          {headerRows.map((row, ri) => (
            <div key={ri} style={{
              display: "flex", flexWrap: "wrap",
              gap: config.compactHeader ? "0 10px" : "0 16px",
              /* "stretch" (not "flex-end") so every field column takes the
                 full height of the tallest field in the row -- fields with
                 an `inlineLabel` (label beside the input, e.g. Address) end
                 up shorter overall than fields with a stacked label-above
                 layout (e.g. Party Code, Sales Type), so aligning by the
                 *container's* bottom edge doesn't reliably line up the
                 *input boxes'* bottom edges. Stretching first, then pinning
                 each field's own content to the bottom (see justifyContent
                 below) guarantees the inputs align regardless of label
                 layout or height differences between an <input>, <select>,
                 or auto-growing <textarea>. */
              alignItems: "stretch",
            }}>
              {row.map((f) => (
                <div
                  key={f.key}
                  style={{
                    display: "flex", flexDirection: "column", justifyContent: "flex-end",
                    flex: f.wide
                      ? "1 1 100%"
                      : f.grow
                        ? `${f.grow === true ? 1 : f.grow} 1 160px`
                        : `0 0 ${f.hw || (config.compactHeader ? 150 : 200)}px`,
                    minWidth: f.grow ? 140 : undefined,
                  }}
                >
                  <ModernField label={f.label} compact={config.compactHeader} inline={f.inlineLabel}>
                    <OrderHeaderField
                      field={f} value={header[f.key]} onChange={(v) => updateHeader(f.key, v)} store={store}
                      onCascade={f.lookup && f.lookup.cascade ? (rec) => applyCascade(f.lookup.cascade, rec) : undefined}
                      onLookupComplete={f.lookup && f.lookup.jumpToGrid ? () => {
                        const el = gridFirstCellRef.current;
                        if (el) { el.focus(); if (el.select) el.select(); }
                      } : undefined}
                    />
                  </ModernField>
                </div>
              ))}
            </div>
          ))}
        </div>
        {config.searchable && (
          <div className="order-search-panel" style={{ flex: "0 0 190px", position: "relative" }}>
            <ModernField label={config.searchLabel || "Search"} compact={config.compactHeader}>
              <div style={{ display: "flex", gap: 6 }}>
                <input
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setShowSearchList(true); }}
                  onFocus={() => setShowSearchList(true)}
                  // A plain onBlur would close the list before a click on one
                  // of its items ever registers -- the short delay lets that
                  // click (see pickSearchCandidate below) land first.
                  onBlur={() => setTimeout(() => setShowSearchList(false), 150)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") doSearch();
                    if (e.key === "Escape") setShowSearchList(false);
                  }}
                  style={inputStyle}
                />
                <FooterBtn onClick={doSearch}>{config.searchLabel || "Search"}</FooterBtn>
              </div>
            </ModernField>
            {/* Dropdown of previously saved entries -- opens on focus/typing,
                picking one loads it into the form the same way typing its
                number and pressing Search does. */}
            {showSearchList && searchCandidates.length > 0 && (
              <div style={{
                position: "absolute", top: "100%", left: 0, right: 0, zIndex: 20,
                marginTop: 2, maxHeight: 220, overflowY: "auto",
                background: COLORS.cream, border: `1.5px solid ${COLORS.paperLine}`, borderRadius: 8,
                boxShadow: "0 12px 24px rgba(0,0,0,0.18)",
              }}>
                {filteredSearchCandidates.length === 0 ? (
                  <div style={{ padding: "8px 10px", fontSize: 11.5, color: COLORS.charcoalSoft }}>No matches</div>
                ) : (
                  filteredSearchCandidates.map((c) => (
                    <div
                      key={c.i}
                      // onMouseDown (not onClick) fires before the input's
                      // onBlur, so the pick still runs before the dropdown
                      // closes itself out from under the click.
                      onMouseDown={() => pickSearchCandidate(c.i)}
                      style={{
                        padding: "7px 10px", fontSize: 12, cursor: "pointer",
                        borderBottom: `1px dashed ${COLORS.paperLine}`,
                      }}
                    >{c.label}</div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Only the book/line rows scroll (their own bounded box, further
          below) -- everything from here down is normal, non-scrolling
          content; the header above and the button row below (also sticky)
          are always in view without the person ever needing to scroll to
          reach Save / Delete. */}
      {config.grid && (
        <>
          <div ref={gridBoxRef} className="themed-scroll" style={{
            overflowX: "hidden", overflowY: "scroll",
            height: config.fullPage ? "68vh" : (config.gridBoxHeight || GRID_BOX_MAX_HEIGHT),
            border: `1.5px solid ${COLORS.paperLine}`, borderRadius: 10, marginBottom: 6,
          }}>
            {/* table-layout:fixed makes the browser honour the declared
                column widths as proportions of the 100%-wide table instead
                of growing the table past its container to fit content --
                combined with overflowX:hidden above, this is what stops the
                left-right scrollbar from ever appearing. */}
            <table style={{ borderCollapse: "collapse", width: "100%", tableLayout: "fixed", fontSize: 12.5 }}>
              <thead>
                <tr style={{ background: COLORS.paperDark, position: "sticky", top: 0, zIndex: 1 }}>
                  {config.grid.columns.map((c) => <th key={c.key} style={{ ...thStyle, width: c.w || 100 }}>{c.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {displayRows.map((row, ri) => (
                  // onFocus (React delegates this via "focusin", which does
                  // bubble) records whichever row the cursor lands in, so
                  // "Delete Line" (see handleDeleteLine) knows which one to
                  // remove instead of always removing the last row.
                  <tr key={ri} onFocus={() => { activeRowRef.current = ri; }}>
                    {config.grid.columns.map((c, ci) => {
                      const isFirstCell = ri === 0 && ci === 0;
                      return (
                      <td key={c.key} style={tdStyle}>
                        {c.compute || c.disabled || (config.grid.autoTotal && c.key === config.grid.autoTotal.totalKey)
                          ? <input readOnly disabled value={row[c.key] || ""} style={autoFieldStyle} />
                          : c.gridLookup
                            ? <>
                                <input
                                  ref={isFirstCell ? gridFirstCellRef : undefined}
                                  value={row[c.key] || ""}
                                  // e.g. Book Code's disabledUnless: "qty" -- locked
                                  // until that same row's Qty cell has a value.
                                  disabled={c.disabledUnless ? !String(row[c.disabledUnless] || "").trim() : false}
                                  title={
                                    c.disabledUnless && !String(row[c.disabledUnless] || "").trim()
                                      ? `Enter ${c.disabledUnless.toUpperCase()} first`
                                      : `Enter the ${c.gridLookup.sourceKey} code, or press Enter/F9 to search, to auto-fill the rest of this row`
                                  }
                                  onChange={(e) => updateCell(ri, c.key, e.target.value)}
                                  onBlur={() => runGridLookup(c.gridLookup, ri, row[c.key])}
                                  onKeyDown={(e) => {
                                    // F9 (old Oracle Forms "show List of Values" key) always
                                    // pops the search popup open, same as a header "pair"
                                    // lookup field. Enter tries the typed code first and
                                    // only falls back to the popup on a miss -- a correct
                                    // code + Enter still auto-fills the row in place and
                                    // (via handleEnterAsTab, since this isn't stopped) moves
                                    // on to the next field, without ever opening anything.
                                    if (e.key !== "Enter" && e.key !== "F9") return;
                                    if (e.key === "F9") {
                                      e.stopPropagation(); e.preventDefault();
                                      setGridLov({ ri, colKey: c.key, triggerEl: e.target });
                                      return;
                                    }
                                    const matched = runGridLookup(c.gridLookup, ri, row[c.key]);
                                    if (!matched) {
                                      e.stopPropagation(); e.preventDefault();
                                      setGridLov({ ri, colKey: c.key, triggerEl: e.target });
                                    }
                                  }}
                                  style={c.disabledUnless && !String(row[c.disabledUnless] || "").trim() ? autoFieldStyle : tintStyle(inputStyle, c.tint)}
                                />
                                {gridLov && gridLov.ri === ri && gridLov.colKey === c.key && (
                                  <LovPopup
                                    title={`Find ${c.gridLookup.sourceKey}`}
                                    items={((store && store[c.gridLookup.sourceKey]) || [])
                                      // Same blank-name guard as the header pair
                                      // field's popup -- an incomplete/leftover
                                      // master row should never show up here as
                                      // if it were a real saved book.
                                      .filter((r) => String(r[c.gridLookup.nameKey] || "").trim() !== "")
                                      .map((r) => ({
                                        code: r[c.gridLookup.codeKey] || "", name: r[c.gridLookup.nameKey] || "", _rec: r,
                                      }))}
                                    initialQuery={row[c.key] || ""}
                                    onPick={(it) => {
                                      const patch = { [c.key]: it.code };
                                      if (c.gridLookup.fields && it._rec) {
                                        Object.entries(c.gridLookup.fields).forEach(([targetKey, srcKey]) => { patch[targetKey] = it._rec[srcKey] || ""; });
                                      } else if (c.gridLookup.targetKey) {
                                        patch[c.gridLookup.targetKey] = it.name;
                                      }
                                      updateCells(ri, patch);
                                      const triggerEl = gridLov.triggerEl;
                                      setGridLov(null);
                                      // Land the cursor on the next field automatically --
                                      // same as picking a header lookup field's popup.
                                      setTimeout(() => focusNextFocusable(triggerEl), 0);
                                    }}
                                    onClose={() => setGridLov(null)}
                                  />
                                )}
                              </>
                            : <FieldInput field={c} value={row[c.key]} onChange={(v) => updateCell(ri, c.key, v)} inputRef={isFirstCell ? gridFirstCellRef : undefined} />}
                      </td>
                      );
                    })}
                  </tr>
                ))}
                {config.grid.totalsRow && (
                  <tr style={{ background: COLORS.paperDark, fontWeight: 700 }}>
                    {config.grid.columns.map((c, i) => (
                      <td key={c.key} style={tdStyle}>
                        {i === 0
                          ? config.grid.totalsRow.label
                          : config.grid.totalsRow.cols.includes(c.key)
                            ? fmtNum(displayRows.reduce((s, r) => s + (parseFloat(r[c.key]) || 0), 0))
                            : ""}
                      </td>
                    ))}
                    {!config.grid.noRowDelete && <td style={tdStyle}></td>}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {grandTotal !== null && (
            <div style={{ textAlign: "right", fontWeight: 700, color: COLORS.inkDark, fontSize: 13, marginBottom: 10 }}>
              Total: {grandTotal.toLocaleString()}
            </div>
          )}
        </>
      )}

      {config.footerPanels && (
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 6, alignItems: "flex-start" }}>
          {config.footerPanels.map((p, pi) => (
            <div key={pi} style={{
              flex: p.flex || "1 1 220px",
              border: p.bordered ? `1.5px solid ${COLORS.paperLine}` : "none",
              borderRadius: p.bordered ? 10 : 0,
              padding: p.bordered ? 6 : 0,
              paddingBottom: p.bordered ? 7 : 0,
            }}>
              {p.title && (
                <div style={{ fontSize: 10, fontWeight: 700, color: COLORS.charcoalSoft, marginBottom: 4, letterSpacing: "0.03em", textTransform: "uppercase" }}>
                  {p.title}
                </div>
              )}
              {p.fields.map((f) => (
                <div key={f.key || f.pctKey}>
                  <ModernField label={f.label} compact>
                    {renderFooterField(f)}
                  </ModernField>
                </div>
              ))}
              {/* When this panel is the Payment panel, the record-navigation
                  cluster (First/Previous/Next/Last) sits right below its
                  last field (Paid Amount) instead of in its own row under
                  all the footer panels. */}
              {p.title === "Payment" && config.buttons.some((b) => NAV_BUTTON_LABELS.includes(b)) && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
                  {config.buttons.filter((b) => NAV_BUTTON_LABELS.includes(b)).map((b) => {
                    const h = BUTTON_HANDLERS[b] || { fn: () => flash(`${b} (prototype)`) };
                    return <FooterBtn key={b} onClick={h.fn} primary={h.primary} danger={h.danger}>{b}</FooterBtn>;
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Record navigation (First/Previous/Next/Last) sits as its own row,
          right-aligned just under the footer panels -- matching the old
          Oracle Forms layout, where this cluster sits apart from the
          Save/Cancel/Exit action buttons at the very bottom. Forms with a
          Payment panel render the nav cluster inside that panel instead
          (see above), so this fallback row is skipped for them. */}
      {config.buttons.some((b) => NAV_BUTTON_LABELS.includes(b)) &&
        !(config.footerPanels && config.footerPanels.some((p) => p.title === "Payment")) && (
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 6 }}>
          {config.buttons.filter((b) => NAV_BUTTON_LABELS.includes(b)).map((b) => {
            const h = BUTTON_HANDLERS[b] || { fn: () => flash(`${b} (prototype)`) };
            return <FooterBtn key={b} onClick={h.fn} primary={h.primary} danger={h.danger}>{b}</FooterBtn>;
          })}
        </div>
      )}

      {!config.hideSavedEntries && (
        <OrderRecordsList
          records={records}
          columns={config.headerFields.filter((f) => f.type !== "textarea").slice(0, 3)}
          activeIdx={idx}
          onEdit={loadEntry}
          onDelete={(i) => {
            setRecords((rs) => rs.filter((_, ix) => ix !== i));
            if (i === idx) { setHeader(blankHeader()); setRows(blankRows()); setFooter(blankFooter()); setIdx(-1); }
            else if (idx > i) setIdx(idx - 1);
          }}
        />
      )}

      <div style={{ fontSize: 11, color: COLORS.charcoalSoft, marginBottom: 6 }}>
        {records.length ? `Record ${idx >= 0 ? idx + 1 : records.length + 1} of ${records.length}` : "No saved records yet"}
      </div>
      {msg && <div style={{ color: COLORS.inkDark, fontSize: 12.5, marginBottom: 8, fontWeight: 600 }}>{msg}</div>}

      {/* Sticky to the bottom of the modal's scrollbar, same as the header
          above -- Save / Cancel / Delete are always reachable, never require
          scrolling down to find. An optional extraField (e.g. Card No) sits
          to the right of the buttons, matching the legacy form's layout. */}
      <div style={{
        display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end",
        position: "sticky", bottom: 0, zIndex: 2, background: COLORS.cream,
        paddingTop: 8, paddingBottom: 8,
        borderTop: `1.5px solid ${COLORS.paperLine}`,
      }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {config.buttons.filter((b) => !NAV_BUTTON_LABELS.includes(b)).map((b) => {
            const h = BUTTON_HANDLERS[b] || { fn: () => flash(`${b} (prototype)`) };
            return (
              <FooterBtn
                key={b}
                ref={b === "Save" ? saveButtonRef : undefined}
                onClick={h.fn}
                // Explicit for clarity/reliability -- a focused <button> already
                // saves on Enter/Space natively, and a single click already
                // saves too, so double-click just calls the same handler again.
                onDoubleClick={b === "Save" ? h.fn : undefined}
                primary={h.primary}
                danger={h.danger}
              >{b}</FooterBtn>
            );
          })}
        </div>
        {config.extraField && (
          <div style={{ flex: "0 0 150px" }}>
            <ModernField label={config.extraField.label} compact>
              <FieldInput
                field={config.extraField}
                value={footer[config.extraField.key]}
                onChange={(v) => setFooter((s) => ({ ...s, [config.extraField.key]: v }))}
              />
            </ModernField>
          </div>
        )}
      </div>
    </div>
  );

  if (config.fullPage) return <FullScreenShell title={config.title} onClose={onClose}>{body}</FullScreenShell>;
  return (
    <ModalShell
      title={config.title} onClose={onClose} wide
      width={`min(${config.modalWidth || 950}px, 94vw)`}
      maxHeight="94vh"
      noScroll
    >
      {body}
    </ModalShell>
  );
}

/* =========================================================
   Dashboard
   ========================================================= */
function Dashboard({ user, onLogout }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showBackup, setShowBackup] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [comingSoon, setComingSoon] = useState(null);
  const [setupForm, setSetupForm] = useState(null);
  const [orderForm, setOrderForm] = useState(null);
  const [reportForm, setReportForm] = useState(null);
  const wrapRef = useRef(null);
  const now = useDhakaClock();
  const prayerTimes = usePrayerTimes(dhakaISODate(now));

  // Loaded once, synchronously, before the very first render -- so the
  // state initializers just below can fall back to whatever was saved
  // last time instead of always starting from the seeded/empty defaults.
  const persisted = useRef(null);
  if (persisted.current === null) persisted.current = loadPersistedState() || {};
  const saved = persisted.current;

  const [users, setUsers] = useState(() => saved.users || []);
  const [settings, setSettings] = useState(() => saved.settings || {});

  /* Reference/master data, shared across forms (Division/District grow over time;
     Other Expense Group Name feeds the Group Name dropdown on Other Expense Head). */
  const [divisions, setDivisions] = useState(() => saved.divisions || BD_DIVISIONS);
  const [districts, setDistricts] = useState(() => saved.districts || buildDistrictSeed());
  const [countries, setCountries] = useState(() => saved.countries || buildCountrySeed());
  const [store, setStore] = useState(() => {
    if (saved.store) return saved.store;
    const init = {};
    Object.entries(SETUP_FORMS).forEach(([key, cfg]) => {
      if (cfg.kind === "grid") {
        init[key] = cfg.seed && cfg.seed.length ? cfg.seed : Array.from({ length: cfg.initialRows || 6 }, () => Object.fromEntries(cfg.fields.map((f) => [f.key, ""])));
      } else {
        init[key] = cfg.seed || [];
      }
    });
    Object.keys(ORDER_FORMS).forEach((key) => { init[key] = []; });
    /* Books are organised into named Groups (see BookEntryForm) rather than
       one flat pre-seeded grid, so this starts empty and each saved row
       carries its own groupCode/groupName. */
    init["Book Groups"] = [];
    init["Book Information"] = [];
    return init;
  });
  // Every saved record (Party/Book/every Order & Report form, Divisions/
  // Districts/Countries, and the Create-User list) gets written to
  // localStorage after each change -- see savePersistedState above.
  // Nothing else in the app changes this often, so this only actually
  // fires on real Save/Delete actions, not on every keystroke.
  const [syncStatus, setSyncStatus] = useState("loading"); // loading | synced | saving | offline
  const cloudLoaded = useRef(false);
  const cloudSaveTimer = useRef(null);
  const skipNextCloudPush = useRef(false);

  // On first mount, pull whatever the other devices last saved to the
  // cloud and adopt it -- this is what makes a second device/browser see
  // the same data instead of starting from its own empty localStorage.
  useEffect(() => {
    let cancelled = false;
    fetchCloudState().then((row) => {
      if (cancelled) return;
      if (row && row.data) {
        skipNextCloudPush.current = true; // don't immediately re-upload what we just downloaded
        if (row.data.divisions) setDivisions(row.data.divisions);
        if (row.data.districts) setDistricts(row.data.districts);
        if (row.data.countries) setCountries(row.data.countries);
        if (row.data.store) setStore(row.data.store);
        if (row.data.users) setUsers(row.data.users);
        if (row.data.settings) setSettings(row.data.settings);
        savePersistedState(row.data); // keep local cache in step too
      }
      cloudLoaded.current = true;
      setSyncStatus("synced");

      // Safety net: an automatic snapshot at most once per calendar day,
      // so a real backup exists even if nobody remembers to press the
      // BACKUP button. Cheap to run -- it's a no-op after the first load
      // of the day.
      const today = new Date().toISOString().slice(0, 10);
      const lastAutoBackup = window.localStorage.getItem("ekalantor-pos:lastAutoBackup");
      if (lastAutoBackup !== today) {
        const stateToBackup = (row && row.data) || saved;
        if (stateToBackup && Object.keys(stateToBackup).length) {
          pushBackupSnapshot(stateToBackup).then((ok) => {
            if (ok) window.localStorage.setItem("ekalantor-pos:lastAutoBackup", today);
          });
        }
      }
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const state = { divisions, districts, countries, store, users, settings };
    savePersistedState(state); // instant local cache, always works offline

    if (!cloudLoaded.current) return; // don't push before the initial pull above finishes
    if (skipNextCloudPush.current) { skipNextCloudPush.current = false; return; }

    setSyncStatus("saving");
    if (cloudSaveTimer.current) clearTimeout(cloudSaveTimer.current);
    cloudSaveTimer.current = setTimeout(() => {
      pushCloudState(state).then((ok) => setSyncStatus(ok ? "synced" : "offline"));
    }, 700); // debounce so rapid edits don't spam the network
  }, [divisions, districts, countries, store, users, settings]);
  const getRecords = (key) => store[key] || [];
  const setRecordsFor = (key) => (updater) => setStore((s) => ({ ...s, [key]: typeof updater === "function" ? updater(s[key] || []) : updater }));
  // Division/District live in their own state (see above), not in `store` --
  // but header fields with a `lookup`/`districtSelect` (Sales Memo
  // Bookwise's District Code, Party Information Register's District filter)
  // read their source list via store[sourceKey], same as every other
  // lookup. Folding District Information in here once, instead of passing
  // `districts` around as a second prop everywhere, lets those lookups work
  // without changing how every other store-driven field is read.
  const storeWithRefs = { ...store, "District Information": districts };

  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpenMenu(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="font-body dashboard-shell" style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      background: `radial-gradient(circle at 20% -10%, #22b4d4 0%, ${COLORS.inkDeeper} 45%, #051b23 100%)`,
    }}>
      {/* top brand + nav */}
      <div ref={wrapRef} style={{ flexShrink: 0, background: `linear-gradient(180deg, ${COLORS.ink}, ${COLORS.inkDark})`, position: "sticky", top: 0, zIndex: 40, boxShadow: "0 6px 18px rgba(0,0,0,0.18)" }}>
        <div className="topbar-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src={LOGO_ICON} alt="" style={{ width: 30, height: 30 }} />
            <span className="font-display" style={{ color: "#eaf7fa", fontSize: 17, fontWeight: 700 }}>Ekalantor</span>
          </div>
          <div className="topbar-right" style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button
              type="button"
              className="mobile-menu-toggle font-body"
              onClick={() => setMobileMenuOpen((v) => !v)}
              style={{
                background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.24)",
                color: "#eaf7fa", padding: "8px 10px", borderRadius: 8, cursor: "pointer",
                alignItems: "center", justifyContent: "center", minWidth: 42, height: 36,
              }}
              aria-label="Toggle menu"
            >
              ☰
            </button>
            <span className="dashboard-welcome" style={{ color: "#cdeef5", fontSize: 12.5 }}>Welcome, <b>{user}</b></span>
            <button onClick={onLogout} style={{ background: "rgba(255,255,255,0.12)", border: "none", color: "#eaf7fa", padding: "6px 12px", fontSize: 12.5, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              <LogOut size={13} /> Log Out
            </button>
          </div>
        </div>
        <div className={`topnav-menu-wrap ${mobileMenuOpen ? "mobile-open" : ""}`} style={{ display: "flex", flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.14)", padding: "0 8px", position: "relative" }}>
          {MENUS.map((m) => (
            <NavMenu
              key={m.label}
              menu={m}
              isOpen={openMenu === m.label}
              onToggle={(l) => {
                setOpenMenu(openMenu === l ? null : l);
                setMobileMenuOpen(true);
              }}
              onHoverOpen={(l) => setOpenMenu(l)}
              onHoverClose={(l) => setOpenMenu((cur) => (cur === l ? null : cur))}
              onPick={(item) => {
                setOpenMenu(null);
                setMobileMenuOpen(false);
                if (item === "Division") setSetupForm("Division");
                else if (item === "District Information") setSetupForm("District Information");
                else if (item === "Settings") setShowSettings(true);
                else if (SETUP_FORMS[item]) setSetupForm(item);
                else if (ORDER_FORMS[item]) setOrderForm(item);
                else if (REPORT_FORMS[item]) setReportForm(item);
                else setComingSoon(item);
              }}
            />
          ))}
          <button onClick={() => { setShowCreateUser(true); setMobileMenuOpen(false); }} className="font-body" style={{ background: "transparent", border: "none", color: "#eaf7fa", padding: "13px 14px", fontSize: 14.5, fontWeight: 600, cursor: "pointer" }}>Create User</button>
          <button onClick={() => { setShowBackup(true); setMobileMenuOpen(false); }} className="font-body" style={{ background: "transparent", border: "none", color: "#eaf7fa", padding: "13px 14px", fontSize: 14.5, fontWeight: 700, cursor: "pointer" }}>BACKUP</button>
        </div>
        <div style={{
          height: 6, background: `repeating-linear-gradient(90deg, ${COLORS.gold} 0 8px, transparent 8px 16px)`,
          opacity: 0.5,
        }} />
        <div className="font-body sync-status" style={{
          display: "flex", justifyContent: "flex-end", padding: "4px 16px",
          fontSize: 11, color: syncStatus === "offline" ? "#ff9d8a" : "#7fd8e8",
        }}>
          {syncStatus === "loading" && "Loading data…"}
          {syncStatus === "saving" && "Saving…"}
          {syncStatus === "synced" && "✓ Synced to cloud"}
          {syncStatus === "offline" && "⚠ Not synced — check internet connection"}
        </div>
      </div>

      <div className="themed-scroll" style={{ flex: "1 1 auto", overflowY: "auto", overflowX: "hidden" }}>
      {/* Hero / home content */}
      <div className="dashboard-hero" style={{ padding: "48px 20px 70px", position: "relative" }}>
        <div className="dashboard-inner" style={{ maxWidth: 920, margin: "0 auto" }}>
          <div className="fade-up" style={{ textAlign: "center", marginBottom: 34, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="font-mono hero-tagline" style={{ color: COLORS.gold, fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 14 }}>
              Publisher &amp; Ledger Management
            </div>
            <img src={LOGO_ICON} alt="Ekalantor logo" style={{ width: 56, height: 56, objectFit: "contain", marginBottom: 10 }} />
            <img className="dashboard-brand" src={NAMLIPI} alt="Ekalantor Prokashoni" style={{ width: 240 }} />
          </div>

          <div className="fade-up dashboard-cards" style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center", marginBottom: 10 }}>
            <ReceiptCard className="receipt-card" style={{ width: 300 }}>
              <div style={{ position: "absolute", top: 12, left: 14, width: 8, height: 8, borderRadius: "50%", background: COLORS.paper, boxShadow: "inset 0 1px 2px rgba(0,0,0,0.25)" }} />
              <div style={{ textAlign: "center" }}>
                <div className="card-label" style={{ fontSize: 11, color: COLORS.charcoalSoft, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>Today's Date &amp; Time</div>
                <div className="font-display" style={{ color: COLORS.inkDark, fontSize: 16.5, marginBottom: 8 }}>{formatDhakaDate(now)}</div>
                <div className="font-mono card-value" style={{ color: COLORS.inkDeep, fontSize: 27, fontWeight: 700, letterSpacing: "0.03em" }}>{formatDhakaTime(now)}</div>
                <div style={{ fontSize: 10.5, color: COLORS.charcoalSoft, marginTop: 6 }}>Asia / Dhaka (GMT+6)</div>
              </div>
            </ReceiptCard>

            <ReceiptCard className="receipt-card" style={{ width: 300 }}>
              <div style={{ position: "absolute", top: 12, left: 14, width: 8, height: 8, borderRadius: "50%", background: COLORS.paper, boxShadow: "inset 0 1px 2px rgba(0,0,0,0.25)" }} />
              <div className="card-label" style={{ fontSize: 11, color: COLORS.charcoalSoft, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10, textAlign: "center" }}>Dhaka Prayer Times</div>

              {prayerTimes.status === "loading" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", rowGap: 10, columnGap: 6 }}>
                  {PRAYER_LABELS.map((name) => (
                    <div key={name} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 11.5, color: COLORS.inkDark, fontWeight: 600 }}>{name}</div>
                      <div style={{
                        height: 13, width: "68%", margin: "5px auto 0", borderRadius: 4,
                        background: COLORS.paperDark, animation: "pulseSkeleton 1.1s ease-in-out infinite",
                      }} />
                    </div>
                  ))}
                </div>
              )}

              {prayerTimes.status === "error" && (
                <div style={{ textAlign: "center", padding: "6px 4px" }}>
                  <div style={{ fontSize: 11.5, color: "#b0282b", marginBottom: 8, lineHeight: 1.4 }}>
                    নামাজের সময় লোড করা যায়নি।<br />ইন্টারনেট সংযোগ চেক করে আবার চেষ্টা করুন।
                  </div>
                  <button onClick={prayerTimes.retry} className="font-body" style={{
                    background: COLORS.paperDark, color: COLORS.charcoal, border: "none", borderRadius: 8,
                    padding: "6px 16px", fontSize: 11.5, fontWeight: 700, cursor: "pointer",
                  }}>
                    আবার চেষ্টা করুন
                  </button>
                </div>
              )}

              {prayerTimes.status === "ready" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", rowGap: 10, columnGap: 6 }}>
                  {prayerTimes.times.map((p) => (
                    <div key={p.name} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 11.5, color: COLORS.inkDark, fontWeight: 600 }}>{p.name}</div>
                      <div className="font-mono" style={{ fontSize: 12.5, color: COLORS.charcoal, marginTop: 2 }}>{p.time}</div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ fontSize: 9.5, color: COLORS.charcoalSoft, marginTop: 10, textAlign: "center" }}>
                {prayerTimes.status === "ready"
                  ? "Source: Aladhan API — Univ. of Islamic Sciences, Karachi (Hanafi Asr)"
                  : "\u00A0"}
              </div>
            </ReceiptCard>
          </div>

        </div>
      </div>
      </div>

      {showCreateUser && (
        <CreateUserModal
          onClose={() => setShowCreateUser(false)}
          users={users}
          onSave={(u) => setUsers((list) => [...list, u])}
          onDelete={(i) => setUsers((list) => list.filter((_, idx) => idx !== i))}
        />
      )}
      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} settings={settings} setSettings={setSettings} />
      )}
      {showBackup && (
        <BackupModal
          onClose={() => setShowBackup(false)}
          state={{ divisions, districts, countries, store, users, settings }}
        />
      )}
      {comingSoon && <ComingSoon title={comingSoon} onClose={() => setComingSoon(null)} />}
      {setupForm === "Division" && (
        <DivisionForm divisions={divisions} setDivisions={setDivisions} onClose={() => setSetupForm(null)} />
      )}
      {setupForm === "District Information" && (
        <DistrictForm
          districts={districts} setDistricts={setDistricts}
          countries={countries} setCountries={setCountries}
          divisions={divisions}
          onClose={() => setSetupForm(null)}
        />
      )}
      {setupForm === "Party Information" && (
        <PartyInformationForm
          records={getRecords("Party Information")} setRecords={setRecordsFor("Party Information")}
          divisions={divisions} districts={districts} countries={countries}
          onClose={() => setSetupForm(null)}
        />
      )}
      {setupForm === "Book Information" && (
        <BookEntryForm
          config={SETUP_FORMS["Book Information"]}
          groups={getRecords("Book Groups")} setGroups={setRecordsFor("Book Groups")}
          books={getRecords("Book Information")} setBooks={setRecordsFor("Book Information")}
          onClose={() => setSetupForm(null)}
        />
      )}
      {setupForm && setupForm !== "Party Information" && setupForm !== "Book Information" && SETUP_FORMS[setupForm] && (
        SETUP_FORMS[setupForm].kind === "grid"
          ? <GridSetupForm config={SETUP_FORMS[setupForm]} rows={getRecords(setupForm)} setRows={setRecordsFor(setupForm)} onClose={() => setSetupForm(null)} />
          : <RecordSetupForm config={SETUP_FORMS[setupForm]} records={getRecords(setupForm)} setRecords={setRecordsFor(setupForm)} mirrorRecords={setupForm === "Specimen Party" || setupForm === "Other Person Telephones" ? setRecordsFor("Party Information") : undefined} store={storeWithRefs} onClose={() => setSetupForm(null)} />
      )}
      {orderForm && ORDER_FORMS[orderForm] && (
        <OrderEntryForm
          config={ORDER_FORMS[orderForm]}
          records={getRecords(orderForm)}
          setRecords={setRecordsFor(orderForm)}
          store={storeWithRefs}
          preparedBy={user}
          onClose={() => setOrderForm(null)}
        />
      )}
      {reportForm && REPORT_FORMS[reportForm] && (
        <ReportSearchForm config={REPORT_FORMS[reportForm]} store={storeWithRefs} onClose={() => setReportForm(null)} />
      )}
    </div>
  );
}

/* =========================================================
   Preview switcher (design-review only -- remove before go-live)
   ========================================================= */
function PreviewBar({ view, setView }) {
  const items = [
    { id: "login", label: "Login", icon: LogIn },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  ];
  return (
    <div style={{
      position: "fixed", bottom: 14, left: "50%", transform: "translateX(-50%)", zIndex: 300,
      background: "rgba(8,27,33,0.92)", borderRadius: 30, padding: "6px 8px",
      display: "flex", gap: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.4)", backdropFilter: "blur(6px)",
    }} className="font-body">
      <span style={{ color: "#7fb8c4", fontSize: 11, alignSelf: "center", padding: "0 8px", letterSpacing: "0.08em", textTransform: "uppercase" }}>Preview</span>
      {items.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setView(id)}
          style={{
            display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 20, border: "none",
            cursor: "pointer", fontSize: 12.5, fontWeight: 600,
            background: view === id ? COLORS.ink : "transparent",
            color: view === id ? "#fff" : "#bcdfe7",
          }}
        >
          <Icon size={13} /> {label}
        </button>
      ))}
    </div>
  );
}

/* =========================================================
   App root
   ========================================================= */
export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("login");

  useEffect(() => { setView(user ? "dashboard" : "login"); }, [user]);

  const handleViewChange = (v) => {
    setView(v);
    if (v === "dashboard" && !user) setUser("admin");
    if (v === "login") setUser(null);
  };

  return (
    <div style={{ width: "100%" }}>
      {FONTS}
      {view === "login" ? (
        <LoginScreen onConnect={(u) => { setUser(u); setView("dashboard"); }} />
      ) : (
        <Dashboard user={user || "admin"} onLogout={() => { setUser(null); setView("login"); }} />
      )}
      {view === "login" && <PreviewBar view={view} setView={handleViewChange} />}
    </div>
  );
}
