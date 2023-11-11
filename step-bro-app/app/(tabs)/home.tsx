import React, { useEffect, useState } from 'react';

import { StatusBar } from 'expo-status-bar';

import {

  StyleSheet,

  Text,

  View,

  ImageBackground,

  Dimensions,

} from 'react-native';

import { Pedometer } from 'expo-sensors';
// eslint-disable-next-line import/no-extraneous-dependencies
import CircularProgress from 'react-native-circular-progress-indicator';

export default function HomeScreen() {
  const [PedometerAvailability, SetPedometerAvailability] = useState('');

  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    calculator();
  }, []);
  const calculator = () => {
    const calculed = Pedometer.watchStepCount((result) => {
      setStepCount(result.steps);
    });
    Pedometer.isAvailableAsync().then(

      (result) => {
        SetPedometerAvailability(String(result));
      },

      (error) => {
        SetPedometerAvailability(error);
      },

    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.headingDesign}>

        Is Pedometer available on the device :
        {' '}
        {PedometerAvailability}

      </Text>

      <View>
        <CircularProgress
          value={stepCount}
          maxValue={8000}
          radius={200}
          textColor="#17E67E"
          activeStrokeColor="#AAE617"
          inActiveStrokeColor="#17E1E6"
          inActiveStrokeOpacity={1.5}
          inActiveStrokeWidth={30}
          activeStrokeWidth={30}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  headingDesign: {
    backgroundColor: 'rgba(155, 89, 182,0.5)',
    alignSelf: 'center',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
