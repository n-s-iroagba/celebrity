import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/styles/Auth.css'

const AuthOption: React.FC<{
  route: string;
  title: string;
  buttonText: string;

}> = ({ route, title, buttonText, }) => {
  const navigate = useNavigate();

  return (
    <div className='d-flex flex-column align-items-center justify-content-center' >
      <div className='w-100 d-flex align-items-center mb-3'>
        <div className='auth-line'></div>
        <small className='mx-1 inline-block'>{title}</small>
        <div className='auth-line'></div>
      </div>

      <div className='px-5 w-100 d-flex justify-content-center'>
        <button onClick={() => navigate(`/${route}`)} className='auth-button'>
          {buttonText}
        </button>
      </div>
    </div>
  );
};


export default AuthOption
