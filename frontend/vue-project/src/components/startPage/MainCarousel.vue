<script></script>

<template>
  <div id="carouselExample" class="carousel slide d-none d-sm-block">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          src="https://ispot.pl/img/imagecache/pictures/desktop_rotator_Ultra_kupteraz_21-1920x600-nobckgr.webp"
          class="d-block w-100"
          alt="..."
        />
      </div>
      <div class="carousel-item">
        <img
          src="../../../assets/carousel-samsung.png"
          class="d-block w-100"
          alt="..."
        />
      </div>
      <div class="carousel-item">
        <img
          src="https://ispot.pl/img/imagecache/pictures/desktop_rotator_AW9_kupteraz_21-1920x600-nobckgr.webp"
          class="d-block w-100"
          alt="..."
        />
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<style>
.carousel-control-next:hover,
.carousel-control-prev:hover {
  background-color: #444;
}

.carousel-control-prev {
  border-radius: 0 30px 30px 0;
}

.carousel-control-next {
  border-radius: 30px 0 0 30px;
}

.carousel-inner:hover ~ .carousel-control-next,
.carousel-inner:hover ~ .carousel-control-prev {
  background-color: #444;
}
</style>
