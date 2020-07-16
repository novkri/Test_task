<template>
  <div class="container" id="app" >
    <Popup 
      v-if="isShowPopupVisible"
      @closePopup="closeAddPopup"
      v-model="contacts"
    >
    
    </Popup>
  <!-- <h1 class="header">Заголовок</h1> -->
  <div class="wrapper">
    <table class="table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Skills</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="person in people" :key="person.id" >
          <td data-title="First Name">{{ person.fname}}</td>
          <td data-title="Last Name">{{ person.lname}}</td>
          <td data-title="Skills">{{ person.skills}}</td>
          <td data-title="Edit"><button @click="editPerson(person.id)" class="form__btn edit-btn">Edit</button></td>
          <td data-title="Delete"><button @click="removePerson(person.id)" class="form__btn delete-btn">Delete</button></td>
        </tr>
      </tbody>
    </table>
    <button class="show__popup" @click="showPopupAdd">Создать</button>
  </div> <!-- div.wrapper -->
  <!-- <button class="show__popup" @click="showPopupAdd">Создsать</button> -->
</div>
</template>

<script>
import axios from 'axios';
import Popup from '../components/Popup'

const baseURL = "http://localhost:3000/people"

export default {
  name: 'list',
  data() {
    return {
      isShowPopupVisible: false,
      people: [],
      person: {
        // id: '',
        fname: '',
        lname: '',
        skills: ''
      },
      contacts: []
    }
  },
  components: {
    Popup
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
    showPopupAdd() {
      this.isShowPopupVisible = true
    },
    closeAddPopup() {
      this.isShowPopupVisible = false
    },

    async editPerson(id) {
      const contact = this.people.find(c => c.id === id)
      console.log(contact);
      // const updated = await fetch(`/api/contacts/${id}`, 'PUT', {
      //   ...contact, 
      //   marked: true
      // })
      // contact.marked = updated.marked
    },
    async removePerson(id) {
      const contact = this.people.find(c => c.id === id)
      await axios.delete(baseURL+`/${id}`, contact)
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
}

body {
  margin: 0;
  padding: 20px;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}

/* .wrapper {
  background-color: blueviolet;
} */

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
</style>
