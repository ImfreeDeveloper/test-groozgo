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
              <label :class="{'text-warning': $v.postAddress.$error }">Почтовый адрес</label>
              <input
                  type="text"
                  placeholder="Почтовый адрес"
                  v-model="postAddress"
                  @blur="validateField('postAddress')"
                  :class="{'is-danger': $v.postAddress.$error}"
              />
              <p class="text-warning" v-if="$v.postAddress.$error">Необходимо заполнить «Почтовый адрес».</p>
            </div>
            <div class="wrp-field">
              <label :class="{'text-warning': $v.site.$error }">Сайт компании</label>
              <input
                  type="text"
                  placeholder="Сайт компании"
                  v-model="site"
                  @blur="validateField('site')"
                  :class="{'is-danger': $v.site.$error}"
              />
              <p class="text-warning" v-if="$v.site.$error">Значение «Сайт компании» не является правильным URL.</p>
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
              <label :class="{'text-warning': $v.bankAccount.$error }">Номер банковского счета</label>
              <input
                  type="text"
                  v-model="bankAccount"
                  @blur="validateField('bankAccount')"
                  :class="{'is-danger': $v.bankAccount.$error}"
                  placeholder="Номер банковского счета"
                  v-mask="'####################'"
              />
              <p class="text-warning" v-if="$v.bankAccount.$error">Значение «Номер банковского счета» должно содержать минимум 20 символов.</p>
            </div>
            <div class="wrp-field">
              <label>Соглашение об электронном взаимодействии</label>
              <div class="wrp-field-files">
                <div class="file-items">
                  <div class="file-wrap" v-for="(attachment, idx) in attachments" :key="idx">
                    <p class="file-name">{{ attachment.name }}</p>
                    <div class="file-btns">
                      <ul>
<!--                        <li v-if="!!attachment.id">-->
<!--                          <a :href="attachment.link" download="attachment" class="file-download">-->
<!--                            <i class="icon-download-alt"></i>-->
<!--                          </a>-->
<!--                        </li>-->
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
import {fetchBik, fetchWithAuth} from '../../js/repository/repository'

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
      site: '',
      nameBank: '',
      bankAccount: '',
      correspondentAccount: '',
      postAddress: '',
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
    bankAccount: {
      minLength: minLength(20)
    },
    site: {
      required
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
      if (query) {
        let formData = {
          count: 5,
          query
        }
        const bikBanks = await fetchBik('post', this.endpoint, formData)
        this.dataOptionsBik = bikBanks.data.suggestions
      }
    },
    async submitHandler () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        let formData = {
          count_trucks: this.countCars,
          post_address: this.postAddress,
          bik: this.bik.data.bic,
          bank_title: this.nameBank,
          corr_account: this.correspondentAccount,
          bank_account: this.bankAccount,
          site: this.site,
          edo_contracts: getDataBinary(this.attachments)
        }

        console.log(formData)

        try {
          const dataProfile = await fetchWithAuth('post', '/company-profile', formData)
          console.log(dataProfile)
          // const data = dataProfile.data
          // if (data.code === 200) {
          //   commit('setProfile', data.data)
          // } else {
          //   throw data
          // }
        } catch (e) {
          throw e
        }
      }
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

      this.attachments.push({
        id: null,
        name: 'Новый документ',
        link: file.name,
        new: {
          is: true,
          file
        }
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
      this.postAddress = this.profile.post_address
      this.site = this.profile.site
      this.bik = {
        data: {
          bic: this.profile.bik
        },
        value: this.profile.bank_title
      }
      this.attachments = this.profile.edo_contracts.map((attach, idx) => {
        return { ...attach, name: `Scan Edo #${idx + 1}`, new: { is: false } }
      })

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

function getDataBinary (attachments) {
  let formDataArr = []
  let arrFiles = attachments.map(attach => {
    return attach.new.is ? attach.new.file : null
  }).filter(Boolean)
  if (arrFiles.length) {
    arrFiles.forEach(fl => {
      let formData = new FormData()
      formData.append(fl.name, fl)
      formDataArr.push(formData)
    })
  }

  return formDataArr
}

</script>
