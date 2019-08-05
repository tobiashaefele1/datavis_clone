import csv
import os
import json

import pymysql
from django.core.files.storage import FileSystemStorage
from django.shortcuts import render

from bmf.server.data import reader


from django.http import HttpResponse

from bmf.server.data.data import Data
from bmf.server.data.retrieve_db_data import retrieve_data

current_indikator = []
indikators = ["indikator1", "indikator2", "indikator3", "indikator4", "indikator5", "indikator6"]

def columns():
    mySQLconnection = pymysql.connect("bmf-datavis_db_1", "user", "password", "mydb")
    sql_select_Query = "SHOW columns from KREISE"
    # executed quiery and closes cursor
    cursor = mySQLconnection.cursor()
    cursor.execute(sql_select_Query)
    output = cursor.fetchall()
    cursor.close()
    columns = []
    for i in output:
        columns.append(i[0])
    columns.sort()
    return columns

def std_year():
    return ['2010', '2011', '2012', '2013', '2014', '2015']

def std():
    return ['Einwohner', 'Einwohner 15-65', 'Erwerbspersonen', 'Erwerbstätige']

print(columns())

# Create your views here.
def index(request):
    """View function for home page of site."""

    # Generate counts of some of the main objects
    num_books = 5
    num_instances = 6

    # Available books (status = 'a')
    num_instances_available = 3

    # The 'all()' is implied by default.
    num_authors = 2
    context = {
        'num_books': num_books,
        'num_instances': num_instances,
        'num_instances_available': num_instances_available,
        'num_authors': num_authors,
    }

    return render(request, 'index.html', context=context)


def try_out(request):
    """View function for the try_out_page."""

    file = None;
    if request.method == 'POST' and request.FILES['csv']:


        myfile = request.FILES['csv']
        fs = FileSystemStorage()
        fs.save(myfile.name, myfile)
        uploade_data = Data('static/media/' + myfile.name)
        print(uploade_data.labels)
        fs.delete(myfile.name)
        file = myfile.name
    labels = ['Erwerbsquote']
    context = {
        'labels': labels,
        'tuples': retrieve_data('Erwerbsquote_100', 2015, 'Einwohner gesamt_100', 2015, 'Bundesland_ID'),
        'range': 7,
        'columns': columns(),
        'file': file

    }
    return render(request, 'slider.html', context=context)


def base(request):
    """View function for base page of site."""

    return render(request, 'bmf_base.html')


def basic(request):
    """View function for base page of site."""
    context = {
        'indikators': columns(),
        'years': std_year(),
        'std': std()
    }
    return render(request, 'basic.html', context=context)


def table(indikator1):
    output = list(retrieve_data(indikator1, 2015, 'Einwohner gesamt_100', 2015, 'KRS_15'))

    data = {}
    data['result'] = output

    return HttpResponse(json.dumps(data), content_type="application/json")


def indikator(request):
    """View function for base page of site."""
    data ="hiii"

    if request.method == 'POST':
        output = request.POST
        current_indikator.clear()
        for i in indikators:
            if request.POST.get(i) != "":
                current_indikator.append(request.POST.get(i))
        print(current_indikator)

        return table(current_indikator[0])


    context = {
        'indikators': columns(),
        'years': std_year(),
        'std': std(),

    }

    return render(request, 'Indikator.html', context=context)

def csv_export(request):
    # Create the HttpResponse object with the appropriate CSV header.
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="somefilename.csv"'

    writer = csv.writer(response)
    top_row = ['Kennziffer']
    for x in current_indikator:
        top_row.append(x)
    writer.writerow(top_row)
    data_list = list(retrieve_data(current_indikator[0], 2015, 'Einwohner gesamt_100', 2015, 'KRS_15'))
    for x in data_list:
        writer.writerow([x[0], x[1]])

    return response

def map(request):
    return render(request, 'map.html')

def react(request):
    return render(request, 'dashboard/index.html')
