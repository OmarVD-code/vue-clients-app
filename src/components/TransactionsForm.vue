<template>
    <div>
        <b-row>
            <b-col>
                <validation-provider name="transaction id" :rules="{ required: true }" v-slot="validationContext">
                    <b-form-group label="Transaction ID">
                        <b-form-input type="text" v-model="transaction.transaction_id"
                            :state="getValidationState(validationContext)" aria-describedby="input-tid-live-feedback"
                            @input="$emit('onChangeValues', 'transaction_id', transaction.transaction_id)" />
                        <b-form-invalid-feedback id="input-tid-live-feedback">{{
                            validationContext.errors[0]
                        }}</b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>
            </b-col>
            <b-col>
                <validation-provider name="amount" :rules="{ required: true, numeric: true, min_value: 1 }"
                    v-slot="validationContext">
                    <b-form-group label="Amount">
                        <b-form-input v-model="transaction.amount" :state="getValidationState(validationContext)"
                            aria-describedby="input-amount-live-feedback"
                            @input="$emit('onChangeValues', 'amount', transaction.amount)" />
                        <b-form-invalid-feedback id="input-amount-live-feedback">{{
                            validationContext.errors[0]
                        }}</b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>
            </b-col>
            <b-col>
                <validation-provider name="date" :rules="{ required: true }" v-slot="validationContext">
                    <b-form-group label="Date">
                        <b-form-input type="date" v-model="transaction.date"
                            :state="getValidationState(validationContext)" aria-describedby="input-date-live-feedback"
                            @input="$emit('onChangeValues', 'date', transaction.date)" />
                        <b-form-invalid-feedback id="input-date-live-feedback">{{
                            validationContext.errors[0]
                        }}</b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>
            </b-col>
        </b-row>
    </div>
</template>
<script>
export default {
    name: 'TransactionsForm',
    props: {
        tranprop: {
            type: Object,
            required: true
        }
    },
    mounted() {
        this.transactions = { ...this.tranprop }
    },
    data() {
        return {
            transaction: {
                transaction_id: null,
                amount: null,
                date: null
            },
            transactions: [{}]
        }
    },
    methods: {
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null
        }
    }
}
</script>