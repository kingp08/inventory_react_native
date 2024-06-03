import { useState } from "react";
import { Animated, Dimensions } from "react-native";
import BootSplash from "react-native-bootsplash";

type Props = {
  onAnimationEnd: () => void;
};

export const AnimatedBootSplash = (
  { onAnimationEnd }: Props
) => {
  const [opacity] = useState(() => new Animated.Value(1));
  const [translateY] = useState(() => new Animated.Value(0));

  const { container, logo /*, brand */ } = BootSplash.useHideAnimation({
    manifest: require("../assets/bootsplash_manifest.json"),
    logo: require("../assets/bootsplash_logo.png"),
    // darkLogo: require("../assets/bootsplash_dark_logo.png"),
    // brand: require("../assets/bootsplash_brand.png"),
    // darkBrand: require("../assets/bootsplash_dark_brand.png"),

    statusBarTranslucent: true,
    navigationBarTranslucent: false,

    animate: () => {
      const { height } = Dimensions.get("window");

      Animated.loop(Animated.stagger(800, [
        Animated.spring(translateY, {
          useNativeDriver: true,
          speed: 0.2,
          toValue: -50,
        }),
        Animated.spring(translateY, {
          useNativeDriver: true,
          speed: 0.2,
          toValue: 0,
        }),
      ])).start();

      Animated.loop(
        Animated.timing(opacity, {
        useNativeDriver: true,
        toValue: 0,
        duration: 1000,
        delay: 1500,  
      })).start(() => {
        onAnimationEnd();
      });
    },
  });

  return (
    <Animated.View {...container} style={[container.style, { opacity }]}>
      <Animated.Image
        {...logo}
        style={[logo.style, { transform: [{ translateY }] }]}
      />

      {/* <Animated.Image {...brand} style={[brand.style, { opacity }]} /> */}
    </Animated.View>
  );
};
