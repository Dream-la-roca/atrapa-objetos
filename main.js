var objetoDetectado = "";
function setup() {
    canvas = createCanvas(350, 350);
    canvas.center();
    background("cyan");
    video = createCapture(VIDEO);
    video.hide();
    modelo = ml5.imageClassifier("MobileNet", modeloListo);
}

function draw() {
    image(video, 0, 0, 350, 350);
    modelo.classify(video, mostrarRespuesta);
}

function modeloListo() {
    console.log("MobilelNet ya cargó")
}

function mostrarRespuesta(error, resultado) {
    if (!error) {
        console.log(resultado);
        if (objetoDetectado != resultado[0].label) {
            objetoDetectado = resultado[0].label;
            confianza = resultado[0].confidence;
            confianza = Math.round(confianza * 100);
            document.getElementById("confianza").innerHTML = confianza + "%"
            fetch("https://api.mymemory.translated.net/get?q=" + objetoDetectado + "&langpair=en|es")
            .then(respuesta => respuesta.json())
            .then(datos => {
                traduccion = datos.responseData.translatedText;
                document.getElementById("objeto").innerHTML = traduccion;
            })
        }
    }
}