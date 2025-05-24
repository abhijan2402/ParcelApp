import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import Header from '../../Components/FeedHeader';
import {windowWidth} from '../../Constants/Dimensions';
import {COLOR} from '../../Constants/Colors';

const About = () => {
  return (
    <View style={styles.container}>
      <Header title={'About us'} showBack />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Company Info Card */}
        <View style={styles.companyCard}>
          {/* Logo */}
          <Image
            source={require('../../assets/Images/Logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          {/* Company Intro */}
          <View style={styles.companyTextContainer}>
            <Text style={styles.title}>Who We Are</Text>
            <Text style={styles.description}>
              We are a leading provider of innovative digital solutions,
              delivering exceptional products and services to businesses
              worldwide. Our mission is to transform ideas into powerful tools
              that drive success and efficiency.
            </Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Vision Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Vision</Text>
          <Text style={styles.sectionText}>
            To empower businesses through scalable and sustainable technologies,
            ensuring growth and excellence at every step.
          </Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Mission Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.sectionText}>
            We aim to deliver user-focused solutions, maintain top-notch quality
            standards, and ensure client satisfaction through every project we
            undertake.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLOR.white,
  },
  companyCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    // marginHorizontal: 20,
    backgroundColor: COLOR.white,
  },
  logo: {
    width: windowWidth * 0.5,
    height: windowWidth * 0.4,
    borderRadius: 12,
    marginBottom: 16,
  },
  companyTextContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#333333',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    color: '#555',
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 24,
  },
  section: {
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#222',
  },
  sectionText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});
