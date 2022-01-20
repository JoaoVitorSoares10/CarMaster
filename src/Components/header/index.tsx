import React from 'react'
//imagens
import logo from '../../assets/img/Icon.png'

//css
import './style.css'

function Header(){
    return(
        <header>
            <img src={logo} alt="logo com um velocimetro com as cores verde, amarelo e vermelho"></img>
            <h1 className="title">CARMASTER</h1>
        </header>
    )
}

export default Header