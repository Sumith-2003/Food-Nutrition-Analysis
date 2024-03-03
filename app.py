from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
from tensorflow.keras.models import load_model
import os

# Initialize Flask application
app = Flask(__name__)
CORS(app)

# Define the path for the upload folder
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Make sure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load the pre-trained model
model = load_model('FV.h5')

# Define classes
labels = {0: 'apple', 1: 'banana', 2: 'beetroot', 3: 'bell pepper', 4: 'cabbage', 5: 'capsicum', 6: 'carrot',
          7: 'cauliflower', 8: 'chilli pepper', 9: 'corn', 10: 'cucumber', 11: 'eggplant', 12: 'garlic', 13: 'ginger',
          14: 'grapes', 15: 'jalepeno', 16: 'kiwi', 17: 'lemon', 18: 'lettuce',
          19: 'mango', 20: 'onion', 21: 'orange', 22: 'paprika', 23: 'pear', 24: 'peas', 25: 'pineapple',
          26: 'pomegranate', 27: 'potato', 28: 'raddish', 29: 'soy beans', 30: 'spinach', 31: 'sweetcorn',
          32: 'sweetpotato', 33: 'tomato', 34: 'turnip', 35: 'watermelon'}

# Define endpoint for image upload
@app.route('/predict', methods=['POST'])
def predict():
    # Check if an image file is uploaded
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    # Check if the file is an image
    if file.filename == '':
        return jsonify({'error': 'No image selected'})

    # Save the file to the uploads folder
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(filepath)

    # Read and preprocess the image
    img = Image.open(filepath)
    img = img.resize((224, 224))  # Resize to match model input size
    img = np.array(img) / 255.0  # Normalize pixel values
    img = img.reshape((1, 224, 224, 3))  # Reshape to match model input shape

    # Perform inference
    predictions = model.predict(img)

    # Get the predicted label
    predicted_label = labels[np.argmax(predictions)]

    # Return the prediction
    return jsonify({'prediction': predicted_label})

if __name__ == '__main__':
    app.run(debug=True)