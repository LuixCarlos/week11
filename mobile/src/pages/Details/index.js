import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as MailCompose from 'expo-mail-composer'

import { Image, Text, View, TouchableOpacity, Linking} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Logo from '../../assets/logo.png'
import Style from './styles';

import api from '../../services/api';

const Details = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const incident = route.params.incident;
  const message = `Ola ${incident.name}, estou entrando em contato pois gostaria de ajudar `+
  `no caso ${incident.title} com o valor de ${
    Intl.NumberFormat(
      'pt-BR',
      {
        style:'currency', 
        currency: 'BRL'
      }
    ).format(incident.value)
  }`;
  

  const backIncidentsList = () =>{
    navigation.goBack();
  }

  const sendMail = ()=>{
    MailCompose.composeAsync({
      subject:`Heroi do caso: ${incident.title}`,
      recipients:[incident.email],
      body: message,
    });
  }

  const sendWhatsapp = ()=>{
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
  }

  return (
    <View style={Style.container}>
      <View style={Style.header}>
        <Image source={Logo}/>

        <TouchableOpacity
          style={Style.detailButton}
          onPress={backIncidentsList}
        >
          <Feather name="arrow-left"size={30} color="#e02041"/>
        </TouchableOpacity>
      </View>

      <View style={Style.incident}>
        <Text style={[Style.incidProperty, { marginTop:0 }]}>ONG:</Text>
        <Text style={Style.incidValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

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
      </View>

      <View style={Style.contactBox}>
        <Text style={Style.heroTitle}>Salve o dia!</Text>
        <Text style={Style.heroTitle}>Seja o Heroi desse caso</Text>

        <Text style={Style.heroDescription}>Entre em contato</Text>

        <View style={Style.actions}>
          <TouchableOpacity
              style={Style.action}
              onPress={sendWhatsapp}
          >
            <Text style={Style.actionText}>WhastApp</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={Style.action}
              onPress={sendMail}
          >
            <Text style={Style.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Details;
