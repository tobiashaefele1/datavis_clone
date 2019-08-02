from django.shortcuts import render
from server.data.retrieve_db_data import retrieve_col_names
from server.data.retrieve_db_data import retrieve_col_years


# Create your views here.
def index(request):

    # ### for POST request (currently only var_1
    if request.POST:  # If this is true, the view received POST
        var_name_1_selec = request.POST.get('var_name_1', None)
        # Do what you need to do with the variables
        return var_name_1_selec
        #

    ### on load
    col_names_var = retrieve_col_names("Kreise")  # this returns all unique column names from the KREISE table
    col_names_ref = ['Einwohner 15-65_100', 'Einwohner gesamt_100', 'Erwerbspersonen gesamt_100', 'Erwerbstätige gesamt_100', 'Fläche_100']  # this returns all unique labels for standardisation drop downs
    years_ref = retrieve_col_years("reference")
    years_var = retrieve_col_years("Kreise")
    return render(request, 'frontend/index.html', {'col_names_var': col_names_var, 'col_names_ref': col_names_ref, 'years_ref': years_ref, 'years_var': years_var})
