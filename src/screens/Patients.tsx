import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Card from '../components/shared/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {COLORS, FONT} from '../themes/themes';
import {scale, verticalScale} from '../constants/Layout';
import Avatar from '../assets/images/imgs/avatar.jpg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ChartCard from '../components/shared/ChartCard';
import {useNavigation} from '@react-navigation/native';
import {useFetchProfile, useGetLimitedCharts} from './hooks';
import Foundation from 'react-native-vector-icons/Foundation';

export default function Patients() {
  const navigation = useNavigation();

  const {data, isLoading} = useFetchProfile();

  const {isChartsLoading, limitedCharts} = useGetLimitedCharts();

  console.log('limitedCharts:', limitedCharts);

  const renderCharts = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('SoapNote', {
            id: item?.id,
          })
        }>
        <ChartCard chatDetails={item} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <View style={styles.userDetailsContainer}>
          <Image source={Avatar} style={styles.iamge} />
          <View style={{marginLeft: scale(10)}}>
            <Text style={styles.name}>
              {data?.data?.doctor_data?.full_name}
            </Text>
            <Text style={styles.email}>{data?.data?.doctor_data?.email}</Text>
          </View>
        </View>
        <View style={{alignSelf: 'center'}}>
          <View style={styles.premiumContainer}>
            <Foundation name="info" color={COLORS.warning} size={scale(14)} />
            <Text style={styles.premium}>Free Trial</Text>
          </View>

          <Text style={styles.chartContainer}>
            Charts:{' '}
            <Text style={styles.chartCount}>
              {data?.data?.doctor_data?.chart_count}
            </Text>
          </Text>
        </View>
      </View>

      <View style={{marginTop: scale(40), flex: 1}}>
        <View style={styles.chartHeaderContainer}>
          <Text style={styles.chart}>Charts</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Charts')}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={{paddingTop: scale(10), marginBottom: scale(30)}}>
          {isChartsLoading ? (
            <ActivityIndicator
              size="small"
              color={COLORS.primary}
              style={{alignSelf: 'center', marginTop: scale(10)}}
            />
          ) : (
            <FlatList
              data={limitedCharts}
              renderItem={renderCharts}
              contentContainerStyle={{
                marginTop: scale(10),
                paddingBottom: scale(20),
              }}
              style={{paddingBottom: scale(20)}}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              ListEmptyComponent={() => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: scale(50),
                  }}>
                  <Text
                    style={{
                      fontFamily: FONT.regular,
                      fontSize: scale(16),
                      color: COLORS.mediumGreyText,
                    }}>
                    No SOAP Notes found
                  </Text>
                </View>
              )}
            />
          )}
        </View>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: scale(20),
    paddingHorizontal: scale(20),
  },
  userDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: COLORS.mediumGreyText,
    fontWeight: '600',
    fontSize: scale(18),
    fontFamily: FONT.medium,
    marginBottom: scale(8),
  },
  email: {
    color: COLORS.greyText,
    fontSize: scale(13),
    fontFamily: FONT.regular,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  premium: {
    color: COLORS.black,
    fontSize: scale(11),
    fontFamily: FONT.regular,
    fontWeight: '500',
    marginLeft: scale(5),
  },
  premiumContainer: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(2),
    borderRadius: scale(50),
    borderColor: COLORS.white,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  iamge: {
    width: scale(55),
    height: scale(55),
    borderRadius: scale(50),
  },
  chartContainer: {
    textAlign: 'center',
    marginTop: scale(8),
    fontSize: scale(12),
  },
  chartCount: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: scale(13),
  },
  chartHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chart: {
    color: COLORS.mediumGreyText,
    fontSize: scale(18),
    fontWeight: '600',
    fontFamily: FONT.medium,
  },
  viewAll: {
    color: COLORS.primary,
    fontSize: scale(13),
    fontFamily: FONT.regular,
    fontWeight: '500',
  },
});
