import React from "react";
import Cards from "./Cards";
import styled from "styled-components";
import Filtro from "./Filtro";
import Carrinho from './Carrinho';

const Body = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-row-gap: 8px ;
  padding: 16px;
  justify-content: space-around;
`;

const Produtos = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 16px;
  padding: 16px;

`;

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 16px;
`;

const Filter = styled.div`
  border: 1px solid black;
  padding: 8px;
  
`;

const produtos = [
  {
    id: 1,
    name: "Sputnik 1",
    value: 10000.0,
    imageUrl: "https://picsum.photos/200/200?random=1",
    
  },

  {
    id: 2,
    name: "Apollo 11",
    value: 20000.0,
    imageUrl: "https://picsum.photos/200/200?random=2",
    
  },

  {
    id: 3,
    name: "Crew Dragon",
    value: 30000.0,
    imageUrl: "https://picsum.photos/200/200?random=3",
    
  },

  {
    id: 4,
    name: "Mercury-Atlas 6",
    value: 40000.0,
    imageUrl: "https://picsum.photos/200/200?random=4",
  },
]


class Home extends React.Component {
  state = {
    productsInCart: [
      {
        id: 1,
        name: "Sputnik 1",
        value: 10000.0,
        imageUrl: "https://picsum.photos/200/200?random=1",
        quantity: 2
      },

      {
        id: 2,
        name: "Apollo 11",
        value: 20000.0,
        imageUrl: "https://picsum.photos/200/200?random=2",
        quantity: 2
      },

      {
        id: 3,
        name: "Crew Dragon",
        value: 30000.0,
        imageUrl: "https://picsum.photos/200/200?random=3",
        quantity: 2
      },

      {
        id: 4,
        name: "Mercury-Atlas 6",
        value: 40000.0,
        imageUrl: "https://picsum.photos/200/200?random=4",
        quantity: 2
      },
    ],

    filtro: "",
    query: "",
    minPrice: "",
    maxPrice: "",
    
  };

  onChangeFilter = (event) => {
    console.log(event.target.value);
    this.setState({ filtro: event.target.value });
  };

  ordenaProdutos = (value) => {
    if (value === "decrescente") {
      return (produto1, produto2) => produto2.value - produto1.value;
    } else {
      return (produto1, produto2) => produto1.value - produto2.value;
    }
  };

  updateQuery = (event) => {
    this.setState({
      query: event.target.value,
    });
  };

  updateMinPrice = (event) => {
    this.setState({
      minPrice: event.target.value,
    });
  };

  updateMaxPrice = (event) => {
    this.setState({
      maxPrice: event.target.value,
    });
  };

  onAddProductToCart = (productId) => {
    const productInCart = this.state.productsInCart.find(product => productId === product.id)
    console.log("Clicou")

    if(productInCart) {
      const newProductsInCart = this.state.productsInCart.map(product => {
        if(productId === product.id) {
          return {
            ...product,
            quantity: product.quantity + 1
          }
        }

        return product
      })

      this.setState({productsInCart: newProductsInCart})
    } else {
      const productToAdd = produtos.find(product => productId === product.id)

      const newProductsInCart = [...this.state.productsInCart, {...productToAdd, quantity: 1}]

      this.setState({productsInCart: newProductsInCart})
    }
  }

  onRemoveProductFromCart = (productId) => {
    const newProductsInCart = this.state.productsInCart.map((product) => {
      if(product.id === productId) {
        return {
          ...product,
          quantity: product.quantity - 1
        }
      }
      return product
    }).filter((product) => product.quantity > 0)

    this.setState({productsInCart: newProductsInCart})
  }

  render() {
    const listaDeProdutos = produtos
      .sort(this.ordenaProdutos(this.state.filtro))
      .filter((produto) => {
        return produto.name
          .toLowerCase()
          .includes(this.state.query.toLowerCase());
      })
      .filter((produto) => {
        return (
          this.state.minPrice === "" || produto.value >= this.state.minPrice
        );
      })
      .filter((produto) => {
        return (
          this.state.maxPrice === "" || produto.value <= this.state.maxPrice
        );
      })
      .map((produto) => {
        return <Cards onAddProductToCart={this.onAddProductToCart} key={produto.id} produtos={produto} />;
      });

      
    return (
      <Body>

        <Filter>
          <h2>Filtros</h2>
          <div>
            <label>Valor Mínimo:</label>
            <input
              type="number"
              value={this.state.minPrice}
              onChange={this.updateMinPrice}
            />
          </div>

          <div>
            <label>Valor Máximo:</label>
            <input
              type="number"
              value={this.state.maxPrice}
              onChange={this.updateMaxPrice}
            />
          </div>
          <div>
            <label>Busca por nome:</label>
            <input
              type="text"
              placeholder="Pesquisa"
              value={this.state.query}
              onChange={this.updateQuery}
            />
          </div>
        </Filter>

        <div>
          <Section>
            <p>Produtos disponíveis: {listaDeProdutos.length} </p>
            <label>
              Ordernação:
              <select value={this.state.filtro} onChange={this.onChangeFilter}>
                <option value="crescente">Crescente</option>
                <option value="decrescente">Decrescente</option>
              </select>
            </label>
          </Section>
          <Produtos onAddProductToCart={this.props.onAddProductToCart}>{listaDeProdutos}</Produtos>
        </div>
        <Carrinho
          productsInCart={this.state.productsInCart}
          onRemoveProductFromCart={this.onRemoveProductFromCart}
        />
      </Body>
    );
  }
}

export default Home;
