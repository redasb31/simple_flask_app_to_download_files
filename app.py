from flask import Flask, request, send_file, abort, render_template,Response
import re
import os
import requests

app = Flask(__name__)

    

@app.route('/', methods=['GET'])
def index():
    # check if a get parameter is set
    # if request.args.get('id'):
    #     #get the value of the get parameter
    #     query = request.args.get('id')
    #     print(query)
    #     #check if query is a number
    #     if not re.match('^\d+$', query):
    #         return render_template('file_not_found.html')
    #     return render_template('search.html')
    return render_template('index.html')

@app.route('/search',methods=['GET'])
def search():
    return render_template('search.html')


@app.route('/resources', methods=['GET'])
def download_file():
    url = request.args.get('url')
    local_file = request.args.get('local_file')
    filename = request.args.get('filename')

    if filename:
        if not re.match(r'^[a-zA-Z0-9_\-\.]+$', filename):
            abort(400, 'Invalid filename')
        
        filename='./files/'+filename
        # serve the local file from the server
        if not os.path.isfile(filename):
            return render_template('file_not_found.html')
        return send_file(filename, as_attachment=True)

    # validate url to avoid injection attacks
    if not re.match(r'^https?://', url):
        abort(400, 'Invalid URL')

    # download the file from the internet
    response = requests.get(url)
    if response.status_code != 200:
        return render_template('file_not_found.html')

    # send the file as an attachment
    filename=url.split('/')[-1]
    return  Response(
        response.content,
        mimetype=response.headers['Content-Type'],
        headers={'Content-disposition': f'attachment; filename={filename}'})

