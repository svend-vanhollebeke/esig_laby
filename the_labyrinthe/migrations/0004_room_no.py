# Generated by Django 4.1.3 on 2022-12-01 22:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('the_labyrinthe', '0003_room'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='no',
            field=models.DecimalField(decimal_places=0, default=0, max_digits=2),
            preserve_default=False,
        ),
    ]
