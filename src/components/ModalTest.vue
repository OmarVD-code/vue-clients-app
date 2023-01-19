<template>
    <b-modal v-model="active" @hidden="closeModal" size="xl" hide-footer title="UPDATE">
        <validation-observer ref="observer">
            <b-form @submit.stop.prevent="onSubmit">
                <div class="personal">
                    <div class="personal-header">
                        <h6>PERSONAL INFORMATION</h6>
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
                        <h6>PAYMENTS</h6>
                    </div>
                    <div class="payments-form">
                        <b-container v-for="payment in payments" :key="payment.id" class="container">
                            <b-row>
                                <b-col>
                                    <validation-provider name="transaction id" :rules="{ required: true }"
                                        v-slot="validationContext">
                                        <b-form-group label="Transaction ID">
                                            <b-form-input v-model="payment.transaction_id"
                                                :state="getValidationState(validationContext)"
                                                aria-describedby="input-tid-live-feedback" />
                                            <b-form-invalid-feedback id="input-tid-live-feedback">{{
                                                validationContext.errors[0]
                                            }}</b-form-invalid-feedback>
                                        </b-form-group>
                                    </validation-provider>
                                </b-col>
                                <b-col>
                                    <validation-provider name="amount"
                                        :rules="{ required: true, numeric: true, min_value: 1 }"
                                        v-slot="validationContext">
                                        <b-form-group label="Amount">
                                            <b-form-input v-model="payment.amount"
                                                :state="getValidationState(validationContext)"
                                                aria-describedby="input-amount-live-feedback" />
                                            <b-form-invalid-feedback id="input-amount-live-feedback">{{
                                                validationContext.errors[0]
                                            }}</b-form-invalid-feedback>
                                        </b-form-group>
                                    </validation-provider>
                                </b-col>
                                <b-col>
                                    <validation-provider name="date" :rules="{ required: true }"
                                        v-slot="validationContext">
                                        <b-form-group label="Date">
                                            <b-form-input type="date" v-model="payment.date"
                                                :state="getValidationState(validationContext)"
                                                aria-describedby="input-date-live-feedback" />
                                            <b-form-invalid-feedback id="input-date-live-feedback">{{
                                                validationContext.errors[0]
                                            }}</b-form-invalid-feedback>
                                        </b-form-group>
                                    </validation-provider>
                                </b-col>
                            </b-row>
                        </b-container>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary w-100 btn-update">UPDATE</button>
            </b-form>
        </validation-observer>
    </b-modal>
</template>

<script>

import axios from 'axios'

export default {
    props: {
        isActive: {
            type: Boolean,
            required: true
        },
        id: {
            type: Number,
            required: true
        }
    },
    methods: {
        closeModal() {
            this.active = false
            this.$emit('closeMe')
        },
        closeModalAfterUpdate() {
            this.$emit('closeMeAfterUpdate')
        },
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
        async validateForm() {
            let valid = await this.$refs.observer.validate()
            return valid
        },
        async getClientData() {

            try {
                const { data } = await axios.get(`http://api-clients.test/api/clients/${this.id}`)
                this.client = data[0]
                this.client.fname = data[0].name.split(' ')[0]
                this.client.lname = data[0].name.split(' ')[1]
                console.log(this.client)
            } catch (error) {
                console.log("🚀 ~ file: ModalTest.vue:45 ~ getClientData ~ error", error)

            }

        },
        async getPaymentsData() {
            try {
                const { data } = await axios.get(`http://api-clients.test/api/payments/${this.id}`)
                this.payments = data
                console.log(this.payments)
            } catch (error) {
                console.log("🚀 ~ file: ModalTest.vue:45 ~ getClientData ~ error", error)
            }

        },
        async onSubmit() {
            let isValid = await this.validateForm()

            if (isValid) {
                this.client.name = this.client.fname.concat(' ', this.client.lname)
                this.client.transactions = this.payments
                await axios.put(`http://api-clients.test/api/clients/${this.id}`, {
                    data: this.client,
                    id: this.id
                })
                alert('client updated successfully')
                this.closeModalAfterUpdate()
            }
        }
    },
    beforeCreate() {
        console.log("🚀 ~ file: ModalTest.vue:10 ~ beforeCreate ~ beforeCreate")

    },
    created() {

    },
    beforeMount() {
        console.log("🚀 ~ file: ModalTest.vue:18 ~ beforeMount ~ beforeMount")

    },
    async mounted() {
        await Promise.all([
            this.getClientData(),
            this.getPaymentsData()
        ])

        this.active = this.isActive
    },
    beforeDestroy() {
        console.log("🚀 ~ file: ModalTest.vue:26 ~ beforeDestroy ~ beforeDestroy")

    },
    destroyed() {
        console.log("🚀 ~ file: ModalTest.vue:30 ~ destroyed ~ destroyed")

    },
    data() {
        return {
            active: false,
            client: {
                name: '',
                address: '',
                dob: '',
                phone: '',
                email: '',
                transactions: []
            },
            payments: []
        }
    }
}
</script>

<style scoped>
.btn-update {
    margin-top: 15px;
}
</style>