import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const defaultValues = { first_name:"", last_name:"", email:"", password:"", birthday:"" }

const UserForm = ({ getUsers, userSelected, deselectUser }) => {

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if(userSelected) {
            reset(userSelected)
        } else {
            reset(defaultValues);
        }
    }, [ userSelected, reset ]);

    const submit = user => {
        if(userSelected) {
            axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, user)
                .then(() => {
                    getUsers();
                    deselectUser();
                })
        } else {
            axios.post('https://users-crud1.herokuapp.com/users/', user)
                .then(() => getUsers());
        }
        reset(defaultValues);
    }

    return (
        <form onSubmit={handleSubmit(submit)} className='form-container'>
            <div className="form-column">
                <h2><strong>New User</strong></h2>
                <div className="input-container">
                    <label htmlFor="first-name"><i className="fa-solid fa-user icon"></i></label>
                    <input
                        className='input-name' 
                        type="text" 
                        id='first-name' 
                        placeholder='First name'
                        {...register("first_name")}
                    />
                    <input
                        className='input-name' 
                        type="text" 
                        placeholder='Last name'
                        {...register("last_name")}
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="email"><i className="fa-solid fa-envelope icon"></i></label>
                    <input 
                        type="email" 
                        id='email' 
                        placeholder='Email'
                        {...register("email")}
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="password"><i className="fa-solid fa-lock icon"></i></label>
                    <input 
                        type="password" 
                        id='password' 
                        placeholder='Password'
                        {...register("password")}
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="birthday"><i className="fa-solid fa-cake-candles icon"></i></label>
                    <input 
                        type="date" 
                        id='birthday' 
                        {...register("birthday")}
                    />
                </div>
                <button className='form-button'>Upload</button>
                <button className='form-button' type='button' onClick={deselectUser}>Cancel</button>
            </div>
        </form>
    );
};

export default UserForm;