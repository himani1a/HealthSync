import React,{useState, useCallback} from 'react'
import {useNavigate} from 'react-router-dom';


function HomeVideo() {

    const [value, setvalue] = useState(''); 
    
    const navigate = useNavigate();
    const handleJoinRoom = useCallback(() => {
       navigate(`/room/${value}`);
    }, [navigate, value]);
  return (

    <div>
        <input
        value={value} 
        onChange={(e) => setvalue(e.target.value)}
        type="text" id="room-input" placeholder="Enter Room ID" />   
        <button onClick = {handleJoinRoom}
            id="join-room">Join Room</button>
    </div>
  )
}

export default HomeVideo