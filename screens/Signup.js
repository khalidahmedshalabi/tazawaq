import React from 'react';
import { Dimensions, KeyboardAvoidingView, AsyncStorage,
        StyleSheet, TextInput, View, Text, Image,
        Platform, TouchableOpacity, Linking } from "react-native";
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

    componentDidMount() {
        AsyncStorage.getItem('location').then(
            (value) => {
                if(value !== null)
                    this.setState({ location: value });
            });
    }

    constructor(props) {
        super(props);
        this.state = {
            'login': '1',
            identifier: '',
            password: '',
            cpassword: '',
            email: '',
            location: '',
            errorMsg: '',
        }

        AsyncStorage.getItem('login').then(
            (value) => {
                this.setState({ 'login': value })

                if(value == '1')
                {
                    this.props.navigation.dispatch(NavigationActions.reset({
                      index: 0,
                      actions: [
                        NavigationActions.navigate({ routeName: 'Main' })
                      ]
                    }));
                }
            }
        );
    }

    registerUser = () => {
        if(this.state.identifier.length < 3 || this.state.password.length < 6 ||
            this.state.email.length < 4)
        {
            this.setState({ errorMsg: 'المدخلات قصيرة جداً' });
            return;
        }
        if(this.state.password != this.state.cpassword)
        {
            this.setState({ errorMsg: 'كلمة المرور لا تطابق كلمة المرور التأكيدية' });
            return;
        }
        this.setState({ errorMsg: '' });

        /*
        // remember to send location
        fetch(Server.dest + '/api/signup?identifier='+this.state.identifier+'&password='+this.state.password+'&location='+this.state.location+'&email='+this.state.email,
        {headers: {'Cache-Control': 'no-cache'}}).
        then((res) => res.json()).then((resJson) => {
            if(resJson.response == 0)
                this.setState({ errorMsg: 'اسم المستخدم غير متاح' });
            else if(resJson.response > 0)
            {
                AsyncStorage.setItem('userid', resJson.response);
                this.setLoginStatus('1');
                this.props.navigation.dispatch(NavigationActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({ routeName: 'Main' })
                  ]
                }));
            }
        })*/
    };

    shouldRenderErrorMessage = () => {
        if(this.state.errorMsg != '')
        {
            return (
                <View style={{ paddingVertical: 3, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'myfont', color: 'red' }}>{this.state.errorMsg}</Text>
                </View>
            );
        }
    };

    static navigationOptions = {
        header: null
    };

    render() {
        if(this.state.login == '1')
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
                        style={{ flex: 1, height: '50%', width: Dimensions.get('window').width }}
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
                                    onSubmitEditing={(event) => this.registerUser() } />

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
                                    onSubmitEditing={(event) => this.registerUser() }/>

                                  <Ionicons
                                    name={Platform.OS === 'ios' ? 'ios-lock' : 'md-lock'}
                                    size={26}
                                    color={Colors.fadedMainColor}
                                    style={styles.inputIcon}/>
                            </View>

                            <View style={styles.singleInputContainer}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    placeholder='تأكيد كلمة المرور'
                                    placeholderTextColor='#CCCCCC'
                                    autoGrow={false}
                                    multiline={false}
                                    autoFocus={false}
                                    secureTextEntry={true}
                                    style={styles.textInput}
                                    onChangeText={(text) => this.setState({cpassword:text})}
                                    onSubmitEditing={(event) => this.registerUser() }/>

                                  <Ionicons
                                    name={Platform.OS === 'ios' ? 'ios-lock' : 'md-lock'}
                                    size={26}
                                    color={Colors.fadedMainColor}
                                    style={styles.inputIcon}/>
                            </View>

                            <View style={styles.singleInputContainer}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    placeholder='عنوان التوصيل'
                                    placeholderTextColor='#CCCCCC'
                                    autoGrow={false}
                                    multiline={false}
                                    autoFocus={false}
                                    style={styles.textInput}
                                    defaultValue={this.state.location}
                                    onChangeText={(text) => this.setState({location:text})}
                                    onSubmitEditing={(event) => this.registerUser() } />

                                <Ionicons
                                    name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
                                    size={26}
                                    color={Colors.fadedMainColor}
                                    style={styles.inputIcon}/>
                            </View>
                        </View>
                    </KeyboardAvoidingView>

                    <View style={{ flex:0.8, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{flex: 1, flexDirection:'column', justifyContent: 'center' }}>
                            <Button
                                onPress={() => {
                                    this.registerUser()
                                }}
                                color='white'
                                backgroundColor='rgba(100, 181, 51, 0.7)'
                                containerViewStyle={{borderRadius:15}}
                                borderRadius={15}
                                buttonStyle={{ padding: 10 }}
                                textStyle={{ fontFamily: 'myfont' }}
                                title="انشاء الحساب" />
                        </View>

                        <TouchableOpacity style={{ flex:1, marginTop:1, width: '80%' }}
                            onPress={() => Linking.openURL('')}>
                            <Text style={{ textAlign:'center', fontFamily: 'myfont', color: Colors.mainColor }}>
                            عندما اضغط "انشاء حساب" اقر اني قرأت و اوافق على الشروط و الاحكام و سياسة هذا التطبيق
                            </Text>
                        </TouchableOpacity>
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
    }
});
