import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Listing from './Listing/Listing';
import Details from './Details/Details';
import axios from 'axios';


import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []


        };
    }

    componentDidMount() {
        axios.get(`http://gointegrationstest-env.udtc3wsdke.us-east-2.elasticbeanstalk.com/products`)
            .then(res => {
                const data = res.data.Items;
                this.setState({data});

            })
    }

    render() {
        return (
            <Router>
                <div>


                    <Switch>
                        <Route path="/:id" component={Details}/>
                        <Route path="/" render={(props) => <Listing {...props} data={this.state.data}/>}/>


                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
