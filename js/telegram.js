/* =====================================================
   TELEGRAM.JS
   Contact form → Telegram Bot
===================================================== */

/*
ИНСТРУКЦИЯ:
1. Создай бота через @BotFather
2. Получи BOT_TOKEN
3. Узнай CHAT_ID (или user ID)
4. Замени значения ниже
*/

const TELEGRAM_BOT_TOKEN = '8275112739:AAFKoB78mXAvPxSo5lv9uuM382JDcoWUH_0';
const TELEGRAM_CHAT_ID = '8146157246';

/* ===============================
   ELEMENTS
=============================== */

const form = document.getElementById("telegramForm");

/* ===============================
   SEND MESSAGE
=============================== */

async function sendToTelegram(text) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: text,
            parse_mode: "HTML"
        })
    });

    return response.ok;
}

/* ===============================
   FORM HANDLER
=============================== */

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = form.querySelector('input[type="text"]').value.trim();
        const phone = form.querySelector('input[type="tel"]').value.trim();
        const message = form.querySelector("textarea").value.trim();

        if (!name || !phone) {
            alert("Palun täida nimi ja telefon");
            return;
        }

        const text = `
📩 <b>UUS KÜSIMUS – AQUAPARK</b>

👤 <b>Nimi:</b> ${name}
📞 <b>Telefon:</b> ${phone}
💬 <b>Sõnum:</b>
${message || "—"}
        `;

        try {
            const success = await sendToTelegram(text);

            if (success) {
                alert("✅ Teie sõnum on saadetud!");
                form.reset();
            } else {
                alert("❌ Midagi läks valesti. Proovi uuesti.");
            }
        } catch (err) {
            console.error(err);
            alert("❌ Viga ühenduses Telegramiga.");
        }
    });
}
