from django.db import models
from cloudinary.models import CloudinaryField

# Create your models here.
class Image(models.Model):
    img = CloudinaryField('images')
    description = models.TextField(default="Image Vision", blank=True)

    def __str__(self):
        return f"{self.img}"