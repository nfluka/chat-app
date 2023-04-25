import { useState } from 'react'
import { getRandomColor } from '../utils/getRandomColor'

const Login = ({ setIsLogedIn, setCurrentUser }) => {

    const [memberName, setMemberName] = useState(null)
    const [memberColor, setMemberColor] = useState(getRandomColor())
  
    function handleSubmit(event) {
      event.preventDefault()
  
      if(!memberName) {
        return console.log("No name enterd!")
      }
      setCurrentUser({ memberName, memberColor })
      setIsLogedIn(true)
    }
  
    return (
      <form onSubmit={handleSubmit} className="login">
        <h2 className="login__title">Login</h2>
        
        <label className='login__label' htmlFor="name">Name </label>
        <input onChange={e => setMemberName(e.target.value.trim())} id="name" className="login__name" type="text" placeholder='Enter your name'/>
  
        <button className="login__btn">Start chat</button>
      </form>
    )
  }

  export default Login