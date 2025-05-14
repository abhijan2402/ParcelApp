import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../Components/FeedHeader';
import {windowHeight, windowWidth} from '../../Constants/Dimensions';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';
import ImagePicker from 'react-native-image-crop-picker';
import {useApi} from '../../Backend/Api';

const AddFeed = ({navigation}) => {
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const {postRequest} = useApi();

  const handleImagePick = async () => {
    try {
      const pickedImages = await ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
        maxFiles: 9,
      });

      // Format: crop-picker returns path, not uri
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

  const handlePost = async () => {
    const formData = new FormData();

    formData.append('description', description);

    // Only append if at least one image exists
    if (images?.length > 0) {
      images.forEach((img, index) => {
        formData.append('images', {
          uri: img.uri,
          type: img.type || 'image/jpeg',
          name: img.fileName || `photo_${index}.jpg`,
        });
      });
    }
    const response = await postRequest('/posts/create', formData, true);
    if (response.success) {
      Alert.alert(response.data?.message);
      navigation.goBack();
    } else {
      console.error('Failed to create post:', response.error);
    }
  };

  return (
    <View style={styles.MainView}>
      <Header
        title={'Post your ideas'}
        showBack={true}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Write your ideas..."
          multiline
          placeholderTextColor={COLOR.grey}
          value={description}
          onChangeText={setDescription}
        />
        <View style={styles.imagePreview}>
          <TouchableOpacity
            onPress={handleImagePick}
            style={{
              width: 70,
              height: 70,
              backgroundColor: COLOR.lightGrey,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
            }}>
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
        onPress={() => {
          handlePost();
        }}
        style={{marginBottom: 15}}
      />
    </View>
  );
};

export default AddFeed;

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
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    minHeight: 150,
    textAlignVertical: 'top',
    marginBottom: 16,
    maxHeight: 150,
  },
  imageButton: {
    backgroundColor: COLOR.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  imageButtonText: {
    // color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  imagePreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  imageThumb: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  postButton: {
    backgroundColor: COLOR.secondary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
