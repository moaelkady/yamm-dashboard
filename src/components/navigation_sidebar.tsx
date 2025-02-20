import {memo} from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { sidebarItems } from '../data/sidebar_items';

const NavigationSidebar = () => {
    const { t } = useTranslation();
    const baseClasses = 'text-base flex justify-center items-center w-screen pt-2.5 pb-2.5 pr-4 pl-4 gap-4 rounded-[24px]';
    const activeClasses = 'bg-white';
    const transitionClasses = 'transition duration-300 ease-in-out';

    return (
        <nav>
            <List className="text-black gap-4 flex flex-col justify-center items-center">
                {sidebarItems.map((item, index) => (
                    <ListItem key={index} className='text-base'>
                        <NavLink to={item.to} className={({ isActive }) =>
                            `${baseClasses} ${isActive ? activeClasses : transitionClasses}`
                        }>
                            <ListItemIcon className='!min-w-0'>{item.icon}</ListItemIcon>
                            <ListItemText primary={t(item.textKey)} />
                        </NavLink>
                    </ListItem>
                ))}
            </List>
        </nav>
    );
};

export default memo(NavigationSidebar);