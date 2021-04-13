import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './InfoMenu.css';

class InfoMenu extends React.Component {

    getInfoWindow() {
        return(
            <div className="info-menu p-3">
                <h3 className="text-center">{this.props.info.name}</h3>
                <img src={this.props.info.img} alt={this.props.info.name} />
                <h5>{this.props.info.type}</h5>
                <div className="info-menu-info">
                    <p>{this.props.info.info}</p>
                    <p>
                        <a href={this.props.info.website} target="_blank">More info</a>
                    </p>
                </div>
                <div className="info-menu-contact">
                    <p>Open now: {this.props.info.hours.open} - {this.props.info.hours.close}</p>
                    <p>Website:&nbsp;
                        <a href={this.props.info.website} target="_blank">
                            {this.props.info.website}
                        </a>
                    </p>
                    <p>Phone: {this.props.info.phone}</p>
                </div>
                <div className="d-flex justify-content-center mt-2">
                    <Button variant="primary" size="lg">
                        Start Trek
                    </Button>
                </div>
            </div>
        );
    }

    render() {
        return(
            <div>
                {this.props.info ? this.getInfoWindow() : null}
            </div>
        );
    }

}

export default InfoMenu;