from dataclasses import fields
from django import forms
from .models import Image


class ImageForm(forms.ModelForm):
    img = forms.ImageField()
    class Meta:
        model = Image
        fields = ('img',)