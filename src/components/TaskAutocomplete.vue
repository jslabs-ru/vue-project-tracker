<template>
    <div class="row">
        <div class="cell">
            <label for="task-autocomplete">Choose task</label>
            <Autocomplete
                id="task-autocomplete"
                :serviceMethod="serviceMethod"
                :setAutocompleteInputModel="setAutocompleteInputModel"
                :renderListItem="renderListItem"
                @autocomplete-selected="onTaskSelected"
                @autocomplete-not-selected="onTaskNotSelect"
            />
        </div>

        <div class="cell">
            <div v-if="task" class="task-found">Found: <span class="green">{{ task }}</span></div>
        </div>
    </div>
</template>

<script>
/* TODO: delete example component */

import Autocomplete from '@/components/autocomplete/Autocomplete';
import TaskService from '@/services/taskService';

import { map } from 'lodash';

export default {
    name: 'TaskAutocomplete',
    components: {
        Autocomplete
    },
    data () {
        return {
            task: null,
            serviceMethod: TaskService.getTasksByToken,
            renderListItem: function(item) {
                return item && item.description;
            },
            setAutocompleteInputModel: function(item) {
                return item && item.description;
            }
        }
    },
    methods: {
        onTaskSelected (task) {
            this.task = task;
        },
        onTaskNotSelect () {
            this.task = null;
        }
    }
}
</script>

<style>
.green {
    color: green;
}
.task-found {
    margin: 30px;
}
</style>
