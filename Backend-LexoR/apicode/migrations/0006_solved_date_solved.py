# Generated by Django 5.1.2 on 2025-02-12 14:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apicode', '0005_solved_solved'),
    ]

    operations = [
        migrations.AddField(
            model_name='solved',
            name='date_solved',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
