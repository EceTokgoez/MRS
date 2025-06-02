// navigations/AppNavigator.js

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Ekranlarını import et
import OnboardingPage from '../screens/OnboardingPage'
import LoginPage      from '../screens/LoginPage'
import RegisterPage1    from '../screens/RegisterPage1'
import RegisterPage2    from '../screens/RegisterPage2'
import PreferencesPage from '../screens/PreferencesPage'
import SearchScreen from '../screens/SearchScreen'
import ShelfPage from '../screens/ShelfPage'
import HomePage from '../screens/HomePage'
import ProfilePage from '../screens/ProfilePage'
import SettingsPage from '../screens/SettingsPage'
import FriendsPage from '../screens/FriendsPage'
import NotificationsPage from '../screens/NotificationsPage'
import HarmoviePage from '../screens/HarmoviePage'
import HarmovieGoPage from '../screens/HarmovieGoPage'

import GenreFilterScreen      from '../screens/Search/GenreFilterScreen';
import GenreResultScreen     from '../screens/Search/GenreResultScreen';
import LanguageFilterScreen   from '../screens/Search/LanguageFilterScreen';
import LanguageResultScreen  from '../screens/Search/LanguageResultScreen';
import PopularFilterScreen    from '../screens/Search/PopularFilterScreen';
import PopularResultScreen   from '../screens/Search/PopularResultScreen';
import YearFilterScreen       from '../screens/Search/YearFilterScreen';
import YearResultsScreen      from '../screens/Search/YearResultsScreen';
import SearchResultsScreen      from '../screens/Search/SearchResultsScreen';

import AddNewListPage from '../screens/AddNewListPage'
import SearchAndAddPage from '../screens/SearchAndAddPage'
import ListDetailPage from '../screens/ListDetailPage'
import Picks4UPage from '../screens/Picks4uPage'
import RecommendationTypePage from '../screens/RecommendationTypePage'
import IndividualRecommendationPage from '../screens/IndividualRecommendationPage'
import MovieInfoScreen from '../screens/Search/MovieInfoScreen';


const Stack = createNativeStackNavigator()

export default function AppNavigator() {
  return (
    
      <Stack.Navigator
        initialRouteName="OnboardingPage" // Giriş sayfası olarak değiştirildi
        screenOptions={{ headerShown: false }} // istersen header ekle
      >
        <Stack.Screen name="OnboardingPage"    component={OnboardingPage} />
        <Stack.Screen name="LoginPage"         component={LoginPage} />
        <Stack.Screen name="RegisterPage1"     component={RegisterPage1} />
        <Stack.Screen name="RegisterPage2"     component={RegisterPage2} />
        <Stack.Screen name="PreferencesPage"   component={PreferencesPage} />
        <Stack.Screen name="HomePage"          component={HomePage} />
        <Stack.Screen name="NotificationsPage" component={NotificationsPage} />
        <Stack.Screen name="ProfilePage"       component={ProfilePage} />
        <Stack.Screen name="SettingsPage"      component={SettingsPage} />        
        <Stack.Screen name="SearchScreen"      component={SearchScreen} />
        <Stack.Screen name="ShelfPage"         component={ShelfPage} />
        <Stack.Screen name="FriendsPage"       component={FriendsPage} />
        <Stack.Screen name="HarmoviePage"      component={HarmoviePage} />
        <Stack.Screen name="HarmovieGoPage"    component={HarmovieGoPage} />
       
       
          {/* 3. Genre Filtreleme ve Sonuçları */}
        <Stack.Screen name="GenreFilter"      component={GenreFilterScreen} />
        <Stack.Screen name="GenreResult"     component={GenreResultScreen} />
        {/* 4. Language Filtreleme ve Sonuçları */}
        <Stack.Screen name="LanguageFilter"   component={LanguageFilterScreen} />
        <Stack.Screen name="LanguageResult"  component={LanguageResultScreen} />
        {/* 5. Popular Filtreleme ve Sonuçları */}
        <Stack.Screen name="PopularFilter"    component={PopularFilterScreen} />
        <Stack.Screen name="PopularResults"   component={PopularResultScreen} />
        {/* 6. Year Filtreleme ve Sonuçları */}
        <Stack.Screen name="YearFilter"       component={YearFilterScreen} />
        <Stack.Screen name="YearResults"      component={YearResultsScreen} />
        {/* 7. Film Detay Ekranı */}
        <Stack.Screen name="MovieInfo"        component={MovieInfoScreen} />
        <Stack.Screen name="SearchResultsScreen"        component={SearchResultsScreen} />
        
        
        <Stack.Screen name="AddNewListPage"    component={AddNewListPage} />
        <Stack.Screen name="SearchAndAddPage" component={SearchAndAddPage} />
        <Stack.Screen name="ListDetailPage"   component={ListDetailPage} />
        {/* Diğer ekranlar buraya eklenebilir */}
        <Stack.Screen name="Picks4UPage"       component={Picks4UPage} />
        <Stack.Screen name="RecommendationTypePage" component={RecommendationTypePage} />
        <Stack.Screen name="IndividualRecommendationPage" component={IndividualRecommendationPage} />

        
      </Stack.Navigator>
    
  )
}
// AppNavigator.js
