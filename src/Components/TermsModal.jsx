import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';

const CHECKED_IMAGE = 'https://cdn-icons-png.flaticon.com/128/9918/9918686.png';
const UNCHECKED_IMAGE =
  'https://cdn-icons-png.flaticon.com/128/8924/8924271.png';

const TermsModal = ({visible, onAccept, onClose}) => {
  const [checked, setChecked] = useState(false);

  const toggleCheckbox = () => {
    setChecked(prev => !prev);
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Terms and Conditions</Text>

          <View style={styles.contentContainer}>
            <Text style={styles.termsText}>
              Please read and accept our Terms and Conditions to proceed with
              using the app. By accepting, you agree to all policies and
              guidelines set forth.
            </Text>

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={toggleCheckbox}>
              <Image
                source={{uri: checked ? CHECKED_IMAGE : UNCHECKED_IMAGE}}
                style={styles.checkboxImage}
              />
              <Text style={styles.checkboxLabel}>
                I accept the Terms and Conditions
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonsContainer}>
            <Pressable
              onPress={onClose}
              style={[styles.button, styles.cancelButton]}
              android_ripple={{color: '#ddd'}}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                if (checked) onAccept();
              }}
              disabled={!checked}
              style={[
                styles.button,
                checked ? styles.acceptButton : styles.acceptButtonDisabled,
              ]}
              android_ripple={{color: checked ? '#ccc' : 'transparent'}}>
              <Text style={styles.acceptButtonText}>Accept</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TermsModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  contentContainer: {
    marginBottom: 20,
  },
  termsText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 20,
    lineHeight: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxImage: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  acceptButton: {
    backgroundColor: '#007BFF',
  },
  acceptButtonDisabled: {
    backgroundColor: '#99cfff',
  },
  acceptButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
