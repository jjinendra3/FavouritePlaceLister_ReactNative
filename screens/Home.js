import { View, Text,FlatList,StyleSheet,Image } from 'react-native'
import React from 'react'

const Home = ({route}) => {
  if(!route.params.places || route.params.places.length===0){
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          No Items to Show! Add Places to view them!
        </Text>
      </View>
    )
  }
  return (
    <View>
      <FlatList data={route.params.places} renderItem={(elements)=>{
        return(
          <View>
            <Image/>
            <Text>Name</Text>
            <Text>Adress</Text>
          </View>
        )
      }}/>
    </View>
  )
}

export default Home
const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  text:{
    fontWeight:'bold',
    fontSize:24,
    textAlign:'center',
  }
})
