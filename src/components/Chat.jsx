import { useState } from 'react'
import Message from './Message'

const Chat = ({ drone, currentUser, membersList, messages, roomName }) => {

    const [currentMessage, setCurrentMessage] = useState("")
  
    function sendMessage() {
      if(currentMessage !== "") {      
        drone.publish({
          room: roomName,
          message: {currentMessage, currentUser}
        })
  
      setCurrentMessage("")
      }
    }
  
    function handleSubmit(e) {
      e.preventDefault()
      sendMessage()
      setCurrentMessage("")
    }
  
  
    return (
      <div className='chat'>
        <div className='chat__title'>
          <span className='dot'></span>
          { membersList.length > 1 ? ` ${membersList.length} Members Online` : ` Only you in Chat` }
          <h1>Welcome <span className='chat__member-name'> {currentUser.memberName} </span></h1> 
        </div>
        
        <div className="chat__messages">
          {
            messages.map(message => <Message key={message.id} message={message} currentUser={currentUser} />)
          }
        </div>
  
        <form onSubmit={handleSubmit} className="chat-input">
          <input className='chat-input__message' type='text' onChange={e => setCurrentMessage(e.target.value)} value={currentMessage} placeholder='Enter Message and hit send' />
          <button className='chat-input__btn'>Send</button>
        </form>
      </div>
    )
  }

  export default Chat