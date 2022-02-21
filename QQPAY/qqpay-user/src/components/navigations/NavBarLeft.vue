<template>
  <header id="header" class="d-flex flex-column justify-content-center">
    <nav id="navbar" class="navbar nav-menu">
      <ul>
        <li>
          <b-link @click="$router.push('/')" class="nav-link active"
            ><b-icon icon="house-door" aria-hidden="true"></b-icon>
            <span>Home</span></b-link
          >
        </li>
        <li>
          <b-link @click="$router.push('/transaction')" class="nav-link"
            ><b-icon icon="lightning" aria-hidden="true"></b-icon> <span>Fund Transfer</span></b-link
          >
        </li>
        <li>
          <b-link @click="$router.push('/beneficiarysummary')" class="nav-link"
            ><b-icon icon="people" aria-hidden="true"></b-icon> <span>Beneficiary</span></b-link
          >
        </li>
        <li>
          <b-link @click="$router.push('/settings')" class="nav-link"
            ><b-icon icon="gear" aria-hidden="true"></b-icon> <span>Settings</span></b-link
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "NavBarLeft",
};
</script>

<style>
.navbar {
  padding: 0.5rem 1rem !important;
}
#header {
  position: fixed;
  top: 66px;
  left: 0;
  bottom: 0;
  z-index: 1040;
  transition: all 0.5s;
  padding: 0;
  overflow-y: auto;
}
@media (max-width: 992px) {
  #header {
    width: 300px;
    background: #fff;
    border-right: 1px solid #e6e9ec;
    left: -300px;
  }
}

@media (min-width: 992px) {
  #main {
    margin-left: 100px;
  }
}


.nav-menu {
  padding: 0;
  display: block;
}
.nav-menu * {
  margin: 0;
  padding: 0;
  list-style: none;
}
.nav-menu > ul > li {
  position: relative;
  white-space: nowrap;
}
.nav-menu a,
.nav-menu a:focus {
  display: flex;
  align-items: center;
  color: #45505b;
  padding: 10px 18px;
  margin-bottom: 8px;
  transition: 0.3s;
  font-size: 15px;
  border-radius: 50px;
  background: #f2f3f5;
  height: 56px;
  width: 100%;
  overflow: hidden;
  transition: 0.3s;
}
.nav-menu a i,
.nav-menu a:focus i {
  font-size: 20px;
}
.nav-menu a span,
.nav-menu a:focus span {
  padding: 0 5px 0 7px;
  color: #45505b;
}
@media (min-width: 992px) {
  .nav-menu a,
  .nav-menu a:focus {
    width: 56px;
  }
  .nav-menu a span,
  .nav-menu a:focus span {
    display: none;
    color: #fff;
  }
}
.nav-menu a:hover,
.nav-menu .active,
.nav-menu .active:focus,
.nav-menu li:hover > a {
  color: #fff;
  background: #FF6B00;
}
.nav-menu a:hover span,
.nav-menu .active span,
.nav-menu .active:focus span,
.nav-menu li:hover > a span {
  color: #fff;
}
.nav-menu a:hover,
.nav-menu li:hover > a {
  width: 100%;
  color: #fff;
}
.nav-menu a:hover span,
.nav-menu li:hover > a span {
  display: block;
}
</style>