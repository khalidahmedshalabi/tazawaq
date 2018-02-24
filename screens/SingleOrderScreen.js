import React from 'react';
import { Text, View,Image,Dimensions,FlatList,TouchableOpacity } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.27
import MealBox from '../components/MealBox';
import Colors from '../constants/Colors';

const Center = ({ children }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1,backgroundColor:'#ffffff' }}>{children}</View>
);
export default class SingleOrderScreen extends React.Component {
  displayMessage () {
  console.log('Timer expired')
}
  componentWillMount(){
    /*orders status
     0 ----> waiting
     1 ----> accepted on way
     2 ----> Delivered
    */
    this.state= {
      orders:[
        {
          key: 1,
          title: 'وجبه دجاج مشويه',
          status : '0',
          price : '50',
          image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
        },
        {
          key: 2,
          title: 'وجبه حمام محشى',
          status : '1',
          price : '60',
          image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
        },
        {
          key: 3,
          title: 'وجبه دجاج كنتاكي',
          status : '2',
          price : '100',
          image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
        }
      ]
    }
  }


  render() {
    const { navigate } = this.props.navigation;

    if (this.state.orders.length != 0) {
      return (


<View>


</View>

      )
    }
    return  <Center><Text style={{
      fontFamily: 'myfont',
      fontSize:16
    }}>ليس لديك طلبات حاليا</Text></Center>
  }
}
