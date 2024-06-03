import Toast, {ToastShowParams, ToastType} from 'react-native-toast-message';
// // App.jsx
// import {BaseToast, ErrorToast} from 'react-native-toast-message';
// import {View, Text} from 'react-native';

// /*
//   1. Create the config
// */
// export const ToastConfig = {
//   /*
//     Overwrite 'success' type,
//     by modifying the existing `BaseToast` component
//   */
//   success: (props: any) => (
//     <BaseToast
//       {...props}
//       contentContainerStyle={{paddingHorizontal: 15}}
//       text1Style={{
//         fontSize: 15,
//         fontWeight: '400',
//       }}
//     />
//   ),
//   /*
//     Overwrite 'error' type,
//     by modifying the existing `ErrorToast` component
//   */
//   error: (props: any) => (
//     <ErrorToast
//       {...props}
//       text1Style={{
//         fontSize: 17,
//       }}
//       text2Style={{
//         fontSize: 15,
//       }}
//     />
//   ),
//   /*
//     Or create a completely new type - `tomatoToast`,
//     building the layout from scratch.

//     I can consume any custom `props` I want.
//     They will be passed when calling the `show` method (see below)
//   */
//   tomatoToast: ({text1, props}: any) => (
//     <View
//       style={{
//         height: 60,
//         width: 200,
//         backgroundColor: 'red',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <Text>{text1}</Text>
//       <Text>{props.uuid}</Text>
//     </View>
//   ),
// };

const defaultConfig = {
  autoHide: true,
  visibilityTime: 5000,
  swipeable: false,
};

export const ToastConfig = {
  show: ({type, message}: {type: ToastType; message: string}) => {
    Toast.show({
      type,
      text1: message || 'Something wrong, try again',
      ...defaultConfig,
    });
  },
};
