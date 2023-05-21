import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import NotAuthorized from '../components/NotAuthorized';

export default function CountrySelection() {
    const isLogged = useSelector((state: RootState) => state.login);

  return (
    isLogged ?
    <div>CountrySelection</div> : <NotAuthorized />
  )
}
