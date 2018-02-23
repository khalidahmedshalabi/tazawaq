import React from 'react';
import {
	KeyboardAvoidingView,
	View,
	Text,
	TextInput,
	AsyncStorage
} from 'react-native';
import { Button } from 'react-native-elements';
import Colors from '../constants/Colors';
import { NavigationActions } from 'react-navigation';
import Server from '../constants/server';

export default class CodeVerification extends React.Component {
	static navigationOptions = {
		header: null
	};

	constructor(props) {
		super(props);

		this.state = {
			code: '',
			errorMsg: ''
		};
	}

	navigateToHome = () => {
		 this.props.navigation.navigate('Main')
	};

	setLoginStatus = value => {
		AsyncStorage.setItem('login', value);
		this.setState({ login: value });
	};

	verifyCode = () => {
		this.setState({ errorMsg: '' });

		if (this.state.code.length == 5) {
			const { params } = this.props.navigation.state;
			fetch(
				Server.dest +
					'/api/verifycode?code=' +
					this.state.code +
					'&identifier=' +
					params.device +
					'&process=' +
					params.process,
				{ headers: { 'Cache-Control': 'no-cache' } }
			)
				.then(res => res.json())
				.then(resJson => {
					if (resJson.response == 2) {
						if (params.process == 0) {
							// signup
							AsyncStorage.setItem('userid', resJson.id);
							this.setLoginStatus('1');
							this.navigateToHome();
						} else {
							// reset password
							// Navigate to a screen where user can set a new password
							this.props.navigation.navigate('ResetPassword', {
								phone: params.device,
								code: this.state.code
							});
						}
					} else if (resJson.response == 3)
						this.setState({ errorMsg: 'رقم جوال غير مُسجل عندنا' });
					else if (resJson.response == 0)
						this.setState({ errorMsg: 'انت بالفعل مُسجل عندنا' });
					else if (resJson.response == 1)
						this.setState({ errorMsg: 'كود غير صالح' });
				});
		} else this.setState({ errorMsg: 'كود غير صالح' });
	};

	shouldRenderErrorMessage = () => {
		if (this.state.errorMsg != '') {
			return (
				<View
					style={{
						paddingVertical: 3,
						flexDirection: 'row',
						justifyContent: 'center'
					}}
				>
					<Text style={{ fontFamily: 'myfont', color: '#E85151' }}>
						{this.state.errorMsg}
					</Text>
				</View>
			);
		}
	};

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: 'white' }}>
				{this.shouldRenderErrorMessage()}

				<Text
					style={{
						paddingHorizontal: 10,
						marginTop: 40,
						textAlign: 'center',
						fontFamily: 'myfont',
						color: Colors.mainColor
					}}
				>
					سيتم ارسال كود التأكيد على الجوال{' '}
					{this.props.navigation.state.params.device} اكتب الكود بالاسفل
				</Text>

				<KeyboardAvoidingView
					behavior="padding"
					keyboardVerticalOffset={60}
					style={{ flex: 1 }}
					contentContainerStyle={{ flex: 1, width: '75%' }}
				>
					<TextInput
						underlineColorAndroid="transparent"
						placeholder="كود التحقق"
						placeholderTextColor="#CCCCCC"
						autoGrow={false}
						multiline={false}
						autoFocus={false}
						keyboardType="numeric"
						style={{
							flex: 0.5,
							fontSize: 33,
							color: Colors.mainColor,
							textAlign: 'center',
							fontFamily: 'myfont',
							borderRadius: 4,
							backgroundColor: 'transparent',
							borderBottomColor: Colors.fadedMainColor,
							borderBottomWidth: 1
						}}
						onChangeText={text => this.setState({ code: text }).then(()=>{
							this.verifyCode()
						})}
						onSubmitEditing={event => this.verifyCode()}
					/>
				</KeyboardAvoidingView>

				<View style={{ flex: 1, justifyContent: 'flex-end' }}>
					<Button
						onPress={() => {
							this.verifyCode();
						}}
						color="white"
						backgroundColor={Colors.mainColor}
						containerViewStyle={{ marginBottom: 35, borderRadius: 15 }}
						borderRadius={15}
						buttonStyle={{ padding: 10 }}
						textStyle={{ fontFamily: 'myfont' }}
						title="تأكيد"
					/>
				</View>
			</View>
		);
	}
}
