import { firebase } from "@react-native-firebase/auth"

export const fileToBlob = async (path) => {
  const file = await fetch(path)
  const blob = await file.blob()
  return blob
}


export const getCurrentUser = () => {
  return firebase.auth().currentUser
}