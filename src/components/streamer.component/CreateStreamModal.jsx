import React ,{useContext,useState} from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { setCreateStreamModal } from "../../redux/modal.slice";
import { setStreamKey } from "../../api/streamer.api";
import { SocketContext } from "../../context/SocketContext";
import { useMutation } from "react-query";
var randomstring = require("randomstring");

const CreateStreamModal = ({streamerID}) => {
  const [key] = useState(randomstring.generate());
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  const { mutate } = useMutation(
    (data) => setStreamKey(data),
    {
      retry: 3,
      onSuccess: (res) => {
        dispatch(setCreateStreamModal(false));
        socket.emit("streamer-streaming", {
          streamer_id: streamerID,
          streaming_id: key,
        });
      },
    }
  );

 

  return ReactDOM.createPortal(
    <>
      <div
        className="popup-body"
        onClick={() => dispatch(setCreateStreamModal(false))}
      >
        <div className="popup-container" onClick={(e) => e.stopPropagation()}>
          <div className="popup-header">
            <p>Create Stream</p>
          </div>
          <div className="streaming-key">
            <h5>Streaming Key</h5>
            <p>
              <span>{key}</span>
            </p>
          </div>
          <div className="instructions">
            <h5>How to Stream</h5>
            <p>
              {
                "You can use <OBS to Live stream. go to settings > Stream and select Custom from service dropdown. Enter rtmp://localhost/live in the server input field. Also, add your stream key. Click apply to save"
              }
            </p>
          </div>

          <button className="popup-ok-button" onClick={() => mutate({streamerID: streamerID, streamKey: key})}>
            OK
          </button>
        </div>
      </div>
    </>,
    document.querySelector("#streamer-page")
  );
};

export default CreateStreamModal;
