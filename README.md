# 2019escgroup10

Dependencies:

```
pip install djangorestframework
pip install djangorestframework_simplejwt
pip install django-anymail[sendgrid]
pip install django-filter
pip install django-cors-headers
pip install apiai
```
or install by
```
pip install -r requirements.txt
```

Dependencies for React:
**ENSURE THAT ALL OTHER INSTANCES OF ESLINT ARE REMOVED OR CONFLICTS WILL HAPPEN**
```
cd /path/to/file/2019escgroup10/Frontend/frontend-admin

Mac and Linux:
npm-install-all
npm -i axios
npm -i firebase

Windows:
npm install -all
npm i axios
npm i firebase
```

Attempt running:
```
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
in the event of any loading errors. Else, run:
```
python manage.py runserver
```
to load the backend.
