import React, {Component} from 'react';

import CursoForm from '../../../components/forms/curso';

import {
    Col
} from 'reactstrap';


class CursoCadastrar extends Component {


    render() {
        return (<div>
            <Col md="12" lg="12" xs="12" sm="12">
                <h4>Cadastrar Cursos</h4>
                <Col md="12" lg="12" xs="12" sm="12">
                    <CursoForm></CursoForm>
                </Col>
            </Col>
        </div>)
    }

}

export default CursoCadastrar;
