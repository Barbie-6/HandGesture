Webcam.set ({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 97
});
camera = document.getElementById("camera");
Webcam.attach(camera);

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = "<img id='captured_img' src='" + data_uri + "' />"
    });
}
console.log("ml5 version - " + ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/V0gqFrr05/model.json", modelLoaded);

function modelLoaded() {
    console.log("model is loaded");
}

function Speak() {
    synth = window.speechSynthesis;
    speech_data = "The  Prediction Is - " + Prediction;
    utterthis = new SpeechSynthesisUtterance(speech_data);
    synth.speak(utterthis);
}

function Check_image() {
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResults);
}

function gotResults(error, results) {
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);
        Prediction = results[0].label;

        document.getElementById("result_gesture").innerHTML = Prediction;
        Speak();

        if (Prediction == "Good Job") {
            document.getElementById("Prediction_emoji").innerHTML = "&#128077;";
        }
        if (Prediction == "Nice") {
            document.getElementById("Prediction_emoji").innerHTML = "&#128076";
        }
        if (Prediction == "Victory") {
            document.getElementById("Prediction_emoji").innerHTML = "&#9996;";
        }

        
    }
}