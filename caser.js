const MEDIA = new URL('media/', document.baseURI).href
const pageUrl = new URL(document.URL)
const initial = Object.freeze({ balance: 338, items: [], customCases: [], favorites: [], bonus: false, activity: [] })
const rarities = ['#b5c9dd', '#83bffd', '#586cff', '#a06bff', '#ec54f4', '#ff5757', '#ffb33f']
const featured = [
  ['crimson-leaf', 'Crimson Leaf', 39, 0, 'crimson'], ['morpheus', 'Morpheus', 79, 1, 'morph'],
  ['minion', 'Minion', 99, 2, 'morph'], ['w', 'w', 150, 3, 'crimson'], ['rainy-evening', 'Rainy Evening', 349, 4, 'morph'],
  ['malibu', 'Malibu', 549, 5, 'burgundy'], ['whisper-of-autumn', 'Whisper of Autumn', 799, 6, 'autumn'],
  ['burgundy', 'Burgundy', 1199, 7, 'burgundy'], ['gta-6-ultimate', 'GTA 6 Ultimate', 8000, 8, 'burgundy'], ['oasis', 'Oasis', 49900, 9, 'burgundy'],
  ['magnum', 'Magnum', 19, 0, 'magnum'],
]
const pools = Object.fromEntries([
  ['crimson', [4,4,4,4,3,3,3,3,4,4,3,3,3,3,3,3,4,3,2,2,3,2,3,2,2,2,2,2,2,2,2,1]],
  ['morph', [4,4,4,4,4,4,4,4,4,4,3,3,3,3,3,3,4,3,2,3,3,3,2,2,2,2,2,2,2,2,1,1]],
  ['autumn', [6,6,6,6,6,5,5,5,5,5,4,4,4,4,4,4,4,3,3,3,4,4,3,3,2,2,2,2,2,2,2,2,2,2,1,3,2]],
  ['burgundy', [6,6,6,6,6,6,6,6,6,5,5,5,5,4,4,4,4,4,4,4,4,4,4,3,3,3,3,3,2,2,2,2]],
  ['magnum', [4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,2,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2]],
].map(([group, values]) => [group, values]))
const skinLines = {
  magnum: `Dual Berettas|Twin Turbo
SSG 08|Fever Dream
XM1014|Seasons
P90|Chopper
Desert Eagle|Directive
UMP-45|Exposure
P250|Nevermore
AWP|Pit Viper
Desert Eagle|Serpent Strike
P90|Wave Breaker
P2000|Amber Fade
P2000|Acid Etched
UMP-45|Moonrise
SG 553|Darkwing
M4A1-S|Nitro
UMP-45|Plastique
P250|X-Ray
M249|Downtown
P90|Neoqueen
R8 Revolver|Crimson Web
Dual Berettas|Elite 1.6
Five-SeveN|Violent Daimyo
MAC-10|Pipsqueak
P2000|Turf
P90|Grim
Charm|Dead Weight
USP-S|PC-GRN
FAMAS|Teardown
M4A4|Choppa
P2000|Royal Baroque
MAG-7|Insomnia
P2000|Red Wing`,
  crimson: `Glock-18|Mirror Mosaic
UMP-45|Neo-Noir
AUG|Stymphalian
M4A1-S|Solitude
M4A1-S|Electrum
M249|Downtown
MAC-10|Sakkaku
MAC-10|Derailment
Sticker|T-Rekt
Charm|Lil' Bloody
Sticker|Seeing Red
USP-S|Ticket to Hell
Tec-9|Bamboozle
Sawed-Off|Apocalypto
UMP-45|Continuum
P90|Wave Breaker
MAG-7|SWAG-7
Sticker|Gloves On
CZ75-Auto|Crimson Web
R8 Revolver|Crimson Web
MAC-10|Pipsqueak
SCAR-20|Grotto
Glock-18|Sacrifice
USP-S|Tropical Breeze
Dual Berettas|Shred
MP9|Modest Threat
P90|Grim
SSG 08|Memorial
Charm|Lil' Tusk
M4A4|Choppa
Dual Berettas|Polished Malachite
UMP-45|Facility Dark`,
  morph: `P90|Shapewood
MAC-10|Disco Tech
AK-47|Searing Rage
MAG-7|Justice
AK-47|The Outsiders
AUG|Death by Puppy
SG 553|Cyrex
UMP-45|Neo-Noir
M4A4|Tooth Fairy
SG 553|Integrale
P90|Virus
G3SG1|High Seas
Desert Eagle|Serpent Strike
M4A4|Sheet Lightning
Sawed-Off|Apocalypto
P250|Nevermore
AWP|Pit Viper
P90|Neoqueen
Tec-9|Bamboozle
M4A4|Etch Lord
Sticker|Cyber Romanov (Holo)
UMP-45|Arctic Wolf
MP9|Deadly Poison
USP-S|Tropical Breeze
UMP-45|Late Night Transit
MP5-SD|Liquidation
MAG-7|Insomnia
M249|Bock Blocks
P2000|Gnarled
AK-47|VariCamo Grey
AUG|Condemned
Glock-18|Ocean Topo`,
  autumn: `★ Bowie Knife|Lore
★ Falchion Knife|Autotronic
★ Broken Fang Gloves|Jade
★ Hand Wraps|Overprint
★ StatTrak™ Shadow Daggers|Autotronic
AWP|Containment Breach
M4A1-S|Vaporwave
Sir Bloody Darryl Royale|The Professionals
Cmdr. Davida 'Goggles' Fernandez|SEAL Frogman
AK-47|The Oligarch
AK-47|Head Shot
M4A4|龍王 (Dragon King)
Nova|Hyper Beast
AUG|Lil' Pig
AWP|Crakow!
AWP|Ice Coaled
P250|Muertos
M4A1-S|Leaded Glass
AWP|The End
MP7|Nemesis
Glock-18|Vogue
AK-47|Searing Rage
AK-47|Nouveau Rouge
MAG-7|Justice
CZ75-Auto|Yellow Jacket
AK-47|Slate
Tec-9|Titanium Bit
MAC-10|Heat
Tec-9|Whiteout
CZ75-Auto|Tacticat
Seal Team 6 Soldier|NSWC SEAL
CZ75-Auto|Nitro
Galil AR|Destroyer
USP-S|Blueprint
MAC-10|Ultraviolet
Galil AR|Tuxedo
AWP|Sun in Leo`,
  burgundy: `★ StatTrak™ Huntsman Knife|Autotronic
★ Paracord Knife|Slaughter
★ Survival Knife|Crimson Web
★ Bowie Knife|Lore
★ Falchion Knife|Bright Water
★ StatTrak™ Shadow Daggers|Ultraviolet
★ Huntsman Knife|Lore
★ Moto Gloves|Finish Line
★ Moto Gloves|Turtle
AWP|Asiimov
FAMAS|Commemoration
AK-47|Inheritance
M4A4|Full Throttle
P250|Kintsugi
Glock-18|Water Elemental
M4A1-S|Fatal Glitch
MAC-10|Toybox
M4A4|Cyber Security
Five-SeveN|Monkey Business
M4A1-S|Party Animal
AWP|Elite Build
Zeus x27|Olympus
Sawed-Off|Kiss♥Love
Dual Berettas|Hemoglobin
Glock-18|Ramese's Reach
M4A1-S|Basilisk
SSG 08|Parallax
USP-S|Stainless
Desert Eagle|Corinthian
Desert Eagle|Bronze Deco
SSG 08|Zeno
M4A4|Jungle Tiger`,
}
const newBadges = new Set(['w', 'malibu', 'gta-6-ultimate', 'oasis'])
const formatted = new Intl.NumberFormat('uk-UA', { maximumFractionDigits: 2 })
const saveKey = 'mshana-drop-v1'
const $ = (selector, root = document) => root.querySelector(selector)
const region = (name) => $(`[data-region="${name}"]`)
const format = value => formatted.format(value / 100)
const money = value => formatted.format(value)
const media = name => `${MEDIA}${name}.webp`
const formatCasePrice = value => money(value).replace(',', '.')
const svg = {
  coin: '<svg class="cr-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 1.2 22 6.7v10.6L12 23l-6.1-3.4-1.5-5.1-2.4 1.1V6.8L12 1.2Zm-6 5.4 1.9 2.2 8.9.6 2.9 2.5-1.6-3.8L6 6.6Zm2 4.6 2 8.4 2.5 1 1.4-1.1-2.8-1.2-1.9-7.1H8Z"/></svg>',
  box: '<svg class="cr-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M4 3h16a2 2 0 0 1 2 2v4H2V5a2 2 0 0 1 2-2ZM2 11h7v2h6v-2h7v7a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-7Z"/></svg>',
  star: '<svg class="cr-icon" viewBox="0 0 24 24"><path fill="currentColor" d="m12 1 3 7 8 .7-6 5.2 1.8 8.1-6.8-4.3L5.2 22 7 13.9 1 8.7 9 8z"/></svg>',
  right: '<svg class="cr-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 4 8 8-8 8"/></svg>',
  down: '<svg class="cr-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m5 9 7 7 7-7"/></svg>',
  back: '<svg class="cr-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m10 5-7 7 7 7M3 12h17"/></svg>',
  search: '<svg class="cr-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="10" cy="10" r="6.3"/><path d="m15 15 6 6"/></svg>',
  bolt: '<svg class="cr-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M9 1h8l-3 8h5L9 23l2-10H5z"/></svg>',
  sound: '<svg class="cr-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M2 8h4l5-5v18l-5-5H2V8Zm12 0 1.4-1.4a7.7 7.7 0 0 1 0 10.8L14 16a5.8 5.8 0 0 0 0-8Zm3-3 1.4-1.4a12 12 0 0 1 0 16.8L17 19a10 10 0 0 0 0-14Z"/></svg>',
  soundOff: '<svg class="cr-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M2 8h4l5-5v18l-5-5H2V8Zm13.3 1.3L18.7 9l1.8 3 3-1.8 1.3 2.2-3 1.8 1.8 3-2.2 1.3-1.8-3-3 1.8-1.3-2.2 3-1.8z"/></svg>',
  sparkle: '<svg class="cr-icon" viewBox="0 0 24 24"><path fill="currentColor" d="m10 4 2.2 5.8L18 12l-5.8 2.2L10 20l-2.2-5.8L2 12l5.8-2.2Zm9-3 1.1 3 3 1.1-3 1.1L19 9l-1.1-2.8-3-1.1 3-1.1Zm0 14 1 2.5 2.5 1-2.5 1L19 22l-1-2.5-2.5-1 2.5-1Z"/></svg>',
  sort: '<svg class="cr-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 3v18m-3-3 3 3 3-3m3-13h10M11 10h7m-7 5h4"/></svg>',
}
const svgUrl = markup => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`

function skin(group, index, rarity, value, override = {}) {
  const line = skinLines[group].trim().split('\n')[index]?.trim() ?? 'M4A1-S|Solitude'
  const [name, finish = '', ...extra] = line.split('|')
  return {
    id: `${group}-${index}`,
    name,
    finish,
    art: `${group}-${String(index + 1).padStart(2, '0')}`,
    rarity,
    value,
    ...(extra.length ? { wear: extra.join('|').trim() } : {}),
    ...override,
  }
}

function pricePool(group, caseId, casePrice) {
  const lines = skinLines[group].trim().split('\n')
  const weights = pools[group]
  return lines.map((_, i) => skin(group, i, weights[i] ?? 2,
    Math.max(100, Math.round(casePrice * 100 * (.14 + 8 * (1 - i / Math.max(1, lines.length - 1)) ** 4))))
    .map(item => ({ ...item, id: `${caseId}-${item.id}` })))
}
const dropItem = { id: 'drop-evelyn', name: '★ евелін', finish: 'Прямо з заводу (FN)', art: 'featured-drop', rarity: 6, value: 465327 }
const cases = featured.map(([id, name, price, artIndex, pool]) => ({
  id, name, price, art: id === 'magnum' ? 'hero-01' : `hero-${String(artIndex + 1).padStart(2, '0')}`,
  pool: pricePool(pool, id, price),
}))
const magnumCase = { ...cases.find(item => item.id === 'magnum'), id: 'mshana-80', name: 'MSHANA 80%', price: 19, guaranteedChance: .8, guaranteedDrop: dropItem }
const creators = [
  ['Strogo( ez )Awp', 391, 'HIGH', '07.11.2026', '7 593 107', 0, 'crimson'],
  ['ГРЯЗНУЛЬКА', 24896, 'MEDIUM', '13.11.2026', '121 079', 1, 'morph'],
  ['Нож с завода', 534, 'HIGH', '16.11.2026', '7 527 281', 2, 'crimson'],
  ['M4A1-S Farm', 2073, 'MEDIUM', '03.11.2026', '2 960 740', 3, 'morph'],
  ['фарм 10% в плюс', 1700, 'MEDIUM', '12.11.2026', '486 740', 4, 'crimson'],
].map(([name, price, level, date, openings, artIndex, pool], i) => ({
  id: `author-${i + 1}`, name, price, art: `author-hero-0${Number(artIndex) + 1}`,
  avatar: `avatar-0${Number(artIndex) + 1}`, level, date, openings,
  pool: pricePool(pool, `author-${i + 1}`, price / 100),
}))
const allCases = () => [...(game.customCases ?? []).flatMap(custom => {
  const base = cases.find(entry => entry.id === custom.base)
  return base ? [{ ...base, ...custom, pool: pricePool(base.id === 'whisper-of-autumn' ? 'autumn' : base.id === 'burgundy' ? 'burgundy' : base.id === 'morpheus' ? 'morph' : 'crimson', custom.id, custom.price) }] : []
}), ...creators]
const feedItems = [
  ['feed', ['★ Specialist Gloves|Emerald Web (Battle-Scarred)', '★ Bowie Knife|Damascus Steel (Field-Tested)', 'AWP|Hyper Beast (Well-Worn)', 'Sticker|cajunb (Foil)', 'FAMAS|Djinn (Minimal Wear)', 'Autograph Capsule|Team EnVyUs', 'StatTrak™ M4A4|In Living Color (Battle-Scarred)', 'StatTrak™ MP7|Ocean Foam (Minimal Wear)', 'Krakow 2017 Challengers|', 'Souvenir M4A4|Converter (Factory New)', 'M4A1-S|Nightmare (Minimal Wear)', 'Glock-18|Shinobu (Factory New)'], [6,6,5,3,4,0,5,3,0,2,4,4]],
  ['feed-alt', ['AK-47|Neon Rider (Battle-Scarred)', '★ StatTrak™ Kukri Knife|Forest DDPAT (Battle-Scarred)', 'StatTrak™ Glock-18|Fully Tuned (Well-Worn)', 'FAMAS|Waters of Nephthys (Field-Tested)', 'M4A1-S|Golden Coil (Well-Worn)', '★ Shadow Daggers|Rust Coat (Battle-Scarred)', 'StatTrak™ AUG|Momentum (Factory New)', 'StatTrak™ P250|Undertow (Minimal Wear)', '★ Specialist Gloves|Emerald Web (Battle-Scarred)'], [5,6,5,4,5,6,4,4,6]],
].flatMap(([group, lines, ranks]) => lines.map((line, i) => {
  const [name, finish = ''] = line.split('|')
  return { id: `${group}-${i}`, name, finish, art: `${group}-${String(i + 1).padStart(2, '0')}`, rarity: ranks[i], value: 100, wear: '' }
}))
const targets = [
  ...[['UMP-45','Urban DDPAT','FT'],['P90','Sand Spray','MW'],['XM1014','Blue Spruce','BS'],['AUG','Condemned','BS'],['Tec-9','Urban DDPAT','BS'],['MP7','Forest DDPAT','WW'],['Sealed Graffiti','Sorry'],['Sticker','Ninjas in Pyjamas | 2020 RMR'],['Sticker','GamerLegion | Rio 2022'],['Sticker','Aim And Fire'],['Sticker','floppy | Paris 2023'],['Sticker','G2 Esports | Paris 2023']]
    .map(([name, finish, wear], i) => ({ id: `target-${String(i + 1).padStart(2, '0')}`, name, finish, wear, art: `target-${String(i + 1).padStart(2, '0')}`, rarity: i < 6 ? (i === 3 ? 1 : 0) : 3, value: 412 })) ,
  ...[...cases, ...creators].flatMap(entry => entry.pool),
  dropItem,
  dropItem,
].sort((a,b) => a.value-b.value)

function restore() {
  try {
    const stored = JSON.parse(localStorage.getItem(saveKey) || 'null')
    if (stored && Number.isSafeInteger(stored.balance) && stored.balance >= 0 && Array.isArray(stored.items)) return { ...structuredClone(initial), ...stored }
  } catch {}
  return structuredClone(initial)
}

let game = restore()
let currentView = pageUrl.searchParams.get('view') || 'cases'
let activeCase = pageUrl.searchParams.get('case') || ''
let noticeDismissed = Boolean(localStorage.getItem(`${saveKey}-notification`))
let timer
let busy = false
let soundOn = true
let fast = false
let winners = []
let feedRare = false
let searchText = ''
let creatorFilter = false
let showMore = false
let selected = []
let chosenTarget = null
let addBalance = 0
let minValue = ''
let maxValue = ''
let targetSearch = ''
let targetSearchOpen = false
let reverseMarket = false
let reverseInventory = true
let quickChoice = ''
let addedResult = null
let rotating = 0
let roundId = 0
let audio
const nav = window.MSHANA_NAVIGATION ?? [{ id: 'inventory', name: 'Інвентар' }, { id: 'cases', name: 'Кейси' }, { id: 'upgrade', name: 'Апгрейди' }, { id: 'rewards', name: 'Нагороди' }]

function save(next = game) {
  game = next
  try { localStorage.setItem(saveKey, JSON.stringify(game)) } catch {}
  updateHeader()
}

function updateHeader() {
  $('[data-bind="count"]').textContent = String(game.items.length)
  $('[data-bind="balance"]').textContent = format(game.balance)
}

function syncUrl() {
  if (location.protocol === 'file:') return
  const url = new URL(location.href)
  if (activeCase) { url.searchParams.delete('view'); url.searchParams.set('case', activeCase) }
  else if (currentView !== 'cases') { url.searchParams.delete('case'); url.searchParams.set('view', currentView) }
  else { url.searchParams.delete('case'); url.searchParams.delete('view') }
  history.replaceState({}, '', url)
}

function navigate(view) {
  if (busy) return
  activeCase = ''
  currentView = view
  addedResult = null
  if (view === 'cases') { creatorFilter = false; searchText = '' }
  syncUrl()
  window.scrollTo({ top: 0, behavior: 'smooth' })
  render()
}

function card(skinItem, options = {}) {
  return `<div class="cr-skin${options.compact ? ' cr-skin--compact' : ''}" style="--rarity:${rarities[skinItem.rarity] ?? rarities[2]}" title="${esc(skinItem.name)} ${esc(skinItem.finish)}"><div class="cr-skin-art"><img src="${media(skinItem.art)}" alt="" draggable="false">${options.price ? `<span class="cr-skin-price">${format(skinItem.value)} ${svg.coin}${skinItem.wear ? `<small>${esc(skinItem.wear)}</small>` : ''}</span>` : ''}</div><div class="cr-skin-label"><strong>${esc(skinItem.name)}</strong><span>${esc(skinItem.finish)}</span></div></div>`
}

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character])
}

function caseCard(entry) {
  return `<button class="cr-case" data-action="open-page" data-id="${esc(entry.id)}">${newBadges.has(entry.id) ? '<span class="cr-new">NEW</span>' : ''}<span class="cr-case-art"><img src="${media(entry.art)}" alt="" width="243" height="149"></span><span class="cr-case-info"><strong>${esc(entry.name)}</strong><span>${formatCasePrice(entry.price)} ${svg.coin}</span></span></button>`
}

function authorCard(entry) {
  const favorite = game.favorites.includes(entry.id)
  return `<article class="cr-case cr-author"><button class="cr-author-body" data-action="open-page" data-id="${esc(entry.id)}"><span class="cr-case-art"><img src="${media(entry.art)}" alt="" width="211" height="129"></span><span class="cr-level${entry.level === 'HIGH' ? ' high' : ''}">${entry.level}</span><span class="cr-case-info"><span><strong>${esc(entry.name)}</strong><small>оновлено ${esc(entry.date)}</small></span><span><span>${format(entry.price)} ${svg.coin}</span><small>${svg.box} ${esc(entry.openings)}</small></span></span></button><img class="cr-avatar" src="${media(entry.avatar)}" alt="" width="30" height="30"><button class="cr-favorite" aria-label="Обране" aria-pressed="${favorite}" data-action="favorite" data-id="${esc(entry.id)}">${svg.star}</button></article>`
}

function feed() {
  const activity = [...game.activity, ...feedItems].filter(item => !feedRare || item.rarity >= 5)
  return activity.map(item => `<div class="cr-feed-item"><div style="--rarity:${rarities[item.rarity] ?? rarities[3]}"><img src="${media(item.art)}" alt="" width="94" height="70"></div><div><strong>${esc(item.name)}</strong><span>${esc(item.finish)}</span></div></div>`).join('')
}

function renderCatalog() {
  const creatorCases = allCases()
  const query = searchText.trim().toLowerCase()
  const matches = entry => !query || entry.name.toLowerCase().includes(query)
  const featuredCases = [...cases, magnumCase].filter(matches)
  const authorRows = creatorCases.filter(matches).slice(0, showMore || query ? undefined : 5)
  const search = `<button class="cr-search-button" data-action="search" aria-label="Пошук кейсів">${svg.search}</button>${searchText ? `<input data-input="case-search" value="${esc(searchText)}" placeholder="Знайти кейс" aria-label="Знайти кейс">` : ''}`
  const filter = `<button data-action="filter" data-value="all" aria-pressed="${!creatorFilter}">Усі кейси</button><button data-action="filter" data-value="authors" aria-pressed="${creatorFilter}">Авторські кейси</button>`
  return `<div class="cr-catalog-bar">${search}${filter}</div><div class="cr-catalog">${!creatorFilter && featuredCases.length ? `<section aria-labelledby="caser-new"><h1 id="caser-new">NEW</h1><div class="cr-case-grid">${featuredCases.map(caseCard).join('')}</div></section>` : ''}<section class="cr-authors${creatorFilter || !featuredCases.length ? ' cr-authors--first' : ''}"><div class="cr-section-head"><button class="cr-heading-link" data-action="filter" data-value="authors">Авторські кейси ${svg.right}</button><button class="cr-button cr-green" data-action="create">Створити свій кейс</button></div><div class="cr-case-grid">${authorRows.map(authorCard).join('')}</div>${!authorRows.length ? '<p class="cr-empty">Кейсів за цим запитом немає.</p>' : ''}${!query && creatorCases.length > 5 ? `<button class="cr-more" data-action="more">${showMore ? 'Показати менше' : 'Показати ще'} ${svg.down}</button>` : ''}</section></div>`
}

function fullCase() {
  const entry = getActiveCase()
  if (!entry) { activeCase = ''; syncUrl(); return renderCatalog() }
  const stop = 29
  const reel = winners.length ? `<div class="cr-reel" aria-hidden="true"><div class="cr-reel-track" style="--stop:0;--duration:0ms">${winners.map((item,index)=>`<span class="cr-reel-cell" style="--rarity:${rarities[item.rarity]}" data-roll-index="${index}">${card(item)}</span>`).join('')}</div></div>` : `<img src="${media(entry.art)}" class="cr-case-hero" alt="" width="440" height="225">`
  const remaining = Math.max(0, Math.ceil((entry.price * 100 - game.balance) / 100))
  const prize = addedResult ? `<div class="cr-drop" aria-live="polite"><p>Випало <strong>${esc(addedResult.item.name)} · ${esc(addedResult.item.finish)}</strong></p><div><button class="cr-button cr-green" data-action="use-drop">Апгрейдити</button><button class="cr-button" data-action="sell">Продати за ${format(addedResult.item.value)} ${svg.coin}</button><button class="cr-button" data-action="navigate" data-view="inventory">До інвентарю</button></div></div>` : ''
  const guaranteed=entry.guaranteedDrop?`<div class="cr-guaranteed-drop">${card(entry.guaranteedDrop,{price:true})}<p>80% шанс випадіння предмета</p></div>`:''
  return `<div class="cr-case-stage${winners.length ? ' cr-case-stage--reel' : ''}"><button class="cr-button cr-back" data-action="navigate" data-view="cases">${svg.back} До кейсів</button><button class="cr-button cr-sound" data-action="sound" aria-label="${soundOn ? 'Вимкнути звук' : 'Увімкнути звук'}">${soundOn ? svg.sound : svg.soundOff}</button>${reel}${remaining && !busy && !addedResult ? `<div class="cr-shortage"><strong>Бракує ${money(remaining)} ${svg.coin}</strong><p>Недостатньо коштів для відкриття кейса</p><button class="cr-button cr-amber" data-action="balance">Поповнити баланс +</button></div>` : ''}</div><div class="cr-case-detail cr-wide"><h1>${esc(entry.name)}</h1>${prize}<div class="cr-open-row"><button class="cr-button cr-fast" data-action="fast" aria-pressed="${fast}" aria-label="Швидке відкриття">${svg.bolt}</button><button class="cr-button cr-open${remaining ? '' : ' cr-green'}" data-action="open-case" ${busy || remaining ? 'disabled' : ''}>${busy ? 'Кейс прокручується…' : `Відкрити за ${formatCasePrice(entry.price)} ${svg.coin}`}</button></div>${guaranteed}<div class="cr-case-contents">${entry.pool.map(item=>card(item)).join('')}</div></div>`
}

function skinItem(item, options = {}) {
  return `<div class="cr-market-item" data-skin-id="${esc(item.id)}">${card(item,{ price: true, compact: options.compact })}</div>`
}

function upgrade() {
  const inventory = [...game.items].sort((a,b)=>(a.skin.value-b.skin.value)*(reverseInventory ? -1 : 1))
  const chosen = inventory.filter(item=>selected.includes(item.uid))
  const stake = chosen.reduce((total,item)=>total+item.skin.value,0)+addBalance
  const probability = chosenTarget && stake ? Math.min(95,Math.max(.01,Math.floor(stake/chosenTarget.value*9500)/100)) : 50
  const available = targets.filter(item=>item.value>stake&&(!minValue||item.value>=Math.round(Number(minValue)*100))&&(!maxValue||item.value<=Math.round(Number(maxValue)*100))&&(!targetSearch||`${item.name} ${item.finish}`.toLowerCase().includes(targetSearch.toLowerCase())))
  if(reverseMarket) available.reverse()
  const options = ['X2','X5','X10','30%','50%','75%']
  const rotation = addedResult ? `<span class="cr-upgrade-result">${addedResult}</span>` : ''
  return `<section class="cr-wide cr-upgrade"><div class="cr-upgrade-tools"><button class="cr-button" data-action="fast" aria-label="Швидкий апгрейд" aria-pressed="${fast}">${svg.bolt}</button><button class="cr-button" data-action="sound" aria-label="Звук">${soundOn ? svg.sound : svg.soundOff}</button></div><div class="cr-upgrade-top"><div class="cr-selection cr-selection--source"><h2>Оберіть предмети та баланс для використання</h2><div class="cr-selection-items">${chosen.map(({skin})=>`<button class="cr-selected-item" data-action="toggle-skin" data-uid="${esc(game.items.find(item=>selected.includes(item.uid)&&item.skin.id===skin.id)?.uid ?? '')}">${card(skin,{price:true})}</button>`).join('')}</div>${chosen.length ? '' : '<p>Обрані предмети з’являться тут</p>'}</div><div class="cr-wheel-column"><div class="cr-wheel-logo"><span class="cr-brand">MSHANA <span>DROP</span></span></div><div class="cr-wheel" style="--arc-start:${180-probability*1.8}deg;--arc-end:${180+probability*1.8}deg"><div class="cr-wheel-face"><span class="cr-tick cr-tick--top">100%</span><span class="cr-tick cr-tick--left">50%</span><span class="cr-tick cr-tick--right">50%</span><span class="cr-tick cr-tick--bottom">0%</span><div class="cr-wheel-center"><i></i><div><strong>${probability.toFixed(2)}%</strong><span>${probability>70?'Високий шанс':probability<30?'Низький шанс':'Середній шанс'}</span></div></div></div><div class="cr-wheel-pointer" style="--wheel-turn:${rotating}deg;--wheel-time:${addedResult?0:0}ms"><i></i></div></div></div><div class="cr-selection cr-selection--target"><h2>Оберіть предмет для апгрейду</h2>${chosenTarget?skinItem(chosenTarget):'<p>Оберіть предмет зі списку нижче</p>'}</div><label class="cr-slider">${svg.coin}<span>Додати баланс</span><span><b>${svg.coin} ${format(addBalance)}</b><input data-input="add-balance" type="range" min="0" max="${game.balance}" value="${addBalance}" step="1"></span><span>Макс.<b>${svg.coin} ${format(game.balance)}</b></span></label><button class="cr-button cr-upgrade-action${chosenTarget&&stake>0&&stake<chosenTarget.value&&!busy?' cr-green':''}" data-action="upgrade" ${(chosenTarget&&stake>0&&stake<chosenTarget.value&&!busy)?'':'disabled'}>${busy?'Апгрейд…':'Апгрейд'}</button><div class="cr-quick"><button class="cr-button${quickChoice?'':' cr-green'}" data-action="quick-clear">${svg.sparkle}</button>${options.map(option=>`<button class="cr-button" data-action="quick" data-value="${option}" aria-pressed="${quickChoice===option}" ${busy?'disabled':''}>${option}</button>`).join('')}</div></div><div class="cr-upgrade-bottom"><div class="cr-panel"><div class="cr-panel-header"><h2>${svg.box} Мої предмети</h2><button class="cr-outline" data-action="sort-inventory" aria-label="Сортування">${svg.sort}</button></div>${inventory.length?`<div class="cr-market-grid">${inventory.map(item=>`<button data-action="toggle-skin" data-uid="${esc(item.uid)}" aria-pressed="${selected.includes(item.uid)}">${card(item.skin,{price:true,compact:true})}</button>`).join('')}</div>`:'<div class="cr-empty-inventory"><strong>Ваш інвентар порожній</strong><p>Відкрий свій перший кейс</p><button class="cr-button cr-green" data-action="navigate" data-view="cases">${svg.box} Відкрити кейс</button></div>'}</div><div class="cr-panel"><div class="cr-panel-header"><h2>${svg.right} Обрати предмет</h2><div class="cr-market-filter"><button class="cr-outline" data-action="sort-targets" aria-label="Змінити сортування">${svg.sort}</button><span class="cr-outline">Ціна</span><input class="cr-outline" type="number" data-input="min" min="0" step=".01" placeholder="Від" value="${esc(minValue)}"><input class="cr-outline" type="number" data-input="max" min="0" step=".01" placeholder="До" value="${esc(maxValue)}"><button class="cr-outline" data-action="target-search" aria-label="Пошук">${svg.search}</button></div></div>${targetSearchOpen?`<input class="cr-market-search cr-outline" data-input="target-search" placeholder="Назва предмета" value="${esc(targetSearch)}">`:''}<div class="cr-market-grid">${available.slice(0,72).map(item=>`<button data-action="select-target" data-id="${esc(item.id)}" aria-pressed="${chosenTarget?.id===item.id}">${card(item,{price:true,compact:true})}</button>`).join('')}</div>${available.length?'':'<p class="cr-empty">Для цієї ставки й фільтрів предметів немає.</p>'}</div></div></section>`
}

function inventoryView() {
  const items = [...game.items].sort((a,b)=>(a.skin.value-b.skin.value)*(reverseInventory?-1:1))
  return `<section class="cr-wide cr-other"><div class="cr-panel"><div class="cr-panel-header"><h1>${svg.box} Інвентар</h1><button class="cr-outline" data-action="sort-inventory">${svg.sort}</button></div>${items.length?`<div class="cr-inventory-grid">${items.map(item=>`<article>${card(item.skin,{price:true})}<div><button class="cr-button cr-green" data-action="use-owned" data-uid="${esc(item.uid)}">Апгрейдити</button><button class="cr-button" data-action="sell" data-uid="${esc(item.uid)}">Продати</button></div></article>`).join('')}</div>`:'<div class="cr-empty-inventory"><strong>Ваш інвентар порожній</strong><p>Відкрий свій перший кейс</p><button class="cr-button cr-green" data-action="navigate" data-view="cases">Відкрити кейс</button></div>'}</div></section>`
}

function rewardsView() {
  return `<section class="cr-wide cr-other"><div class="cr-panel"><div class="cr-panel-header"><h1>${svg.star} Нагороди</h1></div><div class="cr-empty-inventory"><strong>Стартовий бонус</strong><p>1 000 ${svg.coin} на демобаланс</p><button class="cr-button cr-green" data-action="claim" ${game.bonus?'disabled':''}>${game.bonus?'Отримано':'Отримати бонус'}</button></div></div></section>`
}

function modalContents() {
  if (game.modal === 'balance') return `<h2 id="caser-dialog-title">Поповнити баланс</h2><p>Додай ігрові монети для відкриття кейсів та апгрейдів.</p><div class="cr-dialog-actions">${[1000,10000,50000].map(amount=>`<button class="cr-button cr-green" data-action="top-up" data-value="${amount}">+ ${money(amount)} ${svg.coin}</button>`).join('')}</div>`
  if (game.modal === 'create') return `<h2 id="caser-dialog-title">Створити свій кейс</h2><form class="cr-case-form" data-form="create"><label>Назва<input name="name" maxlength="40" required></label><label>Ціна<input name="price" type="number" min="1" max="49900" value="39" step=".01" required></label><label>Вміст кейса<select name="base">${cases.map(entry=>`<option value="${entry.id}">${esc(entry.name)}</option>`).join('')}</select></label><button class="cr-button cr-green" type="submit">Створити кейс</button></form>`
  if (game.modal === 'help') return `<h2 id="caser-dialog-title">Допомога</h2><p>Поповни ігровий баланс кнопкою «+» та відкрий кейс. Випадковий предмет з’явиться в інвентарі.</p><p>На сторінці апгрейдів обери свої предмети або додай баланс, а потім обери дорожчий предмет. У разі невдачі ставка витрачається.</p>`
  return ''
}

function updateModal() {
  const overlay = region('modal')
  if (!game.modal) { overlay.hidden = true; overlay.innerHTML = ''; return }
  overlay.hidden = false
  overlay.innerHTML = `<section class="cr-dialog" role="dialog" aria-modal="true" aria-labelledby="caser-dialog-title"><button class="cr-dialog-close cr-outline" data-action="close-modal" aria-label="Закрити">×</button>${modalContents()}</section>`
}

function render() {
  $('.cr-main').classList.toggle('cr-main--detail', Boolean(activeCase))
  $('.cr-main').innerHTML = activeCase ? fullCase() : currentView === 'cases' ? renderCatalog() : currentView === 'upgrade' ? upgrade() : currentView === 'inventory' ? inventoryView() : rewardsView()
  region('feed').innerHTML = feed()
  $('.cr-notification').hidden = noticeDismissed || !(activeCase || currentView === 'upgrade')
  document.querySelectorAll('.cr-nav [data-view]').forEach(button=>{
    button.classList.toggle('active',button.dataset.view===currentView)
    if(button.dataset.view===currentView) button.setAttribute('aria-current','page')
    else button.removeAttribute('aria-current')
  })
  updateHeader()
  updateModal()
}

function getActiveCase() { return [...cases,magnumCase,...allCases()].find(item=>item.id===activeCase) }
function random() { return crypto.getRandomValues(new Uint32Array(1))[0]/4294967296 }
function drawCaseDrop(entry) { return entry.guaranteedDrop && random()<entry.guaranteedChance ? entry.guaranteedDrop : draw(entry.pool) }
function draw(pool) {
  const weights=pool.map((item,index)=>(index+3)**1.45/(1+item.rarity*.22))
  let number=random()*weights.reduce((total,weight)=>total+weight,0)
  return pool.find((_,index)=>(number-=weights[index])<0)??pool.at(-1)
}

function clickTone(success=true) {
  if (!soundOn || !window.AudioContext) return
  try {
    audio ??= new AudioContext()
    audio.resume().catch(()=>{})
    const oscillator=audio.createOscillator(); const gain=audio.createGain(); const time=audio.currentTime
    oscillator.frequency.setValueAtTime(success?410:240,time)
    oscillator.frequency.exponentialRampToValueAtTime(success?730:100,time+.22)
    gain.gain.setValueAtTime(.04,time); gain.gain.exponentialRampToValueAtTime(.001,time+.27)
    oscillator.connect(gain); gain.connect(audio.destination); oscillator.start(); oscillator.stop(time+.28)
  } catch {}
}

function createReel(item, pool) {
  const cells=Array.from({length:31},(_,i)=>i===30?item:draw(pool))
  winners=cells
  render()
  const track=$('.cr-reel-track')
  const step=track.querySelector('.cr-reel-cell')?.getBoundingClientRect().width??164
  const duration=fast||matchMedia('(prefers-reduced-motion: reduce)').matches?100:4100
  track.style.setProperty('--duration',`${duration}ms`)
  track.style.transform=`translateX(${-30*step}px)`
  return duration
}

function openCase() {
  const entry=getActiveCase()
  if(!entry||busy) return
  const cost=entry.price*100
  if(game.balance<cost) { game.modal='balance'; updateModal(); return }
  const result={uid:crypto.randomUUID(),skin:drawCaseDrop(entry)}
  busy=true
  addedResult=null
  game.balance-=cost
  game.items.unshift(result)
  game.activity.unshift(result.skin)
  game.activity=game.activity.slice(0,12)
  save()
  const duration=createReel(result.skin,entry.pool)
  const id=++roundId
  timer=setTimeout(()=>{
    if(id!==roundId)return
    addedResult={item:result.skin,uid:result.uid}
    busy=false
    clickTone(true)
    render()
  },duration)
}

function sellOwned(uid) {
  const item=game.items.find(candidate=>candidate.uid===uid)
  if(!item||busy)return
  game.balance+=item.skin.value
  game.items=game.items.filter(candidate=>candidate.uid!==uid)
  selected=selected.filter(candidate=>candidate!==uid)
  if(addedResult?.uid===uid) addedResult=null
  save();render()
}

function upgradeItem() {
  const chosen=game.items.filter(item=>selected.includes(item.uid))
  const stake=chosen.reduce((total,item)=>total+item.skin.value,0)+addBalance
  const goal=chosenTarget
  if(busy||!goal||stake<=0||stake>=goal.value)return
  const probability=Math.min(95,Math.max(.01,Math.floor(stake/goal.value*9500)/100))
  const won=random()*100<probability
  const offset=won?(random()*2-1)*(probability*1.8)*.94:probability*1.8+1+random()*(358-probability*3.6)
  const existing=game.items.filter(item=>!selected.includes(item.uid))
  const result=won?{uid:crypto.randomUUID(),skin:goal}:null
  busy=true
  rotating=Math.ceil(rotating/360)*360+1800+offset
  game.balance-=addBalance
  game.items=existing
  if(result){game.items.unshift(result);game.activity.unshift(goal);game.activity=game.activity.slice(0,12)}
  const expected=probability
  save()
  selected=[];addBalance=0;quickChoice=''
  render()
  const pointer=$('.cr-wheel-pointer')
  pointer.style.setProperty('--wheel-time',`${fast?550:4000}ms`)
  const duration=fast?550:4000
  const id=++roundId
  setTimeout(()=>{pointer.style.setProperty('--wheel-turn',`${rotating}deg`)},16)
  timer=setTimeout(()=>{
    if(id!==roundId)return
    busy=false
    addedResult=won?`Успіх · предмет додано до інвентарю (${expected.toFixed(2)}%)`:`Невдача · апгрейд не вдався (${expected.toFixed(2)}%)`
    clickTone(won);render()
  },duration)
}

function findUpgrade(option) {
  const stake=game.items.filter(item=>selected.includes(item.uid)).reduce((total,item)=>total+item.skin.value,0)+addBalance
  if(!stake)return
  const targetValue=option.startsWith('X')?stake*Number(option.slice(1)):stake*95/Number(option.slice(0,-1))
  const eligible=targets.filter(item=>item.value>stake)
  const closest=eligible.reduce((best,item)=>!best||Math.abs(item.value-targetValue)<Math.abs(best.value-targetValue)?item:best,null)
  chosenTarget=closest;quickChoice=option;addedResult=null;render()
}

function openEntry(id) {
  if(busy)return
  currentView='cases';activeCase=id;winners=[];addedResult=null;noticeDismissed=Boolean(localStorage.getItem(`${saveKey}-notification`));syncUrl();render()
}

function topUp(amount) {
  game.balance+=amount*100;game.modal=null;save();render()
}

function handleClick(event) {
  const button=event.target.closest('[data-action]')
  if(!button||button.disabled)return
  const action=button.dataset.action
  if(action==='navigate')navigate(button.dataset.view)
  else if(action==='open-page')openEntry(button.dataset.id)
  else if(action==='filter'){creatorFilter=button.dataset.value==='authors';render()}
  else if(action==='search'){
    const open=!document.querySelector('[data-input="case-search"]')
    searchText=open?' ':'';render()
    const input=$('[data-input="case-search"]');if(input){input.value='';input.focus()}
  }
  else if(action==='favorite'){
    game.favorites=game.favorites.includes(button.dataset.id)?game.favorites.filter(id=>id!==button.dataset.id):[...game.favorites,button.dataset.id];save();render()
  }
  else if(action==='more'){showMore=!showMore;render()}
  else if(action==='open-case')openCase()
  else if(action==='balance'){game.modal='balance';updateModal()}
  else if(action==='create'){game.modal='create';updateModal()}
  else if(action==='help'){game.modal='help';updateModal()}
  else if(action==='close-modal'){game.modal=null;updateModal()}
  else if(action==='top-up')topUp(Number(button.dataset.value)/100)
  else if(action==='dismiss'||action==='subscribe'){
    noticeDismissed=true;localStorage.setItem(`${saveKey}-notification`,action==='subscribe'?'yes':'dismissed');render()
  }
  else if(action==='notification'){
    const popup=$('.cr-notification');popup.hidden=!popup.hidden
  }
  else if(action==='sound'){soundOn=!soundOn;render()}
  else if(action==='fast'){fast=!fast;render()}
  else if(action==='feed-filter'){feedRare=button.dataset.value==='rare';document.querySelectorAll('[data-action="feed-filter"]').forEach(tab=>tab.setAttribute('aria-pressed',String(tab===button)));region('feed').innerHTML=feed()}
  else if(action==='claim'&&!game.bonus){game.balance+=100000;game.bonus=true;save();render()}
  else if(action==='sell')sellOwned(button.dataset.uid??addedResult?.uid)
  else if(action==='use-drop'&&addedResult){selected=[addedResult.uid];chosenTarget=null;activeCase='';currentView='upgrade';addBalance=0;syncUrl();render()}
  else if(action==='use-owned'){selected=[button.dataset.uid];chosenTarget=null;activeCase='';currentView='upgrade';addBalance=0;syncUrl();render()}
  else if(action==='toggle-skin'){
    selected=selected.includes(button.dataset.uid)?selected.filter(uid=>uid!==button.dataset.uid):[...selected,button.dataset.uid]
    addedResult=null;quickChoice='';if(chosenTarget&&chosenTarget.value<=game.items.filter(item=>selected.includes(item.uid)).reduce((sum,item)=>sum+item.skin.value,0)+addBalance)chosenTarget=null
    render()
  }
  else if(action==='select-target'){chosenTarget=targets.find(item=>item.id===button.dataset.id)??null;addedResult=null;quickChoice='';render()}
  else if(action==='sort-inventory'){reverseInventory=!reverseInventory;render()}
  else if(action==='sort-targets'){reverseMarket=!reverseMarket;render()}
  else if(action==='target-search'){targetSearchOpen=!targetSearchOpen;targetSearch='';render();$('[data-input="target-search"]')?.focus()}
  else if(action==='quick-clear'){chosenTarget=null;quickChoice='';addedResult=null;render()}
  else if(action==='quick')findUpgrade(button.dataset.value)
  else if(action==='upgrade')upgradeItem()
}

function handleInput(event) {
  const targetInput=event.target
  if(!targetInput.matches('[data-input]'))return
  const kind=targetInput.dataset.input
  if(kind==='case-search'){searchText=targetInput.value;const cursor=targetInput.selectionStart;render();const replacement=$('[data-input="case-search"]');replacement?.focus();replacement?.setSelectionRange(cursor,cursor)}
  else if(kind==='add-balance'){addBalance=Number(targetInput.value);addedResult=null;quickChoice='';if(chosenTarget&&chosenTarget.value<=addBalance+game.items.filter(item=>selected.includes(item.uid)).reduce((sum,item)=>sum+item.skin.value,0))chosenTarget=null;render()}
  else if(kind==='min'){minValue=targetInput.value;render()}
  else if(kind==='max'){maxValue=targetInput.value;render()}
  else if(kind==='target-search'){targetSearch=targetInput.value;const cursor=targetInput.selectionStart;render();const replacement=$('[data-input="target-search"]');replacement?.focus();replacement?.setSelectionRange(cursor,cursor)}
}

function handleSubmit(event) {
  const form=event.target.closest('[data-form="create"]')
  if(!form)return
  event.preventDefault()
  const values=new FormData(form)
  const name=String(values.get('name')??'').trim();const price=Math.round(Number(values.get('price'))*100)/100
  if(!name||!Number.isFinite(price)||price<1||price>49900)return
  game.customCases.unshift({id:`custom-${crypto.randomUUID()}`,name,price,base:String(values.get('base'))})
  game.modal=null;creatorFilter=true;searchText='';save();syncUrl();render()
}

function clickOutside(event) { if(event.target===region('modal')){game.modal=null;updateModal()} }
function keyboard(event) { if(event.key==='Escape'){if(game.modal){game.modal=null;updateModal()}else if(activeCase)navigate('cases');else $('.cr-notification').hidden=true} }

function wire() {
  const navigation=$('.cr-nav')
  navigation.innerHTML=nav.map(tab=>`<button data-view="${esc(tab.id)}" data-action="navigate">${esc(tab.name)}</button>`).join('')
  document.addEventListener('click',handleClick)
  document.addEventListener('input',handleInput)
  document.addEventListener('submit',handleSubmit)
  document.addEventListener('click',clickOutside)
  document.addEventListener('keydown',keyboard)
  $('.cr-logo').addEventListener('click',event=>{event.preventDefault();navigate('cases')})
  updateHeader();render()
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wire,{once:true})
else wire()
