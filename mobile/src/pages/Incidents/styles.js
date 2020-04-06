import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';


const Styles = StyleSheet.create({

  container:{
    flex:1,
    paddingTop:Constants.statusBarHeight + 20,
    marginHorizontal:24,
  },

 header:{
   flexDirection:'row',
   alignItems: 'center',
   justifyContent: 'space-between',
   marginBottom:20,
 },

 headerText:{
  color:'#737380',
  fontSize:15,
  fontWeight:"bold",
 },

 headerTextBold:{
  fontWeight:"bold",
 },

 title:{
  fontSize:30,
  marginBottom:16,
  marginTop:30,
  color:'#13131a',
  fontWeight:'bold',
  marginBottom:5,
 },

 description:{
   fontSize:16,
   color:'#737380',
 },

 incidentsList:{
   marginTop:30,
 },

 incident:{
   backgroundColor:'#fff',
   padding:24,
   borderRadius:8,
   marginBottom:16
 },

 incidProperty:{
  fontSize:14,
  color:'#41414d',
  fontWeight:'bold'
 },

 incidValue:{
  marginTop:8,
  fontSize:15,
  marginBottom:24,
  color:'#737380'
 },

 detailButton:{
   flexDirection:'row',
   justifyContent:"space-between",
   alignItems:'center'
 },

 detailButtonText:{
   fontWeight:'bold',
  color:'#e02041'
 }

});


export default Styles;