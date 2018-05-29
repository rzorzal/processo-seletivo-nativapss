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

class CursoForm extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleComponentChange = this.handleComponentChange.bind(this);

        this.state = {
            nome: "",
            codigo: "",
            observacoes: "",
            DATABASE_ID: ""
        }


    }

    async handleSubmit(e) {
        try {
            console.log(this.state);
            if (!this.state.nome || !this.state.codigo || !this.state.observacoes) {
                notify.warning("Todos os campos devem ser preenchido");
                return;
            }
            if(this.state['DATABASE_ID']){
                await db.curso.put(this.state);
                notify.success("Curso alterado com sucesso");
            } else {
                let persist = {
                    nome: this.state.nome,
                    codigo: this.state.codigo,
                    observacoes: this.state.observacoes,
                }
                await db.curso.add(persist);
                notify.success("Curso criado com sucesso");
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

    async fetch(cursoid){

        if(cursoid){
            let curso = await db.curso.filter( a=> a.codigo == cursoid ).toArray();
            if(!curso || !curso.length ){
                notify.warning("Curso não encontrado");
                return;
            }

            curso = curso && curso[0];
            this.setState(curso);
        }


    }

    componentWillReceiveProps(nextProps){
        let cursoid = nextProps.cursoid;
        this.fetch(cursoid);
        return true;
    }

    render() {

        return (<div>

            <Form>
                <Row>
                    <Col md="6" lg="4" xs="12" sm="12">
                        <FormGroup>
                            <Label for="codigo">Código</Label>
                            <Input  name="codigo" value={this.state.codigo} onChange={this.handleComponentChange} type="text" id="identificacao" placeholder="Código do Curso"/>
                        </FormGroup>
                    </Col>
                    <Col md="6" lg="4" xs="12" sm="12">
                        <FormGroup>
                            <Label for="nome">Nome</Label>
                            <Input type="text" name="nome" value={this.state.nome} onChange={this.handleComponentChange} placeholder="Nome do Curso"/>
                        </FormGroup>
                    </Col>
                    <Col md="6" lg="4" xs="12" sm="12">
                        <FormGroup>
                            <Label for="observacoes">Observações</Label>
                            <Input type="text" name="observacoes" value={this.state.observacoes} onChange={this.handleComponentChange} placeholder="Observações do Curso"/>
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

export default CursoForm;
