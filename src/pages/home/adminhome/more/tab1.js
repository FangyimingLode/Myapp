import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Divider, Button, Overlay, Image } from 'react-native-elements';
import { get, post } from '../../../../utils/global';
//import { Button } from 'native-base';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default class Tab1 extends Component {
    state = {
        imgUrl: '',
        isVisible: false
    }
    handleOnPress = () => {
        const { meetingDetail } = this.props;
        console.log(meetingDetail)
        post('http://172.16.41.138:8080/appQRCode/showQRCode', {
            ...meetingDetail
        }).then(res => {
            console.log(res, '......')
            this.setState({ imgUrl: res.qrCode, isVisible: true })
        })
    }
    render () {
        const { meetingDetail } = this.props;
        console.log(meetingDetail, '1231')
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
                            { meetingDetail.meetingType }
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
                    <Button
                        title='生成签到二维码'
                        style={ { margin: 10 } }
                        onPress={ this.handleOnPress }
                    />
                </View>
                <Overlay
                    isVisible={ this.state.isVisible }
                    onBackdropPress={ () => this.setState({ isVisible: false }) }
                    height={ 200 }
                    width={ 200 }
                >
                    <Image
                        source={ { uri: this.state.imgUrl } }
                        style={ { width: 200, height: 200 } }
                    />
                </Overlay>
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