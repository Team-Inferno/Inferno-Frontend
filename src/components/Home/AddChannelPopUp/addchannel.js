import React, { useState } from "react";
import ReactDOM from "react-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import axios from "axios";
import { useSelector } from "react-redux";

const AddChannel = (props) => {
  const [channelType, setChannelType] = useState("");
  const [channelName, setChannelName] = useState("");

  var serverID = useSelector((state) => {
    return state.serverReducer.currentServerID;
  });


  const submitAddChannel = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/server/new/channel",null, {
        params: {
          server_id: serverID,
          room_id: props.room._id,
          channel_name: channelName,
          channel_type: channelType,
        },
      })
      .then((res) => {
        if(!res.data.error){
          props.popUp(false);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return ReactDOM.createPortal(
    <>
      <div className="add-channel-body" onClick={() => props.popUp(false)}>
        <div
          className="add-channel-container"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="header">
            <p className="main-p">Create Channel</p>
            <p className="secondary-p">in {props.room.room_name} Room</p>
          </div>
          <div className="channel-type-input">
            <FormControl component="fieldset">
              <FormLabel component="legend" id="form-label">
                CHANNEL TYPE
              </FormLabel>
              <RadioGroup
                aria-label="gender"
                name="channel-type"
                value={channelType}
                onChange={e => setChannelType(e.target.value)}
              >
                <FormControlLabel
                  value="text"
                  control={<Radio />}
                  label="Text Channel"
                  className="channel-radio-button"
                />
                <FormControlLabel
                  value="voice"
                  control={<Radio />}
                  label="Voice Channel"
                  className="channel-radio-button"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="channel-name-input">
            <label id="channel-name-label" htmlFor="channel-name">
              Channel Name
            </label>
            <input
              id="channel-name"
              type="text"
              placeholder="#new-channel"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
          </div>
          <div className="footer">
            <button id="add-channel-cancel-button" onClick={() => props.popUp(false)}>
              Cancel
            </button>
            <button
              onClick={(e) => submitAddChannel(e)}
              id="create-channel-button"
            >
              Create Channel
            </button>
          </div>
        </div>
      </div>
    </>,
    document.querySelector("#home")
  );
};

export default AddChannel;
