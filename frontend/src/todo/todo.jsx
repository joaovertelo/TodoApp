import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3004/api/todos';

export default class Todo extends Component {
    // Bind seria necessario caso não fosse passado uma arrow function no handleAdd.
    constructor(props) {
        super(props)
        //this.handleAdd = this.handleAdd.bind(this)
        //this.handleChange = this.handleChange.bind(this)
        //this.handleRemove = this.handleRemove.bind(this)
        //this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        //this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        //this.handleSearch = this.handleSearch.bind(this)
        // this.handleClear = this.handleClear.bind(this)
        this.state = { description: '', list: [] }
        this.refresh();
    }

    refresh(description = '') {
        const search = description ? `&description__regex=/${description}/` : '';
        axios.get(`${URL}?sort=-createdAt${search}`).then(
            resp => this.setState({ ...this.state, description, list: resp.data })
        )
    }

    handleAdd() {
        const description = this.state.description;
        axios.post(URL, { description }).then(
            resp => this.refresh()
        )
    }
    handleChange(e) {
        this.setState({ ...this.state, description: e.target.value });
    }

    handleRemove(todo) {
        axios.delete(`${URL}/${todo._id}`).then(
            resp => this.refresh(this.state.description)
        )
    }

    handleMarkAsDone(todo) {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: true }).then(
            resp => this.refresh(this.state.description)
        )
    }

    handleMarkAsPending(todo) {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: false }).then(
            resp => this.refresh(this.state.description)
        )
    }

    handleSearch() {
        this.refresh(this.state.description)
    }

    handleClear() {
        this.refresh();
    }

    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'> </PageHeader>
                <TodoForm handleAdd={() => this.handleAdd()}
                    description={this.state.description}
                    handleChange={(e) => this.handleChange(e)} 
                    handleSearch = {() => this.handleSearch()}
                    handleClear = {() => this.handleClear()}/>
                <TodoList list={this.state.list}
                    handleRemove={(todo) => this.handleRemove(todo)}
                    handleMarkAsDone={(todo) => this.handleMarkAsDone(todo)}
                    handleMarkAsPending={(todo) => this.handleMarkAsPending(todo)}
                    
                />
            </div>
        );
    }
}