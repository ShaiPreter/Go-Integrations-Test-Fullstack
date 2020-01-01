import React, {Component} from 'react';
import './Listing.css';
import Product from "../Product/Product";
import {Link} from "react-router-dom";

class Listing extends Component {
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
            <div className={'container'}>

                {this.props.data.map((product, index) => {
                    return product.image && (
                        <Link className={'box'} key={index} to={'/' + product.id}><Product product={product}/></Link>)
                })}

            </div>
        );
    }
}

export default Listing;