import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };

  onFormSubmit = todoContent => {
    const newTodo = { id: nanoid(), text: todoContent };
    this.setState(({ todos }) => ({ todos: [...todos, newTodo] }));
  };
  render() {
    const { todos } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.onFormSubmit} />
        <Grid>
          {todos.map((todo, index) => (
            <GridItem key={todo.id}>
              <Todo todo={todo} index={index + 1} />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
