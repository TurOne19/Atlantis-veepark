/* =====================================================
   LANG.JS
   Multilanguage engine (ET / RU / EN / FI / LV)
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".lang-switcher button");
    const elements = document.querySelectorAll("[data-i18n]");

    const savedLang = localStorage.getItem("site_lang") || "et";
    setLanguage(savedLang);

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const lang = btn.dataset.lang;
            setLanguage(lang);
            localStorage.setItem("site_lang", lang);
        });
    });

    function setLanguage(lang) {
        elements.forEach(el => {
            const key = el.dataset.i18n;
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        buttons.forEach(b => b.classList.remove("active"));
        document
            .querySelector(`.lang-switcher button[data-lang="${lang}"]`)
            ?.classList.add("active");
    }
});

/* =====================================================
   TRANSLATIONS
   ===================================================== */

const translations = {
    et: {
        nav_attractions: "Atraktsioonid",
        nav_pricing: "Hinnad",
        nav_saunas: "Saunad",
        nav_gallery: "Galerii",
        nav_contact: "Kontakt",

        hero_title: "Viimsi SPA Aquapark",
        hero_subtitle: "Suurim ja põnevam veekeskus Eestis",
        hero_buy: "Osta pilet",
        hero_view: "Vaata atraktsioone",

        attractions_title: "Atraktsioonid",

        pricing_title: "Hinnad",

        saunas_title: "Saunad",

        gallery_title: "Galerii",

        calendar_title: "Lahtioleku kalender",

        contact_title: "Kontakt",
        contact_address: "Aadress",
        contact_phone: "Telefon",
        contact_email: "E-post",

        footer_rights: "Kõik õigused kaitstud."
    },

    ru: {
        nav_attractions: "Аттракционы",
        nav_pricing: "Цены",
        nav_saunas: "Сауны",
        nav_gallery: "Галерея",
        nav_contact: "Контакты",

        hero_title: "Аквапарк Viimsi SPA",
        hero_subtitle: "Самый большой и современный аквапарк в Эстонии",
        hero_buy: "Купить билет",
        hero_view: "Смотреть аттракционы",

        attractions_title: "Аттракционы",

        pricing_title: "Цены",

        saunas_title: "Сауны",

        gallery_title: "Галерея",

        calendar_title: "Календарь работы",

        contact_title: "Контакты",
        contact_address: "Адрес",
        contact_phone: "Телефон",
        contact_email: "E-mail",

        footer_rights: "Все права защищены."
    },

    en: {
        nav_attractions: "Attractions",
        nav_pricing: "Pricing",
        nav_saunas: "Saunas",
        nav_gallery: "Gallery",
        nav_contact: "Contact",

        hero_title: "Viimsi SPA Aquapark",
        hero_subtitle: "The largest and most exciting water park in Estonia",
        hero_buy: "Buy ticket",
        hero_view: "View attractions",

        attractions_title: "Attractions",

        pricing_title: "Pricing",

        saunas_title: "Saunas",

        gallery_title: "Gallery",

        calendar_title: "Opening calendar",

        contact_title: "Contact",
        contact_address: "Address",
        contact_phone: "Phone",
        contact_email: "Email",

        footer_rights: "All rights reserved."
    },

    fi: {
        nav_attractions: "Vesipuisto",
        nav_pricing: "Hinnat",
        nav_saunas: "Saunat",
        nav_gallery: "Galleria",
        nav_contact: "Yhteystiedot",

        hero_title: "Viimsi SPA Vesipuisto",
        hero_subtitle: "Viron suurin vesipuisto",
        hero_buy: "Osta lippu",
        hero_view: "Katso kohteet",

        attractions_title: "Vesipuisto",

        pricing_title: "Hinnat",

        saunas_title: "Saunat",

        gallery_title: "Galleria",

        calendar_title: "Aukiolokalenteri",

        contact_title: "Yhteystiedot",
        contact_address: "Osoite",
        contact_phone: "Puhelin",
        contact_email: "Sähköposti",

        footer_rights: "Kaikki oikeudet pidätetään."
    },

    lv: {
        nav_attractions: "Atrakcijas",
        nav_pricing: "Cenas",
        nav_saunas: "Pirtis",
        nav_gallery: "Galerija",
        nav_contact: "Kontakti",

        hero_title: "Viimsi SPA Ūdens parks",
        hero_subtitle: "Lielākais ūdens parks Igaunijā",
        hero_buy: "Pirkt biļeti",
        hero_view: "Skatīt atrakcijas",

        attractions_title: "Atrakcijas",

        pricing_title: "Cenas",

        saunas_title: "Pirtis",

        gallery_title: "Galerija",

        calendar_title: "Darba laika kalendārs",

        contact_title: "Kontakti",
        contact_address: "Adrese",
        contact_phone: "Tālrunis",
        contact_email: "E-pasts",

        footer_rights: "Visas tiesības aizsargātas."
    }
};
