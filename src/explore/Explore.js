import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import DatabaseAPI from '../APIs/DatabaseAPI';
import './Explore.css';

class ExploreLocation extends React.Component {

    render() {
        let location = this.props.location;

        return(
            <div>
                <div className="border m-2 p-4 row explore-item">
                    <div className="col-12 mb-2 border-bottom border-dark">
                        <h3 className="text-center">{location.name}</h3>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <img src={location.image_url} alt={location.name} width="100%"/>
                    </div>
                    <div className="col-lg-6 col-md-12 mt-2">
                        <p className="border-bottom">
                            {location.info}
                        </p>
                        <p>{location.is_closed ? "Closed" : "Open Now"}</p>
                        <p>
                            <a href={location.url} target="_blank" rel="noreferrer">
                                Website
                            </a>
                        </p>
                        {location.phone !== "" && <p>Phone: {location.phone}</p>}
                    </div>
                </div>
            </div>
        );
    }
}

class Explore extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            locations: null,
        }
    }

    async componentDidMount() {
        let locations = await DatabaseAPI.getExplore();
        this.setState({locations: locations});
    }

    getAllExplore() {
        if (this.state.locations !== null) {
            return this.state.locations.map(location => (
                <ExploreLocation 
                    key={location.id}
                    location={location}
                />
            ));
        }
        return null;
    }

    render() {
        return(
            <div className="container">
                <h1 className="my-5">Explore</h1> 
                {this.getAllExplore()}
            </div>
        )
    }

}

export default Explore;