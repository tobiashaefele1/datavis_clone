import json

from django.http import HttpResponse
from django.shortcuts import render

from server.data.aggregateindic import aggregateindic
from server.data.retrieve_db_data import retrieve_db_data
from pymysqlpool.pool import Pool
import pymysql


# Create your views here.
pool = Pool(host='bmf.cvh00sxb8ti6.eu-central-1.rds.amazonaws.com',

                                      db='mydb',
                                      user='admin',
                                      password='NPmpMe!696rY',
                                        cursorclass=pymysql.cursors.Cursor)

def index(request):
    # received_data = {}
    # indicator_data = []
    # table_data = []
    # single_indic_data = []
    ### on load


    if request.method == "GET":
        all_years = retrieve_db_data(pool).retrieve_year_dict_from_db()
        metadata = retrieve_db_data(pool).retrieve_metadata()
        metadata = retrieve_db_data(pool).retrieve_metadata()
        col_names_ref = ['Einwohner 15-65_100', 'Einwohner gesamt_100', 'Erwerbspersonen gesamt_100', 'Erwerbstätige gesamt_100', 'Fläche_100']  # this returns all unique labels for standardisation drop downs
        years_ref = retrieve_db_data(pool).retrieve_col_years("reference")
        # years_var = retrieve_col_years("Kreise")
        setup_dict = {'var_1': ['Arbeitslosenquote auf alle Erwerbspersonen ORIGINA_200', '2009-12', 'Erwerbspersonen gesamt_100', '2011', 'AMR_12', 'NIB', '45'],
        'var_2': ['Lohn pro Beschäftigtem 2010 _ORIGINAL_200', '2010', 'Erwerbstätige gesamt_100', '2011', 'AMR_12', 'HIB', '40'],
        'var_3': ['Erwerbstätigenprognose _ORIGINAL_200', '2011-18', 'Erwerbstätige gesamt_100', '2012', 'AMR_12', 'HIB', '7.5'],
        'var_4': ['Infrastrukturindikator_ORIGINAL_200', '2012', 'Erwerbstätige gesamt_100', '2012', 'AMR_12', 'HIB', '7.5'],
        'var_5': ['', '', '', '', 'KRS_15', 'HIB', ''], 'var_6': ['', '', '', '', 'KRS_15', 'HIB', '']}
        table_data = aggregateindic(pool).retrieve_table_data(setup_dict)
        var_year_data = aggregateindic(pool).retrieve_var_year(setup_dict)
        single_indic_data = aggregateindic(pool).retrieve_single_indic(setup_dict)
        indicator_data = aggregateindic(pool).retrieve_indicator(setup_dict)
        col_names_var = retrieve_db_data(pool).retrieve_col_names("Kreise")  # this returns all unique column names from the KREISE table
        # print(metadata)

    if request.method == 'POST':
        received_data = (dict(request.POST))
        print(received_data)
        var_year_data = aggregateindic(pool).retrieve_var_year(received_data)
        single_indic_data = aggregateindic(pool).retrieve_single_indic(received_data)
        indicator_data = aggregateindic(pool).retrieve_indicator(received_data)
        table_data = aggregateindic(pool).retrieve_table_data(received_data)

        # print(indicator_data)
        # print (single_indic_data)
        # print (var_year_data)
        data = {'indicator_data': indicator_data, 'table_data': table_data, 'var_year_data': var_year_data,
                'single_indic_data': single_indic_data}
        # print (data)
        return HttpResponse(json.dumps(data), content_type="application/json")

    context = {
        'all_years': json.dumps(all_years),
        'metadata': json.dumps(metadata),
              'col_names_var': json.dumps(col_names_var),
              'col_names_ref': json.dumps(col_names_ref),
              'years_ref': json.dumps(years_ref),
              'indicator_data': json.dumps(indicator_data),
              'single_indic_data': json.dumps(single_indic_data),
              'var_year_data': json.dumps(var_year_data),
              'table_data': json.dumps(table_data),
              }
    # print(context)
    return render(request, 'frontend/index.html', context=context)



# def return_table_data(var):
#     {'var_name_1': ['Ausbildungsplätze_100'], 'var_year_1': ['2011'], 'ref_name_1': ['Einwohner gesamt_100'],
#      'ref_year_1': ['2015'], 'weight_1': ['45'], 'var_name_2': [''], 'var_year_2': ['1990'], 'ref_name_2': ['0'],
#      'ref_year_2': ['2011'], 'weight_2':
#          [''], 'var_name_3': [''], 'var_year_3': ['1990'], 'ref_name_3': ['0'], 'ref_year_3': ['2011'],
#      'weight_3': [''], 'var_name_4': [''], 'var_year_4': [''], 'ref_name_4': [''], 'ref_year_4': [''], 'weight_4': [''],
#      'var_name_5': [''], 'var_year_5': [''], 'ref_name_5'
#      : [''], 'ref_year_5': [''], 'weight_5': [''], 'var_name_6': [''], 'var_year_6': [''], 'ref_name_6': [''],
#      'ref_year_6': [''], 'weight_6': ['']} >
#
#     retrieve_data(var_name, var_year, ref_name, ref_year, layer)
#


# var_names_selec = []
# @csrf_exempt
# def send_var_names_to_backend(request):
#     #### this is what we do when we receive a post request through this method
#     if request.method == 'POST':
#         var_name_selec.clear()
#         var_names_selec = request.POST
#         # print(request.POST)
#         print(var_names_selec)
#         response_data = {}
#         response_data['var_names_selec'] = var_names_selec
#         return HttpResponse(json.dumps(response_data), content_type="application/json")

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
