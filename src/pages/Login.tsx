import { useState } from 'react';
import './styles/Login.css'

export default function Login() {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <div className='container'>
            <div className='container-box'>
                <h1>Insira sua API-KEY para fazer Login</h1>
                <form>
                    <input
                        type="text"
                        placeholder='Api-Key Here!'
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

