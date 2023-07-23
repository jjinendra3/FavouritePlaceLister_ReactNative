import { View, Text,StyleSheet,TextInput } from 'react-native'
import React,{useState} from 'react'
const Adder = () => {
  const [first, setfirst] = useState('')
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput value={first} onChangeText={setfirst} style={styles.title}/>
    </View>
  )
}

export default Adder
const styles=StyleSheet.create({
  container:{
    flex:1,
    padding:16
  },
  label:{
    fontWeight:'500',
    fontSize:12,
    marginLeft:10
  },
  title:{
    borderWidth:1,
    borderRadius:20,
    borderColor:'black',
    padding:5,
    paddingHorizontal:10
  }
})