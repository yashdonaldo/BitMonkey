import React from 'react'
import './Sidebar.scss'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dropdown from './Dropdown';

const Sidebar = () => {
    return (
        <div className='sidebar-home'>
            <div className="card">
                    <Dropdown/>
                <div className="subnav" >
                </div>
            </div>
        </div>
    )
}

export default Sidebar
