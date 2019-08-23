import os
from flask import Flask, request, jsonify, render_template

import tensorflow as tf
import keras
from keras.models import load_model, model_from_json

import numpy as np

app = Flask(__name__)

model = None

def load_model():
    global model
    json_file = open('model.json','r')
    loaded_model = json_file.read()
    json_file.close()

    model = tf.keras.models.model_from_json(loaded_model)
    model.load_weights("model.h5")

    model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

load_model()


@app.route("/",methods=['GET'])
def home():
    return render_template("index.html")

@app.route("/", methods=["POST"])
def predict():
    # grab the information from the post (dropdown)
    # assume we put the value into the variable "region"
    print("We're in the POST")
    region = 1.0
    to_predict =  np.array([1, 1, 1, 4, 30, 11.0, 3, region]).reshape(1,8)
    result = model.predict(to_predict)[0]
    print(result)
    return jsonify(np.array(result).tolist())

if __name__ == "__main__":
    app.run()