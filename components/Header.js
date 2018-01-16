import React from 'react';
import {
  Platform,
  View,
  TextInput,
  StyleSheet,
  Text,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { Font } from 'expo';

export default class Header extends React.Component {
    componentDidMount() {
		this.setState({ fontLoaded: '1' });

        AsyncStorage.getItem('location').then(
            (value) => {
                this.setState({
                    location: (value === null) ? 'لم يتم تحديد مكان' : value
                });
            });
	}

    constructor(props){
        super(props)

        this.state = {
            displaySearch: 0,
            searchText: '',
            fontLoaded: '0',
            location: ' '
        }
    }

    doSearch = () => {
        if(this.state.searchText.length)
            this.props.navigation.navigate("SearchResult", {searchingFor: this.state.searchText});
    };

    trimName = (str) => {
        return (str.length > 35) ? (str.substring(0, 32) + "...") : str;
    };

    renderHeaderButton = () => {
        if(this.state.displaySearch)
        {
            return (
                <TouchableOpacity onPress={ () => this.setState({displaySearch: 0}) }>
                    <Ionicons
                        name={ (Platform.OS === 'ios') ? "ios-arrow-up" : "md-arrow-dropup" }
                        size={32}
                        style={{ padding: 10 }}
                        color="gray"
                    />
                </TouchableOpacity>
            );
        }
        else
        {
            return (
                <TouchableOpacity onPress={ () => this.setState({displaySearch: 1}) }>
                    <Ionicons
                        name={ (Platform.OS === 'ios') ? "ios-search" : "md-search" }
                        size={32}
                        style={{ padding: 10 }}
                        color="gray"
                    />
                </TouchableOpacity>
            );
        }
    };

    shouldDisplaySearchBar = () => {
        if(this.state.displaySearch)
        {
            return (
                <View style={styles.box}>
                    <TouchableOpacity onPress={ () => this.doSearch() }>
                        <Ionicons
                            name={ (Platform.OS === 'ios') ? "ios-search" : "md-search" }
                            size={32}
                            style={{ padding: 10 }}
                            color="gray"
                        />
                    </TouchableOpacity>
                    <TextInput
                        {...this.props}
                        style={styles.input}
                        placeholderTextColor='#999999'
                        placeholder="البحث عن مطعم"
                        returnKeyType={"search"}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => this.setState({searchText:text})}
                        onSubmitEditing={(event) => this.doSearch() }
                    />
                </View>
            );
        }
        else return null;
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topbox}>
                    <View style={{ flex:0.2, flexDirection: 'row', justifyContent:'flex-start' }}>
                        {this.renderHeaderButton()}
                    </View>

                    <View style={{ flex:1, flexDirection: 'row', justifyContent:'center' }}>
                        {this.state.fontLoaded == '1' ? (
                            <Text style={{ fontSize: 16, fontFamily: 'myfont' }}> {this.trimName(this.state.location)}</Text>
                        ) : null}
                    </View>
                </View>

                {this.shouldDisplaySearchBar()}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    topbox: {
		height: 55,
        flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
        justifyContent: 'center',
		backgroundColor: '#fff',
        borderBottomColor: '#EEEEEE',
        borderBottomWidth: 1
	},
	box: {
		height: 45,
		backgroundColor: Colors.smoothGray,
        borderRadius: 9,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
        marginVertical: 12,
        marginHorizontal: 10
	},

	input: {
		justifyContent: 'center',
		height: 22,
		fontFamily: 'myfont',
		marginTop: 10,
		backgroundColor: 'transparent',
		fontSize: 15,
		alignItems: 'center',
		marginRight: 7,
		marginLeft: 7,

		flex: 1
	},
});
