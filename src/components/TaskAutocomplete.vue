<template>
    <div class="autocomplete-root">
        <input ref="autocomplete-input"
            id="autocomplete-input"
            type="text"
            class="form-control"
            autocomplete="off"
            v-model="autocompleteInputModel"
            @input="debouncedApiRequest"
            @keyup.up="onUp"
            @keyup.down="onDown"
            @keyup.enter="onEnter"
        />

        <div class="autocomplete-container" style="width: 18rem;"
            v-if="selected === false"
        >
            <ul class="autocomplete-list">
                <li class="autocomplete-list-item"
                    v-for="(item, index) in autocompleteList"
                    :key="index"
                    :class="{'active-autocomplete-list-item': positionInList === index}"
                    @click="onSelect(item)"
                ><span>{{ item }}</span></li>
            </ul>
        </div>
    </div>
</template>

<script>
import { map, debounce } from 'lodash';

import TaskService from '@/services/taskService';

export default {
    name: 'TaskAutocomplete',
    data () {
        return {
            selected: false,
            positionInList: 0,
            autocompleteList: [],
            currentText: ''
        }
    },
    computed: {
        autocompleteInputModel: {
            get () {
                return this.currentText;
            },
            set (val) {
                this.currentText = val;
            }
        }
    },
    created () {
        this.debouncedApiRequest = debounce(this.apiRequest, 100);
    },
    methods: {
        apiRequest (event) {
            this.selected = false;
            const token = event.target.value;
            return TaskService.getTasksByToken(token)
                .then(res => {
                    if(res.length) {
                        this.autocompleteList = map(res, item => item.description);
                    } else {
                        this.autocompleteList = [];
                    }
                })
        },
        onSelect (item) {
            this.autocompleteInputModel = item;
            this.$emit('task-selected', item);
            this.selected = true;
            this.resetList();
        },
        resetList () {
            this.autocompleteList = [];
        },
        onUp () {
            this.positionInList--;
            if(this.positionInList === -1) this.positionInList = this.autocompleteList.length - 1;
        },
        onDown () {
            this.positionInList++;
            if(this.positionInList === this.autocompleteList.length) this.positionInList = 0;
        },
        onEnter () {
            this.onSelect(this.autocompleteList[this.positionInList]);
            this.positionInList = 0;
        }
    }
}
</script>

<style>
.autocomplete-root {
    position: relative;
}

.autocomplete-done {
    cursor: pointer;
}

#autocomplete-input {
    width: 300px;
}

.autocomplete-container {
    position: absolute;
    min-height: 182px;
    min-width: 100px;
    top: 42px;
    left: 0px;
    z-index: 100;
    background-color: #fff;
}

ul.autocomplete-list {
    list-style: none;
    width: 100%;
    height: 100%;
    background-color: #F9E9D5;
    opacity: 0.7;
    font-size: 12px;
}

.autocomplete-list-item {
    width: 100%;
    background-color: #F9E9D5;
    cursor: pointer;
}
.autocomplete-list-item span {
    margin-left: 9px;
}
.active-autocomplete-list-item {
    background-color: #FCDCB5;
    width: 100%;
    height: 18px;
}
</style>
