<template>
  <div class="wrapper-page">
    <ul class="page-breadcrumb">
      <li>Профиль</li>
    </ul>
    <div class="container">
      <div class="row">
        <div class="profile">
          <h2>КОМПАНИЯ</h2>
          <form @submit.prevent="submitHandler">
            <div class="wrp-field">
              <label>Общее количество машин в собственности</label>
              <input
                  type="text"
                  placeholder="Номер телефона"
              />
              <p class="popover right">Введите корректный номер телефона</p>
            </div>
            <div class="wrp-field">
              <input
                  type="password"
                  placeholder="Пароль"
              />
              <p class="popover right">Введите пароль</p>
            </div>
            <button class="btn btn-secondary">
              Сохранить
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
