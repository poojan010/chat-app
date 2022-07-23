import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, MenuItem, OverflowMenu, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

import { BackIcon, MenuIcon, InfoIcon, LogoutIcon } from 'asset/Icons';


interface Props{
    userName : string,
    userImage : string,
    onBackPress: () => void,
    onProfilePress : () => void,
}

const BackAction = (props:any) =>  <TopNavigationAction {...props} icon={BackIcon}/>

const TopNavBar : FC<Props> = (props) => {

    const { userName, userImage, onBackPress } = props

    const [menuVisible, setMenuVisible] = React.useState(false);

    const toggleMenu = () => setMenuVisible(!menuVisible);

    const renderMenuAction = () => (
        <TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
    );

    const renderOverflowMenuAction = () => (
        <React.Fragment>
            <OverflowMenu
                anchor={renderMenuAction}
                visible={menuVisible}
                onBackdropPress={toggleMenu}
            >
                <MenuItem accessoryLeft={InfoIcon} title='About'/>
                {/* <MenuItem accessoryLeft={LogoutIcon} title='Logout'/> */}
            </OverflowMenu>
        </React.Fragment>
    );

    const renderTitle = (props:any) => (
        <TouchableOpacity activeOpacity={0.6} style={styles.titleContainer}>
            <Avatar
                style={styles.logo}
                source={{ uri : userImage}}
            />
            <Text {...props}>{userName}</Text>
        </TouchableOpacity>
    );

    return (
        <TopNavigation
            title={renderTitle}
            accessoryLeft={<BackAction onPress={onBackPress} />}
            accessoryRight={renderOverflowMenuAction}
        />
    );
};

export default TopNavBar;

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        marginHorizontal: 16,
    },
});

