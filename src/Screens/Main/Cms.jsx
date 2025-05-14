import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import Header from '../../Components/FeedHeader';

const Cms = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {title} = route.params;

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        title={title}
        showBack
        onBackPress={() => {
          navigation.goBack();
        }}
      />

      {/* Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula,
          nibh eu facilisis pulvinar, nulla turpis fermentum purus, nec
          convallis nunc orci sit amet mauris. In vel gravida libero. Duis
          malesuada lacus non turpis facilisis, nec ultricies nibh viverra.
        </Text>

        <Text style={styles.paragraph}>
          Morbi eget nisi a justo iaculis tincidunt. Nullam rutrum elit sed
          lectus sagittis, a luctus lacus tincidunt. Pellentesque a rutrum
          ipsum. Sed condimentum, sapien sed blandit cursus, justo metus
          suscipit felis, sed lobortis libero eros nec urna.
        </Text>

        <Text style={styles.paragraph}>
          Aliquam erat volutpat. Curabitur nec felis dignissim, lacinia lorem
          vel, commodo libero. Sed at nisl in sapien commodo tincidunt vel a
          arcu. Vivamus non nunc sed lorem consequat gravida.
        </Text>
      </ScrollView>
    </View>
  );
};

export default Cms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    marginBottom: 15,
    textAlign: 'justify',
  },
});
