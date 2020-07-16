<template>
  <transition name="modal">
    <div class="popup">
      <div class="popup__wrapper">
        <div class="popup__container">
          <div class="popup__header">
            <span>Popup name</span>
            <span class="close" @click="closePopup"></span>
          </div>
          <div class="popup__content">
              <form @submit="createPerson">
                <div class="row">
                  <div class="col-25">
                    <label for="firstname">firstname</label>
                  </div>
                  <div class="col-75">
                    <input type="text" id="firstname" v-model="person.fname">
                  </div>
                </div>
                <div class="row">
                  <div class="col-25">
                    <label for="lastname">lastname</label>
                  </div>
                  <div class="col-75">
                    <input type="text" id="lastname" v-model="person.lname">
                  </div>
                </div>
                <div class="row">
                  <div class="col-25">
                    <label for="skills">Skills</label>
                  </div>
                  <div class="col-75">
                    <input type="text" id="skills" v-model="person.skills">
                  </div>
                </div>
                <div class="row">
                  <button class="form-btn" type="submit" :disabled="!canCreate">Создать</button>
                </div>
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
  -webkit-transition: opacity 0.3s ease; 
  -moz-transition: opacity 0.3s ease; 
  -o-transition: opacity 0.3s ease;
  /* letter-spacing: 1px; */
}

.popup__wrapper {
  display: table-cell;
  vertical-align: middle;
}

.popup__container {
  width: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  font-size: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
  /* font-family: Helvetica, Arial, sans-serif; */
}

@media screen and (max-width: 576px) {
  .popup__container {
    width: 300px;
    font-size: 18px;
  }

  .popup__header {
    font-size: 20px;
  }
}

.popup__header {
  margin-top: 0;
  font-size: 22px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  /* box-sizing: border-box; */
  /* resize: vertical; */
}

label {
  padding: 12px 0;
  display: inline-block;
}

.form-btn {
  background-color: #4CAF50;
  font-size: 16px;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  letter-spacing: 1px;
}

.form-btn:disabled {
  background-color: #b3b3b3;
}

.popup__content {
  border-radius: 5px;
}

.col-25 {
  float: left;
  width: 30%;
  margin-top: 6px;
}

.col-75 {
  float: left;
  width: 70%;
  margin-top: 6px;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

@media screen and (max-width: 576px) {
  .col-25, .col-75, input {
    width: 100%;
    margin-top: 0;
  }

  label {
    padding: 11px 0 4px;
  }
}

.close {
  position: relative;
  width: 35px;
  height: 37px;
  opacity: 0.3;
  cursor: pointer;
}

.close:hover {
  opacity: 1;
}

.close:before, .close:after {
  position: absolute;
  left: 15px;
  content: ' ';
  height: 33px;
  width: 2px;
  background-color: #333;
}

.close:before {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
}

.close:after {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
}

</style>