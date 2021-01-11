<template>
    <base-manager :managerCommands="managerCommands">
        <template v-slot:editForm="slotProps">
            <edit-form
                ref="editForm"
                :width="640"
                :visible="slotProps.editFormVisible"
                :editFormType="slotProps.editFormType"
                :model.sync="slotProps.model"
                @close="slotProps.handleEditFormClose"
            />
            <!-- @close="handleEditFormClose" -->
        </template>
    </base-manager>
</template>

<script>
import EditForm from './EditForm';
import BaseManager from '@/component/rebue/BaseManager';

const managerCommands = [
    {
        buttonType: 'primary',
        icon: 'plus',
        title: '新建',
    },
];

export default {
    name: 'Manager',
    components: {
        BaseManager,
        EditForm,
    },
    data() {
        this.managerCommands = managerCommands;
        return {};
    },
    methods: {},
};
</script>
<style lang="less" scoped></style>
