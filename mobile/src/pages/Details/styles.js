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

 incident:{
   backgroundColor:'#fff',
   padding:24,
   borderRadius:8,
   marginBottom:16
 },

 incidProperty:{
  fontSize:14,
  color:'#41414d',
  marginTop:24,
  fontWeight:'bold'
 },

 incidValue:{
  marginTop:8,
  fontSize:15,
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
 },

 contactBox:{
  backgroundColor:'#fff',
  padding:24,
  borderRadius:8,
  marginBottom:16
 },

 heroTitle:{
  fontWeight:'bold',
  color:'#13131a',
  fontSize:20,
  lineHeight:30,
 },

 heroDescription:{
  color:'#737380',
  fontSize:15,
  marginTop:16
 },

 actions:{
  marginTop:16,
  flexDirection:'row',
  justifyContent:"space-between"
 },

 action:{
  backgroundColor:'#e02041',
  borderRadius:8,
  height:50,
  width:'48%',
  justifyContent:"center",
  alignItems:'center',
 },

 actionText:{
  fontWeight:'bold',
  fontSize:15,
   color:"#fff",
 }

});


export default Styles;