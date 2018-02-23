import React from 'react';
import { ScrollView,DeviceEventEmitter, StyleSheet,Text,FlatList,TouchableOpacity,View,Dimensions,Image,AsyncStorage } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Colors from '../constants/Colors';
import TicketBox from '../components/TicketBox';
import Server from '../constants/server';
import LoadingIndicator from '../components/LoadingIndicator';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

const Center = ({ children }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1,backgroundColor:'#ffffff' }}>{children}</View>
);
export default class Meals extends React.Component {
  static navigationOptions = ({ navigation }) => {
      return {
          tabBarOnPress: ({ previousScene, scene, jumpToIndex }) => {
              // Inject event
              DeviceEventEmitter.emit('ReloadMyLibraryBooks', { empty: 0 });

              // Keep original behaviour
              jumpToIndex(scene.index);
          }
      }
  }

  listeners = {
      update: DeviceEventEmitter.addListener('ReloadMyLibraryBooks', ({ empty }) => {
                      this.setState({ doneFetches: 0 });
                      this.doTheFetching();
      })
  }
  componentWillUnmount() {
      // cleaning up listeners
      // I am using lodash
      _.each(this.listeners, (listener) => {
          listener.remove()
      })
  }
make_order = ()=>{
  AsyncStorage.getItem('login').then((logged)=>{
    if(logged == 1){
      AsyncStorage.getItem('userid').then((userid)=>{
        AsyncStorage.getItem('location').then((location)=>{
          AsyncStorage.getItem('hint').then((hint)=>{
          fetch(Server.dest + '/api/make-order?ids='+this.state.ids+'&store_id='+this.state.store_id+'&user_id='+userid+'&cost='+this.state.after_cost+'&address='+location+'&address_hint='+hint+'&info=a').then((res)=>res.json()).then((meals)=>{
            alert('order done');
          })
          })
        })
      })
    }
    else{
      alert('يجب عليك تسجيل الدخول اولا');
    }
  })
}



  componentDidMount(){
    this.doTheFetching();
  }
doTheFetching = ()=>{
  AsyncStorage.getItem('cart').then((ids)=>{
      this.setState({
        ids:ids
      });
  }).then(()=>{
    fetch(Server.dest + '/api/meals-by-ids?ids='+this.state.ids).then((res)=>res.json()).then((meals)=>{
      this.setState({
        meals: meals.meals
      })
    })
    }).then( ()=>{

    fetch(Server.dest + '/api/order-price?ids='+this.state.ids).then((res)=>res.json()).then((data)=>{
      this.setState({
        doneFetches:1,
        before_cost: data.before,
        after_cost: data.after,
        store_id: data.store_id
      })
    })
  })

}
  constructor(props) {

		super(props);

    this.state = {
      doneFetches:0,
			meals: [],
      before_cost: 0,
      after_cost: 0,
      store_id: 0
    }
  }



  render() {
    const tableHead = ['السعر','التصنيف'];
      const tableData = [
        [''+this.state.before_cost,'الاجمالى قبل الضريبه'],
        [''+this.state.after_cost,'الاجمالى بعد الضريبه'],
      ];
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    if(this.state.doneFetches == 0)
        return (<LoadingIndicator size="large" color="#B6E3C6" />);

    if (this.state.meals.length != 0) {

      return (
        <View>
        <View style={{ backgroundColor: '#FFFFFF',
                 }}>

            <Image
                style={{ flex: 1, height: '100%', width: Dimensions.get('window').width }}
                resizeMode='cover'
                source={require('../assets/images/splash.jpg')} />

          </View>

            <FlatList
              automaticallyAdjustContentInsets={false}
              style={{ backgroundColor: 'white', }}
              removeClippedSubviews={false}
              ItemSeparatorComponent={ () => <View style={{ height: 5, backgroundColor: Colors.smoothGray }} /> }
              data={this.state.meals}
              ListHeaderComponent = { ()=><Image
                resizeMode='cover'
      					style={{  padding:10,height:150, width: '100%' }}
                source={require('../assets/images/splash.jpg')}

      				/> }

              ListFooterComponent={()=>
                <View style={{paddingRight:10,paddingLeft:10}}>
                <Table  borderStyle={{borderWidth: 0.5, borderColor: Colors.fadedMainColor}}>
                  <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                  <Rows data={tableData} style={styles.row} textStyle={styles.text2}/>
                </Table>

                <TouchableOpacity
                onPress={()=>{
                  this.make_order()
                }}
                 style={{flex:1,justifyContent:'center',alignSelf:'center',padding:10,marginTop:10,flexDirection:'row',borderWidth:5,borderColor:'#e9e9ef'}}>
                <Text style={{
                  fontFamily:'myfont',
                }}>شراء الان</Text>
                <MaterialCommunityIcons
    						name="plus-circle"
    						size={30}
    						color={Colors.secondaryColor}
                style={{paddingLeft:5}}
    					/>

            </TouchableOpacity>
          </View>}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() =>
              navigate('SingleTicketScreen', { Ticket_id:item.key })} >
                <TicketBox
                  name={item.name}
                  status='-1'
                  desc={item.desc}
                  price={item.price}
                />
                </TouchableOpacity>
              )}
            />
            </View>
      );
    }

    return (
        <Center><Text style={{
          fontFamily: 'myfont',
          fontSize:16 }}>ليس لديك شئ ب السله الان</Text></Center>
      );
  }


}
const styles = StyleSheet.create({
  head: { height: 40, backgroundColor: Colors.mainColor },
  text: { textAlign:'center' ,fontFamily:'myfont',fontSize:18,color:'white' },
  text2: {fontFamily:'myfont',fontSize:13,color:Colors.mainColor,textAlign:'center' },
  row: { height: 30 }
})
