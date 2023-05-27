import { useNavigate } from 'react-router-dom';
import './styles/NotAuthorized.css'

export default function NotAuthorized() {
  const navigate = useNavigate();

  return (
    <div className='not'>
      <div>Not Authorized. You must be logged to use the app.</div>
      <button onClick={() => {navigate('/');}}>Login</button>
    </div>
  )
}
