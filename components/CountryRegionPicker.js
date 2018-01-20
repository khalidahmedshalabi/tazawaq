import React from 'react';
import {
    View,
    Picker
} from 'react-native';
import CountryRegionData from '../constants/CountryRegionData.json'

export default class CountryRegionPicker extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            country: this.props.initialCountry,
            region: this.props.initialRegion,
            CountryPickerItems: [],
            RegionPickerItems: []
        }

        CountryRegionData.map((i, index) => {
            this.state.CountryPickerItems.push(<Picker.Item key={index} label={i.countryName} value={i.countryName} />);
        });

        this.reRenderRegionPickerItems(this.state.country);
    }

    reRenderRegionPickerItems = (country) => {
        this.state.RegionPickerItems.length = 0;
        for(var i = 0; i != CountryRegionData.length; ++ i)
        {
            if(CountryRegionData[i].countryName == country)
            {
                CountryRegionData[i].regions.map((data, index) => {
                    this.state.RegionPickerItems.push(<Picker.Item key={index} label={data.name} value={data.name} />);
                });
                this.state.region = CountryRegionData[i].regions[0];
                break;
            }
        }
    };

    render() {
        return (
            <View style={ this.props.containerViewStyle }>
                <Picker
                    selectedValue={this.state.country}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({country: itemValue});
                        this.reRenderRegionPickerItems(itemValue);
                    }}>
                    {this.state.CountryPickerItems}
                </Picker>

                <Picker
                    selectedValue={this.state.region}
                    onValueChange={(itemValue, itemIndex) => this.setState({region: itemValue})}>
                    {this.state.RegionPickerItems}
                </Picker>
            </View>
        );
    }
}
