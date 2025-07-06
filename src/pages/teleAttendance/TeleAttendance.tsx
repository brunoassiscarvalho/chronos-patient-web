import { Grid, Skeleton } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Video, { Room, Participant } from 'twilio-video';
import Content from '../../components/organisms/Content';
import VideoPlayer from '../../components/organisms/VideoPalyer';
import TeleAttendanceService from './TeleAttendanceService';

const connectionOptions = (name: string) => {
  return {
    video: true,
    audio: true,
    name
  };
};

export default function TeleAttendance({ service = new TeleAttendanceService() }: any) {

  const videoRef = useRef<any>();

  const [isLoading, setIsloading] = useState<boolean>(true);

  const { appointmentId } = useParams<any>();
  const [videoToken, setVideoToken] = useState<string>();
  const [room, setRoom] = useState<Room>();
  const [participants, setParticipants] = useState<Array<Participant>>();

  const participantConnected = (participant: Participant) => {
    setParticipants((prevParticipants: Participant[] | undefined) => {
      if (prevParticipants) {
        return [...prevParticipants, participant];
      } else {
        return [participant];
      }
    });
  };

  const participantDisconnected = async (participant: Participant) => {
    setParticipants(function (prevParticipants): Participant[] | undefined {
      if (prevParticipants) {
        return prevParticipants.filter((p) => p !== participant);
      }
    }
    );

  };

  useEffect(() => {
    Video.createLocalVideoTrack().then((res) => {
      res.attach(videoRef.current);
    }).catch((err) => {
      console.log(err);
    });
  }, [appointmentId]);

  useEffect(() => {
    service.getAttendance(appointmentId).then((res: any) => {
      console.log({ token: res });
      setVideoToken(res);
    }).catch((error: any) => {
      console.log(error);
    }).finally(() => {
      setIsloading(false);
    });
  }, [appointmentId]);



  useEffect(() => {
    if (videoToken)
      Video.connect(videoToken, connectionOptions('teste')).then((room: Room) => {

        setRoom(room);
        room.on('participantConnected', participantConnected);
        room.on('participantDisconnected', participantDisconnected);
        room.on('disconnected', (room, error) => {
          if (error) {
            console.error(error);
          }
        });
        room.participants.forEach(participantConnected);
      });

  }, [videoToken]);



  return (
    <Content title="Tele atendimento" withoutGoBack>
      {isLoading ? (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" width={600} height={80} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" width={600} height={80} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" width={600} height={80} />
            </Grid>
          </Grid>
        </>
      ) : (
        <video ref={videoRef} />
        // <VideoPlayer token={videoToken} video={videoTracks} audio={audioTracks} key={identity} />

      )}
    </Content>
  );
}
