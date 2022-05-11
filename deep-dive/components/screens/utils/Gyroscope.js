import React, {useEffect, useState} from 'react';
import { Gyroscope } from 'expo-sensors';

const GyroscopeData = () => {
    

    const [subscription, setSubscription] = useState(null);
    
    const _slow = () => {
        Gyroscope.setUpdateInterval(1000);
    };
    
    const _fast = () => {
        Gyroscope.setUpdateInterval(16);
    };
    
    const _subscribe = () => {
        setSubscription(
            Gyroscope.addListener(gyroscopeData => {
                setData(gyroscopeData);
            })
        );
    };
    
    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };
    
    useEffect(() => {
        _subscribe();
        //return () => _unsubscribe();
    }, []);

    return data;
}

export default GyroscopeData;