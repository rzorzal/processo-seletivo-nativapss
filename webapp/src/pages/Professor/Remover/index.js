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

class ProfessorDeletar extends Component {

    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            professorid: "",
            search: ""
        }
    }

    async handleClick(){
        let professor = await db.professor.filter( a=> a.identificacao == this.state.search ).toArray();
        if(!professor || !professor.length ){
            notify.warning("Professor não encontrado");
            this.setState({
                professorid: "",
                search: ""
            });
            return;
        }

        professor = professor && professor[0];

        if(professor['DATABASE_ID']){
            try{
                await db.professor.delete(professor['DATABASE_ID']);
                notify.success("Professor deletado com sucesso");
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
                <h4>Remover Professor</h4>
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

export default ProfessorDeletar;
