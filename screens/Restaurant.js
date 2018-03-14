import React, { Component } from 'react';
import { Text, View,Image,Dimensions,FlatList } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.27
import MealsWrapper from '../components/MealsWrapper';
import Colors from '../constants/Colors';
import Server from '../constants/server';
import RestaurantBox from '../components/RestaurantBox';
const Center = ({ children }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>{children}</View>
);
export default class App extends Component {
  constructor(props) {
    super(props);
    const {state} = props.navigation;


    fetch(Server.dest + '/api/store-info?store_id='+this.props.navigation.state.params.key).then((res)=>res.json()).then((restaurants)=>{
      this.setState({
        Restaurant: [restaurants.response],
      })

    });

    fetch(Server.dest + '/api/store-categories?store_id='+this.props.navigation.state.params.key).then((res)=>res.json()).then((categories)=>{

        setTimeout(() => {
          const screens = {};
            categories.response.forEach(page => {
              screens[page.screenName] = { screen: props => <MealsWrapper navigation={this.props.navigation} restaurant_id={this.props.navigation.state.params.key} screenName={page.key}  /> };
            });

          this.setState({ tabs: TabNavigator(screens,{
              tabBarPosition: 'bottom',
              tabBarOptions: {
              scrollEnabled: true,
              labelStyle: {
              fontWeight: '300',
              color: Colors.mainColor,
              fontFamily: 'myfont',
              fontSize: 15
              },
              style: {
                backgroundColor: Colors.smoothGray,
                color: Colors.mainColor,
              },
              activeTintColor: '#000',
              tabBarOptions: {
                  scrollEnabled: true,
                  activeTintColor: '#e91e63',
                },
          }})
          });
          }, 500);
      })
    this.state = {
      doneFetches:0,
      pages:[

      ],
      Restaurant:[]
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



  }

  render() {

    if (this.state.tabs) {

      return (

        <this.state.tabs />


      )
    }
    return  <Image
        style={{ flex: 1, height: '100%', width: Dimensions.get('window').width }}
        resizeMode='cover'
        source={require('../assets/images/splash.jpg')} />
  }
}
