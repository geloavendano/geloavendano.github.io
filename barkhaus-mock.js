(function () {
  'use strict';

  // ── DATA ────────────────────────────────────────────────────────────────────
  var BOOKS = [
    { id:1, ref:'BH-1093', status:'confirmed',  pay:'paid',           src:'online', svc:'grooming', date:'Jul 31',
      owner:'Maria Santos',    pet:'Max',   breed:'Pomeranian',       siz:'Small',  gen:'M', age:'3y' },
    { id:2, ref:'BH-1092', status:'pending',    pay:'unpaid',         src:'online', svc:'hotel',    date:'Aug 1',
      owner:'Jose dela Cruz',  pet:'Luna',  breed:'Shih Tzu',         siz:'Small',  gen:'F', age:'2y' },
    { id:3, ref:'BH-1091', status:'checked_in', pay:'partially_paid', src:'admin',  svc:'grooming', date:'Jul 31',
      owner:'Anna Reyes',      pet:'Mochi', breed:'Maltese',          siz:'Small',  gen:'F', age:'4y' },
    { id:4, ref:'BH-1090', status:'confirmed',  pay:'paid',           src:'admin',  svc:'daycare',  date:'Jul 31',
      owner:'Carlos Lim',      pet:'Bruno', breed:'Labrador',         siz:'Large',  gen:'M', age:'1y' },
    { id:5, ref:'BH-1089', status:'completed',  pay:'paid',           src:'online', svc:'hotel',    date:'Jul 28',
      owner:'Lea Torres',      pet:'Coco',  breed:'Golden Retriever', siz:'Large',  gen:'F', age:'5y' },
    { id:6, ref:'BH-1088', status:'confirmed',  pay:'unpaid',         src:'walkin', svc:'studio',   date:'Jul 30',
      owner:'Ryan Tan',        pet:'Milo',  breed:'Corgi',            siz:'Medium', gen:'M', age:'2y' },
  ];

  var BDET = {
    1: { timeslot:'10:00 AM', stylist:'Jed',   service:'Full groom + bath', mobile:'0917 234 5678', total:'PHP 1,200' },
    2: { checkin:'Aug 1, 2026 (Sat)', checkout:'Aug 3, 2026 (Mon)', dropoff:'8:00 AM', pickup:'6:00 PM', room:'Small Cage', mobile:'0918 876 4321', total:'PHP 2,800' },
    3: { timeslot:'2:00 PM',  stylist:'Aga',   service:'Bath & blowdry',    mobile:'0919 111 2222', total:'PHP 850'   },
    4: { date:'Jul 31, 2026 (Thu)', dropoff:'8:00 AM', pickup:'5:00 PM', hours:9, mobile:'0917 555 6677', total:'PHP 700' },
    5: { checkin:'Jul 28, 2026 (Tue)', checkout:'Jul 29, 2026 (Wed)', dropoff:'9:00 AM', pickup:'5:00 PM', room:'Large Cage', mobile:'0918 333 4444', total:'PHP 3,000' },
    6: { timeslot:'3:00 PM',  studio:'Studio A', mobile:'0916 777 8888', total:'PHP 500' },
  };

  var STC = { pending:'#FFCE58', 'pencil-booked':'#9B95E8', confirmed:'#4D96B9', checked_in:'#1D9E75', completed:'#6BCB77', cancelled:'#888780', rejected:'#888780' };
  var STL = { pending:'Pending', 'pencil-booked':'Pencil-booked', confirmed:'Confirmed', checked_in:'Checked in', completed:'Completed', cancelled:'Cancelled', rejected:'Rejected' };
  var PAC = { unpaid:'#FF6B6B', partially_paid:'#EF9F27', paid:'#6BCB77', refunded:'#9B95E8' };
  var PAL = { unpaid:'Unpaid', partially_paid:'Partial', paid:'Paid', refunded:'Refunded' };
  var SVC_C = { grooming:'#4D96B9', hotel:'#EF9F27', daycare:'#1D9E75', studio:'#D4537E' };
  var SVL   = { grooming:'Grooming', hotel:'Hotel', daycare:'Daycare', studio:'Studio' };
  var SRL   = { online:'Online', admin:'Admin', walkin:'Walk-in' };

  var GROOMERS = [
    { name:'Jed', slots:[
      { h:9,  m:0,  dur:90, lbl:'Max · Santos',      st:'confirmed',  pa:'paid'           },
      { h:11, m:0,  dur:60, lbl:'Princess · Ocampo', st:'confirmed',  pa:'unpaid'         },
      { h:14, m:0,  dur:75, lbl:'Noodles · Ramos',   st:'checked_in', pa:'paid'           },
    ]},
    { name:'Aga', slots:[
      { h:10, m:0,  dur:60, lbl:'Mochi · Reyes',     st:'checked_in', pa:'partially_paid' },
      { h:13, m:0,  dur:90, lbl:'Fluffy · Garcia',   st:'confirmed',  pa:'paid'           },
    ]},
    { name:'Kaye', slots:[
      { h:9,  m:30, dur:60, lbl:'Choco · Lee',        st:'confirmed',  pa:'paid'           },
      { h:11, m:30, dur:75, lbl:'Pepper · Cruz',      st:'pending',    pa:'unpaid'         },
    ]},
  ];

  // ── STATE ────────────────────────────────────────────────────────────────────
  var cur      = 'bookings';
  var svcFilt  = 'all';
  var activeId = null;
  var pgEl = null, drwEl = null, ovEl = null;

  // ── CSS ──────────────────────────────────────────────────────────────────────
  var CSS = [
    // Overlay
    '.bk-ov{position:fixed;inset:0;z-index:950;background:rgba(4,9,16,0.86);display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .3s;backdrop-filter:blur(6px)}',
    '.bk-ov.open{opacity:1;pointer-events:all}',
    '.bk-xbtn{position:absolute;top:12px;right:14px;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,0.1);border:none;color:#F0EDE6;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:15;transition:background .15s}',
    '.bk-xbtn:hover{background:rgba(255,255,255,.18)}',
    // Window
    '.bk-win{width:900px;height:570px;background:#0F1C26;border-radius:13px;overflow:hidden;display:flex;flex-direction:column;font-family:"Nunito",sans-serif;-webkit-font-smoothing:antialiased;color:#F0EDE6;font-size:13px;box-shadow:0 40px 90px rgba(0,0,0,.72),0 0 0 1px rgba(77,150,185,.16)}',
    '@media(max-height:630px),(max-width:940px){.bk-win{transform:scale(0.87);transform-origin:center}}',
    '@media(max-width:600px){.bk-ov{align-items:flex-end}.bk-win{width:100%;height:90dvh;border-radius:16px 16px 0 0;transform:none}.bk-note{display:none}}',
    '.bk-note{font-size:11px;color:rgba(255,255,255,0.28);text-align:center;letter-spacing:0.03em;margin-top:12px}',
    '.bk-win *{box-sizing:border-box}',
    // Top bar
    '.bk-tb{height:48px;background:#1A3044;border-bottom:0.5px solid rgba(77,150,185,.22);display:flex;align-items:center;padding:0 12px;gap:4px;flex-shrink:0;z-index:5}',
    '.bk-tblogo{font-family:"Fredoka One",cursive;font-size:15px;color:#F0EDE6;margin-right:10px;cursor:default;letter-spacing:.2px}',
    '.bk-tblogo em{color:#4D96B9;font-style:normal}',
    '.bk-brch{font-size:11px;font-weight:700;padding:4px 10px;border-radius:14px;cursor:pointer;font-family:inherit;transition:background .12s,color .12s}',
    '.bk-brch.on{background:#1F3D55;color:#F0EDE6;border:0.5px solid #4D96B9}',
    '.bk-brch.off{background:transparent;color:#6AAEC8;border:0.5px solid rgba(77,150,185,.22)}',
    '.bk-tbright{margin-left:auto;display:flex;align-items:center;gap:8px}',
    '.bk-greet{font-size:11.5px;font-weight:600;color:#6AAEC8}',
    '.bk-sotbtn{font-size:11px;color:#6AAEC8;background:transparent;border:0.5px solid rgba(77,150,185,.22);border-radius:12px;padding:4px 10px;cursor:pointer;font-family:inherit}',
    // Body
    '.bk-bd{display:flex;flex:1;overflow:hidden}',
    // Sidebar
    '.bk-sb{width:174px;background:#1A3044;border-right:0.5px solid rgba(77,150,185,.22);flex-shrink:0;display:flex;flex-direction:column;padding:6px 0;overflow-y:auto}',
    '.bk-nbtn{display:flex;align-items:center;gap:8px;width:100%;padding:9px 13px;border:none;border-left:2px solid transparent;background:transparent;color:#6AAEC8;font-size:12px;font-weight:600;cursor:pointer;text-align:left;font-family:inherit;transition:background .1s,color .1s}',
    '.bk-nbtn:hover{background:rgba(77,150,185,.08);color:#B8D4E0}',
    '.bk-nbtn.on{background:rgba(77,150,185,.13);color:#F0EDE6;border-left-color:#4D96B9}',
    '.bk-nico{font-size:13px;width:18px;text-align:center;flex-shrink:0}',
    '.bk-nguide{margin-top:auto}',
    // Content
    '.bk-ct{flex:1;display:flex;flex-direction:column;overflow:hidden;position:relative}',
    '.bk-pg{flex:1;overflow-y:auto;overflow-x:hidden;padding:15px 16px;scrollbar-width:thin;scrollbar-color:rgba(77,150,185,.2) transparent}',
    '.bk-pg::-webkit-scrollbar{width:4px}',
    '.bk-pg::-webkit-scrollbar-thumb{background:rgba(77,150,185,.2);border-radius:2px}',
    // Page title (Fredoka One)
    '.bk-ptitle{font-family:"Fredoka One",cursive;font-size:21px;color:#F0EDE6;margin:0 0 12px}',
    // Filter tabs
    '.bk-ftabs{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:10px}',
    '.bk-ftab{font-size:11px;font-weight:600;padding:5px 11px;border-radius:14px;border:0.5px solid rgba(77,150,185,.22);background:transparent;color:#6AAEC8;cursor:pointer;font-family:inherit;transition:all .12s}',
    '.bk-ftab:hover:not(.on){background:rgba(77,150,185,.07);color:#B8D4E0}',
    '.bk-ftab.on{background:#1A3044;color:#F0EDE6;border-color:#4D96B9}',
    // Table
    '.bk-tbl{width:100%;border-collapse:collapse}',
    '.bk-tbl th{text-align:left;font-size:9px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:#6AAEC8;padding:7px 10px;border-bottom:0.5px solid rgba(77,150,185,.22)}',
    '.bk-tbl td{padding:9px 10px;border-bottom:0.5px solid rgba(77,150,185,.1);vertical-align:middle;font-size:12px}',
    '.bk-tr{cursor:pointer}',
    '.bk-tr:hover td{background:rgba(77,150,185,.06)}',
    '.bk-tr.sel td{background:rgba(77,150,185,.12)}',
    '.bk-owner{font-weight:600;color:#F0EDE6;margin-bottom:1px}',
    '.bk-pet{font-size:11px;color:#6AAEC8}',
    // Badges
    '.bk-bdg{display:inline-flex;align-items:center;padding:2px 7px;border-radius:999px;font-size:10px;font-weight:700;white-space:nowrap}',
    // FAB
    '.bk-fab{width:34px;height:34px;border-radius:50%;background:#FFCE58;border:none;color:#0F1C26;font-size:20px;line-height:1;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 12px rgba(255,206,88,.3);font-weight:700;flex-shrink:0;font-family:inherit}',
    '.bk-fab:hover{filter:brightness(1.08)}',
    // Drawer
    '.bk-drw{position:absolute;top:0;right:0;bottom:0;width:310px;background:#1A3044;border-left:0.5px solid rgba(77,150,185,.22);display:flex;flex-direction:column;transform:translateX(100%);transition:transform .24s cubic-bezier(.2,0,.2,1);z-index:10;overflow:hidden}',
    '.bk-drw.open{transform:translateX(0)}',
    '.bk-drw-hd{padding:13px 15px;border-bottom:0.5px solid rgba(77,150,185,.22);flex-shrink:0}',
    '.bk-drw-htop{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}',
    '.bk-drw-ref{font-family:monospace;font-size:14px;font-weight:700;color:#4D96B9}',
    '.bk-drw-close{font-size:11px;color:#6AAEC8;background:#1F3D55;border:0.5px solid rgba(77,150,185,.22);border-radius:9px;padding:4px 9px;cursor:pointer;font-family:inherit}',
    '.bk-drw-body{flex:1;overflow-y:auto;padding:13px 15px;scrollbar-width:thin;scrollbar-color:rgba(77,150,185,.2) transparent}',
    '.bk-slbl{font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#6AAEC8;margin:12px 0 7px}',
    '.bk-slbl:first-child{margin-top:0}',
    '.bk-card{background:#1F3D55;border-radius:10px;padding:11px 13px;margin-bottom:8px}',
    '.bk-kv{display:flex;justify-content:space-between;align-items:flex-start;gap:6px;margin-bottom:5px}',
    '.bk-kv:last-child{margin-bottom:0}',
    '.bk-kvk{font-size:11px;color:#6AAEC8;flex-shrink:0}',
    '.bk-kvv{font-size:12px;font-weight:600;color:#F0EDE6;text-align:right}',
    '.bk-drw-acts{padding:11px 15px;border-top:0.5px solid rgba(77,150,185,.22);flex-shrink:0;display:flex;gap:6px}',
    '.bk-actbtn{flex:1;padding:9px;border-radius:8px;border:0.5px solid rgba(77,150,185,.22);background:#1F3D55;color:#B8D4E0;font:600 11px "Nunito",sans-serif;cursor:pointer;text-align:center}',
    '.bk-actbtn.pri{background:#FFCE58;color:#0F1C26;border:none;font-weight:700}',
    '.bk-actbtn:hover{filter:brightness(1.1)}',
    // Calendar
    '.bk-cal-hd{display:flex;align-items:center;gap:8px;margin-bottom:12px;flex-wrap:wrap}',
    '.bk-calnav{width:26px;height:26px;border-radius:50%;background:#1F3D55;border:none;color:#6AAEC8;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1}',
    '.bk-caldate{font-size:14px;font-weight:700;color:#F0EDE6}',
    '.bk-svctgl{display:flex;gap:4px;margin-left:auto}',
    '.bk-svctb{font-size:11px;font-weight:600;padding:4px 10px;border-radius:12px;border:0.5px solid rgba(77,150,185,.22);background:transparent;color:#6AAEC8;cursor:pointer;font-family:inherit}',
    '.bk-svctb.on{background:#1F3D55;color:#F0EDE6;border-color:#4D96B9}',
    // Calendar grid
    '.bk-grid{display:flex;border:0.5px solid rgba(77,150,185,.22);border-radius:10px;overflow:hidden;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(77,150,185,.2) transparent}',
    '.bk-tcol{width:42px;flex-shrink:0;background:#1A3044;border-right:0.5px solid rgba(77,150,185,.12)}',
    '.bk-thd{height:32px;border-bottom:0.5px solid rgba(77,150,185,.18)}',
    '.bk-tcell{height:54px;display:flex;align-items:flex-start;padding:3px 5px 0;font-size:9px;color:#6AAEC8;font-weight:600;border-bottom:0.5px solid rgba(77,150,185,.08)}',
    '.bk-gcols{flex:1;display:flex;overflow-x:auto}',
    '.bk-gcol{flex:1;min-width:130px;display:flex;flex-direction:column;border-right:0.5px solid rgba(77,150,185,.12)}',
    '.bk-gcol:last-child{border-right:none}',
    '.bk-gcolhd{height:32px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#F0EDE6;border-bottom:0.5px solid rgba(77,150,185,.18);flex-shrink:0;background:#1A3044}',
    '.bk-gbody{position:relative}',
    '.bk-ghour{position:absolute;left:0;right:0;border-top:0.5px solid rgba(77,150,185,.08)}',
    '.bk-blk{position:absolute;left:3px;right:3px;border-radius:5px;padding:4px 5px;overflow:hidden;cursor:pointer}',
    '.bk-blk-lbl{font-size:10px;font-weight:700;color:rgba(0,0,0,.6);line-height:1.3;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
    '.bk-blk-sub{font-size:9px;color:rgba(0,0,0,.45);font-weight:600;margin-top:1px}',
    // Placeholder screens
    '.bk-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;height:300px;color:#6AAEC8;gap:8px}',
    '.bk-empty-icon{font-size:36px;opacity:.4}',
    '.bk-empty-txt{font-size:13px;font-weight:600}',
  ].join('');

  // ── HELPERS ──────────────────────────────────────────────────────────────────
  function badge(text, hex) {
    var r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return '<span class="bk-bdg" style="color:'+hex+';background:rgba('+r+','+g+','+b+',.18)">'+text+'</span>';
  }
  function kv(k, v) {
    return '<div class="bk-kv"><span class="bk-kvk">'+k+'</span><span class="bk-kvv">'+v+'</span></div>';
  }
  function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  // ── TOP BAR ──────────────────────────────────────────────────────────────────
  function topbar() {
    return '<div class="bk-tb">' +
      '<div class="bk-tblogo">barkhaus<em>.</em></div>' +
      '<button class="bk-brch on">Estancia</button>' +
      '<button class="bk-brch off">Eastwood</button>' +
      '<div class="bk-tbright">' +
        '<span class="bk-greet">Hi, Gelo 👋</span>' +
        '<button class="bk-sotbtn">Sign out</button>' +
      '</div>' +
    '</div>';
  }

  // ── SIDEBAR ──────────────────────────────────────────────────────────────────
  function sidebar() {
    var items = [
      { key:'calendar',  icon:'📅', label:'Calendar'  },
      { key:'bookings',  icon:'📋', label:'Bookings'  },
      { key:'checkin',   icon:'🐾', label:'Pending'   },
      { key:'members',   icon:'👤', label:'Members'   },
      { key:'resources', icon:'📦', label:'Inventory' },
      { key:'reports',   icon:'📊', label:'Reports'   },
    ];
    return '<div class="bk-sb">' +
      items.map(function(it) {
        return '<button class="bk-nbtn' + (cur===it.key?' on':'') + '" data-a="nav" data-page="'+it.key+'">' +
          '<span class="bk-nico">'+it.icon+'</span>'+it.label+'</button>';
      }).join('') +
      '<a class="bk-nbtn bk-nguide" href="#"><span class="bk-nico">📖</span>Admin Guide</a>' +
    '</div>';
  }

  // ── BOOKINGS SCREEN ──────────────────────────────────────────────────────────
  function scBookings() {
    var list = svcFilt === 'all' ? BOOKS : BOOKS.filter(function(b){ return b.svc === svcFilt; });
    var rows = list.map(function(b) {
      var sel = activeId === b.id;
      return '<tr class="bk-tr'+(sel?' sel':'')+ '" data-a="row" data-id="'+b.id+'">' +
        '<td><span style="font-family:monospace;font-size:11px;font-weight:700;color:#4D96B9">'+b.ref+'</span></td>' +
        '<td><div class="bk-owner">'+esc(b.owner)+'</div><div class="bk-pet">'+esc(b.pet)+' · '+esc(b.breed)+'</div></td>' +
        '<td>'+badge(SVL[b.svc], SVC_C[b.svc])+'</td>' +
        '<td style="color:#B8D4E0;font-size:12px">'+b.date+'</td>' +
        '<td>'+badge(STL[b.status], STC[b.status])+'</td>' +
        '<td>'+badge(PAL[b.pay], PAC[b.pay])+'</td>' +
        '<td style="color:#6AAEC8;font-size:11px">'+SRL[b.src]+'</td>' +
      '</tr>';
    }).join('');

    return '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">' +
        '<h1 class="bk-ptitle" style="margin:0">Bookings</h1>' +
        '<button class="bk-fab" title="Add booking">+</button>' +
      '</div>' +
      '<div class="bk-ftabs">' +
        ['all','grooming','hotel','daycare','studio'].map(function(f) {
          return '<button class="bk-ftab'+(svcFilt===f?' on':'')+ '" data-a="svc" data-svc="'+f+'">' +
            (f === 'all' ? 'All services' : SVL[f]) + '</button>';
        }).join('') +
      '</div>' +
      '<table class="bk-tbl">' +
        '<thead><tr>' +
          '<th>REF</th><th>OWNER & PET</th><th>SERVICE</th><th>DATE</th><th>STATUS</th><th>PAYMENT</th><th>SOURCE</th>' +
        '</tr></thead>' +
        '<tbody>'+rows+'</tbody>' +
      '</table>';
  }

  // ── CALENDAR SCREEN ──────────────────────────────────────────────────────────
  function scCalendar() {
    var DAY_START = 9, DAY_END = 17, PX_PER_HR = 54;
    var HOURS = DAY_END - DAY_START;
    var GRID_H = HOURS * PX_PER_HR;

    var timeLabels = '';
    for (var h = DAY_START; h < DAY_END; h++) {
      var lbl = h === 12 ? '12PM' : h > 12 ? (h-12)+'PM' : h+'AM';
      timeLabels += '<div class="bk-tcell">'+lbl+'</div>';
    }

    var hourLines = '';
    for (var i = 0; i < HOURS; i++) {
      hourLines += '<div class="bk-ghour" style="top:'+(i*PX_PER_HR)+'px"></div>';
    }

    var cols = GROOMERS.map(function(gr) {
      var blocks = gr.slots.map(function(s) {
        var top = ((s.h - DAY_START) + s.m/60) * PX_PER_HR;
        var ht  = s.dur / 60 * PX_PER_HR;
        var col = SVC_C.grooming;
        var r = parseInt(col.slice(1,3),16), g2 = parseInt(col.slice(3,5),16), b = parseInt(col.slice(5,7),16);
        return '<div class="bk-blk" style="top:'+top+'px;height:'+ht+'px;background:rgba('+r+','+g2+','+b+',.85)">' +
          '<div class="bk-blk-lbl">'+esc(s.lbl)+'</div>' +
          (ht >= 34 ? '<div class="bk-blk-sub">'+STL[s.st]+'</div>' : '') +
        '</div>';
      }).join('');
      return '<div class="bk-gcol">' +
        '<div class="bk-gcolhd">'+esc(gr.name)+'</div>' +
        '<div class="bk-gbody" style="height:'+GRID_H+'px">'+hourLines+blocks+'</div>' +
      '</div>';
    }).join('');

    return '<h1 class="bk-ptitle">Calendar</h1>' +
      '<div class="bk-cal-hd">' +
        '<button class="bk-calnav">‹</button>' +
        '<span class="bk-caldate">Thursday, July 31, 2026</span>' +
        '<button class="bk-calnav">›</button>' +
        '<div class="bk-svctgl">' +
          '<button class="bk-svctb on">Groomers</button>' +
          '<button class="bk-svctb">Rooms</button>' +
        '</div>' +
        '<button class="bk-fab" title="Add booking" style="margin-left:8px">+</button>' +
      '</div>' +
      '<div class="bk-grid" style="max-height:'+(GRID_H+33)+'px">' +
        '<div class="bk-tcol"><div class="bk-thd"></div>'+timeLabels+'</div>' +
        '<div class="bk-gcols">'+cols+'</div>' +
      '</div>';
  }

  // ── PLACEHOLDER SCREENS ──────────────────────────────────────────────────────
  function scPlaceholder(icon, label) {
    return '<h1 class="bk-ptitle">'+label+'</h1>' +
      '<div class="bk-empty">' +
        '<div class="bk-empty-icon">'+icon+'</div>' +
        '<div class="bk-empty-txt">'+label+' view</div>' +
        '<div style="font-size:12px;color:#6AAEC8;opacity:.6">Not included in this preview</div>' +
      '</div>';
  }

  // ── DRAWER ───────────────────────────────────────────────────────────────────
  function renderDrawer() {
    if (!activeId) { drwEl.classList.remove('open'); return; }
    var b = BOOKS.find(function(x){ return x.id === activeId; });
    var d = BDET[activeId] || {};
    if (!b) return;

    var details = '';
    if (b.svc === 'grooming') {
      details = kv('Date', 'Jul 31, 2026 (Thu)') + kv('Timeslot', d.timeslot) + kv('Groomer', d.stylist) + kv('Service', d.service);
    } else if (b.svc === 'hotel') {
      details = kv('Check-in', d.checkin) + kv('Check-out', d.checkout) + kv('Drop-off', d.dropoff) + kv('Pick-up', d.pickup) + kv('Room', d.room);
    } else if (b.svc === 'daycare') {
      details = kv('Date', d.date) + kv('Drop-off', d.dropoff) + kv('Pick-up', d.pickup) + kv('Hours', d.hours+'h');
    } else if (b.svc === 'studio') {
      details = kv('Date', 'Jul 30, 2026 (Wed)') + kv('Timeslot', d.timeslot) + kv('Studio', d.studio);
    }

    drwEl.innerHTML =
      '<div class="bk-drw-hd">' +
        '<div class="bk-drw-htop">' +
          '<span class="bk-drw-ref">'+b.ref+'</span>' +
          '<button class="bk-drw-close" data-a="drw-close">✕ Close</button>' +
        '</div>' +
        '<div style="display:flex;gap:5px;flex-wrap:wrap">' +
          badge(SVL[b.svc], SVC_C[b.svc]) + ' ' +
          badge(STL[b.status], STC[b.status]) + ' ' +
          badge(PAL[b.pay], PAC[b.pay]) + ' ' +
          badge(SRL[b.src], '#6AAEC8') +
        '</div>' +
      '</div>' +
      '<div class="bk-drw-body">' +
        '<div class="bk-slbl">Owner</div>' +
        '<div class="bk-card">' + kv('Name', esc(b.owner)) + kv('Mobile', d.mobile || '—') + '</div>' +
        '<div class="bk-slbl">Pet</div>' +
        '<div class="bk-card">' +
          kv('Name', esc(b.pet)) +
          kv('Breed', esc(b.breed)) +
          kv('Details', b.siz + ' · ' + (b.gen==='M'?'Male':'Female') + ' · ' + b.age) +
        '</div>' +
        '<div class="bk-slbl">'+SVL[b.svc]+' Details</div>' +
        '<div class="bk-card">'+details+'</div>' +
        '<div class="bk-slbl">Billing</div>' +
        '<div class="bk-card">' +
          kv('Total', '<strong style="font-size:14px;color:#FFCE58">'+d.total+'</strong>') +
          kv('Status', badge(PAL[b.pay], PAC[b.pay])) +
        '</div>' +
      '</div>' +
      '<div class="bk-drw-acts">' +
        '<button class="bk-actbtn">Edit</button>' +
        (b.status !== 'checked_in' && b.status !== 'completed' ? '<button class="bk-actbtn">Check in</button>' : '') +
        '<button class="bk-actbtn pri">Log payment</button>' +
      '</div>';
    drwEl.classList.add('open');
  }

  // ── RENDER ───────────────────────────────────────────────────────────────────
  function renderPage() {
    var html = '';
    if (cur === 'bookings')  html = scBookings();
    else if (cur === 'calendar') html = scCalendar();
    else if (cur === 'checkin')  html = scPlaceholder('🐾','Pending');
    else if (cur === 'members')  html = scPlaceholder('👤','Members');
    else if (cur === 'resources') html = scPlaceholder('📦','Inventory');
    else if (cur === 'reports')  html = scPlaceholder('📊','Reports');
    pgEl.innerHTML = html;

    // Sync sidebar active state
    document.querySelectorAll('.bk-win .bk-nbtn[data-page]').forEach(function(btn) {
      btn.classList.toggle('on', btn.getAttribute('data-page') === cur);
    });
  }

  // ── EVENTS ───────────────────────────────────────────────────────────────────
  function onClick(e) {
    var t = e.target.closest('[data-a]');
    if (!t) return;
    var a = t.getAttribute('data-a');

    if (a === 'nav') {
      cur = t.getAttribute('data-page');
      activeId = null;
      renderPage();
      renderDrawer();
    }
    if (a === 'row') {
      var id = parseInt(t.getAttribute('data-id'));
      activeId = (activeId === id) ? null : id;
      renderPage();
      renderDrawer();
    }
    if (a === 'svc') {
      svcFilt = t.getAttribute('data-svc');
      activeId = null;
      renderPage();
      renderDrawer();
    }
    if (a === 'drw-close') {
      activeId = null;
      renderPage();
      renderDrawer();
    }
  }

  // ── MOUNT ────────────────────────────────────────────────────────────────────
  function mount() {
    var st = document.createElement('style');
    st.textContent = CSS;
    document.head.appendChild(st);

    var lk = document.createElement('link');
    lk.rel = 'stylesheet';
    lk.href = 'https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;500;600;700&display=swap';
    document.head.appendChild(lk);

    var ov = document.createElement('div');
    ov.className = 'bk-ov';
    ov.id = 'bkOv';
    document.body.appendChild(ov);
    ovEl = ov;

    var wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;flex-direction:column;align-items:center';
    ov.appendChild(wrap);

    var win = document.createElement('div');
    win.className = 'bk-win';
    wrap.appendChild(win);

    var note = document.createElement('p');
    note.className = 'bk-note';
    note.textContent = 'Rough interactive mockup — not all screens included';
    wrap.appendChild(note);

    // Close button (outside win so it's always on top)
    var xbtn = document.createElement('button');
    xbtn.className = 'bk-xbtn';
    xbtn.id = 'bkClose';
    xbtn.textContent = '✕';
    ov.appendChild(xbtn);

    // Top bar
    var tb = document.createElement('div');
    tb.innerHTML = topbar();
    win.appendChild(tb.firstChild);

    // Body
    var bd = document.createElement('div');
    bd.className = 'bk-bd';
    win.appendChild(bd);

    // Sidebar
    var sbWrap = document.createElement('div');
    sbWrap.id = 'bkSb';
    sbWrap.innerHTML = sidebar();
    bd.appendChild(sbWrap.firstChild);

    // Content
    var ct = document.createElement('div');
    ct.className = 'bk-ct';
    bd.appendChild(ct);

    // Page area
    pgEl = document.createElement('div');
    pgEl.className = 'bk-pg';
    ct.appendChild(pgEl);

    // Drawer
    drwEl = document.createElement('div');
    drwEl.className = 'bk-drw';
    ct.appendChild(drwEl);

    // Events
    ov.addEventListener('click', function(e) { if (e.target === ov) closeMock(); });
    xbtn.addEventListener('click', closeMock);
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeMock(); });
    ov.addEventListener('click', onClick);
  }

  function openMock() {
    cur = 'bookings'; svcFilt = 'all'; activeId = null;
    renderPage();
    renderDrawer();
    ovEl.classList.add('open');
  }
  function closeMock() {
    ovEl.classList.remove('open');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

  window.openBarkMock = openMock;
})();
