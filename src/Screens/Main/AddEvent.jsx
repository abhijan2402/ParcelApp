import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../Components/FeedHeader';
import {windowHeight, windowWidth} from '../../Constants/Dimensions';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';
import ImagePicker from 'react-native-image-crop-picker';
import Input from '../../Components/Input';
import DateTimePicker from '@react-native-community/datetimepicker'; // Install if not already

const AddEvent = ({navigation}) => {
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [invited, setInvited] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleImagePick = async () => {
    try {
      const pickedImages = await ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
        maxFiles: 9,
      });

      const formattedImages = pickedImages.map(img => ({
        uri: img.path,
        width: img.width,
        height: img.height,
        mime: img.mime,
      }));

      setImages(prev => [...prev, ...formattedImages]);
    } catch (error) {
      console.log('Image pick cancelled or failed:', error);
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString();
      setDate(formattedDate);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const hours = selectedTime.getHours();
      const minutes = selectedTime.getMinutes();
      const formattedTime = `${hours}:${
        minutes < 10 ? '0' + minutes : minutes
      }`;
      setTime(formattedTime);
    }
  };

  const handlePost = () => {
    console.log('Event Name:', eventName);
    console.log('Location:', location);
    console.log('Invited People:', invited);
    console.log('Date:', date);
    console.log('Time:', time);
    console.log('Description:', description);
    console.log('Images:', images);
  };

  return (
    <View style={styles.MainView}>
      <Header
        title={'Post your events'}
        showBack={true}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Input
          style={{width: windowWidth / 1.12}}
          placeholder="Enter Event Name"
          value={eventName}
          onChangeText={setEventName}
        />
        <Input
          style={{width: windowWidth / 1.12}}
          placeholder="Enter Event Location"
          value={location}
          onChangeText={setLocation}
        />
        <Input
          style={{width: windowWidth / 1.12}}
          placeholder="Number of People Invited"
          value={invited}
          onChangeText={setInvited}
          keyboardType="numeric"
        />

        {/* Date & Time Row */}
        <View style={styles.dateTimeRow}>
          <TouchableOpacity
            style={styles.dateTimePicker}
            onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateTimeText}>
              {date ? date : 'Select Date'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dateTimePicker}
            onPress={() => setShowTimePicker(true)}>
            <Text style={styles.dateTimeText}>
              {time ? time : 'Select Time'}
            </Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        {showTimePicker && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}

        <TextInput
          style={styles.textInput}
          placeholder="Event Description..."
          multiline
          placeholderTextColor={COLOR.grey}
          value={description}
          onChangeText={setDescription}
        />

        {/* Image Upload Section */}
        <View style={styles.imagePreview}>
          <TouchableOpacity
            onPress={handleImagePick}
            style={styles.imageAddButton}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/2997/2997933.png',
              }}
              style={{width: 25, height: 25}}
            />
          </TouchableOpacity>
          {images.map((img, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{uri: img.uri}} style={styles.imageThumb} />
              <TouchableOpacity
                style={styles.crossIcon}
                onPress={() => {
                  const newImages = images.filter((_, i) => i !== index);
                  setImages(newImages);
                }}>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828778.png',
                  }}
                  style={{width: 10, height: 10}}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <CustomButton
        title="Post"
        onPress={handlePost}
        style={{marginBottom: 15}}
      />
    </View>
  );
};

export default AddEvent;

const styles = StyleSheet.create({
  MainView: {
    backgroundColor: COLOR.white,
    height: windowHeight,
  },
  contentContainer: {
    padding: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLOR.grey,
    borderRadius: 10,
    padding: 10,
    minHeight: 150,
    textAlignVertical: 'top',
    marginBottom: 16,
    maxHeight: 150,
    marginHorizontal: 8,
    marginTop: 5,
    fontSize: 16,
  },
  dateTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginHorizontal: 8,
  },
  dateTimePicker: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLOR.grey,
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateTimeText: {
    color: COLOR.black,
    fontSize: 16,
  },
  imageButton: {
    backgroundColor: COLOR.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  imageButtonText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  imagePreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  imageAddButton: {
    width: 70,
    height: 70,
    backgroundColor: COLOR.lightGrey,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  imageThumb: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  imageContainer: {
    position: 'relative',
    width: 70,
    height: 70,
    marginRight: 10,
    marginBottom: 10,
  },
  crossIcon: {
    position: 'absolute',
    top: 4,
    right: 6,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 3,
    zIndex: 1,
  },
});
