import React from 'react';
import { ScrollView,DeviceEventEmitter, StyleSheet,Text,FlatList,TouchableOpacity,View,Dimensions,Image,AsyncStorage } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Colors from '../constants/Colors';
import TicketBox from '../components/TicketBox';
import Server from '../constants/server';
import LoadingIndicator from '../components/LoadingIndicator';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';

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
        doneFetches:1,
        meals: meals.meals
      })
    })
  })
}
  constructor(props) {

		super(props);

    this.state = {
      doneFetches:0,
			meals: [
        {
        key: 1,
  name: "سششسسش",
  image: "https://scontent-cai1-1.xx.fbcdn.net/v/t35.0-12/26827647_1597359143682361_1904429709_o.jpg?oh=972b9d36bb514c5f25abc1d667a97b48&oe=5A87675B",
  price: 50,
  desc: "شسسشسشء"
}
      ]
    }
  }

  render() {
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
                <View style={{flex:1,justifyContent:'center',alignSelf:'center',padding:10,flexDirection:'row',borderWidth:5,borderColor:'#e9e9ef'}}>
                <Text style={{
                  fontFamily:'myfont',
                }}>شراء الان</Text>
                <MaterialCommunityIcons
    						name="plus-circle"
    						size={30}
    						color={Colors.secondaryColor}
                style={{paddingLeft:5}}
    					/>

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
          fontSize:16 }}>ليس لديك اى تذاكر حاليا</Text></Center>
      );
  }


}
