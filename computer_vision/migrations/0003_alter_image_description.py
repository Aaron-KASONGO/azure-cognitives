# Generated by Django 4.0.1 on 2022-01-25 04:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('computer_vision', '0002_alter_image_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='description',
            field=models.TextField(blank=True, default='Image Vision'),
        ),
    ]
