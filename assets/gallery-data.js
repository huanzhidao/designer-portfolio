function numberedAssets(prefix, count) {
  return Array.from({ length: count }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return `assets/${prefix}-full-${number}.webp`;
  });
}

window.caseGalleries = {
  tuni: [
    "assets/tuni-gallery-01.webp",
    "assets/tuni-motion-redblue.mp4",
    "assets/tuni-gallery-02.webp",
    "assets/tuni-motion-01.mp4",
    "assets/tuni-gallery-03.webp",
    "assets/tuni-gallery-04.webp",
  ],
  wigomat: [
    "assets/wigomat-zcool-01.jpg",
    "assets/wigomat-zcool-02.jpg",
    "assets/wigomat-zcool-03.gif",
    "assets/wigomat-zcool-04.jpg",
    "assets/wigomat-zcool-05.gif",
    "assets/wigomat-zcool-06.jpg",
    "assets/wigomat-zcool-07.gif",
    "assets/wigomat-zcool-08.jpg",
    "assets/wigomat-zcool-09.gif",
    "assets/wigomat-zcool-10.jpg",
    "assets/wigomat-zcool-11.jpg",
    "assets/wigomat-zcool-12.png",
    "assets/wigomat-zcool-13.png",
    "assets/wigomat-zcool-14.png",
    "assets/wigomat-zcool-15.png",
    "assets/wigomat-zcool-16.png",
    "assets/wigomat-zcool-17.png",
    "assets/wigomat-zcool-18.png",
    "assets/wigomat-zcool-19.png",
    "assets/wigomat-zcool-20.png",
    "assets/wigomat-zcool-21.png",
    "assets/wigomat-zcool-22.jpg",
  ],
  bosch: numberedAssets("bosch", 28),
  sondy: numberedAssets("sondy", 28),
  curvymoon: numberedAssets("curvymoon", 28),
  lieren: numberedAssets("lieren", 28),
  peripheral: numberedAssets("peripheral", 39),
  dishwasher: numberedAssets("dishwasher", 28),
  g45: numberedAssets("g45", 28),
  watch: numberedAssets("watch", 28),
  avata: numberedAssets("avata", 28),
  keyboard: numberedAssets("keyboard", 28),
};
