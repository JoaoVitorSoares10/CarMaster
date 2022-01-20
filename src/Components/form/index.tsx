import { useState, useEffect } from "react";
import { IAPI } from '../../types/Api'

type Props = {
    next: number;
    handleSubmit: (event: any) => void;
    handleNext: (x: number) => void;
    handleChange: (event: any) => void;
    modelAPI: any;
    yearAPI: any;
    valueAPI: any;
};

export const Form = (props: Props) => {
    const [brandAPI, setBrandAPI] = useState<[IAPI]>()

    //Resultado das marcas vindas da API
    useEffect(() => {
        fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas')
            .then(response => response.json())
            .then((result) => {
                setBrandAPI(result)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const listItemsBrand = brandAPI?.map(
        (number) =>
            <option key={number.codigo} value={number.codigo}>{number.nome}</option>
    );

    const listItemsModel = props.modelAPI?.modelos.map(
        (number: IAPI) =>
            <option key={number.codigo} value={number.codigo}>{number.nome}</option>
    );

    //lista os anos
    const listItemsYear = props.yearAPI?.map(
        (number: IAPI) =>
            <option key={number.codigo} value={number.codigo}>{number.nome}</option>
    );


    if (props.next === 1) {
        return (
            <form onSubmit={(event) => props.handleSubmit(event)}>
                <h2>MODELO</h2>
                <div className="box">
                    <select id="model" onChange={(event) => props.handleChange(event)}>
                        <option>SELECIONE</option>
                        {listItemsModel}
                    </select>
                </div>
                <input onClick={() => props.handleNext(2)} className="button button1" type="submit" value="Próximo" />
            </form>
        )
    } else if (props.next === 2) {
        //exibe os anos
        return (
            <form onSubmit={(event) => props.handleSubmit(event)}>
                <h2>ANO</h2>
                <div className="box">
                    <select onChange={(event) => props.handleChange(event)} id="year" >
                        <option>SELECIONE</option>
                        {listItemsYear}
                    </select>
                </div>
                <input onClick={() => props.handleNext(3)} className="button button1" type="submit" value="Buscar" />
            </form>
        )
    } else if (props.next === 3) {
        //exibe os resultados
        return (
            <div className="result">
                <h1>Resultado</h1>
                <table>
                    <tbody>
                    <tr className="rowPrincipal">
                        <th>Valor</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                    </tr>
                    <tr>
                        <td>{props.valueAPI.Valor}</td>
                        <td>{props.valueAPI.Marca}</td>
                        <td>{props.valueAPI.Modelo}</td>
                    </tr>
                    <tr className="rowPrincipal">
                        <th>Ano</th>
                        <th>Combustivel</th>
                        <th>CodigoFipe</th>
                    </tr>
                    <tr>
                        <td>{props.valueAPI.AnoModelo}</td>
                        <td>{props.valueAPI.Combustivel}</td>
                        <td>{props.valueAPI.CodigoFipe}</td>
                    </tr>
                    <tr className="rowPrincipal">
                        <th>Mês de Referência</th>
                        <th>Tipo de Veículo</th>
                        <th>Sigla Combustivel</th>
                    </tr>
                    <tr>
                        <td>{props.valueAPI.MesReferencia}</td>
                        <td>{props.valueAPI.TipoVeiculo}</td>
                        <td>{props.valueAPI.SiglaCombustivel}</td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    } else {
        //exibe as marcas
        return (
                <div>
                    <form onSubmit={(event) => props.handleSubmit(event)}>
                        <h2>MARCA: </h2>
                        <div className="box">
                            <select onChange={(event) => props.handleChange(event)} id="brand">
                                <option value='0'>SELECIONE</option>
                                {listItemsBrand}
                            </select>
                        </div>
                        <input onClick={() => props.handleNext(1)} className="button button1" type="submit" value="Próximo" />
                    </form>
                </div>
                );
    }
};

