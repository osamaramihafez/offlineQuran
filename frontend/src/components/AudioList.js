import React from "react";
// import mp3_file from "../audio/ep1.mp3";
import mp3_file from "../audio/pl1.mkv";
import Card from "react-bootstrap/Card";

export default function AudioList() {
    return (
        <div>
            <Card className="audio-card">
                <label>Episode 1</label>
                <audio controls className="audio">
                    <source src={mp3_file} type="audio/mp3" />
                </audio>
            </Card>
        </div>
    );
}

/**
 * TODOs (for custom audio features):
 * - Implement go back x seconds feature
 * - Implement go ahead x seconds feature
 * - Implement take note at timestamp feature.
 */