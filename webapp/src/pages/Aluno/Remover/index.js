import React, {Component} from 'react';

import './index.css'

import notify from '../../../notify';

import {
    Row,
    Col,
    Input,
    Button,
    Label
} from 'reactstrap';

import db from "../../../database";

class AlunoDeletar extends Component {

    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            alunoid: "",
            search: ""
        }
    }

    async handleClick(){
        let aluno = await db.aluno.filter( a=> a.identificacao == this.state.search ).toArray();
        if(!aluno || !aluno.length ){
            notify.warning("Aluno não encontrado");
            this.setState({
                alunoid: "",
                search: ""
            });
            return;
        }

        aluno = aluno && aluno[0];

        if(aluno['DATABASE_ID']){
            try{
                await db.aluno.delete(aluno['DATABASE_ID']);
                notify.success("Aluno deletado com sucesso");
            }catch(err){
                console.log(err);
                notify.error(err.message);
            }

        }

    }

    handleChange(e){
        this.state.search = e.target.value;
    }


    render() {
        return (<div>
            <Col md="12" lg="12" xs="12" sm="12">
                <h4>Remover Alunos</h4>
                <Row>
                    <Col md="12" lg="12" xs="12" sm="12">
                        <div class="space-top">
                            <Row>
                                <Col md="2" lg="2" xs="12" sm="12">
                                    <Label>Identificação: </Label>
                                </Col>
                                <Col md="8" lg="8" xs="12" sm="12">
                                    <Input onChange={this.handleChange}></Input>
                                </Col>
                                <Col md="2" lg="2" xs="12" sm="12">
                                    <Button onClick={this.handleClick} type="button">Pesquisar</Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Col>
        </div>)
    }

}

export default AlunoDeletar;
