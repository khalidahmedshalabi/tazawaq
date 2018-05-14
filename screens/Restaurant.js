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


  render() {
    const i = this.props.i;
    return <MealsWrapper navigation={this.props.navigation} restaurant_id={this.props.navigation.state.params.key} screenName={i}  />;
  },
});

export default class Restaurants extends React.Component {
    shouldRenderRestaurants = () => {
            if(this.state.Restaurant)
            {
                return (
                    <View style={{flex:0.3,backgroundColor:'white'}}>
                    <RestaurantBox
                    stars={this.state.Restaurant.stars}
                    name={this.state.Restaurant.name}
                    time={this.state.Restaurant.time}
                    desc={this.state.Restaurant.desc}
                    image={this.state.Restaurant.image}
                    price={this.state.Restaurant.deliver_price}
                    min_delivery_cost={this.state.Restaurant.min_delivery_cost}
                    status={this.state.Restaurant.status}
                    />
                    </View>
                );
            }
        };
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
     title:'الأقسام',
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
     fontSize: 16,
     headerTintColor: Colors.smoothGray,
   },
   });


  componentDidMount() {
    fetch(Server.dest + '/api/store-categories?store_id='+this.props.navigation.state.params.key).then((res)=>res.json()).then((categories)=>{
       this.setState({ tabs: categories.response });

      fetch(Server.dest + '/api/store-info?store_id='+this.props.navigation.state.params.key).then((res)=>res.json()).then((restaurants)=>{
         this.setState({
           Restaurant: restaurants.response
         })

       })

  });
// Inneed      onPress={() => onPressHandler(page)

}

  renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler) {
    return <TouchableHighlight
      key={`${name}_${page}`}

      onLayout={onLayoutHandler}
      style={{flex: 1,width:150,backgroundColor:Colors.mainColor }}
    >

      <Text style={{
        fontFamily:'myfont',
        textAlign:'center',
        color:'white',
        fontSize:16,
        marginTop:10,
        flex:1,
        width:150
    }} >{name}</Text>
    </TouchableHighlight>;
  }

  render() {
    return(
        <View style={{flex:1}}>
        {this.shouldRenderRestaurants()}
         <ScrollableTabView
    tabBarPosition="bottom"
      renderTabBar={() => <ScrollableTabBar renderTab={this.renderTab}/>}
    >
      {this.state.tabs.map((tab, i) => {
        return <Child
          tabLabel={`${tab.screenName}`}
          i={`${tab.key}`}
          key={`${tab.key}`}
          navigation={this.props.navigation}
        />;
      })}
    </ScrollableTabView>
    </View>
);
}

}


;
