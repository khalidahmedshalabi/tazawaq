import React from 'react';
import { ScrollView, StyleSheet,Text,FlatList,TouchableOpacity,View,SafeAreaView } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Colors from '../constants/Colors';
import MealBox from '../components/MealBox';
import RestaurantBox from '../components/RestaurantBox';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.27
import Server from '../constants/server';
import LoadingIndicator from '../components/LoadingIndicator';

export default class Meals extends React.Component {

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
  constructor(props) {
		super(props);
    //this.props.screenName  the key here for the category  restaurant_id---->

		this.state = {
      doneFetches:0,
			Meals: [

      ],
      Restaurant:[]
      }
    }
    componentDidMount(){
      fetch(Server.dest + '/api/store-products?category_id='+this.props.screenName+'&store_id='+this.props.restaurant_id).then((res)=>res.json()).then((meals)=>{
        this.setState({
          doneFetches:1,
          Meals: meals.response
          })

        })
        fetch(Server.dest + '/api/store-info?store_id='+this.props.navigation.state.params.key).then((res)=>res.json()).then((restaurants)=>{
          this.setState({
            Restaurant: [restaurants.response],
          })

        });
    }
  render() {
    // const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    if(this.state.doneFetches == 0)
				return (<LoadingIndicator size="large" color="#B6E3C6" />);
    return (

      <View>

        <View>
        <FlatList
          automaticallyAdjustContentInsets={false}
          style={{ backgroundColor: 'white',borderBottomWidth:.3,borderBottomColor:'black' }}
          removeClippedSubviews={false}
          ItemSeparatorComponent={ () => <View style={{ height: 5, backgroundColor: Colors.smoothGray }} /> }
          data={this.state.Restaurant}
          ListFooterComponent = {()=>(
            <FlatList
              automaticallyAdjustContentInsets={false}
              style={{ backgroundColor: 'white',borderTopColor:Colors.secondaryColor,borderTopWidth:1 }}
              removeClippedSubviews={false}
              ItemSeparatorComponent={ () => <View style={{ height: 5, backgroundColor: Colors.smoothGray }} /> }
              data={this.state.Meals}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() =>
              navigate('SingleMeal', { meal_id:item.key,restaurant_id:this.props.restaurant_id })} >
                <MealBox
                  name={item.name}
                  time={item.time}
                  desc={item.desc}
                  image={item.image}
                  price={item.price}
                />
                </TouchableOpacity>
              )}
            />

          )}
          renderItem={({ item }) => (

            <RestaurantBox

            stars={item.stars}
            name={item.name}
            time={item.time}
            desc={item.desc}
            image={item.image}
            price={item.deliver_price}
            min_delivery_cost={item.min_delivery_cost}

            status={item.status}
            />
          )}
        />

        </View>
      </View>
    );
  }
}
