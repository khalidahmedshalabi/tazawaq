import React from 'react';
import { Dimensions, KeyboardAvoidingView, AsyncStorage,
        StyleSheet, TextInput, View, Text, Image,
        Platform, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import Colors from '../constants/Colors';

import LoadingIndicator from '../components/LoadingIndicator';
//import Server from '../constants/server';

export default class Signin extends React.Component {
    setLoginStatus = (value) => {
        AsyncStorage.setItem('login', value);
        this.setState({ 'login': value });
    }

    navigateToHome = () => {
        this.props.navigation.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Main' })
          ]
        }));
    };

    constructor(props) {
        super(props);
        this.state = {
            'login': '1',
            'SkippedLogin': '1',
            identifier: '',
            password: '',
            errorMsg: '',
        }

        AsyncStorage.getItem('SkippedLogin').then(
            (value) => {
                this.setState({ 'SkippedLogin': value })

                if(value == '1')
                {
                    this.navigateToHome();
                }
                else
                {
                    AsyncStorage.getItem('login').then(
                        (logged) => {
                            this.setState({ 'login': logged })

                            if(logged == '1')
                            {
                                this.navigateToHome();
                            }
                        }
                    );
                }
            }
        );
    }

    loginUser = () => {
        if(this.state.password.length < 6)
        {
            this.setState({ errorMsg: 'كلمة المرور قصيرة جداً' });
            return;
        }
        this.setState({ errorMsg: '' });

        /*fetch(Server.dest + '/api/signin?identifier='+this.state.identifier+'&password='+this.state.password, {headers: {'Cache-Control': 'no-cache'}}).
        then((res) => res.json()).then((resJson) => {
            if(resJson.response == 0)
                this.setState({ errorMsg: 'اسم مستخدم او كلمة مرور غير صحيحتان'});
            else if(resJson.response > 0)
            {
                AsyncStorage.setItem('userid', resJson.response);
                this.setLoginStatus('1');
                this.navigateToHome();
            }
        })*/
    };

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

    static navigationOptions = {
        header: null
    };

    render() {
        if(this.state.login == '1' || this.state.SkippedLogin == '1')
        {
            return (
                <LoadingIndicator size="large" />
            );
        }
        else
        {
            return (
                <View style={{ backgroundColor: '#FFFFFF',
                        flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center',
                        height: Dimensions.get('window').height, width: Dimensions.get('window').width }}>

                    <Image
                        style={{ flex: 1, height: '35%', width: Dimensions.get('window').width }}
                        resizeMode='cover'
                        source={require('../assets/images/signupin-cover.jpg')} />

                    <KeyboardAvoidingView
                        behavior='padding'
                        keyboardVerticalOffset={60}
                        style={{ flex:1 }}
                        contentContainerStyle= {{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', width: Dimensions.get('window').width }}>

                        <View style={styles.inputsContainer}>
                            {this.shouldRenderErrorMessage()}

                            <View style={styles.singleInputContainer}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    placeholder='رقم الجوال او البريد الالكتروني'
                                    placeholderTextColor='#CCCCCC'
                                    autoGrow={false}
                                    multiline={false}
                                    autoFocus={false}
                                    style={styles.textInput}
                                    onChangeText={(text) => this.setState({identifier:text})}
                                    onSubmitEditing={(event) => this.loginUser() } />

                                <Ionicons
                                    name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
                                    size={26}
                                    color={Colors.fadedMainColor}
                                    style={styles.inputIcon}/>
                            </View>

                            <View style={styles.singleInputContainer}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    placeholder='كلمة المرور'
                                    placeholderTextColor='#CCCCCC'
                                    autoGrow={false}
                                    multiline={false}
                                    autoFocus={false}
                                    secureTextEntry={true}
                                    style={styles.textInput}
                                    onChangeText={(text) => this.setState({password:text})}
                                    onSubmitEditing={(event) => this.loginUser() }/>

                                  <Ionicons
                                    name={Platform.OS === 'ios' ? 'ios-lock' : 'md-lock'}
                                    size={26}
                                    color={Colors.fadedMainColor}
                                    style={styles.inputIcon}/>
                            </View>
                        </View>
                    </KeyboardAvoidingView>

                    <View style={{ flex:0.4, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{flex: 1}}>
                                <Button
                                    onPress={() => this.props.navigation.navigate("Signup")}
                                    color={Colors.mainColor}
                                    backgroundColor='rgba(100, 181, 51, 0.15)'
                                    containerViewStyle={{ borderRadius:15, borderColor: 'rgba(100, 181, 51, 0.2)', borderWidth: 1 }}
                                    borderRadius={15}
                                    buttonStyle={{padding: 10}}
                                    textStyle={{ fontFamily: 'myfont' }}
                                    title="انشاء حساب جديد" />
                            </View>

                            <View style={{flex: 1}}>
                                <Button
                                    onPress={() => {
                                        this.loginUser()
                                    }}
                                    color='white'
                                    backgroundColor='rgba(100, 181, 51, 0.7)'
                                    containerViewStyle={{borderRadius:15}}
                                    borderRadius={15}
                                    buttonStyle={{ padding: 10 }}
                                    textStyle={{ fontFamily: 'myfont' }}
                                    title="تسجيل دخول" />
                            </View>
                        </View>

                        <TouchableOpacity style={{ flex:1, marginTop:7 }}>
                            <Text style={{ fontFamily: 'myfont', color: Colors.mainColor }}>نسيت كلمة المرور؟</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.signupButtonContainer}>
                        <View style={{flex: 1, marginBottom: 7, width: '100%'}}>
                            <Button
                                onPress={() => {
                                    AsyncStorage.setItem('login', '0').then(() => {
                                        AsyncStorage.setItem('SkippedLogin', '1').then(() => {
                                            this.navigateToHome();
                                        });
                                    });
                                }}
                                color={Colors.mainColor}
                                backgroundColor='rgba(100, 181, 51, 0.15)'
                                borderRadius={15}
                                buttonStyle={{padding: 10}}
                                containerViewStyle={{ marginLeft:0,
                                    width: '100%', borderRadius:15, borderColor: 'rgba(100, 181, 51, 0.2)', borderWidth: 1 }}
                                textStyle={{ fontFamily: 'myfont' }}
                                title="استكمل كـزائر" />
                        </View>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    textInput: {
        flex: 1,
        color: Colors.mainColor,
        textAlign: 'right',
        fontFamily: 'myfont',
        padding: 9,
        borderRadius: 4,
        backgroundColor: 'transparent',
        borderBottomColor: Colors.fadedMainColor,
        borderBottomWidth: 0.7
    },
    inputIcon: {
        backgroundColor: 'transparent',
        marginLeft: 9
    },
    inputsContainer: {
        paddingTop: 15,
        flex: 2, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center',
        width: '90%'
    },
    singleInputContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    signupButtonContainer: {
        flex: 0.3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '92%'
    },
});
