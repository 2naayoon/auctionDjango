from django.shortcuts import render
from django.http import JsonResponse
from openai import OpenAI
import os

client = OpenAI(
  api_key=os.environ['OPENAI_API_KEY'],  # this is also the default, it can be omitted
)

def ask_openai(message):
    response = client.chat.completions.create(
        # model = "gpt-3.5-turbo-instruct",
        # 파인튠 모델로 교체
        model = "ft:gpt-3.5-turbo-0125:personal:auchat:9jctHzxj",
        messages=[
            {"role": "system", "content": "옥션아레나의 고객센터 챗봇 옥챗입니다."},
            {"role": "user", "content": message}
        ],
        max_tokens =150,
        temperature=0.7,
    )

    print(response)
    answer = response.choices[0].message.content.strip()  # message의 content 속성에 접근
    return answer

def chatbot(request):
    if request.method == 'POST':
        message = request.POST.get('message')
        # response = 'Hi this is my response'
        response = ask_openai(message)
        return JsonResponse({'message':message, 'response': response})
    return render(request, 'chatbot/chatbot.html')
