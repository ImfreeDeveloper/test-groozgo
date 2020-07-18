<template>
  <div class="wrapper-page">
    <div class="page-bar">
      <ul class="page-breadcrumb">
        <li>Профиль</li>
      </ul>
    </div>
    <div class="container">
      <div class="row">
        <div class="profile">
          <div class="page-title">
            <p><i class="icon-address-book"></i>&nbsp;Компания</p>
          </div>
          <form @submit.prevent="submitHandler" v-if="!!profile">
            <div class="profile-inn">
              <span>ИНН / КПП : {{ profile.inn }} / {{ profile.kpp }}</span>
              <span>Организация : {{ profile.bank_title }}</span>
            </div>
            <div class="wrp-field">
              <label :class="{'text-warning': $v.countCars.$error }">Общее количество машин в собственности*</label>
              <input
                  type="text"
                  placeholder="Общее количество машин в собственности"
                  v-model="countCars"
                  @blur="validateField('countCars')"
                  :class="{'is-danger': $v.countCars.$error}"
                  v-mask="'##'"
              />
              <p class="text-warning" v-if="$v.countCars.$error">Необходимо заполнить «Общее количество машин в собственности».</p>
            </div>
            <div class="wrp-field">
              <label>Почтовый адрес</label>
              <input
                  type="text"
                  placeholder="Почтовый адрес"
              />
              <p class="text-warning">Необходимо заполнить «Почтовый адрес».</p>
            </div>
            <div class="wrp-field">
              <label>Сайт компании</label>
              <input
                  type="text"
                  placeholder="Сайт компании"
              />
              <p class="text-warning">Значение «Сайт компании» не является правильным URL.</p>
            </div>
            <div class="wrp-field">
              <label :class="{'text-warning': $v.bik.$error }">БИК</label>
              <multiselect
                  v-model="$v.bik.$model"
                  track-by="value"
                  deselect-label="Удалить"
                  label="value"
                  :options="dataOptionsBik"
                  :allow-empty="false"
                  :show-labels="false"
                  :hide-selected="false"
                  placeholder="БИК"
                  @select="selectedBik"
                  :internal-search="false"
                  :max-height="280"
                  v-mask="'#########'"
                  :option-height="75"
                  @close="validateField('bik')"
                  @search-change="asyncFind"
                  :class="{'is-danger': $v.bik.$error}"
              >
                <template slot="singleLabel" slot-scope="{ option }">
                  <span>{{ option.data ? option.data['bic'] : '' }}</span>
                </template>
                <template slot="option" slot-scope="props">
                  <div class="option__desc">
                    <span class="option__title">{{ props.option.value }}</span>
                    <span class="option__small">{{ props.option.data.bic }} {{ props.option.data.address.value }}</span>
                  </div>
                </template>
                <span slot="noResult">Не найдено</span>
                <span slot="noOptions">Введите БИК</span>
                <span slot="beforeList">Выберите вариант или продолжите ввод</span>
              </multiselect>
              <p class="text-warning" v-if="$v.bik.$error">Бик должен быть выбран из всплывающей подсказки.</p>

            </div>
            <div class="wrp-field">
              <label>Наименование Банка</label>
              <input
                  type="text"
                  v-model="nameBank"
                  placeholder="Наименование Банка"
                  disabled
              />
            </div>
            <div class="wrp-field">
              <label>Корреспондентский счет</label>
              <input
                  type="text"
                  v-model="correspondentAccount"
                  placeholder="Корреспондентский счет"
                  disabled
              />
            </div>
            <div class="wrp-field">
              <label>Номер банковского счета</label>
              <input
                  type="text"
                  placeholder="Номер банковского счета"
              />
              <p class="text-warning">Неккоректный номер счета</p>
              <p class="text-warning">Значение «Номер банковского счета» должно содержать минимум 20 символов.</p>
            </div>
            <div class="wrp-field">
              <label>Соглашение об электронном взаимодействии</label>
              <div class="wrp-field-files">
                <div class="file-items">
                  <div class="file-wrap" v-for="(attachment, idx) in attachments" :key="idx">
                    <p class="file-name">{{ attachment.name }}</p>
                    <div class="file-btns">
                      <ul>
                        <li v-if="!!attachment.id">
                          <p class="file-download">
                            <i class="icon-download-alt"></i>
                          </p>
                        </li>
                        <li v-if="!!attachment.id">
                          <p class="file-view">
                            <i class="icon-search"></i>
                          </p>
                        </li>
                        <li>
                          <p class="file-delete" @click="deleteAttach(idx)">
                            <i class="icon-trash-empty"></i>
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="file-attach">
                    <button class="btn btn-secondary btn-secondary-hover-transparent">
                      &#10010;
                      <input
                          id="file"
                          type="file"
                          name="title"
                          @change="fileInputChange"
                      />
                    </button>
                  </div>
                </div>
                <a :href="profile.edo_contract_link" target="_blank" class="btn btn-secondary-transparent" >
                  Скачать шаблон
                </a>
              </div>
            </div>
            <div class="wrp-field">
              <label>Получен оригинал соглашения об электронном взаимодействии</label>
              <p class="wrp-field__static">Нет</p>
            </div>
            <div class="wrp-field">
              <label>Срок действия соглашения об электронном взаимодействии</label>
              <p class="wrp-field__static">Нет</p>
            </div>
            <div class="wrp-field">
              <label>Статус подписания документов ЭДО</label>
              <p class="wrp-field__static">Не подписаны</p>
            </div>
            <button type="submit" class="btn btn-secondary btn-secondary-hover-transparent">
              Сохранить
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import multiselect from 'vue-multiselect'
import { fetchBik } from '../../js/repository/repository'

export default {
  components: {
    multiselect
  },
  data () {
    return {
      attachments: [],
      countCars: '',
      dataOptionsBik: [],
      bik: {},
      nameBank: '',
      correspondentAccount: '',
      endpoint: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/bank'
    }
  },
  computed: {
    profile () {
      console.log(this.$store.getters.getProfile)
      return this.$store.getters.getProfile
    }
  },
  validations: {
    bik: {
      required
    },
    countCars: {
      required,
      minLength: minLength(1)
    }
  },
  methods: {
    validateField (vmfield) {
      this.$v[vmfield].$touch()
    },
    async asyncFind (query) {
      if (query) {
        let formData = {
          count: 5,
          query
        }
        const bikBanks = await fetchBik('post', this.endpoint, formData)
        this.dataOptionsBik = bikBanks.data.suggestions
      }
    },
    submitHandler () {
      let formData = {
        bik: this.bik
      }
      console.log(formData)
    },
    selectedBik (value) {
      this.nameBank = value.data.name.payment
      this.correspondentAccount = value.data.correspondent_account
    },
    async fileInputChange (obj) {
      let file = obj.target.files[0]
      if (!file) return false
      // this.showLoader = true
      let failName = file.name
      let mas = failName.split('.')
      let lastElem = mas.length - 1

      if (!validEXT(mas[lastElem])) {
        alert('Данный тип файла не поддерживается системой. Пожалуйста, выберите другой файл (pdf, jpeg, jpg, png).')
        obj.target.value = ''
        this.showLoader = false
        return false
      }

      if (!validSize(file)) {
        alert('Превышен максимальный размер файла 2 мб!')
        obj.target.value = ''
        this.showLoader = false
        return false
      }
      // let data = new FormData()
      // data.append('attachment', file)

      console.log(file)

      this.attachments.push({
        id: null,
        name: limitString(file.name, 27),
        link: file.name
      })

      // try {
      //   let upload = await Repository.post('upload-file', data)
      //
      //   if (upload.status === 200) {
      //     setTimeout(() => {
      //       this.$store.commit('setAnswer', {
      //         id: this.dataAnswer.id,
      //         field: 'attachments',
      //         value: upload.data.id
      //       })
      //       this.attachments.push({
      //         id: upload.data.id,
      //         name: limitString(upload.data.name, 27),
      //         url: upload.data.url
      //       })
      //       this.showLoader = false
      //     }, 600)
      //   }
      // } catch (error) {
      //   alert('Ошибка загрузки файла')
      //   this.showLoader = false
      //   console.log(error)
      // }
    },
    deleteAttach (id) {
      this.attachments.splice(id, 1)
    }
  },
  async created () {
    await this.$store.dispatch('profile')
    if (this.profile) {
      this.countCars = this.profile.count_trucks
      this.nameBank = this.profile.bank_title
      this.correspondentAccount = this.profile.corr_account
      this.bik['value'] = this.profile.bik
      // this.bik['value'] = this.profile.bank_account
      // this.countCars = this.profile.post_address
    }
  }
}

// Проверка расширения файлов при добавлении
function validEXT (ext) {
  if (!ext) return false
  let mas = ['pdf', 'jpeg', 'jpg', 'png']
  for (let i = 0; i < mas.length; i++) {
    if (mas[i] === ext) return true
  }
  return false
}

// Проверка размера добавляемого файла
function validSize (obj) {
  var osize = obj.size
  return !((osize > 2 * 1024 * 1024))
}

function limitString (name, limit) {
  return name.length <= limit ? name : name.substr(0, limit - 3) + '...'
}

</script>
