import React from 'react';
import ReactDOM from 'react-dom';


import { Alert } from 'reactstrap';

let root = document.getElementById('alerts');

export default class Notify{

    static success(msg){
        let container = document.createElement('div');
        let element = (<Alert  color="success" isOpen={true} toggle={  function(e){e.target.parentNode.parentNode.remove() } }>
            {msg}
        </Alert>);
        root.appendChild(container);
        ReactDOM.render(element, container);
    }

    static error(msg){
        let container = document.createElement('div');
        let element = (<Alert  color="danger" isOpen={true} toggle={  function(e){e.target.parentNode.parentNode.remove() } }>
            {msg}
        </Alert>);
        root.appendChild(container);
        ReactDOM.render(element, container);
    }

    static warning(msg){
        let container = document.createElement('div');
        let element = (<Alert  color="warning" isOpen={true} toggle={  function(e){e.target.parentNode.parentNode.remove() } }>
            {msg}
        </Alert>);
        root.appendChild(container);
        ReactDOM.render(element, container);
    }

}
