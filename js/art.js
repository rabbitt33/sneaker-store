let artCounter = 0;

const OUTSOLE = "#1c1c1a";

function artDefs(uid) {
  return `<defs>
    <linearGradient id="${uid}g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".34"/>
      <stop offset=".45" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="1" stop-color="#000000" stop-opacity=".22"/>
    </linearGradient>
    <linearGradient id="${uid}p" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".6"/>
      <stop offset=".35" stop-color="#ffffff" stop-opacity=".06"/>
      <stop offset="1" stop-color="#000000" stop-opacity=".28"/>
    </linearGradient>
    <pattern id="${uid}m" width="9" height="9" patternUnits="userSpaceOnUse">
      <circle cx="2.5" cy="2.5" r="1.1" fill="#111" opacity=".22"/>
      <circle cx="7" cy="7" r=".9" fill="#111" opacity=".15"/>
    </pattern>
    <pattern id="${uid}n" width="11" height="11" patternUnits="userSpaceOnUse">
      <path d="M0 11 L11 0 M-3 3 L3 -3 M8 14 L14 8" stroke="#111" stroke-opacity=".3" stroke-width="1"/>
    </pattern>
    <pattern id="${uid}c" width="9" height="9" patternUnits="userSpaceOnUse">
      <path d="M0 0 L9 9 M9 0 L0 9" stroke="#111" stroke-opacity=".25" stroke-width="1"/>
    </pattern>
  </defs>`;
}

function shadowSVG() {
  return `<ellipse cx="212" cy="235" rx="152" ry="10" fill="#000" opacity=".16"/>`;
}

function treadMarks(y1, y2, from, to, step) {
  let out = "";
  for (let x = from; x <= to; x += step) {
    out += `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="#000" stroke-opacity=".14" stroke-width="4" stroke-linecap="round"/>`;
  }
  return out;
}

function laces(x, y, count, color, options) {
  const o = Object.assign({ dx: 18, dy: 3, len: 16, rise: 13, w: 6 }, options || {});
  let out = "";
  for (let i = 0; i < count; i++) {
    const x1 = x + i * o.dx;
    const y1 = y + i * o.dy;
    out += `<line x1="${x1}" y1="${y1}" x2="${x1 + o.len}" y2="${y1 - o.rise}" stroke="${color}" stroke-width="${o.w}" stroke-linecap="round"/>`;
    out += `<circle cx="${x1}" cy="${y1}" r="2.2" fill="#111" opacity=".4"/><circle cx="${x1 + o.len}" cy="${y1 - o.rise}" r="2.2" fill="#111" opacity=".4"/>`;
  }
  return out;
}

function perforations(cx, cy, color) {
  let out = "";
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 4; col++) {
      out += `<circle cx="${cx + col * 15 + row * 5}" cy="${cy + row * 10}" r="1.7" fill="${color}" opacity=".45"/>`;
    }
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* 1. Air Jordan 1 High — high collar, wings badge, two-tone panels    */
/* ------------------------------------------------------------------ */

function drawJordan1(c, uid) {
  return `
    ${shadowSVG()}
    <path d="M50,183 L374,183 C385,183 391,190 391,198 L391,205 C391,216 382,223 369,223 L57,223 C43,223 35,215 35,204 L35,195 C35,188 41,183 50,183 Z" fill="${c.sole}" stroke="#000" stroke-opacity=".18" stroke-width="1.5"/>
    <path d="M35,205 L391,205 L391,209 C391,218 382,223 369,223 L57,223 C44,223 35,216 35,207 Z" fill="${OUTSOLE}"/>
    ${treadMarks(208, 219, 62, 360, 34)}
    <path d="M58,188 L48,120 C46,102 56,86 74,84 L102,80 L116,50 C120,36 138,32 148,42 L162,62 C170,72 182,76 194,74 C214,72 232,82 248,96 L302,122 C338,140 360,158 370,174 L375,188 Z" fill="${c.upper}" stroke="#000" stroke-opacity=".18" stroke-width="1.5"/>
    <path d="M58,188 L48,120 C46,102 56,86 74,84 L102,80 L116,50 C120,36 138,32 148,42 L162,62 C170,72 182,76 194,74 C214,72 232,82 248,96 L302,122 C338,140 360,158 370,174 L375,188 Z" fill="url(#${uid}g)"/>
    <path d="M58,188 L48,120 C46,102 56,86 74,84 L96,82 L102,120 C104,146 94,175 80,188 Z" fill="${c.panel}"/>
    <path d="M100,82 L116,50 C120,36 138,32 148,42 L164,64 C170,74 182,79 194,77 L198,88 C180,94 160,90 146,78 L120,96 Z" fill="${c.panel}"/>
    <path d="M150,110 L166,62" stroke="#000" stroke-opacity=".1" stroke-width="1.4" stroke-dasharray="4 5"/>
    <path d="M112,166 C168,146 236,124 320,112 C344,109 350,119 330,126 C270,147 206,169 152,178 C130,182 104,176 112,166 Z" fill="${c.accent}"/>
    <path d="M144,178 C186,170 260,150 322,129" stroke="#000" stroke-opacity=".16" stroke-width="1.4" fill="none"/>
    <circle cx="98" cy="105" r="13" fill="${c.accent}" stroke="#000" stroke-opacity=".25" stroke-width="1"/>
    <path d="M91,101 C95,97 99,105 105,100 M94,109 C98,105 101,111 106,106" stroke="${c.upper}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    ${perforations(310, 150, c.accent)}
    <path d="M196,104 L220,111 L216,88 C212,77 198,77 194,88 Z" fill="${c.panel}" stroke="#000" stroke-opacity=".12" stroke-width="1"/>
    <path d="M201,96 L213,96 M202,101 L214,101" stroke="${c.accent}" stroke-opacity=".5" stroke-width="1.4" stroke-linecap="round"/>
    ${laces(164, 113, 5, c.laces)}
    <path d="M54,188 L376,188" stroke="#000" stroke-opacity=".15" stroke-width="1.4" stroke-dasharray="4 6"/>
    <path d="M40,196 L388,196" stroke="#000" stroke-opacity=".1" stroke-width="1" stroke-dasharray="3 7"/>
  `;
}

/* ------------------------------------------------------------------ */
/* 2. Air Max 90 — layered panels, visible Air unit, waffle outsole    */
/* ------------------------------------------------------------------ */

function drawAirMax90(c, uid) {
  return `
    ${shadowSVG()}
    <path d="M48,182 L376,182 C386,182 392,189 392,198 L392,207 C392,218 383,224 370,224 L56,224 C42,224 34,216 34,205 L34,196 C34,188 40,182 48,182 Z" fill="${c.sole}" stroke="#000" stroke-opacity=".18" stroke-width="1.5"/>
    <rect x="64" y="195" width="66" height="19" rx="9" fill="#bfe3ff" opacity=".85" stroke="#000" stroke-opacity=".25"/>
    <ellipse cx="86" cy="204.5" rx="14" ry="5" fill="#fff" opacity=".55"/>
    <line x1="108" y1="196" x2="108" y2="213" stroke="#000" stroke-opacity=".18"/>
    <line x1="120" y1="197" x2="120" y2="212" stroke="#000" stroke-opacity=".12"/>
    <path d="M34,208 L392,208 L392,212 C392,219 383,224 370,224 L56,224 C43,224 34,217 34,209 Z" fill="${OUTSOLE}"/>
    ${treadMarks(212, 221, 74, 366, 26)}
    <path d="M56,188 L48,150 C46,134 56,122 72,119 L106,115 C122,103 140,99 157,105 L182,112 C208,100 238,102 264,114 L308,134 C342,149 362,162 372,176 L376,188 Z" fill="${c.upper}" stroke="#000" stroke-opacity=".18" stroke-width="1.5"/>
    <path d="M56,188 L48,150 C46,134 56,122 72,119 L106,115 C122,103 140,99 157,105 L182,112 C208,100 238,102 264,114 L308,134 C342,149 362,162 372,176 L376,188 Z" fill="url(#${uid}g)"/>
    <path d="M80,122 C132,110 200,112 252,124 L304,144 L294,158 C244,142 184,136 126,146 L96,154 Z" fill="url(#${uid}m)" opacity=".6"/>
    <path d="M56,188 L50,158 C120,140 230,140 300,159 C332,168 356,177 376,188 Z" fill="${c.panel}" opacity=".96"/>
    <path d="M56,188 L48,150 C46,134 56,122 72,119 L94,116 L102,150 C104,168 92,181 78,188 Z" fill="${c.panel}"/>
    <path d="M60,150 C66,140 76,133 88,130 L94,116 L72,119 C56,122 46,134 48,150 Z" fill="${c.accent}" opacity=".9"/>
    <path d="M136,168 C194,150 258,130 328,120 C348,117 353,127 333,134 C278,153 214,172 158,180 C140,183 130,177 136,168 Z" fill="${c.accent}"/>
    <path d="M180,110 C206,98 236,100 262,112 L300,130 L294,142 C250,124 214,122 182,128 Z" fill="${c.panel}" opacity=".9"/>
    <path d="M156,104 L176,111 L196,107 L206,117 L184,121 L166,114 Z" fill="${c.accent}" opacity=".55"/>
    <path d="M126,122 C162,112 208,112 246,120" stroke="#fff" stroke-opacity=".4" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M204,106 L226,113 L222,92 C218,82 204,82 200,92 Z" fill="${c.panel}" stroke="#000" stroke-opacity=".12" stroke-width="1"/>
    ${laces(164, 112, 5, c.laces)}
    ${perforations(300, 152, "#111")}
    <path d="M52,188 L376,188" stroke="#000" stroke-opacity=".14" stroke-width="1.4" stroke-dasharray="4 6"/>
  `;
}

/* ------------------------------------------------------------------ */
/* 3. adidas Samba / Gazelle / Puma Suede XL — slim low, gum sole      */
/* ------------------------------------------------------------------ */

function drawSlimLow(c, uid, variant) {
  const puffy = variant === "suede";
  const gum = c.sole;
  const toeColor = variant === "suede" ? c.panel : c.accent;
  const topY = puffy ? 184 : 186;
  const bottomY = puffy ? 225 : 222;
  return `
    ${shadowSVG()}
    <path d="M50,${topY} L378,${topY} C388,${topY} 392,${topY + 6} 392,${topY + 14} L391,${bottomY - 14} C389,${bottomY - 5} 381,${bottomY} 369,${bottomY} L56,${bottomY} C43,${bottomY} 35,${bottomY - 8} 35,${topY + 17} L35,${topY + 8} C35,${topY + 2} 42,${topY} 50,${topY} Z" fill="${gum}" stroke="#000" stroke-opacity=".18" stroke-width="1.5"/>
    <path d="M35,${bottomY - 7} L392,${bottomY - 7} L391,${bottomY - 3} C389,${bottomY - 1} 381,${bottomY} 369,${bottomY} L56,${bottomY} C44,${bottomY} 35,${bottomY - 4} 35,${bottomY - 6} Z" fill="#8a6238" opacity="${puffy ? ".28" : ".4"}"/>
    ${treadMarks(bottomY - 10, bottomY - 2, 64, 366, 27)}
    <path d="M62,188 L56,152 C54,134 64,122 80,119 L112,115 C126,105 142,101 158,106 L182,113 C208,101 238,103 264,115 L308,133 C342,147 362,161 372,175 L376,188 Z" fill="${c.upper}" stroke="#000" stroke-opacity=".18" stroke-width="1.5"/>
    <path d="M62,188 L56,152 C54,134 64,122 80,119 L112,115 C126,105 142,101 158,106 L182,113 C208,101 238,103 264,115 L308,133 C342,147 362,161 372,175 L376,188 Z" fill="url(#${uid}g)"/>
    <path d="M286,188 L376,188 L372,175 C362,161 342,147 308,133 L299,152 C295,166 290,180 286,188 Z" fill="${toeColor}" stroke="#000" stroke-opacity=".1" stroke-width="1"/>
    ${
      puffy
        ? `<path d="M120,170 C180,152 252,132 330,120 C348,117 353,128 333,135 C278,154 214,173 158,181 C140,184 114,180 120,170 Z" fill="${c.accent}" stroke="#000" stroke-opacity=".16" stroke-width="1.2"/>`
        : `<g stroke="${c.panel}" stroke-width="12" stroke-linecap="round" opacity=".95">
             <path d="M146,171 L190,121"/>
             <path d="M164,176 L208,126"/>
             <path d="M182,180 L226,130"/>
           </g>`
    }
    <path d="M62,188 L56,152 C54,134 64,122 80,119 L96,117 L102,148 C104,166 94,182 80,188 Z" fill="${c.panel}"/>
    <path d="M70,132 L94,128" stroke="${c.upper}" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/>
    <path d="${puffy ? "M196,106 C214,80 250,78 264,96 L272,114 L208,120 Z" : "M198,110 L220,116 L216,92 C212,82 198,82 194,92 Z"}" fill="${c.panel}" stroke="#000" stroke-opacity=".12" stroke-width="1"/>
    ${laces(180, 114, 5, c.laces, puffy ? { w: 9, dx: 17, len: 14, rise: 11 } : undefined)}
    <path d="M60,188 L376,188" stroke="#000" stroke-opacity=".14" stroke-width="1.4" stroke-dasharray="4 6"/>
  `;
}

/* ------------------------------------------------------------------ */
/* 4. New Balance 550 — low basketball, big N panel                    */
/* ------------------------------------------------------------------ */

function drawNB550(c, uid) {
  return `
    ${shadowSVG()}
    <path d="M50,184 L374,184 C385,184 391,191 391,199 L391,206 C391,217 382,223 369,223 L57,223 C43,223 35,215 35,204 L35,196 C35,189 41,184 50,184 Z" fill="${c.sole}" stroke="#000" stroke-opacity=".18" stroke-width="1.5"/>
    <path d="M35,206 L391,206 L391,210 C391,218 382,223 369,223 L57,223 C44,223 35,216 35,208 Z" fill="#c9c6ba"/>
    ${treadMarks(210, 220, 66, 360, 34)}
    <path d="M58,188 L50,148 C48,130 60,118 78,115 L110,111 C124,99 142,95 159,101 L184,110 C210,98 240,100 266,112 L308,130 C342,146 362,160 372,174 L376,188 Z" fill="${c.upper}" stroke="#000" stroke-opacity=".18" stroke-width="1.5"/>
    <path d="M58,188 L50,148 C48,130 60,118 78,115 L110,111 C124,99 142,95 159,101 L184,110 C210,98 240,100 266,112 L308,130 C342,146 362,160 372,174 L376,188 Z" fill="url(#${uid}g)"/>
    <path d="M58,188 L50,148 C48,130 60,118 78,115 L96,113 L104,146 C106,166 94,182 80,188 Z" fill="${c.panel}"/>
    <path d="M100,112 L128,106 L140,128 L114,134 Z" fill="${c.panel}" opacity=".9"/>
    <path d="M292,188 L376,188 L372,174 C362,160 342,146 308,130 L300,150 C296,164 291,177 292,188 Z" fill="${c.panel}" opacity=".9"/>
    <path d="M252,118 L252,157 M252,118 L288,157 M288,118 L288,157" stroke="${c.panel}" stroke-width="8" stroke-linecap="square" fill="none"/>
    <path d="M252,118 L252,157 M252,118 L288,157 M288,118 L288,157" stroke="#fff" stroke-opacity=".22" stroke-width="2" stroke-linecap="square" fill="none"/>
    <path d="M186,110 L266,112" stroke="#000" stroke-opacity=".12" stroke-width="1.3" stroke-dasharray="4 5"/>
    <path d="M80,115 C96,111 112,108 126,106" stroke="#fff" stroke-opacity=".45" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path d="M204,108 L226,115 L222,94 C218,84 204,84 200,94 Z" fill="${c.panel}" stroke="#000" stroke-opacity=".12" stroke-width="1"/>
    ${laces(164, 113, 5, c.laces)}
    ${perforations(302, 158, c.panel)}
    <path d="M56,188 L376,188" stroke="#000" stroke-opacity=".14" stroke-width="1.4" stroke-dasharray="4 6"/>
  `;
}

/* ------------------------------------------------------------------ */
/* 5. Nike Dunk Low — clean panels, curved swoosh                      */
/* ------------------------------------------------------------------ */

function drawDunk(c, uid) {
  return `
    ${shadowSVG()}
    <path d="M50,184 L374,184 C385,184 391,191 391,199 L391,206 C391,217 382,223 369,223 L57,223 C43,223 35,215 35,204 L35,196 C35,189 41,184 50,184 Z" fill="${c.sole}" stroke="#000" stroke-opacity=".18" stroke-width="1.5"/>
    <path d="M35,206 L391,206 L391,210 C391,218 382,223 369,223 L57,223 C44,223 35,216 35,208 Z" fill="${OUTSOLE}"/>
    ${treadMarks(210, 220, 66, 360, 34)}
    <path d="M58,188 L50,148 C48,130 60,118 78,115 L110,111 C124,99 142,95 159,101 L184,110 C210,98 240,100 266,112 L308,130 C342,146 362,160 372,174 L376,188 Z" fill="${c.upper}" stroke="#000" stroke-opacity=".18" stroke-width="1.5"/>
    <path d="M58,188 L50,148 C48,130 60,118 78,115 L110,111 C124,99 142,95 159,101 L184,110 C210,98 240,100 266,112 L308,130 C342,146 362,160 372,174 L376,188 Z" fill="url(#${uid}g)"/>
    <path d="M58,188 L50,148 C48,130 60,118 78,115 L96,113 L104,146 C106,166 94,182 80,188 Z" fill="${c.panel}"/>
    <path d="M186,110 L266,112 L304,130 L298,142 C252,124 214,122 180,128 Z" fill="${c.panel}" opacity=".96"/>
    <path d="M294,188 L376,188 L372,174 C362,160 342,146 308,130 L300,150 C296,164 292,177 294,188 Z" fill="${c.panel}"/>
    <path d="M144,166 C198,147 260,128 326,119 C348,116 353,126 333,132 C278,151 214,171 162,179 C145,182 136,175 144,166 Z" fill="${c.accent}"/>
    <path d="M78,115 C92,111 108,108 122,106" stroke="#fff" stroke-opacity=".35" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path d="M186,110 L266,112" stroke="#000" stroke-opacity=".12" stroke-width="1.4" stroke-dasharray="4 5"/>
    <path d="M204,108 L226,115 L222,94 C218,84 204,84 200,94 Z" fill="${c.panel}" stroke="#000" stroke-opacity=".12" stroke-width="1"/>
    ${laces(164, 113, 5, c.laces)}
    ${perforations(302, 158, c.panel)}
    <path d="M56,188 L376,188" stroke="#000" stroke-opacity=".14" stroke-width="1.4" stroke-dasharray="4 6"/>
  `;
}

/* ------------------------------------------------------------------ */
/* 6. Air Jordan 4 — mid cut, netting, wing flaps, visible Air         */
/* ------------------------------------------------------------------ */

function drawJordan4(c, uid) {
  return `
    ${shadowSVG()}
    <path d="M48,182 L374,182 C385,182 391,189 391,197 L391,205 C391,216 382,223 369,223 L57,223 C43,223 35,215 35,204 L35,195 C35,188 41,182 48,182 Z" fill="${c.sole}" stroke="#000" stroke-opacity=".18" stroke-width="1.5"/>
    <rect x="64" y="194" width="54" height="17" rx="8.5" fill="#bfe3ff" opacity=".7" stroke="#000" stroke-opacity=".22"/>
    <path d="M35,206 L391,206 L391,210 C391,218 382,223 369,223 L57,223 C44,223 35,216 35,208 Z" fill="${OUTSOLE}"/>
    ${treadMarks(210, 220, 68, 360, 30)}
    <path d="M58,188 L50,136 C48,114 60,98 80,96 L112,92 L128,62 C132,48 148,45 158,56 L172,74 C180,84 192,88 204,86 C224,84 242,94 258,108 L308,132 C341,148 362,162 372,176 L376,188 Z" fill="${c.upper}" stroke="#000" stroke-opacity=".18" stroke-width="1.5"/>
    <path d="M58,188 L50,136 C48,114 60,98 80,96 L112,92 L128,62 C132,48 148,45 158,56 L172,74 C180,84 192,88 204,86 C224,84 242,94 258,108 L308,132 C341,148 362,162 372,176 L376,188 Z" fill="url(#${uid}g)"/>
    <path d="M58,188 L50,136 C48,114 60,98 80,96 L98,94 L104,132 C106,158 94,180 80,188 Z" fill="${c.panel}"/>
    <path d="M112,92 L128,62 C132,48 148,45 158,56 L170,72 L120,88 Z" fill="${c.panel}"/>
    <path d="M150,120 C190,108 230,108 270,122 L302,136 C270,150 230,156 190,150 C168,147 150,138 150,120 Z" fill="url(#${uid}n)" stroke="#000" stroke-opacity=".2" stroke-width="1.2"/>
    <path d="M120,90 L150,78 L160,98 L130,108 Z" fill="${c.panel}" stroke="#000" stroke-opacity=".25" stroke-width="1.2"/>
    <circle cx="138" cy="90" r="2" fill="#111" opacity=".4"/><circle cx="146" cy="85" r="2" fill="#111" opacity=".4"/>
    <path d="M296,188 L376,188 L372,176 C362,162 341,148 308,132 L300,152 C296,166 294,178 296,188 Z" fill="${c.panel}"/>
    <path d="M198,102 L220,109 L216,88 C212,78 198,78 194,88 Z" fill="${c.panel}" stroke="#000" stroke-opacity=".12" stroke-width="1"/>
    <path d="M204,96 L216,96" stroke="${c.accent}" stroke-width="2" stroke-linecap="round" opacity=".7"/>
    ${laces(160, 108, 5, c.laces)}
    ${perforations(306, 154, "#111")}
    <path d="M58,188 L376,188" stroke="#000" stroke-opacity=".14" stroke-width="1.4" stroke-dasharray="4 6"/>
  `;
}

/* ------------------------------------------------------------------ */
/* 7. adidas Crazy 8 / Puma MB.03 — chunky high, wavy panels           */
/* ------------------------------------------------------------------ */

function drawHighChunky(c, uid, variant) {
  const futuristic = variant === "mb03";
  return `
    ${shadowSVG()}
    <path d="M46,182 L376,182 C388,182 393,190 391,200 C389,214 380,224 364,224 L60,224 C46,224 37,215 37,203 C37,193 39,182 46,182 Z" fill="${c.sole}" stroke="#000" stroke-opacity=".18" stroke-width="1.5"/>
    ${futuristic
      ? `<path d="M38,206 C74,198 108,214 146,204 C184,194 218,212 256,202 C294,192 330,208 390,196 L390,204 C388,216 379,224 364,224 L60,224 C46,224 37,216 37,205 Z" fill="${c.panel}" opacity=".9"/>`
      : `<path d="M37,205 L391,205 L390,210 C388,218 380,224 364,224 L60,224 C46,224 37,217 37,207 Z" fill="${OUTSOLE}"/>`}
    ${treadMarks(212, 220, 62, 366, 30)}
    <path d="M58,188 L48,118 C46,98 58,82 76,80 L108,76 L124,46 C128,32 146,29 156,41 L170,62 C178,72 190,76 202,74 C224,72 244,84 260,98 L310,124 C344,142 364,158 374,174 L378,188 Z" fill="${c.upper}" stroke="#000" stroke-opacity=".18" stroke-width="1.5"/>
    <path d="M58,188 L48,118 C46,98 58,82 76,80 L108,76 L124,46 C128,32 146,29 156,41 L170,62 C178,72 190,76 202,74 C224,72 244,84 260,98 L310,124 C344,142 364,158 374,174 L378,188 Z" fill="url(#${uid}g)"/>
    <path d="M58,188 L48,118 C46,98 58,82 76,80 L96,78 L104,120 C106,148 94,176 80,188 Z" fill="${c.panel}"/>
    <path d="M104,78 L124,46 C128,32 146,29 156,41 L172,64 L120,86 Z" fill="${c.panel}"/>
    <path d="M296,188 L378,188 L374,174 C364,158 344,142 310,124 L301,148 C296,164 292,178 296,188 Z" fill="${c.panel}"/>
    <path d="M108,152 C148,138 188,154 228,138 C268,122 306,134 340,120" stroke="${c.accent}" stroke-width="11" stroke-linecap="round" fill="none" opacity=".95"/>
    <path d="M112,170 C154,158 194,172 234,156 C274,140 310,150 344,138" stroke="${c.accent}" stroke-width="6" stroke-linecap="round" fill="none" opacity=".7"/>
    ${futuristic
      ? `<path d="M250,108 L266,128 L258,130 L272,150 L252,146 L240,120 Z" fill="${c.accent}" opacity=".9"/><path d="M226,156 L242,176" stroke="${c.accent}" stroke-width="4" stroke-linecap="round" opacity=".6"/>`
      : `<g stroke="${c.accent}" stroke-width="7" stroke-linecap="round" opacity=".9"><path d="M128,160 L158,120"/><path d="M144,166 L174,126"/><path d="M160,172 L190,132"/></g>`}
    <path d="M196,100 L224,108 L220,84 C216,74 200,74 196,84 Z" fill="${c.panel}" stroke="#000" stroke-opacity=".12" stroke-width="1"/>
    ${laces(162, 108, 5, c.laces)}
    ${perforations(308, 150, "#111")}
    <path d="M54,188 L378,188" stroke="#000" stroke-opacity=".14" stroke-width="1.4" stroke-dasharray="4 6"/>
  `;
}

/* ------------------------------------------------------------------ */
/* 8. ASICS GEL-Kayano 14 / GEL-1130 — tech runner, gel window         */
/* ------------------------------------------------------------------ */

function drawTechRunner(c, uid) {
  return `
    ${shadowSVG()}
    <path d="M48,186 L374,186 C386,186 392,193 392,202 L390,210 C387,219 379,224 366,224 L54,224 C41,224 33,216 34,205 L35,196 C35,189 41,186 48,186 Z" fill="${c.sole}" stroke="#000" stroke-opacity=".18" stroke-width="1.5"/>
    <rect x="58" y="197" width="44" height="16" rx="8" fill="${c.accent}" opacity=".5" stroke="#000" stroke-opacity=".15"/>
    <path d="M34,209 L391,207 L390,212 C388,219 379,224 366,224 L54,224 C42,224 34,217 34,210 Z" fill="${OUTSOLE}"/>
    ${treadMarks(212, 220, 72, 364, 27)}
    <path d="M58,188 L50,150 C48,134 56,122 72,119 L106,115 C122,103 140,99 157,105 L180,112 C206,100 236,102 260,114 L306,134 C340,149 360,162 370,176 L374,188 Z" fill="${c.upper}" stroke="#000" stroke-opacity=".18" stroke-width="1.5"/>
    <path d="M58,188 L50,150 C48,134 56,122 72,119 L106,115 C122,103 140,99 157,105 L180,112 C206,100 236,102 260,114 L306,134 C340,149 360,162 370,176 L374,188 Z" fill="url(#${uid}g)"/>
    <path d="M72,120 C124,108 196,110 250,124 L302,144 L292,158 C244,142 184,136 122,146 L90,154 Z" fill="url(#${uid}m)" opacity=".55"/>
    <path d="M58,188 L52,158 C120,140 230,140 300,159 C332,168 356,177 374,188 Z" fill="${c.panel}" opacity=".9"/>
    <path d="M58,188 L50,150 C48,134 56,122 72,119 L92,116 L100,148 C102,168 90,182 76,188 Z" fill="${c.panel}"/>
    <path d="M70,136 C86,128 104,124 122,124" stroke="#fff" stroke-opacity=".4" stroke-width="4" stroke-linecap="round" fill="none"/>
    <g stroke="${c.panel}" stroke-width="3.5" stroke-linecap="round" opacity=".85">
      <path d="M146,150 L180,120"/>
      <path d="M162,156 L196,126"/>
      <path d="M178,162 L212,132"/>
      <path d="M194,168 L228,138"/>
    </g>
    <path d="M150,116 C162,132 164,152 158,170" stroke="${c.panel}" stroke-width="2.2" fill="none" opacity=".6"/>
    <path d="M256,112 L292,126" stroke="${c.panel}" stroke-width="3" stroke-linecap="round" opacity=".55"/>
    <path d="M200,106 L222,113 L218,92 C214,82 200,82 196,92 Z" fill="${c.panel}" stroke="#000" stroke-opacity=".12" stroke-width="1"/>
    ${laces(162, 112, 5, c.laces)}
    <path d="M54,188 L374,188" stroke="#000" stroke-opacity=".14" stroke-width="1.4" stroke-dasharray="4 6"/>
  `;
}

/* ------------------------------------------------------------------ */
/* 9. New Balance 9060 / 2002R — chunky wavy runner                    */
/* ------------------------------------------------------------------ */

function drawChunkyRunner(c, uid) {
  return `
    ${shadowSVG()}
    <path d="M46,188 L376,188 C389,188 394,196 391,206 C388,219 378,226 363,226 L58,226 C44,226 35,217 36,205 C36,196 39,188 46,188 Z" fill="${c.sole}" stroke="#000" stroke-opacity=".18" stroke-width="1.5"/>
    <path d="M39,199 C96,190 148,204 206,196 C264,188 312,200 390,192" stroke="#000" stroke-opacity=".12" stroke-width="2.5" fill="none"/>
    <path d="M37,210 C100,204 166,216 232,208 C298,200 346,210 390,204 L389,210 C386,220 377,226 363,226 L58,226 C45,226 36,218 37,209 Z" fill="${OUTSOLE}" opacity=".92"/>
    ${treadMarks(214, 222, 66, 362, 30)}
    <path d="M58,188 L50,152 C48,136 56,124 72,121 L106,117 C122,105 140,101 157,107 L182,114 C208,102 238,104 264,116 L308,136 C342,150 362,164 372,177 L376,188 Z" fill="${c.upper}" stroke="#000" stroke-opacity=".18" stroke-width="1.5"/>
    <path d="M58,188 L50,152 C48,136 56,124 72,121 L106,117 C122,105 140,101 157,107 L182,114 C208,102 238,104 264,116 L308,136 C342,150 362,164 372,177 L376,188 Z" fill="url(#${uid}g)"/>
    <path d="M74,122 C126,112 198,114 252,128 L300,148 L290,160 C244,144 184,138 124,148 L92,156 Z" fill="url(#${uid}m)" opacity=".5"/>
    <path d="M58,188 L50,152 C48,136 56,124 72,121 L94,118 L102,150 C104,168 92,182 78,188 Z" fill="${c.panel}"/>
    <path d="M286,188 L376,188 L372,177 C362,164 342,150 308,136 L300,156 C296,168 288,180 286,188 Z" fill="${c.panel}"/>
    <path d="M250,120 L250,158 M250,120 L288,158 M288,120 L288,158" stroke="${c.panel}" stroke-width="9" stroke-linecap="square" fill="none"/>
    <path d="M250,120 L250,158 M250,120 L288,158 M288,120 L288,158" stroke="${c.accent}" stroke-width="2.5" stroke-linecap="square" fill="none" opacity=".7"/>
    <path d="M108,150 C150,138 196,142 236,152" stroke="${c.accent}" stroke-width="4" stroke-linecap="round" opacity=".5" fill="none"/>
    <path d="M198,108 L220,115 L216,94 C212,84 198,84 194,94 Z" fill="${c.panel}" stroke="#000" stroke-opacity=".12" stroke-width="1"/>
    ${laces(162, 114, 5, c.laces)}
    ${perforations(306, 158, "#111")}
    <path d="M54,188 L376,188" stroke="#000" stroke-opacity=".14" stroke-width="1.4" stroke-dasharray="4 6"/>
  `;
}

/* ------------------------------------------------------------------ */
/* 10. Converse Chuck 70 — canvas high, rubber toe, ankle patch        */
/* ------------------------------------------------------------------ */

function drawChuck(c, uid) {
  return `
    ${shadowSVG()}
    <path d="M50,184 L374,184 C385,184 391,191 391,199 L391,206 C391,217 382,223 369,223 L57,223 C43,223 35,215 35,204 L35,196 C35,189 41,184 50,184 Z" fill="${c.sole}" stroke="#000" stroke-opacity=".18" stroke-width="1.5"/>
    <path d="M36,204 L390,204 L390,208" stroke="#1c1c1a" stroke-opacity=".55" stroke-width="2" fill="none"/>
    <path d="M35,206 L391,206 L391,210 C391,218 382,223 369,223 L57,223 C44,223 35,216 35,208 Z" fill="#b0895c" opacity=".55"/>
    ${treadMarks(211, 220, 68, 360, 32)}
    <path d="M60,188 L50,112 C48,94 58,80 74,78 L104,74 C114,62 126,58 136,66 L150,78 C158,86 170,88 182,85 L206,80 C224,76 242,84 258,96 L308,122 C342,140 362,157 372,174 L376,188 Z" fill="${c.upper}" stroke="#000" stroke-opacity=".18" stroke-width="1.5"/>
    <path d="M60,188 L50,112 C48,94 58,80 74,78 L104,74 C114,62 126,58 136,66 L150,78 C158,86 170,88 182,85 L206,80 C224,76 242,84 258,96 L308,122 C342,140 362,157 372,174 L376,188 Z" fill="url(#${uid}g)"/>
    <path d="M296,188 L376,188 L372,174 C362,157 342,140 308,122 C316,140 320,158 319,171 C318,181 311,188 296,188 Z" fill="#f7f3e8" stroke="#000" stroke-opacity=".16" stroke-width="1.2"/>
    <path d="M305,172 C310,166 314,172 317,166 M312,180 C316,174 320,180 322,175" stroke="#000" stroke-opacity=".14" stroke-width="1.2" fill="none"/>
    <path d="M60,188 L50,112 C48,94 58,80 74,78 L100,75 L108,120 C110,150 96,178 82,188 Z" fill="${c.panel}" opacity=".55"/>
    <path d="M98,80 C110,66 124,62 136,70" stroke="${c.accent}" stroke-width="5" stroke-linecap="round" fill="none" opacity=".7"/>
    <circle cx="96" cy="103" r="13" fill="${c.sole}" stroke="#000" stroke-opacity=".25" stroke-width="1.2"/>
    <path d="M96,93 L99,100 L107,100 L101,105 L103,112 L96,108 L89,112 L91,105 L85,100 L93,100 Z" fill="${c.accent}" opacity=".8"/>
    <path d="M202,102 L224,109 L220,86 C216,76 202,76 198,86 Z" fill="${c.panel}" stroke="#000" stroke-opacity=".12" stroke-width="1"/>
    ${laces(162, 110, 6, c.laces, { w: 5, dx: 16, len: 15, rise: 12 })}
    <g fill="none" stroke="#c9c4b8" stroke-width="2">
      <circle cx="178" cy="108" r="2.2"/><circle cx="194" cy="111" r="2.2"/><circle cx="210" cy="114" r="2.2"/><circle cx="226" cy="117" r="2.2"/><circle cx="242" cy="120" r="2.2"/>
    </g>
    <path d="M58,188 L376,188" stroke="#000" stroke-opacity=".14" stroke-width="1.4" stroke-dasharray="4 6"/>
    <path d="M344,130 L360,140" stroke="#000" stroke-opacity=".12" stroke-width="1.4" stroke-linecap="round"/>
  `;
}

/* ------------------------------------------------------------------ */
/* 11. Vans Knu Skool — puffy low, fat tongue and sidestripe           */
/* ------------------------------------------------------------------ */

function drawKnu(c, uid) {
  return `
    ${shadowSVG()}
    <path d="M50,184 L374,184 C385,184 391,191 391,199 L391,206 C391,217 382,223 369,223 L57,223 C43,223 35,215 35,204 L35,196 C35,189 41,184 50,184 Z" fill="${c.sole}" stroke="#000" stroke-opacity=".18" stroke-width="1.5"/>
    <path d="M35,206 L391,206 L391,210 C391,218 382,223 369,223 L57,223 C44,223 35,216 35,208 Z" fill="${OUTSOLE}"/>
    ${treadMarks(210, 220, 66, 360, 34)}
    <path d="M60,188 L48,142 C46,120 58,104 78,102 L112,100 C128,88 148,84 166,92 L190,102 C216,90 246,92 272,106 L312,126 C344,142 364,158 374,174 L378,188 Z" fill="${c.upper}" stroke="#000" stroke-opacity=".18" stroke-width="1.5"/>
    <path d="M60,188 L48,142 C46,120 58,104 78,102 L112,100 C128,88 148,84 166,92 L190,102 C216,90 246,92 272,106 L312,126 C344,142 364,158 374,174 L378,188 Z" fill="url(#${uid}g)"/>
    <ellipse cx="102" cy="112" rx="26" ry="15" fill="${c.panel}" opacity=".95"/>
    <path d="M196,102 C212,74 252,72 268,92 L276,114 L208,120 Z" fill="${c.panel}" stroke="#000" stroke-opacity=".14" stroke-width="1.2"/>
    <path d="M210,94 L252,90 M212,102 L256,98" stroke="#000" stroke-opacity=".18" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M118,164 C176,146 246,128 326,118 C346,115 352,126 332,133 C278,152 214,170 160,178 C140,182 110,174 118,164 Z" fill="${c.accent}" stroke="#000" stroke-opacity=".14" stroke-width="1.2"/>
    <path d="M60,188 L56,150 C66,142 82,136 100,134 L108,152 C110,168 96,182 82,188 Z" fill="${c.panel}" opacity=".9"/>
    ${laces(178, 114, 5, c.laces, { w: 9, dx: 16, len: 14, rise: 11 })}
    <path d="M56,188 L376,188" stroke="#000" stroke-opacity=".14" stroke-width="1.4" stroke-dasharray="4 6"/>
  `;
}

/* ------------------------------------------------------------------ */
/* 12. Nike Zoom Freak 5 — angular mid-cut basketball shoe             */
/* ------------------------------------------------------------------ */

function drawFreak(c, uid) {
  return `
    ${shadowSVG()}
    <path d="M48,183 L374,183 C385,183 391,190 391,198 L391,205 C391,216 382,223 369,223 L57,223 C43,223 35,215 35,204 L35,195 C35,188 41,183 48,183 Z" fill="${c.sole}" stroke="#000" stroke-opacity=".18" stroke-width="1.5"/>
    <rect x="300" y="195" width="40" height="15" rx="7" fill="${c.accent}" opacity=".45" stroke="#000" stroke-opacity=".2"/>
    <path d="M35,205 L391,205 L391,209 C391,218 382,223 369,223 L57,223 C44,223 35,216 35,207 Z" fill="${OUTSOLE}"/>
    ${treadMarks(209, 219, 66, 360, 30)}
    <path d="M58,188 L50,134 C48,116 60,102 78,100 L110,96 L126,70 C130,58 146,55 156,64 L172,80 C180,88 192,92 204,90 C224,88 242,98 258,110 L308,132 C341,148 362,162 372,176 L376,188 Z" fill="${c.upper}" stroke="#000" stroke-opacity=".18" stroke-width="1.5"/>
    <path d="M58,188 L50,134 C48,116 60,102 78,100 L110,96 L126,70 C130,58 146,55 156,64 L172,80 C180,88 192,92 204,90 C224,88 242,98 258,110 L308,132 C341,148 362,162 372,176 L376,188 Z" fill="url(#${uid}g)"/>
    <path d="M58,188 L50,134 C48,116 60,102 78,100 L96,98 L104,136 C106,162 94,180 80,188 Z" fill="${c.panel}"/>
    <path d="M292,188 L376,188 L372,176 C362,162 341,148 308,132 L300,152 C296,166 290,178 292,188 Z" fill="${c.panel}"/>
    <path d="M186,110 L266,112 L304,130 L298,144 C252,126 214,124 180,130 Z" fill="${c.panel}" opacity=".85"/>
    <path d="M146,166 C200,148 260,130 326,120 C346,117 352,126 332,133 C278,152 214,170 162,178 C144,181 136,174 146,166 Z" fill="${c.accent}"/>
    <path d="M124,112 L204,94 L218,112 L142,132 Z" fill="${c.panel}" opacity=".35"/>
    <path d="M128,86 L156,72 L164,94 L136,106 Z" fill="${c.panel}" opacity=".85"/>
    ${laces(162, 110, 5, c.laces)}
    ${perforations(302, 154, "#111")}
    <path d="M56,188 L376,188" stroke="#000" stroke-opacity=".14" stroke-width="1.4" stroke-dasharray="4 6"/>
  `;
}

/* ------------------------------------------------------------------ */
/* 13. Air Jordan 11 Low — patent mudguard, icy translucent sole       */
/* ------------------------------------------------------------------ */

function drawJordan11(c, uid) {
  return `
    ${shadowSVG()}
    <path d="M48,184 L374,184 C385,184 391,191 391,199 L391,206 C391,217 382,223 369,223 L57,223 C43,223 35,215 35,204 L35,196 C35,189 41,184 50,184 Z" fill="${c.sole}" stroke="#000" stroke-opacity=".2" stroke-width="1.5"/>
    <path d="M35,197 L391,197 L391,206 C391,216 382,223 369,223 L57,223 C44,223 35,216 35,206 Z" fill="#cfe6f2" opacity=".55"/>
    <path d="M60,205 L380,203 L380,208 C380,216 370,223 356,223 L64,223 C50,223 43,216 44,208 Z" fill="#8fb6c9" opacity=".45"/>
    <path d="M120,196 L300,196 L306,204 L114,204 Z" fill="${c.accent}" opacity=".28"/>
    ${treadMarks(212, 220, 74, 356, 32)}
    <path d="M58,188 L50,148 C48,130 60,118 78,115 L110,111 C124,99 142,95 159,101 L184,110 C210,98 240,100 266,112 L308,130 C342,146 362,160 372,174 L376,188 Z" fill="${c.upper}" stroke="#000" stroke-opacity=".18" stroke-width="1.5"/>
    <path d="M58,188 L50,148 C48,130 60,118 78,115 L110,111 C124,99 142,95 159,101 L184,110 C210,98 240,100 266,112 L308,130 C342,146 362,160 372,174 L376,188 Z" fill="url(#${uid}m)" opacity=".35"/>
    <path d="M58,188 L50,148 C48,130 60,118 78,115 L110,111 C124,99 142,95 159,101 L184,110 C210,98 240,100 266,112 L308,130 C342,146 362,160 372,174 L376,188 L374,178 C360,164 340,152 306,138 C250,114 182,114 122,134 C100,141 88,154 90,168 L58,188 Z" fill="${c.panel}" opacity=".9"/>
    <path d="M58,188 L50,148 C48,130 60,118 78,115 L110,111 C124,99 142,95 159,101 L184,110 C210,98 240,100 266,112 L308,130 C342,146 362,160 372,174 L376,188 L374,178 C360,164 340,152 306,138 C250,114 182,114 122,134 C100,141 88,154 90,168 L58,188 Z" fill="url(#${uid}p)"/>
    <path d="M90,168 C142,144 212,132 278,142" stroke="#fff" stroke-opacity=".35" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M74,123 C84,120 92,118 100,116" stroke="#fff" stroke-opacity=".45" stroke-width="4" stroke-linecap="round" fill="none"/>
    <circle cx="102" cy="103" r="12" fill="${c.accent}" stroke="#000" stroke-opacity=".2" stroke-width="1"/>
    <path d="M102,95 L105,101 L112,101 L107,106 L109,112 L102,108 L95,112 L97,106 L92,101 L99,101 Z" fill="${c.upper}" opacity=".8"/>
    <path d="M200,104 L222,111 L218,90 C214,80 200,80 196,90 Z" fill="${c.accent}" stroke="#000" stroke-opacity=".12" stroke-width="1"/>
    ${laces(162, 113, 5, c.laces)}
    <path d="M54,188 L376,188" stroke="#000" stroke-opacity=".14" stroke-width="1.4" stroke-dasharray="4 6"/>
  `;
}

/* ------------------------------------------------------------------ */
/* Renderer                                                            */
/* ------------------------------------------------------------------ */

const ART_BY_ID = {
  "jordan-1-chicago": drawJordan1,
  "nike-air-max-90": drawAirMax90,
  "adidas-samba-og": (c, uid) => drawSlimLow(c, uid, "samba"),
  "nb-550-green": drawNB550,
  "nike-dunk-low-panda": drawDunk,
  "jordan-4-military": drawJordan4,
  "adidas-crazy-8": (c, uid) => drawHighChunky(c, uid, "crazy8"),
  "puma-mb03": (c, uid) => drawHighChunky(c, uid, "mb03"),
  "asics-kayano-14": drawTechRunner,

  "converse-chuck-70": drawChuck,
  "vans-knu-skool": drawKnu,
  "nike-zoom-freak-5": drawFreak,
  "jordan-11-low": drawJordan11,
  "adidas-gazelle-pink": (c, uid) => drawSlimLow(c, uid, "gazelle"),
  "asics-gel-1130": drawTechRunner,
  "puma-suede-xl": (c, uid) => drawSlimLow(c, uid, "suede"),
  "nb-2002r": drawChunkyRunner,
};

const PHOTO_IDS = new Set(Object.keys(ART_BY_ID).concat(["nike-sb-dunk-low"]));

function sneakerSVG(product, overrideColors, forceVector) {
  if (!forceVector && !overrideColors && PHOTO_IDS.has(product.id)) {
    const fallback = ART_BY_ID[product.id]
      ? `<svg class="sneaker-art sneaker-img-fallback" viewBox="0 0 420 260" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${artDefs("sn-fallback-" + product.id)}${ART_BY_ID[product.id](product.colors, "sn-fallback-" + product.id)}</svg>`
      : "";
    return `<img class="sneaker-art sneaker-img" src="assets/products/${product.id}.png" alt="" aria-hidden="true" draggable="false" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span class="sneaker-img-fallback-wrap" hidden>${fallback}</span>`;
  }
  const c = Object.assign({}, product.colors, overrideColors || {});
  const uid = "sn" + ++artCounter;
  const draw = ART_BY_ID[product.id] || drawDunk;
  return `
  <svg class="sneaker-art" viewBox="0 0 420 260" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    ${artDefs(uid)}
    ${draw(c, uid)}
  </svg>`;
}
