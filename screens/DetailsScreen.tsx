import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Barometer, LightSensor } from 'expo-sensors';

export default function DetailsScreen() {
  const [pressure, setPressure] = useState<number | null>(null);
  const [light, setLight] = useState<number | null>(null);

  useEffect(() => {
    const barometerSubscription = Barometer.addListener(({ pressure }) => setPressure(pressure));
    const lightSubscription = LightSensor.addListener(({ illuminance }) => setLight(illuminance));

    return () => {
      barometerSubscription && barometerSubscription.remove();
      lightSubscription && lightSubscription.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Barometer Pressure: {pressure ? `${pressure} hPa` : 'Loading...'}</Text>
      <Text>Light Level: {light ? `${light} lx` : 'Loading...'}</Text>
    </View>
  );
}
