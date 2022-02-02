from .settings import *
import dj_database_url

DEBUG = False
TEMPLATE_DEBUG = False

SECRET_KEY = os.environ['SECRET_KEY']

#INSTALLED_APPS += ['whitenoise.runserver_nostatic']

WHITENOISE_USE_FINDERS = True

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

DATABASES['default'] = dj_database_url.config()

ALLOWED_HOSTS = ['imagedescription.herokuapp.com']