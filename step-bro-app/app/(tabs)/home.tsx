import React, { useEffect, useState } from 'react';

import { StatusBar } from 'expo-status-bar';

import {

  StyleSheet,

  Text,

  View,

  ImageBackground,

  Dimensions,

} from 'react-native';

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

import { Pedometer } from 'expo-sensors';
// eslint-disable-next-line import/no-extraneous-dependencies

export default function HomeScreen() {
  const [PedometerAvailability, SetPedometerAvailability] = useState('');
  const maxSteps = 80;
  const [stepCount, setStepCount] = useState(0);

  const data = {
    data: [0.4],
  };
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  const screenWidth = Dimensions.get('window').width;

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
      <View />
      <ProgressChart
        data={[stepCount / maxSteps]}
        width={screenWidth}
        height={300}
        strokeWidth={30}
        radius={120}
        chartConfig={chartConfig}
        hideLegend
      />
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
