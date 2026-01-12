/* =====================================================
   ADMIN.JS
   Atlantis H2O Aquapark
   Simple admin panel (localStorage based)
===================================================== */

/* =====================================================
   CONFIG
===================================================== */

// ❗️ВРЕМЕННЫЕ ДАННЫЕ (ПОТОМ МОЖНО СМЕНИТЬ)
const ADMIN_LOGIN = "admin";
const ADMIN_PASSWORD = "admin123";

// localStorage keys
const STORAGE_KEYS = {
    auth: "admin_logged_in",
    texts: "site_texts",
    pricing: "site_pricing",
    calendar: "site_calendar",
    news: "site_news"
};

/* =====================================================
   ELEMENTS
===================================================== */

// login
const loginScreen = document.getElementById("loginScreen");
const adminPanel = document.getElementById("adminPanel");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginError = document.getElementById("loginError");

// inputs
const loginUser = document.getElementById("loginUser");
const loginPass = document.getElementById("loginPass");

// tabs
const tabButtons = document.querySelectorAll(".admin-sidebar nav button");
const tabs = document.querySelectorAll(".admin-tab");

// text inputs
const heroTitleInput = document.getElementById("heroTitleInput");
const heroSubtitleInput = document.getElementById("heroSubtitleInput");

// pricing inputs
const priceAdult = document.getElementById("priceAdult");
const priceChild = document.getElementById("priceChild");
const priceFamily = document.getElementById("priceFamily");

// news
const newsText = document.getElementById("newsText");

// calendar
const calendarMonthSelect = document.getElementById("calendarMonthSelect");
const calendarAdminGrid = document.getElementById("calendarAdminGrid");

// save buttons
const saveButtons = document.querySelectorAll(".save-btn");

/* =====================================================
   AUTH
===================================================== */

function checkAuth() {
    const loggedIn = localStorage.getItem(STORAGE_KEYS.auth) === "true";

    if (loggedIn) {
        loginScreen.classList.add("hidden");
        adminPanel.classList.remove("hidden");
    } else {
        loginScreen.classList.remove("hidden");
        adminPanel.classList.add("hidden");
    }
}

loginBtn.addEventListener("click", () => {
    if (
        loginUser.value === ADMIN_LOGIN &&
        loginPass.value === ADMIN_PASSWORD
    ) {
        localStorage.setItem(STORAGE_KEYS.auth, "true");
        checkAuth();
    } else {
        loginError.textContent = "Vale kasutajanimi või parool";
    }
});

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEYS.auth);
    checkAuth();
});

checkAuth();

/* =====================================================
   TABS
===================================================== */

tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const tab = btn.dataset.tab;

        tabButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        tabs.forEach(section => {
            section.classList.toggle(
                "hidden",
                section.id !== `tab-${tab}`
            );
        });
    });
});

/* =====================================================
   LOAD DATA
===================================================== */

function loadTexts() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.texts)) || {};
    heroTitleInput.value = data.heroTitle || "";
    heroSubtitleInput.value = data.heroSubtitle || "";
}

function loadPricing() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.pricing)) || {};
    priceAdult.value = data.adult || "";
    priceChild.value = data.child || "";
    priceFamily.value = data.family || "";
}

function loadNews() {
    newsText.value = localStorage.getItem(STORAGE_KEYS.news) || "";
}

function loadCalendar(month) {
    calendarAdminGrid.innerHTML = "";

    const storedCalendar =
        JSON.parse(localStorage.getItem(STORAGE_KEYS.calendar)) || {};

    const monthData = storedCalendar[month] || {};

    for (let day = 1; day <= 31; day++) {
        const cell = document.createElement("div");
        cell.textContent = day;

        if (monthData[day]) {
            cell.classList.add("active");
        }

        cell.addEventListener("click", () => {
            cell.classList.toggle("active");
        });

        calendarAdminGrid.appendChild(cell);
    }
}

/* =====================================================
   SAVE DATA
===================================================== */

function saveTexts() {
    localStorage.setItem(
        STORAGE_KEYS.texts,
        JSON.stringify({
            heroTitle: heroTitleInput.value,
            heroSubtitle: heroSubtitleInput.value
        })
    );
    alert("Tekstid salvestatud");
}

function savePricing() {
    localStorage.setItem(
        STORAGE_KEYS.pricing,
        JSON.stringify({
            adult: priceAdult.value,
            child: priceChild.value,
            family: priceFamily.value
        })
    );
    alert("Hinnad salvestatud");
}

function saveNews() {
    localStorage.setItem(STORAGE_KEYS.news, newsText.value);
    alert("Uudis salvestatud");
}

function saveCalendar() {
    const month = calendarMonthSelect.value;
    const cells = calendarAdminGrid.querySelectorAll("div");

    const monthData = {};
    cells.forEach(cell => {
        if (cell.classList.contains("active")) {
            monthData[cell.textContent] = true;
        }
    });

    const storedCalendar =
        JSON.parse(localStorage.getItem(STORAGE_KEYS.calendar)) || {};

    storedCalendar[month] = monthData;

    localStorage.setItem(
        STORAGE_KEYS.calendar,
        JSON.stringify(storedCalendar)
    );

    alert("Kalender salvestatud");
}

/* =====================================================
   SAVE HANDLER
===================================================== */

saveButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const type = btn.dataset.save;

        if (type === "texts") saveTexts();
        if (type === "pricing") savePricing();
        if (type === "news") saveNews();
        if (type === "calendar") saveCalendar();
    });
});

/* =====================================================
   INIT
===================================================== */

loadTexts();
loadPricing();
loadNews();
loadCalendar(calendarMonthSelect.value);

calendarMonthSelect.addEventListener("change", e => {
    loadCalendar(e.target.value);
});
