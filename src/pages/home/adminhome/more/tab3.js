import React, { Component, Fragment } from 'react'
import { View, ScrollView, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import moment from 'moment';
export default class Tab3 extends Component {
    render () {
        const { meetingSign } = this.props
        return (
            <ScrollView>
                {
                    meetingSign !== null ? <Fragment>
                        <Text >当前报名人数 { meetingSign?.total } 人 </Text>
                        <View>
                            {
                                meetingSign?.rows?.map((item, i) => (
                                    <ListItem
                                        key={ i }
                                        title={ `姓名： ${item.userName}` }
                                        leftIcon={ <Avatar
                                            size="small"
                                            rounded
                                            title={ `${i + 1}` }
                                            activeOpacity={ 0.7 }
                                        /> }
                                        subtitle={ <View>
                                            <Text>
                                                签到时间： { item.signTime }
                                            </Text>
                                            <Text>
                                                报名时间：  { item.applyTimeString }
                                            </Text>
                                        </View> }
                                        bottomDivider
                                        chevron
                                    />
                                ))
                            }
                        </View>
                    </Fragment> : <Text>暂无数据</Text>
                }

            </ScrollView>
        )
    }
}
