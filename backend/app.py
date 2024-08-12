# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import torchvision
from torchvision import transforms as T
from PIL import Image
import io
import base64
import cv2
import numpy as np

app = Flask(__name__)
CORS(app)  # Allow CORS for frontend to access the backend

model = torchvision.models.detection.fasterrcnn_resnet50_fpn(pretrained=True)
model.eval()

  # Include all names here
coco_names = ["person" , "bicycle" , "car" , "motorcycle" , "airplane" , "bus" , "train" , "truck" , "boat" , "traffic light" , "fire hydrant" , "street sign" , "stop sign" , "parking meter" , "bench" , "bird" , "cat" , "dog" , "horse" , "sheep" , "cow" , "elephant" , "bear" , "zebra" , "giraffe" , "hat" , "backpack" , "umbrella" , "shoe" , "eye glasses" , "handbag" , "tie" , "suitcase" ,
"frisbee" , "skis" , "snowboard" , "sports ball" , "kite" , "baseball bat" ,
"baseball glove" , "skateboard" , "surfboard" , "tennis racket" , "bottle" ,
"plate" , "wine glass" , "cup" , "fork" , "knife" , "spoon" , "bowl" ,
"banana" , "apple" , "sandwich" , "orange" , "broccoli" , "carrot" , "hot dog" ,
"pizza" , "donut" , "cake" , "chair" , "couch" , "potted plant" , "bed" ,
"mirror" , "dining table" , "window" , "desk" , "toilet" , "door" , "tv" ,
"laptop" , "mouse" , "remote" , "keyboard" , "cell phone" , "microwave" ,
"oven" , "toaster" , "sink" , "refrigerator" , "blender" , "book" ,
"clock" , "vase" , "scissors" , "teddy bear" , "hair drier" , "toothbrush" , "hair brush"]

@app.route('/upload', methods=['POST'])

def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file found'}), 400

    image_file = request.files['image']
    image = Image.open(image_file.stream)

    transform = T.ToTensor()
    img = transform(image)

    with torch.no_grad():
        pred = model([img])

    bboxes, labels, scores = pred[0]["boxes"], pred[0]["labels"], pred[0]["scores"]

    num = torch.argwhere(scores > 0.4).shape[0]

    igg = np.array(image)
    for i in range(num):
        x1, y1, x2, y2 = bboxes[i].numpy().astype("int")
        class_name = coco_names[labels.numpy()[i] - 1]
        cv2.rectangle(igg, (x1, y1), (x2, y2), (0, 255, 0), 1)
        cv2.putText(igg, class_name, (x1, y1 - 10), cv2.FONT_HERSHEY_COMPLEX, 0.5, (255, 0, 0), 1, cv2.LINE_AA)

    _, buffer = cv2.imencode('.jpg', igg)
    jpg_as_text = base64.b64encode(buffer).decode('utf-8')

    return jsonify({'image': jpg_as_text})

if __name__ == '__main__':
    app.run(port=5000)

