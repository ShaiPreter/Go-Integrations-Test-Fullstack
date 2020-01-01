import React, {Component} from 'react';
import './Details.css';
import axios from "axios";

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}

        };
        this.handleClick = this.handleClick.bind(this);
    }


    componentDidMount() {
        axios.get(`http://gointegrationstest-env.udtc3wsdke.us-east-2.elasticbeanstalk.com/products/` + this.props.match.params.id)
            .then(res => {
                const data = res.data.Item;

                this.setState({data});


            })
    }

    handleClick() {
        console.log("clicked");
        axios.post(
            'http://gointegrationstest-env.udtc3wsdke.us-east-2.elasticbeanstalk.com/buy',
            this.state.data,
            {headers: {'Content-Type': 'application/json'}}
        ).then((response) => {
                console.log(response.data);
            }
        )

    }

    render() {

        return (

            <div>
                {this.state.data.image &&
                <div>
                    <div>
                        <img className={'col1'} src={this.state.data.image.src}/>
                        <div className={'col2'}>
                            <h3>{this.state.data.title}</h3>
                            <h6>{this.state.data.body_html}</h6>
                            <h6>{this.state.data.variants[0].price * .75}</h6>
                        </div>
                    </div>
                    <button className={'button'} onClick={this.handleClick}>Buy</button>
                </div>}
            </div>
        );
    }
}

export default Details;