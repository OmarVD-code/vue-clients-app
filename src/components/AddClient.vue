<template>
    <div class="add-client">
        <validation-observer ref="observer">
            <b-form @submit.stop.prevent="onSubmit">
                <div class="personal">
                    <div class="personal-header">
                        <h3>PERSONAL INFORMATION</h3>
                        <router-link to="/">
                            <button class="btn btn-success">BACK</button>
                        </router-link>
                    </div>
                    <div class="personal-form">
                        <b-container class="container">
                            <b-row>
                                <b-col>
                                    <validation-provider name="first name"
                                        :rules="{ required: true, alpha: true, min: 3 }" v-slot="validationContext">
                                        <b-form-group label="First name">
                                            <b-form-input v-model="client.fname"
                                                :state="getValidationState(validationContext)"
                                                aria-describedby="input-fname-live-feedback" />
                                            <b-form-invalid-feedback id="input-fname-live-feedback">{{
                                                validationContext.errors[0]
                                            }}</b-form-invalid-feedback>
                                        </b-form-group>
                                    </validation-provider>
                                </b-col>
                                <b-col>
                                    <validation-provider name="last name"
                                        :rules="{ required: true, alpha: true, min: 3 }" v-slot="validationContext">
                                        <b-form-group label="Last name">
                                            <b-form-input v-model="client.lname"
                                                :state="getValidationState(validationContext)"
                                                aria-describedby="input-lname-live-feedback" />
                                            <b-form-invalid-feedback id="input-fname-live-feedback">{{
                                                validationContext.errors[0]
                                            }}</b-form-invalid-feedback>
                                        </b-form-group>
                                    </validation-provider>
                                </b-col>
                                <b-col>
                                    <validation-provider name="date of birth" :rules="{ required: true }"
                                        v-slot="validationContext">
                                        <b-form-group label="DOB">
                                            <b-form-input type="date" v-model="client.dob"
                                                :state="getValidationState(validationContext)"
                                                aria-describedby="input-dob-live-feedback" />
                                            <b-form-invalid-feedback id="input-dob-live-feedback">{{
                                                validationContext.errors[0]
                                            }}</b-form-invalid-feedback>
                                        </b-form-group>
                                    </validation-provider>
                                </b-col>
                            </b-row>
                        </b-container>

                        <b-container class="container">
                            <b-row>
                                <b-col>
                                    <validation-provider name="phone"
                                        :rules="{ required: true, numeric: true, min: 9, max: 10 }"
                                        v-slot="validationContext">
                                        <b-form-group label="Phone">
                                            <b-form-input v-model="client.phone"
                                                :state="getValidationState(validationContext)"
                                                aria-describedby="input-phone-live-feedback" />
                                            <b-form-invalid-feedback id="input-phone-live-feedback">{{
                                                validationContext.errors[0]
                                            }}</b-form-invalid-feedback>
                                        </b-form-group>
                                    </validation-provider>
                                </b-col>
                                <b-col>
                                    <validation-provider name="email" :rules="{ required: true, email: true }"
                                        v-slot="validationContext">
                                        <b-form-group label="Email">
                                            <b-form-input v-model="client.email"
                                                :state="getValidationState(validationContext)"
                                                aria-describedby="input-email-live-feedback" />
                                            <b-form-invalid-feedback id="input-phone-live-feedback">{{
                                                validationContext.errors[0]
                                            }}</b-form-invalid-feedback>
                                        </b-form-group>
                                    </validation-provider>
                                </b-col>
                                <b-col>
                                    <validation-provider name="address" :rules="{ required: true }"
                                        v-slot="validationContext">
                                        <b-form-group label="Address">
                                            <b-form-input v-model="client.address"
                                                :state="getValidationState(validationContext)"
                                                aria-describedby="input-address-live-feedback" />
                                            <b-form-invalid-feedback id="input-address-live-feedback">{{
                                                validationContext.errors[0]
                                            }}</b-form-invalid-feedback>
                                        </b-form-group>
                                    </validation-provider>
                                </b-col>
                            </b-row>
                        </b-container>
                    </div>
                </div>

                <div class="payments">
                    <div class="payments-header">
                        <h3>PAYMENTS</h3>
                        <a class="btn btn-primary btn-add" :class="{'d-none': counter == 5}" @click="addPayment">+</a>
                    </div>

                    <div>
                        <b-container v-for="(item, index) in this.client.transactions" :key="item.id">
                            <TransactionsForm :id="index" :tranprop="item"
                                @onChangeValues="(key, e) => onChangeValues(item, key, e)" />
                        </b-container>
                    </div>
                </div>
                <b-button type="submit" variant="primary" class="btn w-100 btn-save">Save</b-button>
            </b-form>
        </validation-observer>

    </div>
</template>
<script>
import axios from "axios";
import TransactionsForm from "./TransactionsForm.vue";

export default {
    name: 'AddClient',
    components: {
        TransactionsForm,
    },
    data() {
        return {
            client: {
                fname: null,
                lname: null,
                dob: null,
                phone: null,
                email: null,
                address: null,
                transactions: [{
                    transaction_id: null,
                    amount: null,
                    date: null,
                }]
            },
            transaction: {
                transaction_id: null,
                amount: null,
                date: null,
            },
            counter: 1,
            activeModal: false,
        }
    },
    methods: {

        addPayment() {
            this.counter++

            let transaction = {
                transaction_id: '',
                amount: '',
                date: '',
            }
            this.client.transactions.push(transaction)
        },

        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },

        async validateForm() {
            let valid = await this.$refs.observer.validate()
            return valid
        },

        async onSubmit() {
            let isValid = await this.validateForm()

            if (isValid) {
                await axios.post('http://api-clients.test/api/clients', {
                    data: this.client
                })
                alert('Client added successfully')
                setTimeout(() => {
                    this.$router.push('/');
                }, 500)
            }

        },

        newTransaction(transaction) {
            this.client.transactions.push(transaction)
        },
        onChangeValues(item, key, value) {
            this.$set(item, key, value)
        },
    }
}
</script>
<style scoped>
.payments {
    margin-top: 20px;
}

.personal-header,
.payments-header {
    display: flex;
    justify-content: space-between;
}

.btn-add {
    border-radius: 50%;
    font-weight: bolder;
}

.btn-reset,
.btn-save {
    margin-top: 10px;
}

.container {
    margin-bottom: 10px;
}
</style>