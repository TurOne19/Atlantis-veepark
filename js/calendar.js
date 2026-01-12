/* =====================================================
   CALENDAR.JS
   Atlantis H2O Aquapark
   Month-based schedule with multiple opening modes
===================================================== */

/* =====================================================
   CONFIG
===================================================== */

/*
STATUS LEGEND:
closed    → Suletud
short     → 10:00–18:00
normal    → 10:00–22:00
late      → 14:00–22:00
extended  → 10:00–21:00
*/

const HOURS_MAP = {
    closed: "Suletud",
    short: "10:00–18:00",
    normal: "10:00–22:00",
    late: "14:00–22:00",
    extended: "10:00–21:00"
};

/*
MONTH INDEX:
0 = January
1 = February
...
11 = December
*/

const CALENDAR_CONFIG = {
    0: { // JANUARY
        default: "normal",
        special: {
            1: "normal",
            6: "normal",
            13: "late",
            20: "late",
            27: "late"
        }
    },
    1: { // FEBRUARY
        default: "normal",
        special: {
            14: "late",
            24: "extended"
        }
    },
    2: { // MARCH
        default: "normal",
        special: {
            8: "late",
            29: "extended"
        }
    },
    3: { // APRIL
        default: "normal",
        special: {
            6: "late",
            18: "extended"
        }
    },
    4: { // MAY
        default: "normal",
        special: {
            1: "extended",
            10: "late",
            31: "extended"
        }
    },
    5: { // JUNE
        default: "normal"
    },
    6: { // JULY
        default: "normal"
    },
    7: { // AUGUST
        default: "normal",
        special: {
            31: "extended"
        }
    },
    8: { // SEPTEMBER
        default: "closed",
        special: {
            6: "normal",
            7: "extended",
            13: "normal",
            14: "extended",
            20: "normal",
            21: "extended",
            27: "normal",
            28: "extended"
        }
    },
    9: { // OCTOBER
        default: "normal",
        special: {
            18: "late",
            31: "late"
        }
    },
    10: { // NOVEMBER
        default: "closed",
        special: {
            1: "normal",
            2: "normal",
            8: "normal",
            9: "normal",
            15: "normal",
            16: "normal",
            22: "normal",
            23: "normal",
            29: "normal",
            30: "normal"
        }
    },
    11: { // DECEMBER
        default: "closed",
        special: {
            1: "normal",
            6: "normal",
            7: "normal",
            13: "normal",
            14: "normal",
            20: "normal",
            21: "normal",
            25: "normal",
            26: "normal",
            27: "normal",
            28: "normal",
            31: "extended"
        }
    }
};

/* =====================================================
   ELEMENTS
===================================================== */

const monthLabel = document.getElementById("calendarMonth");
const calendarGrid = document.getElementById("calendarGrid");
const navButtons = document.querySelectorAll(".calendar-nav");

const MONTH_NAMES = [
    "Jaanuar", "Veebruar", "Märts", "Aprill",
    "Mai", "Juuni", "Juuli", "August",
    "September", "Oktoober", "November", "Detsember"
];

let currentDate = new Date();

/* =====================================================
   CORE FUNCTIONS
===================================================== */

function getDayStatus(year, month, day) {
    const monthConfig = CALENDAR_CONFIG[month];
    if (!monthConfig) return "closed";

    if (monthConfig.special && monthConfig.special[day]) {
        return monthConfig.special[day];
    }

    return monthConfig.default || "closed";
}

function renderCalendar(date) {
    calendarGrid.innerHTML = "";

    const year = date.getFullYear();
    const month = date.getMonth();

    monthLabel.textContent = `${MONTH_NAMES[month]} ${year}`;

    const firstDayIndex = new Date(year, month, 1).getDay() || 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    /* Empty cells before first day */
    for (let i = 1; i < firstDayIndex; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.className = "calendar-cell empty";
        calendarGrid.appendChild(emptyCell);
    }

    /* Days */
    for (let day = 1; day <= daysInMonth; day++) {
        const status = getDayStatus(year, month, day);

        const cell = document.createElement("div");
        cell.className = `calendar-cell ${status}`;
        cell.textContent = day;
        cell.title = HOURS_MAP[status];

        calendarGrid.appendChild(cell);
    }
}

/* =====================================================
   NAVIGATION
===================================================== */

navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const action = btn.dataset.action;

        if (action === "next") {
            currentDate.setMonth(currentDate.getMonth() + 1);
        } else {
            currentDate.setMonth(currentDate.getMonth() - 1);
        }

        renderCalendar(currentDate);
    });
});

/* =====================================================
   INIT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    renderCalendar(currentDate);
});
