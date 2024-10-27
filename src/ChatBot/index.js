import React, { useEffect } from 'react';
import $ from "jquery"
function ChatBot() {
      
      const chatStripe = (isAi,value,uniqueId) =>{
        return(
          `
            <div class="wraooer ${isAi && 'ai'}">
              <div class="chat">
                <div class = "profile">
                  <img
                    src="${isAi ? "bot.svg" : "user.svg"}"
                    alt="${isAi? 'bot' : 'user'}"
                  />
                </div>
                <div class = "message" id=${uniqueId}>${value}</div>
              </div>
            </div>
          `
        )
      }


    const handleSubmit = async (e) =>{
      const quest = document.getElementById("prompt").value;
      const location = document.getElementById("location").value;
      window.location.href="?location="+location +"&question=" + quest;
      e.preventDefault();
    }

    const openChat = () =>{
      const chatContainer = document.querySelector('#chat_container');


        if($(".chat-app").hasClass("active")){
            $(".chat-app").removeClass("active");
            chatContainer.innerHTML="";
        }else{
            $(".chat-app").addClass("active");
            chatContainer.innerHTML+=chatStripe(true,"Hello, how may I help you?","firstMessage")
        }
    }

    useEffect(()=>{
        document.getElementById("prompt").addEventListener('keyup', (e)=>{
            if(e.keyCode ===13){
              handleSubmit(e);
            }
          })
    }) 

    return (
            <div id="app" className='chat-bot'>
                <div className='chat-app'>
                    {/* <div id="chat_container"></div> */}
                    <input name="location" id="location" placeholder='Location'></input>
                    <textarea name="prompt" id="prompt" rows="1" cols="1" placeholder="Ask...."></textarea>
                    <button type="submit" onClick={handleSubmit}><img src="send.svg"></img></button>
                </div>
                <button id='message-button' onClick={openChat}>
                    <i className="fa fa-commenting-o"></i>
                  </button>
            </div>
    );
}

export default ChatBot;