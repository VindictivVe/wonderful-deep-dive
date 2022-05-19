import {useEffect, useState} from 'react';
import { Text, SafeAreaView, StatusBar, StyleSheet, useWindowDimensions, FlatList, View } from 'react-native';
import shortid from 'shortid';

import { Gyroscope, Accelerometer } from "expo-sensors";

const DepthNavigator = () => {
    const [currentOffsetX, setCurrentOffsetX] = useState(0);
    const { height, width} = useWindowDimensions();
    const [ref, setRef] = useState(null);
    const [changable, setChangable] = useState(true);
    const [index, setIndex] = useState(1);

    const [gyroData, setGyroData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });

    const [gyroSubscription, setGyroSubscription] = useState(null);

    const _gyroSlow = () => {
        Gyroscope.setUpdateInterval(100);
    };

    const _gyroSubscribe = () => {
        _gyroSlow();
        setGyroSubscription(
            Gyroscope.addListener(gyroscopeData => {
                setGyroData(gyroscopeData);
            })
        );
        _gyroSlow();
    };

    const _gyroUnsubscribe = () => {
        gyroSubscription && gyroSubscription.remove();
        setGyroData(null);
    };

    const [accData, setAccData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });

    const [accSubscription, setAccSubscription] = useState(null);

    const _accSlow = () => {
        Gyroscope.setUpdateInterval(100);
    };

    const _accSubscribe = () => {
        _accSlow();
        setAccSubscription(
            Accelerometer.addListener(accelerometerData => {
                setAccData(accelerometerData);
            })
        );
        _accSlow();
    };

    const _accUnsubscribe = () => {
        accSubscription && accSubscription.remove();
        setAccData(null);
    };

    useEffect(() => {
        _gyroSubscribe();
        setGyroData({ x: 0, y: 0, z: 0 });
        _accSubscribe();
        setAccData({ x: 0, y: 0, z: 0 });
        return () => {
            _gyroUnsubscribe();
            _accUnsubscribe();
        }
    }, []);

    const [data, setData] = useState([
        {
          id: shortid.generate(),
          title: 'First Item',
          color: "blue",
        },
        {
          id: shortid.generate(),
          title: 'Second Item',
          color: "green",
        },
        {
          id: shortid.generate(),
          title: 'Third Item',
          color: "red",
        },
        {
            id: shortid.generate(),
            title: 'Fourth Item',
            color: "yellow",
        },
        {
            id: shortid.generate(),
            title: 'First Item',
            color: "blue",
          },
          {
            id: shortid.generate(),
            title: 'Second Item',
            color: "green",
          },
          {
            id: shortid.generate(),
            title: 'Third Item',
            color: "red",
          },
          {
              id: shortid.generate(),
              title: 'Fourth Item',
              color: "yellow",
          },
          {
            id: shortid.generate(),
            title: 'First Item',
            color: "blue",
          },
          {
            id: shortid.generate(),
            title: 'Second Item',
            color: "green",
          },
          {
            id: shortid.generate(),
            title: 'Third Item',
            color: "red",
          },
          {
              id: shortid.generate(),
              title: 'Fourth Item',
              color: "yellow",
          },
    ]);

    const endHandler = () => {
        setData([...data, 
            {
                id: shortid.generate(),
                title: 'First Item',
                color: "blue",
            },
            {
                id: shortid.generate(),
                title: 'Second Item',
                color: "green",
            },
            {
                id: shortid.generate(),
                title: 'Third Item',
                color: "red",
            },
            {
                id: shortid.generate(),
                title: 'Fourth Item',
                color: "yellow",
            }
        ]);
    }

    const onStartReached = event => {
        if(event.nativeEvent.contentOffset.x == 0){
            setData([{id: shortid.generate(),title: 'First Item',color: "blue",},{id: shortid.generate(),title: 'Second Item',color: "green",},{id: shortid.generate(),title: 'Third Item',color: "red",},{id: shortid.generate(),title: 'Fourth Item',color: "yellow",},...data]);
            return true;
        }
        getCurrentOffset(event);
    }

    const getCurrentOffset = event => setCurrentOffsetX(event.nativeEvent.contentOffset.x);

    useEffect(() => {
        console.log(index);
        if(ref){
            ref.scrollToOffset({offset: currentOffsetX + ((gyroData.x)*(width))/4});
        }
        changeLayer();
    }, [gyroData, accData]);

    useEffect(() => {
        if(ref){
            ref.scrollToIndex({index: data.length-4, viewPosition: 0, animated: true});
        }
    }, [ref]);

    const renderItem = ({ item }) => (
        <Text style={[{width: width, height: height, backgroundColor: item.color}]}>
            {item.title}
        </Text>
    );

    const changeLayer = () => {
        if(accData && changable){
            if(accData.z > 0.75 && index !== 5){
                //Index +1
                setIndex(index + 1);
                setChangable(false);
                setTimeout(() => {
                    setChangable(true);
                }, 5000);
            }
            else if(accData.z < -0.75 && index !== 1){
                //Index -1
                setIndex(index - 1);
                setChangable(false);
                setTimeout(() => {
                    setChangable(true);
                }, 5000);
            }
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            {index == 1 ? 
                <FlatList style={styles.scrollView} 
                    horizontal 
                    data={data} 
                    renderItem={renderItem}
                    keyExtractor={item => item.id} 
                    onEndReachedThreshold={0.5} 
                    onEndReached={endHandler}
                    ref={(ref) => setRef(ref)}
                    getItemLayout={(data, index) => ({
                        length: width,
                        offset: (width) * index,
                        index,
                    })}
                    onScroll={onStartReached}
                />  
                : index == 2 ? <View><Text>Ebene 2</Text></View>
                : index == 3 ? <View><Text>Ebene 3</Text></View>
                : index == 4 ? <View><Text>Ebene 4</Text></View>
                : index == 5 ? <View><Text>Ebene 5</Text></View>
                : <></>
            }
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    text: {
        fontSize: 42,
    },
    text2: {
        fontSize: 42,
        backgroundColor: "green",
    },
});

export default DepthNavigator;