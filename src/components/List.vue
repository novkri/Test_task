<template>
  <div class="container" id="app" v-cloak>
    <Popup 
      v-if="isShowPopupVisible"
      @closePopup="closeAddPopup"
      v-model="contacts"
    >
    
    </Popup>
  <!-- <h1>Заголовок</h1> -->
  <table class="people__table">
    <thead class="people__table-header">
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Skills</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody class="people__table-body">
      <tr v-for="person in people" :key="person.id" >
        <td>{{ person.fname}}</td>
        <td>{{ person.lname}}</td>
        <td>{{ person.skills}}</td>
        <td><button @click="editPerson(person.id)" class="people__table-edit">Edit</button></td>
        <td><button @click="removePerson(person.id)" class="people__table-delete">Delete</button></td>
      </tr>
    </tbody>
  </table>
  <button class="show__popup" @click="showPopupAdd">Создать</button>
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
td {
  padding: 8px;
}

</style>