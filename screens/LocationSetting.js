import React from 'react';
import { Constants } from 'expo';
import { KeyboardAvoidingView, View, AsyncStorage, Image, Alert } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Colors from '../constants/Colors';
import LoadingIndicator from '../components/LoadingIndicator';
import { NavigationActions } from 'react-navigation';
import CountryRegionPicker from '../components/CountryRegionPicker';

export default class LocationSetting extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props)

        this.state = {
            display: 0,
            pos: {
                long: 360, lat: 360
            },
            fetchedLocationData: false,
            initialCountry: 'Saudi Arabia',
            initialRegion: '',
        }
    }

    componentDidMount () {
        AsyncStorage.getItem('location').then(
            (value) => {
                if(value === null)
                {
                    this.loadScreen();
                }
                else
                {
                    this.props.navigation.navigate("Signin", { });
                }
            }
        );
    }

    navigateToHome = () => {
        this.props.navigation.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Main' })
          ]
        }));
    };

    loadScreen = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({pos: {long: position.coords.longitude, lat: position.coords.latitude}});

            fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng="+ position.coords.latitude +
                "," + position.coords.longitude +
                "&sensor=false&language=en&result_type=locality&key=AIzaSyCxXoRqTcOTvsOLQPOiVtPnSxLUyGJBFqw",
                {headers: {'Cache-Control': 'no-cache'}}).then((res) => res.json()).then((resJson) => {

                var target = resJson.results[0].address_components;
                this.setState({
                    // Region
                    initialRegion: target.find(function(element) {
                        return (element.types.includes('locality') || element.types.includes('administrative_area_level_1'));
                    }).long_name,

                    // Country
                    initialCountry: target.find(function(element) {
                        return (element.types.includes('country'));
                    }).long_name,

                    // Successfully loaded data
                    fetchedLocationData: true
                });

                // Store data
                AsyncStorage.setItem('longitude', String(position.coords.longitude));
                AsyncStorage.setItem('latitude', String(position.coords.latitude));
                AsyncStorage.setItem('region', this.state.initialRegion);
                AsyncStorage.setItem('country', this.state.initialCountry);
            })
        }, (error) => {
            if(error.code === "E_LOCATION_SERVICES_DISABLED")
            {
                Alert.alert(
                    'خدمة الموقع',
                    'من فضلك قم بتفعيل خدمة الموقع على جوالك لاستخدام افضل. بعد التفعيل اعد المحاولة',
                    [
                    {text: 'اعد المحاولة', onPress: () => this.loadScreen()},
                    {text: 'الغاء', onPress: () => this.setState({ display: 1, fetchedLocationData: true }), style: 'cancel'},
                    ],
                    { cancelable: false }
                );
            }
            else alert(error.code);
            //else alert(JSON.stringify(error))
        }, {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 60000
        });
        this.setState({display: 1});
    }

    shouldRenderLocationInputs = () => {
        if(this.state.fetchedLocationData)
        {
            return (
                <View style={{ flex:1 }}>
                    <CountryRegionPicker
                        containerViewStyle={{ flex:0.4, backgroundColor: 'white', borderBottomColor: Colors.mainColor, borderBottomWidth:1 }}
                        initialCountry={this.state.initialCountry}
                        initialRegion={this.state.initialRegion} />

                    <GooglePlacesAutocomplete
                      placeholder="اكتب عنوانك"
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
                            AsyncStorage.getItem('login').then(
                                (value) => {
                                    if(value === '1') {
                                        AsyncStorage.getItem('userid').then(
                                            (userid) => {
                                                fetch(Server.dest + '/api/user_location?id='+userid+
                                                    '&location='+data.description+'&country='+this.state.initialCountry+
                                                    '&region='+this.state.initialRegion+'&longitude='+this.state.pos.long+
                                                    '&latitude='+this.state.pos.lat,
                                                    {headers: {'Cache-Control': 'no-cache'}}).then((res) => res.json()).then((resJson) => {
                                                        this.navigateToHome();
                                                }).catch((error) => {
                                                    //console.error(error);
                                                    this.navigateToHome();
                                                });
                                            }
                                        );
                                    }
                                    else this.props.navigation.navigate("Signin", { });
                                }
                            );
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
            );
        }
    }

    render() {
        if(this.state.display == 0)
            return (    <LoadingIndicator size="large" />   );

        return (
            <View style={{ flex:1, backgroundColor: 'white'}}>
                <KeyboardAvoidingView
                    behavior='padding'
                    keyboardVerticalOffset={60}
                    style={{ flex:1 }}
                    contentContainerStyle= {{ flex: 1 }}>

                    <Image
                        style={ {width: '100%', height: '30%'}}
                        resizeMode='cover'
                        source={require('../assets/images/location-picker-cover.jpeg')}/>

                    {this.shouldRenderLocationInputs()}
                </KeyboardAvoidingView>
            </View>
        );
    }
}
