<template>
    <v-app>
        <div v-if="userGoogle === false">Loading...</div>
        <v-app-bar color="primary" v-if="userGoogle !== false">
            <v-app-bar-title>VuetifyCHAT</v-app-bar-title>
            <v-btn
                variant="outlined"
                color="white"
                append-icon="mdi-login"
                @click="googleAccess"
                v-if="!userGoogle"
                >Acceder</v-btn
            >
            <v-btn
                variant="outlined"
                color="white"
                append-icon="mdi-logout"
                @click="logout"
                v-if="userGoogle"
                >Salir</v-btn
            >
        </v-app-bar>
        <v-main app v-if="userGoogle !== false">
            <v-container>
                <Chat v-if="userGoogle" />
                <div v-else>
                    <h1 class="text-center mt-5">
                        Debes iniciar sesión para ver los chats
                    </h1>
                </div>
            </v-container>
        </v-main>
        <v-footer class="d-flex flex-column" app v-if="userGoogle !== false">
            <FormAdd />
        </v-footer>
    </v-app>
</template>

<script setup>
import {
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
} from "@firebase/auth";
import { auth } from "./firebase";
import { ref } from "@vue/reactivity";

import Chat from "./components/Chat.vue";
import FormAdd from "./components/FormAdd.vue";

const userGoogle = ref(false);

const googleAccess = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const { user } = await signInWithPopup(auth, provider);
        // console.log(user);
    } catch (error) {
        console.log(error);
    }
};

const logout = async () => {
    await signOut(auth);
};

onAuthStateChanged(auth, (user) => {
    console.log("desde onAuthStateChanged", user);
    userGoogle.value = user;
});
</script>

// Comandos en consola para actualizar la pagina en el servidor de firebase //
npm run build // firebase deploy --only hosting
