import React from 'react';
import {
    View
} from 'react-native';
import Colors from '../constants/Colors';
import CountryRegionData from '../constants/CountryRegionData.json'
import SelectInput from 'react-native-select-input-ios';

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
            //this.state.CountryPickerItems.push(<Picker.Item key={index} label={i.countryName} value={i.countryName} />);
            this.state.CountryPickerItems.push({value: i.countryName, label: i.countryName});
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
                    //this.state.RegionPickerItems.push(<Picker.Item key={index} label={data.name} value={data.name} />);
                    this.state.RegionPickerItems.push({value: data.name, label: data.name});
                });
                this.state.region = CountryRegionData[i].regions[0];
                break;
            }
        }
    };

    render() {
        return (
            <View style={ this.props.containerViewStyle }>
                <SelectInput
                    buttonsBackgroundColor={Colors.smoothGray}
                    buttonsTextColor={Colors.mainColor}
                    cancelKeyText='الغاء'
                    submitKeyText='اختيار'
                    value={this.state.country}
                    options={this.state.CountryPickerItems}
                    onSubmitEditing={(itemValue) => {
                        this.setState({country: itemValue});
                        this.reRenderRegionPickerItems(itemValue);
                    }}>
                </SelectInput>

                <SelectInput
                    buttonsBackgroundColor={Colors.smoothGray}
                    buttonsTextColor={Colors.mainColor}
                    cancelKeyText='الغاء'
                    submitKeyText='اختيار'
                    value={this.state.region}
                    options={this.state.RegionPickerItems}
                    onSubmitEditing={(itemValue) => this.setState({region: itemValue})}>
                </SelectInput>
            </View>
        );
    }
}
