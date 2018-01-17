import React from 'react';
import { Constants } from 'expo';
import { View, AsyncStorage, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Colors from '../constants/Colors';
import LoadingIndicator from '../components/LoadingIndicator';
import { NavigationActions } from 'react-navigation';

export default class Header extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props)

        this.state = {
            display: 0
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('location').then(
            (value) => {
                if(value === null)
                {
                    this.setState({display: 1});
                }
                else
                {
                    this.props.navigation.dispatch(NavigationActions.reset({
                      index: 0,
                      actions: [
                        NavigationActions.navigate({ routeName: 'Signin' })
                      ]
                  }));
                }
            });
    }

    render() {
        if(this.state.display == 0)
            return (    <LoadingIndicator size="large" />   );

        return (
            <View style={{ flex:1}}>
                <Image
                    style={ {width: '100%', height: '30%'}}
                    resizeMode='cover'
                    source={require('../assets/images/location-picker-cover.jpeg')}/>

                <View style={{ flex: 1 }}>
                    <GooglePlacesAutocomplete
                      placeholder="ابحث عن مكان التوصيل"
                      minLength={2}
                      autoFocus={false}
                      returnKeyType={'search'}
                      listViewDisplayed="auto"
                      fetchDetails={false}
                      renderDescription={row => row.description}
                      onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        //console.log(data.description);
                        //console.log(details);
                        AsyncStorage.setItem('location', data.description).then(() => {
                            this.props.navigation.navigate("Signin", { });
                        });
                      }}
                      getDefaultValue={() => {
                        return ''; // text input default value
                      }}
                      query={{
                        key: 'AIzaSyDS5yK4xbCDrLVcF-88zwcKRPnSoPxdKIc',
                        language: 'ar', // language of the results
                      }}
                      styles={{
                        description: {
                            fontWeight: 'bold',
                            color: '#444444',
                        },
                        predefinedPlacesDescription: {
                          color: Colors.mainColor,
                        },
                        textInputContainer: {
                            backgroundColor: 'white',
                            borderBottomColor: '#F2F3F5',
                            height: 60
                        },
                        textInput: {
                            borderRadius: 13,
                            backgroundColor: Colors.smoothGray,
                            height: 45
                        },
                        container: {
                            backgroundColor: 'white'
                        }
                      }}
                      currentLocation={false}
                      currentLocationLabel="مكاني الحالي"
                      nearbyPlacesAPI="GooglePlacesSearch"
                      GoogleReverseGeocodingQuery={{
                        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                      }}
                      GooglePlacesSearchQuery={{
                        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                        rankby: 'distance',
                        radius: 50000
                      }}
                      debounce={200}
                    />
                </View>
            </View>
        );
    }
}
