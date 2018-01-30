import React, { Component } from 'react';
import { Text, View,Image } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.27
import MealsWrapper from '../components/MealsWrapper';
import Colors from '../constants/Colors';
const Center = ({ children }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>{children}</View>
);
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      pages:[
      { screenName: 'المشويات' },
      { screenName: 'الدجاج' },
      { screenName: 'المندي' },
      { screenName: 'الاضافات' },
      ]
    };

  }
  static navigationOptions = ({ navigation }) => ({
    title:'الوجبات',
    headerTintColor: Colors.smoothGray,
    fontFamily:'myfont',
  headerStyle: {
    backgroundColor: Colors.mainColor,
    borderBottomColor: Colors.mainColor,
    borderBottomWidth: 3,
  },
  headerTitleStyle: {
    fontWeight: '300',
    color: '#ffffff',
    fontFamily: 'myfont',
    fontSize: 16
  },
  });
  componentWillMount() {


    setTimeout(() => {
      const screens = {};


      this.state.pages.forEach(page => {
        screens[page.screenName] = { screen: props => <MealsWrapper navigation={this.props.navigation} restaurant_id={this.props.navigation.state.params.key} screenName={page.screenName}  /> };
      });
      this.setState({ tabs: TabNavigator(screens,{

  tabBarOptions: {
    labelStyle: {

    fontWeight: '300',
    color: '#ffffff',
    fontFamily: 'myfont',
    fontSize: 12
    },
    style: {
      backgroundColor: '#EBB70A',

    },
    activeTintColor: '#000',
  }}
  ) });
  }, 500);
  }

  render() {

    if (this.state.tabs) {
      return <this.state.tabs />;
    }
    return <Image resizeMode='contain'  source={require('./assets/images/splash.png')} / >;
  }
}
