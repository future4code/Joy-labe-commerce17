import React from "react";
import Cards from "./Cards";

class Home extends React.Component {

    state = {
        produtos: [
            {
              id: 1,
              name: "Mercury-Atlas 6",
              value: 10000.0,
              imageUrl: "https://picsum.photos/200/200?random=1",
            },
      
            {
              id: 2,
              name: "Mercury-Atlas 6",
              value: 20000.0,
              imageUrl: "https://picsum.photos/200/200?random=2",
            },
      
            {
              id: 3,
              name: "Mercury-Atlas 6",
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

        filtro: "crescente"
      
    };

    onChangeFilter = (event) => {
      console.log(event.target.value)
      this.setState({ filtro: event.target.value})
    }

  ordenaProdutos = (value) => {
    if (value === "crescente"){
      return (produto1, produto2) => produto1.value - produto2.value
    }else{return (produto1, produto2) => produto2.value - produto1.value}
    
  }
  render() {
    
    const listaDeProdutos = this.state.produtos.sort(this.ordenaProdutos(this.state.filtro)).map((produto) => {
        return (
            <Cards 
            key={produto.id}
            produtos={produto}
            />
        )
    })
   
    return(
      <div>
          <p>Produtos disponíveis: 4 </p>
          <div>
              <label>Ordernar por ordem:</label>
              <select value={this.state.filtro} onChange={this.onChangeFilter}>
                  <option value="crescente" >Crescente</option>
                  <option value="decrescente" >Decrescente</option>
              </select>
          </div>
          <div>{listaDeProdutos}</div>
      </div>
    )
  }
}

export default Home;
