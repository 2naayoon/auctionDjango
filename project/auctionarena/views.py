from django.shortcuts import render, get_object_or_404, redirect
from .models import Market

# from .forms import PostForm
from django.contrib.auth.decorators import login_required

# 셀레니움 크롤링
from selenium import webdriver
from selenium.webdriver import ChromeOptions
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from bs4 import BeautifulSoup

import time

# 이미지 저장용 폴더 생성
import os


# set_chrome_driver():
def set_chrome_driver():
    options = ChromeOptions()
    # 브라우저 띄우지 않고 실행
    options.add_argument("--headless")
    # 리눅스에서 셀레니움이 적절히 동작하지 않을 때 사용
    # options.add_argument("--no-sandbox")
    # options.add_argument("--single-process")
    # options.add_argument("--disable-dev-shm-usage")
    # options.add_argument("")
    # driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options) # 여기서 걸림
    driver = webdriver.Chrome(options=options) # 여기서 걸림
    return driver

def getProductList(keyword):
    browser = set_chrome_driver()

    browser.get("https://web.joongna.com/search-price")
    print("title >> ", browser.title)

    # 검색 창 찾기
    # 페이지에서 요소 찾기 : find_element, find_elements
    element = browser.find_element(By.ID, "auto-complete")
    print(element)

    # 검색어 입력 + 엔터
    element.send_keys(keyword)
    element.send_keys(Keys.ENTER)

    time.sleep(2)

    # 더보기 있을 때까지 클릭하여 모든 제품 출력
    while True:
        button = browser.find_element(
            By.CSS_SELECTOR, "div.flex-col > button.border-solid"
        )
        # print("button : ", button.text)
        if button.text == "더보기":
            button.click()
        else:
            break

    # 중고나라 페이지 소스 가져오기
    soup = BeautifulSoup(browser.page_source, "lxml")

    # 제품 div 별로 가져오기
    product_list = soup.select("a.box-border")
    # print("prod_list >> ", product_list)

    # 리스트를 제품별로 출력
    for idx, product in enumerate(product_list):
        # 상품명
        prod_image = product.select_one("img").get_attribute_list("src")
        prod_name = product.select_one("div.overflow-hidden > h2").text
        prod_price = product.select_one(
            "div.overflow-hidden > div.font-semibold > span"
        ).text
        href = "https://web.joongna.com"
        prod_addr = ''.join(product.get_attribute_list("href"))
        
        prod_price = prod_price.split("원")[0]
        prod_price = prod_price.replace(",", "")


        # 데이터 저장
        market = Market(title = prod_name, image_src = prod_image, price = prod_price, product_src = href+prod_addr)
        # print("market : ", market.product_src)
        market.save()

        print("image : ", market.image_src)
        print("addr : ", market.product_src)
        print(str(idx) + " : " + market.title + " / " + market.price)

    # 브라우저 종료
    browser.quit()

    return market

# def market_price(request, keyword):
def market_price(request):
    ##########################################
    # 검색어를 입력했을 경우에만 아래 전부 진행 #
    ##########################################

    # 검색어 가져오기
    keyword = request.GET.get("form_keyword", "")

    if keyword != "":
        print("{} 키워드 검색 시작".format(keyword))
        # Market = getProductList(keyword)
        getProductList(keyword)

        print("결과 : ", Market.objects.all())

        # if Market:
        #     context = 
    

    context = {"keyword" : keyword}
    return render(request, "market/market_list.html", context)
