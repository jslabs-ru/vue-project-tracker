<template>
    <div>
        <b-spinner
            v-if="isLoading"
            variant="primary"
            label="Spinning"
        ></b-spinner>

        <b-tabs content-class="mt-3" v-if="user">
            <b-tab title="User" >
                <b-card
                    v-if="user"
                    :title="user.name"
                    style="max-width: 20rem;"
                    class="mb-2"
                >
                    <b-card-text class="user-data-name">
                        {{ user.username }}
                    </b-card-text>

                    <b-card-text class="user-data-email">
                        {{ user.email }}
                    </b-card-text>
                </b-card>
            </b-tab>
            <b-tab
                title="User Tasks"
            >
                <div class="row">
                    <div class="cell">
                        <Autocomplete
                            id="task-autocomplete"
                            :serviceMethod="serviceMethod"
                            :resultToListMappingMethod="resultToListMappingMethod"
                            :renderListItem="renderListItem"
                            :setAutocompleteInputModel="setAutocompleteInputModel"
                            @autocomplete-selected="onTaskSelected"
                            @autocomplete-not-selected="onTaskNotSelect"
                        />
                    </div>

                <div class="cel">
                    <ul class="user-tasks-list" :class="{'card': userTasks.length > 0}">
                        <li
                            v-for="(item, index) in userTasks"
                            :key="index"
                        >
                            <span>{{ item.description }}</span>
                            <span class="delete-task"
                                @click="deleteUserTask(item)"
                            >x</span>
                        </li>
                    </ul>
                </div>
            </div>
            </b-tab>
            <b-tab
                title="Dangerous"
            >
                <button
                    v-if="!isDeleted"
                    type="submit"
                    class="btn btn-danger"
                    v-on:click="onDelete"
                >Delete this user</button>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
import { find } from 'lodash';
import UserService from '@/services/userService';
import TaskService from '@/services/taskService';

import Autocomplete from '@/components/autocomplete/Autocomplete';

const CONFIRMATION_DELETE_MESSAGE = 'Delete this user?';

export default {
    name: 'UserData',
    components: {
        Autocomplete
    },
    props: {
        userid: String
    },
    data () {
        return {
            isLoading: true,
            isDeleted: false,
            user: null,
            userTasks: [],
            serviceMethod: TaskService.getTasksByToken,
            resultToListMappingMethod: function(res) {
                return res.map(item => item);
            },
            renderListItem: function(item) {
                return item && item.description;
            },
            setAutocompleteInputModel: function(item) {
                return item && item.description;
            }
        }
    },
    watch: {
        userTasks (tasks) {
            const payload = {
                userid: this.userid,
                tasks: tasks.map(item => item.id)
            }
            UserService.saveUserTasks(payload);
        }
    },
    created () {
        UserService.getUserAccountData(this.userid)
            .then(async user => {
                this.user = user;

                if(user.tasks) {
                    let tasks = JSON.parse(user.tasks);
                    if(tasks.length > 0) {
                        let userTasks = await TaskService.getTasksByIds(tasks);
                        this.userTasks = userTasks;
                    }
                }
            })
            .catch(error => {
                switch (error.response.status) {
                    case 404:
                        this.$error('User not found');
                        break;
                    default:
                        this.$error('Something went wrong');
                }
            })
            .finally(() => {
                this.isLoading = false;
                /* highlight danger zone tab */
                const dangerZoneLink = this.$el.querySelector(`a[aria-posinset='3']`);
                dangerZoneLink.classList.add('dangerous');
            })
    },
    methods: {
        getSuccessMessage (timer) {
            return `User deleted. You are going to be redirected to users list in ${timer} seconds`;
        },
        onDelete () {
            if (window.confirm(CONFIRMATION_DELETE_MESSAGE)) {
                UserService.deleteUserAccount(this.userid)
                    .then(res => {
                        this.isDeleted = true;

                        let vm = this;
                        let timer = 5;

                        let countDownInterval = setInterval(function traceMessage() {
                            if(timer === 0) {
                                clearInterval(countDownInterval)
                                vm.$router.push({path: '/users'}, () => {})
                            } else {
                                vm.$success(vm.getSuccessMessage(timer));
                                timer--;
                            }
                            return traceMessage;
                        }(), 1000);
                    })
            }
        },
        deleteUserTask (item) {
            UserService.deleteUserTask({
                userid: this.userid,
                taskId: item.id
            }).then(res => {
                let deletedTaskId = res.deletedTaskId;

                if(deletedTaskId === item.id) {
                    let index = this.userTasks.findIndex(task => item.id === task.id);
                    this.userTasks.splice(index, 1); /* or use res.deletedTaskIndex */
                }
            })
        },
        onTaskSelected (task) {
            if(!task) return;

            if(!find(this.userTasks, { id: task.id })) {
                this.userTasks.push(task);
            }
        },
        onTaskNotSelect () {
        }
    }
}
</script>

<style>
.delete-task {
    color: red;
    cursor: pointer;
    margin-left: 15px;
    margin-right: 15px;
}
.user-tasks-list {
    margin-left: 15px;
}
.dangerous {
    color: red;
}
</style>
