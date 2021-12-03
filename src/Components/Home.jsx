import React from "react";
import Cards from "./Cards";
import styled from "styled-components";
import Filtro from "./Filtro";

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




class Home extends React.Component {
  state = {
    produtos: [
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

  render() {
    const listaDeProdutos = this.state.produtos
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
        return <Cards key={produto.id} produtos={produto} />;
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
          <Produtos>{listaDeProdutos}</Produtos>
        </div>
      </Body>
    );
  }
}

export default Home;
