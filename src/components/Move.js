import { Box } from "@mui/material";


const Move = (props) => {


  return (

    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column' }}>
      <div className="data">Изменение входных данных.</div>
      <label>Время перемещения в сек:</label>
      <input
        type="number"
        onChange={(e) => props.setSpeed(e.target.value)}
        value={props.speed}
      />
      <label>Координата по оси X:</label>
      <input
        type="number"
        onChange={(e) => props.setNewX(e.target.value)}
        value={props.NewX}
      />
      <label>Координата по оси Y:</label>
      <input
        type="number"
        onChange={(e) => props.setNewY(e.target.value)}
        value={props.NewY}
      />
      <label>Угол поворота в градусах:</label>
      <input
        type="number"
        onChange={(e) => props.setANG(e.target.value)}
        value={props.ANG}
      />
    </Box >


  )
}
export default Move