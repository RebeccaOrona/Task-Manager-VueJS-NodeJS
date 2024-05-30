<template>
  <v-app>
    <v-navigation-drawer 
      app 
      v-model="drawer" 
      class="custom-drawer"
      clipped
    >
      <v-list>
        <v-list-item-group>
          <v-list-item @click="goToHome">
            <v-list-item-content>
              <v-list-item-title class="custom-title">
                <v-icon class="custom-icon">mdi-home</v-icon>
                Inicio
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="goToTasks">
            <v-list-item-content>
              <v-list-item-title class="custom-title">
                <v-icon class="custom-icon">mdi-format-list-checks</v-icon>
                Tareas
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="goToStatusHistory">
            <v-list-item-content>
              <v-list-item-title class="custom-title">
                <v-icon class="custom-icon">mdi-information</v-icon>
                Historial de estados
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    
    <v-app-bar app class="custom-app-bar">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline">Gestion de Tareas</v-toolbar-title>
    </v-app-bar>
    
    <v-main>
      <v-container class="fill-height" fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      drawer: false,
    };
  },

  methods: {
    goToHome() {
      this.$router.push('/');
    },
    goToTasks() {
      this.$router.push('/api/tasks');
    },
    goToStatusHistory() {
      this.$router.push('/api/statusHistory');
    }
  }
}
</script>

<style scoped>
.custom-drawer {
  background-color: #fbf0f0 !important;
}

.custom-title {
  color: black;
}

.custom-icon {
  color: black;
}
</style>
