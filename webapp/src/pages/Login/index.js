import React, {Component} from 'react';


import "./index.css";

import notify from '../../notify';


class Login extends Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            logged: false,
            login: "",
            senha: ""
        }
    }



    handleClick(e){
        if(this.state.login == "admin" && this.state.senha == "admin"){
            localStorage.setItem('token', new Date());
            this.props.history.push('/');
            return;
        }
        notify.warning('Login ou Senha errados');
    }

    componentWillMount(){
        let that = this;
        window.intervalidLogin = setInterval(()=>{
            let token = localStorage.getItem('token');
            if(token){
                that.setState({
                    logged: true,
                    login: that.state.login,
                    senha: that.state.senha
                });
            }
        },1000);

    }

    async handleChange(e){
        e.preventDefault();
        let that = this;
        clearTimeout(this.timeoutid);
        let target = e.target;
        this.timeoutid = setTimeout(() => {
            let name = target.getAttribute('name');
            let value = target.value;
            let state = Object.assign({}, that.state); ;
            state[name] = value;
            that.setState(state);
        },300);

    }

    componentWillUnmount(){
        clearInterval(window.intervalidLogin);
    }

    shouldComponentUpdate(){
        return this.state.logged;
    }

    render() {
        return (<div>
            {
                !this.state.logged && (
                    <div class="d-flex align-items-center flex-column justify-content-center h-100 bg-dark text-white" id="box">
                        <h1 class="display-4">NativApp</h1>
                        <form>
                            <div class="form-group">
                                <input name="login" onChange={this.handleChange}  class="form-control form-control-lg" placeholder="Login" type="text" />
                            </div>
                            <div class="form-group">
                                <input name="senha" onChange={this.handleChange}  class="form-control form-control-lg" placeholder="Senha" type="text" />
                            </div>
                            <div class="form-group">
                                <button type="button" onClick={this.handleClick} class="btn btn-info btn-lg btn-block">Entrar</button>
                            </div>
                        </form>
                    </div>
                )
            }

        </div>);
    }

}

export default Login;
