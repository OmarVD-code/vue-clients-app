import ClientsTable from './components/ClientsTable.vue'
import AddClient from './components/AddClient.vue'

export default [
    { path: '/', name: 'clients', component: ClientsTable },
    { path: '/add', name: 'add', component: AddClient },
]