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
              value: 10000.0,
              imageUrl: "https://picsum.photos/200/200?random=2",
            },
      
            {
              id: 3,
              name: "Mercury-Atlas 6",
              value: 10000.0,
              imageUrl: "https://picsum.photos/200/200?random=3",
            },
      
            {
              id: 4,
              name: "Mercury-Atlas 6",
              value: 10000.0,
              imageUrl: "https://picsum.photos/200/200?random=4",
            },
          ]
      
    }

    
  render() {

    const listaDeProdutos = this.state.produtos.map((produto) => {
        return (
            <Cards 
            key={produto.id}
            produtos={produto}
            />
        )
    })


    return(
      <div>
          <p>Produtos disponíveis:</p>
          <div>
              <label>Ordernar por ordem:</label>
              <select>
                  <option>Crescente</option>
                  <option>Decrescente</option>
              </select>
          </div>
          <div>{listaDeProdutos}</div>
      </div>
    )
  }
}

export default Home;
