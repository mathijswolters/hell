<template>
  <div class="container-class">
    <div class="flex flex-col gap-10">
      <form class="ban-form">
        <h2>BAN</h2>
        <div class="form-alert">User DeanCortez is not banned</div>
        <label for="">Time (in minutes /-1 for permanent)</label>
        <input type="number" placeholder="0">
        <label for="">Reason</label>
        <input type="text" placeholder="Enter Reason...">
        <button>BAN DEANCORTEZ</button>
      </form>
      <form class="ban-form">
        <h2>SELF BAN</h2>
        <div class="form-alert banned">User DeanCortez is site banned</div>
        <label for="">Time (in minutes /-1 for permanent)</label>
        <input type="number" placeholder="0">
        <label for="">Reason</label>
        <input type="text" placeholder="Enter Reason...">
        <button class="green">UNBAN DEANCORTEZ</button>
      </form>
      <form class="ban-form">
        <h2>MUTE</h2>
        <div class="form-alert">User DeanCortez is not muted</div>
        <label for="">Time (in minutes /-1 for permanent)</label>
        <input type="number" placeholder="0">
        <label for="">Reason</label>
        <input type="text" placeholder="Enter Reason...">
        <button>MUTE DEANCORTEZ</button>
      </form>
      <form class="ban-form">
        <h2>TICKET BAN</h2>
        <div class="form-alert banned">User DeanCortez is ticket banned</div>
        <label for="">Time (in minutes /-1 for permanent)</label>
        <input type="number" placeholder="0">
        <label for="">Reason</label>
        <input type="text" placeholder="Enter Reason...">
        <button class="green">UNBAN DEANCORTEZ</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "BanForms",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.ban-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px 15px;
  border: 1px solid #FF3435;
}
.ban-form h2 {
    font-size: 16px;
    color: white;
    font-weight: 800;
}
.ban-form .form-alert {
    font-size: 14px;
    color: white;
    font-weight: 500;
    background: #413c1e;
    text-align: center;
    padding: 12px;
}
.ban-form .form-alert.banned {
    background: rgba(76, 1, 1, 1);
}
.ban-form label {
    font-size: 14px;
    color: white;
    font-weight: 600;
}
.ban-form input::placeholder {
    color: white;
}
.ban-form input {
    font-size: 16px;
    font-weight: 500;
    background: #991313;
    padding: 12px;
    border-radius: 2px;
}
.ban-form button {
    font-size: 16px;
    color: white;
    font-weight: 800;
    background: #FF3435;
    padding: 12px;
    border-radius: 2px;
    margin-top: 10px;
}
.ban-form button.green {
    background: #04AB53;
}
</style>
