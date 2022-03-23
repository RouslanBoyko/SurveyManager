<template>

  <div class="min-h-full">
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="w-8 h-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow"/>
            </div>
            <div class="hidden md:block">
              <div class="flex items-baseline ml-10 space-x-4">
                <router-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.to"
                  active-class="text-white bg-gray-900"
                  :class="[
                    this.$route.name === item.to.name
                    ? ''
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                     'px-3 py-2 rounded-md text-sm font-medium',
                     ]"
                >{{ item.name }}
                </router-link>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="flex items-center ml-4 md:ml-6">


              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3">
                <div>
                  <MenuButton
                    class="flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span class="sr-only">Open user menu</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </MenuButton>
                </div>
                <transition enter-active-class="transition duration-100 ease-out"
                            enter-from-class="opacity-0 transform scale-95"
                            enter-to-class="opacity-100 transform scale-100"
                            leave-active-class="transition duration-75 ease-in"
                            leave-from-class="opacity-100 transform scale-100"
                            leave-to-class="opacity-0 transform scale-95">
                  <MenuItems
                    class="absolute right-0 py-1 mt-2 w-48 bg-white rounded-md ring-1 ring-black ring-opacity-5 shadow-lg origin-top-right focus:outline-none">
                    <MenuItem

                      v-slot="{ active }">
                      <a @click="logout()"
                         :class="['block px-4 py-2 text-sm text-gray-700 cursor-pointer']">Sign out
                      </a>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
          <div class="flex -mr-2 md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="inline-flex justify-center items-center p-2 text-gray-400 bg-gray-800 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block w-6 h-6" aria-hidden="true"/>
              <XIcon v-else class="block w-6 h-6" aria-hidden="true"/>
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <router-link v-for="item in navigation"
                       :key="item.name" as="a"
                       :to="item.to"
                       active-class="text-white bg-gray-900"
                       :class="[
                         this.$route.name === item.to.name
                         ? ''
                         : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                         'block px-3 py-2 rounded-md text-base font-medium'
                         ]"
          >{{ item.name }}
          </router-link>
        </div>
        <div class="pt-4 pb-3 border-t border-gray-700">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-white">{{ user.name }}</div>
              <div class="text-sm font-medium leading-none text-gray-400">{{ user.email }}</div>
            </div>

          </div>
          <div class="px-2 mt-3 space-y-1">
            <DisclosureButton
              as="a"
              @click="logout()"
              class="block px-3 py-2 text-base font-medium text-gray-400 rounded-md cursor-pointer hover:text-white hover:bg-gray-700">
              Sign out
            </DisclosureButton>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <router-view></router-view>
    <Notification />
  </div>
</template>

<script>
import {Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import {MenuIcon, XIcon} from '@heroicons/vue/outline'
import {useStore} from "vuex";
import {computed} from 'vue';
import {useRouter} from "vue-router";
import Notification from "./Notification.vue";

const navigation = [
  {name: 'Dashboard', to: {name: 'Dashboard'}},
  {name: 'Surveys', to: {name: 'Surveys'}},

]

export default {
  components: {
    Notification,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    MenuIcon,
    XIcon,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    function logout() {
      store.dispatch('logout')
        .then(() => {
          router.push({
            name: 'Login'
          })
        })
    }
    return {
      user: computed(() => store.state.user.data),
      navigation,
      logout
    };
  },
}
</script>
