import React from 'react';
import { Dimensions, KeyboardAvoidingView, AsyncStorage,
        StyleSheet, TextInput, View, Text, Image,
        Platform, TouchableOpacity,FlatList } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import Colors from '../constants/Colors';
import SingleCategory from '../components/SingleCategory';
import LoadingIndicator from '../components/LoadingIndicator';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import RestaurantBox from '../components/RestaurantBox';

import Server from '../constants/server';
var styles = StyleSheet.create({
	box: {
		height: 45,
		backgroundColor: '#FFF',
		shadowColor: '#000000',
		shadowOpacity: 2,
		shadowOffset: {
			height: 2,
			width: 0
		},
		borderColor: 'gray',
		borderWidth: 0.3,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center'
	},

	input: {
		justifyContent: 'center',
		height: 22,
		fontFamily: 'myfont',
		marginTop: 5,
		backgroundColor: '#fff',
		fontSize: 13,
		alignItems: 'center',
		marginRight: 7,
		marginLeft: 7,
		flex: 1
	},

	topbox: {
		alignItems: 'center',
		height: 55,
		justifyContent: 'center',
		backgroundColor: '#fff'
	},

	restaurant: {
		backgroundColor: 'white',
		flex: 1,
		height:50,

	}
});
export default class Restaurant extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title:'الاصناف ب المطعم',
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
    Categories: [
      {
        key: 1,
        name: 'الدجاج'
      },
      {
        key:2,
        name: 'المشويات'
      },
      {
        key:3,
        name: 'المندي'
      },
      {
        key:4,
        name: 'الوجبات الاضافيه'
      },
      {
        key:5,
        name: 'عروض خاصه'
      },
      {
        key:6,
        name:'لحوم'
      },
      {
        key:7,
        name:'وجبات اخري'
      },
      {
        key:8,
        name:'مشروبات'
      },
      {
        key:9,
        name:'مشروبات'
      },
      {
        key:10,
        name:'حلويات'
      },
      {
        key:11,
        name:'مقبلات'
      },
      {
        key:12,
        name:'وجبات زائده'
      }
    ]
  }
}

    render() {
      const { params } = this.props.navigation.state;
      const { navigate } = this.props.navigation;

      return(
        <View>
        <View>
        <FlatList
          automaticallyAdjustContentInsets={false}
          style={{ backgroundColor: 'white',borderBottomWidth:.3,borderBottomColor:'black' }}
          removeClippedSubviews={false}
          ItemSeparatorComponent={ () => <View style={{ height: 5, backgroundColor: Colors.smoothGray }} /> }
          data={this.state.Restaurant}
          renderItem={({ item }) => (

            <RestaurantBox
              style={styles.restaurant}
              stars={item.stars}
              name={item.name}
              time={item.time}
              desc={item.desc}
              image={item.image}
              price={item.deliver_price}
            />
          )}
        />
        </View>
        <View>
        <FlatList
          automaticallyAdjustContentInsets={false}
          ItemSeparatorComponent={ () => <View style={{ height: 5, backgroundColor: Colors.smoothGray }} /> }
          style={{ backgroundColor: 'white'}}
          removeClippedSubviews={false}
          data={this.state.Categories}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() =>
          navigate('Meals', { category_id:item.key,restaurant_id:params.key })} >
            <SingleCategory
            name={item.name}
            />
            </TouchableOpacity>
          )}
        />
        </View>
        </View>

      );

    }

}
