import React from 'react'
import  CarrinhoItems from './CarrinhoItems'
import styled from 'styled-components';

const CarrinhoContainer = styled.div`
  border: 1px solid black;
  padding: 8px;
`;

const ContainerLista = styled.div`
  display: grid;
  gap: 8px;
`

class Carrinho extends React.Component {
  getTotalValue = () => {
    let totalValue = 0

    for(let product of this.props.productsInCart) {
      totalValue += product.value * product.quantity
    }

    return totalValue
  }

  render() {
    return <CarrinhoContainer>
      <h3>Carrinho:</h3>
      <ContainerLista>
        {this.props.productsInCart.map((product) => {
          return <CarrinhoItems 
                    cartItem={product} 
                    onRemoveProductFromCart={this.props.onRemoveProductFromCart}
                  />
        })}
      </ContainerLista>
      <p><b>Valor total: R$ {this.getTotalValue() } ,00</b></p>
    </CarrinhoContainer>
  }
}

export default Carrinho;
