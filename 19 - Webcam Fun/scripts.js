const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function openCamera() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream);
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      console.error(`Enable Camera`, err);
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    var pixels = ctx.getImageData(0, 0, width, height);
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  const time = new Date(Date.now());
  link.setAttribute('download', `Image ${time.getDate()}-${time.getMonth()}-${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`);
  link.innerHTML = `<img src="${data}" alt="Captured Image" />`;
  strip.insertBefore(link, strip.firstChild);
}

openCamera();
video.addEventListener('canplay', paintToCanvas);