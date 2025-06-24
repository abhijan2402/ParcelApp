import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

const {width, height} = Dimensions.get('window');

export const TransitHistoryModal = ({visible, onClose, historyData}) => {
  console.log(historyData, 'HISTORYYYYYY');

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Transit History</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.modalClose}>X</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.modalSubtitle}>All tracking history details</Text>

          <ScrollView style={{marginTop: 10}}>
            {historyData?.map((item, index) => {
              console.log(item, 'JJJJ');

              const scan = item?.ScanDetail || item; // handle both full list and filtered list
              return (
                <View key={index} style={styles.timelineRow}>
                  <View style={styles.verticalLine} />
                  <View style={styles.dotContainer}>
                    <View style={styles.timelineDot} />
                  </View>
                  <View style={{marginLeft: 10, flex: 1}}>
                    <Text style={styles.timelineDate}>
                      {new Date(scan?.ScanDateTime).toLocaleString()}
                    </Text>
                    <Text style={styles.timelineDesc}>
                      {scan?.Instructions || scan?.Scan}{' '}
                      {scan?.ScannedLocation
                        ? `at ${scan.ScannedLocation}`
                        : ''}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: width * 0.9,
    height: height * 0.7,
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
    marginVertical: 16,
    position: 'relative',
  },
  verticalLine: {
    position: 'absolute',
    top: 0,
    left: 5,
    bottom: 0,
    width: 2,
    backgroundColor: '#2563EB',
  },
  dotContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    marginLeft: 10,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2563EB',
  },
  timelineDate: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  timelineDesc: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
