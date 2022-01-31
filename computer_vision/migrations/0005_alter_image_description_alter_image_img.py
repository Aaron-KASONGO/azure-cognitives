# Generated by Django 4.0.1 on 2022-01-25 04:28

import cloudinary.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('computer_vision', '0004_alter_image_description_alter_image_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='description',
            field=models.TextField(blank=True, default='Image Vision'),
        ),
        migrations.AlterField(
            model_name='image',
            name='img',
            field=cloudinary.models.CloudinaryField(max_length=255, verbose_name='images'),
        ),
    ]