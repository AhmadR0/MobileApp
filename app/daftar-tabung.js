import { View,Text,StyleSheet } from "react-native";

export default function DaftartabungScreen(){
    return(
      <View style={styles.container}> 
          <View style={styles.header}> 
            <Text style={styles.hederText}>Daftar Tabung</Text>
          </View>
      </View>
      
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#007bff',
  },
  hederText:{
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  }
})