import Toast from 'react-native-toast-message';

export const displayErrorToast = (errorMessage) => {
  Toast.show({
    position: 'bottom',
    text1: 'Error',
    text2: errorMessage,
    type: 'error',
    visibilityTime: 3000, // 3 seconds
  });
};
