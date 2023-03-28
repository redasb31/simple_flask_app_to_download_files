from flask import Flask, request, send_file, abort, render_template,Response
import re
import os
import requests

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/resources', methods=['POST'])
def download_file():
    url = request.form.get('url')
    local_file = request.form.get('local_file')
    filename = request.form.get('filename')

    if local_file:
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

