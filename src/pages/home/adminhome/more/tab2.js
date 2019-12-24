import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
export default class Tab2 extends Component {
    render () {
        const { meetingApply } = this.props;
        console.log(meetingApply)
        return (
            <ScrollView>
                <Text >当前报名人数 { meetingApply?.total } 人 </Text>
                <View>
                    {
                        meetingApply?.rows?.map((item, i) => (
                            <ListItem
                                key={ i }
                                title={ item.userName }
                                leftIcon={ <Avatar
                                    size="small"
                                    rounded
                                    title={ i + 1 }
                                    activeOpacity={ 0.7 }
                                /> }
                                subtitle={ item.applyTime && `${item.telephone}   ${item.applyTime}` }
                                bottomDivider
                                chevron
                            />
                        ))
                    }
                </View>
            </ScrollView>
        )
    }
}
