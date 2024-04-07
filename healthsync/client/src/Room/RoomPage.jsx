import React, { useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const RoomPage = () => {
    const { roomID } = useParams();
    const elementRef = useRef(null);

    useEffect(() => {
        const myMeeting = async () => {
            const appID = '39157865';
            const serverSecret = '00bc0d0f86cb99e0da0f9a730bc5714d';
            const kitToken = await ZegoUIKitPrebuilt.generateToken(appID, serverSecret, roomID, Date.now(), "Instructor");

            const zc = ZegoUIKitPrebuilt.create(kitToken);
            zc.joinRoom({
                container: elementRef.current,
                sharedLinks:[
                    {
                        name: 'Copy link',
                        url: 'http://localhost:8000/room/${roomID}'
                    }
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall,
                },
            });
        };

        if (roomID && elementRef.current) {
            myMeeting();
        }
    }, [roomID]); // Depend on `roomID` to re-run this effect if `roomID` changes

    return <div ref={elementRef}></div>;
}

export default RoomPage;
