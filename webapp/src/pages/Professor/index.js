import React, {Component} from 'react';

import {
    Col
} from 'reactstrap';

import { Route } from 'react-router';


import ProfessorCadastrar from './Cadastrar';
import ProfessorListar from './Listar';
import ProfessorAlterar from './Alterar';
import ProfessorDeletar from './Remover';


class ProfessorIndex extends Component {

    render() {
        return (
            <div>

                <Col md="12" lg="12" xs="12" sm="12">
                    <h2>Gerenciar Professores</h2>
                    <div>
                        <Route path='/professores/cadastrar' component={ProfessorCadastrar}/>
                        <Route path='/professores/mostrar' component={ProfessorListar}/>
                        <Route path='/professores/editar' component={ProfessorAlterar}/>
                        <Route path='/professores/deletar' component={ProfessorDeletar}/>
                    </div>
                </Col>
            </div>
        )
    }

}


export default ProfessorIndex;
