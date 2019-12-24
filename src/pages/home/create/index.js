import React, { Component } from 'react'
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
import { Input, Button, Divider } from 'react-native-elements';
import { Picker, List, DatePicker } from '@ant-design/react-native'
import moment from 'moment';
import { post } from '../../../utils/global';
import { district } from '../../../utils/index';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default class CreateMeeting extends Component {
    state = {
        address: "",
        addressInformation: "",
        applyDeadline: "",
        charge: 1,
        meetingDescribe: "",
        meetingLength: 2.3,
        meetingName: "",
        organizer: '',
        startTime: '',
        meetingtypeId: 1,
        array: [],
        userId: 2,
        date: new Date(),
        mode: 'date',
        show: false,
        meetingTypeId: [
            { label: '培训会', value: 1 },
            { label: '招商会', value: 2 },
            { label: '营训会', value: 3 },
            { label: '表彰会', value: 4 },
            { label: '线下PK赛', value: 5 }
        ],
        value: [],
    }
    handleOnPress = () => {
        console.log(this.state);
        const {

            address,
            addressInformation,
            meetingDescribe,
            meetingLength,
            meetingName,
            organizer,
            array,
            meetingtypeId
        } = this.state;
        const params = {
            startTime: moment(this.state.startTime).format('YYYY-MM-DD HH:mm:ss'),
            applyDeadline: moment(this.state.applyDeadline).format('YYYY-MM-DD HH:mm:ss'),
            charge: this.state.charge[0],
            address,
            addressInformation,
            meetingDescribe,
            meetingLength: Number(meetingLength),
            meetingName,
            organizer,
            array,
            meetingtypeId: Number(meetingtypeId)
        }
        post('http://172.16.41.138:8080/createMeeting', params).then(res => {
            console.log(res);
            if (res.status === 0) {
                Alert.alert(res.msg);
            } else {
                Alert.alert(res.msg);
            }
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
    handleinitiateType = initiateType => {
        this.setState({ initiateType })
    }
    timepicker = () => {
        this.show('time');
    }
    handlemeetingtypeId = meetingtypeId => {
        console.warn(meetingtypeId);
        this.setState({ meetingtypeId })
    }
    handlecharge = charge => {
        this.setState({ charge })
    }
    onChange = (startTime) => {
        this.setState({ startTime })
    }
    handleapplyDeadline = applyDeadline => {
        this.setState({ applyDeadline })
    }
    handleAddressonChange = array => {
        console.warn(array)
        this.setState({ array })
    }
    render () {
        const {
            address,
            addressInformation,
            applyDeadline,
            charge,
            meetingDescribe,
            meetingLength,
            meetingName,
            meetingtypeId,
            organizer,
            array,
            startTime,
            meetingTypeId
        } = this.state;
        return (
            <ScrollView>
                <View style={ styles.body }>
                    <View style={ { paddingHorizontal: 10, paddingTop: 15, marginBottom: 10 } }>
                        <Text stytle={ { textAlign: 'left', fontSize: 17 } }>会议信息</Text>
                    </View>
                    <List>
                        <Picker
                            data={ meetingTypeId }
                            cols={ 1 }
                            value={ meetingtypeId }
                            onChange={ this.handlemeetingtypeId }
                        >
                            <List.Item arrow="horizontal" onPress={ this.onPress }>
                                会议类型
                            </List.Item>
                        </Picker>
                        <Picker
                            data={ [{ label: "收费", value: 0 }, { label: "不收费", value: 1 }] }
                            cols={ 1 }
                            value={ charge }
                            onChange={ this.handlecharge }
                        >
                            <List.Item arrow="horizontal" onPress={ this.onPress }>
                                是否收费
                            </List.Item>
                        </Picker>
                    </List>
                    <View style={
                        {
                            height: 50,
                            flexDirection: 'row',
                            backgroundColor: '#fff',
                            paddingHorizontal: 10,
                            alignItems: "center"
                        } }>
                        <Text style={ { paddingLeft: 5, textAlign: "left", fontSize: 17, width: 100 } }>会议名字:</Text>
                        <Input placeholder='请输入会议姓名' value={ meetingName } onChangeText={ meetingName => this.setState({ meetingName }) } />
                    </View>
                    <Divider style={ { backgroundColor: '#e8e8e8', height: 1 } } />
                    <View style={
                        {
                            height: 50,
                            flexDirection: 'row',
                            backgroundColor: '#fff',
                            paddingHorizontal: 10,
                            alignItems: "center"
                        } }>
                        <Text style={ { paddingLeft: 5, textAlign: "left", fontSize: 17, width: 100 } }>主办方:</Text>
                        <Input placeholder='请输入主办方' value={ organizer } onChangeText={ organizer => this.setState({ organizer }) } />
                    </View>
                    <List>
                        <DatePicker
                            value={ startTime }
                            mode="datetime"
                            defaultDate={ new Date() }
                            onChange={ this.onChange }
                            format="YYYY-MM-DD HH:mm:ss"
                        >
                            <List.Item arrow="horizontal">会议开始时间：</List.Item>
                        </DatePicker>
                    </List>
                    <Divider style={ { backgroundColor: '#e8e8e8', height: 1 } } />
                    <View style={
                        {
                            height: 50,
                            flexDirection: 'row',
                            //marginTop: 10,
                            backgroundColor: '#fff',
                            paddingHorizontal: 10,
                            alignItems: "center"
                        } }>
                        <Text style={ { paddingLeft: 5, textAlign: "left", fontSize: 17, width: 100 } }>会议时长:</Text>
                        <Input placeholder='请输入会议时长' value={ meetingLength } onChangeText={ meetingLength => this.setState({ meetingLength }) } />
                    </View>
                    <Divider style={ { backgroundColor: '#e8e8e8', height: 1 } } />
                    <List>
                        <DatePicker
                            value={ applyDeadline }
                            mode="datetime"
                            defaultDate={ new Date() }
                            onChange={ this.handleapplyDeadline }
                            format="YYYY-MM-DD HH:mm:ss"
                        >
                            <List.Item arrow="horizontal">会议截止时间：</List.Item>
                        </DatePicker>
                        <Picker
                            data={ district }
                            cols={ 3 }
                            value={ array }
                            onChange={ this.handleAddressonChange }
                        >
                            <List.Item arrow="horizontal" onPress={ this.onPress }>
                                会议地点
                            </List.Item>
                        </Picker>
                    </List>
                    <Divider style={ { backgroundColor: '#e8e8e8', height: 1 } } />
                    <View style={
                        {
                            height: 50,
                            flexDirection: 'row',
                            backgroundColor: '#fff',
                            paddingHorizontal: 10,
                            alignItems: "center"
                        } }>
                        <Text style={ { paddingLeft: 5, textAlign: "left", fontSize: 17, width: 100 } }>详细地址:</Text>
                        <Input placeholder='请输入详细地址' value={ address } onChangeText={ address => this.setState({ address }) } />
                    </View>
                    <View style={
                        {
                            height: 100,
                            flexDirection: 'row',
                            backgroundColor: '#fff',
                            paddingHorizontal: 10,
                            alignItems: "center"
                        } }>
                        <Input placeholder='请输入详细地址' value={ addressInformation } onChangeText={ addressInformation => this.setState({ addressInformation }) } />
                    </View>
                    <View style={ { paddingHorizontal: 10, paddingTop: 15 } }>
                        <Text stytle={ { textAlign: 'left', fontSize: 17 } }>会议描述</Text>
                    </View>
                    <View style={
                        {

                            flexDirection: 'row',
                            marginTop: 10,
                            backgroundColor: '#fff',
                            paddingHorizontal: 10,
                            alignItems: "center"
                        } }>
                        <Input placeholder='请输入会议描述' value={ meetingDescribe } onChangeText={ meetingDescribe => this.setState({ meetingDescribe }) } />
                    </View>
                </View>
                <Button
                    title='提交'
                    onPress={ this.handleOnPress }
                    style={ { marginHorizontal: 10 } }
                />
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    body: {
        backgroundColor: "#e8e8e8",
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
