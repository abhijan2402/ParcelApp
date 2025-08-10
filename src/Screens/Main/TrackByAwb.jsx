import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../Components/FeedHeader';
import {windowHeight, windowWidth} from '../../Constants/Dimensions';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';
import {TransitHistoryModal} from '../../Components/TransitHistoryModal';

const carriers = [
  {id: 'xpressbees', label: 'Xpressbees'},
  {id: 'ecom', label: 'Ecom Express'},
  {id: 'delhivery', label: 'Delhivery'},
];

const TrackByAwb = ({navigation, route}) => {
  const selectedAwbNumber = route?.params?.AWB;
  console.log(selectedAwbNumber, 'AWBBBBBB');

  const [selectedCarrier, setSelectedCarrier] = useState(null);
  const [awbNumber, setAwbNumber] = useState('');
  const [shipmentData, setShipmentData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedScanHistory, setSelectedScanHistory] = useState([]);

  const handleMoreInfo = scan => {
    const filteredData = shipmentData?.Scans?.filter(
      item => item?.ScanDetail?.Scan === scan,
    );
    setSelectedScanHistory(filteredData);
    setModalVisible(true);
  };

  const trackShipment = async () => {
    console.log(selectedCarrier, 'SDELNBJHBEU');
    console.log(awbNumber, 'AWBBB');

    if (!selectedCarrier || !awbNumber) {
      Alert.alert('Carrier or AWB number missing.');
      return;
    }

    if (selectedCarrier === 'delhivery') {
      try {
        const apiKey = 'c4093190ae6edab6fd33121e5c6ad56dcb67804e';
        const url = `https://track.delhivery.com/api/v1/packages/json?waybill=${awbNumber}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Token ${apiKey}`,
            Accept: 'application/json',
          },
        });
        const datas = await response.json();
        const shipmentData = datas?.ShipmentData?.[0]?.Shipment;
        if (shipmentData) {
          setShipmentData(shipmentData);
        } else {
          setShipmentData(null);
          Alert.alert('No shipment data found for this AWB.');
        }
      } catch (error) {
        Alert.alert('Error fetching Delhivery data.');
        setShipmentData(null);
      }
    } else if (selectedCarrier === 'xpressbees') {
      try {
        const loginResponse = await fetch(
          'https://shipment.xpressbees.com/api/users/login',
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              email: 'contact@dearexpress.com',
              password: 'Express!@#321321',
            }),
          },
        );

        const loginData = await loginResponse.json();
        const token = loginData?.data;

        if (!token) {
          Alert.alert('Login failed');
          return;
        }

        const trackingRes = await fetch(
          `https://shipment.xpressbees.com/api/shipments2/track/${awbNumber}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          },
        );

        const trackingData = await trackingRes.json();
        console.log(trackingData, 'TRACKKKK');
        console.log(trackingData?.awb_number, 'NUMBERRRR');

        if (trackingData?.data?.awb_number) {
          setShipmentData(trackingData?.data);
        } else {
          Alert.alert('No shipment data found for this AWB.');
          setShipmentData(null);
        }
      } catch (error) {
        Alert.alert('Error fetching Xpressbees data.');
        setShipmentData(null);
      }
    }
  };

  useEffect(() => {
    if (selectedAwbNumber) {
      setSelectedCarrier('xpressbees');
      setAwbNumber(selectedAwbNumber);
    }
  }, []);
  useEffect(() => {
    if (selectedAwbNumber && awbNumber) {
      trackShipment(false);
    }
  }, [awbNumber]);

  return (
    <View style={styles.container}>
      <Header
        showBack
        onBackPress={() => navigation.goBack()}
        title={'Track your shipment'}
      />

      <ScrollView style={{flex: 1, marginBottom: 20}}>
        <View style={styles.optionsContainer}>
          {carriers.map(carrier => (
            <TouchableOpacity
              key={carrier.id}
              style={[
                styles.optionBox,
                selectedCarrier === carrier.id && styles.optionBoxSelected,
              ]}
              onPress={() => setSelectedCarrier(carrier.id)}>
              <Text
                style={[
                  styles.optionText,
                  selectedCarrier === carrier.id && styles.optionTextSelected,
                ]}>
                {carrier.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedCarrier && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter Shipment no."
              value={awbNumber}
              onChangeText={setAwbNumber}
            />
            <CustomButton title={'Track'} onPress={trackShipment} />
          </>
        )}

        {shipmentData && selectedCarrier === 'delhivery' && (
          <View style={styles.dataBox}>
            <Text style={styles.heading}>Delhivery Shipment Details</Text>
            <Text style={styles.label}>AWB No:</Text>
            <Text style={styles.value}>{shipmentData.AWB}</Text>
            <Text style={styles.label}>Pickup Date:</Text>
            <Text style={styles.value}>{shipmentData.PickedupDate}</Text>
            <Text style={styles.label}>Delivery Date:</Text>
            <Text style={styles.value}>{shipmentData.DeliveryDate}</Text>
            <Text style={styles.label}>Invoice Amount:</Text>
            <Text style={styles.value}>₹ {shipmentData.InvoiceAmount}</Text>

            {shipmentData?.Scans && shipmentData.Scans.length > 0 && (
              <>
                <Text style={styles.heading}>Shipment Timeline</Text>
                <View style={styles.timelineContainer}>
                  {shipmentData.Scans.map((scan, index) => (
                    <View key={index} style={styles.timelineItem}>
                      <View style={[styles.circle, styles.circleActive]} />
                      <View style={styles.timelineContent}>
                        <Text style={styles.timelineTitle}>
                          {scan.ScanDetail?.Scan}
                        </Text>
                        <Text style={styles.timelineDate}>
                          {scan.ScanDetail?.ScanDateTime}
                        </Text>
                        <Text style={styles.timelineLocation}>
                          {scan.ScanDetail?.ScannedLocation}
                        </Text>
                        <Text style={styles.timelineInstruction}>
                          {scan.ScanDetail?.Instructions}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </>
            )}
          </View>
        )}

        {shipmentData && selectedCarrier === 'xpressbees' && (
          <View style={styles.dataBox}>
            <Text style={styles.heading}>Xpressbees Shipment Details</Text>
            <Text style={styles.label}>AWB No:</Text>
            <Text style={styles.value}>{shipmentData.awb_number}</Text>
            <Text style={styles.label}>Order No:</Text>
            <Text style={styles.value}>{shipmentData.order_number}</Text>
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>{shipmentData?.status}</Text>
            <Text style={styles.label}>Created On:</Text>
            <Text style={styles.value}>{shipmentData.created}</Text>
            <Text style={styles.label}>PDD:</Text>
            <Text style={styles.value}>{shipmentData?.pdd}</Text>
            {shipmentData.pod_link && (
              <TouchableOpacity
                onPress={() => Linking.openURL(shipmentData.pod_link)}>
                <Text style={[styles.value, {color: 'blue'}]}>View POD</Text>
              </TouchableOpacity>
            )}

            <Text style={styles.heading}>Shipment Timeline</Text>
            <View style={styles.timelineContainer}>
              {shipmentData.history?.map((item, index) => (
                <View key={index} style={styles.timelineItem}>
                  <View style={styles.timelineLeft}>
                    <View
                      style={[
                        styles.circle,
                        index === 0
                          ? styles.circleActive
                          : styles.circleInactive,
                      ]}
                    />
                    {index !== shipmentData.history.length - 1 && (
                      <View style={styles.verticalLine} />
                    )}
                  </View>

                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineTitle}>{item.message}</Text>
                    <Text style={styles.timelineDate}>{item.event_time}</Text>
                    <Text style={styles.timelineLocation}>{item.location}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default TrackByAwb;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    flex: 1,
  },
  optionsContainer: {
    justifyContent: 'space-around',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  optionBox: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOR.gray,
    marginVertical: 5,
    marginHorizontal: 40,
    alignItems: 'center',
  },
  optionBoxSelected: {
    borderColor: 'green',
    backgroundColor: '#e6f4ea',
  },
  optionText: {
    fontSize: 16,
    color: COLOR.black,
  },
  optionTextSelected: {
    color: 'green',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: COLOR.gray,
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
    paddingLeft: 10,
    width: windowWidth / 1.2,
    alignSelf: 'center',
  },
  dataBox: {
    margin: 16,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    elevation: 3,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#007bff',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginTop: 8,
  },
  value: {
    fontSize: 14,
    color: '#000',
  },
  timelineContainer: {
    marginTop: 10,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    marginRight: 10,
    marginTop: 4,
  },
  circleActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  circleInactive: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  timelineDate: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
  timelineLocation: {
    fontSize: 13,
    color: '#777',
  },
  timelineInstruction: {
    fontSize: 13,
    color: '#333',
  },
  timelineLeft: {
    width: 20,
    alignItems: 'center',
    position: 'relative',
  },

  verticalLine: {
    position: 'absolute',
    top: 20, // below the dot
    width: 2,
    right: 14,
    height: '100%',
    backgroundColor: '#2563EB',
  },
});
