import React from 'react';
import './PinForm.scss';
import authData from '../../../helpers/data/authData';
import pinData from '../../../helpers/data/pinData';

class PinForm extends React.Component {
  state = {
    pinImageUrl: '',
    pinTitle: '',
  }

  componentDidMount() {
    const { pinId } = this.props.match.params;
    if (pinId) {
      pinData.getSinglePin(pinId)
        .then((request) => {
          const pin = request.data;
          this.setState({ pinTitle: pin.title, pinImageUrl: pin.imageUrl });
        })
        .catch((err) => console.error('error with get single pin', err));
    }
  }

  titleChange = (e) => {
    e.preventDefault();
    this.setState({ pinTitle: e.target.value });
  }

  imageChange = (e) => {
    e.preventDefault();
    this.setState({ pinImageUrl: e.target.value });
  }

  editPinEvent = (e) => {
    e.preventDefault();
    const { boardId, pinId } = this.props.match.params;
    const editPin = {
      title: this.state.pinTitle,
      imageUrl: this.state.pinImageUrl,
      uid: authData.getUid(),
      boardId,
    };
    pinData.editPin(pinId, editPin)
      .then(() => this.props.history.push(`/board/${boardId}`))
      .catch((err) => console.error('error from edit pin', err));
  }

  savePinEvent = (e) => {
    e.preventDefault();
    const { boardId } = this.props.match.params;
    const newPin = {
      title: this.state.pinTitle,
      imageUrl: this.state.pinImageUrl,
      uid: authData.getUid(),
      boardId,
    };
    pinData.savePin(newPin)
      .then(() => this.props.history.push(`/board/${boardId}`))
      .catch((err) => console.error('error from save pin', err));
  }

  render() {
    const { pinTitle, pinImageUrl } = this.state;
    const { pinId } = this.props.match.params;
    return (
      <form className="PinForm">
        <div className="form-group">
          <label htmlFor="pin-title">Pin Title</label>
          <input
            type="text"
            className="form-control"
            id="pin-title"
            placeholder="Enter pin title"
            value={pinTitle}
            onChange={this.titleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pinImgUrl">Pin Image URL</label>
          <input
            type="text"
            className="form-control"
            id="pinImgUrl"
            placeholder="Enter the pin's image URL"
            value={pinImageUrl}
            onChange={this.imageChange}
          />
        </div>
        { pinId
          ? <button className="btn btn-secondary" onClick={this.editPinEvent}>Edit Pin</button>
          : <button className="btn btn-secondary" onClick={this.savePinEvent}>Save Pin</button>
        }
      </form>
    );
  }
}

export default PinForm;
