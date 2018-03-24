import React from 'react';
import {
	Text,
	View,
	Image,
	Dimensions,
	FlatList,
	TouchableOpacity,
	StyleSheet
} from 'react-native';
import { TabNavigator } from 'react-navigation'; // 1.0.0-beta.27
import MealBox from '../components/MealBox';
import Colors from '../constants/Colors';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Timeline from 'react-native-timeline-listview';
import StarRating from 'react-native-star-rating';
import { Button } from 'react-native-elements';

const Center = ({ children }) => (
	<View
		style={{
			alignItems: 'center',
			flex: 1,
			backgroundColor: '#ffffff',
			textAlign: 'right'
		}}
	>
		{children}
	</View>
);
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		paddingTop: 65,
		backgroundColor: 'white'
	},
	list: {
		flex: 1,
		marginTop: 20
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold'
	},
	descriptionContainer: {
		flexDirection: 'row',
		paddingRight: 50,
		textAlign: 'right'
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 25
	},
	textDescription: {
		marginLeft: 10,
		color: 'gray',
		textAlign: 'right'
	}
});

export default class SingleOrderScreen extends React.Component {
	static navigationOptions = {
		header: null
	};
	constructor(props) {
		super(props);
		this.renderDetail = this.renderDetail.bind(this);
		var deliveryTime = this.props.navigation.state.params.deliveryTime * 60;
		this.state = {
			deliveryTime: deliveryTime, // sec
			timeLeft: deliveryTime,
			data: [
				{
					title: 'تم قبول طلبك من طرف البائع'
				},
				{
					title: 'جاري توصيل طلبك'
				},
				{
					title: 'تقيم الخدمة'
				}
			],
			starCount: 3.5
		};
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
	componentWillMount() {
		/*orders status
     0 ----> waiting
     1 ----> accepted on way
     2 ----> Delivered
    */
	}
	componentDidMount() {
		setInterval(() => {
			if (this.state.timeLeft > 0) {
				this.setState({
					timeLeft: this.state.timeLeft - 1
				});
			}
		}, 1000);
	}

	onStarRatingPress(rating) {
		this.setState({
			starCount: rating
		});
	}

	renderDetail(rowData, sectionID, rowID) {
		return (
			<View style={{ flex: 1 }}>
				<Text style={styles.title}>{rowData.title}</Text>
				{rating}
			</View>
		);
	}

	render() {
		return (
			<Center>
			{(this.props.navigation.state.params.status !=0)?
					(
						<AnimatedCircularProgress
							style={{ marginTop: 40 }}
							size={200}
							width={3}
							fill={this.state.timeLeft / this.state.deliveryTime * 100}
							tintColor={Colors.mainColor}
							backgroundColor="#3d5875"
						>
							{fill => (
								<Text
									style={{
										backgroundColor: 'transparent',
										position: 'absolute',
										top: 60,
										left: 56,
										width: 90,
										textAlign: 'center',
										color: '#7591af',
										fontSize: 50,
										fontWeight: '100'
									}}
								>
									{parseInt(this.state.timeLeft)}
									<Text style={{ fontSize: 20 }}> Sec</Text>
								</Text>
							)}
						</AnimatedCircularProgress>
					):(<Image
							style={{ flex: 1, height: '20%', width: '100%' }}
							resizeMode='cover'
							source={require('../assets/images/not-accepted.png')} />)
			}

			<Text>{this.getStatusAsStr(this.props.navigation.state.params.status)}</Text>
				<StarRating
					style={{ flex: 1 }}
					disabled={false}
					maxStars={5}
					fullStarColor={Colors.mainColor}
					rating={this.state.starCount}
					selectedStar={rating => this.onStarRatingPress(rating)}
				/>
				<Button
					onPress={() => {
						this.props.navigation.goBack();
					}}
					color="white"
					backgroundColor={Colors.mainColor}
					containerViewStyle={{ borderRadius: 15, margin: 20 }}
					borderRadius={15}
					buttonStyle={{ paddingHorizontal: 30 }}
					textStyle={{ fontFamily: 'myfont' }}
					title="إغلاق الطلب"
				/>
			</Center>
		);
	}
}
