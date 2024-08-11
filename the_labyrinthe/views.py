import datetime

from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.template.loader import render_to_string

from templates.forms import *

posx = 1
posy = 0

grille = [[0 , 0 , 0 , 12, 0 , 3 , 15, 4 , 0 , 12, 0 , 0 , 0 , 0 ],
          [0 , 3 , 15, 9 , 0 , 14, 0 , 14, 0 , 7 , 15, 4 , 0 , 12],
          [0 , 14, 0 , 2 , 15, 5 , 0 , 2 , 15, 9 , 0 , 7 , 15, 5 ],
          [11, 6 , 4 , 0 , 0 , 0 , 0 , 0 , 0 , 14, 0 , 14, 0 , 0 ],
          [0 , 0 , 14, 0 , 11, 4 , 0 , 0 , 3 , 6 , 15, 5 , 0 , 0 ],
          [3 , 15, 9 , 0 , 0 , 7 , 4 , 0 , 14, 0 , 0 , 0 , 0 , 12],
          [14, 0 , 2 , 8 , 15, 6 , 1 , 15, 6 , 8 , 15, 4 , 0 , 14],
          [14, 0 , 0 , 14, 0 , 0 , 14, 0 , 0 , 14, 0 , 14, 0 , 14],
          [2 , 4 , 0 , 7 , 13, 0 , 2 , 8 , 15, 5 , 0 , 2 , 15, 9 ],
          [0 , 7 , 15, 9 , 0 , 0 , 0 , 14, 0 , 0 , 12, 0 , 0 , 14],
          [0 , 10, 0 , 2 , 8 , 15, 15, 6 , 15, 8 , 6 , 15, 8 , 5 ],
          [0 , 0 , 0 , 0 , 14, 0 , 0 , 0 , 0 , 14, 0 , 0 , 14, 0 ],
          [0 , 3 , 15, 8 , 6 , 4 , 0 , 11, 8 , 5 , 0 , 3 , 1 , 13],
          [0 , 14, 0 , 10, 0 , 14, 0 , 0 , 14, 0 , 3 , 6 , 5 , 0 ],
          [0 , 2 , 4 , 0 , 3 , 5 , 0 , 0 , 2 , 15, 9 , 0 , 0 , 0 ],
          [0 , 0 , 14, 0 , 14, 0 , 0 , 0 , 0 , 0 , 2 , 4 , 0 , 0 ],
          [0 , 0 , 7 , 15, 1 , 15, 15, 4 , 0 , 12, 0 , 7 , 13, 0 ],
          [16, 15, 9 , 0 , 14, 0 , 0 , 2 , 15, 6 , 15, 5 , 0 , 0 ],
          [99, 0 , 7 , 15, 9 , 0 , 12, 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
          [0 , 0 , 10, 0 , 2 , 15, 5 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ]]


# Create your views here.
def menu(request):
    try:
        del request.session['currently_playing']
    except KeyError:
        pass
    try:
        del request.session['posx']
    except KeyError:
        pass
    try:
        del request.session['posy']
    except KeyError:
        pass
    if request.method == "POST":
        form = FrmEquipe(request.POST)
        if form.is_valid():
            if Equipe.objects.filter(nom__exact=form.cleaned_data['nom']).count() == 0:
                equipe = Equipe()
            else:
                equipe = Equipe.objects.get(nom__exact=form.cleaned_data['nom'])
            equipe.nom = form.cleaned_data['nom']
            equipe.heure = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            equipe.score = 0
            equipe.time_played = 0
            equipe.save()
            request.session['currently_playing'] = equipe.nom
            return redirect(labyrinthe)
    form = FrmEquipe()
    context = {"form": form}
    return render(request, 'menu.html', context)


def labyrinthe(request):
    if request.session.get('currently_playing', False):
        request.session['posx'] = posx
        request.session['posy'] = posy
        return render(request, 'labyrinthe.html')
    else:
        return redirect(menu)


def load_room(request, element, direction, score):
    room = Room.objects.get(no=element)
    add_point_equipe(request.session.get('currently_playing'), score)
    if direction == "l":
        request.session['posx'] = request.session.get('posx') - 1
    elif direction == "r":
        request.session['posx'] = request.session.get('posx') + 1
    elif direction == "u":
        request.session['posy'] = request.session.get('posy') - 1
    elif direction == "d":
        request.session['posy'] = request.session.get('posy') + 1
    elif direction == "s":
        request.session['posx'] = 1
        request.session['posy'] = 1
    if room.name == "end":
        return redirect(end)
    context = {'room': room,
               'posx':request.session.get('posx'),
               'posy':request.session.get('posy')}
    rendered = render_to_string('screen.html', context)
    return HttpResponse(rendered)


def add_point_equipe(nom_equipe, current_score):
    team = Equipe.objects.get(nom__exact=nom_equipe)
    team.score = current_score
    team.save()


def end(request):
    if request.session.get('currently_playing', False):
        team = Equipe.objects.get(nom=request.session.get('currently_playing'))
        time = (int(datetime.datetime.now().strftime('%M')) - int(team.heure.strftime('%M'))) + 1
        team.time_played = time
        team.save()
        all_teams = Equipe.objects.all().order_by('-score', 'time_played')
        context = {'equipe': team, 'time': time, 'all_teams': all_teams}
        return render(request, "end_page.html", context)
    else:
        return redirect(menu)

def help(request):
    return render(request, 'help.html')