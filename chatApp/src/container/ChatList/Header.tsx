import React, { FC } from 'react';
import {  View } from 'react-native';
import { Avatar, MenuItem, OverflowMenu, StyleService, Text, TopNavigation, TopNavigationAction, useStyleSheet, useTheme } from '@ui-kitten/components';

import { MenuIcon, InfoIcon, LogoutIcon } from 'asset/Icons';


interface Props{
    headerTitle : string,
    userImage : string,
    onProfilePress : () => void,
    onLogoutPress : () => void,
}


const Header : FC<Props> = (props) => {

    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);
    const { headerTitle, userImage, onLogoutPress, onProfilePress } = props

    const [menuVisible, setMenuVisible] = React.useState(false);

    const toggleMenu = () => setMenuVisible(!menuVisible);

    const renderMenuAction = () => (
        <TopNavigationAction icon={<MenuIcon fill={theme['background-basic-color-1']}/>} onPress={toggleMenu}/>
    );

    const renderOverflowMenuAction = () => (
        <React.Fragment>
            <OverflowMenu
                anchor={renderMenuAction}
                visible={menuVisible}
                onBackdropPress={toggleMenu}
            >
                <MenuItem onPress={onProfilePress} accessoryLeft={InfoIcon} title='Profile'/>
                <MenuItem onPress={onLogoutPress} accessoryLeft={LogoutIcon} title='Logout'/>
            </OverflowMenu>
        </React.Fragment>
    );

    const renderTitle = (props:any) => (
        <View  style={styles.titleContainer}>
            <Avatar
                //@ts-ignore 
                style={styles.logo}
                source={{ uri : userImage }}
            />
            <Text category={"h6"} style={styles.headerTitle}>{headerTitle}</Text>
        </View>
    );

    return (
        <TopNavigation
            title={renderTitle}
            appearance={"control"}
            style={styles.headerContainer}
            accessoryRight={renderOverflowMenuAction}
        />
    );
};

export default Header
;

const themedStyles = StyleService.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        marginHorizontal: 16,
    },
    headerContainer : {
        backgroundColor : 'color-primary-default'
    },
    headerTitle : {
        color : 'background-basic-color-1',
    }
});

