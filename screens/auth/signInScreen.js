import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ToastAndroid
} from "react-native";
import React, { useState } from "react";
import { Colors, Fonts, Default } from "../../constants/style";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useTranslation } from "react-i18next";
import Loader from "../../components/loader";
import { getAuth, signInWithEmailAndPassword, OAuthProvider, signInWithPopup, GoogleAuthProvider, signInWithCredential, updateProfile  } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import {IOS_STANDALONE_APP_CLIENT_ID, ANDROID_STANDALONE_APP_CLIENT_ID} from "@env";

WebBrowser.maybeCompleteAuthSession();
const { width } = Dimensions.get("window");




const SignInScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`signInScreen:${key}`);
  }
  const [visible, setVisible] = useState(false);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: '484962252809-ngg4cdug2r66976bono7qbg5kee9gril.apps.googleusercontent.com',
      // expoClientId: '484962252809-ngg4cdug2r66976bono7qbg5kee9gril.apps.googleusercontent.com',
      // iosClientId: '484962252809-9c778gm74lsg60trfkiv65jdie1bqdvl.apps.googleusercontent.com',
      // androidClientId: '484962252809-ljkroeh9vcl7gg4l1ec61lbsvhmct26t.apps.googleusercontent.com',
      // webClientId: '484962252809-ngg4cdug2r66976bono7qbg5kee9gril.apps.googleusercontent.com',
    },
  );
  const [googleMesage, setGoogleMessage] = useState(false);
  const [googleAccessToken, setGoogleAccessToken] = React.useState();
  React.useEffect(() => {
    // setGoogleMessage(JSON.stringify(response))
    
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      console.log(credential, "CREDENTIAL");
      signInWithCredential(auth, credential).then(async()=>{
          let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: { Authorization: `Bearer ${accessToken}`}
          });
          userInfoResponse.json().then(data => {
            
            const auth1 = getAuth();
            updateProfile(auth1.currentUser, {
              displayName: data.name, photoURL: data.picture
            }).then(() => {
              // Profile updated!
              setVisible(false);
              ToastAndroid.show('Thank you!', ToastAndroid.SHORT);
              // ...
            }).catch((error) => {

              setVisible(false);
              ToastAndroid.show('Error in update profile!', ToastAndroid.SHORT);
            });
          });
      }).catch((error) => {
        ToastAndroid.show('Error.', ToastAndroid.SHORT);
        setVisible(false);
     });
    }
    else{
      setVisible(false);
    }
    
  }, [response]);
  const handleLogin = () => {
    if(textEmail == null || textEmail == ''){
      ToastAndroid.show('Enter your email address.', ToastAndroid.SHORT);
      return;
    }
    if(textPassword == null || textPassword == ''){
      ToastAndroid.show('Enter your password.', ToastAndroid.SHORT);
      return;
    }
    const auth = getAuth();
    setVisible(true);
    try {
        signInWithEmailAndPassword(auth, textEmail, textPassword).then((userCredential) => {
          setVisible(false);
          ToastAndroid.show('Enter your password.', ToastAndroid.SHORT);
       }).catch((error) => {
          ToastAndroid.show('Invalid email or password.', ToastAndroid.SHORT);
          setVisible(false);
       });
    } catch (error) {
      setVisible(false);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };
  const handleSignup = () => {
    props.navigation.navigate("signUpScreen");
  };
  const googleLogin = () =>{
    setVisible(true);
    promptAsync({useProxy: true ,projectNameForProxy: '@yaroslavd/rnmusic' })
    console.log("Hello world")
  }
  const [textNo, onChangeTextNo] = useState();
  const [textEmail, onChangeTextEmail] = useState();
  const [textPassword, onChangeTextPassword] = useState();
  return (
    
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={Colors.black}
        barStyle={Platform.OS === "android" ? "light-content" : "default"}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <ImageBackground
          source={require("../../assets/image/background.png")}
          style={{ flex: 1 }}
        >
          <View
            style={{
              marginHorizontal: Default.fixPadding * 1.5,
              marginTop: Default.fixPadding * 5,
            }}
          >
            <Text style={{ ...Fonts.ExtraBold24White }}>{tr("login")}</Text>
            <Text
              style={{
                ...Fonts.SemiBold14LightGrey,
                marginTop: Default.fixPadding,
                marginBottom: Default.fixPadding * 3,
              }}
            >
              {tr("hello")}
            </Text>

            <View
              style={{
                ...Default.shadow,
                borderRadius: 10,
                backgroundColor: Colors.lightBlack,
                padding: Default.fixPadding * 1.5,
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="mail-outline"
                color={Colors.white}
                size={20}
                style={{ flex: 0.7 }}
              />
              <TextInput
                placeholder={tr("enterEmail")}
                placeholderTextColor={Colors.white}
                onChangeText={onChangeTextEmail}
                selectionColor={Colors.primary}
                value={textEmail}
                keyboardType={"email-address"}
                style={{
                  ...Fonts.Medium15White,
                  flex: 9.3,
                  textAlign: isRtl ? "right" : "left",
                  marginHorizontal: Default.fixPadding * 0.5,
                }}
              />
            </View>
            <View
              style={{
                ...Default.shadow,
                borderRadius: 10,
                backgroundColor: Colors.lightBlack,
                padding: Default.fixPadding * 1.5,
                marginTop: Default.fixPadding * 1.5,
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="ios-key-outline"
                color={Colors.white}
                size={20}
                style={{ flex: 0.7 }}
              />
              <TextInput
                placeholder={tr("enterPassword")}
                placeholderTextColor={Colors.white}
                onChangeText={onChangeTextPassword}
                selectionColor={Colors.primary}
                value={textPassword}
                secureTextEntry = {true}
                keyboardType={"number-pad"}
                style={{
                  ...Fonts.Medium15White,
                  flex: 9.3,
                  textAlign: isRtl ? "right" : "left",
                  marginHorizontal: Default.fixPadding * 0.5,
                }}
              />
            </View>
           

            <Text
              style={{
                ...Fonts.SemiBold14LightGrey,
                textAlign: "center",
                marginVertical: Default.fixPadding * 3,
              }}
            >
              {tr("or")}
            </Text>

            <TouchableOpacity
                style={{
                  ...Default.shadow,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: Colors.lightBlack,
                  paddingVertical: Default.fixPadding * 1.5,
                  borderRadius: 10,
                }}
              >
                <FontAwesome
                  name="facebook-f"
                  size={20}
                  color={Colors.white}
                  style={{ marginHorizontal: Default.fixPadding }}
                >
                
                </FontAwesome>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...Default.shadow,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: Colors.lightBlack,
                  paddingVertical: Default.fixPadding * 1.5,
                  marginTop: Default.fixPadding * 1.5,
                  borderRadius: 10,
                }}
                onPress = {googleLogin}
              >
                <Ionicons
                  name="logo-google"
                  size={20}
                  color={Colors.white}
                  style={{ marginHorizontal: Default.fixPadding }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...Default.shadow,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: Colors.lightBlack,
                  paddingVertical: Default.fixPadding * 1.5,
                  marginTop: Default.fixPadding * 1.5,
                  borderRadius: 10,
                }}
              >
                <Ionicons
                  name="ios-logo-apple"
                  size={20}
                  color={Colors.white}
                  style={{ marginHorizontal: Default.fixPadding }}
                />
              </TouchableOpacity>
            <Loader visible={visible} />

            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                justifyContent: "space-between",
                marginTop: Default.fixPadding * 1.5,
              }}>
                <TouchableOpacity
                onPress={handleLogin}
                style={{
                  ...Default.shadow,
                  backgroundColor: Colors.primary,
                  width: width / 2.5,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: Default.fixPadding * 1.5,
                  borderRadius: 10,
                  
                }}
              >
                <Text style={{ ...Fonts.ExtraBold20White }}>{tr("login")}</Text>
              </TouchableOpacity>
              <TouchableOpacity

                onPress={handleSignup}
                style={{
                  ...Default.shadow,
                  width: width / 2.5,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: Colors.lightRed,
                  paddingVertical: Default.fixPadding * 1.5,
                  borderRadius: 10,
                }}
              >
                <Text style={{ ...Fonts.ExtraBold20White }}>{tr("singup")}</Text>
              </TouchableOpacity>
            
            </View>
            
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;
