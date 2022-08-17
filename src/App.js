import { useEffect, useState } from 'react';
import './App.css';
import Move from './components/Move';

function App() {


  const [arr, setArr] = useState([])


  let x = 200
  let y = 60
  let angle = 0

  const speed = 2 // время перемещения и поворота в секундах
  const ANG = 30 * Math.PI / 180 // угол поворота
  let x1 = 540 
  let y1 = 20

  function square(ctx, x, y) {
    ctx.beginPath();
    ctx.rect(x, y, 100, 120);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
  }


// Перемещение квадрата

  function moveTo(x1, y1, speed) {

    const start = new Date()

    let dx = (x1 - x) / speed / 60
    let dy = (y1 - y) / speed / 60

    function draw() {

      const end = new Date()
      let diff = end - start

      setArr([...arr, { time: diff, coords: [Math.round(x), Math.round(y)] }])


      const canvas = document.getElementById('elSquare')
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      x += dx
      y += dy;
      square(ctx, x, y)
      if (Math.round(x) <= x1) {
        requestAnimationFrame(draw)
      }
    }
    requestAnimationFrame(draw)
  }

// Поворот квадрата 
  function turnTo(speed, angle) {

    const start = new Date()
    let dAngle = ANG / speed / 60

    function turn() {

      const end = new Date()
      let diff = end - start
      setArr([...arr, { time: diff, coords: [Math.round(angle / (Math.PI / 180))] }])

      const canvas = document.getElementById('elSquare')
      const ctx = canvas.getContext('2d')

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      angle += dAngle
      ctx.rotate(dAngle);
      square(ctx, x, y)

      if (angle.toFixed(2) <= ANG.toFixed(2)) {
        requestAnimationFrame(turn)
      }
      else {
        ctx.rotate(-ANG);
      }
    }
    requestAnimationFrame(turn)
  }

// Ускорение и торможение квадрата по оси X

  function animate({ timing, draw, duration, flag }) {


    let start = performance.now()
    const st = new Date()

    let boost  = 2*(x1-x)/Math.pow(speed, 2)
    requestAnimationFrame(function animate(time) {
     
      let timeFraction = (time - start) / duration
      if (timeFraction > 1) timeFraction = 1
      if (timeFraction < 0) timeFraction = 0

      let progress = timing(timeFraction)

    if (flag === 'Ускорение') {
      let dx = (boost * Math.pow(speed * progress, 2))/2 
      x = dx + 200
    }
   
      else if (flag === 'Торможение') {
        let dx = (boost * Math.pow(speed * (1-progress), 2))/2 
        x = x1 - dx
      }
      draw(progress, st)

      if (timeFraction < 1) {
        requestAnimationFrame(animate)
      }

    });
  }

// Функция отрисовки квадрата при торможении, ускорении
  function draw(progress, start) {
    const canvas = document.getElementById('elSquare')
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const end = new Date()
    let diff = end - start

    setArr([...arr, { time: diff, coords: [Math.round(x), Math.round(y)] }])
    square(ctx, x, y)
  }
// Функция анимации (линейная)
  function timing(timeFraction) {
    return timeFraction
  }


  useEffect(() => {
    const canvas = document.getElementById('elSquare')
    const ctx = canvas.getContext('2d')
    square(ctx, x, y)
  }, [])


  return (
    <div className="App" style={{ display: 'flex' }}>

      <canvas id='elSquare' width={700} height={400}>

      </canvas>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <button onClick={() => moveTo(x1, y1, speed)}>Переместить</button>
        <Move />
        <button onClick={() => turnTo(speed, angle)}>Повернуть</button>
        <button onClick={(e) => animate({ timing, draw, duration: speed*1000, flag: e.target.innerHTML })}>
          Ускорение</button>
         <button onClick={(e) => animate({ timing, draw, duration: speed*1000, flag: e.target.innerHTML })}>
          Торможение</button>
      </div>

      <ul>
        <span className="nameList">Массивы значений, для промежутка времени.</span>
        {
          arr.map((a, i) => (
            <li key={i}> Время: {a.time} мс,
              {
                a.coords.length > 1
                  ? <span>координаты [{a.coords[0]}, {a.coords[1]}]</span>
                  : <span>угол поворота [{a.coords[0]}°]</span>
              }
            </li>
          ))
        }
      </ul>

    </div>
  );
}

export default App;
