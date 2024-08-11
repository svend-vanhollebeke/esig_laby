from django.db import models


# Create your models here.
class Equipe(models.Model):
    nom = models.CharField(max_length=32, null=False)
    heure = models.DateTimeField(null=False)
    score = models.DecimalField(max_digits=2, decimal_places=0, null=False, default=0)
    time_played = models.DecimalField(max_digits=9, decimal_places=0, null=True)


class Room(models.Model):
    no = models.DecimalField(max_digits=2, decimal_places=0, null=False)
    name = models.CharField(max_length=32, null=False)
    up = models.BooleanField()
    down = models.BooleanField()
    left = models.BooleanField()
    right = models.BooleanField()
