import React, {Component} from 'react';

import {
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';

import db from '../../database';

import notify from '../../notify';

class ProfessorForm extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleComponentChange = this.handleComponentChange.bind(this);

        this.state = {
            nome: "",
            sobrenome: "",
            identificacao: "",
            genero: "",
            DATABASE_ID: ""
        }


    }

    async handleSubmit(e) {
        try {
            console.log(this.state);
            if (!this.state.nome || !this.state.sobrenome || !this.state.identificacao || !this.state.genero) {
                notify.warning("Todos os campos devem ser preenchido");
                return;
            }
            if(this.state['DATABASE_ID']){
                await db.professor.put(this.state);
                notify.success("Professor alterado com sucesso");
            } else {
                let persist = {
                    nome: this.state.nome,
                    sobrenome: this.state.sobrenome,
                    identificacao: this.state.identificacao,
                    genero: this.state.genero
                }
                await db.professor.add(persist);
                notify.success("Professor criado com sucesso");
            }

        } catch (err) {
            console.log(err);
            notify.error(err.message);
        }

    }

    async handleComponentChange(e) {
        e.preventDefault();
        let target = e.target;
        let name = target.getAttribute('name');
        let value = target.value;
        let state = this.state;
        state[name] = value;
        this.setState(state);
    }

    async fetch(professorid){

        if(professorid){
            let professor = await db.professor.filter( a=> a.identificacao == professorid ).toArray();
            if(!professor || !professor.length ){
                notify.warning("Professor não encontrado");
                return;
            }

            professor = professor && professor[0];
            this.setState(professor);
        }


    }

    componentWillReceiveProps(nextProps){
        let professorid = nextProps.professorid;
        this.fetch(professorid);
        return true;
    }

    render() {
        return (<div>

            <Form>
                <Row>
                    <Col md="6" lg="3" xs="12" sm="12">
                        <FormGroup>
                            <Label for="identificacao">Identificação</Label>
                            <Input  name="identificacao" value={this.state.identificacao} onChange={this.handleComponentChange} type="text" id="identificacao" placeholder="Identificação do Aluno"/>
                        </FormGroup>
                    </Col>
                    <Col md="6" lg="3" xs="12" sm="12">
                        <FormGroup>
                            <Label for="nome">Nome</Label>
                            <Input type="text" name="nome" value={this.state.nome} onChange={this.handleComponentChange} placeholder="Nome do Aluno"/>
                        </FormGroup>
                    </Col>
                    <Col md="6" lg="3" xs="12" sm="12">
                        <FormGroup>
                            <Label for="sobrenome">Sobrenome</Label>
                            <Input type="text" name="sobrenome" value={this.state.sobrenome} onChange={this.handleComponentChange} placeholder="Sobrenome do Aluno"/>
                        </FormGroup>
                    </Col>
                    <Col md="6" lg="3" xs="12" sm="12">
                        <FormGroup>
                            <Label for="genero">Gênero</Label>
                            <Input  value={this.state.genero} onChange={this.handleComponentChange} type="select" name="genero" id="genero">
                                <option disabled="disabled" selected="selected" value="">Selecione um Gênero</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md="12" lg="12" xs="12" sm="12">
                        <Button onClick={this.handleSubmit} color="success" type="button">Salvar</Button>
                    </Col>
                </Row>
            </Form>
        </div>)
    }

}

export default ProfessorForm;
