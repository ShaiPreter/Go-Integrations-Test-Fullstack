import React, {Component} from 'react';
import './Product.css';

class Product extends Component {
    constructor(props) {
        super(props);

    }

    // componentWillMount(){}
    // componentDidMount(){}
    // componentWillUnmount(){}

    // componentWillReceiveProps(){}
    // shouldComponentUpdate(){}
    // componentWillUpdate(){}
    // componentDidUpdate(){}

    render() {
        return (
            <div className={'center'}>
                <img src={this.props.product.image.src}/>
                <h6>{this.props.product.title}</h6>
                <h6>${this.props.product.variants[0].price * .75}</h6>
            </div>
        );
    }
}

export default Product;