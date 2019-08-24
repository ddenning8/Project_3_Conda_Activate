import os
import numpy as np

import tensorflow as tf
from keras.models import load_model, model_from_json

from flask import Flask, jsonify, render_template

app = Flask(__name__)

model = None

def load_environment():
    global model
    json_file = open('model.json','r')
    loaded_model = json_file.read()
    json_file.close()

    model = tf.keras.models.model_from_json(loaded_model)
    model.load_weights("model.h5")

    model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])


@app.route("/",methods=['GET'])
def home():
    return render_template("../index.html")

@app.route("/predict/<region>", methods=["GET"])
def predict(region):
    load_environment()
    to_predict =  np.array([1, 1, 1, 4, 30, 11.0, 3, float(region)]).reshape(1,8)
    result = model.predict(to_predict)[0]
    # print(result)
    result_text = "Confirmed" if np.array(result).tolist() == [1, 0] else "Denied"
    return jsonify({"result": result_text})

if __name__ == "__main__":
    app.run()