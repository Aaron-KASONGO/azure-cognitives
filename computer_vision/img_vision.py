import requests
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
        return (Translate(caption.text), (caption.confidence * 100))


def Translate(text, source_language='en'):
    translation = ''

    # Use the Translator translate function
    path = '/translate'
    url = 'https://api.cognitive.microsofttranslator.com' + path

    # Build the request
    params = {
        'api-version': '3.0',
        'from': source_language,
        'to': ['fr']
    }

    headers = {
        'Ocp-Apim-Subscription-Key': 'c26e4b10267b4ae08c7ba3e9e06bde40',
        'Ocp-Apim-Subscription-Region': 'southafricanorth',
        'Content-type': 'application/json'
    }

    body = [{
        'text': text
    }]

    # Send the request and get response
    request = requests.post(url, params=params, headers=headers, json=body)
    response = request.json()

    # Parse JSON array and get translation
    translation = response[0]["translations"][0]["text"]



    # Return the translation
    return translation


