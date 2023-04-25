import formatDate from "../utils/formatDate"
  
const Message = ({ message, currentUser }) => {

    const memberColor = message.data.currentUser.memberColor
    const isCurrentUser = message.member.id === currentUser.id

    return (
        <div style={isCurrentUser ? { borderColor: memberColor } : null} className={ `message ${ isCurrentUser ? "me":"other" }` }>
        <div className='message-header'>
            <strong>{message.data.currentUser.memberName}</strong> @ 
            <em>{ formatDate(message.timestamp) }</em>
        </div>
        
        <div className='message-text'>{ message.data.currentMessage }</div>
        </div>
    )
  }

  export default Message