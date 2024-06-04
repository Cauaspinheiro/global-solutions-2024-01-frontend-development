import cv2
import numpy as np

IMG_WIDTH = 300
IMG_HEIGHT = 225


def load_image(image):
    img = cv2.imdecode(np.frombuffer(image.read(), np.uint8), cv2.IMREAD_COLOR)
    img = cv2.resize(img, (IMG_WIDTH, IMG_HEIGHT))
    img = np.array(img)
    img = np.expand_dims(img, axis=0)

    return img
