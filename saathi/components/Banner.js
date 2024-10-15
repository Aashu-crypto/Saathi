    // NoInternetBanner.js
    import React, { useState, useEffect } from 'react';
    import { Image, Text } from 'react-native';
    import { Banner } from 'react-native-paper';
    import NetInfo from '@react-native-community/netinfo';
    import MaterialIcons from '@expo/vector-icons/MaterialIcons'; // Corrected import
    import { Color, FontFamily } from '../GlobalStyles';

    const NoInternetBanner = () => {
    const [visible, setVisible] = useState(false);

    // Listen for network status changes
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
        setVisible(!state.isConnected); // Set visible to true when there is no internet
        });

        return () => {
        unsubscribe();
        };
    }, []);

    // Retry function to check connection again
    const retryConnection = () => {
        NetInfo.fetch().then(state => {
        setVisible(!state.isConnected);
        });
    };

    return (
        <Banner
        visible={visible}  // Only show when there is no internet connection
        actions={[
            {
            label: 'Retry',
            onPress: retryConnection, // Retry the connection
            },
            {
            label: 'Close',
            onPress: () => setVisible(false), // Allow user to manually dismiss the banner
            },
        ]}
        icon={({ size }) => (
            <MaterialIcons name="wifi-off" size={size} color="red" /> // Corrected icon usage
        )}
        style={{
            backgroundColor: '#ffe8e8',  // Add some color to make it visually appealing
        
        }}
        >
            <Text style={{fontSize:14,fontFamily:FontFamily.poppinsRegular,color:Color.colorGray}}> No Internet connection. Please check your connection .</Text>
        
        </Banner>
    );
    };

    export default NoInternetBanner;
