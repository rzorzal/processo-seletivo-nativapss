import React, {Component} from 'react';

import {
    Container,
    Row,
    Col,
    Table
} from 'reactstrap';

import db from '../../../database';

class ProfessorListar extends Component {

    constructor(props){
        super(props);

        this.state = {
            rows: {
                all: [],
                filtered: []
            }
        }
    }

    async componentDidMount(){
        let allData = await db.professor.toArray();
        this.setState({
            rows: {
                all: allData,
                filtered: allData
            }
        });
    }

    render() {
        return (<div>
            <Col md="12" lg="12" xs="12" sm="12">
                <h4>Mostrar Professores</h4>
                <Col md="12" lg="12" xs="12" sm="12">
                    <Container>
                        <Row>
                            <Col md="12" lg="12" xs="12" sm="12">

                            </Col>
                            <Col md="12" lg="12" xs="12" sm="12">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Identificação</th>
                                            <th>Nome</th>
                                            <th>Sobrenome</th>
                                            <th>Gênero</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { this.state.rows.filtered.map( (data) => {
                                            return (
                                                <tr>
                                                    <td> { data.identificacao }</td>
                                                    <td>{ data.nome }</td>
                                                    <td>{ data.sobrenome }</td>
                                                    <td>{ data.genero }</td>
                                                </tr>
                                            )
                                        } ) }
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Col>
        </div>);
    }

}

export default ProfessorListar;
