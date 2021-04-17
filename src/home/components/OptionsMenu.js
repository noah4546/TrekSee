import React from 'react';
import { ReactComponent as Walk } from './images/walk.svg';
import { ReactComponent as Bike } from './images/bike.svg';
import { ReactComponent as Car } from './images/car.svg';
import './OptionsMenu.css';
import { Button, FormCheck, FormControl } from 'react-bootstrap';
import DatabaseAPI from '../../APIs/DatabaseAPI';

class PlacesForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checkboxes: []
        }
    }

    handleCheckboxChange(place) {
        let checkboxes = this.state.checkboxes;
        for (let i = 0; i < checkboxes.length; i++) {
            if (place === checkboxes[i].place) {
                checkboxes[i].value = !checkboxes[i].value;
            }
        }
        this.setState({checkboxes: checkboxes});
        this.props.onChange(this.state.checkboxes);
    }

    async componentDidMount() {
        let places = await DatabaseAPI.getAllPlaces();

        let checkboxes = places.map(place => {
            return {
                id: place.id,
                place: place.place,
                terms: place.terms,
                value: false
            }
        });

        this.setState({checkboxes: checkboxes});

        this.props.onChange(this.state.checkboxes);
    }

    render() {
        const places = this.state.checkboxes.map(checkbox => (
            <FormCheck 
                key={checkbox.place}
                id={checkbox.place}
                label={checkbox.place} 
                onChange={() => this.handleCheckboxChange(checkbox.place)}
                checked={checkbox.value}
            />
        ));

        return (
            <div className="checkboxes">
                {places}
            </div>
        );
    }
}

class OptionsMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: "WALKING",
            radius: 0,
            checkboxes: [],
            places: []
        }
    }

    handleSelectWalk() {
        this.setState({mode: "WALKING"});
        this.handleModeChange("WALKING");
    }

    handleSelectBike() {
        this.setState({mode: "BICYCLING"});
        this.handleModeChange("BICYCLING");
    }

    handleSelectCar() {
        this.setState({mode: "DRIVING"});
        this.handleModeChange("DRIVING");
    }

    handleModeChange(mode) {
        this.props.onModeChange(mode);
    }

    async handleRadiusChange(event) {
        let radius = event.target.value;

        if (radius >= 0 && radius <= 100) {
            await this.setState({radius: radius});
        }

        this.props.onRadiusChange(radius);
    }

    handleCheckboxChange(checkboxes) {
        this.setState({checkboxes: checkboxes});
    }

    handleSearch() {
        this.props.onChange(this.state);
    }

    componentDidMount() {
        this.props.onChange(this.state);
    }

    render() {
        let display = (this.props.show) ? "d-block" : "d-none";

        return(
            <div className={"options-menu py-2 " + display}>
                <h3 className="text-center">Find a Trek</h3>
                <div className="mode-radius mx-4">
                    <div className="mode-select pt-3">
                        <label>Mode</label>
                        <div className="mode-select-item" onClick={this.handleSelectWalk.bind(this)}>
                            <Walk fill={this.state.mode === "WALKING" ? "blue" : "black"} />
                        </div>
                        <div className="mode-select-item" onClick={this.handleSelectBike.bind(this)}>
                            <Bike fill={this.state.mode === "BIKING" ? "blue" : "black"} />
                        </div>
                        <div className="mode-select-item" onClick={this.handleSelectCar.bind(this)}>
                            <Car fill={this.state.mode === "DRIVING" ? "blue" : "black"} />
                        </div>
                    </div>
                    <div className="radius-select py-3">
                        <label className="mt-1 mr-2">Radius</label>
                        <FormControl 
                            type="number"
                            value={this.state.radius}
                            className="mr-2"
                            step="0.2"
                            onChange={this.handleRadiusChange.bind(this)}
                        />
                        <label className="pt-1">Km</label>
                    </div>
                </div>
                <div className="places-select py-2">
                    <p className="text-center places-label">Places</p>
                    <PlacesForm 
                        onChange={this.handleCheckboxChange.bind(this)}
                    />
                </div>
                <div className="d-flex justify-content-center mt-2">
                    <Button 
                        variant="primary" 
                        size="lg"
                        onClick={this.handleSearch.bind(this)}
                        >
                        Search
                    </Button>
                </div>
            </div>
        );
    }
}

export default OptionsMenu;