import React from 'react';
import { Text,StyleSheet,Modal,ScrollView, View,Image,Dimensions,FlatList,TouchableOpacity,AsyncStorage,DeviceEventEmitter,SafeAreaView } from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.27
import OrderBox from '../../components/OrderBox';
import Colors from '../../constants/Colors';
import LoadingIndicator from '../../components/LoadingIndicator';
import OrderDetailBox from '../../components/OrderDetailBox';
import { Table, Row, Rows } from 'react-native-table-component';
import Server from '../../constants/server';

const Center = ({ children }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1,backgroundColor:'#ffffff' }}>{children}</View>
);
export default class OrdersScreen extends React.Component {
 return_image = (status)=>{
   if(status == 0){
     return require('../../assets/images/not-accepted.png');
   }
   else {
     return require('../../assets/images/delevering.png');
   }
 }

 componentDidMount(){
  this.fetch_data();


 }
 fetch_data(){
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
   })
   setInterval(()=>{ AsyncStorage.getItem('userid').then(id => {
     fetch(Server.dest + '/api/show-orders-current?user_id='+id)
       .then(res => res.json())
       .then(orders => {

         this.setState({
           doneFetches: 1,
           orders: orders.response,
           deliveryTime:orders.deliveryTime
         });
       });
   })}, 60000);
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
          current_id:0,
          modalVisible:false,
          detailed_order:[],
          cost_dicounted:0,
          price:0,
          delivery_cost:0,
          orders:[
          ]
        }
    }

    static navigationOptions = ({ navigation }) => {
      return {
        header: null,
        tabBarOnPress: ({ previousScene, scene, jumpToIndex }) => {
          // Inject event
          DeviceEventEmitter.emit('ReloadCurrentOrders', { empty: 0 });

          // Keep original behaviour
          jumpToIndex(scene.index);
        }
      };
    };

    listeners = {
  		update: DeviceEventEmitter.addListener('ReloadCurrentOrders', ({ empty }) => {
        this.setState({ doneFetches: 0 });
  		this.fetch_data();
  		})
  	};
    componentWillUnmount() {
      // cleaning up listeners
      // I am using lodash
      _.each(this.listeners, listener => {
        listener.remove();
      });
    }
    openModal() {
  		this.setState({ modalVisible: true });
  	}

  	closeModal() {
  		this.setState({ modalVisible: false });
  	}
    order_click(id){
      this.openModal();
      this.setState({current_id:id});
      fetch(Server.dest + '/api/order-data?id=' + id)
  			.then(res => res.json())
  			.then(data => {
  				this.setState({detailed_order:data.meals,price:data.order.cost,cost_dicounted:data.order.cost_dicounted,delivery_cost:data.order.delivery_cost})
  			});
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
    const tableHead = ['الوصف','النوع']
		const tableData = [

			['' + this.state.price, ' سعرالطلب'],
			['' + this.state.cost_dicounted, ' الخصم'],
      ['' + this.state.delivery_cost, 'رسوم التوصيل'],
			['' + this.state.price-this.state.cost_dicounted, ' السعر الإجمالي مع الضريبة'],
    ];
    if (this.state.doneFetches == 0)
			return <LoadingIndicator size="large" color="#B6E3C6" />;

    if ( this.state.orders) {
      return (


        <SafeAreaView style={{flex: 1}}>
        <Modal
          visible={this.state.modalVisible}
          animationType={'slide'}
          onRequestClose={() => this.closeModal()}

        >

          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
            <ScrollView>
            <View style={{ paddingRight: 10, paddingLeft: 10 }}>

            <Table
              borderStyle={{
                borderWidth: 0.5,
                borderColor: Colors.fadedMainColor,
                width:'100%',
                paddingTop:10
              }}
            >
              <Row
                data={tableHead}
                style={styles.head}
                textStyle={styles.text}
              />
              <Rows
                data={tableData}
                style={styles.row}
                textStyle={styles.text2}
              />
            </Table>

            <FlatList
              automaticallyAdjustContentInsets={false}
              style={{ backgroundColor: 'white',marginTop:20 }}
              removeClippedSubviews={false}
              ItemSeparatorComponent={() => (
                <View style={{ height: 5, backgroundColor: Colors.smoothGray }} />
              )}
              data={this.state.detailed_order}

              renderItem={({ item }) => (
                <TouchableOpacity

                >
                  <OrderDetailBox
                    style={styles.restaurant}
                    name={item.name}

                    desc={item.desc}
                    image={item.img}
                    price={item.cost}
                    count={item.count}
                  />
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={()=>{
              this.closeModal()
            }} style={{width:350,backgroundColor:Colors.mainColor,justifyContent:'center',alignItems:'center',color:'white',padding:10,marginRight:20,marginBottom:20,marginTop:20}} >
            <Text style={{textAlign:'center',justifyContent:'center',alignItems:'center',color:'white'}}>اغلاق</Text>
            </TouchableOpacity>
            </View>

            </ScrollView>

            </View>
          </View>
        </Modal>
          <View style={{marginTop:20}}>
            <FlatList
              automaticallyAdjustContentInsets={false}
              style={{ backgroundColor: 'white' }}
              removeClippedSubviews={false}
              ItemSeparatorComponent={ () => <View style={{ height: 5, backgroundColor: Colors.smoothGray }} /> }
              data={this.state.orders}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() =>{
                  this.order_click(item.key);
                }} >
                <OrderBox
                  name={item.title}
                  idkey={item.key}
                  status={item.status}
                  time={item.time}
                  desc={this.getStatusAsStr(item.status)}
                  image={this.return_image(item.status)}
                  price={item.price}
                />
                </TouchableOpacity>
              )}
            />
          </View>
          </SafeAreaView>
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
const styles = StyleSheet.create({
	table: { flex: 1, marginTop: 20 },
	head: { height: 70, backgroundColor: Colors.mainColor },
	headText: { fontFamily: 'myfont', textAlign: 'center', color: 'white' },
	text: {
		paddingVertical: 10,
		textAlign: 'center',
		color: Colors.secondaryColor
	},
	row: { height: 100, backgroundColor: 'white' },
	textInput: {
		flex: 1,
		color: Colors.mainColor,
		textAlign: 'right',
		fontFamily: 'myfont',
		padding: 9,
		borderRadius: 4,
		backgroundColor: 'transparent',
		borderBottomColor: Colors.fadedMainColor,
		borderBottomWidth: 0.7
	},
	inputIcon: {
		backgroundColor: 'transparent',
		marginLeft: 9
	},
	inputsContainer: {
		flex: 0.8,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '90%'
	},
	singleInputContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	signupButtonContainer: {
		flex: 0.3,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: '92%'
	},

	restaurant: {
		backgroundColor: 'white',
		flex: 1,
		padding: 100
	},

	text2: {
		fontFamily: 'myfont',
		fontSize: 13,
		color: Colors.secondaryColor,
		textAlign: 'center'
	},

	container: {
		flex: 1,
		justifyContent: 'center'
	},
		modalContainer: {
			flex: 1,
			justifyContent: 'center',
			backgroundColor: 'white'
		},
		innerContainer: {
			marginTop:20,
			flex:1
		},
});
