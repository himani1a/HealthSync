import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Swal from 'sweetalert2'; // Import SweetAlert2
import Navbar1 from '../components/Navbar'
function Video() {
    const [value, setValue] = useState(''); 
    const navigate = useNavigate();
   


    // const handleJoinRoom = useCallback(() => {
    //     navigate(`/room/${value}`);
    // }, [navigate, value]);
    const handleJoinRoom = useCallback(() => {
      Swal.fire({
          title: 'Payment Required',
          text: 'You need to pay first to continue.',
          icon: 'warning',
          confirmButtonText: 'Go to Payment',
          cancelButtonText: 'Cancel',
          showCancelButton: true,
      }).then((result) => {
          if (result.isConfirmed) {
              navigate('/PaymentPage');
          }
      });
  }, [navigate]);
    

    return (
        <div>
        <div><Navbar1 /></div>
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="input-group mb-3">
                        <input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            type="text"
                            id="room-input"
                            className="form-control"
                            placeholder="Enter Room ID"
                            aria-label="Room ID"
                        />
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={handleJoinRoom}
                        >
                            Join Room
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
         
    );
}

export default Video;
