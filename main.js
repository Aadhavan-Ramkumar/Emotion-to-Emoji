Prediction1 = "";
Prediction2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});

Camera = document.getElementById("Camera");

Webcam.attach("Camera");

function Capture() {
    Webcam.snap(function (DataUrl) {
        document.getElementById("Result").innerHTML = "<img id='CapturedImage' src='" + DataUrl + "'/>";
    });
}

console.log("ml5 version:", ml5.version);

Classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ir--gKD1j/model.json", ModelLoaded);

function ModelLoaded() {
    console.log("Model Loaded!");
}

function Speak() {
    var Synth = window.speechSynthesis;
    SpeakData = "The first prediction is " + Prediction1 + "And the second prediction is " + Prediction2;
    var UtterThis = new SpeechSynthesisUtterance(SpeakData);
    Synth.speak(UtterThis);
}

function Check() {
    Img = document.getElementById("CapturedImage");
    Classifier.classify(Img, GetResult);
}

function GetResult(Error, Results) {
    if (Error) {
        console.error(Error);
    } else {
        console.log(Results);
        document.getElementById("Emotion1").innerHTML = Results[0].label;
        document.getElementById("Emotion2").innerHTML = Results[1].label;
        Prediction1 = Results[0].label;
        Prediction2 = Results[1].label;
        Speak();
        if (Results[0].label == "Happy") {
            document.getElementById("Emoji1").innerHTML = "&#128522";
        }
        if (Results[0].label == "Sad") {
            document.getElementById("Emoji1").innerHTML = "&#128532";
        }
        if (Results[0].label == "Crying") {
            document.getElementById("Emoji1").innerHTML = "&#128557;";
        }
        if (Results[0].label == "Angry") {
            document.getElementById("Emoji1").innerHTML = "&#128545;";
        }
        if (Results[1].label == "Happy") {
            document.getElementById("Emoji2").innerHTML = "&#128522";
        }
        if (Results[1].label == "Sad") {
            document.getElementById("Emoji2").innerHTML = "&#128532";
        }
        if (Results[1].label == "Crying") {
            document.getElementById("Emoji2").innerHTML = "&#128557;";
        }
        if (Results[1].label == "Angry") {
            document.getElementById("Emoji2").innerHTML = "&#128545;";
        }
    }
}