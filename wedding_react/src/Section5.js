import React, {useState} from 'react';
import { TextField, Button, FormControl } from '@material-ui/core';
import { withStyles} from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './App.css';

const CssTextField = withStyles({
    root: {
        width: '100%',
        marginTop: '5px',
      '& label.Mui-focused': {
        color: '#BDD3E1',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#BDD3E1',
      },
      '& .MuiOutlinedInput-inputMarginDense': {
        padding: '4px',
      },
      '& .MuiOutlinedInput-root': {
          padding: '4px',
        '& fieldset': {
          borderColor: 'rgba(0, 0, 0, 0.23);',
          fontDisplay: "'Poiret One', cursive"
        },
        '&:hover fieldset': {
          borderColor: '#BDD3E1',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#BDD3E1',
        },
      },
    },
  })(TextField);


function StyledRadio(props) {
    return (
      <Radio
        disableRipple
        checkedIcon={<FavoriteIcon />}
        icon={<FavoriteBorderIcon />}
        {...props}
      />
    );
  }

function Section5(props) {

    const [name, setName] = useState('');
    const [assent, setAssent] = useState('yes');
    const [persons, setPersons] = useState(0);
    const [couple, setCouple] = useState('');
    const [food, setFood] = useState('без предпочтений');
    const [drinks, setDrinks] = useState('без предпочтений');
    const [comm, setComm] = useState('');
    const [errorName, setErrorName] = useState(false)
    const [errorCouple, setErrorCouple] = useState(false);
    const [end, setEnd] = useState(null);
    const [foodOpen, setFoodOpen] = useState(false);
    const [personOpen, setPersonOpen] = useState(false);
    const [drinkOpen, setDrinksOpen] = useState(false)

    const send = () => {

        if (!name) 
            setErrorName(true);
        if (persons !== 0 && !couple.length) 
            setErrorCouple(true);
        if (!name || (persons !== 0 && !couple.length)) return;
       
        fetch('/submit', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                comm: comm,
                approving: assent === 'yes',
                name: name,
                food: food,
                water: drinks,
                guests: persons,
                guestsNames: persons === 0 ? '-' : couple
            })
        }).then(result => {
            setEnd(true);
            if (props.scroll) {
                let y = document.body.clientHeight;
                window.scrollTo(0, y)
            }
        }).catch(error => {
            setEnd(false);
            if (props.scroll) {
                let y = document.body.clientHeight;
                window.scrollTo(0, y)
            }
        })
    }

    return <div className="Section5">
        <div className="Section5-form">
                <p style={{marginTop: 0, marginBottom: '3px', textAlign: "center"}}>
                    Пожалуйста, заполните форму ниже, чтобы мы смогли сделать праздник более комфортным!
                </p>
                <p style={{textAlign: "center"}}>
                    P.S. Возможны проблемы при отправке формы на устройствах iOS. Пожалуйста, свяжитесь с нами удобным для Вас способом, мы будем рады лишний раз пообщаться!
                </p>
                <CssTextField 
                    label="Ваши имя и фамилия" 
                    size="small" 
                    variant="outlined" 
                    value={name} 
                    onChange={(event) => { setName(event.target.value); setErrorName(false)}}
                    error={errorName}
                />
                <RadioGroup defaultValue={"yes"} value={assent} onChange={(event) => setAssent(event.target.value)}>
                    <FormControlLabel value="yes" control={<StyledRadio />} label="Да, я в деле" />
                    <FormControlLabel value="no" control={<StyledRadio />} label="К сожалению, не смогу" />
                </RadioGroup>
                <div className="couple">
                    <p>У вас будет +1? Или +2? А может даже +3?</p>
                    <Select
                        value={persons}
                        onChange={(event) => { 
                            setPersonOpen(false); 
                            setPersons(event.target.value); 
                            setErrorCouple(false); 
                            event.stopPropagation();
                            }}
                        onClick={(event)=>{
                            event.stopPropagation();
                            setPersonOpen(event.target.getAttribute('aria-hidden') ? false : true);
                            event.stopPropagation();
                            }}
                        open={personOpen}
                    >
                        <MenuItem key={0} value={0} onClick={(event) => {
                                setPersonOpen(false);
                                event.stopPropagation();
                            }}> Буду один</MenuItem>
                        <MenuItem key={1} value={1} onClick={(event) => {
                                setPersonOpen(false);
                                event.stopPropagation();
                            }}> Буду с парой</MenuItem>
                        <MenuItem key={2} value={2} onClick={(event) => {
                                setPersonOpen(false);
                                event.stopPropagation();
                            }}> Буду с парой и детьми</MenuItem>
                    </Select>
                </div>
                <CssTextField 
                    label="Имя и фамилия пары" 
                    size="small" 
                    variant="outlined" 
                    value={couple} 
                    onChange={(event) => { setCouple(event.target.value); setErrorCouple(false)}}
                    error={errorCouple}
                />
                <div className="Section5-menu">     
                    <FormControl>
                        <InputLabel id="food">Предпочтения в еде</InputLabel>    
                        <Select
                            onClick={(event)=>{
                                event.stopPropagation();
                                setFoodOpen(event.target.getAttribute('aria-hidden') ? false : true);
                                event.stopPropagation();
                                }}
                            open={foodOpen}
                            value={food}
                            labelId="food"
                            onChange={(event) => {
                                setFood(event.target.value); 
                                setFoodOpen(false);
                                event.stopPropagation();
                                }}
                        >
                            <MenuItem key={0} value={"без предпочтений"} onClick={(event) => {
                                setFoodOpen(false);
                                event.stopPropagation();
                            }}> Без предпочтений </MenuItem>
                            <MenuItem key={1} value={"свинина"} onClick={(event) => {
                                setFoodOpen(false);
                                event.stopPropagation();
                            }}> Свинина </MenuItem>
                            <MenuItem key={2} value={"курица"} onClick={(event) => {
                                setFoodOpen(false);
                                event.stopPropagation();
                            }}> Курица </MenuItem>
                            <MenuItem key={3} value={"рыба"} onClick={(event) => {
                                setFoodOpen(false);
                                event.stopPropagation();
                            }}> Рыба </MenuItem>
                            <MenuItem key={4} value={"всего и побольше"} onClick={(event) => {
                                setFoodOpen(false);
                                event.stopPropagation();
                            }}> Всего и побольше</MenuItem>
                            <MenuItem key={5} value={"веган"} onClick={(event) => {
                                setFoodOpen(false);
                                event.stopPropagation();
                            }}> Я веган</MenuItem>
                        </Select>
                    </FormControl> 
                    <FormControl>
                        <InputLabel id="drinks">Предпочтения в алкоголе</InputLabel>
                        <Select
                            onClick={(event)=>{
                                event.stopPropagation();
                                setDrinksOpen(event.target.getAttribute('aria-hidden') ? false : true);
                                event.stopPropagation();
                                }}
                            open={drinkOpen}
                            labelId="drinks"
                            value={drinks}
                            onChange={(event) => {
                                setDrinks(event.target.value); 
                                setDrinksOpen(false);
                                event.stopPropagation();
                            }}
                            
                        >
                            <MenuItem key={0} value={"без предпочтений"} onClick={(event) => {setDrinksOpen(false); event.stopPropagation();}}> Без предпочтений </MenuItem>
                            <MenuItem key={1} value={"вино"} onClick={(event) => {setDrinksOpen(false); event.stopPropagation();}}>Вино</MenuItem>
                            <MenuItem key={2} value={"коньяк"} onClick={(event) => {setDrinksOpen(false); event.stopPropagation();}}> Коньяк</MenuItem>
                            <MenuItem key={3} value={"водка"}onClick={(event) => {setDrinksOpen(false); event.stopPropagation();}}> Водка</MenuItem>
                            <MenuItem key={4} value={"всего и побольше"} onClick={(event) => {setDrinksOpen(false); event.stopPropagation();}}> Всего побольше и перемешать</MenuItem>
                            <MenuItem key={5} value={"за рулем"} onClick={(event) => {setDrinksOpen(false); event.stopPropagation();}}> Я за рулем</MenuItem>
                        </Select>
                    </FormControl> 
                </div>
                <p style={{textAlign: "center", marginTop: '8px',}}>Если у вас есть вопросы, комментарии или пожелания
                    их можно оставить в поле ниже!
                    Также, с нами всегда можно связаться
                    по телефону или в удобной для Вас соц.сети</p>
                <CssTextField 
                    size="small" 
                    variant="outlined" 
                    value={comm} 
                    onChange={(event) => { setComm(event.target.value);}}
                />
                <Button variant="outlined" onClick={send} style={{marginTop: '10px'}}>Отправить</Button>
        </div>
        {end && <div className="footer">
            <p style={{textAlign: "center"}}>Пора паковать чемоданы и собираться в путь! Помните, тот кто ищет, тот всегда найдет! До встречи, дорогие путешественники!</p>
            <p className="footername" style={{textAlign: "center"}}>Ваши Таня и Слава!</p>
            <div className="blue"></div>
        </div> }
        {end === false && <div className="footer">
            <p style={{textAlign: "center", color: '#ef2734'}}>Возникли ошибки, свяжитесь с нами</p>
        </div> }
    </div>
}

export default Section5
