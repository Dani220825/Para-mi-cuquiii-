const sunflower = document.getElementById("sunflower");
const ground = document.getElementById("ground");
const tree = document.getElementById("tree");
const message = document.getElementById("message");

let started = false;

/* contador */
const startDate = new Date("2025-08-22T20:30:00");

function updateCounter() {
    const now = new Date();
    let diff = now - startDate;

    let sec = Math.floor(diff / 1000);
    let min = Math.floor(sec / 60);
    let hr = Math.floor(min / 60);
    let days = Math.floor(hr / 24);
    let years = Math.floor(days / 365);

    sec %= 60;
    min %= 60;
    hr %= 24;
    days %= 365;

    document.getElementById("counter").innerText =
        `${years} años, ${days} días, ${hr} horas, ${min} minutos, ${sec} segundos`;
}
setInterval(updateCounter, 1000);

/* texto máquina */
const text = `Flores amarillas para el
amor de mi vida:

Si pudiera elegir un lugar
seguro, sería a tu lado.

Cuanto más tiempo estoy
contigo más te amo.`;

function typeWriter(i = 0) {
    if (i < text.length) {
        message.innerHTML += text.charAt(i);
        setTimeout(() => typeWriter(i + 1), 40);
    }
}

/* animación árbol */
function growTree() {
    let h = 0;
    let interval = setInterval(() => {
        h += 5;
        tree.style.height = h + "px";

        if (h > 180) {
            clearInterval(interval);
            bloomTree();
        }
    }, 30);
}

/* flores en árbol */
function bloomTree() {
    for (let i = 0; i < 60; i++) {
        let f = document.createElement("div");
        f.style.position = "absolute";
        f.style.width = "6px";
        f.style.height = "6px";
        f.style.background = "pink";
        f.style.borderRadius = "50%";
        f.style.left = (50 + Math.random() * 20 - 10) + "%";
        f.style.bottom = (80 + Math.random() * 180) + "px";
        document.body.appendChild(f);
    }

    setTimeout(flowRight, 1000);
}

/* desplazamiento + lluvia */
function flowRight() {
    document.getElementById("scene").style.transition = "transform 5s";
    document.getElementById("scene").style.transform = "translateX(120px)";

    setInterval(() => {
        let petal = document.createElement("div");
        petal.innerHTML = "🌸";
        petal.style.position = "absolute";
        petal.style.left = "100%";
        petal.style.top = Math.random() * window.innerHeight + "px";
        petal.style.fontSize = "18px";
        petal.style.animation = "fall 5s linear";
        document.body.appendChild(petal);

        setTimeout(() => petal.remove(), 5000);
    }, 200);
}

/* click girasol */
sunflower.addEventListener("click", () => {
    if (started) return;
    started = true;

    // girasol → semilla
    sunflower.style.transform = "translate(-50%, -50%) scale(0.2)";
    sunflower.style.background = "#6B3E1D";

    // suelo
    setTimeout(() => {
        ground.style.width = "100%";
    }, 600);

    // árbol
    setTimeout(() => {
        growTree();
        typeWriter();
    }, 2000);
});
