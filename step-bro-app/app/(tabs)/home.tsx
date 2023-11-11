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
import { router } from 'expo-router';
import { getToken } from '../../utils/utils';
import { getUserInformation, getUserStats } from '../../utils/axios';
// eslint-disable-next-line import/no-extraneous-dependencies
const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [200, 450, 280, 800, 990, 430, 800],
    },
  ],
};
export default function HomeScreen() {
  const [PedometerAvailability, SetPedometerAvailability] = useState('');
  const maxSteps = 80;
  const [stepCount, setStepCount] = useState(0);
  const name = '$';

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(255, 0, 58, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.8,
    useShadowColorFromDataset: false, // optional
  };
  const screenWidth = Dimensions.get('window').width;

  const token = getToken();
  // string username = '';
  console.log(token);
  if (token === '') {
    // router.replace('/login');
  } else {
    console.log('test');
    getUserStats(token).then((response) => {
      console.log(response);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line max-len
      data.datasets = [{ data: [response.stats[0].steps, response.stats[1].steps, response.stats[2].steps, response.stats[3].steps, response.stats[4].steps, response.stats[5].steps, response.stats[6].steps] }];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line max-len
      data.labels = [response.stats[0].stats_day.toString(), response.stats[1].stats_day.toString(), response.stats[2].stats_day.toString(), response.stats[3].stats_day.toString(), response.stats[4].stats_day.toString(), response.stats[5].stats_day.toString(), response.stats[6].stats_day.toString()];
    });

    getUserInformation(token).then((response) => {
      console.log(response);
      username = response.information?.username || '';
    });
  }

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
      <Text style={styles.title}>
        Welcome
        {getUserInformation()}
      </Text>
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
      <BarChart
        style={styles.graphStyle}
        data={data}
        width={screenWidth}
        height={250}
        yAxisLabel={name}
        chartConfig={chartConfig}
        verticalLabelRotation={-20}
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
    paddingRight: 25,
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
