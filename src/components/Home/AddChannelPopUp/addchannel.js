import React from "react";
import ReactDOM from "react-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const AddChannel = (props) => {
  const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  
  const hidePopUp = () => {
    props.popUp(false);
  }

  return ReactDOM.createPortal(
    <>
      <div className="add-channel-body" onClick={() => hidePopUp()}>
        <div className="add-channel-container" onClick={(e) => e.stopPropagation()}>
          <div className="header">
            <p className="main-p">Create Channel</p>
            <p className="secondary-p">in General Room</p>
          </div>
          <div className="channel-type-input">
            <FormControl component="fieldset">
              <FormLabel component="legend" id="form-label">
                CHANNEL TYPE
              </FormLabel>
              <RadioGroup
                aria-label="gender"
                name="channel-type"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Text Channel"
                  control={<Radio />}
                  label="Text Channel"
                  className="channel-radio-button"
                />
                <FormControlLabel
                  value="Voice Channel"
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
            <input id="channel-name" type="text" placeholder="#new-channel" />
          </div>
          <div className="footer">
            <button id="add-channel-cancel-button" onClick={() => hidePopUp()}>Cancel</button>
            <button id="create-channel-button">Create Channel</button>
          </div>
        </div>
      </div>
    </>,
    document.querySelector("#home")
  );
};

export default AddChannel;
