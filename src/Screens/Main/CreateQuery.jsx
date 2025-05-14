import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../Components/FeedHeader';
import {windowHeight} from '../../Constants/Dimensions';
import {COLOR} from '../../Constants/Colors';
import CustomButton from '../../Components/CustomButton';

const CreateQuery = ({navigation}) => {
  const [queryTitle, setQueryTitle] = useState('');
  const [queryDescription, setQueryDescription] = useState('');

  const handleSubmit = () => {
    // Handle form submission here (validation or API call)
    console.log('Query Raised:', queryTitle, queryDescription);
    // Optionally clear form
    setQueryTitle('');
    setQueryDescription('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header showBack title={'Raise a Query'} />
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.label}>Query Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your query title"
          value={queryTitle}
          onChangeText={setQueryTitle}
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
});
