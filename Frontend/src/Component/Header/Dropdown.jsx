import React from 'react'
import './Dropdown.scss'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
const Menu = [
    { label: "menu 1" },
    { label: "menu 2", submenu: [{ label: "Submenu 1"}, {label: "Submenu 2" }] },
    { label: "menu 3", submenu: [{ label: "Submenu 1"}, {label: "Submenu 2" , submenu: [{label: "sub Sub menu"}, {label: "sub sub menu 2"}]}] },
    { label: "menu 3", submenu: [{ label: "Submenu 1"}, {label: "Submenu 2" , submenu: [{label: "sub Sub menu"}, {label: "sub sub menu 2"}]}] },
    { label: "menu 3", submenu: [{ label: "Submenu 1"}, {label: "Submenu 2" , submenu: [{label: "sub Sub menu"}, {label: "sub sub menu 2"}]}] },
]
function Dropdown() {
    const toggleMenu = (e) => {
        e.stopPropagation()
        let Submenu = e.target.querySelector("ul");
        if(!Submenu) return
        if(Submenu.style.display === "none"){
            Submenu.style.display = "block"
        }else{
            Submenu.style.display = "none"
        }
        console.log(Submenu.style.display)
    }
    const renderSubMenu = (submenu) => {
        return (
            <ul style={{display: "none"}}>
                {submenu.map((subitem, index) => (
                    <li key={index} onClick={toggleMenu}>
                        {subitem.label} {subitem.submenu ? <ArrowDropDownIcon/>: ""}
                        {subitem.submenu && renderSubMenu(subitem.submenu)}
                    </li>
                ))}
            </ul>
        )
    }
    return (
        <div className='dropmenu'>
            <ul>
                {Menu.map((item, index) => (
                    <li key={index} onClick={toggleMenu}>
                        {item.label } {item.submenu ? <ArrowDropDownIcon/> : ""}
                        {item.submenu && renderSubMenu(item.submenu)}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Dropdown
