import React, {Component} from 'react';
import './App.css';

import { Route } from 'react-router';

import AlunoIndex from './pages/Aluno';
import ProfessorIndex from './pages/Professor';
import CursoIndex from './pages/Curso';


import {
    Container,
    Row,
    Col,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavItem,
    NavLink
} from 'reactstrap';

class App extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

        this.state = {
            isOpen: false,
            isLogged: false
        }

    }



    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
            isLogged: this.state.isLogged
        })
    }

    handleClick(e){
        let path = e.target.getAttribute('path');
        this.props.history.push(path);
    }

    handleLogout(){
        localStorage.removeItem('token');
        window.location = "/login";
    }

    componentWillMount(){
        window.intervalid = setInterval(()=>{
            let token = localStorage.getItem('token');
            if(token){
                this.setState({
                    isLogged: true,
                    isOpen: this.state.isOpen,
                });
                clearInterval(window.intervalid);
            } else {
                let location = window.location.pathname;
                if(location != "/login"){
                    window.location = "/login";
                }
            }
        },1000);
    }

    componentWillUnmount(){
        clearInterval(window.intervalid);
    }

    render() {
        console.log('RENDER');
        console.log(this.state);
        return (
            <div>
                {
                    this.state.isLogged &&
                    (
                        <div>
                            <Navbar color="info" light expand="md">
                                <NavbarBrand >NativApps</NavbarBrand>
                                <NavbarToggler onClick={this.toggle}/>
                                <Collapse isOpen={this.state.isOpen} navbar="navbar">
                                    <Nav className="ml-auto" navbar="navbar">
                                        <UncontrolledDropdown nav="nav" inNavbar="inNavbar">
                                            <DropdownToggle nav="nav" caret="caret">
                                                Gerenciar Alunos
                                            </DropdownToggle>
                                            <DropdownMenu right="right">
                                                <DropdownItem path="/alunos/cadastrar" onClick={this.handleClick}>
                                                    Cadastrar Alunos
                                                </DropdownItem>
                                                <DropdownItem path="/alunos/mostrar" onClick={this.handleClick}>
                                                    Mostrar Alunos
                                                </DropdownItem>
                                                <DropdownItem divider="divider"/>
                                                <DropdownItem path="/alunos/editar" onClick={this.handleClick}>
                                                    Modificar Alunos
                                                </DropdownItem>
                                                <DropdownItem path="/alunos/deletar" onClick={this.handleClick}>
                                                    Remover Alunos
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                        <UncontrolledDropdown nav="nav" inNavbar="inNavbar">
                                            <DropdownToggle nav="nav" caret="caret">
                                                Gerenciar Professores
                                            </DropdownToggle>
                                            <DropdownMenu right="right">
                                                <DropdownItem path="/professores/cadastrar" onClick={this.handleClick}>
                                                    Cadastrar Professores
                                                </DropdownItem>
                                                <DropdownItem path="/professores/mostrar" onClick={this.handleClick}>
                                                    Mostrar Professores
                                                </DropdownItem>
                                                <DropdownItem divider="divider"/>
                                                <DropdownItem path="/professores/editar" onClick={this.handleClick}>
                                                    Modificar Professores
                                                </DropdownItem>
                                                <DropdownItem path="/professores/deletar" onClick={this.handleClick}>
                                                    Remover Professores
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                        <UncontrolledDropdown nav="nav" inNavbar="inNavbar">
                                            <DropdownToggle nav="nav" caret="caret">
                                                Gerenciar Cursos
                                            </DropdownToggle>
                                            <DropdownMenu right="right">
                                                <DropdownItem path="/cursos/cadastrar" onClick={this.handleClick}>
                                                    Cadastrar Cursos
                                                </DropdownItem>
                                                <DropdownItem path="/cursos/mostrar" onClick={this.handleClick}>
                                                    Mostrar Cursos
                                                </DropdownItem>
                                                <DropdownItem divider="divider"/>
                                                <DropdownItem path="/cursos/editar" onClick={this.handleClick}>
                                                    Modificar Cursos
                                                </DropdownItem>
                                                <DropdownItem path="/cursos/deletar" onClick={this.handleClick}>
                                                    Remover Cursos
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                        <NavItem onClick={this.handleLogout}>
                                            <NavLink>Logout</NavLink>
                                        </NavItem>
                                    </Nav>
                                </Collapse>
                            </Navbar>
                            <div class="content">
                                <Container>
                                    <Row>
                                        <Col md="12" lg="12" xs="12" sm="12">
                                            <Route path='/alunos' component={AlunoIndex}/>
                                            <Route path='/professores' component={ProfessorIndex}/>
                                            <Route path='/cursos' component={CursoIndex}/>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </div>
                    )
                }


            </div>
        );
    }
}

export default App;
