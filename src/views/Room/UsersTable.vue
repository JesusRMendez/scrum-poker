<template>
  <div>
    <b-table striped hover small borderless :items="usersFormatted" :fields="fields">

      <template v-slot:cell(#)="data">
        <b>{{ data.index + 1 }}</b>
      </template>

      <template v-slot:cell(canEdit)="data">
        <div v-if="data.item.canEdit">
          <!--<b-button size="sm" variant="outline-danger" @click="removeUser(data.item.id)">X</b-button>-->
          <b-form inline @submit.prevent="editUserName(data.item.id)">
            <label class="sr-only" for="name">Nombre</label>
            <b-input
              v-model="userName"
              size="sm"
              id="name"
              placeholder="Nombre"
            ></b-input>
            <b-button type="submit" class="ml-2" size="sm" variant="outline-primary">Cambiar Nombre</b-button>
          </b-form>
        </div>
      </template>

    </b-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import users from '@/api/users'
import { localStorageKey } from '@/utils/definitions'

export default {
  name: 'UsersTable',
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      userName: '',
      fields: [
        '#',
        {
          key: 'name',
          label: 'Nombre'
        },
        {
          key: 'canEdit',
          label: 'Acciones'
        }
      ]
    }
  },
  computed: {
    ...mapState(['currentUser', 'currentRoom']),
    usersFormatted () {
      let id = null
      if (this.currentUser) {
        id = this.currentUser.id
      }
      return this.users.map(user => {
        return {
          ...user,
          canEdit: user.id === id
        }
      }).sort((a, b) => b.canEdit - a.canEdit)
    }
  },
  methods: {
    removeUser (id) {
      // console.log(id)
    },
    editUserName (userId) {
      localStorage.setItem(localStorageKey, JSON.stringify(this.userName))
      users.editUserName(this.currentRoom, userId, this.userName)
        .then(() => {
          this.userName = ''
        })
        .catch((err) => {
          this.$bvToast.toast('Error', {
            title: `Error editando nombre: ${err}`,
            variant: 'danger',
            solid: true
          })
        })
    }
  }
}
</script>
