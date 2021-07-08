import firebase from "firebase";
import axios from "axios";

export default uploadAudio() => {
    let storageRef = firebase.storage().ref("audio/ep1.mp3")
    storageRef.put()
}

export default axios.create({
    baseURL:"https://www.googleapis.com/youtube/v3/search",
    params: {
        key: "AIzaSyAY7MIvOoO4SV8it9MMJ2BjTNd7rrfCK8c"
    }
})
