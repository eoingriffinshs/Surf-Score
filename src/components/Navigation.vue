

<template>

  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-auto bg-light sticky-top">
        <div class="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center sticky-top">
          <a >
              <img src="/src/assets/logo.svg" alt="Logo" width="100" height="100">
          </a>
          <ul class="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center justify-content-between w-100 px-3 align-items-center">
            <li class="nav-item">

              <a href="/" class="nav-link py-3 px-2" title="Home" data-bs-toggle="tooltip" data-bs-placement="right">
                <i class="bi-house icon"></i>
              </a>

            </li>
            <li>
              <a href="/scoring" class="nav-link py-3 px-2" title="Scoring" data-bs-toggle="tooltip" data-bs-placement="right">
                <i class="bi-speedometer2 icon"></i>
              </a>
            </li>
            <li>
              <a href="/results" class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Orders">
                <i class="bi-table icon"></i>
              </a>
            </li>
            <li>
              <a href="/New-Comp" class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Products">
                <i class="bi bi-database-add icon"></i>
              </a>
            </li>
            <li>
              <a href="/edit-competitions" class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Customers">
                <i class="bi-people icon"></i>
              </a>
            </li>
          </ul>
<!--          <div class="dropdown">
            <a href="#" class="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi-person-circle h2"></i>
            </a>
            <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
              <li><a class="dropdown-item" href="#">New project...</a></li>
              <li><a class="dropdown-item" href="#">Profile</a></li>
            </ul>
          </div>-->
        </div>
      </div>

    </div>
  </div>
</template>
<script setup>


</script>
<style scoped>
.navbar ul {
  list-style-type: none;
  padding: 0;
}

.navbar li {
  margin: 0.5rem 0;
}

.navbar a {
  color: #ffffff; /* Change the text color of the links */
  text-decoration: none;
  font-size: 1.2rem;
  display: block;
  padding: 0.5rem 1rem;
}

.navbar a:hover {
  background-color: #555; /* Change the background color of links on hover */
}
</style>