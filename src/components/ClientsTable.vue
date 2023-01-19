<template>
    <div class="clients-table">
        <div class="head">
            <h3>CLIENTS</h3>
            <router-link to="/add">
                <button class="btn btn-success">ADD CLIENT</button>
            </router-link>
        </div>
        <b-table :fields="fields" :items="provider" ref="main_table" :busy="isBusy" show-empty>
            <template #table-busy>
                <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                </div>
            </template>
            <template v-slot:cell(actions)="{ item }">
                <b-btn variant="outline-secondary" @click="sendInfo(item.id)">Edit</b-btn>
                <b-btn variant="outline-danger" @click="deleteClient(item.id)">Delete</b-btn>
            </template>

        </b-table>

        <b-modal size="xl" title="UPDATE" hide-footer>
        </b-modal>
        <ModalTest v-if="activeModal" :id="selected_client" :isActive="activeModal" @closeMe="closeModal" @closeMeAfterUpdate="closeModalAfterUpdate"/>
    </div>
</template>
<script>
import axios from "axios"
import ModalTest from '../components/ModalTest.vue'


export default {
    name: 'ClientsTable',
    data() {
        return {
            clients: [],
            fields: ['name', 'dob', 'phone', 'email', 'address', 'payments', 'total', 'actions'],
            items: [],
            selected_client: '',
            activeModal: false,
            isBusy: false
        }

    },
    components: {
        ModalTest
    },
    mounted() {

    },
    methods: {
        async provider() {
            this.isBusy = true
            try {
                const { data } = await axios.get('http://api-clients.test/api/clients')
                this.items = data
                this.isBusy = false
                return this.items
            } catch (error) {
                console.error(error)
            }

        },
        editClient(id) {
            this.$router.push({
                name: 'update',
                params: { id }
            });
        },
        sendInfo(id) {
            this.selected_client = id
            this.openModal()
        },
        async deleteClient(id) {
            if (confirm('Are you sure? You will delete the client and all of his transactions')) {
                await axios.delete(`http://api-clients.test/api/clients/${id}`)
                alert('Client deleted successfully!!!')
                this.refreshTable()
            }
        },
        refreshTable() {
            this.$refs.main_table.refresh();
        },
        openModal() {
            this.activeModal = true
        },
        closeModal() {
            this.activeModal = false
        },
        closeModalAfterUpdate(){
            this.activeModal = false
            this.refreshTable()
        }
    }

}
</script>
<style scoped>
.head {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
}

th {
    background-color: lightgray;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}
</style>