import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	AsyncStorage
} from 'react-native';
import MealBox from '../components/MealBox';
import Colors from '../constants/Colors';
import Server from '../constants/server';
import LoadingIndicator from '../components/LoadingIndicator';

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
		padding: 100
	}
});

export default class OffersTab extends React.Component {
	componentDidMount() {
		fetch(`${Server.dest}/api/all-offers`)
			.then(res => res.json())
			.then(res =>
				this.setState({ offers: res.response }, () =>
					this.setState({ doneFetches: 1 })
				)
			);
	}

	constructor(props) {
		super(props);
		this.state = {
			doneFetches: 0,
			offers: []
		};
	}

	_keyExtractor = (item, index) => item.id;

	render() {
		const { navigate } = this.props.navigation;
		if (this.state.doneFetches == 0)
			return <LoadingIndicator size="large" color="#B6E3C6" />;

		return (
			<View style={{marginTop:20}}>
				<FlatList
					automaticallyAdjustContentInsets={false}
					style={{ backgroundColor: 'white' }}
					removeClippedSubviews={false}
					keyExtractor={this._keyExtractor}
					ItemSeparatorComponent={() => (
						<View style={{ height: 5, backgroundColor: Colors.smoothGray }} />
					)}
					data={this.state.offers}
					renderItem={({ item }) => (
						<TouchableOpacity

						>
							<MealBox
								style={styles.restaurant}
								name={item.name}
								desc={item.info}
								image={item.img}
							/>
						</TouchableOpacity>
					)}
				/>
			</View>
		);
	}
}
