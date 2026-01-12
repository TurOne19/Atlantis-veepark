/* =====================================================
   MAIN.JS
   Burger · Smooth scroll · News popup
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       BURGER MENU
    =============================== */

    const burger = document.getElementById("burgerBtn");
    const nav = document.getElementById("mainNav");

    if (burger && nav) {
        burger.addEventListener("click", () => {
            nav.classList.toggle("active");
            burger.classList.toggle("active");
        });

        // Close mobile menu when clicking link
        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("active");
                burger.classList.remove("active");
            });
        });
    }

    /* ===============================
       SMOOTH SCROLL (ANCHORS)
    =============================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            const target = document.querySelector(targetId);

            if (!target) return;

            e.preventDefault();

            const headerOffset = 72;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition =
                elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        });
    });

    /* ===============================
       HERO SCROLL ARROW
    =============================== */

    const heroScroll = document.querySelector(".hero-scroll");

    if (heroScroll) {
        heroScroll.addEventListener("click", () => {
            const firstSection = document.querySelector("main section");
            if (firstSection) {
                firstSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    }

    /* ===============================
       NEWS POPUP
    =============================== */

    const popup = document.getElementById("newsPopup");
    const closeBtn = document.getElementById("newsClose");

    if (popup) {
        const wasShown = localStorage.getItem("newsPopupShown");

        if (!wasShown) {
            setTimeout(() => {
                popup.classList.add("active");
                popup.setAttribute("aria-hidden", "false");
                localStorage.setItem("newsPopupShown", "true");
            }, 1200);
        }

        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                popup.classList.remove("active");
                popup.setAttribute("aria-hidden", "true");
            });
        }

        // Close popup when clicking outside box
        popup.addEventListener("click", (e) => {
            if (e.target === popup) {
                popup.classList.remove("active");
                popup.setAttribute("aria-hidden", "true");
            }
        });
    }
/* ===============================
   ADMIN DATA SYNC
=============================== */

// NEWS
const adminNews = localStorage.getItem("site_news");
if (adminNews) {
    const newsEl = document.getElementById("newsContent");
    if (newsEl) newsEl.textContent = adminNews;
}

// CONTACT
const adminPhone = localStorage.getItem("site_phone");
const adminEmail = localStorage.getItem("site_email");

if (adminPhone) {
    const phoneEl = document.getElementById("contactPhone");
    if (phoneEl) phoneEl.textContent = adminPhone;
}

if (adminEmail) {
    const emailEl = document.getElementById("contactEmail");
    if (emailEl) emailEl.textContent = adminEmail;
}

// PRICES (simple text replace)
const adminPrices = localStorage.getItem("site_prices");
if (adminPrices) {
    const pricingTable = document.getElementById("pricingTable");
    if (pricingTable) {
        pricingTable.innerHTML = adminPrices;
    }
}
});
