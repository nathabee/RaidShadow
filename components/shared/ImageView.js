import React from 'react';
import Images from '../../assets/champion/Index';
import { StyleSheet, Image } from 'react-native';

const ImageView = ({ codeimage, size }) => {
  return (
    <Image
      source={Images[codeimage]}
      style={[styles.image, { width: size, height: size }]}
      defaultSource={require('../../assets/icon.jpeg')} // Specify the default image here
    />
  );
};

export default ImageView;

const styles = StyleSheet.create({
  championImage: {
    flex: 1,
  },
  image: {
    borderRadius: 10,
  },
});
