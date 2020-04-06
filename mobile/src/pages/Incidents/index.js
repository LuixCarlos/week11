import React, {useState, useEffect} from 'react';
import { Image, Text, View, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import { Feather } from '@expo/vector-icons';
import Logo from '../../assets/logo.png'
import Style from './styles';

import api from '../../services/api';

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [totalCaso, setTotalCaso] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const navigation = useNavigation();

  const handleDetail = (incident)=>{
    navigation.navigate('Details',{incident});
  }

  async function loadIncidents(){
    if(loading){
      return;
    }
    if(totalCaso > 0 && incidents.length === totalCaso){
      return 
    }
    setLoading(true);
    setRefreshing(false)

    const response = await api.get(`/incidents?page=${page}`);
    setIncidents([...incidents, ...response.data])

    setPage(page + 1);
    setTotalCaso(response.headers['x-total-count'])
    setLoading(false);
  }

  useEffect(()=>{
    loadIncidents();
  },[]);

  function onRefresh() {
    //Clear old data of the list
    setIncidents([]);
    setPage(1);
    setTotalCaso(0);
    setLoading(false);
    setRefreshing(true)
    //Call the Service to get the latest data
    loadIncidents();
  }

    return (
      <View style={Style.container}>
        <View style={Style.header}>
          <Image source={Logo}/>
          <Text style={Style.headerText}>
            Total de<Text style={Style.headerTextBold}> {totalCaso} casos</Text>
          </Text>
        </View>

        <View >
          <Text style={Style.title}>Bem Vindo!</Text>
          <Text style={Style.description}>Escolha um dos casos abaixo e salve o dia.</Text>
        </View>
        {
          refreshing?(
              <View style={{ flex: 1, paddingTop: 100 }}>
                <ActivityIndicator />
              </View>
          ):(
            <FlatList
            style={Style.incidentsList}
            data={incidents}
            keyExtractor={incident => String(incident.id)}
            // showsVerticalScrollIndicator={false}
            onEndReached={loadIncidents}
            onEndReachedThreshold={0.2}
            refreshControl={
              <RefreshControl
              //refresh control used for the Pull to Refresh
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
            }
            renderItem ={({item:incident})=>(
              <View style={Style.incident}>
                <Text style={Style.incidProperty}>ONG:</Text>
                <Text style={Style.incidValue}>{incident.name}</Text>
  
                <Text style={Style.incidProperty}>CASO:</Text>
                <Text style={Style.incidValue}>{incident.description}</Text>
  
                <Text style={Style.incidProperty}>VALOR:</Text>
                <Text style={Style.incidValue}>
                  {Intl.NumberFormat(
                      'pt-BR',
                      {
                        style:'currency', 
                        currency: 'BRL'
                      }
                    ).format(incident.value)
                  }
                </Text>
  
                <TouchableOpacity
                  style={Style.detailButton}
                  onPress={()=> handleDetail(incident)}
                >
                  <Text style={Style.detailButtonText}>Ver mais detalhes</Text>
                  <Feather name="arrow-right"size={16} color="#e02041"/>
                </TouchableOpacity>
              </View>
            )}
          />
          )
        } 
      </View>
    )
}

export default Incidents;