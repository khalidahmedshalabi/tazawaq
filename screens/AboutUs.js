import React from 'react';
import { ScrollView, Text } from "react-native";

import MenuBackButton from './MenuBackButton'
import Colors from '../constants/Colors';

export default class AboutUs extends React.Component {
    static navigationOptions = {
        header:null
    };

    render() {
        return (
            <ScrollView style={{ backgroundColor: '#FCFFFD', height: '100%' }}>
                <MenuBackButton style={{marginTop:20}} navigation={this.props.navigation} />
                <Text style={{ fontFamily:'myfont',color: Colors.mainColor, backgroundColor: 'transparent', fontWeight: 'bold', fontSize: 18, margin: 12, marginTop: 20}}>عن تطبيق طلباتك</Text>
                <Text style={{fontFamily:'myfont',textAlign:'center', color: Colors.secondaryColor, backgroundColor: '#F5FAF7', fontSize: 16, padding: 12, marginTop: 10}}>
                {`تطبيق يجمع مختلف المحلات التجارية  و يشمل المطاع و المخابز و الحلويات و السوبرماركات و العميل يختار ما يريد و يطلب بوقت أقل و توصيل سريع و تكلفة أقل .
التطبيق يجمع أفضل المحلات التجارية  ، و هي تجربة جديدة للعميل ، يخدم العميل بسرعة و دقة ، بطريقة تسجيل دخول متعددة يمكنك تنفيذ طلبك خلال ثواني .

فريق العمل`}</Text>
            </ScrollView>
        );
    }
}
