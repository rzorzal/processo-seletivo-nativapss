import React, {Component} from 'react';

import ProfessorForm from '../../../components/forms/professor';

import {
    Col
} from 'reactstrap';


class ProfessorCadastrar extends Component {


    render() {
        return (<div>
            <Col md="12" lg="12" xs="12" sm="12">
                <h4>Cadastrar Professor</h4>
                <Col md="12" lg="12" xs="12" sm="12">
                    <ProfessorForm></ProfessorForm>
                </Col>
            </Col>
        </div>)
    }

}

export default ProfessorCadastrar;
