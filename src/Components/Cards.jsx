import React from "react";


class Cards extends React.Component {
    render() {
        return (
            <div>
                <img src={this.props.produtos.imageUrl} /> 
                <div>
                    <p> {this.props.produtos.name} </p>
                    <p> R$ {this.props.produtos.value} ,00 </p>
                    <button> Adicionar </button>
                </div>
            </div>
        )
    }
}
export default Cards;