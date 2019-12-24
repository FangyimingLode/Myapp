import React, { Component } from 'react'
import { View, Text } from 'react-native';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import Tab1 from './tab1';
import Tab2 from './tab2';
import Tab3 from './tab3';
import { get } from '../../../../utils/global';
import AsyncStorage from '@react-native-community/async-storage';
export default class index extends Component {
    state = {
        meetingDetail: {},
        pageNumber: 0,
        meetingApply: {},
        meetingSign: {}
    }
    componentDidMount () {
        AsyncStorage.getItem('meetingId').then(res => {
            const meetingId = Number(res);
            console.log(meetingId)
            this.fetchMeetingInfo(meetingId).then(res => {
                console.log(res)
                this.setState({ meetingDetail: res.data })
            })
            this.fetchMeetingApply(meetingId).then(res => {
                console.log(res)
                this.setState({ meetingApply: res.data })
            })
            this.fetchMeetingSign(meetingId).then(res => {
                console.log(res)
                this.setState({ meetingSign: res.data })
            })
        })

    }
    fetchMeetingInfo = (meetingId) => {
        return get('http://172.16.41.138:8080/manage/meetingDetail', { meetingId })
    }
    fetchMeetingApply = (meetingId, page = 1, rows = 0) => {
        return get('http://172.16.41.138:8080/manage/applyList', { meetingId, page, rows })
    }
    fetchMeetingSign = (meetingId, page = 1, rows = 0) => {
        return get('http://172.16.41.138:8080/manage/signList', { meetingId, page, rows })
    }
    render () {
        const { meetingDetail, meetingApply, meetingSign } = this.state
        return (

            <Container>
                <Tabs
                    initialPage={ this.state.pageNumber }
                //onChangeTab={ ({ ref }) => console.warn('Heading', ref.props.heading) }
                >
                    <Tab heading="会议详情">
                        <Tab1
                            meetingDetail={ meetingDetail }
                        />
                    </Tab>
                    <Tab heading="报名信息">
                        <Tab2
                            meetingApply={ meetingApply }
                        />
                    </Tab>
                    <Tab heading="签到信息">
                        <Tab3 meetingSign={ meetingSign } />
                    </Tab>
                </Tabs>

            </Container>


        )
    }
}
// import React, { Component } from 'react';
// import { Container, Text, Tabs, Tab } from 'native-base';

// export default class App extends Component {

//     constructor(props) {
//         super(props)
//         this.state = { pageNumber: 1 }
//     }

//     render () {
//         return (

//             <Tabs initialPage={ this.state.pageNumber } onChangeTab={ ({ ref }) => console.warn('Heading', ref.props.heading) }>
//                 <Tab heading="One">
//                     <Text>Tab one</Text>
//                 </Tab>
//                 <Tab heading="Two">
//                     <Text>Tab two</Text>
//                 </Tab>
//             </Tabs>

//         );
//     }
// }