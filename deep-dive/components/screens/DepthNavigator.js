import {useEffect, useState} from 'react';
import { Text, SafeAreaView, StatusBar, StyleSheet, useWindowDimensions, FlatList } from 'react-native';
import shortid from 'shortid';

const DepthNavigator = () => {
    const [offsetY, setOffsetY] = useState(0);
    const [currentOffsetX, setCurrentOffsetX] = useState(0);
    const { height, width} = useWindowDimensions();
    const [ref, setRef] = useState(null);

    const [accData, setAccData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });

    const [gyroData, setGyroData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });

    useEffect(() => {
        
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

    const renderItem = ({ item }) => (
        <Text style={[{width: width, height: height, backgroundColor: item.color}]}>
            {item.title}
        </Text>
    );

    const onStartReached = event => {
        if(event.nativeEvent.contentOffset.x == 0){
            setData([
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
                ...data
            ]);
            return true;
        }
        getCurrentOffset(event);
    }

    const getCurrentOffset = event => setCurrentOffsetX(event.nativeEvent.contentOffset.x);

    useEffect(() => {
        if(ref){
            console.log(currentOffsetX + gyroData.x);
        }
        console.log(gyroData);
    }, [gyroData]);

    useEffect(() => {
        if(ref){
            ref.scrollToIndex({index: data.length/2, viewPosition: 0, animated: false});
        }
    }, [ref]);

    return(
        <SafeAreaView style={styles.container}>
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
                    offset: width * index,
                    index,
                })}
                onScroll={onStartReached}
            />
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