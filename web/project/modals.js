import {render} from 'react-dom';

const Provider = class extends React.Component {

  componentDidMount () {
    if (this.props.type !== 'confirm') {
		window.closeModal = this.close;
	}
    $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this._closed);
    $(ReactDOM.findDOMNode(this)).on('shown.bs.modal', this._shown);
    $(ReactDOM.findDOMNode(this)).modal({ background: true, keyboard: true, show: true });
  }

  show () {
    $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.unmount);
    $(ReactDOM.findDOMNode(this)).modal('show');
    $(ReactDOM.findDOMNode(this)).style = "";
  }

  close = () => { //use when you wish to trigger closing manually
    $(ReactDOM.findDOMNode(this)).off('hidden.bs.modal', this._closed);
    $(ReactDOM.findDOMNode(this)).off('shown.bs.modal', this._shown);
    $(ReactDOM.findDOMNode(this)).modal('hide');
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(document.getElementById(this.props.type == 'confirm' ? 'confirm' : 'modal'));
      document.body.classList.remove('modal-open');
    }, 500);
  }

  _closed = ()=> {
    this.props.onClose && this.props.onClose();
    ReactDOM.unmountComponentAtNode(document.getElementById(this.props.type == 'confirm' ? 'confirm' : 'modal'));
    document.body.classList.remove('modal-open');
  }

  _shown () {
    this.isVisible = true;
  }

  render () {
    return this.props.children;
  }
};

Provider.propTypes = {
  children: RequiredElement,
  onClose: OptionalFunc
};

const Modal = class extends React.Component {
  header () {
    return this.props.header || '';
  }

  body () {
    return this.props.body || '';
  }

  footer () {
    return this.props.footer || '';
  }

  render () {

    return (
      <Provider ref="modal">
        <div tabIndex="-1" className="modal alert fade expand" role="dialog" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">{this.header()}</div>
              <div className="modal-body">{this.body()}</div>
              <div className="modal-footer">{this.footer()}</div>
            </div>
          </div>
        </div>
      </Provider>
    );
  }
};

Modal.propTypes = {
  header: OptionalNode,
  body: OptionalNode,
  footer: OptionalNode
};

const Confirm = class extends React.Component {
  header () {
    return this.props.header || '';
  }

  body () {
    return this.props.body || '';
  }

  onNo = ()=> {
    this.props.onNo && this.props.onNo();
    this.refs.modal.close();
  }

  onYes = ()=> {
    this.props.onYes && this.props.onYes();
    this.refs.modal.close();
  }

  closed () {
    this.onNo();
  }

  footer () {
    return (
      <div className="modal-button">
        <button type="button" className="btn-link btn-link-secondary"
                onClick={this.onNo}>{this.props.noText || 'No'}</button>
        <button type="button" className="btn-link"
                onClick={this.onYes}>{this.props.yesText || 'Yes'}</button>
      </div>
    );
  }

  render () {
    return (
      <Provider onClose={this.props.onNo} ref="modal" type="confirm">
        <div tabIndex="-1" className="modal alert fade expand" role="dialog" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">{this.header()}</div>
              <div className="modal-body">{this.body()}</div>
              <div className="modal-footer">{this.footer()}</div>
            </div>
          </div>
        </div>
      </Provider>
    );
  }
};

Confirm.propTypes = {
  header: OptionalNode,
  body: OptionalNode,
  onYes: OptionalFunc,
  onNo: OptionalFunc,
  yesText: OptionalString,
  noText: OptionalString,
};

exports.openModal = (header, body, footer) => {
  render(<Modal header={header} footer={footer} body={body}/>, document.getElementById('modal'));
};

exports.openConfirm = (header, body, onYes, onNo) => {
  render(<Confirm header={header} onYes={onYes} onNo={onNo} body={body}/>, document.getElementById('confirm'));
};
