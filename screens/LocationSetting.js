import React from 'react';
import { Constants, MapView } from 'expo';
import {
	KeyboardAvoidingView,
	View,
	AsyncStorage,
	Image,
	Alert,
	Text,
	Platform,
	TextInput,
	Button,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Colors from '../constants/Colors';
import LoadingIndicator from '../components/LoadingIndicator';
import { NavigationActions } from 'react-navigation';
import Saudi_Governorates from '../constants/Saudi_Governorates.js';
import SelectInput from 'react-native-select-input-ios';
import Server from '../constants/server';

export default class LocationSetting extends React.Component {
	static navigationOptions = {
		header: null
	};

	constructor(props) {
		super(props);

		this.state = {
			display: 0,
			details:'',
			pos: {
				long: 360,
				lat: 360
			},
			fetchedLocationData: false,
			country: Saudi_Governorates.regions[0],
			pickerData: []
		};

		Saudi_Governorates.regions.map((data, index) => {
			this.state.pickerData.push({ value: data, label: data });
		});
	}

	componentDidMount() {
		AsyncStorage.getItem('location').then(value => {
			if (value === null) {
				this.loadScreen();
			} else {
				this.props.navigation.navigate('Signin', {});
			}
		});
	}
	set_location = (location) =>{
		fetch(
			'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
				location.coordinate.latitude +
				',' +
				location.coordinate.longitude +
				'&language=ar&key=AIzaSyCxXoRqTcOTvsOLQPOiVtPnSxLUyGJBFqw',
			{ headers: { 'Cache-Control': 'no-cache' } }
		)
			.then(res => res.json())
			.then(resJson => {
				console.log(location.coordinate)
				var target = resJson.results[0].address_components;

				this.setState({
					region:resJson.results[0].formatted_address
				})
			});

			this.setState({
				pos: {
					lat: location.coordinate.latitude,
					long: location.coordinate.longitude
				}
			})

	}
	navigateToHome = () => {
		this.props.navigation.dispatch(
			NavigationActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({ routeName: 'Main' })]
			})
		);
	};
	submit_location = () =>{
		var data= this.state.region;
		 var details = this.state.details;
		// 'details' is provided when fetchDetails = true
		//console.log(data.description);
		//console.log(details);
		AsyncStorage.setItem('hint',this.state.details);
		AsyncStorage.setItem('location', data).then(() => {
			AsyncStorage.getItem('login').then(value => {
				if (value === '1') {
					AsyncStorage.getItem('userid').then(userid => {
						fetch(
							Server.dest +
								'/api/user_location?id=' +
								userid +
								'&location=' +
								data +
								'&region=' +
								this.state.country +
								'&longitude=' +
								this.state.pos.long +
								'&latitude=' +
								this.state.pos.lat,
							{ headers: { 'Cache-Control': 'no-cache' } }
						)
							.then(res => res.json())
							.then(resJson => {
								this.navigateToHome();
							})
							.catch(error => {
								//console.error(error);
								this.navigateToHome();
							});
					});
				} else this.props.navigation.navigate('Signin', {});
			});
		});
	}
	loadScreen = () => {
		Alert.alert(
			'خدمة تحديد الموقع',
			'نستخدم خدمة تحديد الموقع لكي نرسل لك الطلبات اينما تكون فى اقل وقت. من فضلك اضغط تمكين',
			[
				{
					text: 'تمكين',
					onPress: () => {
						navigator.geolocation.getCurrentPosition(
							position => {
								this.setState({
									pos: {
										long: position.coords.longitude,
										lat: position.coords.latitude
									}
								});

								fetch(
									'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
										position.coords.latitude +
										',' +
										position.coords.longitude +
										'&sensor=false&language=ar&result_type=locality&key=AIzaSyCxXoRqTcOTvsOLQPOiVtPnSxLUyGJBFqw',
									{ headers: { 'Cache-Control': 'no-cache' } }
								)
									.then(res => res.json())
									.then(resJson => {
										var target = resJson.results[0].address_components;
										this.setState({
											region:resJson.results[0].formatted_address
										})
										var foundRegion1 = target.find(function(element) {
											return element.types.includes('locality');
										}).long_name;

										var foundRegion2 = target.find(function(element) {
											return element.types.includes(
												'administrative_area_level_1'
											);
										}).long_name;

										for (
											var i = 0;
											i != Saudi_Governorates.regions.length;
											++i
										) {
											if (
												Saudi_Governorates.regions[i].includes(foundRegion1) ||
												foundRegion1.includes(Saudi_Governorates.regions[i]) ||
												Saudi_Governorates.regions[i].includes(foundRegion2) ||
												foundRegion2.includes(Saudi_Governorates.regions[i])
											) {
												this.setState({
													region: Saudi_Governorates.regions[i]
												});
												break;
											}
										}

										this.setState({ fetchedLocationData: true });

										// Store data
										AsyncStorage.setItem(
											'longitude',
											String(position.coords.longitude)
										);
										AsyncStorage.setItem(
											'latitude',
											String(position.coords.latitude)
										);
										AsyncStorage.setItem('region', this.state.region);
									});
							},
							error => {
								if (
									error.code === 'E_LOCATION_SERVICES_DISABLED' ||
									error.code === undefined
								) {
									Alert.alert(
										'خدمة الموقع',
										'من فضلك قم بتفعيل خدمة الموقع على جوالك لاستخدام افضل. بعد التفعيل اعد المحاولة',
										[
											{
												text: 'اعد المحاولة',
												onPress: () => this.loadScreen()
											},
											{
												text: 'الغاء',
												onPress: () =>
													this.setState({
														display: 1,
														fetchedLocationData: true
													}),
												style: 'cancel'
											}
										],
										{ cancelable: false }
									);
								} else alert(JSON.stringify(error));
							},
							{
								enableHighAccuracy: true,
								timeout: 20000,
								maximumAge: 60000
							}
						);
						this.setState({ display: 1 });
					}
				},
				{
					text: 'الغاء',
					onPress: () =>
						alert('عليك بتفعيل خدمة الموقع على جهازك لكي تستخدم التطبيق'),
					style: 'cancel'
				}
			],
			{ cancelable: false }
		);
	};

	shouldRenderLocationInputs = () => {
		if (this.state.fetchedLocationData) {
			return (
				<View style={{ flex: 1 }}>
					<View
						style={{
							flex: 0.3,
							backgroundColor: Colors.mainColor,
							borderWidth: 0
						}}
					>
						<Text
							style={{
								textAlign: 'right',
								flex: 1,
								margin: 10,
								color: 'white',
								fontSize: 16,
								fontFamily: 'myfont'
							}}
						>
							اختر المنطقة
						</Text>

						<SelectInput
							buttonsBackgroundColor={Colors.smoothGray}
							buttonsTextColor={Colors.mainColor}
							cancelKeyText="الغاء"
							submitKeyText="اختيار"
							value={this.state.country}
							options={this.state.pickerData}
							labelStyle={{ color: Colors.secondaryColor }}
							onSubmitEditing={itemValue =>
								this.setState({ region: itemValue })
							}
						/>
					</View>
					<View style={styles.box}>
					<TextInput
					placeholderTextColor="#999999"

					underlineColorAndroid="transparent"
					style={styles.input}
						placeholder="اكتب عنوانك"
						minLength={2}
						autoFocus={false}
						listViewDisplayed="auto"
						fetchDetails={false}
						value={this.state.region}
						onChangeText={(text)=>{
							this.setState({
								region:text
							})
						}}
						onSubmitEditing ={() => {
						this.submit_location();
						}}
					/>
					</View>
						<View style={styles.box}>
					<TextInput
					placeholderTextColor="#999999"
					underlineColorAndroid="transparent"
					placeholder="رقم العماره و الشقه " style={styles.input} value={this.state.details} onChangeText={(text)=>{
						this.setState({
							details:text
						})
					}}
					onSubmitEditing = {()=>{
						this.submit_location()
					}}/>
					</View>
				<TouchableOpacity onPress={() => this.submit_location()}> 
					<View style={{backgroundColor:Colors.mainColor,padding:10,borderRadius:10, width:120,justifyContent:'center'}}>
						<Text style={{fontFamily:'myfont',color:Colors.secondaryColor,textAlign:'center'}}>حفظ العنوان</Text>
					</View>
				</TouchableOpacity>
					<MapView
						style={{ flex: 1 }}
						showsMyLocationButton={true}
						showsUserLocation = {true}
						followUserLocation = {true}
						showsMyLocationButton = {true}
						zoomEnabled = {true}

						initialRegion={{
							latitude: this.state.pos.lat,
							longitude: this.state.pos.long,
							longitudeDelta:0.04250270688370961,
            latitudeDelta:0.03358723958820065

						}}
					>
						<MapView.Marker
							coordinate={{
								latitude: this.state.pos.lat,
								longitude: this.state.pos.long
							}}
							onDragEnd={(e) =>
							{
								this.set_location(e.nativeEvent);

							}
							}
							draggable
							title="your locationr"
						/>
					</MapView>
				</View>
			);
		}
	};

	render() {
		if (this.state.display == 0) return <LoadingIndicator size="large" />;

		return (
			<View
				style={{
					flex: 1,
					backgroundColor: 'white',
					marginTop: Platform.OS == 'ios' ? 15 : 0
				}}
			>
				<KeyboardAvoidingView
					behavior="padding"
					keyboardVerticalOffset={60}
					style={{ flex: 1 }}
					contentContainerStyle={{ flex: 1 }}
				>
					<Image
						style={{ width: '100%', height: '30%' }}
						resizeMode="cover"
						source={require('../assets/images/head.jpg')}
					/>

					{this.shouldRenderLocationInputs()}
				</KeyboardAvoidingView>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	input: {
		justifyContent: 'center',
		height: 22,
		fontFamily: 'myfont',
		marginTop: 5,
		backgroundColor: 'transparent',
		fontSize: 15,
		alignItems: 'center',
		marginRight: 7,
		marginLeft: 7,

		flex: 1
	},
	box: {
		height: 45,
		backgroundColor: Colors.smoothGray,
		borderRadius: 9,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		marginVertical: 12,
		marginHorizontal: 10
	},

})
