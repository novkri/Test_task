<template>
  <transition name="modal">
    <div class="popup">
      <div class="popup__wrapper">
        <div class="popup__container">
          <div class="popup__header">
            <span>Popup name</span>
            <span>
              <i
                class="material-icons"
                @click="closePopup"
              >close</i>
            </span>
          </div>
          <div class="popup__content">
              <form class="form-inline" @submit="createPerson">
                <div class="form-group">
                    <label for="firstname">firstname</label>
                    <input type="text" class="form-control" id="firstname" v-model="person.fname">
                </div>
                <div class="form-group">
                    <label for="lastname">lastname</label>
                    <input type="text" class="form-control" id="lastname" v-model="person.lname">
                </div>
                <div class="form-group">
                    <label for="skills">skill...</label>
                    <input type="text" class="form-control" id="skills" v-model="person.skills">
                </div>

                <button class="btn btn-primary" type="submit" :disabled="!canCreate">Создать</button>
            </form>

            <slot></slot>
          </div>

        </div>
      </div>
      
    </div>
  </transition>
</template>

<script>
import axios from 'axios';

export default {
    name: 'popup',
    props: ['value'],
    data() {
      return {
        person: {
        // id: '',
        fname: '',
        lname: '',
        skills: ''
      },
      contacts: []
      }
    },
    computed: {
      canCreate() {
        return this.person.fname.trim() && this.person.lname.trim()
      }
    },
    methods: {
      closePopup() {
        this.$emit('closePopup')
      },
      async createPerson() {
        const {...contact} = this.person
        console.log(contact);

        const res = await axios.post("http://localhost:3000/people", {fname: this.person.fname, lname: this.person.lname, skills: this.person.skills})

        this.people.push(res)

        this.person.fname = this.person.lname = ''
      }
    }
}
</script>

<style scoped>


.popup {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;

}

.popup__wrapper {
  display: table-cell;
  vertical-align: middle;
}

.popup__container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.popup__header {
  margin-top: 0;
  color: #42b983;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.popup__container-body {
  margin: 20px 0;
}

.popup__header i {
  cursor: pointer;
  float: right;
}

form {
  padding: 5px;
}

input {
  margin-bottom: 5px;
}

</style>