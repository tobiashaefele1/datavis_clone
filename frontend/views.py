from django.shortcuts import render
from server.data.retrieve_db_data import retrieve_col_names


# Create your views here.
def index(request):
    col_names_var = retrieve_col_names("Kreise")
    col_names_ref = ['Einwohner 15-65_100', 'Einwohner gesamt_100', 'Erwerbspersonen gesamt_100', 'Erwerbstätige gesamt_100', 'Fläche_100']
    return render(request, 'frontend/index.html', {'col_names_var': col_names_var, 'col_names_ref': col_names_ref})