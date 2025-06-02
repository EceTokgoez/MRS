import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../contexts/ThemeContext';

export default function Footer({ activePage }) {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const menuItems = [
    { 
      id: 'picks',
      icon: 'star-outline',
      label: 'picks4u',
      screen: 'Picks4UPage',
    },
    { 
      id: 'friends',
      icon: 'people-outline',
      label: 'Friends',
      screen: 'FriendsPage',
    },
    { 
      id: 'home',
      icon: 'home-outline',
      label: 'Home',
      screen: 'HomePage',
    },
    { 
      id: 'discover',
      icon: 'search-outline',
      label: 'Discover',
      screen: 'SearchScreen',
    },
    { 
      id: 'shelf',
      icon: 'book-outline',
      label: 'Shelf',
      screen: 'ShelfPage',
    },
  ];

  return (
    <View 
      className="absolute bottom-0 left-0 right-0 flex-row justify-around items-center py-2"
      style={{ backgroundColor: colors.footer }}
    >
      {menuItems.map((item) => {
        const isActive = activePage === item.id;
        const color = isActive ? colors.footerActive : colors.footerText;
        
        return (
          <TouchableOpacity
            key={item.id}
            className="items-center flex-1"
            onPress={() => navigation.navigate(item.screen)}
          >
            <Ionicons
              name={item.icon}
              size={24}
              color={color}
            />
            <Text 
              className={`text-xs mt-1 ${isActive ? 'font-bold' : 'font-normal'}`}
              style={{ color }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}


// // /frontend/mobile/src/components/Footer.js

// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

// /**
//  * Footer bileşeni (app genelindeki bottom bar):
//  *   - picks4u (placeholder, TODO satırına bakabilirsiniz)
//  *   - friends (placeholder, TODO satırına bakabilirsiniz)
//  *   - home ikonuna tıklayınca HomePage'e gider
//  *   - search ikonuna tıklayınca her yerden SearchScreen'e döner
//  *   - shelf ikonuna tıklayınca ShelfPage'e gider
//  */
// export default function Footer() {
//   const navigation = useNavigation();

//   return (
//     <View className="absolute bottom-0 left-0 right-0 flex-row bg-black justify-around items-center py-2">
//       {/* Picks4U Placeholder */}
//       <TouchableOpacity
//         className="items-center"
//         onPress={() => {
//           /* TODO: Picks4U ekranı varsa, navigation.navigate('Picks4U') yapın */
//         }}
//       >
//         <Text className="text-xs text-white">picks4u</Text>
//       </TouchableOpacity>

//       {/* Friends Placeholder */}
//       <TouchableOpacity
//         className="items-center"
//         onPress={() => {
//           /* TODO: Friends ekranı varsa, navigation.navigate('Friends') yapın */
//         }}
//       >
//         <Ionicons name="people-outline" size={24} color="white" />
//         <Text className="text-xs mt-1 text-white">friends</Text>
//       </TouchableOpacity>

//       {/* Home */}
//       <TouchableOpacity
//         className="items-center"
//         onPress={() => navigation.navigate('HomePage')}
//       >
//         <Ionicons name="home-outline" size={24} color="blue" />
//         <Text className="text-xs mt-1 text-blue-500">home</Text>
//       </TouchableOpacity>

//       {/* Discover / Search: Her yerden SearchScreen'e döner */}
//       <TouchableOpacity
//         className="items-center"
//         onPress={() => navigation.navigate('SearchScreen')}
//       >
//         <Ionicons name="search-outline" size={24} color="white" />
//         <Text className="text-xs mt-1 text-white">discover</Text>
//       </TouchableOpacity>

//       {/* Shelf */}
//       <TouchableOpacity
//         className="items-center"
//         onPress={() => navigation.navigate('ShelfPage')}
//       >
//         <Ionicons name="book-outline" size={24} color="white" />
//         <Text className="text-xs mt-1 text-white">shelf</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
