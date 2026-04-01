<template>
  <svg
    width="24"
    height="19"
    viewBox="0 0 24 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :opacity="color ? 0.5 : 1"
    class="transition-all duration-500"
  >
    <g filter="url(#filter0_d_2939_19382)">
      <path
        d="M8.46817 5.50005L4 10.165V0.834954C4.9711 1.84858 6.86132 3.82424 8.46817 5.50005ZM13.1444 7.99376C12.5093 8.61576 11.4905 8.61576 10.8554 7.99376C10.497 7.61942 9.93056 7.0262 9.26581 6.33509L4.80337 11H19.1964L14.7339 6.33509C14.0692 7.03195 13.497 7.62517 13.1444 7.99376ZM12.3063 7.19898C13.5895 5.86283 17.6705 1.60098 19.2022 0H4.79756C6.3467 1.61834 10.3872 5.83998 11.6935 7.19898C11.7744 7.28033 11.885 7.32641 11.9998 7.32641C12.1147 7.32641 12.2254 7.28033 12.3063 7.19898ZM15.5318 5.49999L20 10.1649V0.829186C19.0463 1.8313 17.1503 3.81257 15.5318 5.49999Z"
        :fill="color ? color : '#FF3435'"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_2939_19382"
        x="0"
        y="0"
        width="24"
        height="19"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2939_19382" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_2939_19382"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
</template>
<script>
export default {
  name: 'EnvelopeIcon',
  props: {
    color: String
  }
}
</script>
