import React from 'react';
import { Dimensions, KeyboardAvoidingView, AsyncStorage,
        StyleSheet, TextInput, View, Text, ImageBackground,
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

    componentDidMount() {
        this.setState({ fontLoaded: true });
    }

    constructor(props) {
        super(props);
        this.state = {
            'login': '1',
            'SkippedLogin': '1',
            username: '',
            password: '',
            errorMsg: '',
            imgLoaded: false,
            fontLoaded: false
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
        if(this.state.username.length < 3 || this.state.password.length < 6)
        {
            this.setState({ errorMsg: 'كلمة المرور او اسم المستخدم قصير جداً' });
            return;
        }
        //this.setState({ errorMsg: '' });

        /*fetch(Server.dest + '/api/signin?username='+this.state.username+'&password='+this.state.password, {headers: {'Cache-Control': 'no-cache'}}).
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
                <ImageBackground
                    onLoadEnd={(e) => this.setState({imgLoaded: true})}
                    style={{ flex: 1, height: Dimensions.get('window').height, width: Dimensions.get('window').width }}
                    resizeMode='cover'
                    blurRadius={15}
                    source={require('../assets/images/signupin-cover.jpg')}>
                    <View style={{ backgroundColor: this.state.imgLoaded === true ? 'transparent' : Colors.fadedMainColor,
                            flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center',
                            height: Dimensions.get('window').height, width: Dimensions.get('window').width }}>
                        <KeyboardAvoidingView
                            behavior='padding'
                            keyboardVerticalOffset={60}
                            style={{ flex:1 }}
                            contentContainerStyle= {{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', width: Dimensions.get('window').width }}>

                            {this.shouldRenderErrorMessage()}

                            <View style={styles.inputsContainer}>
                                <View style={styles.singleInputContainer}>
                                    <Ionicons
                                      name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
                                      size={26}
                                      color='#EEEEEE'
                                      style={styles.inputIcon}/>

                                      <TextInput
                                          underlineColorAndroid='transparent'
                                          placeholder='اسم المستخدم'
                                          placeholderTextColor={Colors.mainColor}
                                          autoGrow={false}
                                          multiline={false}
                                          autoFocus={false}
                                          style={styles.textInput}
                                          onChangeText={(text) => this.setState({username:text})}
                                          onSubmitEditing={(event) => this.loginUser() }
                                      />
                                </View>

                                <View style={styles.singleInputContainer}>
                                    <Ionicons
                                      name={Platform.OS === 'ios' ? 'ios-lock' : 'md-lock'}
                                      size={26}
                                      color='#EEEEEE'
                                      style={styles.inputIcon}/>

                                      <TextInput
                                          underlineColorAndroid='transparent'
                                          placeholder='كلمة المرور'
                                          placeholderTextColor={Colors.mainColor}
                                          autoGrow={false}
                                          multiline={false}
                                          autoFocus={false}
                                          secureTextEntry={true}
                                          style={styles.textInput}
                                          onChangeText={(text) => this.setState({password:text})}
                                          onSubmitEditing={(event) => this.loginUser() }
                                      />
                                </View>
                            </View>
                        </KeyboardAvoidingView>

                        <View style={{ flex:0.4, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
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

                                <View style={{flex: 1}}>
                                    <Button
                                        onPress={() => this.props.navigation.navigate("Signup")}
                                        color='white'
                                        backgroundColor='rgba(100, 181, 51, 0.7)'
                                        containerViewStyle={{borderRadius:15}}
                                        borderRadius={15}
                                        buttonStyle={{padding: 10}}
                                        textStyle={{ fontFamily: 'myfont' }}
                                        title="تسجيل حساب جديد" />
                                </View>
                            </View>

                            <TouchableOpacity style={{ flex:1 }}>
                                <Text style={{ fontFamily: 'myfont', color: 'white' }}>نسيت كلمة المرور؟</Text>
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
                                    color='white'
                                    backgroundColor='rgba(149, 201, 117, 0.7)'
                                    containerViewStyle={{borderRadius:15}}
                                    borderRadius={15}
                                    buttonStyle={{padding: 10}}
                                    containerViewStyle={{width: '100%', marginLeft: 0}}
                                    textStyle={{ fontFamily: 'myfont' }}
                                    title="تخطي" />
                            </View>
                        </View>
                    </View>
                </ImageBackground>
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
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    inputIcon: {
        backgroundColor: 'transparent',
        marginRight: 9
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
