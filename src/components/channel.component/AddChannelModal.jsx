import React, { useState } from "react";
import ReactDOM from "react-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useDispatch } from "react-redux";
import { setAddChannelModal } from "../../redux/modal.slice";
import { useMutation } from "react-query";
import { addChannel } from "../../api/channel.api";
import { useQueryClient } from "react-query";
import Loader from "react-loader-spinner";

const AddChannel = (props) => {
  const [channelType, setChannelType] = useState("");
  const [channelName, setChannelName] = useState("");

  //console.log(props.roomID);

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation((data) => addChannel(data), {
    retry: 3,
    onSuccess: (res) => {
      queryClient.invalidateQueries(["server", props.serverID]);
      dispatch(setAddChannelModal(false));
    },
  });

  //console.log(error?.response?.data);

  const submitAddChannel = (e) => {
    e.preventDefault();
    mutate({
      serverID: props.serverID,
      roomID: props.roomID,
      channelName: channelName,
      channelType: channelType,
    });
  };

  return ReactDOM.createPortal(
    <>
      <div className="add-channel-body" onClick={() => props.visibility(false)}>
        <div
          className="add-channel-container"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="add-channel-header">
            <p className="main-p">Create Channel</p>
            <p className="secondary-p">in {props.roomName} Room</p>
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
                onChange={(e) => setChannelType(e.target.value)}
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
              <span className="error">
                {error && error.response.data.error.channel_type}
              </span>
            </FormControl>
          </div>
          <div className="channel-name-input">
            <label id="channel-name-label" htmlFor="channel-name">
              Channel Name
            </label>
            <input
              id="add-channel-name"
              type="text"
              placeholder="#new-channel"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
            <span className="error">
              {error && error.response.data.error.channel_name}
            </span>
          </div>
          <div className="footer">
            <button
              id="add-channel-cancel-button"
              onClick={() => props.visibility(false)}
            >
              Cancel
            </button>
            <button
              onClick={(e) => submitAddChannel(e)}
              id="create-channel-button"
            >
              {isLoading ? (
                <Loader
                  type="ThreeDots"
                  color="#00BFFF"
                  height={5}
                  width={20}
                  timeout={3000} //3 secs
                />
              ) : (
                "Create Channel"
              )}
            </button>
          </div>
        </div>
      </div>
    </>,
    document.querySelector("#server")
  );
};

export default AddChannel;
