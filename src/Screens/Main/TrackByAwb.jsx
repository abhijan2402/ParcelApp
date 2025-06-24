import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
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

const TrackByAwb = ({navigation}) => {
  const [selectedCarrier, setSelectedCarrier] = useState(null);
  const [awbNumber, setAwbNumber] = useState('');
  const [shipmentData, setShipmentData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedScanHistory, setSelectedScanHistory] = useState([]);

  const handleMoreInfo = scan => {
    console.log(scan, 'SCANNNN');
    const filteredData = shipmentData?.Scans?.filter(
      item => item?.ScanDetail?.Scan === scan,
    );
    console.log(filteredData, 'FILTERRR');

    setSelectedScanHistory(filteredData);
    // Pass full scan history to modal
    // setSelectedScanHistory([scan]);
    setModalVisible(true);
  };

  const handleViewFullHistory = () => {
    setSelectedScanHistory(scans);
    setModalVisible(true);
  };
  const trackShipment = async () => {
    if (!selectedCarrier || !awbNumber) {
      Alert.alert('Carrier or AWB number missing.');
      return;
    }

    const apiKey = 'c4093190ae6edab6fd33121e5c6ad56dcb67804e';

    // Only handling Delhivery for now; you can expand this for multiple carriers
    if (selectedCarrier === 'delhivery') {
      try {
        const url = `https://track.delhivery.com/api/v1/packages/json?waybill=${awbNumber}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Token ${apiKey}`,
            Accept: 'application/json',
          },
        });
        const datas = await response.json();
        if (!response.ok) {
          return;
        }
        const shipmentData = datas?.ShipmentData?.[0]?.Shipment;
        if (shipmentData) {
          setShipmentData(shipmentData);
          // You can update state or navigate here
        } else {
          setShipmentData(null);
          Alert.alert('No shipment data found for this AWB.');
        }
      } catch (error) {
        Alert.alert('No shipment data found for this AWB.');
        setShipmentData(null);
      }
    } else {
      setShipmentData(null);
    }
  };

  const ScanTimeline = ({scans}) => {
    const renderStatusTitle = scan => {
      switch (scan.Scan) {
        case 'Manifested':
          return 'Ready to Ship';
        case 'In Transit':
          return 'In Transit';
        case 'Dispatched':
          return 'Out for Delivery';
        case 'Delivered':
          return 'Delivered';
        default:
          return scan.Scan;
      }
    };

    // Pick only latest scan for main display
    const latestScan =
      scans.length > 0 ? scans[scans.length - 1].ScanDetail : null;

    const mainSteps = ['Manifested', 'In Transit', 'Dispatched', 'Delivered'];

    return (
      <View style={styles.timelineContainer}>
        {mainSteps.map((status, index) => {
          const scan = scans.find(item => item.ScanDetail.Scan === status);
          const isActive = latestScan && latestScan.Scan === status;
          console.log(scans, 'SCANNNNN');

          return (
            <View key={index} style={styles.timelineItem}>
              <View
                style={[
                  styles.circle,
                  isActive ? styles.circleActive : styles.circleInactive,
                ]}
              />
              <View style={styles.timelineContent}>
                <View style={styles.timelineHeader}>
                  <Text
                    style={[
                      styles.timelineTitle,
                      isActive && styles.activeTitle,
                    ]}>
                    {renderStatusTitle({Scan: status})}
                  </Text>
                  {isActive && (
                    <TouchableOpacity onPress={() => handleMoreInfo(status)}>
                      <Text style={styles.moreInfoButton}>View More</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {isActive && scan?.ScanDetail?.ScanDateTime && (
                  <>
                    <Text style={styles.timelineDate}>
                      {new Date(scan.ScanDetail.ScanDateTime).toLocaleString()}
                    </Text>
                    {scan.ScanDetail.ScannedLocation ? (
                      <Text style={styles.timelineLocation}>
                        {scan.ScanDetail.ScannedLocation}
                      </Text>
                    ) : null}
                    {scan.ScanDetail.Instructions ? (
                      <Text style={styles.timelineInstruction}>
                        {scan.ScanDetail.Instructions}
                      </Text>
                    ) : null}
                  </>
                )}
              </View>
            </View>
          );
        })}

        {/* View All History button */}
        {/* <TouchableOpacity
          onPress={handleViewFullHistory}
          style={styles.viewAllBtn}>
          <Text style={styles.viewAllText}>View Full History</Text>
        </TouchableOpacity> */}

        {/* Modal */}
        <TransitHistoryModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          historyData={selectedScanHistory}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        showBack
        onBackPress={() => {
          navigation.goBack();
        }}
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
        {shipmentData && (
          <View style={styles.dataBox}>
            <Text style={styles.heading}>Shipment Details</Text>

            <Text style={styles.label}>AWB No:</Text>
            <Text style={styles.value}>{shipmentData.AWB}</Text>

            {/* <Text style={styles.label}>Order Type:</Text>
            <Text style={styles.value}>{shipmentData.OrderType}</Text> */}

            <Text style={styles.label}>Pickup Date:</Text>
            <Text style={styles.value}>{shipmentData.PickedupDate}</Text>

            <Text style={styles.label}>Delivery Date:</Text>
            <Text style={styles.value}>{shipmentData.DeliveryDate}</Text>

            <Text style={styles.label}>Invoice Amount:</Text>
            <Text style={styles.value}>₹ {shipmentData.InvoiceAmount}</Text>

            {/* <Text style={styles.label}>Expected Delivery:</Text>
            <Text style={styles.value}>
              {shipmentData.ExpectedDeliveryDate}
            </Text>

            <Text style={styles.label}>Sender:</Text>
            <Text style={styles.value}>{shipmentData.SenderName}</Text> */}

            {/* <Text style={styles.label}>Consignee Name:</Text>
            <Text style={styles.value}>{shipmentData.Consignee?.Name}</Text>

            <Text style={styles.label}>State:</Text>
            <Text style={styles.value}>{shipmentData.Consignee?.State}</Text>

            <Text style={styles.label}>PinCode:</Text>
            <Text style={styles.value}>{shipmentData.Consignee?.PinCode}</Text>

            <Text style={styles.label}>Country:</Text>
            <Text style={styles.value}>{shipmentData.Consignee?.Country}</Text> */}

            {/* <Text style={styles.heading}>Current Status</Text>

            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>{shipmentData.Status?.Status}</Text> */}

            {/* <Text style={styles.label}>Status Location:</Text>
            <Text style={styles.value}>
              {shipmentData.Status?.StatusLocation}
            </Text>

            <Text style={styles.label}>Status Date:</Text>
            <Text style={styles.value}>
              {shipmentData.Status?.StatusDateTime}
            </Text>

            <Text style={styles.label}>Instructions:</Text>
            <Text style={styles.value}>
              {shipmentData.Status?.Instructions}
            </Text> */}
            {shipmentData?.Scans && shipmentData.Scans.length > 0 && (
              <>
                <Text style={styles.heading}>Shipment Timeline</Text>
                <ScanTimeline scans={shipmentData.Scans} />
              </>
            )}
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
    // flexDirection: 'row',
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
    backgroundColor: '#e6f4ea', // light green background for selected
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
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

  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#007bff',
  },
  timelineContainer: {
    marginTop: 10,
    paddingHorizontal: 5,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#007bff',
    marginRight: 10,
    marginTop: 5,
  },
  timelineContent: {
    flex: 1,
    backgroundColor: '#f1f3f5',
    borderRadius: 8,
    padding: 10,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#343a40',
  },
  timelineDate: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 4,
  },
  timelineLocation: {
    fontSize: 12,
    color: '#495057',
    marginTop: 2,
  },
  timelineInstruction: {
    fontSize: 12,
    color: '#adb5bd',
    marginTop: 2,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moreInfoButton: {
    fontSize: 13,
    color: '#2563EB',
    fontWeight: '500',
  },
  timelineContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#2563EB',
    backgroundColor: '#fff',
    marginRight: 16,
    marginTop: 4,
  },
  circleActive: {
    backgroundColor: '#2563EB',
  },
  circleInactive: {
    backgroundColor: '#fff',
  },
  timelineContent: {
    flex: 1,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  moreInfoButton: {
    fontSize: 14,
    color: '#2563EB',
  },
  timelineDate: {
    fontSize: 14,
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
  viewAllBtn: {
    alignSelf: 'center',
    marginTop: 10,
  },
  viewAllText: {
    fontSize: 15,
    color: '#2563EB',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: windowWidth * 0.9,
    height: windowHeight * 0.7,
    borderRadius: 12,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },
  modalClose: {
    fontSize: 18,
    color: '#999',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  timelineRow: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563EB',
    marginTop: 5,
  },
  timelineDesc: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  timelineContainer: {padding: 16},
  timelineItem: {flexDirection: 'row', marginBottom: 24},
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 16,
  },
  circleActive: {borderColor: '#2563EB', backgroundColor: '#2563EB'},
  circleInactive: {borderColor: '#ddd', backgroundColor: '#fff'},
  timelineContent: {flex: 1},
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timelineTitle: {fontSize: 16, fontWeight: '600', color: '#333'},
  activeTitle: {color: '#2563EB'},
  moreInfoButton: {fontSize: 14, color: '#2563EB'},
  timelineDate: {marginTop: 4, color: '#666', fontSize: 13},
  timelineLocation: {color: '#888', fontSize: 12, marginTop: 2},
  timelineInstruction: {color: '#888', fontSize: 12, marginTop: 2},
  viewAllBtn: {alignSelf: 'center', marginTop: 16},
  viewAllText: {fontSize: 14, color: '#2563EB', fontWeight: '500'},
});
