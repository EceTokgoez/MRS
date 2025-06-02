// src/components/PodiumChart.jsx
import React from 'react';
import { View, Text, Dimensions } from 'react-native';

export default function PodiumChart({ data }) {
  // data: [{ id, name, percent }, ...]
  // Önce veriyi azalan sırada sıralayıp ilk üçe indiriyoruz:
  const sorted = [...data]
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 3);

  // Eğer üç eleman yoksa kalanları boş bırakacak şekilde tamamlayalım:
  while (sorted.length < 3) {
    sorted.push({ id: `empty-${sorted.length}`, name: '', percent: 0 });
  }

  // “podium” düzeni: solda ikinci büyük, ortada birinci büyük, sağda üçüncü büyük
  const first = sorted[0];   // en yüksek percent → rank 1
  const second = sorted[1];  // ikinci en yüksek → rank 2
  const third = sorted[2];   // üçüncü en yüksek → rank 3

  // Maksimum sütun yüksekliğini ayarlayalım (örneğin 200 px):
  const MAX_HEIGHT = 200;

  // Ekran genişliğinden padding çıkartarak hesaplıyoruz (solda/sağda toplam 32 px boşluk olacak):
  const screenWidth = Dimensions.get('window').width - 32;

  // Podium bar genişliğine karar verelim (örneğin toplam genişliğin 1/5’i kadar her bir sütun):
  const barWidth = screenWidth / 5;

  // Aşağıdaki yardımcı fonksiyon, % değere göre bar yüksekliğini hesaplar:
  const getBarHeight = (percent) => {
    // Basitçe: percent değeri 0–100 arası beklendiği için:
    return (percent / 100) * MAX_HEIGHT;
  };

  return (
    <View className="items-center mb-8">
      {/* Sütunları barlardan ve üst etiketlerden oluşan bir satır olarak gösteriyoruz */}
      <View className="flex-row items-end">
        {/* SOLDAN İKİNCİ (rank 2) */}
        <View className="items-center mx-2">
          {/* Yüzde Etiketi */}
          <Text className="text-white mb-1 text-sm">
            {second.percent}%
          </Text>
          {/* Sütunun kendisi */}
          <View
            style={{
              width: barWidth,
              height: getBarHeight(second.percent),
              backgroundColor: '#FBBF24', // amber-400 gibi bir renk (istenirse değiştirilebilir)
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
            }}
          />
          {/* Altındaki sıralama numarası */}
          <Text className="text-gray-400 mt-1 text-lg font-bold">
            2
          </Text>
        </View>

        {/* ORTADA BİRİNCİ (rank 1) */}
        <View className="items-center mx-2">
          {/* Yüzde Etiketi */}
          <Text className="text-white mb-1 text-sm">
            {first.percent}%
          </Text>
          {/* Sütunun kendisi */}
          <View
            style={{
              width: barWidth,
              height: getBarHeight(first.percent),
              backgroundColor: '#3B82F6', // blue-500 gibi bir renk
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
            }}
          />
          {/* Altındaki sıralama numarası */}
          <Text className="text-gray-400 mt-1 text-lg font-bold">
            1
          </Text>
        </View>

        {/* SAĞDAN ÜÇÜNCÜ (rank 3) */}
        <View className="items-center mx-2">
          {/* Yüzde Etiketi */}
          <Text className="text-white mb-1 text-sm">
            {third.percent}%
          </Text>
          {/* Sütunun kendisi */}
          <View
            style={{
              width: barWidth,
              height: getBarHeight(third.percent),
              backgroundColor: '#6B7280', // gray-500 gibi bir renk
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
            }}
          />
          {/* Altındaki sıralama numarası */}
          <Text className="text-gray-400 mt-1 text-lg font-bold">
            3
          </Text>
        </View>
      </View>

      {/* Alt frase veya açıklama eklemek istersek buraya koyabiliriz */}
      {/* <Text className="text-gray-500 mt-2 text-sm">Your top 3 friends</Text> */}
    </View>
  );
}
