import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  Alert,
  Platform,
} from 'react-native';
import Header from '../../Components/FeedHeader';
import CustomButton from '../../Components/CustomButton';
import {COLOR} from '../../Constants/Colors';
import {useApi} from '../../Backend/Apis';
import ImagePicker from 'react-native-image-crop-picker';

const Kyc = ({navigation}) => {
  const {postRequest} = useApi();

  const [selectedDoc, setSelectedDoc] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const dropdownHeight = useState(new Animated.Value(0))[0];

  const documentOptions = [
    'Aadhar Card',
    'PAN Card',
    'Driving License',
    'Passport',
  ];

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
    Animated.timing(dropdownHeight, {
      toValue: dropdownVisible ? 0 : 130,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const selectImage = async type => {
    try {
      const image = await ImagePicker.openPicker({
        width: 800,
        height: 800,
        cropping: true,
        compressImageQuality: 0.8,
        mediaType: 'photo',
      });

      const uri = Platform.OS === 'ios' ? image.sourceURL : image.path;

      if (type === 'front') {
        setFrontImage(uri);
      } else {
        setBackImage(uri);
      }
    } catch (error) {
      if (error?.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Error', 'Failed to select image');
        console.error(error);
      }
    }
  };

  const PostDocuments = async () => {
    if (!selectedDoc || !frontImage || !backImage) {
      Alert.alert(
        'Missing Fields',
        'Please select document type and upload both images.',
      );
      return;
    }

    const formData = new FormData();
    formData.append('document_type', selectedDoc);
    formData.append('document_front', {
      uri: frontImage,
      name: 'front.jpg',
      type: 'image/jpeg',
    });
    formData.append('document_back', {
      uri: backImage,
      name: 'back.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await postRequest(
        '/api/upload-documents',
        formData,
        true,
      );
      console.log(response, 'Upload Response');

      if (response?.success) {
        Alert.alert(
          'Success',
          'Documents uploaded successfully and under verification!',
        );
        navigation.goBack();
      } else {
        Alert.alert('Error', response?.error || 'Upload failed');
      }
    } catch (error) {
      console.log(error, 'ERRORRR');
      Alert.alert('Error', 'Something went wrong while uploading documents');
    }
  };

  return (
    <View style={styles.wrapper}>
      <Header title={'KYC Verification'} showBack />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          {/* Dropdown */}
          <Text style={styles.label}>Select Document Type</Text>
          <TouchableOpacity style={styles.dropdownBox} onPress={toggleDropdown}>
            <Text style={styles.dropdownText}>
              {selectedDoc || 'Choose Document'}
            </Text>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/2985/2985150.png',
              }}
              style={styles.icon}
            />
          </TouchableOpacity>

          <Animated.View
            style={[styles.dropdownList, {height: dropdownHeight}]}>
            {dropdownVisible &&
              documentOptions.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedDoc(item);
                    setDropdownVisible(false);
                    dropdownHeight.setValue(0);
                  }}>
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              ))}
          </Animated.View>

          {/* Upload Front Image */}
          <Text style={styles.label}>Upload Front Image</Text>
          <TouchableOpacity
            style={styles.imageUpload}
            onPress={() => selectImage('front')}>
            {frontImage ? (
              <Image source={{uri: frontImage}} style={styles.image} />
            ) : (
              <View style={styles.placeholder}>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/1375/1375106.png',
                  }}
                  style={styles.placeholderIcon}
                />
                <Text style={styles.uploadText}>Upload Front</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Upload Back Image */}
          <Text style={styles.label}>Upload Back Image</Text>
          <TouchableOpacity
            style={styles.imageUpload}
            onPress={() => selectImage('back')}>
            {backImage ? (
              <Image source={{uri: backImage}} style={styles.image} />
            ) : (
              <View style={styles.placeholder}>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/1375/1375106.png',
                  }}
                  style={styles.placeholderIcon}
                />
                <Text style={styles.uploadText}>Upload Back</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Submit Button */}
          <CustomButton
            title={'Submit KYC'}
            style={{marginTop: 20}}
            onPress={PostDocuments}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Kyc;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  scrollContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fafafa',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },
  dropdownBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    color: '#444',
    fontSize: 14,
  },
  icon: {
    width: 16,
    height: 16,
  },
  dropdownList: {
    overflow: 'hidden',
    borderRadius: 6,
    marginTop: 4,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  imageUpload: {
    height: 140,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  placeholder: {
    alignItems: 'center',
  },
  placeholderIcon: {
    width: 32,
    height: 32,
    tintColor: '#999',
  },
  uploadText: {
    color: '#888',
    fontSize: 13,
    marginTop: 6,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
