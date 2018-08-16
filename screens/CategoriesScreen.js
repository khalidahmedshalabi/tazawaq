import React from 'react';
import { ScrollView, StyleSheet,Text,FlatList,TouchableOpacity,View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Colors from '../constants/Colors';
import MealBox from '../components/MealBox';
import SingleCategory from '../components/SingleCategory';
import RestaurantBox from '../components/RestaurantBox';
import LoadingIndicator from '../components/LoadingIndicator';

import Server from '../constants/server';

export default class Meals extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title:'الاقسام',
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
      doneFetches:0,
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
      ],
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

    componentDidMount() {
      fetch(Server.dest + '/api/store-categories?store_id='+this.props.navigation.state.params.key).then((res)=>res.json()).then((categories)=>{
         this.setState({ tabs: categories.response });
       });
       fetch(Server.dest + '/api/store-info?store_id='+this.props.navigation.state.params.key).then((res)=>res.json()).then((restaurants)=>{
          this.setState({
            Restaurant: [restaurants.response],
            doneFetches:1
          })
        })


  // Inneed      onPress={() => onPressHandler(page)

  }

  render() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    if (this.state.doneFetches == 0)
      return <LoadingIndicator size="large" color="#B6E3C6" />;

    return (
      <View style={{backgroundColor: Colors.smoothGray }}>
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
              min_delivery_cost={item.min_delivery_cost}
            />
          )}
        />
      </View>
          <FlatList
            automaticallyAdjustContentInsets={false}
            style={{ backgroundColor: 'white',marginBottom:125 }}
            removeClippedSubviews={false}
            data={this.state.tabs}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() =>
            navigate('MealsScreen', { category_id:item.key,restaurant_id:params.key })} >
              <SingleCategory
                name={item.screenName}
              />
              </TouchableOpacity>
            )}
          />

        </View>
    );
  }
}
