import React from 'react';
import { ImageStyle } from 'react-native';
import { Icon, IconElement } from '@ui-kitten/components';

export const BackIcon = (props: any) => (
    <Icon {...props} name='arrow-back' />
);

export const MenuIcon = (props: any) => (
    <Icon {...props} name='more-vertical' />
);

export const InfoIcon = (props: any) => (
    <Icon {...props} name='info' />
);

export const LogoutIcon = (props: any) => (
    <Icon {...props} name='log-out' />
);

export const PeopleIcon = (props: any) => (
    <Icon {...props} name='people-outline' />
);

export const EyeIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name='eye' />
);

export const EyeOffIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name='eye-off' />
);

export const PersonIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name='person' />
);

export const EmailIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name='email' />
);

export const PlusIcon = (style: ImageStyle): IconElement => (
    <Icon {...style} name='plus' />
);