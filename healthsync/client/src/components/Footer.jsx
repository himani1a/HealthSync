import React from 'react';
import { MDBFooter, MDBContainer, MDBBtn, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

export default function App() {
  return (
    <MDBFooter className='text-center text-white' style={{ backgroundColor: '#f1f1f1' }}>
      <MDBContainer className='pt-4'>
      <MDBRow className='mb-4'>
          <MDBCol>
            <img
              src="../src/assets/healthsync.png" // Replace "logo-url-here" with your actual logo URL
              alt="Logo"
              style={{ maxWidth: '100px', backgroundColor: '#f1f1f1' }} // Adjust size as needed
            />
          </MDBCol>
        </MDBRow>
        <section className='mb-4'>
          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1'
            href='#!'
          >
            <FontAwesomeIcon icon={faFacebookF} style={{ color: 'white' }}/>
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1'
            href='#!'
          >
            <FontAwesomeIcon icon={faTwitter} style={{ color: 'white' }}/>
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1'
            href='#!'
          >
            <FontAwesomeIcon icon={faGoogle} style={{ color: 'white' }}/>
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1'
            href='#!'
          >
            <FontAwesomeIcon icon={faInstagram} style={{ color: 'white' }}/>
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1'
            href='#!'
          >
            <FontAwesomeIcon icon={faLinkedin} style={{ color: 'white' }}/>
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1'
            href='#!'
          >
            <FontAwesomeIcon icon={faGithub} style={{ color: 'white' }} />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div className='text-center text-dark p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2024 Copyright |  | HEALTHSYNC
      
      </div>
    </MDBFooter>
  );
}
