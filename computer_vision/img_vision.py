import os
from array import array
from PIL import Image, ImageDraw
import sys
import time
from PIL import Image
import urllib

# Import namespaces
from azure.cognitiveservices.vision.computervision.models import VisualFeatureTypes
from msrest.authentication import CognitiveServicesCredentials


def AnalyzeImage(image_file, cv_client):
    print('Analyzing', image_file)

    # Specify features to be retrieved
    features = [VisualFeatureTypes.description,
                VisualFeatureTypes.tags,
                VisualFeatureTypes.categories,
                VisualFeatureTypes.brands,
                VisualFeatureTypes.objects,
                VisualFeatureTypes.adult]
    
    
    # module_dir = os.path.dirname(__file__)  # get current directory
    # file_path = os.path.join(module_dir, 'street.jpg')
    # Get image analysis
    #with open(image_file, mode="rb") as image_data:
    image = urllib.request.urlopen(image_file.img.url)
    analysis = cv_client.analyze_image_in_stream(image , features)

    # Get image description
    for caption in analysis.description.captions:
        print("Description: '{}' (confidence: {:.2f}%)".format(caption.text, caption.confidence * 100))
        return (caption.text, (caption.confidence * 100))


def GetThumbnail(image_file):
    print('Generating thumbnail')

    # Generate a thumbnail

