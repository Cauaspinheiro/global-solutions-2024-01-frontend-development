from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from tensorflow import keras
import cv2
import numpy as np
from load_image import load_image
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

model = keras.models.load_model("coral_model.keras")


@app.route("/predict", methods=["POST"])
def predict():
    image = request.files["image"]

    img = load_image(image)

    predictions = model.predict(img)

    prediction = predictions[0][0]

    classification = "healthy" if prediction < 0.5 else "bleached"

    date = datetime.now().strftime("%Y%m%d%H%M%S")

    cv2.imwrite(
        os.path.join(
            "uploads", f"{classification}_{date}.{image.filename.split('.')[-1]}"
        ),
        img[0],
    )

    confidence = 1 - prediction if classification == "healthy" else prediction

    confidence = round(float(confidence), 2)

    return jsonify({"prediction": classification, "confidence": confidence})


@app.route("/images", methods=["GET"])
def images():
    images = os.listdir("uploads")

    images_final = []

    for i in images:
        if i == ".gitkeep":
            continue

        classification, date = i.split("_")

        date = date.split(".")[0]

        date = datetime.strptime(date, "%Y%m%d%H%M%S").isoformat()

        images_final.append(
            {"classification": classification, "date": date, "url": f"/images/{i}"}
        )

    return jsonify(images_final)


@app.route("/images/<path:path>")
def send_image(path):
    return send_from_directory("uploads", path)


@app.route("/images/<path:path>", methods=["DELETE"])
def delete_image(path):
    os.remove(os.path.join("uploads", path))

    return jsonify({"message": "Image deleted"})


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"message": 200})


app.run(port=5000)
