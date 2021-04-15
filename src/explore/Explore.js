import React from 'react';
import API from '../API';

class Explore extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            photo: ""
        };
    }

    async componentDidMount() {
        let photo = await API.getGooglePhoto("ATtYBwJqoB-CGGVn96X3n8xnvzTyBLJbkCoTXYhJmwfmUHqnSthoYYzhwykoBi5ee1IVe_0hN7ug9vHJ-a2GJC0GAUY0AtnTI1E6NIlIGdUU--XA3_7IhTkjINzV56w-AYpLpmZXYaA-cUkJ2_4ucjN9xdxw2IbsRk-nhz2-bsjF1gHJzarU");
        console.log(photo);
        this.setState({photo: photo});
    }

    render() {
        return(
            <div>
                <h1>Explore</h1> 
                <img src={this.state.photo} />  
            </div>
        )
    }

}

export default Explore;