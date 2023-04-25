
import { useEffect, useState } from 'react'
import Login from './components/Login'
import Chat from './components/Chat'

import './App.css'


const CHANELL_ID = import.meta.env.VITE_CHANELL_ID
const ROOM_NAME = import.meta.env.VITE_ROOM_NAME

function App() {

  const [drone, setDrone] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [isLogedIn, setIsLogedIn] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [membersList, setMembersList] = useState([])
  const [messages, setMessages] = useState([])
  
  useEffect(()=> {

    if(isLogedIn && !isConnected) {
        const scaledrone = new Scaledrone(CHANELL_ID, { currentUser });
        setDrone(scaledrone)
        setIsConnected(true)
    }
      
    if(drone) {

      drone.on("open", (error) => {

        if(error) return console.log("Errror connecting to Scaledrone!")
        setCurrentUser({ ...currentUser, id: drone.clientId })
        
      })

      const room = drone.subscribe(ROOM_NAME)

      room.on("message", message => setMessages(prev => [...prev, message]))
      
      room.on("members", members => setMembersList([...members]))
      
      room.on("member_join", member => setMembersList(prev => [...prev, member]))
      
      room.on("member_leave", members => {
        setMembersList(prev => prev.filter(member => member.id !== members.id))
      })
    }
  }, [isLogedIn, drone])

  return (
    <div className="App">
      
      {
        isLogedIn ? 
          <Chat
            roomName={ROOM_NAME}
            currentUser={currentUser}
            drone={drone}
            membersList={membersList} 
            messages={messages}/>
            
          :<Login 
            setIsLogedIn={setIsLogedIn} 
            setCurrentUser={setCurrentUser} />
      }
    
    </div>
  )
}

export default App
