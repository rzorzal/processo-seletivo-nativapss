import React, {Component} from 'react';

import {
    Container,
    Row,
    Col,
    Table
} from 'reactstrap';

import db from '../../../database';

class CursosListar extends Component {

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
        let allData = await db.curso.toArray();
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
                <h4>Mostrar Cursos</h4>
                <Col md="12" lg="12" xs="12" sm="12">
                    <Container>
                        <Row>
                            <Col md="12" lg="12" xs="12" sm="12">

                            </Col>
                            <Col md="12" lg="12" xs="12" sm="12">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Nome</th>
                                            <th>Observações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { this.state.rows.filtered.map( (data) => {
                                            return (
                                                <tr>
                                                    <td> { data.codigo }</td>
                                                    <td>{ data.nome }</td>
                                                    <td>{ data.observacoes }</td>
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

export default CursosListar;
