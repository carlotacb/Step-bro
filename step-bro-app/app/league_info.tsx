import { useEffect } from 'react';
import { Linking, Text } from 'react-native';

export default function LeagueInfo() {
  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        // Convert the string into a URL object
        const url = new URL(initialUrl);
        // Get the value of the "param" query parameter
        const param = url.searchParams.get('league_id');
        // Display the parameter value in the console
        console.log('Parameter:', param);
      }
    };
    getUrlAsync();
  }, []);
  return (
    <Text> Hola </Text>
  );
}
