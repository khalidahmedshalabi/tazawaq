import React from 'react';
import { ScrollView,KeyboardAvoidingView, TextInput,StyleSheet,Text,FlatList,TouchableOpacity,View,AsyncStorage } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Colors from '../constants/Colors';
import MealBox from '../components/MealBox';
import { Button } from "react-native-elements";
import RestaurantBox from '../components/RestaurantBox';
import Server from '../constants/server';
import LoadingIndicator from '../components/LoadingIndicator';
// import { NavigationActions } from 'react-navigation';

export default class SingleMeal extends React.Component {

  addcart = ()=>{
    var meal = this.state.Meal[0];
    var num = this.state.num || 1 ;

      AsyncStorage.getItem('cart').then((cart)=>{
        AsyncStorage.setItem('cart',cart+','+meal.key).then(()=>{
          if(num > 1){
            this.setState({
              num : num-1,
            })
            this.addcart()
          }
          else {
            alert('تم الاضافه الى السله')
          }

        })

      })



  }

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
      doneFetches:0,
      Restaurant: [


      ],
			Meal: [

      ]
      }
    }
    componentDidMount(){
        fetch(Server.dest + '/api/store-info?store_id='+this.props.navigation.state.params.restaurant_id).then((res)=>res.json()).then((restaurants)=>{
          fetch(Server.dest + '/api/product-info?product_id='+this.props.navigation.state.params.meal_id).then((res)=>res.json()).then((meals)=>{

            this.setState({
              doneFetches:1,
              Restaurant: [restaurants.response],
        			Meal: [meals.response]
            })
            console.log(this.state.Restaurant)
        })
      })
    }
  render() {
const { params } = this.props.navigation.state;
if(this.state.doneFetches == 0)
    return (<LoadingIndicator size="large" color="#B6E3C6" />);

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
        ListFooterComponent={()=>(
          <View>
          <KeyboardAvoidingView>
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="عدد الوجبات"
            placeholderTextColor="#CCCCCC"
            keyboardType="numeric"
            style={{
              flex: 0.5,
              fontSize: 33,
              color: Colors.mainColor,
              textAlign: 'center',
              fontFamily: 'myfont',
              borderRadius: 4,
              backgroundColor: 'transparent',
              borderBottomColor: Colors.fadedMainColor,
              borderBottomWidth: 1
            }}
            value={this.state.num}
            onChangeText={(text) => {
              this.setState({ num: text },()=>{
                alert(this.state.num);
              })
          }}
          />
          <Button
              onPress={() => {
                  this.addcart();
              }}
              color='white'
              backgroundColor={Colors.mainColor}
              containerViewStyle={{borderRadius:15}}
              borderRadius={15}
              buttonStyle={{ padding: 10 }}
              textStyle={{ fontFamily: 'myfont' }}
              title="اضف الى السله" />
              </KeyboardAvoidingView>
              </View>

        )
        }
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

      </View>
    );
  }
}
