from django.urls import path
from the_labyrinthe import views

urlpatterns = [
    #    path('admin/', admin.site.urls),
    path('', views.menu),
    path('menu', views.menu, name="menu"),
    path('labyrinthe', views.labyrinthe, name="labyrinthe"),
    path('load_room/<element>/<direction>/<score>', views.load_room, name="load_room"),
    path('end', views.end, name="end"),
    path('help', views.help, name="help")
]
