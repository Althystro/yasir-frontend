import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AllVehicles = () => {
  return (
    <SafeAreaView style={styles.container}>
    {/* <ScrollView  showsVerticalScrollIndicator={false}> */}
    <View style={styles.topSection}>
      {/* The search button and profile ? */}

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon
          name="magnify"
          size={24}
          color="#1B2128"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          value={searchInput}
          // onChangeText={handleSearch}
        />
      </View>

      <View></View>
    </View>
    <View style={styles.midSection}>
      {/* Only for the logo moto */}
      <Text style={styles.midText}> Yessir | يسر </Text>
      <Text style={{ color: "white" }}>Vroom</Text>
    </View>

    {/* Containes all cards */}
    <View style={styles.bottomSection}>
      {/* Brands categories List */}
      <View style={styles.sectionContainer}>
        <CarBrandsList />
      </View>
      {/* Popular Car card */}
      <View>
        <PopularCars />
      </View>

      {/* The Ai / calculater card this is will be changed later */}
      <View style={{ flexDirection: "row" }}>
        {/* Ai card */}
        <View style={styles.aiSection}></View>
        {/* Calculater card */}
        <View style={styles.calculaterSection}></View>
      </View>
    </View>
    {/* </ScrollView> */}
  </SafeAreaView>
  )
}

export default AllVehicles

const styles = StyleSheet.create({})