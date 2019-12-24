import React, { Component, Fragment } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Modal,
    ScrollView,
    TouchableOpacity,
    Alert
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Divider, Button } from 'react-native-elements'
import moment from 'moment';
import { get } from '../../../utils/global';
import AsyncStorage from '@react-native-community/async-storage';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default class HomeMore extends Component {
    static navigationOptions = {
        headerTitle: '会议详情',
    }
    state = {
        language: "",
        date: new Date(),
        mode: 'date',
        show: false,
        meetingDetail: {},
        meetingStatus: {
            0: "待发布",
            1: "报名中",
            2: "报名截止",
            3: '已完成'
        }
    }
    componentDidMount () {
        AsyncStorage.getItem('meetingId').then(res => {
            console.warn(res)
            get('http://172.16.41.138:8080/manage/meetingDetail', { meetingId: res }).then(res => {
                console.log(res)
                this.setState({ meetingDetail: res.data })
            })
        })

    }
    setDate = (event, date) => {
        date = date || this.state.date;

        this.setState({
            show: Platform.OS === 'ios' ? true : false,
            date,
        }, console.log(date, 'qwe'));
    }

    show = mode => {
        this.setState({
            show: true,
            mode,
        });
    }

    datepicker = () => {
        this.show('date');
    }
    closeModal = () => {
        this.setState({ show: false })
    }
    timepicker = () => {
        this.show('time');
    }
    handleOnPress = (meetingId) => {
        get('http://172.16.41.138:8080/signUpMeetings', { meeting_id: meetingId }).then(res => {
            console.log(res)
            Alert.alert(res.msg)
        })
            .catch(err => console.log(err))
    }
    render () {
        const { show, date, mode, meetingDetail, meetingStatus } = this.state;
        console.log(date)
        return (
            <ScrollView>
                <View style={ styles.body }>
                    <View style={
                        {
                            height: 50,
                            flexDirection: 'row',
                            marginTop: 40,
                            backgroundColor: '#fff',
                            paddingHorizontal: 10,
                            paddingTop: 15,
                        } }>
                        <Text style={ { textAlign: "left", fontSize: 16, width: 100 } }>会议类型:</Text>
                        <Text style={ { textAlign: "left", fontSize: 16, width: 100, marginTop: 2 } }>
                            { meetingDetail?.meetingType }
                        </Text>
                    </View>
                    <View style={ { paddingHorizontal: 10, paddingTop: 15 } }>
                        <Text stytle={ { textAlign: 'left', fontSize: 16 } }>会议信息</Text>
                    </View>
                    <View style={
                        {
                            height: 50,
                            flexDirection: 'row',
                            marginTop: 10,
                            backgroundColor: '#fff',
                            paddingHorizontal: 10,
                            paddingTop: 15,
                        } }>
                        <Text style={ { textAlign: "left", fontSize: 16, width: 100 } }>会议名称:</Text>
                        <Text style={ { textAlign: "left", fontSize: 16, marginTop: 2 } }>
                            { meetingDetail.meetingName }
                        </Text>
                    </View>
                    <Divider style={ { backgroundColor: '#e8e8e8', height: 1 } } />
                    <View style={
                        {
                            height: 50,
                            flexDirection: 'row',
                            //marginTop: 10,
                            backgroundColor: '#fff',
                            paddingHorizontal: 10,
                            paddingTop: 15,
                        } }>
                        <Text style={ { textAlign: "left", fontSize: 16, width: 100 } }>主办方:</Text>
                        <Text style={ { textAlign: "left", fontSize: 16 } }>
                            { meetingDetail.organizer }
                        </Text>
                    </View>
                    <View style={
                        {
                            height: 50,
                            flexDirection: 'row',
                            marginTop: 10,
                            backgroundColor: '#fff',
                            paddingHorizontal: 10,
                            paddingTop: 15,
                        } }>
                        <Text style={ { textAlign: "left", fontSize: 16, width: 100 } }>开始时间:</Text>
                        <Text style={ { textAlign: "left", fontSize: 16 } }>
                            { meetingDetail.startTime }
                        </Text>
                    </View>
                    <Divider style={ { backgroundColor: '#e8e8e8', height: 1 } } />
                    <View style={
                        {
                            height: 50,
                            flexDirection: 'row',
                            //marginTop: 10,
                            backgroundColor: '#fff',
                            paddingHorizontal: 10,
                            paddingTop: 15,
                        } }>
                        <Text style={ { textAlign: "left", fontSize: 16, width: 100 } }>会议时长:</Text>
                        <Text style={ { textAlign: "left", fontSize: 16 } }>
                            { meetingDetail.meetingLength } 小时
                        </Text>
                    </View>
                    <Divider style={ { backgroundColor: '#e8e8e8', height: 1 } } />
                    <View style={
                        {
                            height: 50,
                            flexDirection: 'row',
                            //marginTop: 10,
                            backgroundColor: '#fff',
                            paddingHorizontal: 10,
                            paddingTop: 15,
                        } }>
                        <Text style={ { textAlign: "left", fontSize: 16, width: 100 } }>会议地点:</Text>
                        <Text style={ { textAlign: "left", fontSize: 16 } }>
                            { meetingDetail.address }
                        </Text>
                    </View>
                    <Divider style={ { backgroundColor: '#e8e8e8', height: 1 } } />
                    <View style={
                        {
                            height: 100,
                            flexDirection: 'row',
                            //marginTop: 10,
                            backgroundColor: '#fff',
                            paddingHorizontal: 10,
                            paddingTop: 15,
                        } }>
                        <Text style={ { textAlign: "left", fontSize: 16, width: 100 } }>详细地址:</Text>
                        <Text style={ { textAlign: "left", fontSize: 16, paddingHorizontal: 5, marginRight: 100 } }>
                            { meetingDetail.addressInformation }
                        </Text>
                    </View>
                    <View style={ { paddingHorizontal: 10, paddingTop: 15 } }>
                        <Text stytle={ { textAlign: 'left', fontSize: 16 } }>会议描述</Text>
                    </View>
                    <View style={
                        {

                            flexDirection: 'row',
                            marginTop: 10,
                            backgroundColor: '#fff',
                            paddingHorizontal: 10,
                            paddingTop: 15,
                        } }>
                        <Text style={ { textAlign: "left", fontSize: 16, paddingHorizontal: 10 } }>
                            { meetingDetail.meetingDescribe }
                        </Text>
                    </View>

                    {
                        meetingDetail.meetingStatus <= 2 ?
                            <Fragment>
                                <Button title={ '报名' } onPress={ () => this.handleOnPress(meetingDetail.meetingId) } />
                                <Text>报名截止时间: { meetingDetail.applyDeadline }</Text>
                            </Fragment>

                            : <Fragment>
                                <Button title={ '报名结束' } disabled />
                                <Text>报名截止时间: { meetingDetail.applyDeadline }</Text>
                            </Fragment>
                    }

                </View>

            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    body: {
        backgroundColor: "#e8e8e8",
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalStyle: {
        position: "absolute",
        left: 0,
        bottom: 0,
        width: SCREEN_WIDTH,
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#ffffff',
    },
    optArea: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 12,
        marginBottom: 12,
    },
})
