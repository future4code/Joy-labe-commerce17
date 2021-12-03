import React from "react";
import styled from 'styled-components';

const CardProduto = styled.div`
display: grid;
grid-template-rows: 3fr 1fr;
grid-template-columns: 1fr;
justify-items: center;
border: 1px solid black;
border-radius: 8px;
box-shadow: rgb(163 163 163) 3px 3px 8px;
margin: 5px;
`;
const ImgProduto = styled.img`
width: 100%;
height: 200px;
`;
const InfoProdutos = styled.p`
    font-size: 20px;
    
    
`;
const BotaoAdd =  styled.button`
margin-top: 8px;
margin-bottom: 10px;
width: 80%;
padding: 0.5rem 0px;
border-radius: 10px;
border: 1px solid ;
background: #111;
color: #fff;
font-size: 15px;
text-transform: uppercase;
cursor:pointer;
:hover{
 background-color: yellow;
 color: #111;
 border: none;
 font-weight: bold;
}
`;

class Cards extends React.Component {
    render() {
        return (
            <div>
                <CardProduto>
                    <ImgProduto src={this.props.produtos.imageUrl} alt="Imagem produto" /> 
                        <InfoProdutos> {this.props.produtos.name} </InfoProdutos>
                        <InfoProdutos> R$ {this.props.produtos.value} ,00 </InfoProdutos>
                        <BotaoAdd> Adicionar </BotaoAdd>
                </CardProduto>
            </div>
        )
    }
}
export default Cards;