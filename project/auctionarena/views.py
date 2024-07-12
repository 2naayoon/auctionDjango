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
    driver = webdriver.Chrome(
        service=Service(ChromeDriverManager().install()), options=options
    )
    return driver


# Create your views here.
# def market_price(request, keyword):
def market_price(request):
    ##########################################
    # 검색어를 입력했을 경우에만 아래 전부 진행 #
    ##########################################

    # 검색어 가져오기
    keyword = request.Get.get("keyword", "")

    browser = set_chrome_driver()

    browser.get("https://web.joongna.com/search-price")
    # print("title >> ", browser.title)

    # 검색 창 찾기
    # 페이지에서 요소 찾기 : find_element, find_elements
    element = browser.find_element(By.ID, "auto-complete")
    print(element)

    # 검색어 입력 + 엔터
    keyword = "스위치"  # 추후 이름 바꿔야함
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

        print("image : ", prod_image)
        print(str(idx) + " : " + prod_name + " / " + prod_price)

    # 브라우저 종료
    browser.quit()

    return render(request, "market/market_list.html")
