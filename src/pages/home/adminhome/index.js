import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Alert,
    Dimensions,
    Image,
    Animated,
    Vibration,
    InteractionManager
} from 'react-native';
import { Icon, Button, Tooltip, ListItem, Card, Divider } from 'react-native-elements';
import { post } from '../../../utils/global';
import AsyncStorage from '@react-native-community/async-storage';
export default class AdminHome extends Component {
    static navigation = ({ navigation }) => {
        console.log(navigation)
    }
    state = {
        meetingMore: {},
        list: [],
        meetingstatus: {
            "0": "未发布",
            "1": "报名中",
            "2": "报名截止",
            "3": "已完成"
        },
        meetingType: {
            1: "培训会",
            2: "招商会",
            3: "营训会",
            4: "表彰会",
            5: "线下PK赛"
        }
    }
    componentDidMount () {
        post('http://172.16.41.138:8080/meetingManage').then(res => {
            console.log(res);
            this.setState({ list: res.data });
        })
    }
    handleOnPress = () => {
        this.props.navigation.navigate('AdminHomeMore')
    }

    handleGoto = (meetingId) => {
        AsyncStorage.setItem('meetingId', meetingId.toString()).then(res => {
            this.props.navigation.navigate('AdminHomeMore')
        })
    }
    render () {
        const { list, meetingstatus, meetingType } = this.state
        return (
            <ScrollView>
                {
                    list !== 0 ? list?.map((item, index) => {
                        return <View key={ index }>
                            <Card>
                                <View style={ {
                                    flex: 1,
                                    justifyContent: 'space-between',
                                    flexDirection: 'row'
                                } }>
                                    <Text>
                                        { item.meetingName }
                                    </Text>
                                    <Text>
                                        { `形式: ${item.typeName}` }
                                    </Text>
                                </View>
                                <View style={ {
                                    flex: 2,
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                    alignItems: "center"
                                } }>
                                    <View>
                                        <View style={ {
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: "center"
                                        } }>
                                            <Icon
                                                name='access-time'
                                                iconStyle={ styles.icon }
                                            />
                                            <Text
                                                style={ styles.text }
                                            >
                                                地点:
                                            </Text>
                                            <Text>
                                                { `${item.province} ${item.city} ${item.area}` }
                                            </Text>
                                        </View>
                                        <View style={ {
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: "center",
                                            marginLeft: 3
                                        } }>
                                            <Icon
                                                type='octicon'
                                                name='location'
                                                iconStyle={ { marginRight: 10 } }
                                            />
                                            <Text
                                                style={ styles.text }
                                            >
                                                日期:
                                            </Text>
                                            <Text>
                                                { item.startTime }
                                            </Text>
                                        </View>
                                        <View style={ {
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: "center"
                                        } }>
                                            <Icon
                                                name='person-outline'
                                                iconStyle={ styles.icon }
                                            />
                                            <Text
                                                style={ styles.text }
                                            >
                                                主办:
                                            </Text>
                                            <Text>
                                                { item.organizer }
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={ { flexDirection: 'row', alignItems: "center" } }>
                                        <Text>
                                            { meetingstatus[item.meetingStatus] }
                                        </Text>
                                        <Icon
                                            name="keyboard-arrow-right"
                                            onPress={ () => this.handleGoto(item.meetingId) }
                                        />
                                    </View>
                                </View>

                            </Card>
                        </View>
                    })
                        : (Alert.alert('失败'))
                }
            </ScrollView>
        )
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
