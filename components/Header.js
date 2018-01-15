import React from 'react';
import {
  Platform,
  View,
  TextInput,
  StyleSheet,
  Text
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Font } from 'expo';

export default class Header extends React.Component {
    componentDidMount() {
		this.setState({ fontLoaded: '1' });
	}

    constructor(props){
        super(props)

        this.state = {
          searchText: '',
          fontLoaded: '0',
          location: 'الرياض, السعودية'
        }
    }

    doSearch = () => {
        if(this.state.searchText.length)
            this.props.nav.navigate("SearchResult", {searchingFor: this.state.searchText});
    };

  render() {
    return (
        <View>

            <View style={styles.topbox} key="1">
                <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center'}}>
                    {this.state.fontLoaded == '1' ? (
                        <Text style={{ fontFamily: 'myfont' }}> {this.state.location}</Text>
                    ) : null}
                </View>
            </View>

            <View style={styles.box} key="2">
                <Ionicons
                    onPress={ () => this.doSearch() }
                    name="ios-search-outline"
                    size={32}
                    style={{ padding: 10 }}
                    color="gray"
                />
                <TextInput
                    {...this.props}
                    style={styles.input}
                    placeholderTextColor='#ccc'
                    placeholder="ابحث عن مطعم..."
                    returnKeyType={"search"}
                    underlineColorAndroid="transparent"
                    onChangeText={(text) => this.setState({searchText:text})}
                    onSubmitEditing={(event) => this.doSearch() }
                />
            </View>
        </View>
    );
  }
}

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
		marginTop: 10,
		backgroundColor: '#fff',
		fontSize: 15,
		alignItems: 'center',
		marginRight: 7,
		marginLeft: 7,

		flex: 1
	},

	topbox: {
		height: 55,
        flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		backgroundColor: '#fff'
	}
});
