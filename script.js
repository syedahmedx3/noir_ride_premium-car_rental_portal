const rentalData = {
  vehicles: {
    "urban-titan-x": {
      dailySAR: 1462,
      blockedDates: ["2026-04-25", "2026-04-26"],
    },
    "solaris-spyder": {
      dailySAR: 1950,
      blockedDates: ["2026-04-22", "2026-04-23"],
    },
    "velaris-s": { dailySAR: 1180, blockedDates: ["2026-04-28"] },
    "ionic-terra-gt": {
      dailySAR: 1325,
      blockedDates: ["2026-04-24", "2026-04-25"],
    },
  },
  insurance: {
    standard: 0,
    premium: 180,
    platinum: 320,
  },
  seasonal: {
    standard: 1,
    peak: 1.18,
    event: 1.35,
  },
  currencyRate: {
    SAR: 1,
    USD: 0.27,
  },
};

const bookingForm = document.querySelector("#booking-form");
const classSelect = document.querySelector("#vehicle-class");
const pickupInput = document.querySelector("#pickup-date");
const returnInput = document.querySelector("#return-date");
const insuranceSelect = document.querySelector("#insurance-tier");
const seasonSelect = document.querySelector("#season-tier");
const currencySelect = document.querySelector("#currency-select");
const languageSelect = document.querySelector("#language-select");
const headerLanguageSwitch = document.querySelector("#header-language-switch");
const calendarStatus = document.querySelector("#calendar-status");
const dailyRateEl = document.querySelector("#daily-rate");
const rentalDaysEl = document.querySelector("#rental-days");
const addonsTotalEl = document.querySelector("#addons-total");
const grandTotalEl = document.querySelector("#grand-total");
const addonInputs = Array.from(document.querySelectorAll("[data-addon-price]"));
const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
const fleetCards = Array.from(document.querySelectorAll(".fleet-grid-card"));
const uploadInput = document.querySelector("#doc-upload");
const uploadList = document.querySelector("#upload-list");
const signatureCanvas = document.querySelector("#signature-pad");
const clearSignatureBtn = document.querySelector("#clear-signature");
const saveSignatureBtn = document.querySelector("#save-signature");
const signatureStatus = document.querySelector("#signature-status");
const cursor = document.querySelector(".custom-cursor");
const magneticItems = document.querySelectorAll(
  ".magnetic, .fleet-grid-card, .filter-btn",
);

const translations = {
  en: {
    pageTitle: "NoirRide | Premium Car Rental",
    whatsappAria: "Chat with NoirRide concierge on WhatsApp",
    openNavigation: "Open navigation",
    brandHome: "NoirRide home",
    primaryNav: "Primary",
    switchLanguage: "Switch language",
    menu: "MENU",
    whatsapp: "WHATSAPP",
    navFleet: "FLEET",
    navBook: "BOOK",
    navPortal: "PORTAL",
    privateAccess: "PRIVATE ACCESS",
    fleetIndex: "FLEET INDEX",
    priceEngine: "PRICE ENGINE",
    clientPortal: "CLIENT PORTAL",
    apiSync: "API SYNC",
    heroEyebrow: "PREMIUM CAR RENTAL / KSA READY",
    heroTitleLine1: "DRIVE",
    heroTitleLine2: "ARRIVAL",
    heroTitleLine3: "INTO AN ART",
    heroCopy:
      "A luxury rental frontend engineered for elite booking journeys, real-time fleet browsing, premium concierge support, and localization for the GCC.",
    bookVehicle: "BOOK A VEHICLE",
    viewGallery: "VIEW GALLERY",
    flagshipModel: "FLAGSHIP MODEL",
    flagshipSpec: "620 HP / AWD / NIGHT PACKAGE",
    conciergeStatus: "CONCIERGE STATUS",
    live247: "LIVE 24/7",
    paymentStack: "WHATSAPP / APPLE PAY / STC PAY",
    luxuryVehicles: "LUXURY VEHICLES",
    cityDeliveryHubs: "CITY DELIVERY HUBS",
    currenciesRtl: "CURRENCIES + RTL UI",
    syncReady: "SYNC READY ARCHITECTURE",
    engineeringStandard: "ENGINEERING STANDARD",
    modularCinematic: "MODULAR, CINEMATIC, SCALE-READY",
    introCopy:
      "The experience is structured like a high-end booking product, not a flat brochure. Fleet data, pricing logic, availability, uploads, localization, payments, notifications, and backend bridges are separated into focused modules for cleaner scaling.",
    immersiveGallery: "IMMERSIVE GALLERY",
    swipeMachine: "SWIPE THROUGH THE MACHINE",
    gallery01: "01 / EXTERIOR ANGLE",
    gallery01Title: "AGGRESSIVE FRONT PROFILE",
    gallery02: "02 / CABIN FOCUS",
    gallery02Title: "EXECUTIVE NIGHT INTERIOR",
    gallery03: "03 / DELIVERY MOMENT",
    gallery03Title: "STAGED FOR ARRIVAL",
    gallery04: "04 / AERODYNAMICS",
    gallery04Title: "CARBON FIBER WAVE",
    gallery05: "05 / PERFORMANCE",
    gallery06: "06 / NIGHT PACKAGE",
    gallery06Title: "STEALTH NOIR FINISH",
    gallery07: "07 / COCKPIT",
    gallery07Title: "PRECISION INSTRUMENTATION",
    gallery08: "08 / LOGISTICS",
    gallery08Title: "GLOBAL CONCIERGE FLOW",
    gallery09: "09 / THE FINALE",
    gallery09Title: "DEPARTURE IN STYLE",
    prev: "PREV",
    next: "NEXT",
    fleetGrid: "REAL-TIME FLEET GRID",
    filterByClass: "FILTER BY CLASS",
    filterAll: "ALL",
    filterLuxury: "LUXURY",
    filterSports: "SPORTS",
    filterSuvs: "SUVS",
    filterElectric: "ELECTRIC",
    fleetFilters: "Fleet filters",
    fleetLabel1: "SUV / LUXURY",
    fleetLabel2: "SPORT / OPEN TOP",
    fleetLabel3: "LUXURY / ELECTRIC",
    fleetLabel4: "ELECTRIC / SUV",
    availabilityToday: "AVAILABLE TODAY",
    availabilityLimited: "LIMITED",
    availabilityAvailable: "AVAILABLE",
    availabilityBookedWeekend: "BOOKED THIS WEEKEND",
    vehicleUrbanTitan: "URBAN TITAN X",
    vehicleSolaris: "SOLARIS SPYDER",
    vehicleVelaris: "VELARIS S",
    vehicleIonic: "IONIC TERRA GT",
    specHp: "HP",
    specKmh: "KM/H",
    specHybrid: "HYBRID",
    specPowertrain: "POWERTRAIN",
    specDrivetrain: "DRIVETRAIN",
    specEngine: "ENGINE",
    specKmRange: "KM RANGE",
    specBattery: "BATTERY",
    featureMassageSeats: "MASSAGE SEATS",
    featureNightVision: "NIGHT VISION",
    featurePanoramicRoof: "PANORAMIC ROOF",
    featureCarbonAero: "CARBON AERO",
    featureTrackMode: "TRACK MODE",
    featureLaunchControl: "LAUNCH CONTROL",
    featureRearLounge: "REAR LOUNGE",
    featureSilentCabin: "SILENT CABIN",
    featureExecutiveTablets: "EXECUTIVE TABLETS",
    featureFastCharge: "FAST CHARGE",
    featureArDisplay: "AR DISPLAY",
    featureAirSuspension: "AIR SUSPENSION",
    bookingEngine: "BOOKING ENGINE",
    dynamicPricing: "DYNAMIC PRICING + AVAILABILITY",
    bookingCopy:
      "Choose vehicle class, date range, insurance, add-ons, currency, and language direction. The calculator updates instantly and blocks dates already reserved in the demo dataset.",
    vehicleClass: "VEHICLE CLASS",
    pickupDate: "PICKUP DATE",
    returnDate: "RETURN DATE",
    insuranceTier: "INSURANCE TIER",
    insuranceStandard: "STANDARD",
    insurancePremium: "PREMIUM",
    insurancePlatinum: "PLATINUM",
    demandWindow: "DEMAND WINDOW",
    seasonStandard: "STANDARD",
    seasonPeak: "PEAK",
    seasonEvent: "EVENT",
    premiumAddons: "PREMIUM ADD-ONS",
    addonAirport: "AIRPORT MEET & GREET",
    addonChauffeur: "PRIVATE CHAUFFEUR",
    addonChildSeat: "CHILD SEAT",
    currency: "CURRENCY",
    interface: "INTERFACE",
    langEn: "ENGLISH / LTR",
    langAr: "ARABIC / RTL",
    dailyRate: "DAILY RATE",
    rentalDays: "RENTAL DAYS",
    addons: "ADD-ONS",
    estimatedTotal: "ESTIMATED TOTAL",
    confirmBooking: "CONFIRM BOOKING REQUEST",
    securePortal: "HEADLESS SECURE PORTAL",
    manageBookings: "MANAGE BOOKINGS LIKE A PRIVATE CLIENT APP",
    activeBooking: "ACTIVE BOOKING",
    portalPickup: "PICKUP: RIYADH / 21 APR / 18:00",
    portalReturn: "RETURN: 24 APR / 18:00",
    portalStatus: "STATUS: DOCUMENTS VERIFIED",
    rentalHistory: "RENTAL HISTORY",
    lastReservations: "LAST 3 RESERVATIONS",
    historyItem1: "SOLARIS SPYDER / DOHA / COMPLETED",
    historyItem2: "VELARIS S / RIYADH / COMPLETED",
    historyItem3: "IONIC TERRA GT / JEDDAH / COMPLETED",
    notifications: "NOTIFICATIONS",
    emailSms: "EMAIL + SMS FLOW",
    notificationItem1: "BOOKING CONFIRMATION READY",
    notificationItem2: "PAYMENT RECEIPT READY",
    notificationItem3: "RETURN REMINDER READY",
    documentManagement: "DOCUMENT MANAGEMENT",
    secureVerification: "SECURE VERIFICATION ZONE",
    docsCopy:
      "Upload driver's license, passport or iqama, and payment verification documents before delivery. This demo keeps files on the client side and previews selected names for integration.",
    dropFiles: "DROP FILES OR CLICK TO UPLOAD",
    uploadDocs: "DRIVER'S LICENSE / PASSPORT / IQAMA / CREDIT CARD",
    digitalSignature: "DIGITAL SIGNATURE",
    signBeforeDelivery: "SIGN BEFORE DELIVERY",
    signatureCopy:
      "The agreement module includes a client-side signature canvas to demonstrate electronic acceptance before vehicle handover.",
    clear: "CLEAR",
    saveSignature: "SAVE SIGNATURE",
    liveConcierge: "LIVE CONCIERGE",
    floatingWhatsapp: "FLOATING WHATSAPP ACCESS",
    liveConciergeCopy:
      "High-priority support stays visible throughout the experience for booking updates, delivery changes, and urgent requests.",
    paymentVault: "PAYMENT VAULT",
    appleStcReady: "APPLE PAY + STC PAY READY",
    paymentVaultCopy:
      "Payment cards are structured as integration slots for secure deposit workflows once your processor is connected.",
    backendBridge: "BACKEND BRIDGE",
    odooSync: "ODOO / API / MAINTENANCE SYNC",
    backendBridgeCopy:
      "Fleet attendance, maintenance windows, and financial logs are represented as clean frontend hooks for live backend binding.",
    statusPrompt: "SELECT DATES TO CHECK AVAILABILITY.",
    statusAvailable: "DATES CLEAR. VEHICLE AVAILABLE FOR REQUEST.",
    statusBlocked: "SELECTED WINDOW CONFLICTS WITH AN EXISTING BOOKING.",
    requestSent: "BOOKING REQUEST SENT",
    requestDefault: "CONFIRM BOOKING REQUEST",
    signatureSaved: "SIGNATURE SAVED LOCALLY FOR DEMO REVIEW.",
    signatureEmpty: "NO SIGNATURE SAVED YET.",
    signatureMissing: "PLEASE DRAW A SIGNATURE FIRST.",
  },
  ar: {
    pageTitle: "NoirRide | تأجير سيارات فاخر",
    whatsappAria:
      "\u0627\u0644\u062f\u0631\u062f\u0634\u0629 \u0645\u0639 \u0643\u0648\u0646\u0633\u064a\u064a\u0631\u062c NoirRide \u0639\u0628\u0631 \u0648\u0627\u062a\u0633\u0627\u0628",
    openNavigation: "\u0641\u062a\u062d \u0627\u0644\u062a\u0646\u0642\u0644",
    brandHome: "\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629 NoirRide",
    primaryNav:
      "\u0627\u0644\u062a\u0646\u0642\u0644 \u0627\u0644\u0631\u0626\u064a\u0633\u064a",
    switchLanguage:
      "\u062a\u0628\u062f\u064a\u0644 \u0627\u0644\u0644\u063a\u0629",
    menu: "\u0627\u0644\u0642\u0627\u0626\u0645\u0629",
    whatsapp: "\u0648\u0627\u062a\u0633\u0627\u0628",
    navFleet: "\u0627\u0644\u0623\u0633\u0637\u0648\u0644",
    navBook: "\u0627\u062d\u062c\u0632",
    navPortal: "\u0627\u0644\u0628\u0648\u0627\u0628\u0629",
    privateAccess: "\u0648\u0635\u0648\u0644 \u062e\u0627\u0635",
    fleetIndex:
      "\u0645\u0624\u0634\u0631 \u0627\u0644\u0623\u0633\u0637\u0648\u0644",
    priceEngine:
      "\u0645\u062d\u0631\u0643 \u0627\u0644\u0623\u0633\u0639\u0627\u0631",
    clientPortal:
      "\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0639\u0645\u064a\u0644",
    apiSync: "\u0645\u0632\u0627\u0645\u0646\u0629 API",
    heroEyebrow:
      "\u062a\u0623\u062c\u064a\u0631 \u0633\u064a\u0627\u0631\u0627\u062a \u0641\u0627\u062e\u0631 / \u062c\u0627\u0647\u0632 \u0644\u0644\u0633\u0639\u0648\u062f\u064a\u0629",
    heroTitleLine1: "\u0642\u062f",
    heroTitleLine2: "\u0627\u0644\u0648\u0635\u0648\u0644",
    heroTitleLine3: "\u0643\u0641\u0646",
    heroCopy:
      "\u0648\u0627\u062c\u0647\u0629 \u062a\u0623\u062c\u064a\u0631 \u0641\u0627\u062e\u0631\u0629 \u0645\u0635\u0645\u0645\u0629 \u0644\u0631\u062d\u0644\u0627\u062a \u062d\u062c\u0632 \u0631\u0627\u0642\u064a\u0629 \u0648\u0627\u0633\u062a\u0639\u0631\u0627\u0636 \u0627\u0644\u0623\u0633\u0637\u0648\u0644 \u0648\u062f\u0639\u0645 \u0643\u0648\u0646\u0633\u064a\u064a\u0631\u062c \u0645\u062a\u0648\u0627\u0635\u0644 \u0648\u062a\u0648\u0637\u064a\u0646 \u0644\u0644\u062e\u0644\u064a\u062c.",
    bookVehicle: "\u0627\u062d\u062c\u0632 \u0633\u064a\u0627\u0631\u0629",
    viewGallery: "\u0639\u0631\u0636 \u0627\u0644\u0645\u0639\u0631\u0636",
    flagshipModel:
      "\u0627\u0644\u0637\u0631\u0627\u0632 \u0627\u0644\u0631\u0626\u064a\u0633\u064a",
    flagshipSpec:
      "620 HP / AWD / \u0628\u0627\u0642\u0629 \u0644\u064a\u0644\u064a\u0629",
    conciergeStatus:
      "\u062d\u0627\u0644\u0629 \u0627\u0644\u0643\u0648\u0646\u0633\u064a\u064a\u0631\u062c",
    live247: "\u0645\u062a\u0627\u062d 24/7",
    paymentStack: "\u0648\u0627\u062a\u0633\u0627\u0628 / APPLE PAY / STC PAY",
    luxuryVehicles:
      "\u0633\u064a\u0627\u0631\u0627\u062a \u0641\u0627\u062e\u0631\u0629",
    cityDeliveryHubs:
      "\u0645\u0631\u0627\u0643\u0632 \u062a\u0633\u0644\u064a\u0645 \u0645\u062f\u064a\u0646\u064a\u0629",
    currenciesRtl:
      "\u0639\u0645\u0644\u0627\u062a + \u0648\u0627\u062c\u0647\u0629 RTL",
    syncReady:
      "\u0628\u0646\u064a\u0629 \u062c\u0627\u0647\u0632\u0629 \u0644\u0644\u0645\u0632\u0627\u0645\u0646\u0629",
    engineeringStandard:
      "\u0645\u0639\u064a\u0627\u0631 \u0647\u0646\u062f\u0633\u064a",
    modularCinematic:
      "\u0645\u0639\u0645\u0627\u0631\u064a\u0629 \u0645\u0648\u062f\u064a\u0648\u0644\u064a\u0629 \u0633\u064a\u0646\u0645\u0627\u0626\u064a\u0629 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u062a\u0648\u0633\u0639",
    introCopy:
      "\u062a\u0645 \u0628\u0646\u0627\u0621 \u0627\u0644\u062a\u062c\u0631\u0628\u0629 \u0643\u0645\u0646\u062a\u062c \u062d\u062c\u0632 \u0631\u0627\u0642 \u0648\u0644\u064a\u0633 \u0643\u0635\u0641\u062d\u0629 \u062a\u0639\u0631\u064a\u0641\u064a\u0629 \u0645\u0633\u0637\u062d\u0629. \u062a\u0645 \u0641\u0635\u0644 \u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0623\u0633\u0637\u0648\u0644 \u0648\u0627\u0644\u062a\u0633\u0639\u064a\u0631 \u0648\u0627\u0644\u062a\u0648\u0641\u0631 \u0648\u0627\u0644\u0631\u0641\u0639 \u0648\u0627\u0644\u062a\u0648\u0637\u064a\u0646 \u0648\u0627\u0644\u062f\u0641\u0639 \u0648\u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062a \u0648\u0631\u0648\u0627\u0628\u0637 \u0627\u0644\u062e\u0644\u0641\u064a\u0629 \u0641\u064a \u0648\u062d\u062f\u0627\u062a \u0648\u0627\u0636\u062d\u0629 \u0644\u062a\u0648\u0633\u0639 \u0623\u0646\u0638\u0641.",
    immersiveGallery: "\u0645\u0639\u0631\u0636 \u063a\u0627\u0645\u0631",
    swipeMachine:
      "\u0627\u0633\u062d\u0628 \u0639\u0628\u0631 \u0627\u0644\u0622\u0644\u0629",
    gallery01:
      "01 / \u0632\u0627\u0648\u064a\u0629 \u062e\u0627\u0631\u062c\u064a\u0629",
    gallery01Title:
      "\u0648\u0627\u062c\u0647\u0629 \u0623\u0645\u0627\u0645\u064a\u0629 \u062c\u0631\u064a\u0626\u0629",
    gallery02:
      "02 / \u062a\u0631\u0643\u064a\u0632 \u0627\u0644\u0645\u0642\u0635\u0648\u0631\u0629",
    gallery02Title:
      "\u0645\u0642\u0635\u0648\u0631\u0629 \u0644\u064a\u0644\u064a\u0629 \u062a\u0646\u0641\u064a\u0630\u064a\u0629",
    gallery03:
      "03 / \u0644\u062d\u0638\u0629 \u0627\u0644\u062a\u0633\u0644\u064a\u0645",
    gallery03Title:
      "\u0645\u0647\u064a\u0623\u0629 \u0644\u0644\u0648\u0635\u0648\u0644",
    gallery04:
      "04 / \u0627\u0644\u062f\u064a\u0646\u0627\u0645\u064a\u0643\u0627 \u0627\u0644\u0647\u0648\u0627\u0626\u064a\u0629",
    gallery04Title:
      "\u0645\u0648\u062c\u0629 \u0623\u0644\u064a\u0627\u0641 \u0627\u0644\u0643\u0631\u0628\u0648\u0646",
    gallery05: "05 / \u0627\u0644\u0623\u062f\u0627\u0621",
    gallery05Title:
      "\u0647\u0646\u062f\u0633\u0629 \u0627\u0644\u0642\u0648\u0629 \u0627\u0644\u062e\u0627\u0645",
    gallery06:
      "06 / \u0627\u0644\u0628\u0627\u0642\u0629 \u0627\u0644\u0644\u064a\u0644\u064a\u0629",
    gallery06Title:
      "\u0644\u0645\u0633\u0627\u062a \u0627\u0644\u0646\u0648\u0627\u0631 \u0627\u0644\u062e\u0641\u064a\u0629",
    gallery07:
      "07 / \u0645\u0642\u0635\u0648\u0631\u0629 \u0627\u0644\u0642\u064a\u0627\u062f\u0629",
    gallery07Title:
      "\u0623\u062c\u0647\u0632\u0629 \u0642\u064a\u0627\u0633 \u062f\u0642\u064a\u0642\u0629",
    gallery08:
      "08 / \u0627\u0644\u0644\u0648\u062c\u0633\u062a\u064a\u0627\u062a",
    gallery08Title:
      "\u062a\u062f\u0641\u0642 \u0627\u0644\u0643\u0648\u0646\u0633\u064a\u064a\u0631\u062c \u0627\u0644\u0639\u0627\u0644\u0645\u064a",
    gallery09: "09 / \u0627\u0644\u062e\u062a\u0627\u0645",
    gallery09Title:
      "\u0645\u063a\u0627\u062f\u0631\u0629 \u0628\u0623\u0646\u0627\u0642\u0629",
    prev: "\u0627\u0644\u0633\u0627\u0628\u0642",
    next: "\u0627\u0644\u062a\u0627\u0644\u064a",
    fleetGrid:
      "\u0634\u0628\u0643\u0629 \u0623\u0633\u0637\u0648\u0644 \u0641\u064a \u0627\u0644\u0648\u0642\u062a \u0627\u0644\u062d\u0642\u064a\u0642\u064a",
    filterByClass:
      "\u062a\u0635\u0641\u064a\u0629 \u062d\u0633\u0628 \u0627\u0644\u0641\u0626\u0629",
    filterAll: "\u0627\u0644\u0643\u0644",
    filterLuxury: "\u0641\u0627\u062e\u0631",
    filterSports: "\u0631\u064a\u0627\u0636\u064a",
    filterSuvs: "\u062f\u0641\u0639 \u0631\u0628\u0627\u0639\u064a",
    filterElectric: "\u0643\u0647\u0631\u0628\u0627\u0626\u064a",
    fleetFilters:
      "\u0641\u0644\u0627\u062a\u0631 \u0627\u0644\u0623\u0633\u0637\u0648\u0644",
    fleetLabel1:
      "\u062f\u0641\u0639 \u0631\u0628\u0627\u0639\u064a / \u0641\u0627\u062e\u0631",
    fleetLabel2:
      "\u0631\u064a\u0627\u0636\u064a / \u0645\u0643\u0634\u0648\u0641",
    fleetLabel3:
      "\u0641\u0627\u062e\u0631 / \u0643\u0647\u0631\u0628\u0627\u0626\u064a",
    fleetLabel4:
      "\u0643\u0647\u0631\u0628\u0627\u0626\u064a / \u062f\u0641\u0639 \u0631\u0628\u0627\u0639\u064a",
    availabilityToday:
      "\u0645\u062a\u0627\u062d \u0627\u0644\u064a\u0648\u0645",
    availabilityLimited: "\u0645\u062d\u062f\u0648\u062f",
    availabilityAvailable: "\u0645\u062a\u0627\u062d",
    availabilityBookedWeekend:
      "\u0645\u062d\u062c\u0648\u0632 \u0647\u0630\u0627 \u0639\u0637\u0644\u0629 \u0627\u0644\u0623\u0633\u0628\u0648\u0639",
    vehicleUrbanTitan:
      "\u0627\u0648\u0631\u0628\u0627\u0646 \u062a\u0627\u064a\u062a\u0627\u0646 X",
    vehicleSolaris:
      "\u0633\u0648\u0644\u0627\u0631\u064a\u0633 \u0633\u0628\u0627\u064a\u062f\u0631",
    vehicleVelaris: "\u0641\u064a\u0644\u0627\u0631\u064a\u0633 S",
    vehicleIonic: "\u0622\u064a\u0648\u0646\u0643 \u062a\u064a\u0631\u0627 GT",
    specHp: "\u062d\u0635\u0627\u0646",
    specKmh: "\u0643\u0645/\u0633",
    specHybrid: "\u0647\u062c\u064a\u0646",
    specPowertrain:
      "\u0646\u0638\u0627\u0645 \u0627\u0644\u062d\u0631\u0643\u0629",
    specDrivetrain: "\u0646\u0638\u0627\u0645 \u0627\u0644\u062f\u0641\u0639",
    specEngine: "\u0627\u0644\u0645\u062d\u0631\u0643",
    specKmRange: "\u0645\u062f\u0649 \u0643\u0645",
    specBattery: "\u0627\u0644\u0628\u0637\u0627\u0631\u064a\u0629",
    featureMassageSeats:
      "\u0645\u0642\u0627\u0639\u062f \u0645\u0633\u0627\u062c",
    featureNightVision:
      "\u0631\u0624\u064a\u0629 \u0644\u064a\u0644\u064a\u0629",
    featurePanoramicRoof:
      "\u0633\u0642\u0641 \u0628\u0627\u0646\u0648\u0631\u0627\u0645\u064a",
    featureCarbonAero:
      "\u062f\u064a\u0646\u0627\u0645\u064a\u0643\u064a\u0627 \u0643\u0631\u0628\u0648\u0646\u064a\u0629",
    featureTrackMode: "\u0648\u0636\u0639 \u0627\u0644\u062d\u0644\u0628\u0629",
    featureLaunchControl:
      "\u062a\u062d\u0643\u0645 \u0627\u0644\u0627\u0646\u0637\u0644\u0627\u0642",
    featureRearLounge:
      "\u0635\u0627\u0644\u0648\u0646 \u062e\u0644\u0641\u064a",
    featureSilentCabin:
      "\u0645\u0642\u0635\u0648\u0631\u0629 \u0647\u0627\u062f\u0626\u0629",
    featureExecutiveTablets:
      "\u0623\u062c\u0647\u0632\u0629 \u062a\u0646\u0641\u064a\u0630\u064a\u0629",
    featureFastCharge: "\u0634\u062d\u0646 \u0633\u0631\u064a\u0639",
    featureArDisplay: "\u0639\u0631\u0636 \u0645\u0639\u0632\u0632",
    featureAirSuspension:
      "\u062a\u0639\u0644\u064a\u0642 \u0647\u0648\u0627\u0626\u064a",
    bookingEngine: "\u0645\u062d\u0631\u0643 \u0627\u0644\u062d\u062c\u0632",
    dynamicPricing:
      "\u062a\u0633\u0639\u064a\u0631 \u062f\u064a\u0646\u0627\u0645\u064a\u0643\u064a + \u062a\u0648\u0641\u0631",
    bookingCopy:
      "\u0627\u062e\u062a\u0631 \u0641\u0626\u0629 \u0627\u0644\u0633\u064a\u0627\u0631\u0629 \u0648\u0627\u0644\u062a\u0648\u0627\u0631\u064a\u062e \u0648\u0627\u0644\u062a\u0623\u0645\u064a\u0646 \u0648\u0627\u0644\u0625\u0636\u0627\u0641\u0627\u062a \u0648\u0627\u0644\u0639\u0645\u0644\u0629 \u0648\u0627\u062a\u062c\u0627\u0647 \u0627\u0644\u0648\u0627\u062c\u0647\u0629. \u064a\u062a\u062d\u062f\u062b \u0627\u0644\u062d\u0627\u0633\u0628 \u0641\u0648\u0631\u0627\u064b \u0648\u064a\u0645\u0646\u0639 \u0627\u0644\u062a\u0648\u0627\u0631\u064a\u062e \u0627\u0644\u0645\u062d\u062c\u0648\u0632\u0629 \u0641\u064a \u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0639\u0631\u0636.",
    vehicleClass:
      "\u0641\u0626\u0629 \u0627\u0644\u0633\u064a\u0627\u0631\u0629",
    pickupDate:
      "\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0627\u0633\u062a\u0644\u0627\u0645",
    returnDate:
      "\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0625\u0639\u0627\u062f\u0629",
    insuranceTier:
      "\u0628\u0627\u0642\u0629 \u0627\u0644\u062a\u0623\u0645\u064a\u0646",
    insuranceStandard: "\u0627\u0633\u0627\u0633\u064a",
    insurancePremium: "\u0645\u0645\u064a\u0632",
    insurancePlatinum: "\u0628\u0644\u0627\u062a\u064a\u0646\u064a",
    demandWindow: "\u0645\u0648\u0633\u0645 \u0627\u0644\u0637\u0644\u0628",
    seasonStandard: "\u0627\u0639\u062a\u064a\u0627\u062f\u064a",
    seasonPeak: "\u0630\u0631\u0648\u0629",
    seasonEvent:
      "\u0645\u0648\u0633\u0645 \u0641\u0639\u0627\u0644\u064a\u0627\u062a",
    premiumAddons:
      "\u0625\u0636\u0627\u0641\u0627\u062a \u0641\u0627\u062e\u0631\u0629",
    addonAirport:
      "\u0627\u0633\u062a\u0642\u0628\u0627\u0644 \u0627\u0644\u0645\u0637\u0627\u0631",
    addonChauffeur: "\u0633\u0627\u0626\u0642 \u062e\u0627\u0635",
    addonChildSeat: "\u0645\u0642\u0639\u062f \u0637\u0641\u0644",
    currency: "\u0627\u0644\u0639\u0645\u0644\u0629",
    interface: "\u0627\u0644\u0648\u0627\u062c\u0647\u0629",
    langEn: "\u0625\u0646\u062c\u0644\u064a\u0632\u064a / LTR",
    langAr: "\u0639\u0631\u0628\u064a / RTL",
    dailyRate:
      "\u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u064a\u0648\u0645\u064a",
    rentalDays:
      "\u0623\u064a\u0627\u0645 \u0627\u0644\u0625\u064a\u062c\u0627\u0631",
    addons: "\u0627\u0644\u0625\u0636\u0627\u0641\u0627\u062a",
    estimatedTotal:
      "\u0627\u0644\u0625\u062c\u0645\u0627\u0644\u064a \u0627\u0644\u062a\u0642\u062f\u064a\u0631\u064a",
    confirmBooking:
      "\u062a\u0623\u0643\u064a\u062f \u0637\u0644\u0628 \u0627\u0644\u062d\u062c\u0632",
    securePortal:
      "\u0628\u0648\u0627\u0628\u0629 \u0622\u0645\u0646\u0629 \u0631\u0623\u0633\u064a\u0629",
    manageBookings:
      "\u0623\u062f\u0631 \u062d\u062c\u0648\u0632\u0627\u062a\u0643 \u0643\u0623\u0646\u0647\u0627 \u062a\u0637\u0628\u064a\u0642 \u0639\u0645\u0644\u0627\u0621 \u062e\u0627\u0635",
    activeBooking:
      "\u0627\u0644\u062d\u062c\u0632 \u0627\u0644\u0646\u0634\u0637",
    portalPickup:
      "\u0627\u0644\u0627\u0633\u062a\u0644\u0627\u0645: \u0627\u0644\u0631\u064a\u0627\u0636 / 21 \u0623\u0628\u0631\u064a\u0644 / 18:00",
    portalReturn:
      "\u0627\u0644\u0625\u0639\u0627\u062f\u0629: 24 \u0623\u0628\u0631\u064a\u0644 / 18:00",
    portalStatus:
      "\u0627\u0644\u062d\u0627\u0644\u0629: \u062a\u0645 \u062a\u062d\u0642\u0642 \u0627\u0644\u0645\u0633\u062a\u0646\u062f\u0627\u062a",
    rentalHistory:
      "\u0633\u062c\u0644 \u0627\u0644\u0625\u064a\u062c\u0627\u0631",
    lastReservations:
      "\u0622\u062e\u0631 3 \u062d\u062c\u0648\u0632\u0627\u062a",
    historyItem1:
      "\u0633\u0648\u0644\u0627\u0631\u064a\u0633 \u0633\u0628\u0627\u064a\u062f\u0631 / \u0627\u0644\u062f\u0648\u062d\u0629 / \u0645\u0643\u062a\u0645\u0644",
    historyItem2:
      "\u0641\u064a\u0644\u0627\u0631\u064a\u0633 S / \u0627\u0644\u0631\u064a\u0627\u0636 / \u0645\u0643\u062a\u0645\u0644",
    historyItem3:
      "\u0622\u064a\u0648\u0646\u0643 \u062a\u064a\u0631\u0627 GT / \u062c\u062f\u0629 / \u0645\u0643\u062a\u0645\u0644",
    notifications: "\u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062a",
    emailSms:
      "\u062a\u062f\u0641\u0642 \u0627\u0644\u0628\u0631\u064a\u062f + \u0627\u0644\u0631\u0633\u0627\u0626\u0644",
    notificationItem1:
      "\u062a\u0623\u0643\u064a\u062f \u0627\u0644\u062d\u062c\u0632 \u062c\u0627\u0647\u0632",
    notificationItem2:
      "\u0625\u064a\u0635\u0627\u0644 \u0627\u0644\u062f\u0641\u0639 \u062c\u0627\u0647\u0632",
    notificationItem3:
      "\u062a\u0630\u0643\u064a\u0631 \u0627\u0644\u0625\u0639\u0627\u062f\u0629 \u062c\u0627\u0647\u0632",
    documentManagement:
      "\u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u062a\u0646\u062f\u0627\u062a",
    secureVerification:
      "\u0645\u0646\u0637\u0642\u0629 \u062a\u062d\u0642\u0642 \u0622\u0645\u0646\u0629",
    docsCopy:
      "\u0627\u0631\u0641\u0639 \u0631\u062e\u0635\u0629 \u0627\u0644\u0642\u064a\u0627\u062f\u0629 \u0648\u062c\u0648\u0627\u0632 \u0627\u0644\u0633\u0641\u0631 \u0623\u0648 \u0627\u0644\u0625\u0642\u0627\u0645\u0629 \u0648\u0645\u0633\u062a\u0646\u062f\u0627\u062a \u0627\u0644\u062f\u0641\u0639 \u0642\u0628\u0644 \u0627\u0644\u062a\u0633\u0644\u064a\u0645. \u064a\u062d\u062a\u0641\u0638 \u0647\u0630\u0627 \u0627\u0644\u0639\u0631\u0636 \u0628\u0627\u0644\u0645\u0644\u0641\u0627\u062a \u0645\u062d\u0644\u064a\u0627\u064b \u0648\u064a\u0639\u0631\u0636 \u0623\u0633\u0645\u0627\u0621\u0647\u0627 \u062c\u0627\u0647\u0632\u0629 \u0644\u0644\u0631\u0628\u0637.",
    dropFiles:
      "\u0623\u0633\u0642\u0637 \u0627\u0644\u0645\u0644\u0641\u0627\u062a \u0623\u0648 \u0627\u0636\u063a\u0637 \u0644\u0644\u0631\u0641\u0639",
    uploadDocs:
      "\u0631\u062e\u0635\u0629 \u0642\u064a\u0627\u062f\u0629 / \u062c\u0648\u0627\u0632 \u0633\u0641\u0631 / \u0625\u0642\u0627\u0645\u0629 / \u0628\u0637\u0627\u0642\u0629 \u062f\u0641\u0639",
    digitalSignature: "\u062a\u0648\u0642\u064a\u0639 \u0631\u0642\u0645\u064a",
    signBeforeDelivery:
      "\u0648\u0642\u0639 \u0642\u0628\u0644 \u0627\u0644\u062a\u0633\u0644\u064a\u0645",
    signatureCopy:
      "\u062a\u062d\u062a\u0648\u064a \u0648\u062d\u062f\u0629 \u0627\u0644\u0639\u0642\u062f \u0639\u0644\u0649 \u0644\u0648\u062d\u0629 \u062a\u0648\u0642\u064a\u0639 \u0644\u0644\u0639\u0631\u0636 \u0627\u0644\u062a\u062c\u0631\u064a\u0628\u064a \u0642\u0628\u0644 \u0627\u0644\u062a\u0633\u0644\u064a\u0645.",
    clear: "\u0645\u0633\u062d",
    saveSignature:
      "\u062d\u0641\u0638 \u0627\u0644\u062a\u0648\u0642\u064a\u0639",
    liveConcierge:
      "\u0643\u0648\u0646\u0633\u064a\u064a\u0631\u062c \u0645\u0628\u0627\u0634\u0631",
    floatingWhatsapp:
      "\u0648\u0635\u0648\u0644 \u0648\u0627\u062a\u0633\u0627\u0628 \u0639\u0627\u0626\u0645",
    liveConciergeCopy:
      "\u064a\u0628\u0642\u0649 \u0627\u0644\u062f\u0639\u0645 \u0639\u0627\u0644\u064a \u0627\u0644\u0623\u0648\u0644\u0648\u064a\u0629 \u0645\u0631\u0626\u064a\u0627\u064b \u0637\u0648\u0627\u0644 \u0627\u0644\u062a\u062c\u0631\u0628\u0629 \u0644\u062a\u0639\u062f\u064a\u0644\u0627\u062a \u0627\u0644\u062d\u062c\u0632 \u0648\u0627\u0644\u062a\u0633\u0644\u064a\u0645 \u0648\u0627\u0644\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0639\u0627\u062c\u0644\u0629.",
    paymentVault: "\u062e\u0632\u0646\u0629 \u0627\u0644\u062f\u0641\u0639",
    appleStcReady: "APPLE PAY + STC PAY \u062c\u0627\u0647\u0632",
    paymentVaultCopy:
      "\u062a\u0645 \u0628\u0646\u0627\u0621 \u0628\u0637\u0627\u0642\u0627\u062a \u0627\u0644\u062f\u0641\u0639 \u0643\u0646\u0642\u0627\u0637 \u0631\u0628\u0637 \u0644\u0639\u0645\u0644\u064a\u0627\u062a \u0627\u0644\u0639\u0631\u0628\u0648\u0646 \u0627\u0644\u0622\u0645\u0646\u0629 \u0639\u0646\u062f \u0631\u0628\u0637 \u0645\u0632\u0648\u062f \u0627\u0644\u062f\u0641\u0639.",
    backendBridge:
      "\u062c\u0633\u0631 \u0627\u0644\u062e\u0644\u0641\u064a\u0629",
    odooSync:
      "ODOO / API / \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0635\u064a\u0627\u0646\u0629",
    backendBridgeCopy:
      "\u062a\u0645 \u062a\u0645\u062b\u064a\u0644 \u062d\u0636\u0648\u0631 \u0627\u0644\u0623\u0633\u0637\u0648\u0644 \u0648\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0635\u064a\u0627\u0646\u0629 \u0648\u0633\u062c\u0644\u0627\u062a \u0627\u0644\u0645\u0627\u0644 \u0643\u0631\u0648\u0627\u0628\u0637 \u0648\u0627\u0636\u062d\u0629 \u0644\u0644\u0631\u0628\u0637 \u0627\u0644\u062d\u064a.",
    statusPrompt:
      "\u0627\u062e\u062a\u0631 \u0627\u0644\u062a\u0648\u0627\u0631\u064a\u062e \u0644\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u062a\u0648\u0641\u0631.",
    statusAvailable:
      "\u0627\u0644\u062a\u0648\u0627\u0631\u064a\u062e \u0645\u062a\u0627\u062d\u0629. \u064a\u0645\u0643\u0646 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062d\u062c\u0632.",
    statusBlocked:
      "\u0627\u0644\u0641\u062a\u0631\u0629 \u0627\u0644\u0645\u062d\u062f\u062f\u0629 \u062a\u062a\u0639\u0627\u0631\u0636 \u0645\u0639 \u062d\u062c\u0632 \u0645\u0648\u062c\u0648\u062f.",
    requestSent:
      "\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062d\u062c\u0632",
    requestDefault:
      "\u062a\u0623\u0643\u064a\u062f \u0637\u0644\u0628 \u0627\u0644\u062d\u062c\u0632",
    signatureSaved:
      "\u062a\u0645 \u062d\u0641\u0638 \u0627\u0644\u062a\u0648\u0642\u064a\u0639 \u0645\u062d\u0644\u064a\u0627\u064b \u0644\u0644\u0639\u0631\u0636 \u0627\u0644\u062a\u062c\u0631\u064a\u0628\u064a.",
    signatureEmpty:
      "\u0644\u0627 \u064a\u0648\u062c\u062f \u062a\u0648\u0642\u064a\u0639 \u0645\u062d\u0641\u0648\u0638 \u062d\u062a\u0649 \u0627\u0644\u0622\u0646.",
    signatureMissing:
      "\u064a\u0631\u062c\u0649 \u0631\u0633\u0645 \u0627\u0644\u062a\u0648\u0642\u064a\u0639 \u0623\u0648\u0644\u0627\u064b.",
  },
};

const translatedNodes = Array.from(document.querySelectorAll("[data-i18n]"));
const translatedAriaNodes = Array.from(
  document.querySelectorAll("[data-i18n-aria-label]"),
);

const syncLanguageUi = (locale) => {
  languageSelect.value = locale;
  if (headerLanguageSwitch) {
    headerLanguageSwitch.textContent = locale === "ar" ? "EN" : "العربية";
  }
};

const applyTranslations = (locale) => {
  document.title = translations[locale].pageTitle;

  translatedNodes.forEach((node) => {
    const key = node.dataset.i18n;
    if (translations[locale][key]) {
      node.textContent = translations[locale][key];
    }
  });

  translatedAriaNodes.forEach((node) => {
    const key = node.dataset.i18nAriaLabel;
    if (translations[locale][key]) {
      node.setAttribute("aria-label", translations[locale][key]);
    }
  });
};

const formatPrice = (value, currency) => {
  const converted = value * rentalData.currencyRate[currency];
  const rounded =
    currency === "SAR" ? Math.round(converted) : converted.toFixed(0);
  return `${currency} ${rounded}`;
};

const getDays = () => {
  if (!pickupInput.value || !returnInput.value) return 0;
  const start = new Date(pickupInput.value);
  const end = new Date(returnInput.value);
  const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
};

const rangeHasBlockedDates = (vehicleKey) => {
  if (!pickupInput.value || !returnInput.value) return false;

  const blockedDates = rentalData.vehicles[vehicleKey].blockedDates;
  const current = new Date(pickupInput.value);
  const end = new Date(returnInput.value);

  while (current <= end) {
    const iso = current.toISOString().split("T")[0];
    if (blockedDates.includes(iso)) return true;
    current.setDate(current.getDate() + 1);
  }

  return false;
};

const setStatus = (key) => {
  const locale = languageSelect.value;
  calendarStatus.textContent = translations[locale][key];
  calendarStatus.classList.remove("is-clear", "is-blocked");
  if (key === "statusAvailable") calendarStatus.classList.add("is-clear");
  if (key === "statusBlocked") calendarStatus.classList.add("is-blocked");
};

const updatePricing = () => {
  const vehicleKey = classSelect.value;
  const currency = currencySelect.value;
  const days = getDays();
  const baseDaily = rentalData.vehicles[vehicleKey].dailySAR;
  const insuranceCost = rentalData.insurance[insuranceSelect.value];
  const seasonalMultiplier = rentalData.seasonal[seasonSelect.value];
  const addonsSAR = addonInputs
    .filter((input) => input.checked)
    .reduce((sum, input) => sum + Number(input.dataset.addonPrice), 0);

  const effectiveDaily = Math.round(
    baseDaily * seasonalMultiplier + insuranceCost,
  );
  const totalSAR = effectiveDaily * days + addonsSAR;

  dailyRateEl.textContent = formatPrice(effectiveDaily, currency);
  rentalDaysEl.textContent = String(days);
  addonsTotalEl.textContent = formatPrice(addonsSAR, currency);
  grandTotalEl.textContent = formatPrice(totalSAR, currency);

  if (!pickupInput.value || !returnInput.value) {
    setStatus("statusPrompt");
    return;
  }

  if (!days || rangeHasBlockedDates(vehicleKey)) {
    setStatus("statusBlocked");
    return;
  }

  setStatus("statusAvailable");
};

const applyFilter = (filter) => {
  fleetCards.forEach((card) => {
    const matches = filter === "all" || card.dataset.category.includes(filter);
    card.classList.toggle("is-hidden", !matches);
  });
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    applyFilter(button.dataset.filter);
  });
});

[
  classSelect,
  pickupInput,
  returnInput,
  insuranceSelect,
  seasonSelect,
  currencySelect,
  languageSelect,
].forEach((input) => input.addEventListener("input", updatePricing));

addonInputs.forEach((input) => input.addEventListener("change", updatePricing));

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const locale = languageSelect.value;

  if (calendarStatus.classList.contains("is-blocked")) {
    return;
  }

  const button = bookingForm.querySelector("button[type='submit']");
  button.textContent = translations[locale].requestSent;
  button.disabled = true;

  setTimeout(() => {
    button.textContent = translations[locale].requestDefault;
    button.disabled = false;
  }, 2200);
});

languageSelect?.addEventListener("change", () => {
  const isArabic = languageSelect.value === "ar";
  document.body.classList.toggle("is-rtl", isArabic);
  document.documentElement.lang = isArabic ? "ar" : "en";
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
  syncLanguageUi(languageSelect.value);
  applyTranslations(languageSelect.value);
  updatePricing();

  gallerySwiper.destroy(true, true);

  const swiperEl = document.querySelector(".gallery-swiper");
  swiperEl.style.opacity = "1";
  swiperEl.style.transform = "translateY(0px)";

  gallerySwiper = new Swiper(".gallery-swiper", {
    rtl: isArabic,
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 900,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: { el: ".gallery-pagination", clickable: true },
    navigation: { nextEl: ".gallery-next", prevEl: ".gallery-prev" },
    grabCursor: true,
    effect: "slide",
  });
});

headerLanguageSwitch?.addEventListener("click", () => {
  const nextLocale = languageSelect.value === "en" ? "ar" : "en";
  languageSelect.value = nextLocale;
  languageSelect.dispatchEvent(new Event("change"));
});

uploadInput?.addEventListener("change", () => {
  uploadList.innerHTML = "";
  Array.from(uploadInput.files).forEach((file) => {
    const item = document.createElement("li");
    item.textContent = `${file.name} / ${(file.size / 1024).toFixed(0)} KB`;
    uploadList.appendChild(item);
  });
});

if (signatureCanvas) {
  const ctx = signatureCanvas.getContext("2d");
  let drawing = false;
  let hasSignature = false;

  ctx.strokeStyle = "#ffc000";
  ctx.lineWidth = 2.4;
  ctx.lineCap = "round";

  const getPoint = (event) => {
    const rect = signatureCanvas.getBoundingClientRect();
    const isTouch = event.touches && event.touches[0];
    const clientX = isTouch ? event.touches[0].clientX : event.clientX;
    const clientY = isTouch ? event.touches[0].clientY : event.clientY;
    return {
      x: ((clientX - rect.left) / rect.width) * signatureCanvas.width,
      y: ((clientY - rect.top) / rect.height) * signatureCanvas.height,
    };
  };

  const startDraw = (event) => {
    drawing = true;
    hasSignature = true;
    const point = getPoint(event);
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
  };

  const draw = (event) => {
    if (!drawing) return;
    const point = getPoint(event);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  };

  const stopDraw = () => {
    drawing = false;
  };

  ["mousedown", "touchstart"].forEach((evt) =>
    signatureCanvas.addEventListener(evt, startDraw),
  );
  ["mousemove", "touchmove"].forEach((evt) =>
    signatureCanvas.addEventListener(evt, draw),
  );
  ["mouseup", "mouseleave", "touchend"].forEach((evt) =>
    signatureCanvas.addEventListener(evt, stopDraw),
  );

  clearSignatureBtn?.addEventListener("click", () => {
    ctx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
    hasSignature = false;
    signatureStatus.textContent =
      translations[languageSelect.value].signatureEmpty;
  });

  saveSignatureBtn?.addEventListener("click", () => {
    signatureStatus.textContent = hasSignature
      ? translations[languageSelect.value].signatureSaved
      : translations[languageSelect.value].signatureMissing;
  });
}

let gallerySwiper = new Swiper(".gallery-swiper", {
  rtl: document.documentElement.dir === "rtl",
  slidesPerView: 1,
  spaceBetween: 20,
  speed: 900,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: ".gallery-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".gallery-next",
    prevEl: ".gallery-prev",
  },
  grabCursor: true,
  effect: "slide",
});

if (window.gsap) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(".hero-progress span", {
    width: "100%",
    duration: 6,
    ease: "power1.out",
    repeat: -1,
    yoyo: true,
  });

  gsap.from(".site-header", {
    y: -24,
    opacity: 0,
    duration: 0.9,
    ease: "power3.out",
  });

  gsap.from(".hero-title", {
    y: 40,
    opacity: 0,
    duration: 1.1,
    ease: "power3.out",
  });

  gsap.utils.toArray(".reveal").forEach((element) => {
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 86%",
      },
    });
  });

  gsap.to(".hero-media", {
    yPercent: 8,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}

if (cursor) {
  const moveCursor = (event) => {
    cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
  };

  window.addEventListener("mousemove", moveCursor);
  window.addEventListener("mouseleave", () =>
    cursor.classList.add("is-hidden"),
  );
  window.addEventListener("mouseenter", () =>
    cursor.classList.remove("is-hidden"),
  );

  magneticItems.forEach((item) => {
    item.addEventListener("mouseenter", () =>
      cursor.classList.add("is-active"),
    );
    item.addEventListener("mouseleave", () =>
      cursor.classList.remove("is-active"),
    );
  });
}

document.querySelectorAll("a[href^='#']").forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const today = new Date().toISOString().split("T")[0];
pickupInput.min = today;
returnInput.min = today;
setStatus("statusPrompt");
syncLanguageUi(languageSelect.value);
applyTranslations(languageSelect.value);
signatureStatus.textContent = translations[languageSelect.value].signatureEmpty;
updatePricing();
