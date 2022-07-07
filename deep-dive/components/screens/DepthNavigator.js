import React from 'react';
import { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  Platform,
  View
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Gyroscope, Accelerometer } from "expo-sensors";
import HUD from "./HUD";
import { TEXTDATA } from "../../data/TextData";

import ListItem1 from "../listItems/ListItem1";
import ListItem2 from "../listItems/ListItem2";
import ListItem3 from "../listItems/ListItem3";
import ListItem4 from "../listItems/ListItem4";
import ListItem5 from "../listItems/ListItem5";

const DepthNavigator = (props) => {
  const [currentOffsetX, setCurrentOffsetX] = useState(0);
  const { height, width } = useWindowDimensions();
  const [ref, setRef] = useState(null);
  const [changable, setChangable] = useState(false);
  const [index, setIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [disableTop, setDisableTop] = useState(true);
  const [disableBottom, setDisableBottom] = useState(false);

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
      Gyroscope.addListener((gyroscopeData) => {
        setGyroData(gyroscopeData);
      })
    );
    _gyroSlow();
  };

  const _gyroUnsubscribe = () => {
    gyroSubscription && gyroSubscription.remove();
    setGyroSubscription(null);
  };

  const [accData, setAccData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [accSubscription, setAccSubscription] = useState(null);

  const _accSlow = () => {
    Accelerometer.setUpdateInterval(100);
  };

  const _accSubscribe = () => {
    _accSlow();
    setAccSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setAccData(accelerometerData);
      })
    );
    _accSlow();
  };

  const _accUnsubscribe = () => {
    accSubscription && accSubscription.remove();
    setGyroSubscription(null);
  };

  useEffect(() => {
    _gyroSubscribe();
    setGyroData({ x: 0, y: 0, z: 0 });
    _accSubscribe();
    setAccData({ x: 0, y: 0, z: 0 });
    setTimeout(() => {
      setChangable(true);
    }, 3000);
    return () => {
      _gyroUnsubscribe();
      _accUnsubscribe();
    };
  }, []);

  const [data, setData] = useState(TEXTDATA);

  //Fires when end point of flatlist is reached
  const endHandler = () => {
    setData([
      ...data,
      data[0], 
      data[1], 
      data[2], 
      data[3], 
      data[4],
    ]);
  }

  //Entry item of flatlist
  const renderItem1 = ({ item }) => (
    <ListItem1
      width={width}
      height={height}
      color={item.color}
      title={item.title}
      text={item.text1}
      image={props.slides[0]}
    ></ListItem1>
  );

  const renderItem2 = ({ item }) => (
    <ListItem2
      width={width}
      height={height}
      color={item.color}
      title={item.title}
      text={item.text2}
      image={props.slides[1]}
    ></ListItem2>
  );

  const renderItem3 = ({ item }) => (
    <ListItem3
      width={width}
      height={height}
      color={item.color}
      title={item.title}
      text={item.text3}
      image={props.slides[2]}
    ></ListItem3>
  );

  const renderItem4 = ({ item }) => (
    <ListItem4
      width={width}
      height={height}
      color={item.color}
      title={item.title}
      text={item.text4}      
      image={props.slides[3]}
    ></ListItem4>
  );

  const renderItem5 = ({ item }) => (
    <ListItem5
      width={width}
      height={height}
      color={item.color}
      title={item.title}
      text={item.text5}
      image={props.slides[4]}
    ></ListItem5>
  );

  //Constantly update current offset
  const getCurrentOffset = (event) =>
    setCurrentOffsetX(event.nativeEvent.contentOffset.x);

  //Scroll according to head rotation
  useEffect(() => {
    if (ref && !isScrolling) {
      ref.scrollToOffset({ offset: currentOffsetX + (gyroData.x * width) / 5 });
    }
  }, [gyroData]);

  const postLayer = async (url = "") => {
    try {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: index }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.log("NOT YAY " + err));
    } catch (e) {
      console.log(e);
    }
  };

  //Called when accelerometer data changes
  const changeLayer = () => {
    if (accData && changable) {
      if (Platform.OS == "ios"){
        if (accData.z < -0.75 && index !== 4) {
        //Index +1
        setIndex(index + 1);
        /*postLayer(
          "https://jsonplaceholder.typicode.com/posts",
          JSON.stringify({ id: index + 1 })
        );*/
        setChangable(false);
        setTimeout(() => {
          setChangable(true);
        }, 3000);
      } else if (accData.z > 0.75 && index !== 0){
        //Index -1
        setIndex(index - 1);
        /*postLayer(
          "https://jsonplaceholder.typicode.com/posts",
          JSON.stringify({ id: index - 1 })
        );*/
        setChangable(false);
        setTimeout(() => {
          setChangable(true);
        }, 3000);
      }
      }
      else{
        if (accData.z > 0.75 && index !== 4) {
        //Index +1
        setIndex(index + 1);
        /*postLayer(
          "https://jsonplaceholder.typicode.com/posts",
          JSON.stringify({ id: index + 1 })
        );*/
        setChangable(false);
        setTimeout(() => {
          setChangable(true);
        }, 3000);
      } else if (accData.z < -0.75 && index !== 0) {
        //Index -1
        setIndex(index - 1);
        /*postLayer(
          "https://jsonplaceholder.typicode.com/posts",
          JSON.stringify({ id: index - 1 })
        );*/
        setChangable(false);
        setTimeout(() => {
          setChangable(true);
        }, 3000);
      }
    } 
  }
};

  //Change layer according to head tilt
  useEffect(() => {
    changeLayer();
  }, [accData]);

  useEffect(() => {
    if (index === 0) {
      setDisableTop(true);
    } else if (index === 4) {
      setDisableBottom(true);
    } else {
      setDisableTop(false);
      setDisableBottom(false);
    }
  }, [changeLayer]);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoading(false);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (!isLoading) {
      await SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  if (Platform.OS !== "ios") {
    return (
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
        <HUD
          index={index}
          disableTop={disableTop || !changable}
          disableBottom={disableBottom || !changable}
          hudWidth={width}
          hudHeight={height}
          topPadding={StatusBar.currentHeight}
          setBol={() => props.setBol()}
        />
        {index == 0 ? (
          <FlatList
            windowSize={1}
            maxToRenderPerBatch={6}
            removeClippedSubviews={true}
            initialNumToRender={3}
            style={styles.scrollView}
            horizontal
            data={data}
            onLayout={() => {
              setIsLoading(false);
              ref.scrollToEnd({ animated: false });
              setTimeout(() => {
                setIsScrolling(false);
              }, 100);
            }}
            renderItem={renderItem1}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.25}
            onEndReached={endHandler}
            ref={(ref) => setRef(ref)}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            onScroll={getCurrentOffset}
          />
        ) : index == 1 ? (
          <FlatList
            windowSize={1}
            maxToRenderPerBatch={6}
            removeClippedSubviews={true}
            initialNumToRender={3}
            style={styles.scrollView}
            horizontal
            data={data}
            renderItem={renderItem2}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.25}
            onEndReached={endHandler}
            ref={(ref) => setRef(ref)}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            onScroll={getCurrentOffset}
          />
        ) : index == 2 ? (
          <FlatList
            maxToRenderPerBatch={6}
            removeClippedSubviews={true}
            initialNumToRender={3}
            style={styles.scrollView}
            horizontal
            data={data}
            renderItem={renderItem3}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.25}
            onEndReached={endHandler}
            ref={(ref) => setRef(ref)}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            onScroll={getCurrentOffset}
          />
        ) : index == 3 ? (
          <FlatList
            maxToRenderPerBatch={6}
            removeClippedSubviews={true}
            initialNumToRender={3}
            style={styles.scrollView}
            horizontal
            data={data}
            renderItem={renderItem4}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.25}
            onEndReached={endHandler}
            ref={(ref) => setRef(ref)}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            onScroll={getCurrentOffset}
          />
        ) : index == 4 ? (
          <FlatList
            maxToRenderPerBatch={6}
            removeClippedSubviews={true}
            initialNumToRender={3}
            style={styles.scrollView}
            horizontal
            data={data}
            renderItem={renderItem5}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.25}
            onEndReached={endHandler}
            ref={(ref) => setRef(ref)}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            onScroll={getCurrentOffset}
          />
        ) : (
          <></>
        )}
      </SafeAreaView>
    );
  } else {
    return (
      <View style={styles.container} onLayout={onLayoutRootView}>
        <HUD
          index={index}
          disableTop={disableTop || !changable}
          disableBottom={disableBottom || !changable}
          hudWidth={width}
          hudHeight={height}
          topPadding={StatusBar.currentHeight}
          setBol={() => props.setBol()}
        />
        {index == 0 ? (
          <FlatList
            windowSize={1}
            maxToRenderPerBatch={6}
            removeClippedSubviews={true}
            initialNumToRender={3}
            style={styles.scrollView}
            horizontal
            data={data}
            onLayout={() => {
              setIsLoading(false);
              ref.scrollToEnd({ animated: false });
              setTimeout(() => {
                setIsScrolling(false);
              }, 100);
            }}
            renderItem={renderItem1}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.25}
            onEndReached={endHandler}
            ref={(ref) => setRef(ref)}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            onScroll={getCurrentOffset}
          />
        ) : index == 1 ? (
          <FlatList
            windowSize={1}
            maxToRenderPerBatch={6}
            removeClippedSubviews={true}
            initialNumToRender={3}
            style={styles.scrollView}
            horizontal
            data={data}
            renderItem={renderItem2}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.25}
            onEndReached={endHandler}
            ref={(ref) => setRef(ref)}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            onScroll={getCurrentOffset}
          />
        ) : index == 2 ? (
          <FlatList
            maxToRenderPerBatch={6}
            removeClippedSubviews={true}
            initialNumToRender={3}
            style={styles.scrollView}
            horizontal
            data={data}
            renderItem={renderItem3}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.25}
            onEndReached={endHandler}
            ref={(ref) => setRef(ref)}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            onScroll={getCurrentOffset}
          />
        ) : index == 3 ? (
          <FlatList
            maxToRenderPerBatch={6}
            removeClippedSubviews={true}
            initialNumToRender={3}
            style={styles.scrollView}
            horizontal
            data={data}
            renderItem={renderItem4}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.25}
            onEndReached={endHandler}
            ref={(ref) => setRef(ref)}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            onScroll={getCurrentOffset}
          />
        ) : index == 4 ? (
          <FlatList
            maxToRenderPerBatch={6}
            removeClippedSubviews={true}
            initialNumToRender={3}
            style={styles.scrollView}
            horizontal
            data={data}
            renderItem={renderItem5}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.25}
            onEndReached={endHandler}
            ref={(ref) => setRef(ref)}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            onScroll={getCurrentOffset}
          />
        ) : (
          <></>
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});

export default DepthNavigator;