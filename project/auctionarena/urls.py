from django.urls import path, include
from django.views.generic import RedirectView
from . import views

app_name = "auctionarena"

urlpatterns = [
    # http://localhost:8000/auctionarena/mypage
    path("market_price/", views.market_price, name="market_price"),
]
