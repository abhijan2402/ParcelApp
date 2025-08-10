import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../Components/FeedHeader';
import {windowHeight, windowWidth} from '../../Constants/Dimensions';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';
import DropDownPicker from 'react-native-dropdown-picker';
import {useApi} from '../../Backend/Apis';

const CreateQuery = ({navigation}) => {
  const {postRequest} = useApi();

  const [queryDescription, setQueryDescription] = useState('');
  const [awbNumber, setAwbNumber] = useState('');
  const [queryTitle, setQueryTitle] = useState(null);
  const [customReason, setCustomReason] = useState('');

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownItems, setDropdownItems] = useState([
    {label: 'Shipment Delay', value: 'Shipment Delay'},
    {label: 'Damaged Package', value: 'Damaged Package'},
    {label: 'Wrong Delivery', value: 'Wrong Delivery'},
    {label: 'Other Issue', value: 'other'},
    {label: 'Custom', value: 'custom'},
  ]);

  const handleSubmit = async () => {
    if (!queryTitle || !awbNumber || !queryDescription) {
      Alert.alert('Validation', 'Please fill all required fields.');
      return;
    }

    const finalTitle =
      queryTitle === 'custom' ? customReason.trim() : queryTitle;

    if (queryTitle === 'custom' && finalTitle.length === 0) {
      Alert.alert('Validation', 'Please enter a custom reason.');
      return;
    }

    const data = {
      title: finalTitle,
      description: queryDescription,
      awb_number: awbNumber,
    };

    console.log('Submitting:', data);

    const response = await postRequest('/api/add-help-desk', data);

    if (response?.success) {
      Alert.alert('Success', 'Query submitted successfully.');

      setQueryTitle(null);
      setAwbNumber('');
      setQueryDescription('');
      setCustomReason('');
      navigation.goBack();
    } else {
      console.log(response, 'Submission Error');
      Alert.alert('Error', response?.error || 'Submission failed');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header
        showBack
        title={'Raise a Query'}
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.label}>Query Title</Text>
        <DropDownPicker
          open={dropdownOpen}
          value={queryTitle}
          items={dropdownItems}
          setOpen={setDropdownOpen}
          setValue={setQueryTitle}
          setItems={setDropdownItems}
          placeholder="Select Query Type*"
          style={styles.dropdownStyle}
          dropDownContainerStyle={styles.dropdownContainer}
          listItemContainerStyle={styles.listItemContainer}
          listItemLabelStyle={styles.listItemLabel}
          selectedItemLabelStyle={styles.selectedItemLabel}
          selectedItemContainerStyle={styles.selectedItemContainer}
        />

        {queryTitle === 'custom' && (
          <>
            <Text style={styles.label}>Custom Reason</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter custom reason"
              value={customReason}
              onChangeText={setCustomReason}
            />
          </>
        )}

        <Text style={styles.label}>AWB Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter AWB Number"
          value={awbNumber}
          onChangeText={setAwbNumber}
        />

        <Text style={styles.label}>Query Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter your query description"
          value={queryDescription}
          onChangeText={setQueryDescription}
          multiline
          numberOfLines={5}
        />

        <CustomButton
          title="Raise Query"
          onPress={handleSubmit}
          style={{marginTop: 20}}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateQuery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  formContainer: {
    padding: 16,
    marginHorizontal: 10,
    paddingBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  dropdownStyle: {
    width: windowWidth / 1.17,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  dropdownContainer: {
    width: windowWidth / 1.1,
    marginLeft: 10,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  listItemContainer: {
    paddingVertical: 0,
    borderBottomWidth: 0.8,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },
  listItemLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  selectedItemLabel: {
    color: '#2563EB',
    fontWeight: '700',
  },
  selectedItemContainer: {
    backgroundColor: '#f0f4ff',
  },
});
