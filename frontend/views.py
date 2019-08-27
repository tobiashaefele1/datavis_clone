import json

import pymysql
from django.contrib.auth.decorators import login_required

from django.http import HttpResponse
from django.shortcuts import render


from server.data.aggregateindic import retrieve_everything

from server.data.retrieve_db_data import retrieve_year_dict_from_db, retrieve_metadata, retrieve_col_years, \
    clean_col_names, retrieve_col_names


@login_required(login_url='/accounts/login/')
def index(request):
    if request.method == "GET":
        all_years = retrieve_year_dict_from_db()
        # metadata = retrieve_db_data(pool).retrieve_metadata()
        metadata = retrieve_metadata()
        col_names_ref = ['Einwohner 15-64_100', 'Zivile Erwerbspersonen_100',
                         'SV-pflichtig Beschäftigte am Wohnort_100',
                        'Einwohner gesamt_100', 'Fläche_100']

        years_ref = retrieve_col_years("reference")
        years_ref.reverse()

        setup_dict = {'var_1': ['Arbeitslosenquote auf alle Erwerbspersonen ORIGINA_200', '2009-12', 'Zivile Erwerbspersonen_100', '2011', 'AMR_12', 'NIB', '45'],
        'var_2': ['Lohn pro Beschäftigtem 2010 _ORIGINAL_200', '2010', 'SV-pflichtig Beschäftigte am Wohnort_100', '2011', 'AMR_12', 'HIB', '40'],
        'var_3': ['Erwerbstätigenprognose _ORIGINAL_200', '2011-18', 'SV-pflichtig Beschäftigte am Wohnort_100', '2012', 'AMR_12', 'HIB', '7.5'],
        'var_4': ['Infrastrukturindikator_ORIGINAL_200', '2012', 'SV-pflichtig Beschäftigte am Wohnort_100', '2012', 'AMR_12', 'HIB', '7.5'],
        'var_5': ['', '', 'SV-pflichtig Beschäftigte am Wohnort_100', '2018', 'AMR_12', 'HIB', '0'], 'var_6': ['', '', 'SV-pflichtig Beschäftigte am Wohnort_100', '2018', 'AMR_12', 'HIB', '0']}
        col_names_var = clean_col_names(retrieve_col_names("kreise"))  # this returns all unique column names from the KREISE table

        data = retrieve_everything(setup_dict)
        indicator_data = data['indicator_data']
        single_indic_data = data['single_indic_data']
        table_data = data['table_data']

    if request.method == 'POST':
        recieved_data = (dict(request.POST))
        data = retrieve_everything(recieved_data)
        return HttpResponse(json.dumps(data), content_type="application/json")

    context = {
        'all_years': json.dumps(all_years),
        'metadata': json.dumps(metadata),
              'col_names_var': json.dumps(col_names_var),
              'col_names_ref': json.dumps(col_names_ref),
              'years_ref': json.dumps(years_ref),
              'indicator_data': json.dumps(indicator_data),
              'single_indic_data': json.dumps(single_indic_data),
              'table_data': json.dumps(table_data),
              }
    return render(request, 'frontend/index.html', context=context)
