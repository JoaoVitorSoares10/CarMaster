import React, { useState, useEffect } from 'react';

//CSS
import './styles/App.css'

//Components
import Header from './Components/header'
import { Form } from './Components/form'
import Info from './Components/info'
import { IAPI } from './types/Api'

function App() {
  const [modelAPi, setModelAPi] = useState<[IAPI]>()
  const [yearAPi, setYearAPi] = useState<IAPI>()
  const [ValueAPi, setValueAPi] = useState<IAPI>()

  const [brand, setBrand] = useState<IAPI>()
  const [model, setModel] = useState<IAPI>()
  const [year, setYear] = useState<IAPI>()

  const [next, setNext] = useState<number>(0)
  const [alert, setAlert] = useState<string>('')

  useEffect(() => {
    if(brand){
      fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand}/modelos`)
      .then(response => response.json())
      .then((result) => {
        setModelAPi(result);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, [brand]);

  useEffect(() => {
    if(brand && model){
      fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand}/modelos/${model}/anos`)
      .then(response => response.json())
      .then((result) => {
        setYearAPi(result);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, [model, brand]);

  useEffect(() => {
    if(brand && model && year){
      fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand}/modelos/${model}/anos/${year}`)
      .then(response => response.json())
      .then((result) => {
        setValueAPi(result);
      })
      .catch(error => {
        console.error(error);
      });
    }
    return () => {
      setValueAPi({
        nome: 'string',
        codigo: 'string'
      }); // This worked for me
    };
  }, [year, brand, model]);

  //controla a exibição no componente 'Form' e verifica se foi selecionado corretamente
  const handleNext = (x: number) => {
    if (x === 1) {
      if (brand) {
        setNext(1)
        setAlert('')
      } else {
        setAlert('Selecione uma marca!')
      }
    } else if (x === 2) {
      if (model) {
        setNext(2)
        setAlert('')
      } else {
        setAlert('Selecione um modelo!')
      }
    } else if (x === 3) {
      if (year) {
        setNext(3)
        setAlert('')
      } else {
        setAlert('Selecione o ano!')
      }
    } else {
      setNext(0)
    }
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
  }

  const handleChange = (event: any) => {
    const id = event.target.getAttribute('id')
    if (id === 'brand') {
      setBrand(event.target.value)
    } else if (id === 'model') {
      setModel(event.target.value)
    } else {
      setYear(event.target.value)
    }
  }

  //atribui os valor do select ao state 

  return (
    <div className="container">
      <Header />
      <div className="content">
        <Info />
        <Form
          next={next}
          handleSubmit={handleSubmit}
          handleNext={handleNext}
          handleChange={handleChange}
          modelAPI={modelAPi}
          yearAPI={yearAPi}
          valueAPI={ValueAPi}
        />
        <p className="alert">{alert}</p>
      </div>
    </div>
  );
}

export default App;
