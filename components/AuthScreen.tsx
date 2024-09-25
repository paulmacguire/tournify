import React, { useState } from "react";
import { app } from "../firebase-config";
import { View, TextInput, Button, Text, Pressable } from "react-native";
import { Link } from "expo-router";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  //   const registerUser = async () => {
  //     try {
  //       //   const userCredential = await app
  //       //     .auth()
  //       //     .createUserWithEmailAndPassword(email, password);
  //       //   setUser(userCredential.user);
  //     } catch (error) {
  //       //   console.log(error.message);
  //     }
  //   };

  //   const loginUser = async () => {
  //     try {
  //       const userCredential = await firebase
  //         .auth()
  //         .signInWithEmailAndPassword(email, password);
  //       setUser(userCredential.user);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };

  //   const logoutUser = async () => {
  //     try {
  //       await firebase.auth().signOut();
  //       setUser(null);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* <Link asChild href={"/"}>
        <Pressable>
          <Button title="Register" onPress={() => console.log("registrado")} />
        </Pressable>
      </Link> */}
      <Link asChild href={"/"}>
        <Pressable>Logeado</Pressable>
      </Link>
    </View>
  );
}
