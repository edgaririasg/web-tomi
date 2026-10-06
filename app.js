// --- ESCUDO AVANZADO ANTI-INSPECTOR Y DEPURACIÓN (EJIC STUDIO) ---
(function() {
    // 1. Detección de apertura de DevTools por cambio de tamaño de ventana
    const threshold = 160;
    setInterval(() => {
        if (
            window.outerWidth - window.innerWidth > threshold ||
            window.outerHeight - window.innerHeight > threshold
        ) {
            document.body.innerHTML = "<div style='background:#0f0f1b;color:#ffcc00;height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;font-family:sans-serif;text-align:center;padding:20px;'><h1>⚠️ Acceso Restringido</h1><p>Las herramientas de desarrollo y el código fuente de EJIC STUDIO están protegidos por seguridad.</p></div>";
        }
    }, 1000);

    // 2. Trampa de depuración (Debugger loop) para congelar la consola si intentan inspeccionar
    setInterval(() => {
        try {
            (function () {}.constructor("debugger")());
        } catch (e) {}
    }, 1000);
})();

// --- DATOS DINÁMICOS DEL ESTUDIO ---
const ejicData = {
    estudio: "EJIC STUDIO",
    fundador: "Edgar Josué Irías Castellanos",
    ubicacion: "Danlí, El Paraíso, Honduras",
    contacto: "ejicstudio@gmail.com",
    telefono: "+504 32463404",
    juegos: [
        {
            titulo: "Las Aventuras del Príncipe Tomi",
            descripcion: "Durante su rito de paso, Tomi se entera de la supuesta muerte de su padre, Turbo, y debe huir con Piernas Cortas, Bao Bao y Kin para rescatar a su padre prisionero de guerreros monos.",
            imagen: "img/Captura de pantalla 2025-12-24 021229.png",
            claseImagen: "img-large" // Clase específica para que esta se vea más grande
        },
        {
            titulo: "La Promesa del Pequeño Panda",
            descripcion: "Bao Bao, el panda, se convirtió en el guía esencial de una emocionante aventura de autodescubrimiento y amistad.",
            imagen: "img/Captura de pantalla 2025-12-24 030206.png",
            claseImagen: "img-normal"
        },
        {
            titulo: "La Alianza del Pequeño Panda Rojo",
            descripcion: "Kin se une al equipo aportando agilidad y un amuleto familiar que revela nuevas pistas sobre el paradero del padre de Tomi.",
            imagen: "img/Captura de pantalla 2025-07-06 005922.png",
            claseImagen: "img-normal"
        }
    ]
};

document.addEventListener("DOMContentLoaded", () => {
    const contenedorJuegos = document.getElementById("dynamic-games-container");
    if (contenedorJuegos && typeof ejicData !== 'undefined') {
        contenedorJuegos.innerHTML = "";
        ejicData.juegos.forEach(juego => {
            const card = document.createElement("div");
            card.className = "game-card";
            card.innerHTML = `
                <h2>${juego.titulo}</h2>
                <div class="game-image-container ${juego.claseImagen}">
                    <img src="${juego.imagen}" alt="${juego.titulo}">
                </div>
                <p>${juego.descripcion}</p>
            `;
            contenedorJuegos.appendChild(card);
        });
    }
});

// --- SISTEMA GLOBAL DE PROTECCIÓN ANTICOPY Y NOTIFICACIONES EJIC STUDIO ---
document.addEventListener("DOMContentLoaded", () => {

    // Función para crear la notificación flotante (Toaster) estilo gamer
    function mostrarAlertaEJIC(mensaje) {
        const alertaAnterior = document.getElementById("ejic-toast-alert");
        if (alertaAnterior) {
            alertaAnterior.remove();
        }

        const toast = document.createElement("div");
        toast.id = "ejic-toast-alert";
        toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 1.2rem;">⚠️</span>
                <span>${mensaje}</span>
            </div>
        `;

        // Estilos de la tarjeta flotante
        toast.style.position = "fixed";
        toast.style.bottom = "30px";
        toast.style.left = "50%";
        toast.style.transform = "translateX(-50%) translateY(50px)";
        toast.style.background = "rgba(26, 26, 46, 0.95)";
        toast.style.color = "#ffffff";
        toast.style.padding = "15px 25px";
        toast.style.borderRadius = "10px";
        toast.style.border = "2px solid #ffcc00";
        toast.style.boxShadow = "0 0 20px rgba(255, 204, 0, 0.6), 0 10px 30px rgba(0,0,0,0.5)";
        toast.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        toast.style.fontSize = "1rem";
        toast.style.zIndex = "10000";
        toast.style.opacity = "0";
        toast.style.transition = "all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)";
        toast.style.backdropFilter = "blur(10px)";

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.transform = "translateX(-50%) translateY(0)";
            toast.style.opacity = "1";
        }, 10);

        setTimeout(() => {
            toast.style.transform = "translateX(-50%) translateY(50px)";
            toast.style.opacity = "0";
            setTimeout(() => { toast.remove(); }, 400);
        }, 3500);
    }

    // 1. Bloquear Clic Derecho de forma global en todo el documento
    document.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        mostrarAlertaEJIC("El contenido y las imágenes de EJIC STUDIO están protegidos.");
    });

    // 2. Bloquear combinaciones de teclas prohibidas (F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S, PrintScreen)
    document.addEventListener("keydown", (e) => {
        if (
            e.key === "F12" || 
            (e.ctrlKey && e.shiftKey && e.key === "I") || 
            (e.ctrlKey && e.shiftKey && e.key === "C") ||
            (e.ctrlKey && e.shiftKey && e.key === "J") ||
            (e.ctrlKey && e.key === "u") || 
            (e.ctrlKey && e.key === "s") ||
            e.key === "PrintScreen"
        ) {
            e.preventDefault();
            mostrarAlertaEJIC("Acción restringida. Propiedad protegida de EJIC STUDIO.");
            return false;
        }
    });

    // 3. Bloquear el arrastre y acciones en CUALQUIER imagen (incluso cargadas de forma estática o dinámica)
    document.addEventListener("dragstart", (e) => {
        if (e.target.tagName === "IMG") {
            e.preventDefault();
            mostrarAlertaEJIC("La descarga o copia de esta imagen no está permitida.");
        }
    });

    document.addEventListener("mousedown", (e) => {
        if (e.target.tagName === "IMG" && e.button === 2) { // Clic derecho específico en imágenes
            e.preventDefault();
            mostrarAlertaEJIC("La descarga o copia de esta imagen no está permitida.");
        }
    });

});

// Función para forzar la descarga de la imagen en cualquier navegador
        function descargarFoto() {
            const imageUrl = "img/Fodocumple.jpeg";
            const fileName = "Fodocumple.jpeg";
            
            // Creamos un elemento <a> temporal para forzar la orden de descarga
            const a = document.createElement("a");
            a.href = imageUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }