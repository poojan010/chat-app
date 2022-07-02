import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewProps } from 'react-native';
import { Avatar, AvatarProps, Button, ButtonElement, ButtonProps } from '@ui-kitten/components';

import { PlusIcon } from 'asset/Icons';

interface ProfileAvatarProps extends AvatarProps {
    onPressEditAvatar : () => void,
}

const ProfileAvatar = (props: ProfileAvatarProps): React.ReactElement<ViewProps> => {

    const { style, onPressEditAvatar , ...restProps } = props;

    const renderEditButton = (props:any) => {
        return(
            <TouchableOpacity activeOpacity={0.6} onPress={onPressEditAvatar} >
                <PlusIcon {...props} />
            </TouchableOpacity>
        )
    }

    return (
        <View style={style}>
            <Avatar
                {...restProps}
                style={[style, styles.avatar]}
            />
            <Button
                status='basic'
                accessoryRight={renderEditButton}
                style={[styles.editAvatarButton,styles.editButton]}
            />
        </View>
    );
};

export default ProfileAvatar

const styles = StyleSheet.create({
    avatar: {
        alignSelf: 'center',
    },
    editButton: {
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: -5,
    },
    editAvatarButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
});