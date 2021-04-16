import React from 'react';
import { Button } from 'react-bootstrap';
import './InfoMenu.css';

class InfoMenu extends React.Component {

    getInfoWindow() {

        let type = "";

        if (this.props.info.categories[0]) {
            type = this.props.info.categories[0].title
        }

        return(
            <div className="info-menu p-3">
                <h3 className="text-center">{this.props.info.name}</h3>
                <div className="info-small">
                    <img src={this.props.info.image_url} alt={this.props.info.name} />
                    <div className="info-right">
                        <h5>{type}</h5>
                        <div className="info-menu-contact">
                            <p>{this.props.info.is_closed ? "Closed" : "Open Now"}</p>
                            <p>
                                <a href={this.props.info.url} target="_blank" rel="noreferrer">
                                    Website
                                </a>
                            </p>
                            {this.props.info.phone !== "" ? <p>Phone: {this.props.info.phone}</p> : null}
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-2">
                    <Button 
                        variant="primary" 
                        size="lg"
                        onClick={this.props.onStartTrek}
                    >Start Trek
                    </Button>
                </div>
            </div>
        );
    }

    render() {
        if (!this.props.show) return null;

        return(
            <div>
                {this.props.info !== null && this.getInfoWindow()}
            </div>
        );
    }

}

export default InfoMenu;