"""SINTERWEB URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.conf import settings
from django.contrib.auth.views import login, logout

from abonado.views import *
from caja.views import *
from servicio.views import * 

from django.conf.urls.static import static

urlpatterns = [
    url(r'^admin/', admin.site.urls),

    #----------------------------SISTEMA LOGIN----------------------------#
    url(r'^$', login, {'template_name': 'front.html', }, name="login"),
    url(r'^logout/$', logout, {'template_name': 'front.html', }, name='logout'),
    url(r'^signup/$', 'front.views.signup', name='signup'),
    #---------------------------------------------------------------------#


    #--------------------------------FRONT--------------------------------#
    url(r'^home/$','front.views.home', name="home"),
    url(r'^rg_abonado/$', 'abonado.views.rg_abonado', name='rg_abonado'),
    url(r'^rg_caja/$', CajaView.as_view(), name="rg_caja"),
    url(r'^rg_servicio/$', ServView.as_view(), name="rg_servicio"),
    #---------------------------------------------------------------------#

    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
