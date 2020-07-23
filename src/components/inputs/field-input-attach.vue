<template>
  <div class="wrp-field">
    <label :class="{'text-warning': serverError.length }">{{ label }}</label>
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
                <a href="#" class="file-delete" @click.prevent="deleteAttach(idx)">
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

      <a :href="edoContractLink" target="_blank" class="btn btn-secondary-transparent" >
        Скачать шаблон
      </a>
    </div>
    <div v-if="serverError.length">
      <label class="text-warning" v-for="(error, idx) in serverError" :key="idx">{{ error }}</label>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      attachments: []
    }
  },
  props: [
    'edoContractLink',
    'value',
    'serverError',
    'label'
  ],
  methods: {
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
        alert('Размер файла должен быть от 10 кб до 2 мб!')
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
      this.$emit('input', this.attachments)
    },
    deleteAttach (id) {
      this.attachments.splice(id, 1)
    }
  },
  watch: {
    value (v) {
      this.attachments = v
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
  return !((osize > 2 * 1024 * 1024) || (osize < 10 * 1024))
}
</script>
