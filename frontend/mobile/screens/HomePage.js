import { useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularMovies } from '../redux/movieSlice';
import MovieCarousel from '../components/MovieCarousel';
import Footer from '../components/Footer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';

export default function HomePage() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.data);
  const loading = useSelector((state) => state.movies.loading);
  const error = useSelector((state) => state.movies.error);
  const navigation = useNavigation();
  const { colors } = useTheme();

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <View className="px-4 pt-8 pb-2" style={{ backgroundColor: colors.background }}>
        <View className="flex-row items-center">
          {/* Sol boşluk */}
          <View style={{ width: 40 }} />

          {/* Orta: Logo */}
          <View className="flex-1 items-center">
            <Image
              source={require('../assets/mrslogo.png')}
              style={{ width: 140, height: 60, resizeMode: 'contain' }}
            />
          </View>

          {/* Sol: Bildirim İkonu */}
          <TouchableOpacity onPress={() => navigation.navigate('NotificationsPage')}>
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
          </TouchableOpacity>

          {/* Sağ: Profil İkonu */}
          <TouchableOpacity 
            onPress={() => navigation.navigate('ProfilePage')}
            style={{ width: 40, alignItems: 'flex-end' }}
          >
            <Ionicons name="person-circle-outline" size={32} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Carousel */}
        {!loading && movies.length > 0 && <MovieCarousel movies={movies} />}
        {loading && <Text className="ml-4" style={{ color: colors.text }}>Loading...</Text>}
        {error && <Text className="text-red-500 ml-4">{error}</Text>}

        {/* More Başlığı */}
        <Text className="text-xl font-bold mt-6 ml-4" style={{ color: colors.text }}>More</Text>

        <FlatList
          horizontal
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => {
            const imageUrl = item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : 'https://via.placeholder.com/120x180?text=No+Image';

            return (
              <View className="p-2 mx-2">
                <Image
                  source={{ uri: imageUrl }}
                  className="w-[120px] h-[180px] rounded-lg"
                  resizeMode="cover"
                />
                <Text 
                  className="w-[120px] mt-1" 
                  numberOfLines={1}
                  style={{ color: colors.text }}
                >
                  {item.title}
                </Text>
              </View>
            );
          }}
        />
      </View>
      <Footer activePage='home' />
    </View>
  );
}
