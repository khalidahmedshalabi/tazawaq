import React from 'react';
import { ScrollView, StyleSheet,Text,FlatList,TouchableOpacity,View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Colors from '../constants/Colors';
import MealBox from '../components/MealBox';
import RestaurantBox from '../components/RestaurantBox';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.27

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
    //this.props.screenName  the key here for the category ---->
		this.state = {
			Meals: [
        {
          key:1,
          name: 'دجاج مشويه على الفحم',
          desc: '3 قطع من الدجاج + رز',
          price: 50,
          image: 'https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
        },
        {
          key:2,
          name: 'دجاج مشويه على الفحم',
          desc: '3 قطع من الدجاج + رز',
          price: 50,
          image: 'https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
        },
        {
          key:3,
          name: 'دجاج مشويه على الفحم',
          desc: '3 قطع من الدجاج + رز',
          price: 50,
          image: 'https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
        },
        {
          key:4,
          name: 'دجاج مشويه على الفحم',
          desc: '3 قطع من الدجاج + رز',
          price: 50,
          image: 'https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
        },
        {
          key:5,
          name: 'دجاج مشويه على الفحم',
          desc: '3 قطع من الدجاج + رز',
          price: 50,
          image: 'https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
        },
        {
          key:6,
          name: 'دجاج مشويه على الفحم',
          desc: '3 قطع من الدجاج + رز',
          price: 50,
          image: 'https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
        },
      ]
      }
    }
  render() {
    // const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    return (
      <View>

        <View>
          <FlatList
            automaticallyAdjustContentInsets={false}
            style={{ backgroundColor: 'white' }}
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
        </View>
      </View>
    );
  }
}
