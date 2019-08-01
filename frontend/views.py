from django.shortcuts import render
from server.data.retrieve_db_data import retrieve_col_names


# Create your views here.
def index(request):
    col_names = retrieve_col_names()
    return render(request, 'frontend/index.html', {'col_names': col_names})