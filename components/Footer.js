import html from '../core.js'
import { connect } from '../store.js'

function Footer({ todos, filter, filters}) {
    return html`
        <footer class="footer">
            <span class="todo-count">
                <strong>
                    ${todos.filter(todo => !todo.completed).length}
                </strong>
                ${todos.filter(todo => !todo.completed).length > 1 && 'items' || 'item'} 
                left
            </span>
            <!-- Remove this if you don't implement routing -->
            <ul class="filters">
                ${Object.keys(filters).map(key => html`
                    <li>
                        <a href="#" class="${key === filter && 'selected'}" onclick="dispatch('filter', '${key}')">
                        ${key[0].toUpperCase() + key.slice(1)}
                        </a>
                    </li>
                    `
                )}
            </ul>
            <button class="clear-completed" ${todos.every(filters.active) && 'hidden'} onclick="dispatch('removeCompleted')">
                Clear completed
            </button>
        </footer>
    `
}

export default connect()(Footer)