import { Component } from 'react';
import ReactDOM from 'react-dom';

class Portal extends Component {
	node = document.createElement('div');

	componentDidMount() {
		this.externalWindow = window.open('', '', 'width=600,height=400,left=200,top=200');
		this.externalWindow.onbeforeunload = this.props.onClose;
    this.externalWindow.document.body.appendChild(this.node);
	}
	componentWillUnmount() {
		this.externalWindow.close();
	}
	render() {
		return ReactDOM.createPortal(
			this.props.children,
			this.node,
		);
	}
}

export default Portal;
