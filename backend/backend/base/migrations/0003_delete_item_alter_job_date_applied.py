# Generated by Django 4.2.7 on 2024-01-05 22:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_remove_resume_resume_data_resume_description_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Item',
        ),
        migrations.AlterField(
            model_name='job',
            name='date_applied',
            field=models.DateTimeField(),
        ),
    ]
