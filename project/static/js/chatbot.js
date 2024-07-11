
// 비동기 처리(서버 응답을 받은 후의 작업) 
const messagesList = document.querySelector('.messages-list');
const messageForm = document.querySelector('.message-form');
const messageInput = document.querySelector('.message-input');
const massgebox = document.querySelector('.messages-box');
const sendBtn = document.querySelector(".btn-send");

// Function to send a message (both from buttons and input form)
function sendMessage(message) {
  const messageItem = document.createElement('li');
  messageItem.classList.add('message', 'sent');
  messageItem.innerHTML = `
    <div class="message-text">
      <div class="message-sender">
        <b>You</b>
      </div>
      <div class="message-content">
        ${message}
      </div>
    </div>`;
  messagesList.appendChild(messageItem);

  massgebox.scrollTop = massgebox.scrollHeight;
  
  fetch('', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      'csrfmiddlewaretoken': document
        .querySelector('[name=csrfmiddlewaretoken]')
        .value,
      'message': message
    })
  })
    .then(response => response.json())
    .then(data => {
      const response = data.response;
      const messageItem = document.createElement('li');
      messageItem.classList.add('message', 'received');
      messageItem.innerHTML = `
        <div class="message-text">
          <div class="message-sender">
            <b>Auchat</b>
          </div>
          <div class="message-content">
            ${response}
          </div>
        </div>`;
      messagesList.appendChild(messageItem);
      massgebox.scrollTop = massgebox.scrollHeight;
    })
    .catch(error => console.error('Error:', error));

}

// 채팅 입력
messageForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const message = messageInput.value.trim();
  if (message.length === 0) {
    return;
  }

  sendMessage(message); // Send the typed message
  messageInput.value = ''; // Clear the input field
  sendBtn.disabled = true;
});


// 인풋 텍스트 입력 시 버튼 활성화
messageInput.addEventListener("input", () => {
  if (messageInput.value.trim() !== '') {
    sendBtn.disabled = false;
  } else {
    sendBtn.disabled = true;
  }
})
