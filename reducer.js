import storage from './storage/storage.js'

const init = {
    todos: storage.get(),
    editIndex: null,
    filter: 'all',
    filters: {
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed
    }
}

const actions = {
    add({ todos }, title) {
        if (title !== '') {
            todos.push({
                title,
                completed: false,
            })
            storage.set(todos)
        }
    },
    toggleCompleted({ todos }, index) {
        todos[index].completed = !todos[index].completed;
        storage.set(todos);
    },
    toggleCompletedAll({ todos }, completed) {
        todos.forEach(todo => todo.completed = completed);
        storage.set(todos);
    },
    remove({ todos }, index) {
        todos.splice(index, 1);
        storage.set(todos);
    },
    removeCompleted(state) {
        state.todos = state.todos.filter(state.filters.active);
        storage.set(state.todos);
    },
    filter(state, key) {
        state.filter = key;
    },
    startEdit(state, index) {
        state.editIndex = index;
    },
    endEdit(state, title) {
        if (state.editIndex !== null) {
            if (title) {
                state.todos[state.editIndex].title = title;
                state.todos[state.editIndex].completed = false;
            } else {
                this.remove(state, state.editIndex)
            }
        }
        state.editIndex = null;
        storage.set(state.todos);
    },
    cancelEdit(state) {
        state.editIndex = null;
    }
}

export default function reducer(state = init, action, args) {
    actions[action] && actions[action](state, ...args)
    return state;
}