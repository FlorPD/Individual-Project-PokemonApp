import React from 'react';
import { useState, useEffect } from 'react'; 
import { NavLink, useNavigate } from 'react-router-dom';
import { getPokemonType, postPokemon } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./styles/pokemoncreator.module.css"
import Swal from 'sweetalert2'


function validate(input) {
    let err = {};
    if (!input.name.match(/^[A-Za-z]+$/) ) {
        err.name = "Name must be filled with alphabets only";
    }
    if (input.height < 0) {
        err.height = "Height must be a number greater than 0";
    }
    if(input.weight < 0){
        err.weight = "Weight must be a number greater than 0";
    }
    if(input.hp < 0 || input.hp > 100 ){
        err.hp = "Hp must be a number between 0 and 100";
    }
    if(input.speed < 0 ){
        err.speed = "Speed must be a number greater than 0";
    }
    if(input.attack < 0 || input.attack > 100 ){
        err.attack = "Stength must be a number between 0 and 100";
    }
    if(input.defense < 0 || input.defense > 100 ){
        err.defense = "Defense must be a number between 0 and 100";
    }
    if(!input.types.length || input.types.length > 2){
        err.types = "Must select at least one type and a maximun of two";
    }
    return err;
}

export default function PokemonCreator() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const types = useSelector((state) => state.types)
    const [input, setInput] = useState({
        name: '',
        height:'',
        weight:'',
        hp: '',
        speed : '',
        attack: '',
        defense: '',
        sprite: '',
        types: [],
    })
    const [err, setErr] = useState({});

    useEffect(() => {
      dispatch(getPokemonType());
    }, [dispatch]);

    function handleChange(e) {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
      setErr(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    }

     function handleSelect(e){
         setInput({
            ...input,
            types : [...input.types, e.target.value ]
         })
         setErr(validate({
            ...input,
            types : [...input.types, e.target.value ]
         }))
    }

     function handleDelete(el){
         const newArr = input.types.filter(type => type !== el)
        setInput({
            ...input, 
            types: newArr
        })
        setErr(validate({
            ...input,
            types: newArr
        }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postPokemon(input))
        Swal.fire({
          icon: 'success',
          text: "Pokemon successfully created!"
        }) 
        setInput({
            name: '',
            height: '',
            weight: '',
            hp: '',
            speed: '',
            attack: '',
            defense:'',
            sprite: '' ,
            types: []
        })
        navigate('/home')
    }
    
    return (
      <div className={styles.container}>
        <NavLink to="/home">
          <button className={styles.button}>Back to home</button>
        </NavLink>

        <h1 className={styles.title}>Create your Pokemon</h1>

        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <div>
            <div className={styles.line}>
            <label className={styles.label}>* Name: </label>
            <input
              className={styles.input}
              required
              autoComplete='off'
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
            </div>
            {err.name && <p className={styles.error}>{err.name}</p>}
          </div>

          <div>
          <div className={styles.line}>
            <label className={styles.label}>Height: </label>
            <input
              className={styles.input}
              type="number"
              value={input.height}
              name="height"
              onChange={(e) => handleChange(e)}
            />
            </div>
            {err.height && <p className={styles.error}>{err.height}</p>}
          </div>

          <div>
          <div className={styles.line}>
            <label className={styles.label}>Weight: </label>
            <input
              className={styles.input}
              type="number"
              value={input.weight}
              name="weight"
              onChange={(e) => handleChange(e)}
            />
            </div>
            {err.weight && <p className={styles.error}>{err.weight}</p>}

          </div>
          <div>
          <div className={styles.line}>
            <label className={styles.label} >Hp: </label>
            <input
             className={styles.input}
              type="number"
              value={input.hp}
              name="hp"
              onChange={(e) => handleChange(e)}
            />
            </div>
            {err.hp && <p className={styles.error}>{err.hp}</p>}

          </div>
          <div>
          <div className={styles.line}>
            <label className={styles.label}>Speed: </label>
            <input
              className={styles.input}
              type="number"
              value={input.speed}
              name="speed"
              onChange={(e) => handleChange(e)}
            />
            </div>
            {err.speed && <p className={styles.error}>{err.speed}</p>}

          </div>
          <div>
          <div className={styles.line}>
            <label className={styles.label}>Strength: </label>
            <input
              className={styles.input}
              type="number"
              value={input.attack}
              name="attack"
              onChange={(e) => handleChange(e)}
            />
            </div>
            {err.attack && <p className={styles.error}>{err.attack}</p>}

          </div>
          <div>
          <div className={styles.line}>
            <label className={styles.label}>Defense: </label>
            <input
              className={styles.input}
              type="number"
              value={input.defense}
              name="defense"
              onChange={(e) => handleChange(e)}
            />
            </div>
            {err.defense && <p className={styles.error}>{err.defense}</p>}

          </div>
          <div className={styles.line}>
            <label className={styles.label}>Image: </label>
            <input
              className={styles.input}
              autoComplete='off'
              placeholder="add img link"
              type="text"
              value={input.sprite}
              name="sprite"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
          <div className={styles.line}>
            <label className={styles.label_types}>* Pokemon type </label>
            <select className={styles.input} onChange={(e) => handleSelect(e)} >
              <option value="" hidden>
                Select type
              </option>
              {types && types.map((type) => (<option key={type.id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
            </div>
            {err.types && <p className={styles.error}>{err.types}</p>}

          </div>
                  {/*hago un <p> con los types que el usuario selecciono */}
          <div className={styles.selected}>
        {input.types.map((el) => (
          <div key={el} className={styles.types}>
            <p >{el}</p>
            <button className={styles.delete_btn} onClick={() => handleDelete(el)}>x</button>
          </div>
          
        ))}
          </div>
          <button className={styles.create_btn} type="submit" disabled={Object.keys(err).length}>
            Create Pokemon
          </button>
        </form>
      
      </div>
    );
}
