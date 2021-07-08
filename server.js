const cron = require("node-cron");
const express = require("express");
const axios = require("axios");
const { exec } = require("child_process");

const app = express();

let hosam = "helalhosam";

async function getChannel(username) {
    return await axios
        .get("https://www.googleapis.com/youtube/v3/channels", {
            params: {
                part: "snippet",
                forUsername: username,
                key: "AIzaSyAY7MIvOoO4SV8it9MMJ2BjTNd7rrfCK8c",
            },
        })
        .then((response) => {
            console.log("Fetching a channel");
            return response.data.items[0].id;
        })
        .catch((err) => {
            console.log(err.response);
        });
}

async function getChannelPlaylists(username) {
    return await getChannel(username)
        .then(async (id) => {
            console.log("Fetching all playlists from channel");
            return await axios.get(
                "https://www.googleapis.com/youtube/v3/playlists",
                {
                    params: {
                        part: "snippet",
                        channelId: id,
                        key: "AIzaSyAY7MIvOoO4SV8it9MMJ2BjTNd7rrfCK8c",
                    },
                }
            );
        })
        .then((response) => {
            // console.log(response.data);
            return response.data.items;
        })
        .catch((err) => {
            console.log(err.response);
        });
}

async function getQJPlaylist(username) {
    return getChannelPlaylists(username)
        .then(async (playlists) => {
            let qj = playlists.filter((p) => {
                if (p.snippet.title.includes("Quran Journey")) {
                    return p;
                }
            });
            console.log("Fetching videos from playlist");
            return Promise.all(
                qj.map(async (playlist) => {
                    return await axios
                        .get(
                            "https://www.googleapis.com/youtube/v3/playlistItems",
                            {
                                params: {
                                    part: "snippet",
                                    playlistId: playlist.id,
                                    key:
                                        "AIzaSyAY7MIvOoO4SV8it9MMJ2BjTNd7rrfCK8c",
                                    maxResults: 50,
                                },
                            }
                        )
                        .then((response) => {
                            return response.data.items.map((item) => {
                                if (
                                    item.snippet.resourceId.kind ==
                                    "youtube#video"
                                ) {
                                    return item.snippet.resourceId.videoId;
                                }
                            });
                        });
                })
            );
        })
        .catch((err) => {
            console.log(err);
        });
}

async function convertToAudio() {
    return await getQJPlaylist(hosam).then((res) => {
        let urls = res[0].map((vid) => {
            return "https://www.youtube.com/watch?v=" + vid;
        });
        // Somehow check to see if the videos have already been downloaded
        urls.forEach(async (url)=>{
            await exec(`youtube-dl --audio-format mp3 ${url}`)
        })
        return urls;
    });
}

// convertToAudio().then(res => console.log(res))

/** / Schedule tasks to be run on the server.
/ minute hour day month week
/
  
  * * * * * *
  | | | | | |
  | | | | | day of week
  | | | | month
  | | | day of month
  | | hour
  | minute
  second ( optional )
 
  i.e. 0 0 21 * * would run a job once every month

  */


// cron.schedule("* * * * *", function () {
//   console.log("running a task every minute");
// });

app.listen(3000);
