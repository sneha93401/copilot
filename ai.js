const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#delete-btn");

let userText = null;
const API_KEY = "gAAAAABl8sUzUA-dmrRc7L6LtKg5em29Sq4sNhggg2b6R517uORDYRaOP2nA840JuN8-GcBXDNN5oCSo5WODrAjpPEcNF94dy2j2evWHex9__NG_1cTssEn4YBYf2Y-Mk6HIro5N_t53"

const loadDataFromLS = () => {
    const themeColor = localStorage.getItem("themeColor");

    document.body.classList.toggle("light-mode", themeColor === "light_mode");
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";

    const defaultText = `<div class="default-text">
<img src="images/Copilot-Logo.png" alt="chatbot-img" width="200px">                            <h1>CO-PILOT</h1>
                            <p> Hey There! <br> Start Asking me.</p>
                        </div>`

    chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
}

const createChatElement = (content, className) => {
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = content;
    return chatDiv;
}

// Function to get response from ChatGPT API
const getChatResponse = async (incomingChatDiv) => {
    const API_URL = "https://api.textcortex.com/v1/codes";
    const pElement = document.createElement("p");
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${API_KEY}` },
        body: JSON.stringify({
            model: "icortex-1",
            max_tokens: 2048,
            temperature: 0.2,
            n: 1,
            mode: "javascript",
            text: userText
        })
        // body: '{"max_tokens":2048,"mode":"python","model":"icortex-1","n":1,"temperature":0,"text":"string"}'
    };

    try {
        // Fetching response from API
        const response = await (await fetch(API_URL, options)).json();
        const responseContent = response.data.outputs[0].text;
        console.log(responseContent);

        // Splitting response into words
        const words = responseContent.split(" ");

        // Showing animation by revealing each word with a delay
        for (let i = 0; i < words.length; i++) {
            setTimeout(() => {
                pElement.textContent += words[i] + " ";
                chatContainer.scrollTo(0, chatContainer.scrollHeight);
            }, i * 100); // Adjust the delay (in milliseconds) as needed
        }
    } catch {
        // Handling errors
        pElement.classList.add("error");
        pElement.textContent = "Oops! Something went wrong while retrieving the response. Please try again.";
    }

    // Displaying response in chat container
    incomingChatDiv.querySelector(".typing-animation").remove();
    incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
}

const copyResponse = (copyBtn) => {
    const reponseTextElement = copyBtn.parentElement.querySelector("p");
    navigator.clipboard.writeText(reponseTextElement.textContent);
    copyBtn.textContent = "done";
    setTimeout(() => copyBtn.textContent = "content_copy", 200);
}

const showTypingAnimation = () => {
    const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="Copilot-Logo.png" alt="chatbot-img">
                        <div class="typing-animation">
                            <div class="typing-dot" style="--delay: 0.2s"></div>
                            <div class="typing-dot" style="--delay: 0.3s"></div>
                            <div class="typing-dot" style="--delay: 0.4s"></div>
                        </div>
                    </div>
                    <span onclick="copyResponse(this)" class="material-symbols-rounded" id="copy_content">content_copy</span>
                </div>`;
    const incomingChatDiv = createChatElement(html, "incoming");
    chatContainer.appendChild(incomingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    getChatResponse(incomingChatDiv);
}

const handleOutgoingChat = () => {
    userText = chatInput.value.trim();
    if (!userText) return;

    chatInput.value = "";
    chatInput.style.height = `${initialInputHeight}px`;

    const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="womenimg1.webp" alt="user-img">
                        <p>${userText}</p>
                    </div>
                </div>`;

    const outgoingChatDiv = createChatElement(html, "outgoing");
    chatContainer.querySelector(".default-text")?.remove();
    chatContainer.appendChild(outgoingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    setTimeout(showTypingAnimation, 500);
}

deleteButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all the chats?")) {
        localStorage.removeItem("all-chats");
        loadDataFromLS();
    }
});

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    localStorage.setItem("themeColor", themeButton.innerText);
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";
});

const initialInputHeight = chatInput.scrollHeight;

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${initialInputHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleOutgoingChat();
    }
});

window.addEventListener("beforeunload", () => {
    localStorage.setItem("userInput", chatInput.value);
    localStorage.setItem("all-chats", chatContainer.innerHTML);
});

window.addEventListener("load", () => {
    chatInput.value = localStorage.getItem("userInput");
    loadDataFromLS();
});

sendButton.addEventListener("click", handleOutgoingChat);


document.addEventListener('DOMContentLoaded', () => {
    const newChatButton = document.getElementById('new-chat-btn');
    const previousChatsContainer = document.querySelector('.chat-list');
    let chatIndex = localStorage.getItem('chatIndex') ? parseInt(localStorage.getItem('chatIndex'), 10) : 0;
    let currentChatId = "current-chat";
  
    loadPreviousChats();
    loadCurrentChat();
  
    newChatButton.addEventListener('click', () => {
      saveCurrentChat(true); // Passing true to indicate starting a new chat
      clearCurrentChat();
      loadDefaultText();
    });
  
    function saveCurrentChat(isNewChat = false) {
      const currentChatHTML = chatContainer.innerHTML;
      if (!currentChatHTML || chatContainer.querySelector('.default-text') && !isNewChat) {
        // Avoid saving if the default message is the only content and not starting a new chat
        return;
      }
      if (isNewChat) {
        chatIndex++;
        currentChatId = `chat-${chatIndex}`;
      }
      localStorage.setItem(currentChatId, currentChatHTML);
      localStorage.setItem('chatIndex', chatIndex.toString());
      if (isNewChat) {
        addChatToList(currentChatId);
      }
      updateLocalStorageForChatList();
    }
  
    function clearCurrentChat() {
      chatContainer.innerHTML = '';
    }
  
    function loadCurrentChat() {
      const savedCurrentChat = localStorage.getItem(currentChatId);
      if (savedCurrentChat) {
        chatContainer.innerHTML = savedCurrentChat;
      } else {
        loadDefaultText();
      }
    }
  
    function loadPreviousChats() {
      previousChatsContainer.innerHTML = ''; // Clear existing list to avoid duplication
      for (let i = 1; i <= chatIndex; i++) {
        addChatToList(`chat-${i}`);
      }
    }
  
    function addChatToList(chatId) {
      const chatItem = document.createElement('li');
      chatItem.classList.add('chat-item');
      chatItem.textContent = chatId;
      chatItem.onclick = () => {
        saveCurrentChat();
        currentChatId = chatId;
        chatContainer.innerHTML = localStorage.getItem(chatId);
      };
      previousChatsContainer.appendChild(chatItem);
    }
  
    function loadDefaultText() {
      const defaultText = `<div class="default-text"><h1>CO-PILOT</h1><p>Hey There! <br> Start Asking me.</p></div>`;
      chatContainer.innerHTML = defaultText;
      // If a default text is being loaded, it means we are ready to start a new chat session
      currentChatId = "current-chat";
    }
  
    function updateLocalStorageForChatList() {
      // This function ensures that the chat list in the sidebar is updated in localStorage
      // This is just a placeholder for additional logic that might be required to manage the chat list
    }
  });





  
  
