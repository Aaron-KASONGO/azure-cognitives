from django.shortcuts import render, redirect
from django.http import JsonResponse
from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from msrest.authentication import CognitiveServicesCredentials
from .img_vision import AnalyzeImage
from .models import Image
from .forms import ImageForm
import requests


# Create your views here.
def home(request):
    response = tuple()
    if request.method == 'POST':
        form = ImageForm(request.POST,request.FILES)
        print(form)
        if form.is_valid():
            img_file = form.save()
            print("yes !")
            try:
                # Get Configuration Settings
                cog_endpoint = 'https://visio-ordinateur.cognitiveservices.azure.com/'
                cog_key = 'ffef1398c11042fda74569f1fb737685'

                # Authenticate Computer Vision client
                credential = CognitiveServicesCredentials(cog_key) 
                cv_client = ComputerVisionClient(cog_endpoint, credential)

                # Analyze image
                response = AnalyzeImage(img_file, cv_client)
                clean_response = {
                    'description': response[0],
                    'description_en': response[1],
                    'confidence': f'{response[2]:.0f}'
                }



            except Exception as ex:
                print(ex)
            return JsonResponse(clean_response)
        else:
            return render(request, 'computer_vision/home.html', {'response': response, 'form': form})
    else:
        form = ImageForm()

    return render(request, 'computer_vision/home.html', {'response': response, 'form': form})


def render_photos(request):
    header = {
    'Authorization': '563492ad6f91700001000001c959058dc8ca4413bc19eb282d822f20'
    }

    params = {
        'query': request.POST['description'],
        'size': 'small'
    }

    response = requests.get('https://api.pexels.com/v1/search', headers=header, params=params)
    photos = response.json()['photos']
    return JsonResponse({'photos': photos})
