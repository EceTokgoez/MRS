import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default function CompatibilityChart({ data }) {
  // data: [{ id, name, percent }, ...]
  const labels = data.map(item => item.name);
  const values = data.map(item => item.percent);

  // Ekran genişliği - 32px (sağ/sol padding için)
  const screenWidth = Dimensions.get('window').width - 32;

  const chartConfig = {
    backgroundGradientFrom: '#1F2937',
    backgroundGradientTo: '#1F2937',
    color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`, // mavi ton
    barPercentage: 0.9, // sütun genişliği artırıldı
    useShadowColorFromDataset: false,
    decimalPlaces: 0, // Yüzde tam sayı
  };

  return (
    <View>
      <Text className="text-white text-center mb-2 font-semibold">
        Compatibility (%)
      </Text>
      <BarChart
        data={{
          labels,
          datasets: [{ data: values }],
        }}
        width={screenWidth}
        height={300}
        
        chartConfig={chartConfig}
        
        fromZero
        showValuesOnTopOfBars={true} // değerler sütun üstünde gösterilir
        withInnerLines={false} // iç çizgiler kaldırıldı
        style={{ borderRadius: 8 }}
      />
    </View>
  );
}
