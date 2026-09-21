/* ==========================================
   NUMBER BASE CONVERTER
========================================== */


const converterForm =
    document.getElementById("converterForm");

const numberInput =
    document.getElementById("numberInput");

const inputBase =
    document.getElementById("inputBase");

const resetButton =
    document.getElementById("resetButton");

const message =
    document.getElementById("message");


const decimalResult =
    document.getElementById("decimalResult");

const binaryResult =
    document.getElementById("binaryResult");

const octalResult =
    document.getElementById("octalResult");

const hexResult =
    document.getElementById("hexResult");


const stepsContainer =
    document.getElementById("stepsContainer");


const historyContainer =
    document.getElementById("historyContainer");


const clearHistoryButton =
    document.getElementById("clearHistoryButton");


const themeButton =
    document.getElementById("themeButton");


const installButton =
    document.getElementById("installButton");



/* ==========================================
   BASE INFORMATION
========================================== */

const baseNames = {

    2: "Binary",

    8: "Octal",

    10: "Decimal",

    16: "Hexadecimal"

};



/* ==========================================
   VALIDATE NUMBER
========================================== */

function validateNumber(value, base) {

    if (value === "") {

        return false;

    }


    if (base === 2) {

        return /^[01]+$/.test(value);

    }


    if (base === 8) {

        return /^[0-7]+$/.test(value);

    }


    if (base === 10) {

        return /^[0-9]+$/.test(value);

    }


    if (base === 16) {

        return /^[0-9a-fA-F]+$/.test(value);

    }


    return false;
}



/* ==========================================
   SHOW MESSAGE
========================================== */

function showMessage(text, type) {

    message.textContent = text;

    message.className = "message " + type;

}



/* ==========================================
   CLEAR RESULTS
========================================== */

function clearResults() {

    decimalResult.textContent = "—";

    binaryResult.textContent = "—";

    octalResult.textContent = "—";

    hexResult.textContent = "—";

}



/* ==========================================
   CONVERT NUMBER
========================================== */

function convertNumber() {

    const value =
        numberInput.value.trim();

    const base =
        Number(inputBase.value);


    clearResults();


    if (value === "") {

        showMessage(
            "Please enter a number.",
            "error"
        );

        return;

    }


    if (!validateNumber(value, base)) {

        showMessage(
            `Invalid ${baseNames[base]} number. Check the allowed digits.`,
            "error"
        );

        return;

    }


    try {

        /*
            BigInt allows the application
            to handle very large integers.
        */

        const decimalValue =
            BigInt(parseInt(value, base));


        const decimal =
            decimalValue.toString(10);

        const binary =
            decimalValue.toString(2);

        const octal =
            decimalValue.toString(8);

        const hexadecimal =
            decimalValue
                .toString(16)
                .toUpperCase();


        decimalResult.textContent =
            decimal;

        binaryResult.textContent =
            binary;

        octalResult.textContent =
            octal;

        hexResult.textContent =
            hexadecimal;


        showMessage(
            "Conversion completed successfully.",
            "success"
        );


        generateSteps(
            value,
            base,
            decimalValue,
            decimal,
            binary,
            octal,
            hexadecimal
        );


        saveHistory(
            value,
            base,
            decimal,
            binary,
            octal,
            hexadecimal
        );

    }

    catch (error) {

        clearResults();

        showMessage(
            "Unable to convert this number.",
            "error"
        );

    }

}



/* ==========================================
   CONVERSION STEPS
========================================== */

function generateSteps(
    original,
    originalBase,
    decimalValue,
    decimal,
    binary,
    octal,
    hexadecimal
) {

    let html = "";


    html += `
        <div class="steps">

            <div class="step">

                <div class="step-title">
                    Step 1: Identify the input
                </div>

                <div class="formula">
                    ${original}
                    =
                    ${baseNames[originalBase]}
                    (Base ${originalBase})
                </div>

            </div>
    `;



    if (originalBase !== 10) {

        html += `

            <div class="step">

                <div class="step-title">
                    Step 2: Convert to Decimal
                </div>

                <div class="formula">

                    ${original}
                    (Base ${originalBase})
                    =
                    ${decimal}
                    (Base 10)

                </div>

            </div>

        `;

    }
    else {

        html += `

            <div class="step">

                <div class="step-title">
                    Step 2: Decimal value
                </div>

                <div class="formula">

                    Decimal =
                    ${decimal}

                </div>

            </div>

        `;

    }



    html += `

        <div class="step">

            <div class="step-title">
                Binary Conversion
            </div>

            <div class="formula">

                ${decimal}
                (Base 10)
                =
                ${binary}
                (Base 2)

            </div>

        </div>



        <div class="step">

            <div class="step-title">
                Octal Conversion
            </div>

            <div class="formula">

                ${decimal}
                (Base 10)
                =
                ${octal}
                (Base 8)

            </div>

        </div>



        <div class="step">

            <div class="step-title">
                Hexadecimal Conversion
            </div>

            <div class="formula">

                ${decimal}
                (Base 10)
                =
                ${hexadecimal}
                (Base 16)

            </div>

        </div>


        </div>
    `;


    stepsContainer.innerHTML = html;

}



/* ==========================================
   RESET
========================================== */

resetButton.addEventListener(
    "click",
    function () {

        numberInput.value = "";

        inputBase.value = "10";

        clearResults();

        stepsContainer.innerHTML = `

            <p class="empty-message">

                Enter a number and click Convert
                to see the conversion steps.

            </p>

        `;

        showMessage("", "");

        numberInput.focus();

    }
);



/* ==========================================
   FORM SUBMIT
========================================== */

converterForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        convertNumber();

    }
);



/* ==========================================
   COPY RESULTS
========================================== */

const copyButtons =
    document.querySelectorAll(".copy-button");


copyButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            async function () {

                const targetId =
                    button.dataset.target;

                const target =
                    document.getElementById(
                        targetId
                    );


                const text =
                    target.textContent;


                if (
                    text === "—" ||
                    text === ""
                ) {

                    return;

                }


                try {

                    await navigator.clipboard
                        .writeText(text);


                    const oldText =
                        button.textContent;


                    button.textContent =
                        "Copied!";


                    setTimeout(
                        function () {

                            button.textContent =
                                oldText;

                        },
                        1000
                    );

                }

                catch (error) {

                    alert(
                        "Unable to copy the value."
                    );

                }

            }
        );

    }
);



/* ==========================================
   HISTORY
========================================== */

function getHistory() {

    const data =
        localStorage.getItem(
            "numberConverterHistory"
        );


    if (!data) {

        return [];

    }


    try {

        return JSON.parse(data);

    }

    catch {

        return [];

    }

}



/* ==========================================
   SAVE HISTORY
========================================== */

function saveHistory(
    input,
    base,
    decimal,
    binary,
    octal,
    hexadecimal
) {

    let history =
        getHistory();


    const item = {

        input: input,

        base: base,

        decimal: decimal,

        binary: binary,

        octal: octal,

        hexadecimal: hexadecimal,

        date:
            new Date().toLocaleString()

    };


    history.unshift(item);


    /*
        Keep only the latest
        20 conversions.
    */

    history =
        history.slice(0, 20);


    localStorage.setItem(
        "numberConverterHistory",
        JSON.stringify(history)
    );


    displayHistory();

}



/* ==========================================
   DISPLAY HISTORY
========================================== */

function displayHistory() {

    const history =
        getHistory();


    if (history.length === 0) {

        historyContainer.innerHTML = `

            <p class="empty-message">
                No conversions yet.
            </p>

        `;

        return;

    }


    historyContainer.innerHTML =
        history.map(
            function (item) {

                return `

                    <div class="history-item">

                        <div class="history-input">

                            ${escapeHTML(item.input)}

                            → Base ${item.base}

                            <small>
                                ${escapeHTML(item.date)}
                            </small>

                        </div>


                        <div class="history-values">

                            <div class="history-value">
                                DEC:
                                ${item.decimal}
                            </div>

                            <div class="history-value">
                                BIN:
                                ${item.binary}
                            </div>

                            <div class="history-value">
                                OCT:
                                ${item.octal}
                            </div>

                            <div class="history-value">
                                HEX:
                                ${item.hexadecimal}
                            </div>

                        </div>

                    </div>

                `;

            }
        ).join("");

}



/* ==========================================
   ESCAPE HTML
========================================== */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}



/* ==========================================
   CLEAR HISTORY
========================================== */

clearHistoryButton.addEventListener(
    "click",
    function () {

        localStorage.removeItem(
            "numberConverterHistory"
        );

        displayHistory();

    }
);



/* ==========================================
   DARK MODE
========================================== */

function loadTheme() {

    const theme =
        localStorage.getItem(
            "converterTheme"
        );


    if (theme === "dark") {

        document.body.classList.add("dark");

        themeButton.textContent = "☀️";

    }

}



themeButton.addEventListener(
    "click",
    function () {

        document.body.classList.toggle("dark");


        const isDark =
            document.body.classList.contains(
                "dark"
            );


        localStorage.setItem(
            "converterTheme",
            isDark ? "dark" : "light"
        );


        themeButton.textContent =
            isDark ? "☀️" : "🌙";

    }
);



/* ==========================================
   PWA INSTALLATION
========================================== */

let deferredInstallPrompt = null;


window.addEventListener(
    "beforeinstallprompt",
    function (event) {

        event.preventDefault();

        deferredInstallPrompt = event;

        installButton.style.display =
            "block";

    }
);



installButton.addEventListener(
    "click",
    async function () {

        if (!deferredInstallPrompt) {

            alert(
                "Installation is not currently available. Open this website in a supported browser such as Chrome or Edge and make sure it is served over HTTPS."
            );

            return;

        }


        deferredInstallPrompt.prompt();


        const result =
            await deferredInstallPrompt
                .userChoice;


        if (
            result.outcome ===
            "accepted"
        ) {

            installButton.textContent =
                "Installed";

        }


        deferredInstallPrompt = null;

    }
);



/* ==========================================
   SERVICE WORKER
========================================== */

if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        function () {

            navigator.serviceWorker
                .register(
                    "service-worker.js"
                )
                .then(
                    function () {

                        console.log(
                            "Service Worker registered."
                        );

                    }
                )
                .catch(
                    function (error) {

                        console.log(
                            "Service Worker registration failed:",
                            error
                        );

                    }
                );

        }
    );

}



/* ==========================================
   INITIALIZE
========================================== */

displayHistory();

loadTheme();

installButton.style.display =
    "block";