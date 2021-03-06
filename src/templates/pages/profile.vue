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
            <field-input
              label="Общее количество машин в собственности*"
              v-model="countCars"
              placeholder="Общее количество машин в собственности"
              :validError="$v.countCars.$error"
              validErrorText="Необходимо заполнить «Общее количество машин в собственности»."
              :serverError="serverErrors.count_trucks"
              :setMask="'##'"
              @blur="validateField('countCars')"
            />
            <field-input
              hintLabel="Пожалуйста, заполните почтовый адрес, и документы по перевозкам будут доставлены максимально быстро."
              label="Почтовый адрес*"
              v-model="postAddress"
              placeholder="Почтовый адрес"
              :validError="$v.postAddress.$error"
              validErrorText="Необходимо заполнить «Почтовый адрес»."
              :serverError="serverErrors.post_address"
              @blur="validateField('postAddress')"
            />
            <field-input
              label="Сайт компании"
              v-model="site"
              placeholder="Сайт компании"
              :validError="$v.site.$error"
              validErrorText="Значение «Сайт компании» не является правильным URL."
              :serverError="serverErrors.site"
              @blur="validateField('site')"
            />
            <field-input-autocomplete
              label="БИК"
              placeholder="БИК"
              :validError="$v.bik.$error"
              validErrorText="Бик должен быть выбран из всплывающей подсказки."
              :serverError="serverErrors.bik"
              :setMask="'#########'"
              @blur="validateField('bik')"
              @submit="onSubmitAutocomplete"
              v-model="bik"
            />
            <field-input
              label="Наименование Банка"
              v-model="nameBank"
              placeholder="Наименование Банка"
              :validError="$v.nameBank.$error"
              validErrorText="Необходимо заполнить «Наименование Банка»."
              :serverError="serverErrors.bank_title"
              @blur="validateField('nameBank')"
              disabled
            />
            <field-input
              label="Корреспондентский счет"
              v-model="correspondentAccount"
              placeholder="Корреспондентский счет"
              :validError="$v.correspondentAccount.$error"
              validErrorText="Необходимо заполнить «Корреспондентский счет»."
              :serverError="serverErrors.corr_account"
              @blur="validateField('correspondentAccount')"
              disabled
            />
            <field-input
              label="Номер банковского счета"
              v-model="bankAccount"
              placeholder="Номер банковского счета"
              :validError="$v.bankAccount.$error"
              validErrorText="Неккоректный номер счета"
              :serverError="serverErrors.bank_account"
              @blur="validateField('bankAccount')"
              :setMask="'####################'"
            />
            <field-input-attach
              hintLabel="Распечатайте указанный документ из приветственного письма или профиля, подпишите у уполномоченного лица вашей компании (лица, имеющего права действовать без доверенности от имени компании, либо лица, наделенного полномочиями по взаимодействию с GroozGo). Прикрепите документ в профиль или отправьте в ответе на приветственное письмо, направленное после регистрации. После этого ваша компания сможет совершать юридически значимые действия на сервисе GroozGo – заключать договоры, размещать и/или принимать к исполнению заказы на перевозку"
              label="Соглашение об электронном взаимодействии"
              v-model="attachments"
              :edoContractLink = profile.edo_contract_link
              :serverError="serverErrors.edo_contracts"
            />
            <div class="wrp-field">
              <label>
                Получен оригинал соглашения об электронном взаимодействии
                <hint
                  hintLabel="Если оригинал не получен - значение «Нет»"
                />
              </label>
              <p class="wrp-field__static">
                {{ profile.edo_original ? 'Да': 'Нет' }}
              </p>
            </div>
            <div class="wrp-field">
              <label>
                Срок действия соглашения об электронном взаимодействии*
                <hint
                    hintLabel="Срок устанавливается при проверке скан-копии или оригинала Соглашения об электронном взаимодействии. До получения оригинала срок – 30 дней с даты проверки скан-копии"
                />
              </label>
              <p class="wrp-field__static">
                {{ profile.edo_date ? profile.edo_date: 'Нет' }}
              </p>
            </div>
            <div class="wrp-field">
              <label>
                Статус подписания документов ЭДО
                <hint
                    hintLabel="Если вы отказались от подписания договоров и соглашений и/или не предоставили соглашение об электронном взаимодействии - значение «Не подписаны»"
                />
              </label>
              <p class="wrp-field__static">
                {{ profile.edo_scan_checked ? 'Подписаны': 'Не подписаны' }}
              </p>
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
import { fetchWithAuth } from '../../js/repository/repository'
import loader from '../../components/loader.vue'
import fieldInput from '../../components/inputs/field-input.vue'
import fieldInputAutocomplete from '../../components/inputs/field-input-autocomplete.vue'
import fieldInputAttach from '../../components/inputs/field-input-attach.vue'
import hint from '../../components/hint.vue'

export default {
  components: {
    loader,
    fieldInput,
    fieldInputAutocomplete,
    fieldInputAttach,
    hint
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
    nameBank: {
      minLength: minLength(3)
    },
    correspondentAccount: {
      minLength: minLength(20)
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
    onSubmitAutocomplete (result) {
      this.nameBank = result.data.name.payment
      this.correspondentAccount = result.data.correspondent_account
      this.bik = result.data.bic
      this.isSelectedBik = true
    },
    async submitHandler () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const filesData = getDataFiles(this.attachments)
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
          const data = updateProfile.data

          if (data.code !== 200) {
            setTimeout(() => {
              const errors = data.errors
              this.serverErrors = { ...this.serverErrors, ...errors }
              this.showLoader = false
            }, 600)
          } else {
            setTimeout(() => {
              this.showLoader = false
              this.$store.commit('setProfile', data.data)
              this.$store.commit('setSuccess', data)
            }, 600)
          }
        } catch (e) {
          this.showLoader = false
          throw e
        }
      }
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
      if (v.length < 9) {
        this.isSelectedBik = false
      }
      if (v.length < 1) {
        this.isSelectedBik = true
        this.nameBank = ''
        this.correspondentAccount = ''
      }
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
    },
    profile(value) {
      this.attachments = getFilesFormatted(value.edo_contracts)
    }
  },
  async mounted () {
    if (!this.profile) {
      this.showLoader = true
      await this.$store.dispatch('profile')
      setTimeout(() => {
        this.showLoader = false
      }, 600)
    }
    if (this.profile) {
      this.countCars = this.profile.count_trucks
      this.nameBank = this.profile.bank_title
      this.correspondentAccount = this.profile.corr_account
      this.postAddress = this.profile.post_address
      this.site = this.profile.site
      this.bik = this.profile.bik
      this.isSelectedBik = !!this.bik
      this.bankAccount = this.profile.bank_account
      this.attachments = getFilesFormatted(this.profile.edo_contracts)
    }
  }
}

function getDataFiles (attachments) {
  let arrFiles = []
  arrFiles = attachments.map(attach => {
    return attach.new.is ? attach.new.file : null
  }).filter(Boolean)

  return arrFiles
}

function getFilesFormatted(files) {
  return files.map((attach, idx) => {
    return { ...attach, name: `Scan Edo #${idx + 1}`, new: { is: false } }
  })
}

</script>
