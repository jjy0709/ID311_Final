import { fur_list } from "./furnitures";
import './Sidebar.css'


function Sidebar({option, addFurniture}) {
    switch (option) {
        case 'furniture': {
            return(
            <div className='furniture'>
                {fur_list.map((e,i) => {
                    return (<img className='furImg' src={e.img} onClick={()=>addFurniture(e.id)} key={i}/>);
                })}
            </div>
            ) 
            break;
        }

        default: {
            return(
                <div>
                    Not Yet
                </div>
            )
        }
    }
}

export default Sidebar;