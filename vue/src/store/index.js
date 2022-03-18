import {createStore} from "vuex";
import axiosClient from "../axios";

const tmpSurveys = [
  {
    id: 100,
    title: 'Landscape',
    slug: 'forest',
    status: 'draft',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
    description: 'Nice forest background',
    created_at: '2022-02-20 12:00:00',
    updated_at: '2022-02-20 12:00:00',
    expire_date: '2022-02-31 12:00:00',
    questions: [
      {
        id: 1,
        type: 'select',
        question: 'From which country are you ?',
        description: null,
        data: {
          options: [
            {
              uuid: '206467f6-c786-476d-86e4-add5c234b8fb',
              text: 'Belgium'
            },
            {
              uuid: 'faa0efee-ad22-43ea-a240-2b47c514e2bb',
              text: 'Russia'
            },
            {
              uuid: '87b40aed-0682-4f4c-a114-678e20d0c3e6',
              text: 'Usa'
            },
            {
              uuid: '87b40aed-0682-4f4c-a114-678e20d0c3e6',
              text: 'Germany'
            },
            {
              uuid: 'cbcc0022-5b46-4976-a9d3-7afab22e0289',
              text: 'France'
            },
          ],
        },
      },

      {
        id: 2,
        type: 'checkbox',
        question: 'What is your favorite programming language ?',
        description: 'Nice description',
        data: {
          options: [
            {
              uuid: '206467f6-c786-476d-86e4-add5c234b8fb',
              text: 'JavaScript'
            },
            {
              uuid: 'faa0efee-ad22-43ea-a240-2b47c514e2bb',
              text: 'HTML + CSS'
            },
            {
              uuid: '87b40aed-0682-4f4c-a114-678e20d0c3e6',
              text: 'PHP'
            },
            {
              uuid: '87b40aed-0682-4f4c-a114-678e20d0c3e6',
              text: 'SQL'
            },
            {
              uuid: 'cbcc0022-5b46-4976-a9d3-7afab22e0289',
              text: 'Python'
            },
          ],
        },
      },

      {
        id: 3,
        type: 'checkbox',
        question: 'Which PHP framework is your favorite ?',
        description: 'Nice description',
        data: {
          options: [
            {
              uuid: '206467f6-c786-476d-86e4-add5c234b8fb',
              text: 'Laravel'
            },
            {
              uuid: 'faa0efee-ad22-43ea-a240-2b47c514e2bb',
              text: 'Codeigniter'
            },
            {
              uuid: '87b40aed-0682-4f4c-a114-678e20d0c3e6',
              text: 'Symfony'
            }
          ],
        },
      },

      {
        id: 4,
        type: 'radio',
        question: 'Which Laravel is your favorite ?',
        description: 'Nice description',
        data: {
          options: [
            {
              uuid: '206467f6-c786-476d-86e4-add5c234b8fb',
              text: 'Laravel 5'
            },
            {
              uuid: 'faa0efee-ad22-43ea-a240-2b47c514e2bb',
              text: 'laravel 6'
            },
            {
              uuid: '87b40aed-0682-4f4c-a114-678e20d0c3e6',
              text: 'Laravel 7'
            },
            {
              uuid: '87b40aed-0682-4f4c-a114-678e20d0c3e6',
              text: 'Laravel 8'
            },
            {
              uuid: 'cbcc0022-5b46-4976-a9d3-7afab22e0289',
              text: 'Laravel 9'
            },
          ],
        },
      },

      {
        id: 5,
        type: 'checkbox',
        question: 'Which project is your favorite ?',
        description: 'Nice description',
        data: {
          options: [
            {
              uuid: '206467f6-c786-476d-86e4-add5c234b8fb',
              text: 'REST API'
            },
            {
              uuid: 'faa0efee-ad22-43ea-a240-2b47c514e2bb',
              text: 'E-commerce'
            },
            {
              uuid: '87b40aed-0682-4f4c-a114-678e20d0c3e6',
              text: 'Real Estate'
            },
            {
              uuid: '87b40aed-0682-4f4c-a114-678e20d0c3e6',
              text: 'All of the above'
            },
          ],
        },
      },

      {
        id: 6,
        type: 'text',
        question: 'Super question from db',
        description: null,
        data: {},
      },

      {
        id: 7,
        type: 'textarea',
        question: 'Super question from db 1',
        description: 'Write your honest opinion. Everything is anonymous.',
        data: {},
      },
    ],
  },
  {
    id: 200,
    title: 'Laravel 8',
    slug: 'laravel-8',
    status: 'active',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg',
    description: 'Laravel is a web application framework',
    created_at: '2022-02-15',
    updated_at: '2022-02-15',
    questions: [],
  },
  {
    id: 300,
    title: 'Vue 3',
    slug: 'vue-3',
    status: 'active',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg',
    description: 'Vue is a js framework',
    created_at: '2022-02-15',
    updated_at: '2022-02-15',
    questions: [],
  },
  {
    id: 400,
    title: 'Tailwind 3',
    slug: 'tailwind-3',
    status: 'active',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg',
    description: 'a css framework',
    created_at: '2022-02-15',
    updated_at: '2022-02-15',
    questions: [],
  }
];
const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN'),
    },
    currentSurvey: {
      loading: false,
      data: {}
    },
    surveys: [...tmpSurveys],
    questionTypes: ['text', 'select', 'radio', 'checkbox', 'textarea'],
  },
  getters: {},
  actions: {
    getSurvey({ commit }, id) {
      commit('SetCurrentSurveyLoading', true)
      return axiosClient
        .get(`/survey/${id}`)
        .then((res) => {
          commit('setCurrentSurvey', res.data)
          commit('setCurrentSurveyLoading', false)
          return res
        })
        .catch((err) => {
          commit('setCurrentSurveyLoading', false)
          throw err
        })
    },
    saveSurvey ({ commit }, survey) {
      delete survey.image_url;
      let response
      if (survey.id) {
        response = axiosClient
          .put(`/survey/${survey.id}`, survey)
          .then((res) => {
            commit('setCurrentSurvey', res.data);
            return res;
          })
      } else {
        response = axiosClient.post('/survey', survey).then((res) => {
        commit('setCurrentSurvey', res.data);
        return res;
        })
      }
      return response
    },
    register({commit}, user) {
      return axiosClient.post('/register', user)
        .then(({data}) => {
          commit('setUser', data)
          return data
        })
    },
    login({commit}, user) {
      return axiosClient.post('/login', user)
        .then(({data}) => {
          commit('setUser', data)
          return data
        })
    },
    logout({commit}) {
      return axiosClient.post('/logout')
        .then(response => {
          commit('logout')
          return response
        })
    }
  },
  mutations: {

    setCurrentSurveyLoading: (state, loading) => {
      state.currentSurvey.loading = loading
    },

    setCurrentSurvey: (state, survey) => {
      state.currentSurvey.data = survey.data
    },

    logout: (state) => {
      state.user.token = null;
      state.user.data = {};
      sessionStorage.removeItem('TOKEN');
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem('TOKEN', userData.token);
    }
  },
  modules: {},
});

export default store;
