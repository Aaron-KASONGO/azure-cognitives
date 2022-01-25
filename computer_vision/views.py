from django.shortcuts import render, redirect
from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from msrest.authentication import CognitiveServicesCredentials
from .img_vision import AnalyzeImage
from .models import Image
from .forms import ImageForm


# Create your views here.
def home(request):
    response = tuple()
    if request.method == 'POST':
        form = ImageForm(request.POST,request.FILES)
        print(form)
        if form.is_valid():
            img_file = form.save()
            try:
                # Get Configuration Settings
                cog_endpoint = 'https://visio-ordinateur.cognitiveservices.azure.com/'
                cog_key = 'ffef1398c11042fda74569f1fb737685'

                # Authenticate Computer Vision client
                credential = CognitiveServicesCredentials(cog_key) 
                cv_client = ComputerVisionClient(cog_endpoint, credential)

                # Analyze image
                response = AnalyzeImage(img_file, cv_client)



            except Exception as ex:
                print(ex)
            return redirect('home')
        else:
            return render(request, 'computer_vision/home.html', {'response': response, 'form': form})
    else:
        form = ImageForm()

    return render(request, 'computer_vision/home.html', {'response': response, 'form': form})
