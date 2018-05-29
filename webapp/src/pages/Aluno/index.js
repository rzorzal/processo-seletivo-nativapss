import React, {Component} from 'react';

import {
    Col
} from 'reactstrap';

import { Route } from 'react-router';


import AlunoCadastrar from './Cadastrar';
import AlunoListar from './Listar';
import AlunoAlterar from './Alterar';
import AlunoDeletar from './Remover';


class AlunoIndex extends Component {

    render() {

        return (
            <div>

                <Col md="12" lg="12" xs="12" sm="12">
                    <h2>Gerenciar Alunos</h2>
                    <div>
                        <Route path='/alunos/cadastrar' component={AlunoCadastrar}/>
                        <Route path='/alunos/mostrar' component={AlunoListar}/>
                        <Route path='/alunos/editar' component={AlunoAlterar}/>
                        <Route path='/alunos/deletar' component={AlunoDeletar}/>
                    </div>
                </Col>
            </div>
        )
    }

}


export default AlunoIndex;
