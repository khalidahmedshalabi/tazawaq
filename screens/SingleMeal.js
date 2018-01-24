import React from 'react';
import { ScrollView, StyleSheet,Text,FlatList,TouchableOpacity,View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Colors from '../constants/Colors';
import MealBox from '../components/MealBox';
import { Button } from "react-native-elements";
import RestaurantBox from '../components/RestaurantBox';

export default class SingleMeal extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title:'الوجبه',
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


		this.state = {
      Restaurant: [
        {
          key: 1,
          name: 'مطعم كنتاكي للدجاج',
          image:
            'https://d30v2pzvrfyzpo.cloudfront.net/images/chains/kfc-opengraph-1.jpg',
          time: '30',
          desc: 'تمتع بوجبه خفيفه',
          stars: '5',
          deliver_price: '40'
        }
      ],
			Meal: [
          {
            key:1,
            name: 'دجاج مشويه على الفحم',
            desc: '3 قطع من الدجاج + رز',
            price: 50,
            image: 'https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
          },
      ]
      }
    }
  render() {
const { params } = this.props.navigation.state;
    return (
      <View>
      <FlatList
        automaticallyAdjustContentInsets={false}
        style={{ backgroundColor: 'white',borderBottomWidth:.3,borderBottomColor:'black' }}
        removeClippedSubviews={false}
        ItemSeparatorComponent={ () => <View style={{ height: 5, backgroundColor: Colors.smoothGray }} /> }
        data={this.state.Restaurant}
        renderItem={({ item }) => (

          <RestaurantBox
          
            stars={item.stars}
            name={item.name}
            time={item.time}
            desc={item.desc}
            image={item.image}
            price={item.deliver_price}
          />
        )}
      />
      <FlatList
        automaticallyAdjustContentInsets={false}
        style={{ backgroundColor: 'white' }}
        removeClippedSubviews={false}
        ItemSeparatorComponent={ () => <View style={{ height: 5, backgroundColor: Colors.smoothGray }} /> }
        data={this.state.Meal}
        renderItem={({ item }) => (

          <MealBox
            name={item.name}
            time={item.time}
            desc={item.desc}
            image={item.image}
            price={item.price}
          />
        )}
      />
      <Button
          onPress={() => {
              this.registerUser()
          }}
          color='white'
          backgroundColor={Colors.mainColor}
          containerViewStyle={{borderRadius:15}}
          borderRadius={15}
          buttonStyle={{ padding: 10 }}
          textStyle={{ fontFamily: 'myfont' }}
          title="شراء الان" />
      </View>
    );
  }
}
