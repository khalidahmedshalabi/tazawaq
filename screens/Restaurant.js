import React from 'react';
import {
  Text,
  TouchableHighlight,
  View,Image,Dimensions,FlatList,TabBarTop,SafeAreaView
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import createReactClass from 'create-react-class';
import Server from '../constants/server';
import MealsWrapper from '../components/MealsWrapper';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.27
import Colors from '../constants/Colors';
import RestaurantBox from '../components/RestaurantBox';
import LoadingIndicator from '../components/LoadingIndicator';
const Child = createReactClass({
  onEnter() {
    console.log('enter: ' + this.props.i); // eslint-disable-line no-console
  },

  onLeave() {
    console.log('leave: ' + this.props.i); // eslint-disable-line no-console
  },

  render() {
    const i = this.props.i;
    return <MealsWrapper navigation={this.props.navigation} restaurant_id={this.props.navigation.state.params.key} screenName={i}  />;
  },
});

export default class Restaurants extends React.Component {

  constructor(){
    super();
    this.state = {
      tabs: [{
      key:5,
      screenName:'تحميل ...'
      },
    {
      key:6,
      screenName:'تحميل ...'
      }],
    }
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

  componentDidMount() {
    fetch(Server.dest + '/api/store-categories?store_id='+this.props.navigation.state.params.key).then((res)=>res.json()).then((categories)=>{
       this.setState({ tabs: categories.response });


  });

}

  renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler) {
    return <TouchableHighlight
      key={`${name}_${page}`}

      onPress={() => onPressHandler(page)}
      onLayout={onLayoutHandler}
      style={{flex: 1, width: 100,backgroundColor:Colors.mainColor }}
      underlayColor={Colors.mainColor}
    >
      <Text style={{
        fontFamily:'myfont',
        textAlign:'center',
        color:'white',
        marginTop:5
      }} >{name}</Text>
    </TouchableHighlight>;
  }

  render() {
    return <ScrollableTabView
      tabBarPosition="bottom"
      renderTabBar={() => <ScrollableTabBar renderTab={this.renderTab}/>}
    >
      {this.state.tabs.map((tab, i) => {
        return <Child
          tabLabel={`${tab.screenName}`}
          i={`${tab.key}`}
          key={i}
          navigation={this.props.navigation}
        />;
      })}
    </ScrollableTabView>;

  }

};
