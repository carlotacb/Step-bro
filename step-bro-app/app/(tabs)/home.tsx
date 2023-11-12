import React, { useEffect, useRef, useState } from 'react';

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
import { router } from 'expo-router';
import { getToken } from '../../utils/utils';
import { getUserInformation, getUserStats, sendSteps } from '../../utils/axios';
// eslint-disable-next-line import/no-extraneous-dependencies
const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [200, 450, 280, 800, 990, 430, 800],
    },
  ],
};

const token = getToken();
let username = '';
console.log(token);
if (token === '') {
  // router.replace('/login');
} else {
  console.log('test');
  getUserStats(token).then((response) => {
    console.log(response);

    // eslint-disable-next-line max-len
    data.datasets = [{ data: [response.stats?.[0]?.steps ?? 0, response.stats?.[1]?.steps ?? 0, response.stats?.[2]?.steps ?? 0, response.stats?.[3]?.steps ?? 0, response.stats?.[4]?.steps ?? 0, response.stats?.[5]?.steps ?? 0, response.stats?.[6]?.steps ?? 0] }];

    // eslint-disable-next-line max-len
    data.labels = [response.stats?.[0]?.stats_day?.toString() ?? '', response.stats?.[1]?.stats_day?.toString() ?? '', response.stats?.[2]?.stats_day?.toString() ?? '', response.stats?.[3]?.stats_day?.toString() ?? '', response.stats?.[4]?.stats_day?.toString() ?? '', response.stats?.[5]?.stats_day?.toString() ?? '', response.stats?.[6]?.stats_day?.toString() ?? ''];
  });

  getUserInformation(token).then((response) => {
    console.log(response);
    username = response.information?.username || '';
  });
}

export default function HomeScreen() {
  const [PedometerAvailability, SetPedometerAvailability] = useState('');
  const maxSteps = 80;
  const [stepCount, setStepCount] = useState(0);

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.8,
    color: (opacity = 1) => `rgba(255, 0, 58, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.8,
    useShadowColorFromDataset: false, // optional
    decimalPlaces: 0,
  };
  const screenWidth = Dimensions.get('window').width;

  const ref = useRef<number|null>(null);

  useEffect(() => {
    calculator();
    ref.current = setInterval(sendSteps, 5 * 60 * 1000);

    return () => {
      if (ref.current) {
        clearInterval(ref.current);
      }
    };
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
      <Text style={styles.title}>
        Welcome
        {' '}
        {username}
        {'\n'}
        This are your daily steps
      </Text>
      <ProgressChart
        data={[stepCount / maxSteps]}
        width={screenWidth}
        height={300}
        strokeWidth={30}
        radius={120}
        chartConfig={chartConfig}
        hideLegend
      />
      <Text style={styles.step}>
        {stepCount}
      </Text>
      <BarChart
        style={styles.graphStyle}
        data={data}
        width={screenWidth}
        height={250}
        chartConfig={chartConfig}
        fromZero
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
  graphStyle: {
    flex: 1,
    justifyContent: 'center',
    marginTop: '20%',
    // alignSelf: 'auto',
  },
  title: {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.8,
    marginVertical: '2%',
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'normal',
    color: '#fff',
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
  step: {
    fontSize: 20,
    color: '#fff',
    marginVertical: -165,
  },
});
