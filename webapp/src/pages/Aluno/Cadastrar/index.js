import React, {Component} from 'react';

import AlunoForm from '../../../components/forms/aluno';

import {
    Col
} from 'reactstrap';


class AlunoCadastrar extends Component {


    render() {
        return (<div>
            <Col md="12" lg="12" xs="12" sm="12">
                <h4>Cadastrar Alunos</h4>
                <Col md="12" lg="12" xs="12" sm="12">
                    <AlunoForm></AlunoForm>
                </Col>
            </Col>
        </div>)
    }

}

export default AlunoCadastrar;
