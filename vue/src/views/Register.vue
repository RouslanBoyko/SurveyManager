<template>
  <div>
    <img class="mx-auto w-auto h-12" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
         alt="Workflow"/>
    <h2 class="mt-6 text-3xl font-extrabold text-center text-gray-900">
      Register for free
    </h2>
    <p class="mt-2 text-sm text-center text-gray-600">
      Or
      {{ ' ' }}
      <router-link :to="{name:'Login'}" class="font-medium text-indigo-600 hover:text-indigo-500">
        login to your account
      </router-link>
    </p>
  </div>
  <form class="mt-8 space-y-6" @submit="register">
    <input type="hidden" name="remember" value="true"/>
    <div class="-space-y-px rounded-md shadow-sm">
      <div>
        <label for="fullname" class="sr-only">Email address</label>
        <input id="fullname" name="name" type="text" autocomplete="name" required="" v-model="user.name"
               class="block relative px-3 py-2 w-full placeholder-gray-500 text-gray-900 rounded-none rounded-t-md border border-gray-300 appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
               placeholder="Full name"/>
      </div>
      <div>
        <label for="email-address" class="sr-only">Email address</label>
        <input id="email-address" name="email" type="email" autocomplete="email" required="" v-model="user.email"
               class="block relative px-3 py-2 w-full placeholder-gray-500 text-gray-900 rounded-none border border-gray-300 appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
               placeholder="Email address"/>
      </div>
      <div>
        <label for="password" class="sr-only">Password</label>
        <input id="password" name="password" type="password" autocomplete="current-password" required="" v-model="user.password"
               class="block relative px-3 py-2 w-full placeholder-gray-500 text-gray-900 rounded-none border border-gray-300 appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
               placeholder="Password"/>
      </div>
      <div>
        <label for="password_confirmation" class="sr-only">Password Confirmation</label>
        <input id="password_confirmation" name="password_confirmation" type="password" autocomplete="current-password_confirmation" required="" v-model="user.password_confirmation"
               class="block relative px-3 py-2 w-full placeholder-gray-500 text-gray-900 rounded-none rounded-b-md border border-gray-300 appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
               placeholder="Password Confirmation"/>
      </div>
    </div>

    <div>
      <button type="submit"
              class="flex relative justify-center px-4 py-2 w-full text-sm font-medium text-white bg-indigo-600 rounded-md border border-transparent group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="flex absolute inset-y-0 left-0 items-center pl-3">
              <LockClosedIcon class="w-5 h-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true"/>
            </span>
        Sign up
      </button>
    </div>
  </form>
</template>

<script setup>
import {LockClosedIcon} from '@heroicons/vue/solid'
import store from "../store";
import {useRouter} from "vue-router";

const router = useRouter();
const user = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
};

function register(ev) {
  ev.preventDefault();
  store
    .dispatch('register', user)
    .then((res) => {
      router.push({
        name:'Dashboard'
      })
    })
}

</script>
