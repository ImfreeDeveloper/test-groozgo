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
            <p class="wrp-field">
              <label>Общее количество машин в собственности</label>
              <input
                  type="text"
                  placeholder="Номер телефона"
              />
              <span class="popover popover-right">Введите корректный номер телефона</span>
            </p>
            <p class="wrp-field">
              <input
                  type="password"
                  placeholder="Пароль"
              />
              <span class="popover popover-right">Введите пароль</span>
            </p>
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
