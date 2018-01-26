import React from 'react';
import { KeyboardAvoidingView, View, Text, TextInput, AsyncStorage } from 'react-native';
import { Button } from "react-native-elements";
import Colors from '../constants/Colors';
import { NavigationActions } from 'react-navigation';
import Server from '../constants/server';

export default class ResetPassword extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props)

        this.state = {
            password: '',
            errorMsg: ''
        }
    }

    navigateToHome = () => {
        this.props.navigation.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Main' })
          ]
        }));
    };

    setLoginStatus = (value) => {
        AsyncStorage.setItem('login', value);
        this.setState({ 'login': value });
    }

    setNewPass = () => {
        this.setState({ errorMsg: '' });

        if(this.state.password.length >= 6) {
            const { params } = this.props.navigation.state;

            fetch(Server.dest + '/api/setnewpass?code='+params.code+
                '&phone='+params.phone+'&password='+this.state.password,
            {headers: {'Cache-Control': 'no-cache'}}).
            then((res) => res.json()).then((resJson) => {
                if(resJson.response == 1) {
                    AsyncStorage.setItem('userid', resJson.id);
                    this.setLoginStatus('1');
                    this.navigateToHome();
                }
                else this.setState({ errorMsg: 'فشلت العملية!'});
            })
        }
        else this.setState({ errorMsg: 'كلمة المرور قصيرة'});
    }

    shouldRenderErrorMessage = () => {
        if(this.state.errorMsg != '')
        {
            return (
                <View style={{ paddingVertical: 3, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'myfont', color: '#E85151' }}>{this.state.errorMsg}</Text>
                </View>
            );
        }
    };

    render() {
      const { navigate } = this.props.navigation;
        return (
            <View style={{ flex:1, backgroundColor: 'white'}}>
                {this.shouldRenderErrorMessage()}

                <Text style={{ paddingHorizontal:10, marginTop:40, textAlign:'center', fontFamily: 'myfont', color: Colors.mainColor }}>
                    اكتب كلمة مرور جديدة
                </Text>

                <KeyboardAvoidingView
                    behavior='padding'
                    keyboardVerticalOffset={60}
                    style={{ flex:1 }}
                    contentContainerStyle= {{ flex: 1, width:'75%' }}>

                    <TextInput
                        underlineColorAndroid='transparent'
                        placeholder='كلمة مرور'
                        placeholderTextColor='#CCCCCC'
                        autoGrow={false}
                        multiline={false}
                        autoFocus={false}
                        secureTextEntry={true}
                        style={{ flex: 0.5,
                            fontSize: 33,
                            color: Colors.mainColor,
                            textAlign: 'center',
                            fontFamily: 'myfont',
                            borderRadius: 4,
                            backgroundColor: 'transparent',
                            borderBottomColor: Colors.fadedMainColor,
                            borderBottomWidth: 1 }}
                        onChangeText={(text) => this.setState({password:text})}
                        onSubmitEditing={(event) => this.setNewPass() } />

                </KeyboardAvoidingView>

                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                    <Button
                        onPress={() => {
                            this.setNewPass();
                        }}
                        color='white'
                        backgroundColor={Colors.mainColor}
                        containerViewStyle={{marginBottom:35, borderRadius:15}}
                        borderRadius={15}
                        buttonStyle={{ padding: 10 }}
                        textStyle={{ fontFamily: 'myfont' }}
                        title="تغيير كلمة المرور" />
                </View>
            </View>
        );
    }
}
