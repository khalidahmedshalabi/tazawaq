import React from 'react';
import { Text, View,Image,Dimensions,FlatList,TouchableOpacity,AsyncStorage } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.27
import MealBox from '../../components/MealBox';
import Colors from '../../constants/Colors';
import LoadingIndicator from '../../components/LoadingIndicator';
import Server from '../../constants/server';

const Center = ({ children }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1,backgroundColor:'#ffffff' }}>{children}</View>
);
export default class OrdersScreen extends React.Component {
 return_image = (status)=>{
   if(status == 0){
     return 'https://images.pexels.com/photos/41280/agent-business-call-center-41280.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
   }
   else {
     return 'https://images.pexels.com/photos/296888/pexels-photo-296888.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
   }
 }

 componentDidMount(){
   AsyncStorage.getItem('userid').then(id => {
     fetch(Server.dest + '/api/show-orders-current?user_id='+id)
       .then(res => res.json())
       .then(orders => {

         this.setState({
           doneFetches: 1,
           orders: orders.response,
           deliveryTime:orders.deliveryTime
         });
       });
   });


 }

    constructor(props) {
        super(props)
        /*orders status
         0 ----> waiting
         1 ----> accepted on way
         2 ----> Delivered
        */
        this.state= {
          doneFetches:0,
          orders:[
          ]
        }
    }

    getStatusAsStr = (status) => {
        switch(status)
        {
            case 0:
                return ("قيد القبول");
            case 1:
                return ("جاري التوصيل");
            case 2:
                return ("تم التوصيل");
        }
    };

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.doneFetches == 0)
			return <LoadingIndicator size="large" color="#B6E3C6" />;
    if ( this.state.orders) {
      return (


          <View>
            <FlatList
              automaticallyAdjustContentInsets={false}
              style={{ backgroundColor: 'white' }}
              removeClippedSubviews={false}
              ItemSeparatorComponent={ () => <View style={{ height: 5, backgroundColor: Colors.smoothGray }} /> }
              data={this.state.orders}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() =>
              navigate('SingleOrderScreen', { deliveryTime:this.state.deliveryTime })} >
                <MealBox
                  name={item.title}

                  desc={this.getStatusAsStr(item.status)}
                  image={this.return_image(item.status)}
                  price={item.price}
                />
                </TouchableOpacity>
              )}
            />
          </View>

      );
    }
    else{
    return (
        <Center><Text style={{
          fontFamily: 'myfont',
          fontSize:16 }}>ليس لديك طلبات حاليا</Text></Center>
      );
    }
  }
}
