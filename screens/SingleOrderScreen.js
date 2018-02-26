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

const Center = ({ children }) => (
	<View
		style={{
			alignItems: 'center',
			flex: 1,
			backgroundColor: '#ffffff'
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
		paddingRight: 50
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 25
	},
	textDescription: {
		marginLeft: 10,
		color: 'gray'
	}
});

export default class SingleOrderScreen extends React.Component {
	static navigationOptions = {
		header: null
	};
	constructor(props) {
		super(props);
		this.renderDetail = this.renderDetail.bind(this);
		this.state = {
			deliveryTime: 20, // 10sec
			timeLeft: 20,
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
			]
		};
	}
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

	renderDetail(rowData, sectionID, rowID) {
		let title = <Text style={styles.title}>{rowData.title}</Text>;
		var desc = null;
		if (rowData.description && rowData.imageUrl)
			desc = (
				<View style={styles.descriptionContainer}>
					<Image source={{ uri: rowData.imageUrl }} style={styles.image} />
					<Text style={[styles.textDescription]}>{rowData.description}</Text>
				</View>
			);

		return (
			<View style={{ flex: 1 }}>
				{title}
				{desc}
			</View>
		);
	}

	render() {
		return (
			<Center>
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
							<Text style={{ fontSize: 20 }}> min</Text>
						</Text>
					)}
				</AnimatedCircularProgress>
				<Timeline
					circleColor={Colors.mainColor}
					lineColor={Colors.mainColor}
					style={{ flex: 1, width: '100%', marginTop: 30 }}
					separator={false}
					data={this.state.data}
					renderEvent={this.renderEvent}
					columnFormat="single-column-right"
				/>
			</Center>
		);
	}
}
