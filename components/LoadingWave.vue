<template>
  <div class="cssload-bell">
    <div class="cssload-circle">
      <div class="cssload-inner"></div>
    </div>
    <div class="cssload-circle">
      <div class="cssload-inner"></div>
    </div>
    <div class="cssload-circle">
      <div class="cssload-inner"></div>
    </div>
    <div class="cssload-circle">
      <div class="cssload-inner"></div>
    </div>
    <div class="cssload-circle">
      <div class="cssload-inner"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .cssload-bell {
    border-radius: 100%;
    left: calc(50% - 49px);
  }

  .cssload-circle {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .cssload-circle .cssload-inner {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: 5px solid rgba(129, 212, 250, 0.8);
    border-right: none;
    border-top: none;
    background-clip: padding;
    box-shadow: inset 0px 0px 10px rgba(225, 245, 254, 0.3);

    @media screen and (max-width: 540px) {
      border: 3px solid rgba(129, 212, 250, 0.8);
    }
  }

  .cssload-circle:nth-of-type(0) {
    transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
  }
  .cssload-circle:nth-of-type(0) .cssload-inner {
    animation: cssload-spin 2.6s infinite linear;
    -o-animation: cssload-spin 2.6s infinite linear;
    -ms-animation: cssload-spin 2.6s infinite linear;
    -webkit-animation: cssload-spin 2.6s infinite linear;
    -moz-animation: cssload-spin 2.6s infinite linear;
  }

  .cssload-circle:nth-of-type(1) {
    transform: rotate(70deg);
    -o-transform: rotate(70deg);
    -ms-transform: rotate(70deg);
    -webkit-transform: rotate(70deg);
    -moz-transform: rotate(70deg);
  }
  .cssload-circle:nth-of-type(1) .cssload-inner {
    animation: cssload-spin 2.6s infinite linear;
    -o-animation: cssload-spin 2.6s infinite linear;
    -ms-animation: cssload-spin 2.6s infinite linear;
    -webkit-animation: cssload-spin 2.6s infinite linear;
    -moz-animation: cssload-spin 2.6s infinite linear;
  }

  .cssload-circle:nth-of-type(2) {
    transform: rotate(140deg);
    -o-transform: rotate(140deg);
    -ms-transform: rotate(140deg);
    -webkit-transform: rotate(140deg);
    -moz-transform: rotate(140deg);
  }
  .cssload-circle:nth-of-type(2) .cssload-inner {
    animation: cssload-spin 2.6s infinite linear;
    -o-animation: cssload-spin 2.6s infinite linear;
    -ms-animation: cssload-spin 2.6s infinite linear;
    -webkit-animation: cssload-spin 2.6s infinite linear;
    -moz-animation: cssload-spin 2.6s infinite linear;
  }

  .cssload-bell {
    animation: cssload-spin 6.5s infinite linear;
    -o-animation: cssload-spin 6.5s infinite linear;
    -ms-animation: cssload-spin 6.5s infinite linear;
    -webkit-animation: cssload-spin 6.5s infinite linear;
    -moz-animation: cssload-spin 6.5s infinite linear;
  }

  @keyframes cssload-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @-o-keyframes cssload-spin {
    from {
      -o-transform: rotate(0deg);
    }
    to {
      -o-transform: rotate(360deg);
    }
  }

  @-ms-keyframes cssload-spin {
    from {
      -ms-transform: rotate(0deg);
    }
    to {
      -ms-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes cssload-spin {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  @-moz-keyframes cssload-spin {
    from {
      -moz-transform: rotate(0deg);
    }
    to {
      -moz-transform: rotate(360deg);
    }
  }
</style>
