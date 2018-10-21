<template>
    <div class="container">
        <!-- Show all players row starts -->
        <div class="row">
          <div class="col-lg-12">
            <div>
                    <button @click="openModal('Add player')" class="btn btn-primary btn-block" data-toggle="modal" data-target="#modelId">Add new player <i class="fas fa-plus-circle"></i></button>
                </div>
          </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <table class="table table-light table-hover">
                    <thead class="thead-dark">
                        <tr>
                            <!-- <th scope="col">DB ID</th> -->
                            <th scope="col">Shirt #</th>
                            <th scope="col">Name</th>
                            <th scope="col">Position</th>
                            <th scope="col">Skills</th>
                            <th scope="col">Status</th>
                            <th scope="col">Delete / Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(currentPlayer) in players" :key="currentPlayer._id">
                            <td>{{currentPlayer.shirtNumber}}</td>
                            <td>{{currentPlayer.name}}</td>
                            <td>{{currentPlayer.position}}</td>
                            <td>{{currentPlayer.skills}}</td>
                            <td>{{currentPlayer.status}}</td>
                            <td>
                                <button @click="deletePlayer(currentPlayer._id)" type="button" class="btn btn-danger btn-sm"><i class="fas fa-minus-circle"></i></button>
                                <button @click="openModal('Update player',currentPlayer._id)" type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#modelId"><i class="fas fa-highlighter"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <hr>
            </div>
        </div>

        <!-- Add/Update Player Modal -->
        <div class="modal fade" id="modelId" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="modelTitleId">{{modalTitle}}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>

                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <form>
                                <div class="form-group text-left">
                                    <label for="Shirt Number">Shirt Number</label>
                                    <input type="number" class="form-control" id="shirtNumber" v-model.number="player.shirtNumber" placeholder="Shirt number" min="1" max="99" required/>
                                    <label for="Name">Name</label>
                                    <input type="text" class="form-control" v-model="player.name" placeholder="Name">
                                    <label for="Position">Position</label>
                                    <input type="text" class="form-control" v-model="player.position" placeholder="Position">
                                    <label for="Skills">Skills</label>
                                    <input type="text" class="form-control" v-model="player.skills" placeholder="Skills">
                                    <label for="Status">Status</label>
                                    <input type="text" class="form-control" v-model="player.status" placeholder="Status">
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button @click="modalTitle == 'Add player' ? addPlayer() : updatePlayer()" type="submit" class="btn btn-success" data-dismiss="modal">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import axios from 'axios';

    export default {
        name: 'ShowPlayers',
        data() {
            return {
                modalTitle: null,
                playerBackup: null,
                players: null,
                player: {
                    "name": "",
                    "position": "",
                    "skills": "",
                    "shirtNumber": "",
                    "status": ""
                }
            }
        },
        mounted() {
            axios.get('http://localhost:3000/players/')
                .then(response => {
                    // console.log(response);
                    this.players = response.data
                })
        },
        methods: {
            openModal: function(title, playerId) {

                if (title == 'Update player') {
                    // Find player to update
                    this.player = this.players.filter(function(player) {
                        return player._id == playerId;
                    })[0];

                    // Set modal title
                    this.modalTitle = title + ' ' + this.player.name;

                    // Create a copy of player
                    this.playerBackup = JSON.stringify(this.player);
                } else if (title == 'Add player') {
                    this.modalTitle = title;
                    this.player = {
                        "name": "",
                        "position": "",
                        "skills": "",
                        "shirtNumber": "",
                        "status": ""
                    }
                }

            },
            addPlayer: function() {
                axios.post('http://localhost:3000/players/', this.player)
                    .then(response => {
                        // console.log(response.data);
                        this.player._id = response.data._id;
                        this.players.push(this.player);
                    })
            },
            updatePlayer: function() {
                console.log(this.title);
                axios.patch('http://localhost:3000/players/' + this.player._id, this.player)
                    .then(response => {
                        console.log(response);
                        if (response.status !== 200) {
                            // Revert changes 
                            this.currentPlayer = this.playerBackup;
                            // Close modal

                        }

                    })
            },
            removePlayer: function(id) {
                this.players = this.players.filter(function(player) {
                    return player._id !== id
                })
            },
            deletePlayer: function(id) {
                console.log(id)
                axios.delete('http://localhost:3000/players/' + id)
                    .then(response => {
                        this.removePlayer(id);
                    })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .container {
  font-family: 'Poppins', sans-serif!important;
}
    
    h1,
    h2 {
        font-weight: normal;
    }
    
    ul {
        list-style-type: none;
        padding: 0;
    }
    
    li {
        display: inline-block;
        margin: 0 10px;
    }
    
    a {
        color: #42b983;
    }
</style>