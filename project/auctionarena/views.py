from django.shortcuts import render, get_object_or_404, redirect

from .models import Market

# from .forms import PostForm
from django.contrib.auth.decorators import login_required


# Create your views here.
def market_price(request):
    # makets = Market.objects.all()

    return render(request, "market/market_list.html")
