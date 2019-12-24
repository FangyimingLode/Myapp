import React, { Fragment } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Alert,
    Dimensions,
    Animated} from 'react-native';
import { Icon, Button, Tooltip, Card, Divider } from 'react-native-elements';
import { get } from '../../utils/global';
import AsyncStorage from '@react-native-community/async-storage';
export default class HomePage extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: '会议',
            headerRight: (
                <Fragment>
                    <Button
                        type="clear"
                        title='管理'
                        titleStyle={{ paddingLeft: 9, fontSize: 14, color: '#fff' }}
                        onPress={navigation.getParam('goToMeeting')}
                    />
                    <Tooltip popover={
                        <Fragment>
                            <Button
                                title='发起会议'
                                type='clear'
                                titleStyle={{ paddingRight: 2, fontSize: 14 }}
                                onPress={navigation.getParam('createMeeting')}
                            />
                            <Divider style={{ height: 1, backgroundColor: '#e1e8ee' }} />
                            <Button
                                icon={
                                    <Icon
                                        name='ios-qr-scanner'
                                        type='ionicon'
                                        color='#517fa4'
                                        size={20}
                                    />
                                }
                                type="clear"
                                title='扫一扫'
                                titleStyle={{ paddingLeft: 9, fontSize: 14 }}
                                onPress={navigation.getParam('increaseCount')}
                            />

                        </Fragment>

                    }
                        backgroundColor='#fff'
                        overlayColor='rgba(0,0,0,0.3)'
                        height={100}
                        width={100}
                    >
                        <Icon
                            name='add'
                            iconStyle={{ paddingRight: 10 }}
                        />
                    </Tooltip>
                </Fragment>
            ),
            headerStyle: {
                backgroundColor: '#428ee9',
                color: '#fff'
            },
        };
    };
    state = {
        list: [],
        list1: [],
        state: true,
        animation: new Animated.Value(0),
        visiable: false
    }
    componentWillMount() {
        this.props.navigation.setParams(
            {
                increaseCount: this.handleonPress,
                goToMeeting: this.handleToMeeting,
                createMeeting: this.handleToCreateMeeting
            }
        );
    }
    componentDidMount() {
        get('http://172.16.41.138:8080/selectSignUpMeetings', { user_id: '1' })
            .then(res => {
                console.log(res);
                this.setState({ list: res.data });
            })
            .catch(err => console.log(err));
        this.fetchNo();
    }
    fetchNo = () => {
        get('http://172.16.41.138:8080/selectNoSignUpMeetings', { user_id: '1' })

            .then(res => {
                console.log(res);
                this.setState({ list1: res.data })
            })
    }
    
    handleMeetingMore = (meetingId) => {
        console.warn(meetingId)
        AsyncStorage.setItem('meetingId', meetingId).then(() => {
            this.props.navigation.navigate('HomeMore')
        })
    }
    handleonPress = () => {
        console.log('asd');
        this.props.navigation.navigate('CameraScan')
    }
    handleToMeeting = () => {
        this.props.navigation.navigate('AdminHome')
    }
    closePopover() {
        this.props.navigation.navigate('HomeMore')
        console.log(this.props)
    }
    handleToCreateMeeting = () => {
        this.props.navigation.navigate('CreateMeeting')
    }
    render() {
        const { list, list1 } = this.state;
        console.log(list)
        return (
            <ScrollView>
                <View style={{ paddingHorizontal: 10, paddingTop: 15 }}>
                    <Text stytle={{ textAlign: 'left', fontSize: 16 }}>已报名</Text>
                    <Button title="扫一扫" onPress={this.handleonPress} />
                </View>
                {
                    list?.map((item) => {
                        return <View key={item.id}>
                            <Card>

                                <View style={{
                                    flex: 1,
                                    justifyContent: 'space-between',
                                    flexDirection: 'row'
                                }}>
                                    <Text>
                                        {item.meetingName}
                                    </Text>
                                    <Text>
                                        {`形式: ${item.meetingType}`}
                                    </Text>
                                </View>
                                <View style={{
                                    flex: 2,
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                    alignItems: "center"
                                }}>
                                    <View>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: "center"
                                        }}>
                                            <Icon
                                                name='access-time'
                                                iconStyle={styles.icon}
                                            />
                                            <Text
                                                style={styles.text}
                                            >
                                                地点:
                                            </Text>
                                            <Text>
                                                {item.meetingPlace}
                                            </Text>
                                        </View>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: "center",
                                            marginLeft: 3
                                        }}>
                                            <Icon
                                                type='octicon'
                                                name='location'
                                                iconStyle={{ marginRight: 10 }}
                                            />
                                            <Text
                                                style={styles.text}
                                            >
                                                日期:
                                            </Text>
                                            <Text>
                                                {item.startTime}
                                            </Text>
                                        </View>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: "center"
                                        }}>
                                            <Icon
                                                name='person-outline'
                                                iconStyle={styles.icon}
                                            />
                                            <Text
                                                style={styles.text}
                                            >
                                                主办:
                                            </Text>
                                            <Text>
                                                {item.organizer}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                        <Text>asd</Text>
                                        <Icon
                                            name="keyboard-arrow-right"
                                            onPress={() => this.handleMeetingMore(item.meetingId)}
                                        />
                                    </View>
                                </View>

                            </Card>
                        </View>
                    })
                }
                <View style={{ paddingHorizontal: 10, paddingTop: 15 }}>
                    <Text stytle={{ textAlign: 'left', fontSize: 16 }}>未报名</Text>
                </View>
                {
                    list1?.map((item) => {
                        return <View key={item.id}>
                            <Card>
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'space-between',
                                    flexDirection: 'row'
                                }}>
                                    <Text>
                                        {item.meetingName}
                                    </Text>
                                    <Text>
                                        {`形式: ${item.meetingType}`}
                                    </Text>
                                </View>
                                <View style={{
                                    flex: 2,
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                    alignItems: "center"
                                }}>
                                    <View>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: "center"
                                        }}>
                                            <Icon
                                                name='access-time'
                                                iconStyle={styles.icon}
                                            />
                                            <Text
                                                style={styles.text}
                                            >
                                                地点:
                                            </Text>
                                            <Text>
                                                {item.meetingPlace}
                                            </Text>
                                        </View>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: "center",
                                            marginLeft: 3
                                        }}>
                                            <Icon
                                                type='octicon'
                                                name='location'
                                                iconStyle={{ marginRight: 10 }}
                                            />
                                            <Text
                                                style={styles.text}
                                            >
                                                日期:
                                            </Text>
                                            <Text>
                                                {item.startTime}
                                            </Text>
                                        </View>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: "center"
                                        }}>
                                            <Icon
                                                name='person-outline'
                                                iconStyle={styles.icon}
                                            />
                                            <Text
                                                style={styles.text}
                                            >
                                                主办:
                                            </Text>
                                            <Text>
                                                {item.organizer}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                        <Text>asd</Text>
                                        <Icon
                                            name="keyboard-arrow-right"
                                            onPress={() => this.handleMeetingMore(item.meetingId)}
                                        />
                                    </View>
                                </View>

                            </Card>
                        </View>
                    })
                }
            </ScrollView>
        )
    }
    barcodeReceived(e) {
        console.log(e, this.state.visiable, '搜啊吗');
        get(`${e.data}`).then(() => {
            Alert.alert(e.data);
            this.setState({ visiable: false })
        })
        // if (this.state.show) {
        //     this.state.show = false;
        //     if (e) {
        //         Vibration.vibrate([0, 500], false);
        //         let result = e.data;
        //         Alert.alert(
        //             '扫描成功',
        //             '扫描结果：' + result,
        //             [
        //                 {
        //                     text: '确定', onPress: () => {
        //                         this.setState({
        //                             show: true
        //                         })
        //                     }
        //                 }
        //             ],
        //             { cancelable: false }
        //         )
        //     } else {
        //         Alert.alert(
        //             '提示',
        //             '扫描失败，请将手机对准二维码重新尝试',
        //             [
        //                 {
        //                     text: '确定', onPress: () => {
        //                         this.setState({
        //                             show: true
        //                         })
        //                     }
        //                 }
        //             ],
        //             { cancelable: false }
        //         )
        //     }
        // }
    }
}
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    icon: {
        marginRight: 8,
    },
    text: {
        marginHorizontal: 5
    },
    container: {
        width: width,
        height: height,
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        width: width,
        height: height,
    },
    itemStyle: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: (width - 200) / 2,
        height: 200
    },
    textStyle: {
        color: '#fff',
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 18
    },
    animatedStyle: {
        height: 2,
        backgroundColor: '#00c050'
    },
    rectangle: {
        height: 200,
        width: 200,
    }
})