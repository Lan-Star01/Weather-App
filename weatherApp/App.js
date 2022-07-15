import React from 'react';
import { useEffect, useState } from 'react';
import { Text, View, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WEATHER_API_KEY } from 'react-native-dotenv'

export default function App() {

  const [WeatherData, setWeatherData] = useState()
  StatusBar.setBarStyle("light-content");
  const [ city, setCity ] = useState()
  async function getWeather() {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`
    )
    .then(res => res.json())
    .then(data => console.log(data))
    setWeatherData({
      data: data
    });
  }

  const cities = [
    "Tbilisi",
    "Batumi",
    "kutaisi"
  ]


  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View 
      style = {{ 
        flex: 1, 
        backgroundColor: "#22355c",
        paddingTop: 55,
        paddingHorizontal: 20,
      }}
    >
      
      <View 
        style={{
          borderRadius: 25,
          backgroundColor: "#324469",
          padding: 10,
          height: 200,
        }}
        >

        <View style = {{ flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
          <Text style = {{ color: "white", fontSize: 30}}>today</Text>
          <Text style = {{ color: "white"}}>{new Date().toDateString()}</Text>
          <Text style = {{ color: "white", textTransform: "capitalize"}}>{WeatherData.weather.name}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style = {{ color: "white", fontSize: 70 }}>
            {((WeatherData.main.temp - 273.15)*9)/5}°
            <Text style = {{ color: "orange", fontSize: 40}}>C</Text>
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name = "location-outline" color = "white" />
          <Text style = {{ color: "white" }}>{WeatherData.weather.description}</Text>
        </View>
        
      </View>

      <FlatList
        data = {cities}
        contentContainerStyle = {{paddingTop: 20}}
        renderItem = {({ item }) => (
          <TouchableOpacity 
            onPress={() =>{
              getWeather(item)
            }}
            style={{ 
              padding: 20, 
              borderRadius: 10, 
              backgroundColor: "#324469", 
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <text style={{ color: "white"}}>{item}</text>
              <Ionicons name = { item === WeatherData.name ? "radio-button-on" : "radio-button-off"} size = {18} color = "white" />
          </TouchableOpacity>

        )}
      />

    </View>
    

  );
}

