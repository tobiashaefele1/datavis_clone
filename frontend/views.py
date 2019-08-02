from django.shortcuts import render
from server.data.retrieve_db_data import retrieve_col_names
from server.data.retrieve_db_data import retrieve_col_years
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse




# Create your views here.
@csrf_exempt
def index(request):
    ### on load
    col_names_var = retrieve_col_names("Kreise")  # this returns all unique column names from the KREISE table
    col_names_ref = ['Einwohner 15-65_100', 'Einwohner gesamt_100', 'Erwerbspersonen gesamt_100', 'Erwerbstätige gesamt_100', 'Fläche_100']  # this returns all unique labels for standardisation drop downs
    years_ref = retrieve_col_years("reference")
    years_var = retrieve_col_years("Kreise")
    print(request.POST)
    return render(request, 'frontend/index.html', {'col_names_var': col_names_var, 'col_names_ref': col_names_ref, 'years_ref': years_ref, 'years_var': years_var})


var_names_selec = []
@csrf_exempt
def send_var_names_to_backend(request):
    #### this is what we do when we receive a post request through this method
    if request.method == 'POST':
        var_name_selec.clear()
        var_names_selec = request.POST
        # print(request.POST)
        print(var_names_selec)
        response_data = {}
        response_data['var_names_selec'] = var_names_selec
        return HttpResponse(json.dumps(response_data), content_type="application/json")

    # #### and this is our alternative, in cases where we do not
    # col_names_var = retrieve_col_names("Kreise")  # this returns all unique column names from the KREISE table
    # col_names_ref = ['Einwohner 15-65_100', 'Einwohner gesamt_100', 'Erwerbspersonen gesamt_100',
    #                  'Erwerbstätige gesamt_100',
    #                  'Fläche_100']  # this returns all unique labels for standardisation drop downs
    # years_ref = retrieve_col_years("reference")
    # years_var = retrieve_col_years("Kreise")
    # return render(request, 'frontend/index.html',
    #               {'col_names_var': col_names_var, 'col_names_ref': col_names_ref, 'years_ref': years_ref,
    #                'years_var': years_var})