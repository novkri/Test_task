<template>
  <div class="container" id="app" >
    <div class="popup" v-if="isShowPopupVisible">
      <div class="popup__wrapper" ref="popup__wrapper">
        <div class="popup__container">
          <div class="popup__header">
            <span>{{btnName}}</span>
            <span class="close" @click="closeAddPopup">X</span>
          </div> <!-- popup__header -->
          <div class="popup__content">
            <form v-if="popupContent == 'add'" @submit="createPerson">
                <div class="row">
                  <div class="col-30">
                    <label for="firstname">Имя</label>
                  </div>
                  <div class="col-70">
                    <input type="text" id="firstname" v-model="person.fname">
                  </div>
                </div>
                <div class="row">
                  <div class="col-30">
                    <label for="lastname">Фамилия</label>
                  </div>
                  <div class="col-70">
                    <input type="text" id="lastname" v-model="person.lname">
                  </div>
                </div>
                <div class="row">
                  <div class="col-30">
                    <label for="skills">Навыки</label>
                  </div>
                  <div class="col-70">
                    <input type="text" id="skills" v-model="person.skills">
                  </div>
                </div>
                <div class="row">
                  <button class="form-btn" type="submit" :disabled="!canCreate">Создать</button>
                </div>
            </form> <!-- form add -->

            <!-- in progress... -->
            <div v-if="popupContent == 'edit'">
              <div class="popup__wrapper-small">
                <!-- <div class="row">
                  <div class="col-30">ID</div>
                  <div class="col-70">{{personId.id}}</div>
                </div>
                <div class="row">
                  <div class="col-30">Имя</div>
                  <div class="col-70">{{personId.fname}}</div>
                </div>
                <div class="row">
                  <div class="col-30">Фамилия</div>
                  <div class="col-70">{{personId.lname}}</div>
                </div>
                <div class="row">
                  <div class="col-30">Навыки</div>
                  <div class="col-70">{{personId.skills}}</div>
                </div>   -->
                <form v-if="popupContent == 'edit'" @submit="editPerson(personId.id)">
                  <div class="row">
                    <div class="col-30">
                      <label for="firstname">Имя</label>
                    </div>
                    <div class="col-70">
                      <input type="text" id="firstname" v-model="personId.fname">
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-30">
                      <label for="lastname">Фамилия</label>
                    </div>
                    <div class="col-70">
                      <input type="text" id="lastname" v-model="personId.lname">
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-30">
                      <label for="skills">Навыки</label>
                    </div>
                    <div class="col-70">
                      <input type="text" id="skills" v-model="personId.skills">
                    </div>
                  </div>
                  <div class="row">
                    <button class="form-btn" type="submit">Создать</button>
                  </div>
              </form> <!-- form edit -->
              </div>
            </div> <!-- form edit -->

            <div v-if="popupContent == 'delete'" >
              <div class="popup__wrapper-small">
                <div class="row">
                  <div class="col-30">ID</div>
                  <div class="col-70">{{personId.id}}</div>
                </div>
                <div class="row">
                  <div class="col-30">Имя</div>
                  <div class="col-70">{{personId.fname}}</div>
                </div>
                <div class="row">
                  <div class="col-30">Фамилия</div>
                  <div class="col-70">{{personId.lname}}</div>
                </div>
                <div class="row">
                  <div class="col-30">Навыки</div>
                  <div class="col-70">{{personId.skills}}</div>
                </div>  
              </div>
              <br>
              <div class="delete__buttons">
                <span class="form-btn yes" @click="removePerson(personId.id)">Да</span>
                <span class="form-btn no" @click="closeAddPopup">Нет</span>
              </div>
            </div> <!-- form delete -->
          </div> <!-- popup__content --> 

        </div> <!-- popup__container --> 
      </div> <!-- popup__wrapper --> 
      
    </div> <!-- popup --> 

  <!-- <h1 class="header">Заголовок</h1> -->
  <div class="wrapper">
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Skills</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="person in people" :key="person.id" >
          <td data-title="ID">{{ person.id }}</td>
          <td data-title="First Name">{{ person.fname }}</td>
          <td data-title="Last Name">{{ person.lname }}</td>
          <td data-title="Skills">{{ person.skills }}</td>
          <td data-title="Edit"><button @click="showPopupEdit(person.id)" class="form__btn edit-btn">Edit</button></td>
          <td data-title="Delete"><button @click="showPopupDelete(person.id)" class="form__btn delete-btn">Delete</button></td>
        </tr>
      </tbody>
    </table>
    <button class="show__popup" @click="showPopupAdd">Создать</button>
  </div> <!-- div.wrapper -->
</div>
</template>

<script>
import axios from 'axios';

const baseURL = "http://localhost:3000/people"

export default {
  name: 'list',
  data() {
    return {
      btnName: '',
      popupContent: '',
      isShowPopupVisible: false,
      personId: null,
      people: [],
      person: {
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
  mounted() {
    let vm = this
    document.addEventListener('click', function(item) {
      if (item.target === vm.$refs['popup__wrapper']) {
        vm.closeAddPopup()
      }
    })
  },
  async created() {
    try {
      const res = await axios.get(baseURL)
      this.people = res.data
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    async createPerson() {
      const newPerson = await axios.post(baseURL, {fname: this.person.fname, lname: this.person.lname, skills: this.person.skills})
      this.people.push(newPerson)
      this.person.fname = this.person.lname = ''
    },
    showPopupAdd() {
      this.isShowPopupVisible = true
      this.btnName = "Добавить сотрудника"
      this.popupContent = "add"
    },
    showPopupEdit(id) {
      this.isShowPopupVisible = true
      this.btnName = "Редактировать сотрудника"
      this.popupContent = "edit"
      const contact = this.people.find(c => c.id === id)
      this.personId = contact
    },
    showPopupDelete(id) {
      this.isShowPopupVisible = true
      this.btnName = "Удалить сотрудника"
      this.popupContent = "delete"
      const contact = this.people.find(c => c.id === id)
      this.personId = contact
    },
    closeAddPopup() {
      this.isShowPopupVisible = false
    },
    async editPerson(id) {
      const contact = this.people.find(c => c.id === id)
      this.isShowPopupVisible = true
      this.btnName = "Редактирование"
      this.popupContent = "edit"
      await axios.patch(baseURL + `/${id}`, {fname: contact.fname, lname: contact.lname, skills: contact.skills})
    },
    async removePerson(id) {
      this.isShowPopupVisible = true
      this.btnName = "Удалить сотрудника?"
      this.popupContent = "delete"
      
      await axios.delete(baseURL + `/${id}`)
      this.isShowPopupVisible = false
      this.people =  this.people.filter(c => c.id !== id)
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
}

body {
  margin: 0;
  padding: 20px;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table td,
.table th {
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: center;
}

.table th {
  background-color: rgba(105, 105, 105, 0.562);
  color: #fff;
  font-size: 16px;
}

.table tbody tr:nth-child(even){
  background-color: #f5f5f5;
}

@media screen and (max-width: 576px) {
  .table thead {
    display: none;
  }

  .table, .table tbody, .table tr, .table td {
    display: block;
    width: 100%;
  }

  .table tr {
    margin-bottom: 15px;
  }

  .table td {
    text-align: right;
    padding-left: 50%;
    position: relative;
  }

  .table td::before {
    content: attr(data-title);
    position: absolute;
    left: 0;
    width: 50%;
    padding-left: 15px;
    font-size: 15px;
    font-weight: bold;
    text-align: left;
  }
}

.show__popup {
  padding: 15px 35px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;

  margin-top: 25px;
  
  -webkit-transition-duration: 0.4s; 
  -moz-transition-duration: 0.4s;
  -o-transition-duration: 0.4s;
  -ms-transition-duration: 0.4s;
  transition-duration: 0.4s;

  background-color: white;
  color: black;
  border: 2px solid #4CAF50;
  border-radius: 5px;
}

.show__popup:hover, .show__popup:active {
    background-color: #4CAF50; 
    color: white;
}

@media screen and (max-width: 576px) {
  .header {
    visibility: hidden;
  }
  .show__popup {
    position: absolute;
    top: 0;
    right: 21px;
  }
}

.form__btn {
  padding: 10px 15px;

  -webkit-transition-duration: 0.4s; 
  -moz-transition-duration: 0.4s;
  -o-transition-duration: 0.4s;
  -ms-transition-duration: 0.4s;
  transition-duration: 0.4s;

  background-color: white;
  color: black;
  border: 1.5px solid #9e9e9e;
  border-radius: 5px;
}
.edit-btn:hover, .edit-btn:active {
  background-color: rgb(174, 181, 248);
}
.delete-btn:hover, .delete-btn:active  {
  background-color: rgb(253, 131, 131);
}

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
  -ms-transition: opacity 0.3s ease; 
  -o-transition: opacity 0.3s ease;
}

.popup__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
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
  -ms-transition: opacity 0.3s ease; 
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
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
  font-size: 16px;
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

.col-30 {
  float: left;
  width: 30%;
  margin-top: 6px;
}

.col-70 {
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
  .col-30, .col-70, input {
    width: 100%;
    margin-top: 0;
  }

  label {
    padding: 11px 0 4px;
  }
}

.close {
  opacity: 0.3;
  cursor: pointer;
}

.close:hover {
  opacity: 1;
}

.popup__wrapper-small {
  width: 100%;
  margin-top: 15px;
  text-align: start
}

.delete__row {
  margin: 10px 0;
}

.delete__buttons {
  display: flex;
    justify-content: space-between;
}

.delete__buttons .form-btn {
  padding: 10px;
  border-radius: 5px;
  width: 110px;
  text-align: center;
  background-color: #fff;
  color: #000;
}

.yes {
  border: 2px solid #f44336;
} 

.no {
  border: 2px solid #4CAF50;
}

.yes:hover, .yes:active {
  background-color: #f44336;
  color: #fff;
} 

.no:hover, .no:active {
  background-color: #4CAF50;
  color: #fff;
}

@media screen and (max-width: 576px) {
  .delete__answer {
    width: 50%;
  }
}
</style>
