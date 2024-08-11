from django.forms import ModelForm
from the_labyrinthe.models import *


class FrmEquipe(ModelForm):
    class Meta:
        model = Equipe
        fields = ['nom']
        labels = {
            'nom': 'Équipe'
        }
