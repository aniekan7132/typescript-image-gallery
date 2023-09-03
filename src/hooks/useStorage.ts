import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../firebase/config";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "./useAuth";

//uuidv4();

const useStorage = () => {
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();
  console.log(user);

  const startUpload = (file: File) => {
    if (!file) {
      return;
    }

    const fileId = uuidv4();
    const formatFile = file.type.split("/")[1];
    console.log(formatFile);

    const storageRef = ref(storage, `images/${fileId}.${formatFile}`);
    // this will look - images/123445667/jpeg or png
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        setError(error);
      },
      async () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setProgress(progress);
        console.log("File available at", downloadURL);

        // store data into firestore
        await addDoc(collection(db, "images"), {
          imageUrl: downloadURL,
          createdAt: new Date(),
          userEmail: user?.email,
        });
      }
    );
  };

  return {
    progress,
    error,
    startUpload,
  };
};

export default useStorage;
