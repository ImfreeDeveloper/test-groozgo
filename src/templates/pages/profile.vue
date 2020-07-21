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
          <loader v-if="showLoader" />
          <div class="page-title">
            <p><i class="icon-address-book"></i>&nbsp;Компания</p>
          </div>
          <form @submit.prevent="submitHandler" v-if="!!profile">
            <div class="profile-inn">
              <span>ИНН / КПП : {{ profile.inn }} / {{ profile.kpp }}</span>
              <span>Организация : {{ profile.bank_title }}</span>
            </div>
            <div class="wrp-field">
              <label :class="{'text-warning': $v.countCars.$error || serverErrors.count_trucks.length }">Общее количество машин в собственности*</label>
              <input
                  type="text"
                  placeholder="Общее количество машин в собственности"
                  v-model="countCars"
                  @blur="validateField('countCars')"
                  :class="{'is-danger': $v.countCars.$error || serverErrors.count_trucks.length}"
                  v-mask="'##'"
              />
              <p class="text-warning" v-if="$v.countCars.$error">Необходимо заполнить «Общее количество машин в собственности».</p>
              <div class="errors-server" v-if="serverErrors.count_trucks.length">
                <p class="text-warning" v-for="(error, idx) in serverErrors.count_trucks" :key="idx">{{ error }}</p>
              </div>
            </div>
            <div class="wrp-field">
              <label :class="{'text-warning': $v.postAddress.$error || serverErrors.post_address.length }">Почтовый адрес*</label>
              <input
                  type="text"
                  placeholder="Почтовый адрес"
                  v-model="postAddress"
                  @blur="validateField('postAddress')"
                  :class="{'is-danger': $v.postAddress.$error || serverErrors.post_address.length }"
              />
              <p class="text-warning" v-if="$v.postAddress.$error">Необходимо заполнить «Почтовый адрес».</p>
              <div class="errors-server" v-if="serverErrors.post_address.length">
                <p class="text-warning" v-for="(error, idx) in serverErrors.post_address" :key="idx">{{ error }}</p>
              </div>
            </div>
            <div class="wrp-field">
              <label :class="{'text-warning': $v.site.$error || serverErrors.site.length}">Сайт компании</label>
              <input
                  type="text"
                  placeholder="Сайт компании"
                  v-model="site"
                  @blur="validateField('site')"
                  :class="{'is-danger': $v.site.$error || serverErrors.site.length}"
              />
              <p class="text-warning" v-if="$v.site.$error">Значение «Сайт компании» не является правильным URL.</p>
              <div class="errors-server" v-if="serverErrors.site.length">
                <p class="text-warning" v-for="(error, idx) in serverErrors.site" :key="idx">{{ error }}</p>
              </div>
            </div>
            <div class="wrp-field">
              <label :class="{'text-warning': $v.bik.$error || serverErrors.bik.length}">БИК</label>
              <autocomplete
                  :search="asyncFind"
                  placeholder="БИК"
                  v-mask="'#########'"
                  @blur="validateField('bik')"
                  :class="{'is-danger': $v.bik.$error || serverErrors.bik.length }"
                  :get-result-value="getResultValue"
                  @submit="onSubmit"
                  :value="bik"
              >
                <template #result="{ result, props }">
                  <li
                      v-bind="props"
                      class="autocomplete-result"
                  >
                    <p class="title">
                      {{ result.data.name.payment }}
                    </p>
                    <div class="descr">
                      <p>{{ result.data.bic }}</p>
                      <p>{{ result.data.address.value }}</p>
                    </div>
                  </li>
                </template>
              </autocomplete>
              <p class="text-warning" v-if="$v.bik.$error">Бик должен быть выбран из всплывающей подсказки.</p>
              <div class="errors-server" v-if="serverErrors.bik.length">
                <p class="text-warning" v-for="(error, idx) in serverErrors.bik" :key="idx">{{ error }}</p>
              </div>
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
              <label :class="{'text-warning': $v.bankAccount.$error || serverErrors.bank_account.length }">Номер банковского счета</label>
              <input
                  type="text"
                  v-model="bankAccount"
                  @blur="validateField('bankAccount')"
                  :class="{'is-danger': $v.bankAccount.$error || serverErrors.bank_account.length}"
                  placeholder="Номер банковского счета"
                  v-mask="'####################'"
              />
              <p class="text-warning" v-if="$v.bankAccount.$error">Значение «Номер банковского счета» должно содержать минимум 20 символов.</p>
              <div class="errors-server" v-if="serverErrors.bank_account.length">
                <p class="text-warning" v-for="(error, idx) in serverErrors.bank_account" :key="idx">{{ error }}</p>
              </div>
            </div>
            <div class="wrp-field">
              <label :class="{'text-warning': serverErrors.edo_contracts.length }">Соглашение об электронном взаимодействии</label>
              <div class="wrp-field-files">
                <div class="file-items">
                  <div class="file-wrap" v-for="(attachment, idx) in attachments" :key="idx">
                    <p class="file-name">{{ attachment.name }}</p>
                    <div class="file-btns">
                      <ul>
                        <li v-if="!!attachment.id">
                          <a :href="attachment.link" class="file-view" target="_blank">
                            <i class="icon-search"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#" class="file-delete" @click="deleteAttach(idx)">
                            <i class="icon-trash-empty"></i>
                          </a>
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
            <div class="wrp-field" v-if="serverErrors.edo_contracts.length">
              <label class="text-warning" v-for="(error, idx) in serverErrors.edo_contracts" :key="idx">{{ error }}</label>
            </div>
            <div class="wrp-field">
              <label>Получен оригинал соглашения об электронном взаимодействии</label>
              <p class="wrp-field__static">Нет</p>
            </div>
            <div class="wrp-field">
              <label>Срок действия соглашения об электронном взаимодействии*</label>
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
import { fetchBik, fetchWithAuth } from '../../js/repository/repository'
import loader from '../../components/loader.vue'
import Autocomplete from '@trevoreyre/autocomplete-vue'

export default {
  components: {
    Autocomplete,
    loader
  },
  data () {
    return {
      attachments: [],
      countCars: '',
      bik: '',
      site: '',
      showLoader: false,
      nameBank: '',
      bankAccount: '',
      correspondentAccount: '',
      postAddress: '',
      endpoint: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/bank',
      isSelectedBik: false,
      serverErrors: {
        count_trucks: [],
        post_address: [],
        bik: [],
        bank_title: [],
        corr_account: [],
        bank_account: [],
        site: [],
        edo_contracts: []
      }
    }
  },
  computed: {
    profile () {
      return this.$store.getters.getProfile
    }
  },
  validations: {
    bik: {
      minLength: minLength(9),
      isSelected () {
        return this.isSelectedBik
      }
    },
    bankAccount: {
      minLength: minLength(20)
    },
    site: {
      required,
      validUrl (url) {
        /* eslint-disable */
        let objRE = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i
        return objRE.test(url)
      }
    },
    postAddress: {
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
      this.isSelectedBik = false
      this.bik = query
      if (query.length < 1) {
        this.isSelectedBik = true
        this.nameBank = ''
        this.correspondentAccount = ''
        return []
      }
      let formData = {
        count: 5,
        query
      }
      const bikBanks = await fetchBik('post', this.endpoint, formData)
      return bikBanks.data.suggestions
    },
    getResultValue (result) {
      return result.data.bic
    },
    onSubmit (result) {
      this.nameBank = result.data.name.payment
      this.correspondentAccount = result.data.correspondent_account
      this.bik = result.data.bic
      this.isSelectedBik = true
    },
    async submitHandler () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const filesData = getDataBinary(this.attachments)
        let formData = new FormData()
        formData.append('count_trucks', this.countCars)
        formData.append('post_address', this.postAddress)
        formData.append('bik', this.bik)
        formData.append('bank_title', this.nameBank)
        formData.append('corr_account', this.correspondentAccount)
        formData.append('bank_account', this.bankAccount)
        formData.append('site', this.site)
        for (let i = 0; i < filesData.length; i++) {
          formData.append('edo_contracts[]', filesData[i]);
        }
        this.showLoader = true

        try {
          const updateProfile = await fetchWithAuth('post', '/company-profile', formData)

          if (updateProfile.data.code !== 200) {
            setTimeout(() => {
              const errors = updateProfile.data.errors
              this.serverErrors = { ...this.serverErrors, ...errors }
              this.showLoader = false
            }, 600)
          } else {
            this.showLoader = false
          }
          // const data = dataProfile.data
          // if (data.code === 200) {
          //   commit('setProfile', data.data)
          // } else {
          //   throw data
          // }
        } catch (e) {
          this.showLoader = false
          throw e
        }
      }
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

      this.attachments.push({
        id: null,
        name: 'Новый документ',
        link: file.name,
        new: {
          is: true,
          file
        }
      })
    },
    deleteAttach (id) {
      this.attachments.splice(id, 1)
    }
  },
  watch: {
    bankAccount (v) {
      this.serverErrors.bank_account = []
    },
    countCars (v) {
      this.serverErrors.count_trucks = []
    },
    bik (v) {
      this.serverErrors.bik = []
    },
    site (v) {
      this.serverErrors.site = []
    },
    postAddress (v) {
      this.serverErrors.post_address = []
    },
    attachments (v) {
      this.serverErrors.edo_contracts = []
    }
  },
  async created () {
    await this.$store.dispatch('profile')
    if (this.profile) {
      console.log(this.profile)
      this.countCars = this.profile.count_trucks
      this.nameBank = this.profile.bank_title
      this.correspondentAccount = this.profile.corr_account
      this.postAddress = this.profile.post_address
      this.site = this.profile.site
      this.bik = this.profile.bik
      this.isSelectedBik = !!this.bik
      this.bankAccount = this.profile.bank_account
      this.attachments = this.profile.edo_contracts.map((attach, idx) => {
        return { ...attach, name: `Scan Edo #${idx + 1}`, new: { is: false } }
      })
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

function getDataBinary (attachments) {
  let arrFiles = []
  arrFiles = attachments.map(attach => {
    return attach.new.is ? attach.new.file : null
  }).filter(Boolean)

  return arrFiles
}

</script>
