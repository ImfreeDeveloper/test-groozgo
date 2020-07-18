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
          <form @submit.prevent="submitHandler">
            <div class="profile-inn">
              <span>ИНН / КПП : 5027234975 / 502701001</span>
              <span>Организация : ООО "РД ТРАНСПОРТ"</span>
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
              <label>БИК</label>
              <input
                  type="text"
                  placeholder="БИК"
              />
              <p class="text-warning">Бик должен быть выбран из всплывающей подсказки.</p>

            </div>
            <div class="wrp-field">
              <label>Наименование Банка</label>
              <input
                  type="text"
                  placeholder="Наименование Банка"
                  disabled
              />
            </div>
            <div class="wrp-field">
              <label>Корреспондентский счет</label>
              <input
                  type="text"
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
                <div class="file-item">
                  <div class="file-wrap">
                    <p class="file-name">Scan Edo #1</p>
                    <div class="file-btns">
                      <ul>
                        <li>
                          <p class="file-download">
                            <i class="icon-download-alt"></i>
                          </p>
                        </li>
                        <li>
                          <p class="file-view">
                            <i class="icon-search"></i>
                          </p>
                        </li>
                        <li>
                          <p class="file-delete">
                            <i class="icon-trash-empty"></i>
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <button class="btn btn-secondary btn-secondary-hover-transparent">
                    &#10010;
                  </button>
                </div>
                <button class="btn btn-secondary-transparent">
                  Скачать шаблон
                </button>
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
            <button class="btn btn-secondary btn-secondary-hover-transparent">
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

export default {
  data () {
    return {
      countCars: ''
    }
  },
  validations: {
    countCars: {
      required,
      minLength: minLength(1)
    }
  },
  methods: {
    validateField (vmfield) {
      this.$v[vmfield].$touch()
    }
  }
}
</script>
