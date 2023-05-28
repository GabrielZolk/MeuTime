import './styles/Header.css';
import image from '/user.png';

interface Header {
    children: string;
}

export default function Header({ children }: Header) {
    return (
        <div className='container'>
            <div className='container-box'>
                <div className='logo'>MeuTime</div>
                <div className='user'>
                    <div className='key'>Olá, {children}</div>
                    <img src={image}></img>
                </div>
            </div>
        </div>
    )
}
