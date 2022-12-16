<template>
    <h1 class="text-center">Chats</h1>
    <v-card
        v-for="item in messages"
        :key="item.id"
        width="300"
        :subtitle="item.displayName"
        :text="item.text"
        class="mb-3"
        :class="item.uid === userChat.uid && 'ml-auto'"
        :color="item.uid === userChat.uid ? 'success' : '#1f7087'"
        theme="dark"
    ></v-card>
</template>

<script setup>
import { ref } from "vue";
import { auth, db } from "../firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

const userChat = ref(auth.currentUser);

const messages = ref([]);

const q = query(collection(db, "chats"), orderBy("time"));

const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
            // console.log("Mensaje: ", change.doc.id, change.doc.data());
            messages.value.push({
                id: change.doc.id,
                ...change.doc.data(),
            });
        }
    });
});
</script>
