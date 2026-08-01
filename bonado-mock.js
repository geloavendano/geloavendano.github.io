(function () {
  'use strict';

  // ── DATA ────────────────────────────────────────────────────────────────────
  var MEMBERS = [
    { id: 'gelo',     name: 'Gelo Avendaño',   initial: 'G', color: '#8fa8c9', balance:  11350.13 },
    { id: 'serville', name: 'Serville',         initial: 'S', color: '#9dbb90', balance:   1196.22 },
    { id: 'ellouise', name: 'Ellouise Cachero', initial: 'E', color: '#b39cc4', balance:      0.00 },
    { id: 'ariane',   name: 'Ariane',           initial: 'A', color: '#c98d8d', balance:  -2836.82 },
    { id: 'nikko',    name: 'Nikko Pascua',     initial: 'N', color: '#e3b587', balance:  -9709.53 },
  ];

  var SETTLEMENTS_DATA = [
    { from: 'Nikko Pascua',  to: 'Gelo Avendaño',  amount: '฿9,709.53' },
    { from: 'Ariane',        to: 'Gelo Avendaño',  amount: '฿1,640.60' },
    { from: 'Ariane',        to: 'Serville',       amount: '฿1,196.22' },
  ];

  var EXPENSE_GROUPS = [
    {
      date: 'SUNDAY, JULY 26', total: '≈ ฿2,391.33',
      items: [
        { id: 1, type: 'expense', icon: 'transport', cat: 'Transport',
          desc: 'Taxi from KROMO to Airport', sub: 'Paid to Grab by you',
          amount: '฿339.00', share: '฿339.00',
          detail: { paidBy: 'Gelo Avendaño', method: 'Card · UB', payee: 'Grab',
                    date: 'July 26, 2026', total: '฿339.00', yourShare: '฿339.00',
                    net: '฿0.00', netColor: 'owed' } },
        { id: 2, type: 'expense', icon: 'food', cat: 'Food & drink',
          desc: 'Breakfast', sub: 'Paid to Bottomless by Serville',
          amount: '฿285.00', share: '฿285.00',
          detail: { paidBy: 'Serville', method: 'Cash', payee: 'Bottomless',
                    date: 'July 26, 2026', total: '฿285.00', yourShare: '฿285.00',
                    net: '+฿285.00', netColor: 'owe' } },
        { id: 3, type: 'settlement',
          desc: 'Settlement', sub: 'Ellouise Cachero paid you',
          amount: '+฿10,433.77' },
        { id: 4, type: 'expense', icon: 'food', cat: 'Food & drink',
          desc: 'Entrance', sub: 'Paid to Banana by Serville',
          amount: '$13.09', share: '$13.09',
          detail: { paidBy: 'Serville', method: 'Cash', payee: 'Banana',
                    date: 'July 26, 2026', total: '$13.09', yourShare: '$13.09',
                    net: '+$13.09', netColor: 'owe' } },
      ],
    },
    {
      date: 'SATURDAY, JULY 25', total: '≈ ฿6,820.00',
      items: [
        { id: 5, type: 'expense', icon: 'lodging', cat: 'Lodging',
          desc: '1 night hotel', sub: 'Paid to Kromo by Serville',
          amount: '$43.42', share: '$43.42',
          detail: { paidBy: 'Serville', method: 'Cash', payee: 'Kromo',
                    date: 'July 25, 2026', total: '$43.42', yourShare: '$43.42',
                    net: '+$43.42', netColor: 'owe' } },
        { id: 6, type: 'expense', icon: 'food', cat: 'Food & drink',
          desc: 'Brunch', sub: 'Paid to Ryoku by Serville',
          amount: '$21.90', share: '$21.90',
          detail: { paidBy: 'Serville', method: 'Cash', payee: 'Ryoku',
                    date: 'July 25, 2026', total: '$21.90', yourShare: '$21.90',
                    net: '+$21.90', netColor: 'owe' } },
        { id: 7, type: 'expense', icon: 'activities', cat: 'Activities',
          desc: 'Entrance', sub: 'Paid to Sky Bar by Serville',
          amount: '฿400.00', share: '฿400.00',
          detail: { paidBy: 'Serville', method: 'Cash', payee: 'Sky Bar',
                    date: 'July 25, 2026', total: '฿400.00', yourShare: '฿400.00',
                    net: '+฿400.00', netColor: 'owe' } },
        { id: 8, type: 'expense', icon: 'activities', cat: 'Activities',
          desc: 'Dinner', sub: 'Paid to Khon Boat Noodles by Serville',
          amount: '฿435.00', share: '฿435.00',
          detail: { paidBy: 'Serville', method: 'Cash', payee: 'Khon Boat Noodles',
                    date: 'July 25, 2026', total: '฿435.00', yourShare: '฿435.00',
                    net: '+฿435.00', netColor: 'owe' } },
      ],
    },
    {
      date: 'FRIDAY, JULY 24', total: '≈ ฿1,908.00',
      items: [
        { id: 9, type: 'expense', icon: 'food', cat: 'Food & drink',
          desc: 'Meryenda', sub: 'Paid to Kalamansi Kitchen by Serville',
          amount: '฿387.00', share: '฿387.00',
          detail: { paidBy: 'Serville', method: 'Cash', payee: 'Kalamansi Kitchen',
                    date: 'July 24, 2026', total: '฿387.00', yourShare: '฿387.00',
                    net: '+฿387.00', netColor: 'owe' } },
        { id: 10, type: 'expense', icon: 'food', cat: 'Food & drink',
          desc: 'Drywave', sub: 'Paid by Ariane',
          amount: '฿517.88', share: '฿517.88',
          detail: { paidBy: 'Ariane', method: 'Cash', payee: '',
                    date: 'July 24, 2026', total: '฿517.88', yourShare: '฿517.88',
                    net: '+฿517.88', netColor: 'owe' } },
      ],
    },
  ];

  var REPORTS_DATA = {
    youSpent: '฿36,607.83', youPHP: '≈ ₱67,131.44',
    groupSpent: '฿141,210.90', groupPHP: '≈ ₱258,952.55',
    breakdown: [
      { icon: 'lodging',    name: 'Lodging',       you: '฿10,608.46', youPct: '29% of your total', group: '฿44,082.19', groupPct: '31% of total' },
      { icon: 'food',       name: 'Food & drink',  you: '฿11,463.39', youPct: '31% of your total', group: '฿41,149.34', groupPct: '29% of total' },
      { icon: 'activities', name: 'Activities',    you: '฿4,975.23',  youPct: '14% of your total', group: '฿19,340.17', groupPct: '14% of total' },
      { icon: 'shopping',   name: 'Shopping',      you: '฿6,384.00',  youPct: '17% of your total', group: '฿17,691.63', groupPct: '13% of total' },
      { icon: 'groceries',  name: 'Groceries',     you: '฿875.50',    youPct: '2% of your total',  group: '฿10,289.78', groupPct: '7% of total' },
    ],
  };

  // ── SVG ICONS ────────────────────────────────────────────────────────────────
  var IC = {
    transport:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9a9d9b" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
    food:       '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9a9d9b" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
    lodging:    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9a9d9b" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>',
    activities: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9a9d9b" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9z"/><path d="M8 7V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/><line x1="8" y1="13" x2="8" y2="19"/><line x1="16" y1="13" x2="16" y2="19"/></svg>',
    shopping:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9a9d9b" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
    groceries:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9a9d9b" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
    swap:       '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22b3a0" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 16V4m0 0L3 8m4-4 4 4"/><path d="M17 8v12m0 0 4-4m-4 4-4-4"/></svg>',
    bell:       '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
    gear:       '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-2.83 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    chevdown:   '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>',
    chevright:  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>',
    search:     '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    link:       '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    tabEntries: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3" cy="6" r="1" fill="currentColor"/><circle cx="3" cy="12" r="1" fill="currentColor"/><circle cx="3" cy="18" r="1" fill="currentColor"/></svg>',
    tabBal:     '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 16V4m0 0L3 8m4-4 4 4"/><path d="M17 8v12m0 0 4-4m-4 4-4-4"/></svg>',
    tabRep:     '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>',
  };

  function ava(m, size) {
    size = size || 36;
    return '<div class="bm-av" style="width:' + size + 'px;height:' + size + 'px;background:' + m.color + ';font-size:' + Math.round(size * 0.37) + 'px">' + m.initial + '</div>';
  }
  function M(id) { return MEMBERS.find(function(m){ return m.id === id; }) || MEMBERS[0]; }
  function fmt(n) { return '฿' + Math.abs(n).toLocaleString('en',{minimumFractionDigits:2,maximumFractionDigits:2}); }
  function iconTile(type, teal) {
    return '<div class="bm-tile' + (teal ? ' bm-tile-teal' : '') + '">' + (IC[type] || IC.activities) + '</div>';
  }

  // ── STYLES ───────────────────────────────────────────────────────────────────
  var CSS = [
    '.bm-ov{position:fixed;inset:0;z-index:900;background:rgba(0,0,0,0.78);display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .3s;backdrop-filter:blur(6px)}',
    '.bm-ov.open{opacity:1;pointer-events:all}',
    '.bm-x{position:absolute;top:18px;right:18px;width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,0.12);border:none;color:#fff;font-size:17px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:10;transition:background .15s}',
    '.bm-x:hover{background:rgba(255,255,255,0.2)}',
    '.bm-phone{width:375px;height:790px;background:#15171a;border-radius:46px;overflow:hidden;box-shadow:0 40px 80px rgba(0,0,0,0.7),0 0 0 1px rgba(255,255,255,0.08);position:relative;font-family:"Plus Jakarta Sans",-apple-system,BlinkMacSystemFont,sans-serif;-webkit-font-smoothing:antialiased}',
    '@media(max-height:870px) and (min-width:501px){.bm-phone{transform:scale(0.88);transform-origin:center}}',
    '@media(max-width:500px){.bm-ov{align-items:flex-end}.bm-phone{width:100vw;height:92dvh;border-radius:28px 28px 0 0;box-shadow:0 -10px 40px rgba(0,0,0,0.5)}.bm-x{top:10px;right:12px}.bm-note{display:none}}',
    '.bm-note{font-size:11px;color:rgba(255,255,255,0.28);text-align:center;letter-spacing:0.03em;margin-top:12px}',
    '.bm-vp{position:relative;width:100%;height:100%;overflow:hidden}',
    '.bm-sc{position:absolute;inset:0;display:flex;flex-direction:column;background:#15171a;overflow:hidden}',
    '.bm-sc *{box-sizing:border-box}',
    '.bm-body{flex:1;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;scrollbar-width:none}',
    '.bm-body::-webkit-scrollbar{display:none}',
    // Transitions
    '.bm-er{animation:bm-ir .28s cubic-bezier(.2,0,0,1) forwards}',
    '.bm-el{animation:bm-il .28s cubic-bezier(.2,0,0,1) forwards}',
    '.bm-xl{animation:bm-ol .28s cubic-bezier(.2,0,0,1) forwards}',
    '.bm-xr{animation:bm-or .28s cubic-bezier(.2,0,0,1) forwards}',
    '@keyframes bm-ir{from{transform:translateX(100%)}to{transform:translateX(0)}}',
    '@keyframes bm-il{from{transform:translateX(-100%)}to{transform:translateX(0)}}',
    '@keyframes bm-ol{from{transform:translateX(0)}to{transform:translateX(-28%)}}',
    '@keyframes bm-or{from{transform:translateX(0)}to{transform:translateX(100%)}}',
    // Status bar
    '.bm-sb{height:46px;display:flex;align-items:center;padding:0 22px;position:relative;z-index:5;flex-shrink:0}',
    '.bm-sb-t{font-size:15px;font-weight:700;color:#f1f2f0;letter-spacing:-0.3px}',
    '.bm-sb-r{margin-left:auto;display:flex;gap:5px;align-items:center}',
    // Header
    '.bm-hd{display:flex;align-items:center;gap:8px;padding:0 16px 14px;flex-shrink:0}',
    '.bm-back{width:36px;height:36px;border-radius:50%;background:#1e2124;border:none;color:#f1f2f0;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;font-size:17px;line-height:1}',
    '.bm-hd-title{flex:1;text-align:center;font-size:16px;font-weight:700;color:#f1f2f0}',
    '.bm-ico-btn{width:36px;height:36px;border-radius:50%;background:#1e2124;border:none;color:#9a9d9b;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0}',
    // Avatar
    '.bm-av{border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;color:rgba(0,0,0,0.45);flex-shrink:0}',
    // Cards + tiles
    '.bm-card{background:#1e2124;border-radius:18px;box-shadow:0 2px 10px rgba(0,0,0,.3)}',
    '.bm-tile{width:40px;height:40px;border-radius:13px;background:#262a2d;display:flex;align-items:center;justify-content:center;flex-shrink:0}',
    '.bm-tile-teal{background:#16332e}',
    // Hairline divider
    '.bm-div{height:1px;background:rgba(255,255,255,.06)}',
    // Section label
    '.bm-lbl{font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:#9a9d9b;padding:0 20px 8px}',
    // Pill
    '.bm-pill{display:inline-flex;align-items:center;padding:5px 11px;border-radius:999px;font-size:12px;font-weight:700}',
    '.bm-pill-teal{background:#16332e;color:#6fe0c9}',
    '.bm-pill-neutral{background:#262a2d;color:#9a9d9b}',
    // Trip nav
    '.bm-nav{flex-shrink:0;align-self:center;margin:8px auto 14px;display:flex;align-items:center;gap:2px;background:rgba(30,33,36,.88);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.08);border-radius:30px;padding:5px 6px;box-shadow:0 10px 30px rgba(0,0,0,.5);z-index:50;white-space:nowrap}',
    '.bm-ntab{display:flex;align-items:center;gap:5px;padding:8px 12px;border-radius:22px;border:none;background:transparent;color:#9a9d9b;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;position:relative;transition:color .15s}',
    '.bm-ntab.on{color:#22b3a0}',
    '.bm-npill{position:absolute;inset:0;border-radius:22px;background:#16332e;z-index:-1}',
    '.bm-fab{width:40px;height:40px;border-radius:50%;background:#22b3a0;border:none;color:#fff;font-size:22px;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 20px rgba(34,179,160,.35);margin-left:2px;font-family:inherit;transition:transform .15s}',
    '.bm-fab:active{transform:scale(.9)}',
    // Dashboard
    '.bm-logo{font-size:22px;font-weight:800;color:#f1f2f0;letter-spacing:-.5px}',
    '.bm-logo span{color:#22b3a0}',
    '.bm-trip-thumb{width:56px;height:56px;border-radius:14px;flex-shrink:0}',
    // Cover hero
    '.bm-hero{width:100%;height:270px;position:relative;flex-shrink:0;background:linear-gradient(160deg,#0d4a40 0%,#082820 55%,#0a0f12 100%)}',
    '.bm-hero-dim{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,.15) 0%,rgba(0,0,0,.6) 100%)}',
    '.bm-hero-body{position:absolute;inset:0;display:flex;flex-direction:column}',
    // Balance banner
    '.bm-banner{margin:0 16px 14px;background:#16332e;border-radius:18px;padding:15px 18px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;flex-shrink:0}',
    // Filter chips
    '.bm-chips{display:flex;gap:8px;padding:0 16px 14px;overflow-x:auto;scrollbar-width:none;flex-shrink:0}',
    '.bm-chips::-webkit-scrollbar{display:none}',
    '.bm-chip{flex-shrink:0;padding:6px 13px;border-radius:999px;font-size:12px;font-weight:700;border:none;cursor:pointer;font-family:inherit}',
    '.bm-chip.on{background:#22b3a0;color:#fff}',
    '.bm-chip.off{background:#1e2124;color:#9a9d9b}',
    // Transaction rows
    '.bm-tx-hd{display:flex;align-items:center;justify-content:space-between;padding:10px 0 7px;font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:#5c5f5d}',
    '.bm-tx-card{background:#1e2124;border-radius:18px;overflow:hidden;margin-bottom:12px}',
    '.bm-tx-row{display:flex;align-items:center;gap:11px;padding:13px 15px;cursor:pointer;transition:background .1s}',
    '.bm-tx-row:active{background:rgba(255,255,255,.03)}',
    '.bm-tx-row+.bm-tx-row{border-top:1px solid rgba(255,255,255,.05)}',
    // Expense detail
    '.bm-det-card{margin:0 16px 14px;background:#1e2124;border-radius:22px;padding:22px 18px;text-align:center}',
    '.bm-det-cat{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#9a9d9b;margin-bottom:12px;display:flex;align-items:center;justify-content:center;gap:5px}',
    '.bm-det-name{font-size:21px;font-weight:800;color:#f1f2f0;line-height:1.2}',
    '.bm-det-meta{font-size:13px;color:#5c5f5d;margin:5px 0 14px}',
    '.bm-det-total{font-size:36px;font-weight:800;color:#f1f2f0;letter-spacing:-1.5px}',
    '.bm-share-card{margin:0 16px 14px;background:#16332e;border-radius:18px;padding:14px 18px}',
    '.bm-list-sec{margin:0 16px 14px;background:#1e2124;border-radius:18px;overflow:hidden}',
    '.bm-lst-row{display:flex;align-items:center;gap:11px;padding:13px 15px}',
    '.bm-lst-row+.bm-lst-row{border-top:1px solid rgba(255,255,255,.05)}',
    // Balances
    '.bm-pos-card{margin:0 16px 18px;background:#16332e;border-radius:20px;padding:18px;text-align:center}',
    // Reports
    '.bm-sumgrid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(255,255,255,.06);margin:0 16px 18px;border-radius:18px;overflow:hidden}',
    '.bm-sumcell{background:#1e2124;padding:14px}',
    '.bm-bkrow{display:flex;align-items:center;gap:11px;padding:13px 15px;cursor:pointer}',
    '.bm-bkrow+.bm-bkrow{border-top:1px solid rgba(255,255,255,.05)}',
    // Utility
    '.bm-pad{height:76px}',
    '.bm-meta{margin:0 16px 14px;background:#262a2d;border-radius:16px;padding:11px 14px;font-size:12px;color:#5c5f5d;line-height:1.75}',
  ].join('');

  // ── STATUS BAR ───────────────────────────────────────────────────────────────
  function sb() {
    return '<div class="bm-sb"><span class="bm-sb-t">10:51</span><div class="bm-sb-r">' +
      '<svg width="15" height="11" viewBox="0 0 60 44" fill="#f1f2f0"><rect x="0" y="14" width="10" height="30" rx="2"/><rect x="16" y="9" width="10" height="35" rx="2"/><rect x="32" y="4" width="10" height="40" rx="2"/><rect x="48" y="0" width="10" height="44" rx="2"/></svg>' +
      '<svg width="16" height="11" viewBox="0 0 70 50" fill="#f1f2f0"><path d="M35 10C23 10 12.5 15 5 23.5L11 30C17 23 25.5 19 35 19s18 4 24 11l6-6.5C57.5 15 47 10 35 10z"/><path d="M35 24c-8.5 0-16 3.5-21.5 9L19 39c4-4 9.5-7 16-7s12 3 16 7l5.5-6C51 27.5 43.5 24 35 24z"/><circle cx="35" cy="47" r="4"/></svg>' +
      '<svg width="26" height="12" viewBox="0 0 78 36" fill="none"><rect x="1" y="1" width="66" height="34" rx="8" stroke="#f1f2f0" stroke-opacity=".35" stroke-width="2"/><rect x="4" y="4" width="50" height="28" rx="5" fill="#f1f2f0"/><path d="M70 12v12a6 6 0 0 0 0-12z" fill="#f1f2f0" fill-opacity=".45"/></svg>' +
    '</div></div>';
  }

  // ── TRIP NAV ─────────────────────────────────────────────────────────────────
  function nav(active) {
    function tab(id, icon, label) {
      var on = id === active;
      return '<button class="bm-ntab' + (on ? ' on' : '') + '" data-a="tab" data-tab="' + id + '">' +
        (on ? '<div class="bm-npill"></div>' : '') + IC[icon] + ' ' + label + '</button>';
    }
    return '<div class="bm-nav">' +
      tab('entries', 'tabEntries', 'Entries') +
      tab('balances', 'tabBal', 'Balances') +
      tab('reports', 'tabRep', 'Reports') +
      '<button class="bm-fab" data-a="fab">+</button></div>';
  }

  // ── SCREENS ──────────────────────────────────────────────────────────────────
  function scDashboard() {
    return '<div class="bm-body">' + sb() +
    '<div style="display:flex;align-items:center;justify-content:space-between;padding:2px 20px 18px">' +
      '<div class="bm-logo">bonado<span>.</span></div>' +
      '<div style="display:flex;gap:8px;align-items:center">' +
        '<button class="bm-ico-btn" style="background:transparent;border:none">' + IC.bell + '</button>' +
        ava(M('gelo'), 36) +
      '</div>' +
    '</div>' +
    // Japan 2027 — big card
    '<div style="margin:0 16px 10px;cursor:pointer">' +
      '<div class="bm-card" style="border-radius:22px;overflow:hidden">' +
        '<div style="height:150px;background:linear-gradient(135deg,#1e2228 0%,#13161a 100%);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#3a3e42;letter-spacing:.05em">trip cover — Japan</div>' +
        '<div style="padding:14px 16px">' +
          '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px">' +
            '<div style="font-size:18px;font-weight:800;color:#f1f2f0">Japan 2027</div>' +
            '<span class="bm-pill bm-pill-neutral">Settled up</span>' +
          '</div>' +
          '<div style="font-size:13px;color:#5c5f5d">Japan · Sep 27–Oct 9, 2027</div>' +
          '<div style="margin-top:10px">' + ava(M('gelo'), 24) + '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    // Ad Thai — active trip row
    '<div style="margin:0 16px 8px;cursor:pointer" data-a="openTrip">' +
      '<div class="bm-card" style="display:flex;align-items:center;gap:11px;padding:11px">' +
        '<div class="bm-trip-thumb" style="background:linear-gradient(135deg,#1c4a40,#0a2420)"></div>' +
        '<div style="flex:1;min-width:0">' +
          '<div style="font-size:15px;font-weight:700;color:#f1f2f0">Ad Thai</div>' +
          '<div style="font-size:12px;color:#5c5f5d;margin-top:2px">Bangkok · Jul 18–26, 2026</div>' +
          '<div style="display:flex;margin-top:6px">' +
            MEMBERS.slice(0,4).map(function(m){ return '<div class="bm-av" style="width:20px;height:20px;background:' + m.color + ';font-size:8px;margin-right:-5px;border:1.5px solid #1e2124">' + m.initial + '</div>'; }).join('') +
            '<div class="bm-av" style="width:20px;height:20px;background:#262a2d;font-size:8px;color:#9a9d9b;border:1.5px solid #1e2124">+1</div>' +
          '</div>' +
        '</div>' +
        '<div style="text-align:right;flex-shrink:0">' +
          '<div style="font-size:10px;font-weight:700;color:#55d6bc;text-transform:uppercase;letter-spacing:.05em">You\'re owed</div>' +
          '<div style="font-size:14px;font-weight:800;color:#55d6bc">₱20,813.87</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    // Seoulo Travel
    '<div style="margin:0 16px 8px">' +
      '<div class="bm-card" style="display:flex;align-items:center;gap:11px;padding:11px">' +
        '<div class="bm-trip-thumb" style="background:#1a1d21;display:flex;align-items:center;justify-content:center;font-size:9px;color:#2a2d31">cover</div>' +
        '<div style="flex:1">' +
          '<div style="font-size:15px;font-weight:700;color:#f1f2f0">Seoulo Travel</div>' +
          '<div style="font-size:12px;color:#5c5f5d;margin-top:2px">Seoul · Jul 6–18, 2026</div>' +
        '</div>' +
        '<div style="font-size:13px;color:#5c5f5d;font-weight:600">Settled ✓</div>' +
      '</div>' +
    '</div>' +
    '<div style="padding:18px 16px">' +
      '<button data-a="openTrip" style="width:100%;padding:14px;border-radius:999px;background:#22b3a0;color:#fff;border:none;font-size:14px;font-weight:700;font-family:inherit;cursor:pointer;box-shadow:0 8px 20px rgba(34,179,160,.3)">+ Create trip</button>' +
    '</div>' +
    '<div class="bm-pad"></div></div>';
  }

  function scTripHome() {
    var txHtml = EXPENSE_GROUPS.map(function(g) {
      return '<div style="padding:0 16px"><div class="bm-tx-hd"><span>' + g.date + '</span><span>' + g.total + '</span></div>' +
        '<div class="bm-tx-card">' +
        g.items.map(function(e) {
          if (e.type === 'settlement') {
            return '<div class="bm-tx-row" data-a="openExp" data-id="' + e.id + '">' +
              iconTile('swap', true) +
              '<div style="flex:1;min-width:0"><div style="font-size:14px;font-weight:600;color:#f1f2f0">' + e.desc + '</div><div style="font-size:12px;color:#9a9d9b;margin-top:1px">' + e.sub + '</div></div>' +
              '<div style="font-size:14px;font-weight:800;color:#55d6bc;text-align:right">' + e.amount + '</div></div>';
          }
          return '<div class="bm-tx-row" data-a="openExp" data-id="' + e.id + '">' +
            iconTile(e.icon) +
            '<div style="flex:1;min-width:0"><div style="font-size:14px;font-weight:600;color:#f1f2f0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + e.desc + '</div><div style="font-size:12px;color:#9a9d9b;margin-top:1px">' + e.sub + '</div></div>' +
            '<div style="text-align:right;flex-shrink:0"><div style="font-size:14px;font-weight:800;color:#f1f2f0">' + e.amount + '</div><div style="font-size:12px;color:#9a9d9b;margin-top:1px">' + e.share + '</div></div></div>';
        }).join('') +
        '</div></div>';
    }).join('');

    return '<div class="bm-body"><div class="bm-hero">' +
      '<div class="bm-hero-dim"></div>' +
      '<div class="bm-hero-body">' +
        sb() +
        '<div style="display:flex;align-items:center;gap:8px;padding:0 16px">' +
          '<button class="bm-back" data-a="back" style="background:rgba(30,33,36,.6);backdrop-filter:blur(8px)">←</button>' +
          '<div style="flex:1;text-align:center;font-size:17px;font-weight:700;color:#fff">Ad Thai</div>' +
          '<button class="bm-ico-btn" style="background:rgba(30,33,36,.6);backdrop-filter:blur(8px);border:none;color:#f1f2f0">' + IC.bell + '</button>' +
          '<button class="bm-ico-btn" style="background:rgba(30,33,36,.6);backdrop-filter:blur(8px);border:none;color:#f1f2f0">' + IC.gear + '</button>' +
        '</div>' +
        '<div style="margin-top:auto;padding:0 16px 14px;display:flex;align-items:flex-end;justify-content:space-between">' +
          '<div>' +
            '<div style="display:flex;margin-bottom:8px">' +
              MEMBERS.map(function(m){ return '<div class="bm-av" style="width:28px;height:28px;background:' + m.color + ';font-size:11px;margin-right:-6px;border:2px solid rgba(0,0,0,.5)">' + m.initial + '</div>'; }).join('') +
            '</div>' +
            '<div style="display:inline-flex;align-items:center;gap:5px;background:rgba(30,33,36,.7);backdrop-filter:blur(8px);padding:4px 10px 4px 8px;border-radius:999px;cursor:pointer">' +
              '<span style="color:#22b3a0">' + IC.link + '</span>' +
              '<span style="font-size:12px;font-weight:600;color:#22b3a0">Invite</span>' +
            '</div>' +
          '</div>' +
          '<div style="background:rgba(30,33,36,.7);backdrop-filter:blur(8px);padding:5px 10px;border-radius:999px;display:flex;align-items:center;gap:4px;cursor:pointer">' +
            '<span style="font-size:12px;font-weight:700;color:#f1f2f0">Orig curr.</span>' +
            '<span style="color:#a0a5a2">' + IC.chevdown + '</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    // Balance banner
    '<div class="bm-banner" data-a="gobal">' +
      '<div><div style="font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:#6fe0c9">You\'re owed</div>' +
      '<div style="font-size:21px;font-weight:800;color:#55d6bc;margin-top:2px">฿11,350.13</div></div>' +
      '<span style="color:#6fe0c9;font-size:20px">›</span>' +
    '</div>' +
    // Filter chips
    '<div class="bm-chips">' +
      '<button style="width:31px;height:31px;border-radius:50%;background:#1e2124;border:none;color:#9a9d9b;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0">' + IC.search + '</button>' +
      ['All','Paid','Created','Involves Me'].map(function(l,i){ return '<button class="bm-chip ' + (i===0?'on':'off') + '">' + l + '</button>'; }).join('') +
    '</div>' +
    txHtml +
    '<div class="bm-pad"></div></div>' +
    nav('entries');
  }

  function scExpenseDetail(id) {
    var exp = null;
    EXPENSE_GROUPS.forEach(function(g){ g.items.forEach(function(e){ if(e.id===id) exp=e; }); });
    if (!exp) exp = EXPENSE_GROUPS[0].items[0];
    var d = exp.detail || {};
    var isSett = exp.type === 'settlement';

    if (isSett) {
      return '<div class="bm-body">' + sb() +
        '<div class="bm-hd"><button class="bm-back" data-a="back">←</button><div class="bm-hd-title">Settlement</div><div style="width:36px"></div></div>' +
        '<div class="bm-det-card">' +
          '<div class="bm-det-cat">' + IC.swap + ' SETTLEMENT</div>' +
          '<div class="bm-det-name">Ellouise Cachero paid you</div>' +
          '<div class="bm-det-meta">July 26, 2026</div>' +
          '<div class="bm-det-total">฿10,433.77</div>' +
        '</div>' +
        '<div class="bm-meta">Created Jul 26, 2026 by Ellouise Cachero</div></div>';
    }

    return '<div class="bm-body">' + sb() +
      '<div class="bm-hd"><button class="bm-back" data-a="back">←</button><div class="bm-hd-title">Expense details</div><div style="font-size:14px;font-weight:700;color:#22b3a0;cursor:pointer;width:36px;text-align:right">Edit</div></div>' +
      '<div class="bm-det-card">' +
        '<div class="bm-det-cat">' + (IC[exp.icon]||IC.activities) + ' ' + (exp.cat||'').toUpperCase() + '</div>' +
        '<div class="bm-det-name">' + exp.desc + '</div>' +
        '<div class="bm-det-meta">' + (d.date||'July 26, 2026') + (d.payee ? ' · ' + d.payee : '') + '</div>' +
        '<div class="bm-det-total">' + exp.amount + '</div>' +
      '</div>' +
      '<div class="bm-share-card">' +
        '<div style="font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:#6fe0c9">Your Share</div>' +
        '<div style="font-size:22px;font-weight:800;color:#55d6bc;margin-top:3px">' + (d.yourShare||exp.amount) + '</div>' +
      '</div>' +
      '<div class="bm-lbl">Paid by</div>' +
      '<div class="bm-list-sec">' +
        '<div class="bm-lst-row">' +
          ava(d.paidBy === 'Gelo Avendaño' ? M('gelo') : d.paidBy === 'Serville' ? M('serville') : d.paidBy === 'Ariane' ? M('ariane') : M('nikko'), 36) +
          '<div style="flex:1"><div style="font-size:14px;font-weight:600;color:#f1f2f0">' + (d.paidBy||'Gelo Avendaño') + '</div><div style="font-size:12px;color:#9a9d9b;margin-top:2px">' + (d.method||'Cash') + '</div></div>' +
          '<div style="font-size:14px;font-weight:700;color:#f1f2f0">' + exp.amount + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="bm-lbl">Breakdown</div>' +
      '<div class="bm-list-sec">' +
        '<div class="bm-lst-row">' +
          ava(M('gelo'), 36) +
          '<div style="flex:1"><div style="font-size:14px;font-weight:600;color:#f1f2f0">Gelo Avendaño</div><div style="font-size:12px;color:#9a9d9b;margin-top:2px">Paid ' + (d.paidBy==='Gelo Avendaño'?exp.amount:'–') + ' · Share ' + (d.yourShare||exp.amount) + '</div></div>' +
          '<div style="font-size:14px;font-weight:700;color:' + (d.netColor==='owe'?'#e2857c':'#55d6bc') + '">' + (d.net||'฿0.00') + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="bm-meta">Created ' + (d.date||'July 26, 2026') + ' at 8:00 AM by ' + (d.paidBy||'Gelo Avendaño') + '</div>' +
      '<div class="bm-pad"></div></div>';
  }

  function scBalances() {
    return '<div class="bm-body">' + sb() +
      '<div class="bm-hd"><button class="bm-back" data-a="back">←</button><div class="bm-hd-title">Balances</div><div style="display:flex;gap:6px"><button class="bm-ico-btn" style="border:none;cursor:pointer">' + IC.bell + '</button><button class="bm-ico-btn" style="border:none;cursor:pointer">' + IC.gear + '</button></div></div>' +
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:0 16px 14px">' +
        '<div style="font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:#9a9d9b">Display Currency</div>' +
        '<div style="display:flex;align-items:center;gap:4px;background:#1e2124;padding:5px 11px;border-radius:999px;cursor:pointer"><span style="font-size:13px;font-weight:700;color:#22b3a0">THB</span><span style="color:#22b3a0">' + IC.chevdown + '</span></div>' +
      '</div>' +
      '<div class="bm-pos-card">' +
        '<div style="font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:#6fe0c9">Your Position</div>' +
        '<div style="font-size:28px;font-weight:800;color:#55d6bc;margin-top:5px">You\'re owed ฿11,350.13</div>' +
      '</div>' +
      '<div class="bm-lbl">By Member</div>' +
      '<div class="bm-list-sec">' +
        MEMBERS.map(function(m) {
          var c = m.balance > 0 ? '#55d6bc' : m.balance < 0 ? '#e2857c' : '#5c5f5d';
          var sign = m.balance > 0 ? '+' : '';
          var val = m.balance === 0 ? '฿0.00' : sign + fmt(m.balance);
          return '<div class="bm-lst-row">' + ava(m,36) + '<div style="flex:1;font-size:14px;font-weight:600;color:#f1f2f0">' + m.name + '</div><div style="font-size:14px;font-weight:700;color:' + c + '">' + val + '</div></div>';
        }).join('') +
      '</div>' +
      '<div class="bm-lbl">Suggested Settlements</div>' +
      '<div style="padding:0 16px">' +
        SETTLEMENTS_DATA.map(function(s) {
          return '<button style="display:flex;align-items:center;justify-content:space-between;background:#1e2124;border:none;border-radius:16px;padding:14px 16px;font-family:inherit;cursor:pointer;width:100%;margin-bottom:8px">' +
            '<span style="font-size:13px;color:#f1f2f0"><strong>' + s.from + '</strong> pays <strong>' + s.to + '</strong></span>' +
            '<span style="font-size:14px;font-weight:700;color:#22b3a0">' + s.amount + '</span></button>';
        }).join('') +
      '</div>' +
      '<div class="bm-pad"></div></div>' +
      nav('balances');
  }

  function scReports() {
    return '<div class="bm-body">' + sb() +
      '<div class="bm-hd"><button class="bm-back" data-a="back">←</button><div class="bm-hd-title">Reports</div><div style="display:flex;gap:6px"><button class="bm-ico-btn" style="border:none;cursor:pointer">' + IC.bell + '</button><button class="bm-ico-btn" style="border:none;cursor:pointer">' + IC.gear + '</button></div></div>' +
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:0 16px 12px">' +
        '<div style="font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:#9a9d9b">Spending Summary</div>' +
        '<div style="display:flex;align-items:center;gap:4px;background:#1e2124;padding:5px 11px;border-radius:999px;cursor:pointer"><span style="font-size:13px;font-weight:700;color:#22b3a0">THB</span><span style="color:#22b3a0">' + IC.chevdown + '</span></div>' +
      '</div>' +
      '<div class="bm-sumgrid">' +
        '<div class="bm-sumcell"><div style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#5c5f5d">You Spent</div><div style="font-size:21px;font-weight:800;color:#22b3a0;margin:4px 0 2px">' + REPORTS_DATA.youSpent + '</div><div style="font-size:11px;color:#5c5f5d">' + REPORTS_DATA.youPHP + '</div></div>' +
        '<div class="bm-sumcell"><div style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#5c5f5d">Group Spent</div><div style="font-size:21px;font-weight:800;color:#f1f2f0;margin:4px 0 2px">' + REPORTS_DATA.groupSpent + '</div><div style="font-size:11px;color:#5c5f5d">' + REPORTS_DATA.groupPHP + '</div></div>' +
      '</div>' +
      '<div class="bm-lbl">Spending Breakdown</div>' +
      '<div style="margin:0 16px"><div class="bm-card" style="overflow:hidden">' +
        REPORTS_DATA.breakdown.map(function(item) {
          return '<div class="bm-bkrow">' +
            iconTile(item.icon) +
            '<div style="flex:1;min-width:0">' +
              '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">' +
                '<div><div style="font-size:14px;font-weight:600;color:#f1f2f0">' + item.name + '</div><div style="font-size:16px;font-weight:800;color:#22b3a0;margin:2px 0 1px">' + item.you + '</div><div style="font-size:11px;color:#9a9d9b">You · ' + item.youPct + '</div></div>' +
                '<div style="text-align:right;flex-shrink:0"><div style="font-size:14px;font-weight:700;color:#f1f2f0">' + item.group + '</div><div style="font-size:11px;color:#9a9d9b;margin-top:3px">Group · ' + item.groupPct + '</div></div>' +
              '</div>' +
            '</div>' +
            '<span style="color:#3a3e42">' + IC.chevright + '</span></div>';
        }).join('') +
      '</div></div>' +
      '<div class="bm-pad"></div></div>' +
      nav('reports');
  }

  // ── STATE + NAV ───────────────────────────────────────────────────────────────
  var history = [];
  var cur = null;
  var curData = null;
  var vp = null;

  function goTo(screen, data, dir) {
    history.push({ screen: cur, data: curData });
    cur = screen; curData = data;
    _swap(screen, data, dir || 'fwd');
  }
  function goBack() {
    if (!history.length) return;
    var p = history.pop();
    cur = p.screen; curData = p.data;
    _swap(p.screen, p.data, 'back');
  }
  function switchTab(tab) {
    var order = ['entries','balances','reports'];
    var curTab = cur === 'tripHome' ? 'entries' : cur;
    var dir = order.indexOf(tab) > order.indexOf(curTab) ? 'fwd' : 'back';
    cur = tab === 'entries' ? 'tripHome' : tab;
    curData = null;
    _swap(cur, null, dir);
  }
  function _swap(screen, data, dir) {
    var old = vp.querySelector('.bm-sc');
    var el = document.createElement('div');
    el.className = 'bm-sc';
    el.innerHTML = _render(screen, data);
    if (old && dir !== 'none') {
      old.classList.add(dir === 'fwd' ? 'bm-xl' : 'bm-xr');
      el.classList.add(dir === 'fwd' ? 'bm-er' : 'bm-el');
      vp.appendChild(el);
      setTimeout(function(){ old.remove(); }, 300);
    } else {
      if (old) old.remove();
      vp.appendChild(el);
    }
  }
  function _render(screen, data) {
    if (screen === 'dashboard') return scDashboard();
    if (screen === 'tripHome')  return scTripHome();
    if (screen === 'expenseDetail') return scExpenseDetail(data);
    if (screen === 'balances')  return scBalances();
    if (screen === 'reports')   return scReports();
    return scDashboard();
  }

  // ── EVENTS ───────────────────────────────────────────────────────────────────
  function onClick(e) {
    var t = e.target.closest('[data-a]');
    if (!t) return;
    var a = t.getAttribute('data-a');
    if (a === 'back')    goBack();
    if (a === 'openTrip') goTo('tripHome', null);
    if (a === 'openExp')  goTo('expenseDetail', parseInt(t.getAttribute('data-id')));
    if (a === 'gobal')    goTo('balances', null);
    if (a === 'tab')      switchTab(t.getAttribute('data-tab'));
  }

  // ── MOUNT ─────────────────────────────────────────────────────────────────────
  function mount() {
    var st = document.createElement('style');
    st.textContent = CSS;
    document.head.appendChild(st);

    var lk = document.createElement('link');
    lk.rel = 'stylesheet';
    lk.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800&display=swap';
    document.head.appendChild(lk);

    var ov = document.createElement('div');
    ov.className = 'bm-ov';
    ov.id = 'bmOv';
    ov.innerHTML = '<button class="bm-x" id="bmClose">✕</button><div style="display:flex;flex-direction:column;align-items:center"><div class="bm-phone"><div class="bm-vp" id="bmVp"></div></div><p class="bm-note">Rough interactive mockup — not all screens included</p></div>';
    document.body.appendChild(ov);

    vp = document.getElementById('bmVp');
    ov.addEventListener('click', onClick);
    ov.addEventListener('click', function(e){ if(e.target===ov) closeMock(); });
    document.getElementById('bmClose').addEventListener('click', closeMock);
    document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeMock(); });
  }

  function openMock() {
    var ov = document.getElementById('bmOv');
    ov.classList.add('open');
    history = [];
    cur = 'dashboard'; curData = null;
    _swap('dashboard', null, 'none');
  }
  function closeMock() {
    document.getElementById('bmOv').classList.remove('open');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

  window.openBonadoMock = openMock;
})();
