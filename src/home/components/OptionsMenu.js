import React from 'react';
import { ReactComponent as Walk } from './images/walk.svg';
import { ReactComponent as Bike } from './images/bike.svg';
import { ReactComponent as Car } from './images/car.svg';
import './OptionsMenu.css';
import { FormCheck, FormControl } from 'react-bootstrap';

class PlacesForm extends React.Component {
    constructor(props) {
        super(props);

        let checkboxes = this.props.places.map(place => {
            return {
                place: place,
                value: false
            }
        });

        this.state = {
            checkboxes: checkboxes
        }
    }

    handleCheckboxChange(place) {
        for (let i = 0; i < this.state.checkboxes.length; i++) {
            if (place === this.state.checkboxes[i].place) {
                this.state.checkboxes[i].value = !this.state.checkboxes[i].value;
            }
        }
        this.props.onChange(this.state.checkboxes);
    }

    componentDidMount() {
        this.props.onChange(this.state.checkboxes);
    }

    render() {
        const places = this.state.checkboxes.map(checkbox => (
            <FormCheck 
                key={checkbox.place}
                label={checkbox.place} 
                onChange={() => this.handleCheckboxChange(checkbox.place)}
                defaultChecked={checkbox.value}
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
            mode: "walk",
            radius: 0,
            checkboxes: []
        }
    }

    handleSelectWalk() {
        this.setState({mode: "walk"});
        this.props.onChange(this.state);
    }

    handleSelectBike() {
        this.setState({mode: "bike"});
        this.props.onChange(this.state);
    }

    handleSelectCar() {
        this.setState({mode: "car"});
        this.props.onChange(this.state);
    }

    async handleRadiusChange(event) {
        let radius = event.target.value;

        if (radius >= 0 && radius <= 10000) {
            await this.setState({radius: radius});
        }
        this.props.onChange(this.state);
    }

    handleCheckboxChange(checkboxes) {
        this.setState({checkboxes: checkboxes});
        this.props.onChange(this.state);
    }

    componentDidMount() {
        this.props.onChange(this.state);
    }

    render() {
        return(
            <div className="options-menu py-2">
                <h2 className="text-center">Find a Trek</h2>
                <div className="mode-select pt-3 mx-4">
                    <label>Mode</label>
                    <div className="mode-select-item" onClick={this.handleSelectWalk.bind(this)}>
                        <Walk fill={this.state.mode === "walk" ? "blue" : "black"} />
                    </div>
                    <div className="mode-select-item" onClick={this.handleSelectBike.bind(this)}>
                        <Bike fill={this.state.mode === "bike" ? "blue" : "black"} />
                    </div>
                    <div className="mode-select-item" onClick={this.handleSelectCar.bind(this)}>
                        <Car fill={this.state.mode === "car" ? "blue" : "black"} />
                    </div>
                </div>
                <div className="radius-select row py-3 mx-4">
                    <label className="col-4 pt-1">Radius</label>
                    <FormControl 
                        type="number"
                        value={this.state.radius}
                        className="col-5"
                        onChange={this.handleRadiusChange.bind(this)}
                    />
                    <label className="col-3 pt-1">meters</label>
                </div>
                <div className="places-select py-2 mx-4">
                    <p className="text-center">Places</p>
                    <PlacesForm 
                        places={[
                            "Parks",
                            "Museums",
                            "Attractions",
                            "Historical Buildings",
                            "Sports",
                            "Event Spaces",
                            "Art"
                        ]}
                        onChange={this.handleCheckboxChange.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

export default OptionsMenu;