import React, {Component} from 'react';

import {
    Col
} from 'reactstrap';

import { Route } from 'react-router';


import CursoCadastrar from './Cadastrar';
import CursoListar from './Listar';
import CursoAlterar from './Alterar';
import CursoDeletar from './Remover';


class CursoIndex extends Component {

    render() {
        return (
            <div>

                <Col md="12" lg="12" xs="12" sm="12">
                    <h2>Gerenciar Cursos</h2>
                    <div>
                        <Route path='/cursos/cadastrar' component={CursoCadastrar}/>
                        <Route path='/cursos/mostrar' component={CursoListar}/>
                        <Route path='/cursos/editar' component={CursoAlterar}/>
                        <Route path='/cursos/deletar' component={CursoDeletar}/>
                    </div>
                </Col>
            </div>
        )
    }

}


export default CursoIndex;
