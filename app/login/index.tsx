import LoginContainer from "@/features/auth/containers/LoginContainer";
import { useNavigation } from "expo-router";
import { useEffect } from "react";

export default function SignInScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  
  return <LoginContainer />
}